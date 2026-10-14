# flux-animation

[![npm](https://img.shields.io/npm/v/flux-animation)](https://www.npmjs.com/package/flux-animation) [![gzip size](https://img.shields.io/badge/gzip-4.8%20KB-brightgreen)](docs/SIZES.json) [![license: MIT](https://img.shields.io/npm/l/flux-animation)](LICENSE)

Small, class-based CSS animations for chat interfaces and beyond: typing indicators, thinking states, streaming text, loaders, entrances and hover effects. **Zero runtime JavaScript. Zero runtime dependencies.**

**[Live demo and catalog →](https://silverstar085.github.io/flux-animation/)** · [Animation reference](docs/ANIMATIONS.md) · [Changelog](CHANGELOG.md) · [Report a bug or request an animation](https://github.com/silverstar085/flux-animation/issues)

## Quick start

```sh
npm install flux-animation
```

```js
import 'flux-animation/all';
```

Or from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-animation@3/flux.all.min.css">
```

Then add a class:

```html
<div class="fx-spring-up">Hello, motion.</div>
<span class="fx-typing" aria-hidden="true"></span>
```

Pin an exact version in production, for example `flux-animation@3.1.0`.

## Chat recipes

Every recipe below works with `flux-animation/chat` or `flux-animation/all`. Each preview link opens the effect in the demo.

### New messages

```html
<div class="message assistant fx-msg">Hi! How can I help?</div>
<div class="message user fx-msg-user">Summarize this thread</div>
```

[Preview `fx-msg`](https://silverstar085.github.io/flux-animation/#fx-msg). For a list that appears at once, put `fx-stagger` on the parent.

### Waiting for a reply

```html
<div role="status">
  <span class="fx-typing" aria-hidden="true"></span>
  <span class="sr-only">Assistant is typing…</span>
</div>
```

`fx-typing` is a complete bubble with no child markup. It follows `currentColor` and the font size; set `--fx-bubble` for its background and `--fx-dot` for the dot size. Prefer the classic dots? Use `<span class="fx-dots" aria-hidden="true"><i></i><i></i><i></i></span>`. [Preview](https://silverstar085.github.io/flux-animation/#fx-typing)

### Thinking

```html
<p role="status"><span class="fx-shimmer-text">Thinking…</span></p>
<p role="status"><span class="fx-ellipsis">Thinking</span></p>
```

`fx-shimmer-text` sweeps a highlight through the text itself. `fx-ellipsis` appends dots that count up to three. To rotate between status labels with no JavaScript, use `fx-cycle-2` … `fx-cycle-5` ([preview](https://silverstar085.github.io/flux-animation/#fx-cycle-3)).

### Tool and agent steps

```html
<ul aria-live="polite">
  <li class="fx-step">Searching the web</li>
</ul>
```

When the step finishes, swap the class: `step.className = 'fx-step-done'` (a checkmark pops in) or `'fx-step-error'` (a cross). Color them with `--fx-success` and `--fx-danger`. [Preview](https://silverstar085.github.io/flux-animation/#fx-step)

### Streaming an answer

```html
<p class="answer fx-caret-dot"></p>
```

```js
function appendToken(answer, text) {
  const word = document.createElement('span');
  word.className = 'fx-stream-word';
  word.textContent = text;
  answer.append(word, ' ');
}
// When the stream ends:
answer.classList.remove('fx-caret-dot');
```

`fx-caret-dot` shows a pulsing dot after the text while it streams; `fx-cursor` is a blinking caret instead. [Preview](https://silverstar085.github.io/flux-animation/#fx-stream-word)

### Loading history

```html
<div class="fx-skeleton-msg" aria-hidden="true"></div>
```

Three lines of varied width with a travelling highlight. Skeleton colors follow the text color, so they work in light and dark themes. Override with `--fx-skeleton` and `--fx-highlight`. [Preview](https://silverstar085.github.io/flux-animation/#fx-skeleton-msg)

### Removing a message

An exit class animates the element but does not remove it. Remove it when the animation ends:

```js
function dismiss(element, exitClass = 'fx-fade-out') {
  // Move focus to an appropriate remaining control before dismissing, if needed.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.remove();
    return;
  }
  // Remove an existing entrance/loop class first in application state.
  element.classList.add(exitClass);
  const exitName = getComputedStyle(element).animationName;
  const controller = new AbortController();
  const finish = () => {
    controller.abort();
    element.remove();
  };
  const onEnd = event => {
    if (event.target === element && event.animationName === exitName) finish();
  };
  element.addEventListener('animationend', onEnd, { signal: controller.signal });
  element.addEventListener('animationcancel', onEnd, { signal: controller.signal });
  const animations = element.getAnimations().filter(a => a.animationName === exitName);
  if (!animations.length || animations.every(a => a.playState === 'finished')) finish();
}
```

For framework-controlled nodes, update framework state instead of calling `remove()`.

## Choosing a bundle

**Use `flux-animation/all` unless you are counting bytes.** It is one stylesheet with every class. If you are building a chat UI and want it smaller, use `flux-animation/chat`.

| Import | Gzip | Classes | What it is |
|---|---:|---:|---|
| `flux-animation/all` | 7.80 KB | 210 | Everything |
| `flux-animation/chat` | **3.49 KB** | 70 | Complete chat preset: messages, typing, thinking, steps, streaming, skeletons, status rotators, basic entrances |
| `flux-animation` | 4.82 KB | 128 | The original 2.x class set, with fixes |
| `flux-animation/core` | 2.46 KB | 83 | Everyday entrances, exits, attention, hover and basic loaders |
| `+ flux-animation/motion` | 1.64 KB | 49 | Add-on: extra entrances/exits/stagger + nine controls |
| `+ flux-animation/interactions` | 0.70 KB | 8 | Add-on: underline and fill hover effects |
| `+ flux-animation/loaders` | 2.33 KB | 17 | Add-on: extra loaders and the 3.1 chat loaders |
| `+ flux-animation/visual` | 0.66 KB | 8 | Add-on: mask and filter effects |

`all`, `chat`, `flux-animation` and `core` are complete stylesheets: pick one. The four add-ons (`+`) extend `flux-animation` or `core`; import the base first. Sizes are gzip level 9 in decimal KB ([exact measurements](docs/SIZES.json)). Readable versions are available too, for example `flux-animation/flux.all.css`.

## Controls and customization

Use **one main effect plus controls per element**. If you need two transform effects, use a wrapper:

```html
<div class="fx-spring-up">
  <button class="fx-grow">Send message</button>
</div>
```

| Control classes | Behavior |
|---|---|
| `fx-faster`, `fx-fast`, `fx-slow`, `fx-slower` | 200 / 300 / 700 / 1,100 ms |
| `fx-d1` … `fx-d7` | Add 100–700 ms of delay |
| `fx-spring`, `fx-linear` | Override easing |
| `fx-loop`, `fx-loop-2`, `fx-loop-3` | Infinite / two / three iterations |
| `fx-reverse`, `fx-alternate`, `fx-alternate-reverse` | Direction |
| `fx-once` | One iteration, even for a loop |
| `fx-paused`, `fx-running` | Pause this element and everything inside it / opt back in |
| `fx-origin-top`, `-bottom`, `-left`, `-right`, `-center` | Transform origin |

`fx-alternate`, `fx-alternate-reverse`, `fx-once`, `fx-running` and the origin classes ship in `core`, `chat`, `motion` and `all`.

**Controls apply to the element they are on**, including its loader dots and pseudo-elements, but not to other Flux elements nested inside it (since 3.1). So `fx-loop` on a message bubble does not make a typing indicator inside it loop differently. `fx-paused` is the exception: it pauses everything inside.

Variables are the other way to customize. Unlike control classes, **variables inherit**, so you can set them on `:root` or on any container:

```css
:root {
  --fx-accent: #7c3aed; /* glow, ring and fill colors */
  --fx-dist: 14px;
  --fx-stagger: 55ms;
}
.chat-panel {
  --fx-dur: .6s; /* retimes every effect inside */
}
```

| Variable | Use |
|---|---|
| `--fx-dur`, `--fx-delay`, `--fx-easing` | Duration, extra delay and easing for every effect inside. A control class on the element wins over these. |
| `--fx-repeat`, `--fx-direction`, `--fx-play` | Iterations, direction, play state |
| `--fx-accent` | One color for glows, rings and tints (default `#4f46e5`) |
| `--fx-glow`, `--fx-ring`, `--fx-fill` | Override an individual accent-derived color |
| `--fx-skeleton`, `--fx-highlight` | Skeleton background and its travelling highlight (default: derived from the text color) |
| `--fx-bubble` | `fx-typing` bubble background |
| `--fx-success`, `--fx-danger` | `fx-step-done` and `fx-step-error` icon colors |
| `--fx-dist` | Travel distance for directional effects |
| `--fx-ease`, `--fx-spring` | The library's standard easing curves |
| `--fx-stagger`, `--fx-index` | Stagger interval; explicit position of one child |
| `--fx-cycle` | Full period of `fx-cycle-*` status rotators |
| `--fx-dot`, `--fx-size` | Dot size; size of ring, orbit and bar loaders |
| `--fx-w`, `--fx-h`, `--fx-x` | Maximum width/height for expand/collapse; held scale for `fx-grow-x-to` |
| `--fx-tint` | Hover-fill opacity (default `.12`) |
| `--fx-iris-origin` | Circle-mask origin (default `50% 50%`) |

### Staggered lists

```html
<ul class="fx-stagger fx-stagger-zoom">
  <li>First</li>
  <li>Second</li>
  <li style="--fx-index:20">Explicit later position</li>
</ul>
```

Every variant needs the `fx-stagger` parent class. Children 13 onward share the 13th delay unless they set `--fx-index`. Roll variants may need an `fx-clip` wrapper.

## Accessibility and reduced motion

Loaders are decorative: hide them with `aria-hidden="true"` and put one readable status next to them, as in the recipes above. `sr-only` is your app's visually-hidden utility, not a Flux class:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

With `prefers-reduced-motion: reduce`, every animation finishes immediately (.01ms, one iteration) and transitions are disabled. Delay, pause, direction and end states are kept. Loaders whose last frame would be invisible (progress, sonar, fading dots and others) rest on a static, visible pose instead, so people still see that something is loading. Status rotators show only their first label.

An exit class does not remove an element, change `aria-expanded`, or move focus; your app does that. Adding a class that is already present does not replay it: replace the node, or remove and re-add the class across a frame.

## Rendering notes

- Most effects animate `transform` and `opacity`. Glows repaint; filters and masks cost more on large areas; `fx-expand-*` and `fx-collapse-*` change layout. The demo labels each effect's rendering cost.
- Effects that draw decorations reserve `::before` and/or `::after`. Do not combine two such effects on one element; use a wrapper.
- Directions are physical (left/right) and are not mirrored in right-to-left layouts.
- Shared rules apply to classes that start with `fx-`. Reserve that prefix for Flux.
- Control isolation uses `@property`, and accent and skeleton colors use `color-mix()`; both work in all current browsers. In older browsers, controls inherit as they did in 3.0, skeletons fall back to a fixed gray, and accent-derived glows are skipped unless you set `--fx-glow` and `--fx-ring` to plain colors.

## Upgrading

- From 3.0: controls no longer leak into nested Flux elements. See [3.0 → 3.1](docs/MIGRATION.md#30--31).
- From 2.x: read the [v2 → v3 migration notes](docs/MIGRATION.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the build, tests and how to add an animation. Design notes from earlier releases are in [docs/history](docs/history/).

## License

MIT © Neil Shah
