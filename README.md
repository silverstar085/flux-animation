# flux.css

A micro motion CSS library for chat UIs — ~3.1 KB gzipped, zero JS, GPU-composited animations smooth on Windows, macOS, and iOS.

## Usage

```html
<!-- CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neilshah2000/flux-animation@main/flux.min.css">

<!-- or npm -->
<link rel="stylesheet" href="node_modules/flux-animation/flux.min.css">
```

## Classes

| Class | Effect |
|---|---|
| `fx-up`, `fx-down`, `fx-left`, `fx-right` | Slide + fade in |
| `fx-pop`, `fx-sink` | Scale up/down |
| `fx-faster`, `fx-fast`, `fx-slow`, `fx-slower` | Speed modifiers |
| `fx-d1` … `fx-d5` | Delay .1s – .5s |
| `fx-spring`, `fx-linear` | Easing modifiers |
| `fx-loop` | Repeat forever |
| `fx-stagger` (on parent `<ul>`) | Children animate in sequence |
| `fx-cycle-3` | Auto-rotate 3 children (no JS) |
| `fx-trace`, `fx-comet`, `fx-fill` | In-flight indicators |
| `fx-width` | Animated width transition |
| `fx-expand-w`, `fx-collapse-w` | Keyframed width morphing |

## CSS Variables

```css
:root {
  --fx-dur: .45s;
  --fx-dist: 14px;
  --fx-stagger: 55ms;
  --fx-cycle: 6s;
}
```

## Demo

Open `flux-showcase.html` or visit the [live demo](https://neilshah2000.github.io/flux-animation/flux-showcase.html).

## License

MIT
