/* Demo-only controls. The distributed library contains CSS only. */
"use strict";
const catalog = window.FLUX_CATALOG;
const $ = (id) => document.getElementById(id);
const grid = $("grid");
let newOnly = true,
  paused = false,
  selected = null,
  toastTimer;
const cards = new Map(),
  timers = new Map();
const bytes = (n) => (n / 1000).toFixed(2) + " KB";
$("version").textContent = "v" + catalog.version + "";
$("default-size").textContent = bytes(catalog.sizes.default.gzip);
$("all-size").textContent = bytes(catalog.sizes.all.gzip);
$("class-count").textContent = catalog.sizes.all.classes;
$("new-count").textContent = catalog.effects.filter((e) => e.isNew).length;
for (const category of [...new Set(catalog.effects.map((e) => e.group))].sort())
  $("category").add(new Option(category, category));

function feedback(text) {
  $("toast").textContent = text;
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2200);
}
async function copy(text) {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(text);
    feedback("Copied to clipboard");
  } catch {
    feedback("Copy unavailable here. Select the text in the code example.");
  }
}

function setPlayback(card) {
  card.style.setProperty(
    "--fx-play",
    paused || document.hidden || card.dataset.visible !== "true"
      ? "paused"
      : "running",
  );
}
function restore(card) {
  clearTimeout(timers.get(card));
  timers.delete(card);
}
function animate(card) {
  restore(card);
  const effect = cards.get(card);
  const specimen = card.querySelector(".specimen");
  if (effect.kind === "interaction") {
    const el = specimen.firstElementChild;
    el.classList.remove("demo-hover");
    void el.offsetWidth;
    el.classList.add("demo-hover");
    timers.set(
      card,
      setTimeout(() => {
        el.classList.remove("demo-hover");
        timers.delete(card);
      }, 1000),
    );
    return;
  }
  if (effect.kind === "toggle") {
    const el = specimen.firstElementChild;
    el.style.width = el.style.width === "180px" ? "100px" : "180px";
    return;
  }
  // Replace the preview only: avoids stale callbacks and per-node layout reads.
  specimen.innerHTML = effect.html;
  setPlayback(card);
  if (effect.exit) {
    const node = specimen.firstElementChild;
    requestAnimationFrame(() => {
      if (!node.isConnected) return;
      const animations = node.getAnimations({ subtree: true });
      Promise.all(animations.map((a) => a.finished))
        .then(() => {
          if (!node.isConnected) return;
          timers.set(
            card,
            setTimeout(() => {
              if (node.isConnected) node.classList.remove(effect.class);
              timers.delete(card);
            }, 550),
          );
        })
        .catch(() => {}); // Replay and preference changes cancel the old animation safely.
    });
  }
}
function showCode(effect) {
  selected = effect;
  $("code-title").textContent = effect.class;
  $("code-description").textContent = effect.description;
  $("code-requirement").textContent =
    effect.pack === "default"
      ? "Available in the default and expanded builds."
      : `Import flux-animation/${effect.pack} after the default/core base, or use flux-animation/all.`;
  let html = effect.html;
  if (effect.kind === "loop" && !effect.class.startsWith("fx-cycle-"))
    html = `<span role="status">\n  ${html.replaceAll("\n", "\n  ")}\n  <span class="sr-only">Loading…</span>\n</span>`;
  $("code-content").textContent = html;
  $("code-reduced").textContent = "Reduced motion: " + effect.reduced.replace(/^v2 policy: /, "");
  $("code-dialog").showModal();
}
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const card = entry.target;
      card.dataset.visible = String(entry.isIntersecting);
      setPlayback(card);
      if (entry.isIntersecting && !card.dataset.played) {
        card.dataset.played = "true";
        if (cards.get(card).exit) animate(card);
      }
    }
  },
  { threshold: 0.1 },
);
function render() {
  observer.disconnect();
  for (const card of cards.keys()) restore(card);
  cards.clear();
  const search = $("search").value.trim().toLowerCase();
  const effects = catalog.effects.filter(
    (e) =>
      (!newOnly || e.isNew) &&
      (!$("category").value || e.group === $("category").value) &&
      (!$("behavior").value || e.kind === $("behavior").value) &&
      (!$("cost").value || e.cost === $("cost").value) &&
      (!search ||
        (e.class + " " + e.description).toLowerCase().includes(search)),
  );
  const fragment = document.createDocumentFragment();
  for (const effect of effects) {
    const card = document.createElement("article");
    card.className = "effect";
    card.dataset.effect = effect.class;
    card.dataset.visible = "false";
    cards.set(card, effect);
    card.innerHTML =
      '<div class="stage"><div class="specimen"></div></div><div class="effect-head"><button class="class-name" title="Copy class name"></button></div><p class="description"></p><div class="effect-bottom"><button class="replay">↻ Replay</button><button class="code">Code</button><span class="cost-label"></span></div>';
    card.querySelector(".class-name").textContent = effect.class;
    card
      .querySelector(".class-name")
      .setAttribute("aria-label", "Copy " + effect.class);
    if (effect.isNew) {
      const label = document.createElement("span");
      label.className = "new-mark";
      label.textContent = "New";
      card.querySelector(".effect-head").append(label);
    }
    card.querySelector(".description").textContent = effect.description;
    card.querySelector(".cost-label").textContent =
      effect.kind === "loop" ? "↻ loop · " + effect.cost : effect.cost;
    const replay = card.querySelector(".replay");
    replay.setAttribute("aria-label", "Replay " + effect.class);
    if (effect.kind === "interaction") replay.textContent = "↗ Preview";
    card
      .querySelector(".code")
      .setAttribute("aria-label", "Show code for " + effect.class);
    card
      .querySelector(".class-name")
      .addEventListener("click", () => copy(effect.class));
    card
      .querySelector(".code")
      .addEventListener("click", () => showCode(effect));
    replay.addEventListener("click", () => animate(card));
    card.querySelector(".specimen").innerHTML = effect.html;
    setPlayback(card);
    fragment.append(card);
  }
  grid.replaceChildren(fragment);
  for (const card of cards.keys()) observer.observe(card);
  $("results").textContent =
    `${effects.length} ${effects.length === 1 ? "effect" : "effects"}${newOnly ? " · new additions" : ""}`;
  $("empty").hidden = effects.length !== 0;
}
$("scope-new").addEventListener("click", () => {
  newOnly = true;
  $("scope-new").setAttribute("aria-pressed", "true");
  $("scope-all").setAttribute("aria-pressed", "false");
  render();
});
$("scope-all").addEventListener("click", () => {
  newOnly = false;
  $("scope-new").setAttribute("aria-pressed", "false");
  $("scope-all").setAttribute("aria-pressed", "true");
  render();
});
for (const id of ["search", "category", "behavior", "cost"])
  $(id).addEventListener(id === "search" ? "input" : "change", render);
