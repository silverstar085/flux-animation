/* Demo-only controls. The distributed library contains CSS only. */
"use strict";
const catalog = window.FLUX_CATALOG;
const $ = (id) => document.getElementById(id);
const REPO = "https://github.com/silverstar085/flux-animation";
const grid = $("grid");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const latest = catalog.version.replace(/\.\d+$/, "");
const major = catalog.version.split(".")[0];
const params = new URLSearchParams(location.search);
const state = {
  search: params.get("q") || "",
  category: catalog.groups.includes(params.get("cat")) ? params.get("cat") : "",
  newOnly: params.get("new") === "1",
  autoplay: !reduceMotion.matches,
  paused: false,
};
const cards = new Map(); // card element → effect
const timers = new Map(); // card element → pending timeout
const runs = new Map(); // card element → run counter; stale callbacks compare against it
let selected = null,
  activeTab = "html",
  toastTimer;

const kb = (n) => (n / 1000).toFixed(2) + " KB";
$("version").textContent = "v" + catalog.version;
$("default-size").textContent = kb(catalog.sizes.default.gzip);
$("chat-size").textContent = kb(catalog.sizes.chat.gzip);
$("class-count").textContent = catalog.sizes.all.classes;
$("latest").textContent = latest;
$("search").value = state.search;
$("motion-note").hidden = !reduceMotion.matches;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}
function feedback(text) {
  $("toast").textContent = text;
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2200);
}
async function copy(text, message = "Copied to clipboard") {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(text);
    feedback(message);
  } catch {
    feedback("Copy unavailable here. Select the text instead.");
  }
}
function writeURL() {
  const next = new URLSearchParams();
  if (state.search) next.set("q", state.search);
  if (state.category) next.set("cat", state.category);
  if (state.newOnly) next.set("new", "1");
  const query = next.toString();
  history.replaceState(null, "", (query ? "?" + query : location.pathname) + location.hash);
}

/* ───────────── Catalog cards ───────────── */

function visible(card) {
  return card.dataset.visible === "true" && !document.hidden;
}
function setPlayback(card) {
  card.style.setProperty("--fx-play", state.paused || !visible(card) ? "paused" : "running");
}
function later(card, run, fn, ms) {
  clearTimeout(timers.get(card));
  timers.set(
    card,
    setTimeout(() => {
      if (runs.get(card) === run) fn();
    }, ms),
  );
}
function autoNext(card) {
  if (state.autoplay && !state.paused && visible(card)) play(card);
}
function play(card) {
  const run = (runs.get(card) || 0) + 1;
  runs.set(card, run);
  clearTimeout(timers.get(card));
  const effect = cards.get(card);
  const specimen = card.querySelector(".specimen");
  if (effect.kind === "interaction") {
    const node = specimen.firstElementChild;
    node.classList.remove("demo-hover");
    void node.offsetWidth;
    node.classList.add("demo-hover");
    later(card, run, () => {
      node.classList.remove("demo-hover");
      later(card, run, () => autoNext(card), 900);
    }, 1100);
    return;
  }
  if (effect.kind === "toggle") {
    const node = specimen.firstElementChild;
    node.style.width = node.style.width === "180px" ? "100px" : "180px";
    later(card, run, () => autoNext(card), 1600);
    return;
  }
  // Replace the preview: restarts every animation inside it without layout reads.
  specimen.innerHTML = effect.html;
  setPlayback(card);
  if (effect.kind !== "one-shot") return;
  requestAnimationFrame(() => {
    const node = specimen.firstElementChild;
    if (!node || runs.get(card) !== run) return;
    Promise.all(node.getAnimations({ subtree: true }).map((a) => a.finished))
      .then(() => {
        if (runs.get(card) !== run) return;
        // Exits end invisible: show the element again before the next play.
        if (effect.exit) node.classList.remove(effect.class);
        later(card, run, () => autoNext(card), effect.exit ? 900 : 1300);
      })
      .catch(() => {}); // A replay or filter change cancelled the old animation.
  });
}
function stop(card) {
  runs.set(card, (runs.get(card) || 0) + 1);
  clearTimeout(timers.get(card));
}
const observer = new IntersectionObserver(
  (entries) => {
    for (const { target: card, isIntersecting } of entries) {
      const was = card.dataset.visible === "true";
      card.dataset.visible = String(isIntersecting);
      setPlayback(card);
      if (isIntersecting && !was && (state.autoplay || !card.dataset.played)) {
        card.dataset.played = "true";
        play(card);
      }
    }
  },
  { threshold: 0.25 },
);

