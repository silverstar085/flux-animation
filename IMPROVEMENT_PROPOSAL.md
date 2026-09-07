# Flux Animation improvement proposal

Status: approved with subsequent revisions (3.0.0 major release; reduced-motion redesign withdrawn) and implemented as a local 3.0.0 release preview. See `docs/IMPLEMENTATION_REPORT.md` for results, validation, and deviations. The user approved a revised 4,800-byte default gzip cap to retain the full control/accessibility fixes. The original targets below are preserved as proposal history.

Reviewed September 7, 2026, against v2.2.0 (`80eed63`).

## Recommendation

Keep Flux a CSS-only library with zero runtime dependencies and an effect that works by adding a class. First fix inconsistent controls and accessibility behavior, then expand the catalog through shared keyframes and optional packs. Preserve the existing small default download and provide one expanded stylesheet for users who want the entire collection.

This proposal includes **60 additional effect class names**: 58 new presets and two compatibility aliases. Directional presets share motion families; this is not a claim of 60 fundamentally different animations. Four additional stagger variants and small playback/origin utilities are proposed separately.

The full expansion will cost bytes. Optional distribution files make that cost a choice. Size caps below are proposed release gates, not measured outcomes or guaranteed savings.

## 1. Current project baseline

Reviewed `flux.css`, `flux.min.css`, `flux-showcase.html`, `README.md`, `package.json`, and repository configuration.

| Measurement | Current result |
|---|---:|
| Readable CSS | 31,114 bytes |
| Minified CSS | 21,520 bytes |
| Minified CSS, gzip level 9 | **4,257 bytes** (4.26 decimal KB / 4.16 KiB) |
| Distinct explicit `.fx-*` class selectors | 128 |
| Keyframe definitions | 79 |
| Runtime JavaScript / dependencies in the package | None |
| Build scripts, automated checks, CI configuration | None present |

Gzip was measured locally with Python `gzip.compress(data, compresslevel=9, mtime=0)`. Class and keyframe counts exclude comments. The source and minified file match after removing comments, whitespace, and optional final declaration semicolons; that is a textual consistency check, not a CSS parser or browser equivalence test.

The current ~4.2 KB claim is reasonable. Existing strengths worth preserving include shared directional keyframes, CSS variables, reduced-motion rules, touch press fallbacks, plain HTML examples, and direct npm/CDN consumption.

This review establishes source-level findings and byte measurements. No browser profiling, device benchmarks, or visual regression runs were performed. Performance changes need the validation described below before being called improvements.

## 2. Fixes and optimizations

### P0 — Make modifiers reliable

**Speed controls do not apply consistently.** In `flux.css`, `.fx-fast` changes `--fx-dur`, but effects such as `.fx-bounce-in` and `.fx-pulse` use literal durations. `.fx-spin`, dot loaders, and pseudo-element loaders also hard-code timing through animation shorthands. For example, `fx-pulse fx-fast` still uses the pulse's `.9s` duration.

Proposed change: route timing through a consistent variable contract while retaining each effect's existing default. Explicit speed classes and per-element settings should override that default. Preserve the global `--fx-dur` behavior for ordinary entrances; define separately how loader defaults interact with global timing. Avoid assigning a public variable on an effect selector when that would unexpectedly shadow an inherited user setting.

**Pause, repeat, delay, and easing modifiers miss animation targets.** `fx-paused` pauses the host element, but the actual animation can be on a child or pseudo-element. The same problem affects other host-only modifiers. For example, `fx-dots-wave fx-paused` leaves its dots running. CSS animation play state is not inherited automatically. [MDN: animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-play-state)

Proposed change: explicitly route supported controls to each component's animation targets. Parent pause must cover dots, bars, cycles, and decorative pseudo-elements without pausing arbitrary unrelated descendants. Preserve relative stagger/loader phases when adding a delay. Specify whether finite repeats count a complete component cycle or each child animation; use complete coordinated cycles for new loaders. Test cascade specificity as well as source order.

### P0 — Give reduced motion a deliberate final state

The current media query shortens animation duration and disables transitions but retains delays. Delayed entrances can therefore remain invisible until their original delay expires. Paused entrances can remain at their initial state. Hover transforms still change instantly, and some indicators finish with their moving decoration offscreen. Cycles already have a useful first-item fallback, but their opacity-zero siblings remain present.

