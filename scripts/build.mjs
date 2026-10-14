import fs from "node:fs";
import path from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import postcss from "postcss";
import CleanCSS from "clean-css";
import { makeCatalog, classesFor } from "./catalog.mjs";

const check = process.argv.includes("--check");
const pkg = JSON.parse(fs.readFileSync("package.json"));
const legacy = [
  "entrances",
  "exits",
  "attention",
  "interactions",
  "stagger",
  "updates",
  "loaders",
  "size",
  "chat",
];
const extra = [
  "motion-extra",
  "interactions-extra",
  "loaders-extra",
  "visual-extra",
  "chat-extra",
];
// Control classes (fx-slow, fx-loop, fx-d2, ...) set these private variables.
// They are registered as non-inheriting, so a control affects only its own
// element; the shared rules hand them to child and pseudo-element targets.
const CONTROLS = ["dur", "delay", "ease", "repeat", "dir"];
const properties = CONTROLS.map(
  (v) => `@property --_c-${v} {\n  syntax: "*";\n  inherits: false;\n}`,
).join("\n");
const read = (name) => fs.readFileSync(`src/${name}.css`, "utf8");
const isKeyframe = (node) => {
  for (let p = node.parent; p; p = p.parent)
    if (p.type === "atrule" && p.name.endsWith("keyframes")) return true;
  return false;
};
const classNames = (text) =>
  [...text.matchAll(/\.(fx-[\w-]+)/g)].map((m) => m[1]);
const split = (selector) => postcss.list.comma(selector);
const targets = new Set();
// Whole-class match for the fx- namespace: start of the attribute or after any
// HTML whitespace separator, so unrelated classes such as "gfx-card" never match.
const FX = ['^="fx-"', '*=" fx-"', '*="\\9 fx-"', '*="\\a fx-"', '*="\\c fx-"']
  .map((x) => `[class${x}]`)
  .join(", ");
const DOTS = ["wave", "fade", "scale", "flow", "elastic", "spinner"].map(
  (x) => ".fx-dots-" + x,
);

function normalize(source) {
  const root = postcss.parse(source);
  root.walkRules((rule) => {
    if (isKeyframe(rule)) return;
    // Scope dot layout to named families, so new dot loaders keep their own structure.
    if (rule.selector.includes('[class^="fx-dots-"')) {
      const suffix = rule.selector.endsWith(" i") ? " i" : "";
      rule.selector = DOTS.map((x) => x + suffix).join(", ");
    }
    let animated = false;
    rule.walkDecls("animation", (decl) => {
      const parts = postcss.list.space(decl.value);
      const key = parts.shift(),
        duration = parts.shift();
      let ease = "ease",
        count = "1",
        direction = "normal";
      for (const token of parts) {
        if (token === "infinite" || /^\d+$/.test(token)) count = token;
        else if (
          ["reverse", "alternate", "alternate-reverse", "normal"].includes(
            token,
          )
        )
          direction = token;
        else if (!["both", "forwards", "backwards", "none"].includes(token))
          ease = token;
      }
      for (const [prop, value] of Object.entries({
        "animation-name": key,
        "animation-duration": duration,
        "animation-timing-function": ease,
        ...(count !== "1" ? { "animation-iteration-count": count } : {}),
        ...(direction !== "normal" ? { "animation-direction": direction } : {}),
      }))
        decl.cloneBefore({ prop, value });
      decl.remove();
    });
    rule.walkDecls((decl) => {
      if (decl.prop === "animation-name") animated = true;
      const overrides = {
        "animation-duration": "--_t",
        "animation-timing-function": "--_e",
        "animation-iteration-count": "--_n",
        "animation-direction": "--_a",
      };
      if (overrides[decl.prop]) decl.prop = overrides[decl.prop];
      if (decl.prop === "animation-delay") decl.prop = "--_fx-phase";
      if (decl.prop === "content" && /::(before|after)/.test(rule.selector))
        rule.append({ prop: "pointer-events", value: "none" });
    });
    if (animated) split(rule.selector).forEach((x) => targets.add(x));
  });
  // Keyboard equivalents use the same visual treatment as hover; keep native outlines.
  const focus = [];
  root.walkRules((rule) => {
    if (rule.selector.includes(":hover"))
      focus.push(
        rule.clone({
          selector: rule.selector.replaceAll(":hover", ":focus-visible"),
        }),
      );
  });
  root.append(...focus);
  return root;
}