function packLabel(effect) {
  return effect.pack === "default" ? "" : effect.pack + " pack";
}
function makeCard(effect) {
  const card = el("article", "effect");
  card.id = effect.class;
  card.dataset.kind = effect.kind;
  card.dataset.visible = "false";
  cards.set(card, effect);
  const stage = el("div", "stage");
  stage.append(el("div", "specimen"));
  const head = el("div", "effect-head");
  const name = el("button", "class-name");
  name.type = "button";
  name.append(el("span", "", effect.class), el("span", "copy-icon", "⧉"));
  name.lastChild.setAttribute("aria-hidden", "true");
  name.setAttribute("aria-label", "Copy class " + effect.class);
  name.addEventListener("click", () => copy(effect.class, "Copied " + effect.class));
  const badges = el("span", "badges");
  if (effect.isNew) badges.append(el("span", "badge new", "New"));
  if (packLabel(effect)) badges.append(el("span", "badge", packLabel(effect)));
  head.append(name, badges);
  const bottom = el("div", "effect-bottom");
  const replay = el("button", "replay", effect.kind === "interaction" ? "↗ Preview" : "↻ Replay");
  replay.type = "button";
  replay.setAttribute("aria-label", "Replay " + effect.class);
  replay.addEventListener("click", () => play(card));
  const details = el("button", "details", "Details & code");
  details.type = "button";
  details.setAttribute("aria-label", "Details and code for " + effect.class);
  details.addEventListener("click", () => openDetail(effect));
  bottom.append(
    replay,
    details,
    el("span", "cost-label", (effect.kind === "loop" ? "↻ loop · " : "") + effect.cost),
  );
  card.append(stage, head, el("p", "description", effect.description), bottom);
  card.querySelector(".specimen").innerHTML = effect.html;
  // Hovering a card replays it, so no click is needed to see the motion.
  card.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && effect.kind !== "loop") play(card);
  });
  setPlayback(card);
  return card;
}

function matches(effect) {
  return (
    (!state.newOnly || effect.isNew) &&
    (!state.category || effect.group === state.category) &&
    (!$("behavior").value || effect.kind === $("behavior").value) &&
    (!$("cost").value || effect.cost === $("cost").value) &&
    (!state.search ||
      (effect.class + " " + effect.description + " " + effect.group)
        .toLowerCase()
        .includes(state.search.toLowerCase()))
  );
}
function renderChips() {
  const chips = $("categories");
  chips.replaceChildren();
  const pool = catalog.effects.filter((e) => !state.newOnly || e.isNew);
  for (const group of ["", ...catalog.groups]) {
    const count = pool.filter((e) => !group || e.group === group).length;
    if (group && !count) continue;
    const chip = el("button", "chip", group || "All");
    chip.type = "button";
    chip.append(el("span", "count", String(count)));
    chip.setAttribute("aria-pressed", String(state.category === group));
    chip.addEventListener("click", () => {
      state.category = group;
      update();
    });
    chips.append(chip);
  }
}
function render() {
  observer.disconnect();
  for (const card of cards.keys()) stop(card);
  cards.clear();
  const effects = catalog.effects.filter(matches);
  const fragment = document.createDocumentFragment();
  for (const group of catalog.groups) {
    const members = effects.filter((e) => e.group === group);
    if (!members.length) continue;
    const section = el("section", "group");
    section.setAttribute("aria-label", group);
    const title = el("h3", "group-title", group);
    title.append(el("span", "count", String(members.length)));
    const list = el("div", "cards");
    for (const effect of members) list.append(makeCard(effect));
    section.append(title, list);
    fragment.append(section);
  }
  grid.replaceChildren(fragment);
  for (const card of cards.keys()) observer.observe(card);
  const scope = [state.category, state.newOnly ? "new in " + latest : "", state.search && `“${state.search}”`]
    .filter(Boolean)
    .join(" · ");
  $("results").textContent = `${effects.length} ${effects.length === 1 ? "effect" : "effects"}${scope ? " · " + scope : ""}`;
  $("empty").hidden = effects.length !== 0;
}
function update() {
  renderChips();
  render();
  writeURL();
}