Proposed behavior:

- Entrances: reveal content immediately, with no travel, delay, or paused hidden state.
- Exits and size changes: reach the intended final state immediately; do not reset every effect to visible.
- Continuous loaders: stop motion and display a stable, recognizable indicator alongside meaningful status text.
- Cycles: show one readable item and hide inactive items from interaction. Decorative rotating text should have a separate stable accessible label; meaningful live status comes from application state.
- Hover/focus: retain a visible focus cue and static interaction feedback without spatial motion.
- Showcase: disable smooth scrolling and automatic chat playback under reduced motion; react if the preference changes while the page is open.

Do not promise that `animationend` always fires: turning animation off can remove that event path. Document exit cleanup that handles reduced motion, cancellation, and an already-completed animation, with a filtered `animationend` handler for normal playback. CSS supplies the visual state; application code owns DOM removal and focus management. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)

### P1 — Reduce rendering work where the visual result allows it

The showcase says every keyframe uses only transform and opacity and causes no layout or paint. Actual exceptions include animated `box-shadow` (`fx-glow`, `fx-bloom`, `fx-ripple`, `fx-ping`), filters (`fx-blur`, `fx-thought`, brightness hover), clip paths (`fx-wipe`, `fx-reveal`), and max dimensions (`fx-expand-*`, `fx-collapse-*`).

Use transform/opacity for new everyday effects. Prototype static rings and shadows on pseudo-elements, animating their scale and opacity for halos and pulses. Profile before replacing a legacy shadow effect: the appearance, clipping, stacking, and availability of `::before`/`::after` must remain acceptable. Keep filters and masks in an optional visual-effects pack for new additions. Existing effects remain available through the default entry point.

