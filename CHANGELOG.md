# Changelog

## 3.0.0 — major release candidate, September 7, 2026

Adds an optional expanded catalog while preserving the 128-class default entry point and all existing CSS import paths. Npm publication is a separate release step.

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
