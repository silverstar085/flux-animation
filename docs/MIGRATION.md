# Migrating from Flux Animation 2.x to 3.0

3.0.0 is a major release. Existing CSS entry points and all 128 original classes remain available. This is a **major release because existing timing, control propagation, and global styling behavior changes**. New effects remain opt-in through the additional packs or the expanded build.

## Reduced motion is not being redesigned

The v2 policy remains: `prefers-reduced-motion: reduce` shortens animations to **.01ms**, limits them to one iteration, and disables transitions. Cycles stop and show their first child using opacity. Coverage extends to new effect targets using that same policy.

The proposed automatic delay removal, forced unpausing/forward playback, special static loader states, inactive-cycle `visibility` changes, and suppression of hover transforms have been removed. Delayed or paused entrances can therefore remain delayed or paused, reversed effects retain their direction, and invisible cycle children are not automatically removed from interaction or the accessibility tree. Applications retain responsibility for those states.

Control propagation changes described below still apply under either motion preference. Retaining the reduced-motion policy does not make every v3 combination identical to v2.

## 1. Upgrade explicitly

After publication:

```sh
npm install flux-animation@3
```

```js
// Existing imports continue working with the 128-class default.
import 'flux-animation';
// Existing readable and minified subpaths also remain available.
```

A CDN URL pinned to `@2` stays on v2. Change it to `@3.0.0` only after reviewing these changes. Prefer a pinned version over an unversioned URL.

To use the new effects, replace the default import with `flux-animation/all`, or import a base followed by selected add-ons. Do not import `all` alongside the default/core or packs. New playback/origin utilities are in `core`, `motion`, and `all`; they are not added to the default.

## 2. Audit global duration and speed classes

In v2, several attention effects and loaders hard-coded durations and ignored `--fx-dur` and speed modifiers. In v3 they honor those controls.

```css
/* v2: affected ordinary entrances but was ignored by several loaders.
   v3: also retimes attention effects, loaders, and cycle animations. */
:root { --fx-dur: .45s; }
```

Remove a global duration override to retain individual effect defaults, then scope custom timing to the intended components:

```css
.message-entrance { --fx-dur: .45s; }
/* Or use a local fx-fast / fx-slow class. */
```

Review combinations such as `fx-pulse fx-fast` and `fx-spin fx-slow`: they now use 300ms and 700ms respectively. If a parent sets a duration for unrelated motion, override the loader's duration locally with its intended value, or move the setting onto a separate wrapper/component.

## 3. Audit controls on containers

Pause, repeat, easing, direction, and extra-delay controls now reach the FX child and pseudo-element animations inside a component. In v2, host-only modifiers could leave those parts running unchanged.

- `fx-dots-wave fx-paused` now pauses its dots.
- `fx-dual-ring fx-loop-2` repeats its pseudo-element animations twice.
- An extra delay adds to a component's existing phase offsets.
- Public control variables inherit into nested FX elements. Put controls on the intended element, or override nested controls locally (`--fx-play: running`, `--fx-repeat: 1`, or the new utility classes where available).

Finite repeats count each animated target's iterations, not an entire group timeline. Cycle and new-loader offsets scale with duration to maintain their rhythm. Legacy dot/bar and stagger offsets stay fixed; tune them deliberately if changing duration.

## 4. Check inherited size and cycle settings

`--fx-cycle` and `--fx-dot` now inherit correctly instead of being shadowed by local library defaults. Existing global settings that previously had no visible effect may now take effect. Remove unused overrides or scope them to the intended component.

`interpolate-size: allow-keywords` is no longer set globally on `:root`; it is scoped to `fx-width`. If unrelated application components relied on the old global opt-in, opt those components in explicitly where supported:

```css
@supports (interpolate-size: allow-keywords) {
  .my-resizable-panel { interpolate-size: allow-keywords; }
}
```

Explicit-size transitions remain the fallback. Scaling changes appearance without reflowing neighbors; dimension helpers still cause layout.

## 5. Check integration styling

- Blanket `backface-visibility: hidden` is removed. Set it locally on a 3D component if it depended on that visual treatment.
- Interaction effects now have keyboard `:focus-visible` equivalents. Preserve native focus outlines and check custom focus styles for conflicts.
- FX decorations use `pointer-events: none`. Any application relying on a decorative pseudo-element intercepting clicks should handle interaction on a real element.
- The compact initialization matches classes containing `fx-` and handles tabs/newlines between classes. Reserve that namespace; unrelated classes containing `fx-` may receive animation defaults.
- One primary effect plus modifiers remains the supported composition model. Use wrappers for an entrance and a hover transform. Existing keyframe names are retained.

## Before releasing your application

Preview representative entrances, exits, loaders, and cycles using your actual global variables and class combinations. Check default and reduced-motion modes, keyboard focus, and any cleanup that listens for animation events. Exit classes do not remove nodes or manage focus/ARIA; application state still owns those operations.

The [README](../README.md) covers all controls and imports; the [animation reference](ANIMATIONS.md) includes copyable examples. No automatic application migration is required merely to keep the existing import path, but the behavior audit above is recommended before moving to the major version.
