import fs from "node:fs";
const extraDescriptions = {
  "up-left": "Fade in from the upper-left corner.",
  "up-right": "Fade in from the upper-right corner.",
  "down-left": "Fade in from the lower-left corner.",
  "down-right": "Fade in from the lower-right corner.",
  "spring-up": "Rise with a small overshoot and settle.",
  "spring-down": "Drop with a small overshoot and settle.",
  "spring-left": "Spring in from the left.",
  "spring-right": "Spring in from the right.",
  "zoom-left": "Scale in with a short move from the left.",
  "zoom-right": "Scale in with a short move from the right.",
  "sheet-left": "Slide a drawer in from the left.",
  "sheet-right": "Slide a drawer in from the right.",
  "flip-in-top": "Unfold from the top edge.",
  "flip-in-bottom": "Unfold from the bottom edge.",
  "flip-in-left": "Unfold from the left edge.",
  "flip-in-right": "Unfold from the right edge.",
  "right-out": "Dismiss to the right; alias of fx-slide-out.",
  "zoom-up-out": "Shrink away upward.",
  "zoom-down-out": "Shrink away downward.",
  "zoom-left-out": "Shrink away to the left.",
  "zoom-right-out": "Shrink away to the right.",
  "sheet-up-out": "Dismiss a drawer through its top edge.",
  "sheet-down-out": "Dismiss downward; alias of fx-sheet-out.",
  "sheet-left-out": "Dismiss a drawer to the left.",
  "sheet-right-out": "Dismiss a drawer to the right.",
  "flip-y-out": "Tip away sideways in 3D.",
  "roll-out": "Roll away to the right with a fade.",
  "swing-out": "Hinge away from the top edge.",
  nod: "Two small vertical movements for acknowledgment.",
  "shake-y": "A vertical error shake.",
  hop: "Lift with a squash-and-stretch landing.",
  pendulum: "A calm, top-anchored swinging loop.",
  breathe: "A subtle scale-and-opacity breathing loop.",
  recoil: "Compress backward, then recover with an overshoot.",
  settle: "A damped rotational settle.",
  wobble: "Sideways travel coupled with a diminishing rotation.",
  "underline-center": "Reveal an underline outward from its center.",
  "underline-right": "Reveal an underline from the right.",
  "underline-double": "Reveal two coordinated underline strokes.",
  overline: "Reveal a stroke above the label.",
  "fill-h-left": "Sweep a background tint in from the left.",
  "fill-h-right": "Sweep a background tint in from the right.",
  "fill-h-up": "Sweep a background tint down from the top.",
  "fill-h-down": "Sweep a background tint up from the bottom.",
  "dots-orbit": "Three dots physically orbit their center.",
  "dots-zigzag": "Dots alternate between diagonal positions.",
  "bars-wave": "Five bars rise and fall with offset phases.",
  "bars-travel": "An opacity highlight travels through five bars.",
  "dual-ring": "Two concentric arcs rotate in opposite directions.",
  "ring-pulse": "An outlined ring expands and fades.",
  sonar: "Two expanding rings ripple with offset phases.",
  "skeleton-wave": "An angled highlight travels across a skeleton block.",
  "wipe-up": "Unmask from the top without fading.",
  "wipe-down": "Unmask from the bottom without fading.",
  "wipe-left": "Unmask from the left without fading.",
  "wipe-right": "Unmask from the right without fading.",
  "iris-in": "Open a circular mask around a configurable origin.",
  "iris-out": "Close a circular mask around a configurable origin.",
  "blur-zoom-in": "Scale up through a soft focus pull.",
  "blur-zoom-out": "Scale away while defocusing.",
  "stagger-down": "Children enter from above in sequence.",
  "stagger-zoom": "Children scale in gently in sequence.",
  "stagger-rotate": "Children tilt into place in sequence.",
  "stagger-roll-up":
    "Children roll upward in sequence; clip overflow where needed.",
};
const groupFiles = {
  entrances: "Entrances",
  exits: "Exits",
  attention: "Attention",
  interactions: "Interactions",
  stagger: "Stagger",
  updates: "Updates",
  loaders: "Loaders",
  size: "Size",
  chat: "Chat",
};
const loops = new Set(
  "float trace comet fill scan ripple orbit bloom dots-wave dots-fade dots-scale dots-flow dots-elastic dots-spinner cursor dots shimmer pulse-soft spin progress bars ping breathe pendulum dots-orbit dots-zigzag bars-wave bars-travel dual-ring ring-pulse sonar skeleton-wave".split(
    " ",
  ),
);
const controls =
  /^fx-(faster|fast|slow|slower|d[1-7]|spring|linear|loop(?:-[23])?|reverse|paused|alternate(?:-reverse)?|once|running|origin-\w+)$/;