$("search").addEventListener("input", () => {
  state.search = $("search").value.trim();
  update();
});
for (const id of ["behavior", "cost"]) $(id).addEventListener("change", update);
function toggle(id, key, after) {
  const button = $(id);
  button.setAttribute("aria-pressed", String(state[key]));
  button.addEventListener("click", () => {
    state[key] = !state[key];
    button.setAttribute("aria-pressed", String(state[key]));
    after();
  });
}
toggle("new-only", "newOnly", update);
toggle("autoplay", "autoplay", () => {
  if (state.autoplay) for (const card of cards.keys()) if (visible(card)) play(card);
});
const pause = $("pause");
pause.addEventListener("click", () => {
  state.paused = !state.paused;
  pause.setAttribute("aria-pressed", String(state.paused));
  pause.textContent = state.paused ? "Resume" : "Pause all";
  for (const card of cards.keys()) setPlayback(card);
  document.querySelector(".playground").style.setProperty("--fx-play", state.paused ? "paused" : "running");
  if (state.paused) stopPlayground();
  else startPlayground();
});
for (const [id, attr] of [
  ["dark-stage", "stage"],
  ["large", "large"],
]) {
  const button = $(id);
  const apply = () => {
    const on = button.getAttribute("aria-pressed") === "true";
    if (attr === "stage") grid.dataset.stage = on ? "dark" : "light";
    else grid.classList.toggle("large", on);
  };
  button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    apply();
  });
  apply();
}
for (const [id, variable] of [
  ["duration", "--fx-dur"],
  ["distance", "--fx-dist"],
  ["delay", "--fx-delay"],
])
  $(id).addEventListener("change", () => {
    if ($(id).value) grid.style.setProperty(variable, $(id).value);
    else grid.style.removeProperty(variable);
    // Show the new timing right away.
    for (const card of cards.keys()) if (visible(card)) play(card);
  });
document.addEventListener("visibilitychange", () => {
  for (const card of cards.keys()) setPlayback(card);
  document.querySelector(".hero").style.setProperty("--fx-play", document.hidden ? "paused" : "running");
});

/* ───────────── Detail dialog ───────────── */

function controlled() {
  const template = document.createElement("template");
  template.innerHTML = selected.html;
  const nodes = [...template.content.querySelectorAll("*")].filter((n) =>
    n.classList.contains(selected.class),
  );
  const dur = Number($("dur").value),
    delay = Number($("det-delay").value);
  for (const node of nodes) {
    if ($("loop").checked) node.classList.add("fx-loop");
    if ($("easing").value) node.classList.add($("easing").value);
    if (dur) node.style.setProperty("--fx-dur", dur + "ms");
    if (delay) node.style.setProperty("--fx-delay", delay + "ms");
  }
  return template.innerHTML;
}
function smallestImport(effect) {
  if (effect.chat) return "import 'flux-animation/chat';";
  if (effect.core) return "import 'flux-animation/core';";
  if (effect.pack === "default") return "import 'flux-animation';";
  return `import 'flux-animation/core';\nimport 'flux-animation/${effect.pack}';`;
}
function code(tab) {
  let html = controlled();
  if (selected.kind === "loop" && html.includes('aria-hidden="true"') && !selected.class.startsWith("fx-cycle-"))
    html = `<span role="status">\n  ${html.replaceAll("\n", "\n  ")}\n  <span class="sr-only">Loading…</span>\n</span>`;
  if (tab === "npm")
    return `// Everything\nimport 'flux-animation/all';\n\n// Or the smallest bundle with ${selected.class}\n${smallestImport(selected)}`;
  if (tab === "cdn")
    return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-animation@${major}/flux.all.min.css">\n\n${html}`;
  return html;
}
function renderDetail() {
  $("detail-specimen").innerHTML = controlled();
  $("code-content").textContent = code(activeTab);
  $("dur-out").textContent = Number($("dur").value) ? $("dur").value + " ms" : "default";
  $("delay-out").textContent = $("det-delay").value + " ms";
}
function openDetail(effect, updateHash = true) {
  selected = effect;
  $("detail-title").textContent = effect.class;
  $("detail-description").textContent = effect.description;
  $("detail-tags").textContent = [
    effect.pack === "default" ? "default bundle" : packLabel(effect),
    effect.chat ? "chat preset" : "",
    effect.since === "2.x" ? "since 2.x" : "new in " + effect.since,
    effect.kind,
    effect.cost,
  ]
    .filter(Boolean)
    .join(" · ");
  $("dur").value = 0;
  $("det-delay").value = 0;
  $("easing").value = "";
  $("loop").checked = false;
  $("loop").disabled = effect.kind !== "one-shot";
  $("code-reduced").textContent = "Reduced motion: " + effect.reduced;
  $("reference-link").href = `${REPO}/blob/main/docs/ANIMATIONS.md#${effect.class}`;
  selectTab("html");
  if (!$("detail").open) $("detail").showModal();
  if (updateHash) history.replaceState(null, "", location.search + "#" + effect.class);
}
function selectTab(tab) {
  activeTab = tab;
  for (const button of document.querySelectorAll('[role="tab"]')) {
    const on = button.dataset.tab === tab;
    button.setAttribute("aria-selected", String(on));
    button.tabIndex = on ? 0 : -1;
    if (on) $("code-panel").setAttribute("aria-labelledby", button.id);
  }
  renderDetail();
}
const tabs = [...document.querySelectorAll('[role="tab"]')];
for (const button of tabs) {
  button.addEventListener("click", () => selectTab(button.dataset.tab));
  button.addEventListener("keydown", (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    const next = tabs[(tabs.indexOf(button) + step + tabs.length) % tabs.length];
    next.focus();
    selectTab(next.dataset.tab);
  });
}
for (const id of ["dur", "det-delay", "easing", "loop"])
  $(id).addEventListener("input", renderDetail);