for (const [id, variable] of [
  ["duration", "--fx-dur"],
  ["distance", "--fx-dist"],
  ["delay", "--fx-delay"],
])
  $(id).addEventListener("change", () => {
    if ($(id).value) grid.style.setProperty(variable, $(id).value);
    else grid.style.removeProperty(variable);
  });
$("pause").addEventListener("click", () => {
  paused = !paused;
  $("pause").setAttribute("aria-pressed", String(paused));
  $("pause").textContent = paused ? "Resume" : "Pause";
  for (const card of cards.keys()) setPlayback(card);
});
$("replay-all").addEventListener("click", () => {
  for (const card of cards.keys())
    if (card.dataset.visible === "true") animate(card);
});
function visibility() {
  for (const card of cards.keys()) setPlayback(card);
  document
    .querySelector(".hero-art")
    .style.setProperty("--fx-play", document.hidden ? "paused" : "running");
}
document.addEventListener("visibilitychange", visibility);
$("close-dialog").addEventListener("click", () => $("code-dialog").close());
$("copy-example").addEventListener("click", () =>
  copy($("code-content").textContent),
);
$("code-dialog").addEventListener("click", (event) => {
  if (event.target === $("code-dialog")) {
    const r = $("code-dialog").getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      $("code-dialog").close();
  }
});
render();