const labels = {
  fade: "Fade in gently.",
  up: "Rise and fade in.",
  down: "Drop and fade in.",
  left: "Enter from the left.",
  right: "Enter from the right.",
  pop: "Scale in with a spring easing.",
  zoom: "Scale in gently.",
  "zoom-up": "Rise and scale in.",
  "bounce-in": "Bounce into view.",
  blur: "Focus in from a blur.",
  rotate: "Tilt upright.",
  "flip-x": "Tip forward in 3D.",
  "flip-y": "Turn in from the side.",
  wipe: "Unmask from the left and fade in.",
  reveal: "Unmask from the top and fade in.",
  swing: "Hinge in from the top.",
  "roll-in": "Roll in from the left.",
  pulse: "A small scale pulse.",
  bounce: "Two diminishing bounces.",
  shake: "A horizontal error shake.",
  wiggle: "A small rotational wiggle.",
  jello: "A diminishing skew wobble.",
  rubber: "A squash-and-stretch pulse.",
  nudge: "Two small rightward nudges.",
  flash: "A quick opacity cue.",
  heartbeat: "A double scale heartbeat.",
  glow: "A soft animated shadow glow.",
  float: "A gentle vertical floating loop.",
  tada: "A playful scale-and-rotation celebration.",
  buzz: "A tiny horizontal vibration.",
  bell: "A diminishing top-anchored ring.",
  ring: "A focus-triggered shadow ring.",
  btn: "Scale down on press.",
  push: "Sink slightly on press.",
  lift: "Lift and add a shadow on hover or focus.",
  grow: "Grow slightly on hover or focus.",
  tilt: "Tilt in perspective on hover or focus.",
  brighten: "Brighten on hover or focus.",
  "glow-h": "Add a glow on hover or focus.",
  "rotate-h": "Rotate and scale on hover or focus.",
  "skew-h": "Skew on hover or focus.",
  shine: "Sweep a highlight across the surface.",
  underline: "Reveal an underline from the left.",
  thought: "Rise through a soft blur.",
  "thought-out": "Dissolve upward through a blur.",
  trace: "Draw a line across its track.",
  comet: "Send a fading streak across its track.",
  fill: "Sweep, hold, and fade a tint.",
  scan: "Sweep a narrow beam back and forth.",
  ripple: "Expand a shadow halo.",
  orbit: "Rotate a single orbiting dot.",
  bloom: "Breathe a soft shadow halo.",
  width: "Transition an application-supplied width change.",
  msg: "A small rise and scale for a message.",
  "msg-user": "A diagonal scale entrance for a user message.",
  stream: "Fade in a streamed chunk.",
  cursor: "Blink a decorative text caret.",
  dots: "Three softly bouncing typing dots.",
  shimmer: "Sweep a highlight across a skeleton.",
  spin: "Rotate continuously.",
  progress: "An indeterminate moving progress segment.",
  bars: "An equalizer of four scaled bars.",
  ping: "An expanding presence halo.",
  clip: "Clip overflowing roll or drawer effects.",
};