// Keep only rules whose classes all belong to a preset (core, chat).
function prune(root, keep) {
  root.walkRules((rule) => {
    if (isKeyframe(rule)) return;
    const selectors = split(rule.selector).filter((s) =>
      classNames(s).every((c) => keep.has(c)),
    );
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(", ");
  });
  // Drop @media/@supports blocks left empty by pruning (innermost first).
  const empty = [];
  root.walkAtRules((r) => {
    if (r.nodes && !r.nodes.length) empty.push(r);
  });
  for (let r of empty)
    while (r && r.type === "atrule" && !r.nodes.length) {
      const parent = r.parent;
      r.remove();
      r = parent;
    }
  const used = new Set();
  root.walkDecls("animation-name", (d) => used.add(d.value));
  root.walkAtRules("keyframes", (r) => {
    if (!used.has(r.params)) r.remove();
  });
  return root;
}

// Child targets of an animated host. Stagger variants always sit on an
// fx-stagger parent, so ".fx-stagger > *" already covers their children.
function childTargets() {
  const list = [...targets].filter((x) => !x.includes("::") && /[ >]/.test(x));
  return targets.has(".fx-stagger > *")
    ? list.filter((x) => !/^\.fx-stagger-[\w-]+ > \*$/.test(x))
    : list;
}
// Accent-derived colors are resolved per element, so --fx-accent can be set on
// any container. Only bundles that use them pay for them.
const ACCENTS = { glow: ["fx-glow", 45], ring: ["fx-ring", 50] };
function commonRules(css) {
  if (!targets.size) return "";
  const accents = Object.entries(ACCENTS)
    .filter(([name]) => css.includes(`var(--_${name})`))
    .map(
      ([name, [public_, percent]]) =>
        `\n  --_${name}: var(--${public_}, color-mix(in srgb, var(--fx-accent, #4f46e5) ${percent}%, transparent));`,
    )
    .join("");
  // Pseudo-elements cannot be placed inside :where(); group them separately.
  const children = childTargets();
  const pseudo = [...targets].some((x) => x.includes("::"))
    ? [`:where(${FX})::before`, `:where(${FX})::after`]
    : [];
  const selectors = [`:where(${[FX, ...children].join(", ")})`, ...pseudo];
  // Child and pseudo-element targets take their host's control classes.
  const handoff = [
    ...(children.length ? [`:where(${children.join(", ")})`] : []),
    ...pseudo,
  ];
  // Precedence: control class on the element, then the public variable
  // (inherited, so it can be set on :root or a container), then the default.
  return `${selectors.join(",\n")} {
  --_t: .45s;
  --_e: var(--fx-ease);
  --_n: 1;
  --_a: normal;
  --_fx-phase: 0s;${accents}
  animation-duration: var(--_c-dur, var(--fx-dur, var(--_t)));
  animation-timing-function: var(--_c-ease, var(--fx-easing, var(--_e)));
  animation-fill-mode: both;
  animation-delay: calc(var(--_c-delay, var(--fx-delay, 0s)) + var(--_fx-phase));
  animation-iteration-count: var(--_c-repeat, var(--fx-repeat, var(--_n)));
  animation-direction: var(--_c-dir, var(--fx-direction, var(--_a)));
  animation-play-state: var(--fx-play, running);
}
${
  handoff.length
    ? `${handoff.join(",\n")} {\n${CONTROLS.map((v) => `  --_c-${v}: inherit;`).join("\n")}\n}\n`
    : ""
}`;
}
// Loaders whose final keyframe is invisible get a static, visible pose instead.
// Kept outside normalize(): these are plain overrides inside the media query.
function reducedPoses(root) {
  const present = new Set(classNames(root.toString()));
  const poses = postcss.parse(read("reduced"));
  poses.walkRules((rule) => {
    const selectors = split(rule.selector).filter((s) =>
      classNames(s).every((c) => present.has(c)),
    );
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(", ");
  });
  poses.walkComments((c) => c.remove());
  return poses.toString().trim();
}
function reducedRules(root) {
  const selectors = [
    `:where(${FX})`,
    `:where(${FX})::before`,
    `:where(${FX})::after`,
    ...childTargets(),
  ];
  // Transitions can live on elements with no keyframes, including pseudo-elements.
  root.walkRules((r) => {
    if (
      !isKeyframe(r) &&
      r.nodes.some((d) => d.type === "decl" && d.prop.startsWith("transition"))
    )
      selectors.push(...split(r.selector).filter((x) => /[ >]/.test(x)));
  });
  const unique = [...new Set(selectors)];
  if (!unique.length) return "";
  // Retain the v2 reduced-motion policy. Use seconds in authoring because
  // clean-css mis-serializes a fractional-millisecond input; output is .01ms.
  let text = `@media (prefers-reduced-motion: reduce) {\n${unique.join(", ")} { animation-duration: 0.00001s !important; animation-iteration-count: 1 !important; transition: none !important }\n`;
  const poses = reducedPoses(root);
  if (poses) text += poses + "\n";
  if (root.toString().includes(".fx-cycle-2"))
    text += `.fx-cycle-2 > *, .fx-cycle-3 > *, .fx-cycle-4 > *, .fx-cycle-5 > * { animation: none !important; opacity: 0 }\n.fx-cycle-2 > :first-child, .fx-cycle-3 > :first-child, .fx-cycle-4 > :first-child, .fx-cycle-5 > :first-child { opacity: 1 }\n`;
  return text + "}\n";
}