$("detail-replay").addEventListener("click", renderDetail);
$("copy-code").addEventListener("click", () => copy($("code-content").textContent));
$("copy-link").addEventListener("click", () =>
  copy(location.origin + location.pathname + "#" + selected.class, "Link copied"),
);
$("close-detail").addEventListener("click", () => $("detail").close());
$("detail").addEventListener("close", () => {
  $("detail-specimen").replaceChildren();
  history.replaceState(null, "", location.pathname + location.search);
});
$("detail").addEventListener("click", (event) => {
  if (event.target !== $("detail")) return;
  const r = $("detail").getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)
    $("detail").close();
});

/* ───────────── Chat playground ───────────── */

const ANSWER =
  "Add the fx-typing class to an empty span while you wait for a reply. Swap it for the message when the first token arrives, and give each streamed word fx-stream-word.";
const playground = { run: 0, visible: false };
function stopPlayground() {
  playground.run++;
}
function startPlayground() {
  if (playground.visible && !state.paused && !document.hidden) runPlayground();
}
function indicator(name) {
  if (name === "fx-shimmer-text") return el("span", name, "Thinking…");
  if (name === "fx-ellipsis") return el("span", name, "Thinking");
  const node = el("span", name);
  if (name !== "fx-typing") node.innerHTML = "<i></i><i></i><i></i>";
  return node;
}
async function runPlayground() {
  const run = ++playground.run;
  const speed = $("pg-speed").value;
  const factor = speed === "fx-fast" ? 0.6 : speed === "fx-slow" ? 1.6 : 1;
  const wait = (ms) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (run === playground.run ? resolve() : reject(new Error("stale"))), ms * factor),
    );
  const entrance = $("pg-entrance").value,
    waiting = $("pg-indicator").value;
  const extra = speed ? " " + speed : "";
  $("pg-classes").textContent = ["fx-msg-user", waiting, "fx-step", "fx-step-done", entrance, "fx-stream-word", "fx-caret-dot", speed]
    .filter(Boolean)
    .join(" · ");
  const log = $("pg-log");
  log.replaceChildren();
  try {
    log.append(el("div", "pg-bubble user fx-msg-user" + extra, "Can you add a typing indicator to my chat app?"));
    await wait(900);
    const row = el("div", "pg-row fx-fade" + extra);
    row.append(indicator(waiting));
    log.append(row);
    await wait(1900);
    row.remove();
    const steps = el("ul", "pg-steps fx-fade" + extra);
    log.append(steps);
    for (const [doing, done] of [
      ["Reading the docs", "Read the docs"],
      ["Writing an example", "Wrote an example"],
    ]) {
      const step = el("li", "fx-step", doing);
      steps.append(step);
      await wait(1100);
      step.className = "fx-step-done";
      step.textContent = done;
    }
    await wait(350);
    const answer = el("div", "pg-bubble bot " + entrance + extra);
    const text = el("p", "fx-caret-dot");
    answer.append(text);
    log.append(answer);
    for (const word of ANSWER.split(" ")) {
      text.append(el("span", "fx-stream-word", word), " ");
      log.scrollTop = log.scrollHeight;
      await wait(60);
    }
    text.classList.remove("fx-caret-dot");
    await wait(4000);
    runPlayground();
  } catch {
    // A newer run (replay, setting change, pause) replaced this one.
  }
}
for (const id of ["pg-indicator", "pg-entrance", "pg-speed"])
  $(id).addEventListener("change", runPlayground);
$("pg-replay").addEventListener("click", runPlayground);
new IntersectionObserver(([entry]) => {
  playground.visible = entry.isIntersecting;
  if (entry.isIntersecting) startPlayground();
  else stopPlayground();
}).observe(document.querySelector(".playground"));
document.addEventListener("visibilitychange", () => (document.hidden ? stopPlayground() : startPlayground()));

/* ───────────── Start ───────────── */

update();
const linked = catalog.effects.find((e) => "#" + e.class === location.hash);
if (linked) {
  if (!matches(linked)) {
    Object.assign(state, { search: "", category: "", newOnly: false });
    $("search").value = "";
    $("new-only").setAttribute("aria-pressed", "false");
    update();
  }
  $(linked.class).scrollIntoView({ block: "center" });
  openDetail(linked, false);
}
