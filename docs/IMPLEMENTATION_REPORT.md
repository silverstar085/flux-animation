# Flux Animation 3.0.0 — implementation report

Prepared September 7, 2026. **Version 3.0.0. Npm publication is a separate release step.**

## Delivered

The default still exposes all **128 existing classes**. The expanded stylesheet exposes **201 public classes** using **114 keyframes**, compared with 79 keyframes in 2.2.0. The additions consist of:

| Addition | Count | Examples |
|---|---:|---|
| Entrances | 16 | Diagonal fades, directional springs, side zooms/drawers, four edge flips |
| Exits | 12 | Directional zoom/drawer exits, sideways flip, roll, swing; includes two aliases |
| Attention and ambient | 8 | Nod, vertical shake, hop, pendulum, breathe, recoil, settle, wobble |
| Interaction effects | 8 | Center/right/double underlines, overline, four directional tint fills |
| Loaders and skeletons | 8 | Orbiting/zigzag dots, phased bars, dual ring, pulse ring, sonar, skeleton wave |
| Optional visual effects | 8 | Four mask wipes, iris open/close, blur-zoom entrance/exit |
| Stagger variants | 4 | Down, zoom, rotate, roll-up |
| Playback and origin controls | 9 | Alternate, alternate-reverse, once, running, five origins |

That is **64 new effect entries** (including two aliases) and **nine utilities**, not 73 fundamentally different animation algorithms. Directional variants reuse keyframes.

The new effects live in optional packs and `flux.all.min.css`. The default gains the fixes while retaining its existing class count. Core/motion/all include the nine utilities. See the [full reference](ANIMATIONS.md) for all 174 effect/helper recipes and the [README](../README.md) for imports and controls.

## Final stylesheet sizes

Exact gzip level 9 and Brotli quality 11 measurements; bytes. `SIZES.json` also includes readable-source sizes, keyframe names, and exact class lists.

| Build | Minified bytes | Gzip bytes | Brotli bytes | Public classes |
|---|---:|---:|---:|---:|
| Default | 23,428 | **4,621** | 4,041 | 128 |
| Core | 9,866 | **2,363** | 2,051 | 83 |
| Motion add-on | 6,704 | **1,526** | 1,361 | 49 |
| Interactions add-on | 2,457 | **676** | 580 | 8 |
| Loaders add-on | 4,169 | **1,223** | 1,057 | 8 |
| Visual add-on | 1,700 | **620** | 535 | 8 |
| Expanded/all | 36,063 | **6,674** | 5,853 | 201 |

The default increases by **364 gzip bytes (8.6%)** over the original 4,257 bytes. The user explicitly approved a **4,800-byte default cap** to retain the control fixes; the reduced-motion redesign was subsequently withdrawn. Core remains below 2,500 bytes and all remains below 7,500 bytes. There are still **zero runtime dependencies and zero runtime JavaScript bytes**.

Downloading separate stylesheets incurs each one's compressed size. For example, core + motion + loaders totals 5,112 gzip bytes across three requests. Loading every pack separately with the default costs 8,666 bytes; choose the 6,674-byte flattened all build for that use case. These are transfer sizes, not the whole npm archive, which also contains readable CSS and documentation. An application downloads only its chosen CSS entry points.

## Fixes and optimizations

- Duration, easing, delay, pause/resume, reverse, and iteration controls reach the actual host, child, or pseudo-element animation target. Per-effect default durations are retained when no override is supplied.
- New-loader and cycle phase offsets scale with duration; explicit extra delay is added to the phase. Legacy dot/bar offsets remain fixed for compatibility.
- The requested reduced-motion redesign has been removed. The v2 .01ms/one-iteration/no-transition policy is retained, including original delay/pause/direction handling and opacity-only cycle fallback. New effects use the same policy.
- A minifier edge case produced invalid `NaNs` from a fractional-millisecond duration during development. The generated CSS now uses 0.00001s in authoring to preserve the valid .01ms output and tests reject invalid numeric output.
- Public cycle and dot-size variables inherit correctly. Stagger lists accept explicit indexes beyond the original 13-position range without expanding a large selector table.
- Shared initialization uses low specificity and accepts all HTML class whitespace. Dot-family layout selectors are explicit, avoiding accidental interference with the new dot designs.
- Removed blanket backface hiding. Intrinsic-size interpolation is scoped to `fx-width`, rather than inherited across the page. Decorative pseudo-elements do not intercept pointer input.
- New rings and sonar animate static border shapes using transforms and opacity. Existing shadow effects remain available with accurate rendering-cost labels.
- The showcase pauses offscreen and background previews, avoids its former per-node class/read replay loop, guards obsolete callbacks, and needs no downloaded fonts or assets.
- Authoring sources are organized by family. A pinned minifier and CSS parser generate reproducible artifacts, controls, reduced-motion coverage, metadata, sizes, and the reference. Optional packs and a flattened all build keep download choices explicit.

