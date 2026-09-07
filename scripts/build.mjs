import fs from "node:fs";
import path from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import postcss from "postcss";
import CleanCSS from "clean-css";
import { makeCatalog } from "./catalog.mjs";

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
];
const coreClasses = new Set(
  "fade up down left right zoom zoom-up pop bounce-in rotate grow-x sheet-up sheet-down zoom-down roll-in fade-out up-out down-out left-out slide-out zoom-out pop-out sheet-out rotate-out drop-out pulse bounce shake wiggle nudge flash float buzz btn push grow rotate-h skew-h stagger stagger-fade stagger-left stagger-right stagger-pop clip roll-up roll-up-out roll-down roll-down-out spin dots bars pulse-soft msg msg-user stream cursor"
    .split(" ")
    .map((x) => "fx-" + x),
);
const read = (name) => fs.readFileSync(`src/${name}.css`, "utf8");
const isKeyframe = (node) => {
  for (let p = node.parent; p; p = p.parent)
    if (p.type === "atrule" && p.name.endsWith("keyframes")) return true;
  return false;
};
const classNames = (text) =>
  [...text.matchAll(/\.(fx-[\w-]+)/g)].map((m) => m[1]);
const split = (selector) => postcss.list.comma(selector);
const targets = new Set(),
  loops = new Set();

function normalize(source) {
  const root = postcss.parse(source);
  root.walkRules((rule) => {
    if (isKeyframe(rule)) return;
    // Scope dot layout to named families, so new dot loaders keep their own structure.
    const dots = ["wave", "fade", "scale", "flow", "elastic", "spinner"].map(
      (x) => ".fx-dots-" + x,
    );
    if (rule.selector.includes('[class^="fx-dots-"')) {
      const suffix = rule.selector.endsWith(" i") ? " i" : "";
      rule.selector = dots.map((x) => x + suffix).join(", ");
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
      if (
        decl.prop === "animation-iteration-count" &&
        decl.value === "infinite"
      )
        split(rule.selector).forEach((x) => loops.add(x));
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

function pruneCore(root) {
  root.walkRules((rule) => {
    if (isKeyframe(rule)) return;
    const selectors = split(rule.selector).filter((s) =>
      classNames(s).every((c) => coreClasses.has(c)),
    );
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(", ");
  });
  const used = new Set();
  root.walkDecls("animation-name", (d) => used.add(d.value));
  root.walkAtRules("keyframes", (r) => {
    if (!used.has(r.params)) r.remove();
  });
  return root;
}

function commonRules() {
  if (!targets.size) return "";
  // Pseudo-elements cannot be placed inside :where(); group them separately.
  const regular = [
    '[class*="fx-"]',
    ...[...targets].filter((x) => !x.includes("::") && /[ >]/.test(x)),
  ];
  const pseudo = [...targets].some((x) => x.includes("::"))
    ? ['[class*="fx-"]::before', '[class*="fx-"]::after']
    : [];
  const selectors = [
    ...(regular.length ? [`:where(${regular.join(", ")})`] : []),
    ...pseudo.map((x) => x.replace(/^(.*?)::/, ":where($1)::")),
  ].join(",\n");
  if (!selectors) return "";
  return `${selectors} {
  --_t: .45s;
  --_e: var(--fx-ease);
  --_n: 1;
  --_a: normal;
  --_fx-phase: 0s;
  animation-duration: var(--fx-dur, var(--_t));
  animation-timing-function: var(--fx-easing, var(--_e));
  animation-fill-mode: both;
  animation-delay: calc(var(--fx-delay, 0s) + var(--_fx-phase));
  animation-iteration-count: var(--fx-repeat, var(--_n));
  animation-direction: var(--fx-direction, var(--_a));
  animation-play-state: var(--fx-play, running);
}\n`;
}
function reducedRules(root) {
  const selectors = [
    '[class*="fx-"]',
    '[class*="fx-"]::before',
    '[class*="fx-"]::after',
    ...[...targets].filter((x) => /[ >]/.test(x)),
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
  if (root.toString().includes(".fx-cycle-2"))
    text += `.fx-cycle-2 > *, .fx-cycle-3 > *, .fx-cycle-4 > *, .fx-cycle-5 > * { animation: none !important; opacity: 0 }\n.fx-cycle-2 > :first-child, .fx-cycle-3 > :first-child, .fx-cycle-4 > :first-child, .fx-cycle-5 > :first-child { opacity: 1 }\n`;
  return text + "}\n";
}

const artifacts = {};
const outputs = new Map();
for (const [name, sources] of Object.entries({
  default: legacy,
  core: legacy,
  motion: ["motion-extra"],
  interactions: ["interactions-extra"],
  loaders: ["loaders-extra"],
  visual: ["visual-extra"],
  all: [...legacy, ...extra],
})) {
  targets.clear();
  loops.clear();
  const isBase = ["default", "core", "all"].includes(name);
  let root = postcss.parse(sources.map(read).join("\n"));
  if (name === "core") root = pruneCore(normalize(root.toString()));
  // Normalize exactly once. Core pruning occurs before collecting its final targets.
  if (name === "core") {
    targets.clear();
    loops.clear();
    root.walkRules((r) => {
      if (!isKeyframe(r)) {
        if (r.nodes.some((d) => d.prop === "animation-name"))
          split(r.selector).forEach((x) => targets.add(x));
        if (
          r.nodes.some((d) => d.prop === "--_n" && d.value.includes("infinite"))
        )
          split(r.selector).forEach((x) => loops.add(x));
      }
    });
  } else root = normalize(root.toString());
  const accessibility = reducedRules(root);
  const source = `/*! flux-animation v${pkg.version} | MIT | Generated by npm run build; edit src/ */\n${isBase ? read("base") : ""}\n${commonRules()}\n${root.toString()}\n${isBase ? read("modifiers") : ""}\n${name !== "default" && (isBase || name === "motion") ? read("controls-extra") : ""}\n${accessibility}`;
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
outputs.set(
  "docs/ANIMATIONS.md",
  `# Animation reference\n\nGenerated from the effect catalog. All examples assume the appropriate stylesheet is loaded. ${catalog.effects.length} effect/helper recipes; ${artifacts.all.classes.length} public classes including controls.\n\n` +
    catalog.effects
      .map(
        (e) =>
          `## ${e.class}\n\n${e.description}\n\n- Pack: ${e.pack}${e.isNew ? " (new)" : ""}\n- Behavior: ${e.kind}; target: ${e.target}\n- Rendering: ${e.cost}\n- Reduced motion: ${e.reduced}\n\n\`\`\`html\n${e.html}\n\`\`\`\n`,
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
if (process.argv.includes("--budgets")) {
  if (artifacts.default.gzip > 4800)
    throw new Error("Default gzip budget exceeded (4800 bytes)");
  if (artifacts.all.gzip > 7500)
    throw new Error("Expanded gzip budget exceeded (7500 bytes)");
  if (artifacts.core.gzip > 2500)
    throw new Error("Core gzip budget exceeded (2500 bytes)");
}