export function makeCatalog(artifacts) {
  const oldGroups = {};
  for (const [file, group] of Object.entries(groupFiles))
    for (const match of fs
      .readFileSync(`src/${file}.css`, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .matchAll(/\.(fx-[\w-]+)/g))
      oldGroups[match[1]] ??= group;
  const effects = artifacts.all.classes
    .filter((c) => !controls.test(c))
    .map((cls) => {
      const n = cls.slice(3),
        isNew = !artifacts.default.classes.includes(cls);
      const pack = isNew
        ? ["motion", "interactions", "loaders", "visual"].find((p) =>
            artifacts[p].classes.includes(cls),
          )
        : "default";
      let group =
        oldGroups[cls] ||
        {
          motion: /stagger/.test(n)
            ? "Stagger"
            : /out$/.test(n)
              ? "Exits"
              : /^(nod|shake-y|hop|pendulum|breathe|recoil|settle|wobble)$/.test(
                    n,
                  )
                ? "Attention"
                : "Entrances",
          interactions: "Interactions",
          loaders: "Loaders",
          visual: "Visual effects",
        }[pack];
      const kind =
        loops.has(n) || n.startsWith("cycle-")
          ? "loop"
          : group === "Interactions" || n === "ring"
            ? "interaction"
            : n === "width"
              ? "toggle"
              : n === "clip"
                ? "helper"
                : "one-shot";
      const cost = /blur|thought|brighten/.test(n)
        ? "filter"
        : /glow|bloom|ripple|ping|^ring$|^lift$/.test(n)
          ? "paint"
          : /wipe|reveal|iris/.test(n)
            ? "mask"
            : /^(width|expand|collapse)/.test(n)
              ? "layout"
              : "transform / opacity";
      let description = extraDescriptions[n] || labels[n];
      if (!description) {
        if (n.startsWith("cycle-"))
          description = `Rotate ${n.at(-1)} decorative status labels in a shared grid.`;
        else if (n.startsWith("stagger"))
          description = `Stagger child entrances${n === "stagger" ? "" : ` with the ${n.slice(8)} variant`}; use fx-stagger on the parent.`;
        else if (n.startsWith("dots-"))
          description = `A three-dot ${n.slice(5)} loading indicator.`;
        else if (/^(expand|collapse)-/.test(n))
          description = `${n.startsWith("expand") ? "Expand" : "Collapse"} the maximum ${n.endsWith("w") ? "width" : "height"}; this changes layout.`;
        else if (/^(grow|shrink)-/.test(n))
          description = `${n.startsWith("grow") ? "Grow" : "Shrink"} visually on the ${n.includes("-x") ? "horizontal" : "vertical"} axis${n.endsWith("-to") ? " and hold the configured scale" : ""}; surrounding layout does not move.`;
        else if (n.endsWith("-out"))
          description = `${n.slice(0, -4).replaceAll("-", " ")} dismissal; the application owns DOM removal.`;
        else description = n.replaceAll("-", " ") + " entrance.";
      }
      let html = `<div class="${cls}">Motion, made simple.</div>`,
        target = "element";
      if (group === "Interactions" || n === "ring")
        html = `<button class="${cls}">Try this effect</button>`;
      if (n.startsWith("stagger")) {
        html = `<ul class="fx-stagger${n === "stagger" ? "" : " " + cls}">\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>`;
        target = "children";
      }
      if (n.startsWith("cycle-")) {
        html = `<div class="${cls}" aria-hidden="true">${Array.from({ length: Number(n.at(-1)) }, (_, i) => `<span>Step ${i + 1}</span>`).join("")}</div>\n<span class="sr-only">Working…</span>`;
        target = "children";
      }
      if (n.startsWith("dots") || n.startsWith("bars")) {
        html = `<span class="${cls}" aria-hidden="true">${"<i></i>".repeat(n === "bars" ? 4 : n.startsWith("bars-") ? 5 : 3)}</span>`;
        target = n === "dots-orbit" ? "element" : "children";
      }
      if (["dual-ring", "ring-pulse", "sonar"].includes(n)) {
        html = `<span class="${cls}" aria-hidden="true"></span>`;
        target = "pseudo-elements";
      }
      if (["trace", "comet", "scan", "progress"].includes(n)) {
        html = `<div class="${cls}" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>`;
        target = "pseudo-element";
      }
      if (["shimmer", "skeleton-wave", "pulse-soft"].includes(n)) {
        html = `<div class="${cls}" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>`;
        target = n === "pulse-soft" ? "element" : "pseudo-element";
      }
      if (["ripple", "bloom", "ping"].includes(n)) {
        html = `<span class="${cls}" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>`;
        target = n === "ping" ? "pseudo-element" : "element";
      }
      if (n === "spin")
        html = `<span class="${cls}" style="display:inline-block;width:24px;height:24px;border:3px solid #e2e6ee;border-top-color:currentColor;border-radius:50%" aria-hidden="true"></span>`;
      if (n === "orbit")
        html = `<span class="${cls}" style="display:inline-block;width:28px;height:28px" aria-hidden="true"></span>`;
      if (["fill", "cursor"].includes(n)) target = "pseudo-element";
      if (n === "width")
        html = '<div class="fx-width" style="width:100px">Resize me</div>';
      if (n.endsWith("-to"))
        html = `<div class="${cls}" style="--fx-x:${n.startsWith("grow") ? "1.5" : ".6"};width:100px;height:24px;background:currentColor"></div>`;
      if (n === "clip")
        html =
          '<div class="fx-clip"><div class="fx-roll-up">Rolling text</div></div>';
      const exit = /out$|^(shrink|collapse)-/.test(n) && !n.endsWith("-to");
      const reduced = n.startsWith('cycle-')
        ? "v2 policy: cycling stops; the first child is opaque and the others remain opacity-zero."
        : "v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.";
      return {
        class: cls,
        description,
        pack,
        isNew,
        group,
        kind,
        cost,
        target,
        reduced,
        html,
        exit,
      };
    });
  return {
    version: JSON.parse(fs.readFileSync("package.json")).version,
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
    effects,
  };
}