## Demo and documentation

`flux-showcase.html` is now a responsive, searchable catalog, starting on new additions. It includes category/behavior/rendering filters, duration/distance/delay controls, pause/resume, isolated replay, native keyboard/press examples, copy-class/copy-HTML actions. Code examples identify the required import and include accessibility guidance.

The README covers every public control, imports, build choices, CSS variables, composition, stagger indexes, loader markup, exit lifecycle, and development commands. The generated reference covers every effect/helper recipe. Release notes explain compatibility changes. `npm run preview` opens a local server; directly opening the HTML also works when its companion files remain alongside it.

## Validation

- Eight automated CSS/package/bundler checks: preserved classes/exports, size caps, keyframe resolution in every supported base/pack combination, catalog coverage, scoped global rules, real bundler imports, and combined packs.
- All **33 browser checks passed** (11 per engine), alongside all eight CSS/package/bundler checks. See [recorded validation](VALIDATION.json). Browser checks cover default durations, child/pseudo modifiers, inherited variables, stagger indexes, valid sampled animation states for all recipes, v2 reduced-motion policy parity, compatible base/pack combinations, representative v2.2.0 poses, synchronized cycle/loader timing, focus/origin/press behavior, and demo interactions/responsive layout.
- Tested browser engines: Chromium **153.0.8010.12**, Firefox **155.0**, WebKit **26.6**. Desktop/mobile viewport screenshots were inspected. WebKit uses the macOS keyboard-navigation preference; focus styling is checked in keyboard modality.
- This is browser-engine testing on the local Mac, not a claim of physical iOS/Android/Windows coverage. Visual checks compare representative legacy poses; they are not exhaustive pixel comparisons of every possible class combination.
- Generated-output drift checks, size gates, browser checks, and package inspection are included in CI.

## Measured rendering behavior

A local headless Chromium fixture measured three 1.5-second traces after warmup, using the same viewport and setup for each scenario. See [raw results](PERFORMANCE.json).

| Scenario | Elements | Median layout events | Median paint events | Median paint time | Median p95 frame interval |
|---|---:|---:|---:|---:|---:|
| v2.2.0 repeated entrances | 100 | 0 | 0 | 0 ms | 16.8 ms |
| Current repeated entrances | 100 | 0 | 0 | 0 ms | 16.7 ms |
| Legacy animated shadow halos | 20 | 0 | 1,911 | 34.7 ms | 16.8 ms |
| New transform/opacity pulse rings | 20 | 0 | 0 | 0 ms | 16.8 ms |

The entrance result confirms no recurring layout/paint in this fixture; the tiny frame-interval difference is noise, not a speedup claim. Ring and shadow effects have different appearances: the result supports offering the new border-ring technique, not calling it a pixel-equivalent replacement. No universal FPS, battery, memory, or GPU-promotion guarantee is made.

## Deliberate decisions and limits

- The default cap changed from the initial 4,500-byte target to 4,800 with explicit approval. The release is now 3.0.0 to signal the remaining breaking behavior changes; see [migration notes](MIGRATION.md). The nine new utilities are omitted from the default and provided by core/motion/all.
- Broad low-specificity FX initialization was retained for its compressed size. Reserve the `fx-` namespace for this library. Legacy descendant-dot markup and existing keyframe names are preserved; some duplicate legacy motion bodies remain for compatibility.
- Repeat counts apply per animated target, rather than introducing a group-timeline engine. Phase-shifted children can finish at different times. New-loader/cycle timing stays proportional; legacy offsets are documented.
- Legacy shadow/filter/mask/size effects were not silently replaced or removed. Masks/filters and layout helpers are labeled accurately; new higher-cost effects are optional.
- CSS controls do not remove nodes, manage focus/ARIA, split text, observe application state, or trigger scroll entrances automatically. The application owns those tasks.
- The old scripted chat hero was replaced with the focused animation catalog. All chat animation primitives remain documented and previewable under All effects; the showcase no longer runs an automatic chat conversation.

## Ready for local review

Run `npm run preview` and open `http://127.0.0.1:4173/flux-showcase.html`. The GitHub Pages demo is deployed from main. Publish the npm package separately after reviewing the catalog.
