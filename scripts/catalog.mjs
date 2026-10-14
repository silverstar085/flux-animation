import fs from "node:fs";

// src/effects.json is the single source of effect metadata: group, behavior,
// rendering cost, bundle membership, description and example markup.
export const effects = JSON.parse(fs.readFileSync("src/effects.json", "utf8"));
export const GROUPS = [
  "Chat",
  "Loaders",
  "Updates",
  "Entrances",
  "Exits",
  "Attention",
  "Stagger",
  "Interactions",
  "Size",
  "Visual effects",
];
export const KINDS = ["one-shot", "loop", "interaction", "toggle", "helper"];
export const COSTS = ["transform / opacity", "paint", "filter", "mask", "layout"];
export const CONTROLS =
  /^fx-(faster|fast|slow|slower|d[1-7]|spring|linear|loop(?:-[23])?|reverse|paused|alternate(?:-reverse)?|once|running|origin-\w+)$/;

/** Classes flagged for a pruned bundle, e.g. "core" or "chat". */
export const classesFor = (flag) =>
  new Set(Object.keys(effects).filter((c) => effects[c][flag]));

const POLICY =
  "Duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and endpoints are kept.";
const posed = new Set(
  [
    ...fs
      .readFileSync("src/reduced.css", "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .matchAll(/\.(fx-[\w-]+)/g),
  ].map((m) => m[1]),
);

export function makeCatalog(artifacts) {
  const shipped = artifacts.all.classes.filter((c) => !CONTROLS.test(c));
  const missing = shipped.filter((c) => !effects[c]);
  const stale = Object.keys(effects).filter((c) => !shipped.includes(c));
  if (missing.length || stale.length)
    throw new Error(
      `src/effects.json is out of sync. Missing: ${missing.join(", ") || "none"}. Not in CSS: ${stale.join(", ") || "none"}.`,
    );
  const latest = JSON.parse(fs.readFileSync("package.json")).version.replace(
    /\.\d+$/,
    "",
  );
  const list = Object.entries(effects).map(([cls, meta]) => {
    for (const key of ["group", "kind", "cost", "target", "since", "description", "html"])
      if (!meta[key]) throw new Error(`${cls}: missing "${key}" in src/effects.json`);
    if (!GROUPS.includes(meta.group)) throw new Error(`${cls}: unknown group ${meta.group}`);
    if (!KINDS.includes(meta.kind)) throw new Error(`${cls}: unknown kind ${meta.kind}`);
    if (!COSTS.includes(meta.cost)) throw new Error(`${cls}: unknown cost ${meta.cost}`);
    if (!meta.html.includes(cls)) throw new Error(`${cls}: example markup does not use the class`);
    const pack = artifacts.default.classes.includes(cls)
      ? "default"
      : ["motion", "interactions", "loaders", "visual"].find((p) =>
          artifacts[p].classes.includes(cls),
        );
    const reduced = cls.startsWith("fx-cycle-")
      ? "Cycling stops; the first child stays visible and the others stay hidden."
      : posed.has(cls)
        ? "Rests on a static, visible pose."
        : (meta.reduced ?? POLICY);
    return {
      class: cls,
      description: meta.description,
      pack,
      since: meta.since,
      isNew: meta.since === latest,
      group: meta.group,
      kind: meta.kind,
      cost: meta.cost,
      target: meta.target,
      reduced,
      html: meta.html,
      exit: Boolean(meta.exit),
      core: Boolean(meta.core),
      chat: Boolean(meta.chat),
    };
  });
  // Group order, then newest first within a group, then by name.
  const age = (e) => (e.since === "2.x" ? 0 : Number(e.since));
  list.sort(
    (a, b) =>
      GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) ||
      age(b) - age(a) ||
      a.class.localeCompare(b.class),
  );
  return {
    version: JSON.parse(fs.readFileSync("package.json")).version,
    groups: GROUPS.filter((g) => list.some((e) => e.group === g)),
    sizes: Object.fromEntries(
      Object.entries(artifacts).map(([k, v]) => [
        k,
        {
          gzip: v.gzip,
          minified: v.minified,
          brotli: v.brotli,
          classes: v.classes.length,
        },
      ]),
    ),
    effects: list,
  };
}
