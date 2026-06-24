# flux-animation

A micro motion CSS library for chat UIs — ~4.2 KB gzipped, zero JS, GPU-composited animations smooth on Windows, macOS, and iOS.

## Install

```sh
npm install flux-animation
```

Then import it in your app (Vite, webpack, etc.):

```js
import 'flux-animation';                 // minified build (default)
// or
import 'flux-animation/flux.css';        // readable source
```

Or include it directly from a CDN — no install needed:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-animation@2/flux.min.css">
<!-- or -->
<link rel="stylesheet" href="https://unpkg.com/flux-animation@2/flux.min.css">
```

## Classes

| Class | Effect |
|---|---|
| `fx-up`, `fx-down`, `fx-left`, `fx-right` | Slide + fade in |
| `fx-pop`, `fx-zoom`, `fx-zoom-down` | Scale entrances |
| `fx-swing`, `fx-roll-in`, `fx-reveal` | 3D hinge, roll, and clip-reveal entrances |
| `fx-tada`, `fx-bell`, `fx-buzz` | Attention cues (add `fx-loop` to repeat) |
| `fx-faster`, `fx-fast`, `fx-slow`, `fx-slower` | Speed modifiers |
| `fx-d1` … `fx-d7` | Delay .1s – .7s |
| `fx-spring`, `fx-linear`, `fx-reverse`, `fx-paused` | Easing & playback modifiers |
| `fx-loop`, `fx-loop-2`, `fx-loop-3` | Repeat forever / N times |
| `fx-stagger` (on parent `<ul>`) | Children animate in sequence (`-fade` `-left` `-right` `-pop` `-blur`) |
| `fx-cycle-2` … `fx-cycle-5` | Auto-rotate 2–5 children (no JS) |
| `fx-trace`, `fx-comet`, `fx-fill`, `fx-scan`, `fx-ripple` | In-flight indicators |
| `fx-orbit`, `fx-bloom` | Calm single-element loaders |
| `fx-dots-wave`, `-fade`, `-scale`, `-flow`, `-elastic`, `-spinner` | Multi-dot loaders (drop plain `<i>` children inside) |
| `fx-bars`, `fx-ping`, `fx-dots`, `fx-spin` | Chat & loading primitives |
| `fx-width` | Animated width transition |
| `fx-expand-w`/`-h`, `fx-collapse-w`/`-h` | Keyframed width & height morphing |
| `fx-grow-x`/`-y`, `fx-shrink-x`/`-y` | GPU scale grow & shrink (X / Y axis) |
| `fx-grow-x-to`, `fx-shrink-x-to` | Scale to a custom width and hold it — content stays visible (set `--fx-x`) |

## CSS Variables

```css
:root {
  --fx-dur: .45s;
  --fx-dist: 14px;
  --fx-stagger: 55ms;
  --fx-cycle: 6s;
}
```

Per-element knobs: `--fx-w` / `--fx-h` set the target size for `fx-expand-w`/`-h`, and `--fx-x` sets the target horizontal scale that `fx-grow-x-to` / `fx-shrink-x-to` hold (e.g. `1.5` = 150%, `.6` = 60%).

## Demo

Open `flux-showcase.html` or visit the [live demo](https://silverstar085.github.io/flux-animation/flux-showcase.html).

## License

MIT
