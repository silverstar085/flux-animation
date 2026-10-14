# Changelog

## 3.1.0 — October 14, 2026

Chat-focused release. Markup and import paths from 3.0 keep working; see [3.0 → 3.1](docs/MIGRATION.md#30--31) for four behavior changes.

### Added

- **Chat preset:** `flux-animation/chat` (3.49 KB gzip, 70 classes). It holds everything a chat UI needs: message entrances, typing indicators, thinking labels, tool steps, streaming text, skeletons, status rotators, basic entrances and controls.
- **Nine chat effects** (in `loaders`, `chat` and `all`):
  - `fx-typing`: a complete typing bubble with no child markup.
  - `fx-shimmer-text`: a highlight that sweeps through "Thinking…" text.
  - `fx-ellipsis`: dots that count up to three after a label.
  - `fx-caret-dot`: a pulsing dot at the end of streaming text.
  - `fx-stream-word`: a fade-and-focus entrance for each streamed word or token.
  - `fx-skeleton-msg`: a three-line skeleton message.
  - `fx-step`, `fx-step-done`, `fx-step-error`: tool/agent steps with a spinner that becomes a checkmark or cross.
- **`--fx-accent`:** one variable for glow, ring and fill colors. Also `--fx-highlight`, `--fx-bubble`, `--fx-success` and `--fx-danger`.
- **Demo rebuilt:**
  - A chat playground hero with selectable indicator, entrance and speed.
  - Autoplay that repeats one-shot effects while they are on screen, plus replay on hover.
  - Category chips with grouped sections, and a dark-stage toggle.
  - Larger loader previews.
  - A details panel with duration, delay, easing and loop controls, and HTML / npm / CDN code tabs.
  - Deep links (`#fx-typing`) and shareable filter URLs.
- `src/effects.json`: one source of effect metadata. The build fails if it and the CSS disagree.
- `CONTRIBUTING.md`, and a README rebuilt around chat recipes and a simpler bundle guide.

### Changed

- **Control classes no longer leak into nested Flux elements.** They are registered with `@property { inherits: false }` and handed only to their own child and pseudo-element targets. `fx-loop` on a bubble no longer loops the fade inside it, and `fx-slow` no longer retimes a typing indicator inside it. Public variables (`--fx-dur`, …) still inherit, and `fx-paused` still pauses everything inside.
- `fx-skeleton-wave` derives its colors from the text color, so it works on dark backgrounds.
- Accent-derived colors: `fx-bloom` and `fx-ripple` use the standard glow and ring strengths.
- `docs/ANIMATIONS.md` is grouped by category with a table of contents and live-preview links, and it states the reduced-motion policy once.
- Within each demo and reference category, the newest effects come first.

### Size

Gzip level 9: default **4,823 bytes**, core **2,464**, chat **3,490**, all **7,797**. Budgets (`scripts/budgets.json`) are now default 4,900 (was 4,800), core 2,500, chat 3,700 (new) and all 8,000 (was 7,500). The default grows by 120 bytes for control isolation and accent colors; `all` grows by 973 bytes, mostly for the nine new effects.

## 3.0.1 — October 14, 2026

Bug fixes; no API changes.

### Fixed

- **Loaders no longer disappear under reduced motion.** With `prefers-reduced-motion: reduce`, loaders previously froze on their last keyframe, which for many is invisible. `fx-progress`, `fx-trace`, `fx-comet`, `fx-scan`, `fx-fill`, `fx-sonar`, `fx-ring-pulse`, `fx-dots`, `fx-dots-fade`, `fx-dots-flow`, `fx-dots-spinner`, `fx-bars-wave` and `fx-bars-travel` now rest on a static, visible pose. The rest of the v2 policy is unchanged.
- **The `fx-` namespace matches whole classes only.** Shared rules used `[class*="fx-"]`, which also matched unrelated classes such as `gfx-card`. Under reduced motion, that disabled those elements' own transitions. Rules now match classes that start with `fx-` (including after tabs and newlines).
- **Stagger lists animate again.** In 3.0.0, every `fx-stagger` variant computed a 0s duration unless `--fx-dur` was set, so list items appeared without motion. They now default to .45s, as in 2.x.
- README `dismiss()` example: declares the exit animation name before the listeners that read it.

### Changed

- The demo is now served at the site root (`index.html`); `flux-showcase.html` redirects there. The demo links to GitHub, npm, the changelog and issues.
- README: install and CDN instructions for the published package, a live-demo link, and badges. Stale "not yet published" notes are removed.
- Design notes moved to `docs/history/` and are no longer included in the npm package.
- `package.json`: `homepage` points to the demo root; adds `bugs`.
- Browser checks: new tests for reduced-motion loader visibility and namespace safety. `FLUX_EXECUTABLE` runs them against a preinstalled browser.

### Size

Gzip level 9: default **4,703 bytes** (+82), core **2,395** (+32), all **6,824** (+150). All within budget.

## 3.0.0 — September 7, 2026

Adds an optional expanded catalog while preserving the 128-class default entry point and all existing CSS import paths.

### Added

- 60 effect names: 16 entrances, 12 exits (including two naming aliases), eight attention/ambient effects, eight interaction effects, eight loaders/skeletons, and eight mask/filter effects.
- Four stagger variants: down, zoom, rotate, and roll-up.
- Nine controls: alternate, alternate-reverse, once, running, and five origin presets. Available in core, motion, and all.
- Optional `core`, `motion`, `interactions`, `loaders`, `visual`, and flattened `all` CSS exports. Expanded catalog: 201 public classes.
- Inherited duration/delay/easing/playback controls, explicit stagger indexing, and configurable new loader dimensions, tint, and iris origin.
- Searchable responsive demo with isolated previews, timing controls, pause/replay, complete copyable examples.
- Generated animation reference, artifact sizes, deterministic build, CSS/bundler checks, three-browser integration checks, and CI.

### Fixed

- Speed modifiers now override fixed attention and loader durations while preserving defaults when unset.
- Host controls reach child/pseudo-element animations. Delay adds to their phase offsets; pause and repeat now cover loaders and cycles.
- Retains the v2 reduced-motion policy (.01ms, one iteration, transitions disabled, opacity-only cycle fallback). The proposed reduced-motion redesign is excluded.
- Global `--fx-cycle` and `--fx-dot` values now inherit correctly.
- FX class initialization handles tabs/newlines between HTML classes.
- Generated reduced-motion output is checked for invalid numeric values introduced during minification.
- Keyboard focus equivalents for interaction effects and non-interactive decorative pseudo-elements.

### Optimized

- Shared control rules and parameterized keyframes for directional motion, drawers, flips, and masks.
- New ring/sonar loaders animate static borders using transforms and opacity, avoiding animated shadow geometry.
- Removed blanket backface hiding and scoped intrinsic-size interpolation to `fx-width`.
- Demo pauses offscreen/hidden previews, replays isolated nodes, cancels obsolete callbacks, and uses no external fonts or assets.
- Package stays free of runtime JavaScript/dependencies. All shipped CSS is flattened; optional packs avoid paying for the entire catalog.

### Size

Gzip level 9: default **4,621 bytes**, core **2,363 bytes**, all **6,674 bytes**. The default increases by **364 bytes (8.6%)** from 2.2.0, within the approved 4,800-byte cap. See `docs/SIZES.json` for exact minified/Brotli measurements and class lists.

### Compatibility notes

- Existing effect defaults, names, and import paths remain. Existing keyframe names are retained for integrations that reference them directly.
- A globally configured `--fx-dur` now intentionally retimes loaders and attention effects too. Remove it to keep individual effect defaults; use local controls for selective timing.
- Repeat counts apply per animated target. Cycle and new-loader phases scale with duration. Legacy dot/bar offsets remain fixed; group members may finish at different times.
- Reduced-motion delay, pause, direction, and endpoint behavior remain governed by the v2 policy. Applications continue to own exit cleanup and focus state.
- `interpolate-size` no longer changes sizing behavior across the whole document. Apply it explicitly elsewhere if your app relied on the previous inherited root setting.
- The broad, low-specificity initialization reserves the `fx-` namespace. Legacy descendant-dot markup remains supported; new loaders use direct children.
- New utility classes are in core/motion/all, keeping the legacy default's class count and bytes stable.
- Mask/filter and layout effects have explicit rendering-cost notes. There is no universal GPU/no-paint/no-jank guarantee.

See [migration notes](docs/MIGRATION.md) for the breaking behavior changes and upgrade examples.