const artifacts = {};
const outputs = new Map();
const bundles = {
  default: { sources: legacy, base: true },
  core: { sources: legacy, base: true, keep: classesFor("core") },
  chat: { sources: [...legacy, ...extra], base: true, keep: classesFor("chat") },
  motion: { sources: ["motion-extra"] },
  interactions: { sources: ["interactions-extra"] },
  loaders: { sources: ["loaders-extra", "chat-extra"] },
  visual: { sources: ["visual-extra"] },
  all: { sources: [...legacy, ...extra], base: true },
};
for (const [name, { sources, base: isBase, keep }] of Object.entries(bundles)) {
  targets.clear();
  // Normalize exactly once. Presets are pruned before collecting their final targets.
  let root = normalize(sources.map(read).join("\n"));
  if (keep) {
    root = prune(root, keep);
    targets.clear();
    root.walkRules((r) => {
      if (!isKeyframe(r) && r.nodes.some((d) => d.prop === "animation-name"))
        split(r.selector).forEach((x) => targets.add(x));
    });
  }
  const accessibility = reducedRules(root);
  const hasControls = isBase || name === "motion";
  const source = `/*! flux-animation v${pkg.version} | MIT | Generated by npm run build; edit src/ */\n${hasControls ? properties + "\n" : ""}${isBase ? read("base") : ""}\n${commonRules(root.toString())}\n${root.toString()}\n${isBase ? read("modifiers") : ""}\n${name !== "default" && (isBase || name === "motion") ? read("controls-extra") : ""}\n${accessibility}`;
  const result = new CleanCSS({
    level: {
      1: { specialComments: "all" },
      2: { mergeSemantically: false, removeUnusedAtRules: false },
    },
    returnPromise: false,
  }).minify(source);
  if (result.errors.length) throw new Error(result.errors.join("\n"));
  if (result.warnings.length) console.warn(result.warnings);
  const stem = name === "default" ? "flux" : `flux.${name}`;
  const min = result.styles + "\n";
  outputs.set(`${stem}.css`, source);
  outputs.set(`${stem}.min.css`, min);
  artifacts[name] = {
    file: `${stem}.min.css`,
    raw: Buffer.byteLength(source),
    minified: Buffer.byteLength(min),
    gzip: gzipSync(min, { level: 9 }).length,
    brotli: brotliCompressSync(min, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    }).length,
    classes: [
      ...new Set(classNames(source.replace(/\/\*[\s\S]*?\*\//g, ""))),
    ].sort(),
    keyframes: [...source.matchAll(/@keyframes\s+(\w+)/g)].map((m) => m[1]),
  };
}
// Generate demo-only overrides so opening the HTML directly also works: browsers
// can restrict CSSOM access to linked stylesheets on file:// origins.
const demoRules = postcss.root();
const allRules = postcss.parse(outputs.get('flux.all.css'));
allRules.walkRules(rule => {
  if (isKeyframe(rule) || !/:(hover|active|focus-visible)/.test(rule.selector)) return;
  for (let p = rule.parent; p; p = p.parent) {
    if (p.type === 'atrule' && p.params?.includes('prefers-reduced-motion')) return;
  }
  demoRules.append(rule.clone({ selector: rule.selector.replace(/:(hover|active|focus-visible)/g, '.demo-hover') }));
});
outputs.set('demo/preview.css', '/* Generated demo-only state previews. */\n' + demoRules.toString() + '\n');
const catalog = makeCatalog(artifacts);
outputs.set("demo/catalog.json", JSON.stringify(catalog, null, 2) + "\n");
outputs.set(
  "demo/catalog.js",
  `/* Generated; edit scripts/catalog.mjs */\nwindow.FLUX_CATALOG = ${JSON.stringify(catalog)};\n`,
);
outputs.set("docs/SIZES.json", JSON.stringify(artifacts, null, 2) + "\n");
const DEMO = "https://silverstar085.github.io/flux-animation/";
const imports = (e) =>
  [
    e.pack === "default" ? "flux-animation" : `flux-animation/${e.pack}`,
    e.core && "flux-animation/core",
    e.chat && "flux-animation/chat",
    "flux-animation/all",
  ]
    .filter(Boolean)
    .map((x) => "`" + x + "`")
    .join(", ");
const anchor = (g) => g.toLowerCase().replaceAll(" ", "-");
outputs.set(
  "docs/ANIMATIONS.md",
  `# Animation reference

Generated from \`src/effects.json\`; edit that file, not this one. ${catalog.effects.length} effects and helpers; ${artifacts.all.classes.length} public classes including controls. Every entry links to a live preview in the [demo](${DEMO}).

**Reduced motion.** With \`prefers-reduced-motion: reduce\`, every effect finishes immediately (.01ms, one iteration) and transitions are disabled. Delay, pause, direction and end states are kept. Exceptions are noted on the entry: loaders whose last frame would be invisible rest on a static, visible pose, and \`fx-cycle-*\` shows only its first child.

${catalog.groups
  .map((g) => `- [${g}](#${anchor(g)}) (${catalog.effects.filter((e) => e.group === g).length})`)
  .join("\n")}

` +
    catalog.groups
      .map(
        (g) =>
          `## ${g}\n\n` +
          catalog.effects
            .filter((e) => e.group === g)
            .map(
              (e) =>
                `### ${e.class}\n\n${e.description}\n\n` +
                `- Import: ${imports(e)}${e.since === "2.x" ? "" : ` · new in ${e.since}`}\n` +
                `- Behavior: ${e.kind}; animates the ${e.target}; rendering: ${e.cost}\n` +
                (e.reduced.startsWith("Duration becomes") ? "" : `- Reduced motion: ${e.reduced}\n`) +
                `- [Live preview](${DEMO}#${e.class})\n\n` +
                "```html\n" + e.html + "\n```\n",
            )
            .join("\n"),
      )
      .join("\n"),
);
for (const [file, content] of outputs) {
  if (check) {
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content)
      throw new Error(`Generated file differs: ${file}. Run npm run build.`);
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
}
for (const [name, a] of Object.entries(artifacts))
  console.log(
    `${name.padEnd(13)} ${String(a.minified).padStart(6)} min | ${String(a.gzip).padStart(5)} gzip | ${String(a.brotli).padStart(5)} br | ${a.classes.length} classes`,
  );
// Gzip budgets in bytes (level 9), shared with the tests.
if (process.argv.includes("--budgets"))
  for (const [name, cap] of Object.entries(
    JSON.parse(fs.readFileSync("scripts/budgets.json")),
  ))
    if (artifacts[name].gzip > cap)
      throw new Error(`${name} gzip budget exceeded: ${artifacts[name].gzip} > ${cap} bytes`);
