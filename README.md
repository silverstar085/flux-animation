# flux-animation

Small, class-based CSS animations. **Zero runtime JavaScript. Zero runtime dependencies.**

Version **3.0.0** adds optional animation packs. Npm publication is a separate release step. The existing 128-class default stays tiny; the expanded build has **201 classes**, including **64 new effect presets/aliases and nine new controls**.

## Preview the new animations

```sh
npm ci
npm run preview
```

Open [the local catalog](http://127.0.0.1:4173/flux-showcase.html). It starts on the 64 new additions. Search classes, filter by category/behavior/rendering cost, change timing, replay previews, copy complete HTML examples.

You can also open `flux-showcase.html` directly from this checkout. Keep its `demo/` assets beside it. The catalog uses JavaScript for its controls; the distributed animation library is CSS only.

## Choose your download

Gzip level 9; decimal KB. These are stylesheet transfer sizes, not the size of the whole npm archive. See [exact artifact measurements](docs/SIZES.json).

| Import | Minified | Gzip | Included |
|---|---:|---:|---|
| `flux-animation` | 23.43 KB | **4.62 KB** | All 128 legacy classes, with fixes |
| `flux-animation/core` | 9.87 KB | **2.36 KB** | 83 everyday classes and controls |
| `flux-animation/all` | 36.06 KB | **6.67 KB** | All 201 classes |
| `flux-animation/motion` | 6.70 KB | 1.53 KB | 40 motion/stagger additions + nine controls |
| `flux-animation/interactions` | 2.46 KB | 0.68 KB | Eight interaction effects |
| `flux-animation/loaders` | 4.17 KB | 1.22 KB | Eight loaders/skeletons |
| `flux-animation/visual` | 1.70 KB | 0.62 KB | Eight mask/filter effects |

The four add-on packs require the default **or** core base. Import the base first. The default and core are alternative bases; `all` is a complete, flattened stylesheet. Do not import `all` alongside a base or packs. CSS selectors are not automatically tree-shaken per class.

```js
// Existing tiny entry point: unchanged.
import 'flux-animation';

// Or get everything in one stylesheet.
import 'flux-animation/all';

// Or choose a smaller combination instead.
import 'flux-animation/core';
import 'flux-animation/motion';
import 'flux-animation/loaders';
```

Choose one of those configurations. The example alternatives above are not meant to be imported together.

```html
<!-- Repository file; available from a CDN after npm publication. -->
<link rel="stylesheet" href="flux.all.min.css">
<div class="fx-spring-up">Hello, motion.</div>
```

After publishing 3.0.0, install it with `npm install flux-animation@3.0.0`. A version-pinned CDN URL will be `https://cdn.jsdelivr.net/npm/flux-animation@3.0.0/flux.all.min.css`. It will not contain these changes until the release is published.

Readable exports such as `flux-animation/flux.css` and `flux-animation/flux.all.css` remain available, as do the existing `/min` and `/flux.min.css` paths.

## What's new

| Family | Classes |
|---|---|
| Diagonal entrances | `fx-up-left`, `fx-up-right`, `fx-down-left`, `fx-down-right` |
| Spring entrances | `fx-spring-up`, `fx-spring-down`, `fx-spring-left`, `fx-spring-right` |
| Side zoom / drawers | `fx-zoom-left`, `fx-zoom-right`, `fx-sheet-left`, `fx-sheet-right` |
| Edge flips | `fx-flip-in-top`, `fx-flip-in-bottom`, `fx-flip-in-left`, `fx-flip-in-right` |
| Directional zoom exits | `fx-zoom-up-out`, `fx-zoom-down-out`, `fx-zoom-left-out`, `fx-zoom-right-out` |
| Drawer exits | `fx-sheet-up-out`, `fx-sheet-down-out`, `fx-sheet-left-out`, `fx-sheet-right-out` |
| More exits | `fx-right-out`, `fx-flip-y-out`, `fx-roll-out`, `fx-swing-out` |
| Attention / ambient | `fx-nod`, `fx-shake-y`, `fx-hop`, `fx-pendulum`, `fx-breathe`, `fx-recoil`, `fx-settle`, `fx-wobble` |
| Interaction strokes | `fx-underline-center`, `fx-underline-right`, `fx-underline-double`, `fx-overline` |
| Interaction fills | `fx-fill-h-left`, `fx-fill-h-right`, `fx-fill-h-up`, `fx-fill-h-down` |
| Dots / bars | `fx-dots-orbit`, `fx-dots-zigzag`, `fx-bars-wave`, `fx-bars-travel` |
| Rings / skeletons | `fx-dual-ring`, `fx-ring-pulse`, `fx-sonar`, `fx-skeleton-wave` |
| Optional visual effects | `fx-wipe-up`, `fx-wipe-down`, `fx-wipe-left`, `fx-wipe-right`, `fx-iris-in`, `fx-iris-out`, `fx-blur-zoom-in`, `fx-blur-zoom-out` |
| Stagger variants | `fx-stagger-down`, `fx-stagger-zoom`, `fx-stagger-rotate`, `fx-stagger-roll-up` |

`fx-right-out` is a visual alias of `fx-slide-out`; `fx-sheet-down-out` aliases `fx-sheet-out`. The 64 count includes those two aliases and four stagger variants. Directions are presets within shared families, not 64 different keyframe algorithms. The original fade/slide/pop, hover, chat, dot, cycle, and size effects remain available.

See the [complete reference with markup and reduced-motion behavior](docs/ANIMATIONS.md).

## Controls and customization

Use **one main effect plus modifiers per element**. Class order in HTML does not determine which of two conflicting effects wins. Use separate wrappers for two transform effects, such as an entrance around an interactive button:

```html
<div class="fx-spring-up">
  <button class="fx-grow">Send message</button>
</div>
```

Existing controls, available in the default, core, and expanded builds:

| Classes | Behavior |
|---|---|
| `fx-faster`, `fx-fast`, `fx-slow`, `fx-slower` | 200 / 300 / 700 / 1,100 ms; now also work on attention effects and loaders |
| `fx-d1` … `fx-d7` | Add 100–700 ms to the effect's child/pseudo-element phase delay |
| `fx-spring`, `fx-linear` | Override animation easing |
| `fx-loop`, `fx-loop-2`, `fx-loop-3` | Infinite / two / three iterations |
| `fx-reverse` | Reverse playback |
| `fx-paused` | Pause the host, documented child animations, and decorative pseudo-elements |

New controls in **core, motion, and all**: `fx-alternate`, `fx-alternate-reverse`, `fx-once`, `fx-running`, and `fx-origin-top`, `fx-origin-bottom`, `fx-origin-left`, `fx-origin-right`, `fx-origin-center`. The small legacy default does not add these nine utilities; import `motion` if you need them with the default base.

```css
:root {
  --fx-dist: 14px;
  --fx-stagger: 55ms;
  --fx-cycle: 6s;
  /* Optional: setting this globally now intentionally retimes all FX animations. */
  /* --fx-dur: .45s; */
}

.my-animation {
  --fx-dur: .6s;
  --fx-delay: .15s;
}
```

| Variable | Use |
|---|---|
| `--fx-dur` | Duration override; when unset, each effect retains its own default |
| `--fx-delay` | Extra delay; adds to loader/cycle/stagger phase offsets |
| `--fx-dist` | Travel distance where the effect uses distance; sheets use their own dimensions |
| `--fx-ease`, `--fx-spring` | Existing standard easing curves |
| `--fx-easing` | Explicit easing override, including effects with their own default curve |
| `--fx-repeat`, `--fx-direction`, `--fx-play` | Iteration, direction, and playback overrides; prefer the corresponding classes |
| `--fx-stagger`, `--fx-index` | Stagger interval and optional explicit child index |
| `--fx-cycle` | Full status-rotator period; now inherits correctly |
| `--fx-dot` | Dot size; now inherits correctly |
| `--fx-size` | Size of new orbit, bar, and ring loaders |
| `--fx-w`, `--fx-h`, `--fx-x` | Existing maximum dimensions / held horizontal scale |
| `--fx-glow`, `--fx-ring`, `--fx-fill` | Existing shadow/tint colors |
| `--fx-tint` | New hover-fill opacity, default `.12` |
| `--fx-skeleton` | New skeleton background |
| `--fx-iris-origin` | Circle-mask origin, default `50% 50%` |

Local variable settings beat inherited settings. A modifier sets its variable on that element; ordinary CSS specificity decides between conflicting local declarations. Inline variables override class rules. Effect defaults use private variables (`--_…`); leave those to the library. Controls inherit into nested FX elements; use a local override such as `fx-running` or `--fx-repeat: 1` to opt a nested effect out.

Finite repeats count **each animated target's iterations**. Phase-shifted children can finish at different times, especially with negative loader offsets. Cycle and new-loader phase offsets scale with duration to preserve their rhythm. Legacy dot/bar and stagger offsets remain fixed for compatibility; use defaults or tune their duration and delays together. Pausing resumes from the current point; it does not restart.

### Staggered lists

```html
<ul class="fx-stagger fx-stagger-zoom">
  <li>First</li>
  <li>Second</li>
  <li style="--fx-index:20">Explicit later position</li>
</ul>
```

Every variant requires the `fx-stagger` parent class. The first item waits one interval; children 13 onward share interval 13 unless they set `--fx-index`. Roll effects may need an `fx-clip` wrapper. Existing stagger defaults are preserved.

### Accessible loaders

```html
<span role="status">
  <span class="fx-dual-ring" aria-hidden="true"></span>
  <span class="sr-only">Loading…</span>
</span>
```

`sr-only` is an application accessibility utility, not a Flux class. A minimal version:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

Dot loaders require three plain decorative `<i>` children; new bar loaders require five. For rotating decorative labels, hide the rotator from assistive technology and provide one stable accessible status. Actual progress, status changes, and announcements belong to the application.

## Reduced motion, interaction, and rendering

The v2 reduced-motion policy is retained: `prefers-reduced-motion: reduce` shortens animations to **.01ms**, limits them to one iteration, and disables transitions. Delays, paused state, direction, hover transforms, and effect endpoints are not reset. Cycles stop and show the first child using opacity, without hiding the other children from interaction. The same policy covers the new effects. The proposed reduced-motion redesign is not included.

**3.0 is a major release.** Global duration controls, propagation into child/pseudo-element animations, inherited variables, and global styling can affect existing integrations. Read the [v2 → v3 migration notes](docs/MIGRATION.md) before upgrading.

An exit class does not remove an element, change `aria-expanded`, or manage focus. An opacity-zero element may still be focusable. Applications must handle those lifecycle changes. Likewise, scale-based size effects stretch the pixels and leave layout space intact; max-width/max-height helpers change layout and can clip content. `fx-width` opts into intrinsic-size interpolation only on that helper where supported, with ordinary explicit widths as the fallback.

Most effects animate transforms and opacity. Shadows may repaint; filters and masks have browser-dependent rendering costs; dimension helpers trigger layout. New ring effects use static borders with transform/opacity motion. Legacy shadows remain for visual compatibility. There are no blanket `will-change` or forced backface-hiding rules. See [web.dev's animation guidance](https://web.dev/articles/animations-guide).

Pseudo-element effects reserve `::before` and/or `::after`. Do not put two effects requiring the same pseudo-element on one node; use wrappers. Decorations ignore pointer events. Physical left/right directions are not automatically reversed in RTL layouts. The existing broad `fx-` initialization is retained in a low-specificity form for compactness; reserve the `fx-` namespace for Flux. Legacy dot selectors still support descendant `<i>` markup; new loaders use direct children.

### Replay and exit cleanup

Adding a class already present does not replay it. Applications can replace the node or remove/re-add the effect class across a rendering boundary. The demo uses the Web Animations API and isolated preview replacement for its controls; this is optional application code.

For removal, handle the reduced-motion path directly and filter normal animation events. This example handles a finite exit on the element itself:

```js
function dismiss(element, exitClass = 'fx-fade-out') {
  // Move focus to an appropriate remaining control before dismissing, if needed.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.remove();
    return;
  }
  const controller = new AbortController();
  const finish = () => {
    controller.abort();
    element.remove();
  };
  element.addEventListener('animationend', event => {
    if (event.target === element && event.animationName === exitName) finish();
  }, { signal: controller.signal });
  element.addEventListener('animationcancel', event => {
    if (event.target === element && event.animationName === exitName) finish();
  }, { signal: controller.signal });
  // Remove an existing entrance/loop class first in application state.
  element.classList.add(exitClass);
  const exitName = getComputedStyle(element).animationName;
  const animations = element.getAnimations().filter(a => a.animationName === exitName);
  if (!animations.length || animations.every(a => a.playState === 'finished')) finish();
}
```

For framework-controlled nodes, update framework state instead of calling `remove()`. If the application disables, pauses, or replaces an exit mid-flight, its transition lifecycle should complete cleanup explicitly. Removing a class is not a substitute for managing DOM state.

## Development

```sh
npm ci
npm run build       # src/ → checked-in readable/minified CSS + catalog/reference
npm run check       # reproducibility + approved byte budgets
npm test            # CSS contracts, package exports, and bundler smoke tests
npx playwright install chromium firefox webkit
npm run preview     # keep this running in another terminal
npm run test:browser
npm pack --dry-run  # inspect exactly what will ship; does not publish
```

Author effects in `src/`; update metadata in `scripts/catalog.mjs`. The build parses animation declarations, shares control defaults, and generates reduced-motion coverage from actual targets. Do not edit generated `flux*.css`, catalog files, `docs/ANIMATIONS.md`, or `docs/SIZES.json` directly.

Approved gzip gates: **4,800 bytes default**, **2,500 core**, **7,500 expanded**. The default cap was raised from the initial 4,500-byte proposal with approval to retain the control fixes; the proposed reduced-motion redesign was subsequently withdrawn. Development tools, browser binaries, screenshots, and the demo are excluded from the runtime package.

[Release notes](CHANGELOG.md) · [Implementation report](docs/IMPLEMENTATION_REPORT.md) · [Complete animation reference](docs/ANIMATIONS.md)

## License

MIT © Neil Shah