Remove blanket `backface-visibility: hidden` from unrelated effects if browser checks confirm it is unnecessary; retain it selectively for 3D effects where useful. Do not add blanket `will-change`, `translateZ(0)`, or containment rules. GPU layer promotion is a browser decision, and more layers can cost memory. These are profiling candidates, not guaranteed wins. [web.dev: high-performance animations](https://web.dev/articles/animations-guide)

Keep layout-changing size helpers, accurately labeled. Scale effects visually stretch content and do not reflow surrounding layout; they are suitable for shapes and decorative surfaces, not a universal replacement for accordion sizing.

### P1 — Deduplicate without changing behavior

- `fxFlipX` and `fxSwing` currently have identical keyframe bodies. Their classes can share motion while keeping their distinct transform origins.
- Parameterize new directions, offsets, angles, and scales using shared family keyframes. Preserve private variable isolation so nesting does not inherit another effect's direction by accident.
- Compare shared rules with separate rules using compressed bytes. Fewer source lines or keyframes do not automatically mean a smaller gzip file.
- Preserve legacy defaults and endpoint behavior. Do not merge entrances and exits solely through `animation-direction: reverse`: delays, fill state, easing, and existing reverse modifiers can change the result.
- Inventory documented/raw keyframe-name usage before renaming existing keyframes. If compatibility requires retaining a duplicate, keep it or reserve removal for a major version.

### P1 — Make selectors and composition predictable

The broad `[class^="fx-"], [class*=" fx-"]` base affects helper-only elements and unrelated classes sharing the prefix. It also assumes a literal space before a non-leading class, whereas HTML class tokens can be separated by tabs or newlines. Dot-loader selectors match every descendant `i`, including nested content.

Evaluate generated explicit class groups for initialization and scoped loader targets. Measure their size and specificity cost before changing the base. Keep the add-one-class API; do not require a new mandatory `fx` base class. New loaders should use documented direct children. Tightening legacy descendant selectors requires a compatibility check and migration note for nested markup.

Define composition as **one primary effect plus modifiers per element**. Two classes that both set `animation-name` do not automatically blend. Hover transforms can also conflict with retained animation transforms. Recommend an outer entrance wrapper with an inner interactive element when both are needed. Do not introduce a complex additive animation engine.

Keep `animation-fill-mode: both` where initial delays or final exit/size states require it. Investigate releasing completed entrance styles only where equivalent behavior is verified; changing fill mode globally would break held states. [MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-fill-mode)

### P1 — Scope global behavior and repair documentation gaps

- Move `interpolate-size: allow-keywords` from `:root` to relevant size helpers, guarded as a progressive enhancement. Its inherited root setting currently affects unrelated page sizing. Keep explicit-size fallbacks, and verify browser support at implementation time. [MDN: interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size)
- Fix public defaults that shadow global configuration: `.fx-cycle-*` sets `--fx-cycle: 6s` locally despite the documented global knob; dot families similarly set `--fx-dot` locally. Use fallback values so inherited configuration works.
- Document that stagger variants currently require `fx-stagger`, that the first child waits one stagger interval, and that children 13 onward share the same delay. Preserve this timing by default; offer an explicit index override for longer lists rather than hundreds of `nth-child` rules.
- Document pseudo-element ownership and clipping. Decorative overlays should use `pointer-events: none`; avoid silently colliding with an application's existing pseudo-element.
- Add keyboard focus feedback to relevant interaction effects, preserve native outlines, and demonstrate semantic buttons/links.
- Explain that opacity-zero exits remain in the DOM and may remain focusable. Class-only animation does not manage accessibility state, remove nodes, update text, or detect application events.

## 3. Expanded animation catalog

Every new preset should have useful defaults and work without custom JavaScript. Adding the class starts one-shot effects; interaction effects use hover, focus, or press; loaders loop automatically. Existing markup may need a wrapper to combine transforms. Multi-part loaders require the small child structure explicitly shown in their examples.

Class names below are proposed and do not exist yet. Names describing an entrance direction mean its source edge; exit directions mean its destination edge. All presets get reduced-motion handling and documented performance characteristics.

### Entrances — 16 names

| Classes | Visual / intended use | Implementation |
|---|---|---|
| `fx-up-left`, `fx-up-right`, `fx-down-left`, `fx-down-right` | Diagonal fade entrances for notifications and floating panels | One translate + opacity family; names identify source corner |
| `fx-spring-up`, `fx-spring-down`, `fx-spring-left`, `fx-spring-right` | Short directional entrance with a restrained overshoot and settle | Shared multi-stop transform family; distinct from a simple easing modifier |
| `fx-zoom-left`, `fx-zoom-right` | Scale + lateral entrance for cards and messages | Extend existing zoom-direction family |
| `fx-sheet-left`, `fx-sheet-right` | Full-width drawer entrances | Translate by the element's own width |
| `fx-flip-in-top`, `fx-flip-in-bottom`, `fx-flip-in-left`, `fx-flip-in-right` | More pronounced edge-hinged card reveal | Shared perspective/rotation family with origin presets |

### Exits and naming symmetry — 12 names

| Classes | Visual / intended use | Implementation |
|---|---|---|
| `fx-right-out` | Predictable rightward exit name | Alias of existing `fx-slide-out`; preserve the original name |
| `fx-zoom-up-out`, `fx-zoom-down-out`, `fx-zoom-left-out`, `fx-zoom-right-out` | Small scale-away plus directional dismissal | Shared transform + opacity family |
| `fx-sheet-up-out`, `fx-sheet-down-out`, `fx-sheet-left-out`, `fx-sheet-right-out` | Drawer dismissals toward each edge | Down variant aliases existing `fx-sheet-out`; three new directions |
| `fx-flip-y-out` | Sideways 3D dismissal | Counterpart to `fx-flip-y` |
| `fx-roll-out` | Roll away with lateral travel and fade | Counterpart to `fx-roll-in` |
| `fx-swing-out` | Hinge a surface away from its top edge | Counterpart to `fx-swing` |

### Attention and ambient motion — 8 names

| Class | Visual / intended use |
|---|---|
| `fx-nod` | Two small vertical movements for acknowledgment |
| `fx-shake-y` | Vertical version of error shake |
| `fx-hop` | Small lift with a squash/stretch landing, suited to icons |
| `fx-pendulum` | Slow, top-anchored swing with smooth reversals |
| `fx-breathe` | Very subtle scale + opacity cycle for calm status surfaces |
| `fx-recoil` | Brief compression followed by a small recovery overshoot |
| `fx-settle` | Damped rotational settling, like placing an object on a surface |
| `fx-wobble` | Side-to-side travel coupled with rotation, distinct from stationary wiggle |

Default to one-shot attention effects; `fx-breathe` and `fx-pendulum` loop by default and support pause/finite-repeat controls. Keep amplitudes restrained. Compare these with pulse, bounce, rubber, wiggle, and bell in the showcase; consolidate any preset that does not look meaningfully different.

### Hover, focus, and press — 8 names

| Classes | Visual / intended use |
|---|---|
| `fx-underline-center` | Underline expands from the center |
| `fx-underline-right` | Underline grows from the right |
| `fx-underline-double` | Two coordinated underline strokes |
| `fx-overline` | Top-edge stroke reveals on interaction |
| `fx-fill-h-left`, `fx-fill-h-right`, `fx-fill-h-up`, `fx-fill-h-down` | Tinted background sweeps from the named edge behind a button or link label |

Use transformed pseudo-elements with static backgrounds. Document which pseudo-elements each class consumes. Give every fill a default low-opacity tint and test text contrast and stacking on light/dark surfaces. Keep keyboard focus visible when motion is reduced.

### Loaders and skeletons — 8 names

| Class | Visual / intended use | Markup |
|---|---|---|
| `fx-dots-orbit` | Dots physically orbit a center; existing dots-spinner only fades positioned dots | Three decorative children |
| `fx-dots-zigzag` | Alternating vertical and lateral dot motion | Three decorative children |
| `fx-bars-wave` | Five bars rise and fall with smooth phase offsets | Five decorative children |
| `fx-bars-travel` | Opacity emphasis travels along a row of bars | Five decorative children |
| `fx-dual-ring` | Two opposing rotating arcs | One element, two pseudo-elements |
| `fx-ring-pulse` | Outlined ring expands and fades | One element, one pseudo-element |
| `fx-sonar` | Two expanding rings with offset phases | One element, two pseudo-elements |
| `fx-skeleton-wave` | Angled highlight moves across a skeleton block | One element, one pseudo-element |

Use transforms and opacity for moving parts, static borders/gradients for appearance, and `currentColor` or inherited variables for theme integration. Provide a stable reduced-motion state. Do not imply progress percentage or success through an indeterminate loader. Decorative markup should be hidden from assistive technology with status text supplied separately.

### Optional visual-effects pack — 8 names

| Classes | Visual / intended use | Cost note |
|---|---|---|
| `fx-wipe-up`, `fx-wipe-down`, `fx-wipe-left`, `fx-wipe-right` | Directional unmasking from the named edge, preserving the content's proportions | Clip-path; profile browser rendering |
| `fx-iris-in`, `fx-iris-out` | Circular reveal and close around a configurable origin | Clip-path; best on small surfaces |
| `fx-blur-zoom-in`, `fx-blur-zoom-out` | Focus pull with a small scale change | Filter + transform + opacity; avoid dense simultaneous use |

Existing `fx-wipe` and `fx-reveal` also fade. The proposed directional wipe presets unmask without fading, so they are listed as new presets rather than aliases. If that distinction is not useful in preview, prefer aliases and report the count honestly.

## 4. Small API additions

Add `fx-alternate`, `fx-alternate-reverse`, `fx-once`, and `fx-running` for predictable playback. Add `fx-origin-top`, `fx-origin-bottom`, `fx-origin-left`, `fx-origin-right`, and `fx-origin-center` for reusable transform origins. They should override effect defaults consistently without changing unrelated descendants.

Add `fx-stagger-down`, `fx-stagger-zoom`, `fx-stagger-rotate`, and `fx-stagger-roll-up`, reusing existing/new keyframes. Preserve the two-class parent convention and show the complete markup in copied examples. The roll variant needs a clipping wrapper where overflow would be visible.

Keep the public variable surface small: retain existing controls, add `--fx-delay` for arbitrary delay and `--fx-index` for explicit stagger positions beyond the built-in range, and introduce only family-specific amplitude/angle/loader-size controls that are useful in actual examples. Define precedence: local explicit settings and modifier classes override inherited settings, with effect defaults last. Use private variables for implementation details.

Proposed usage with the expanded stylesheet:

```html
<link rel="stylesheet" href="flux.all.min.css">

<div class="fx-spring-up">New message</div>
<div class="fx-zoom-left fx-fast">Quick entrance</div>
<button class="fx-fill-h-left">Run analysis</button>

<span role="status">
  <span class="fx-dual-ring" aria-hidden="true"></span>
  Loading…
</span>

<ul class="fx-stagger fx-stagger-zoom">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

Class re-addition does not automatically replay an animation that is already applied. Document a small optional application-side replay recipe. Scroll-triggered reveals, automatic text splitting, timelines, and DOM lifecycle management remain outside the zero-JS core.

## 5. Distribution and byte budgets

Retain all 128 existing classes and existing import/CDN paths. Split authoring sources by category and generate checked-in readable/minified distribution files. Consumers still receive plain CSS and need no build tool.

| Artifact / proposed import | Contents | Proposed gzip level-9 gate |
|---|---|---:|
| `flux-animation` → `flux.min.css` | Existing catalog, fixes, and only additions that fit | **≤4,500 bytes**; aim to stay at or below 4,257 |
| `flux-animation/core` | Optional curated transform/opacity subset, shared defaults and controls | Target ≤2,500 bytes; confirm after selecting exact contents |
| `flux-animation/motion` | Extra entrances, exits, attention, and stagger effects | Measure independently and combined with default |
| `flux-animation/interactions` | Extra hover/focus/press effects | Measure independently and combined with default |
| `flux-animation/loaders` | Extra loader/skeleton effects | Measure independently and combined with default |
| `flux-animation/visual` | Extra masks and blur effects | Measure independently and combined with default |
| `flux-animation/all` → `flux.all.min.css` | Existing catalog plus approved additions and controls | **Target ≤7,500 bytes**; validate before finalizing scope |

The default cap allows at most 243 bytes (~5.7%) growth. First prioritize correctness within it; do not silently increase the cap to fit new effects. If required fixes cannot fit, report the measured tradeoff before adjusting the budget.

Add-on packs require either the default or core stylesheet. Generate shared primitives once in each supported combination and make `all` a flattened, deduplicated build. Do not use CSS `@import` chains. Define ownership of shared keyframes and ensure packs work with either supported base, in documented order, without missing dependencies or conflicting definitions. Distinct pack imports should coexist.

The optional core is an alternative base, not a replacement for the default and not a claim that all legacy classes become transform/opacity-only. Its exact class list must be published.

Provide examples for both `import 'flux-animation/all'` and a single CDN link. Existing users keep their current download; users opting into the expanded catalog change one import/link and continue adding classes normally.

If the full target is exceeded, rank animations by visual distinctiveness, usefulness, and compressed marginal cost. Consolidate similar presets or defer lower-value families before increasing the cap. No runtime JS, fonts, images, framework bindings, or third-party assets belong in the library package.

## 6. Build, package, and documentation improvements

- Add a small deterministic build script and one pinned CSS minifier as a development dependency. Keep readable sources authoritative and preserve the MIT license notice in published outputs.
- Add build/check/size scripts and a lockfile. Report raw, minified, gzip, and Brotli sizes where available, using documented compression settings. Track both each artifact and realistic import combinations.
- Generate an effect manifest containing class, category, animation target, markup requirements, defaults, reduced-motion behavior, and rendering-cost notes. Use it for catalog coverage, documentation, and demo metadata so counts do not drift.
- Update `exports` and `files` for the approved artifacts. Mark CSS as side-effectful for bundlers where appropriate, and smoke-test real imports; do not claim automatic per-class CSS tree shaking.
- Add CI that regenerates distributions, detects drift, checks budgets, validates referenced keyframes/classes, runs meaningful browser checks, and inspects `npm pack --dry-run` contents.
- Document all existing effects as well as additions, modifier support, class conflicts, RTL direction conventions, and complete accessible markup. Keep physical left/right classes physical; document direction-aware application choices instead of silently reversing legacy behavior.
- Replace blanket GPU/no-paint/no-jank claims with accurate per-family guidance and measured results. Generate size/class badges from the build. Update stale source comments about delay range and cycle counts.
- Preserve unmodified legacy defaults and examples. Treat behavior changes such as global sizing scope, selector narrowing, or modifier precedence as explicit compatibility decisions, with release notes. Reserve removals or unavoidable breaks for a major version.

## 7. Showcase improvements

Make the expanded catalog easy to explore without increasing the shipped CSS payload:

- Add class-name search and filters for category, one-shot/loop/interaction, markup requirements, and transform/opacity versus layout/filter/mask effects.
- Copy a class name or a complete HTML example, including required parent/child classes and accessible loader labels.
- Add speed, distance, delay, replay, and pause controls plus a reduced-motion preview. Show each effect's default and practical use.
- Pause offscreen demo loops with `IntersectionObserver` and suspend the chat demo while the page is hidden. These are showcase-only scripts; the CSS package stays JS-free. Resume only playback that was active before suspension.
- Batch replay writes/reads instead of alternating class changes and `offsetWidth` reads inside the modifier loop. Profile this demo optimization separately from the CSS library.
- Cancel stale exit/replay timers, handle animation cancellation in swap previews, and filter bubbled animation events. Rapid replay should not remove a newly restarted effect.
- Avoid nested interactive controls inside replay regions, retain keyboard-operable replay buttons, and show truthful clipboard failure feedback.
- Provide static readable content before showcase JavaScript runs. The demo currently builds its catalog from JavaScript and automatically runs a timed chat; that is separate from the library's zero-JS claim.

## 8. Validation and acceptance criteria

### Behavior and compatibility

Test generated default/core/pack/all entry points in Chromium, Firefox, and WebKit, with touch and keyboard checks. Record actual versions; include real Safari/iOS checks for representative 3D, mask, and sizing behavior when available.

Cover representative effects from every animation target type: host, direct child, and pseudo-element. Verify speed, arbitrary delay, pause/resume, repeat counts, reverse, origins, stagger phases, nested effects, and custom-variable overrides. Check first/mid/final frames rather than relying solely on time-based screenshots. Compare legacy defaults with v2.2.0.

Test normal and reduced motion, including a delayed entrance, paused entrance, exit, collapse, looping loader, cycle with multiple children, and a preference change during playback. Ensure no content remains unintentionally invisible and no invisible demo item traps keyboard focus. Test existing transforms, overflow containers, dark backgrounds, and tab/newline-separated class attributes.

### Performance

Create a small benchmark fixture with individual effects, 100 simultaneous entrance elements, and 20 loader groups. Record before/after traces on the same browser, device, viewport, and throttling settings, using repeated runs and comparing medians.

Inspect layout/paint activity, frame-time distribution, dropped frames, layer count, and memory where tooling exposes it. Require no recurring layout attributable to the transform/opacity-only families after setup. Confirm that proposed halo replacements reduce paint in the tested cases without a material visual regression. Do not present CPU throttling as a substitute for real mobile GPU testing.

Keep profiling fixtures, screenshots, and tooling out of the published CSS package. Do not claim a percentage speedup until one has been measured.

### Release gates

- Existing public classes and import paths remain available.
- Every new effect works from its documented class/markup with sensible defaults.
- Each distributed combination has all required primitives and accessibility rules.
- Default gzip stays within 4,500 bytes; expanded build is measured against the 7,500-byte target.
- No runtime dependencies or JS initialization are introduced.
- Source/minified outputs, metadata, counts, examples, and published package contents agree.
- Browser findings, compatibility changes, and any deferred animations are recorded in release notes.

## 9. Proposed implementation order after approval

1. Establish reproducible builds, artifact measurements, and behavior fixtures against v2.2.0.
2. Fix modifiers, reduced-motion states, variable defaults, and inaccurate documentation. Evaluate selector/global-style changes with compatibility checks.
3. Prototype and profile shared keyframes and halo optimizations; keep changes that preserve behavior and demonstrate a benefit.
4. Add motion families first: entrances, symmetric exits, attention, and stagger variants. Check compressed costs before expanding further.
5. Add interaction and loader packs, then the optional visual-effects pack. Produce the single expanded stylesheet.
6. Update the showcase and full reference, complete browser/accessibility/size checks, and prepare release notes.

Approval would authorize this implementation direction: preserve the tiny compatible default, add the proposed catalog through optional packs and an expanded entry point, and prioritize correctness and measured performance over raw animation counts. Final preset selection remains subject to the stated size and quality gates. Publishing a release is a separate step.
