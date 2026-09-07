# Animation reference

Generated from the effect catalog. All examples assume the appropriate stylesheet is loaded. 174 effect/helper recipes; 201 public classes including controls.

## fx-bars

An equalizer of four scaled bars.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
```

## fx-bars-travel

An opacity highlight travels through five bars.

- Pack: loaders (new)
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-bars-travel" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
```

## fx-bars-wave

Five bars rise and fall with offset phases.

- Pack: loaders (new)
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-bars-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
```

## fx-bell

A diminishing top-anchored ring.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-bell">Motion, made simple.</div>
```

## fx-bloom

Breathe a soft shadow halo.

- Pack: default
- Behavior: loop; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-bloom" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

## fx-blur

Focus in from a blur.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-blur">Motion, made simple.</div>
```

## fx-blur-out

blur dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-blur-out">Motion, made simple.</div>
```

## fx-blur-zoom-in

Scale up through a soft focus pull.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-blur-zoom-in">Motion, made simple.</div>
```

## fx-blur-zoom-out

Scale away while defocusing.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-blur-zoom-out">Motion, made simple.</div>
```

## fx-bounce

Two diminishing bounces.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-bounce">Motion, made simple.</div>
```

## fx-bounce-in

Bounce into view.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-bounce-in">Motion, made simple.</div>
```

## fx-breathe

A subtle scale-and-opacity breathing loop.

- Pack: motion (new)
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-breathe">Motion, made simple.</div>
```

## fx-brighten

Brighten on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-brighten">Try this effect</button>
```

## fx-btn

Scale down on press.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-btn">Try this effect</button>
```

## fx-buzz

A tiny horizontal vibration.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-buzz">Motion, made simple.</div>
```

## fx-clip

Clip overflowing roll or drawer effects.

- Pack: default
- Behavior: helper; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-clip"><div class="fx-roll-up">Rolling text</div></div>
```

## fx-collapse-h

Collapse the maximum height; this changes layout.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: layout
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-collapse-h">Motion, made simple.</div>
```

## fx-collapse-w

Collapse the maximum width; this changes layout.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: layout
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-collapse-w">Motion, made simple.</div>
```

## fx-comet

Send a fading streak across its track.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-comet" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

## fx-cursor

Blink a decorative text caret.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-cursor">Motion, made simple.</div>
```

## fx-cycle-2

Rotate 2 decorative status labels in a shared grid.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: cycling stops; the first child is opaque and the others remain opacity-zero.

```html
<div class="fx-cycle-2" aria-hidden="true"><span>Step 1</span><span>Step 2</span></div>
<span class="sr-only">Working…</span>
```

## fx-cycle-3

Rotate 3 decorative status labels in a shared grid.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: cycling stops; the first child is opaque and the others remain opacity-zero.

```html
<div class="fx-cycle-3" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span></div>
<span class="sr-only">Working…</span>
```

## fx-cycle-4

Rotate 4 decorative status labels in a shared grid.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: cycling stops; the first child is opaque and the others remain opacity-zero.

```html
<div class="fx-cycle-4" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span><span>Step 4</span></div>
<span class="sr-only">Working…</span>
```

## fx-cycle-5

Rotate 5 decorative status labels in a shared grid.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: cycling stops; the first child is opaque and the others remain opacity-zero.

```html
<div class="fx-cycle-5" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span><span>Step 4</span><span>Step 5</span></div>
<span class="sr-only">Working…</span>
```

## fx-dots

Three softly bouncing typing dots.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-elastic

A three-dot elastic loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-elastic" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-fade

A three-dot fade loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-fade" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-flow

A three-dot flow loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-flow" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-orbit

Three dots physically orbit their center.

- Pack: loaders (new)
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-orbit" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-scale

A three-dot scale loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-scale" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-spinner

A three-dot spinner loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-spinner" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-wave

A three-dot wave loading indicator.

- Pack: default
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-wave" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-dots-zigzag

Dots alternate between diagonal positions.

- Pack: loaders (new)
- Behavior: loop; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dots-zigzag" aria-hidden="true"><i></i><i></i><i></i></span>
```

## fx-down

Drop and fade in.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-down">Motion, made simple.</div>
```

## fx-down-left

Fade in from the lower-left corner.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-down-left">Motion, made simple.</div>
```

## fx-down-out

down dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-down-out">Motion, made simple.</div>
```

## fx-down-right

Fade in from the lower-right corner.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-down-right">Motion, made simple.</div>
```

## fx-drop-out

drop dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-drop-out">Motion, made simple.</div>
```

## fx-dual-ring

Two concentric arcs rotate in opposite directions.

- Pack: loaders (new)
- Behavior: loop; target: pseudo-elements
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-dual-ring" aria-hidden="true"></span>
```

## fx-expand-h

Expand the maximum height; this changes layout.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: layout
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-expand-h">Motion, made simple.</div>
```

## fx-expand-w

Expand the maximum width; this changes layout.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: layout
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-expand-w">Motion, made simple.</div>
```

## fx-fade

Fade in gently.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-fade">Motion, made simple.</div>
```

## fx-fade-out

fade dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-fade-out">Motion, made simple.</div>
```

## fx-fill

Sweep, hold, and fade a tint.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-fill">Motion, made simple.</div>
```

## fx-fill-h-down

Sweep a background tint up from the bottom.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-fill-h-down">Try this effect</button>
```

## fx-fill-h-left

Sweep a background tint in from the left.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-fill-h-left">Try this effect</button>
```

## fx-fill-h-right

Sweep a background tint in from the right.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-fill-h-right">Try this effect</button>
```

## fx-fill-h-up

Sweep a background tint down from the top.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-fill-h-up">Try this effect</button>
```

## fx-flash

A quick opacity cue.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flash">Motion, made simple.</div>
```

## fx-flip-in-bottom

Unfold from the bottom edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-in-bottom">Motion, made simple.</div>
```

## fx-flip-in-left

Unfold from the left edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-in-left">Motion, made simple.</div>
```

## fx-flip-in-right

Unfold from the right edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-in-right">Motion, made simple.</div>
```

## fx-flip-in-top

Unfold from the top edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-in-top">Motion, made simple.</div>
```

## fx-flip-x

Tip forward in 3D.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-x">Motion, made simple.</div>
```

## fx-flip-x-out

flip x dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-x-out">Motion, made simple.</div>
```

## fx-flip-y

Turn in from the side.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-y">Motion, made simple.</div>
```

## fx-flip-y-out

Tip away sideways in 3D.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-flip-y-out">Motion, made simple.</div>
```

## fx-float

A gentle vertical floating loop.

- Pack: default
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-float">Motion, made simple.</div>
```

## fx-glow

A soft animated shadow glow.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-glow">Motion, made simple.</div>
```

## fx-glow-h

Add a glow on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-glow-h">Try this effect</button>
```

## fx-grow

Grow slightly on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-grow">Try this effect</button>
```

## fx-grow-x

Grow visually on the horizontal axis; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-grow-x">Motion, made simple.</div>
```

## fx-grow-x-to

Grow visually on the horizontal axis and hold the configured scale; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-grow-x-to" style="--fx-x:1.5;width:100px;height:24px;background:currentColor"></div>
```

## fx-grow-y

Grow visually on the vertical axis; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-grow-y">Motion, made simple.</div>
```

## fx-heartbeat

A double scale heartbeat.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-heartbeat">Motion, made simple.</div>
```

## fx-hop

Lift with a squash-and-stretch landing.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-hop">Motion, made simple.</div>
```

## fx-iris-in

Open a circular mask around a configurable origin.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-iris-in">Motion, made simple.</div>
```

## fx-iris-out

Close a circular mask around a configurable origin.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-iris-out">Motion, made simple.</div>
```

## fx-jello

A diminishing skew wobble.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-jello">Motion, made simple.</div>
```

## fx-left

Enter from the left.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-left">Motion, made simple.</div>
```

## fx-left-out

left dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-left-out">Motion, made simple.</div>
```

## fx-lift

Lift and add a shadow on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-lift">Try this effect</button>
```

## fx-msg

A small rise and scale for a message.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-msg">Motion, made simple.</div>
```

## fx-msg-user

A diagonal scale entrance for a user message.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-msg-user">Motion, made simple.</div>
```

## fx-nod

Two small vertical movements for acknowledgment.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-nod">Motion, made simple.</div>
```

## fx-nudge

Two small rightward nudges.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-nudge">Motion, made simple.</div>
```

## fx-orbit

Rotate a single orbiting dot.

- Pack: default
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-orbit" style="display:inline-block;width:28px;height:28px" aria-hidden="true"></span>
```

## fx-overline

Reveal a stroke above the label.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-overline">Try this effect</button>
```

## fx-pendulum

A calm, top-anchored swinging loop.

- Pack: motion (new)
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-pendulum">Motion, made simple.</div>
```

## fx-ping

An expanding presence halo.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-ping" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

## fx-pop

Scale in with a spring easing.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-pop">Motion, made simple.</div>
```

## fx-pop-out

pop dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-pop-out">Motion, made simple.</div>
```

## fx-progress

An indeterminate moving progress segment.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-progress" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

## fx-pulse

A small scale pulse.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-pulse">Motion, made simple.</div>
```

## fx-pulse-soft

pulse soft entrance.

- Pack: default
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-pulse-soft" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

## fx-push

Sink slightly on press.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-push">Try this effect</button>
```

## fx-recoil

Compress backward, then recover with an overshoot.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-recoil">Motion, made simple.</div>
```

## fx-reveal

Unmask from the top and fade in.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-reveal">Motion, made simple.</div>
```

## fx-right

Enter from the right.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-right">Motion, made simple.</div>
```

## fx-right-out

Dismiss to the right; alias of fx-slide-out.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-right-out">Motion, made simple.</div>
```

## fx-ring

A focus-triggered shadow ring.

- Pack: default
- Behavior: interaction; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-ring">Try this effect</button>
```

## fx-ring-pulse

An outlined ring expands and fades.

- Pack: loaders (new)
- Behavior: loop; target: pseudo-elements
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-ring-pulse" aria-hidden="true"></span>
```

## fx-ripple

Expand a shadow halo.

- Pack: default
- Behavior: loop; target: element
- Rendering: paint
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-ripple" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

## fx-roll-down

roll down entrance.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-down">Motion, made simple.</div>
```

## fx-roll-down-out

roll down dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-down-out">Motion, made simple.</div>
```

## fx-roll-in

Roll in from the left.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-in">Motion, made simple.</div>
```

## fx-roll-out

Roll away to the right with a fade.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-out">Motion, made simple.</div>
```

## fx-roll-up

roll up entrance.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-up">Motion, made simple.</div>
```

## fx-roll-up-out

roll up dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-roll-up-out">Motion, made simple.</div>
```

## fx-rotate

Tilt upright.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-rotate">Motion, made simple.</div>
```

## fx-rotate-h

Rotate and scale on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-rotate-h">Try this effect</button>
```

## fx-rotate-out

rotate dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-rotate-out">Motion, made simple.</div>
```

## fx-rubber

A squash-and-stretch pulse.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-rubber">Motion, made simple.</div>
```

## fx-scan

Sweep a narrow beam back and forth.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-scan" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

## fx-settle

A damped rotational settle.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-settle">Motion, made simple.</div>
```

## fx-shake

A horizontal error shake.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shake">Motion, made simple.</div>
```

## fx-shake-y

A vertical error shake.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shake-y">Motion, made simple.</div>
```

## fx-sheet-down

sheet down entrance.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-down">Motion, made simple.</div>
```

## fx-sheet-down-out

Dismiss downward; alias of fx-sheet-out.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-down-out">Motion, made simple.</div>
```

## fx-sheet-left

Slide a drawer in from the left.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-left">Motion, made simple.</div>
```

## fx-sheet-left-out

Dismiss a drawer to the left.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-left-out">Motion, made simple.</div>
```

## fx-sheet-out

sheet dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-out">Motion, made simple.</div>
```

## fx-sheet-right

Slide a drawer in from the right.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-right">Motion, made simple.</div>
```

## fx-sheet-right-out

Dismiss a drawer to the right.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-right-out">Motion, made simple.</div>
```

## fx-sheet-up

sheet up entrance.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-up">Motion, made simple.</div>
```

## fx-sheet-up-out

Dismiss a drawer through its top edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-sheet-up-out">Motion, made simple.</div>
```

## fx-shimmer

Sweep a highlight across a skeleton.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shimmer" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

## fx-shine

Sweep a highlight across the surface.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-shine">Try this effect</button>
```

## fx-shrink-x

Shrink visually on the horizontal axis; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shrink-x">Motion, made simple.</div>
```

## fx-shrink-x-to

Shrink visually on the horizontal axis and hold the configured scale; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shrink-x-to" style="--fx-x:.6;width:100px;height:24px;background:currentColor"></div>
```

## fx-shrink-y

Shrink visually on the vertical axis; surrounding layout does not move.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-shrink-y">Motion, made simple.</div>
```

## fx-skeleton-wave

An angled highlight travels across a skeleton block.

- Pack: loaders (new)
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-skeleton-wave" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

## fx-skew-h

Skew on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-skew-h">Try this effect</button>
```

## fx-slide-out

slide dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-slide-out">Motion, made simple.</div>
```

## fx-sonar

Two expanding rings ripple with offset phases.

- Pack: loaders (new)
- Behavior: loop; target: pseudo-elements
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-sonar" aria-hidden="true"></span>
```

## fx-spin

Rotate continuously.

- Pack: default
- Behavior: loop; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<span class="fx-spin" style="display:inline-block;width:24px;height:24px;border:3px solid #e2e6ee;border-top-color:currentColor;border-radius:50%" aria-hidden="true"></span>
```

## fx-spring-down

Drop with a small overshoot and settle.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-spring-down">Motion, made simple.</div>
```

## fx-spring-left

Spring in from the left.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-spring-left">Motion, made simple.</div>
```

## fx-spring-right

Spring in from the right.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-spring-right">Motion, made simple.</div>
```

## fx-spring-up

Rise with a small overshoot and settle.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-spring-up">Motion, made simple.</div>
```

## fx-stagger

Stagger child entrances; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-blur

Stagger child entrances with the blur variant; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-blur">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-down

Children enter from above in sequence.

- Pack: motion (new)
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-down">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-fade

Stagger child entrances with the fade variant; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-fade">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-left

Stagger child entrances with the left variant; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-left">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-pop

Stagger child entrances with the pop variant; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-pop">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-right

Stagger child entrances with the right variant; use fx-stagger on the parent.

- Pack: default
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-right">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-roll-up

Children roll upward in sequence; clip overflow where needed.

- Pack: motion (new)
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-roll-up">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-rotate

Children tilt into place in sequence.

- Pack: motion (new)
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-rotate">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stagger-zoom

Children scale in gently in sequence.

- Pack: motion (new)
- Behavior: one-shot; target: children
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<ul class="fx-stagger fx-stagger-zoom">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## fx-stream

Fade in a streamed chunk.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-stream">Motion, made simple.</div>
```

## fx-swing

Hinge in from the top.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-swing">Motion, made simple.</div>
```

## fx-swing-out

Hinge away from the top edge.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-swing-out">Motion, made simple.</div>
```

## fx-tada

A playful scale-and-rotation celebration.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-tada">Motion, made simple.</div>
```

## fx-thought

Rise through a soft blur.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-thought">Motion, made simple.</div>
```

## fx-thought-out

Dissolve upward through a blur.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: filter
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-thought-out">Motion, made simple.</div>
```

## fx-tilt

Tilt in perspective on hover or focus.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-tilt">Try this effect</button>
```

## fx-trace

Draw a line across its track.

- Pack: default
- Behavior: loop; target: pseudo-element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-trace" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

## fx-underline

Reveal an underline from the left.

- Pack: default
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-underline">Try this effect</button>
```

## fx-underline-center

Reveal an underline outward from its center.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-underline-center">Try this effect</button>
```

## fx-underline-double

Reveal two coordinated underline strokes.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-underline-double">Try this effect</button>
```

## fx-underline-right

Reveal an underline from the right.

- Pack: interactions (new)
- Behavior: interaction; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<button class="fx-underline-right">Try this effect</button>
```

## fx-up

Rise and fade in.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-up">Motion, made simple.</div>
```

## fx-up-left

Fade in from the upper-left corner.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-up-left">Motion, made simple.</div>
```

## fx-up-out

up dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-up-out">Motion, made simple.</div>
```

## fx-up-right

Fade in from the upper-right corner.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-up-right">Motion, made simple.</div>
```

## fx-width

Transition an application-supplied width change.

- Pack: default
- Behavior: toggle; target: element
- Rendering: layout
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-width" style="width:100px">Resize me</div>
```

## fx-wiggle

A small rotational wiggle.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wiggle">Motion, made simple.</div>
```

## fx-wipe

Unmask from the left and fade in.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wipe">Motion, made simple.</div>
```

## fx-wipe-down

Unmask from the bottom without fading.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wipe-down">Motion, made simple.</div>
```

## fx-wipe-left

Unmask from the left without fading.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wipe-left">Motion, made simple.</div>
```

## fx-wipe-right

Unmask from the right without fading.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wipe-right">Motion, made simple.</div>
```

## fx-wipe-up

Unmask from the top without fading.

- Pack: visual (new)
- Behavior: one-shot; target: element
- Rendering: mask
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wipe-up">Motion, made simple.</div>
```

## fx-wobble

Sideways travel coupled with a diminishing rotation.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-wobble">Motion, made simple.</div>
```

## fx-zoom

Scale in gently.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom">Motion, made simple.</div>
```

## fx-zoom-down

zoom down entrance.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-down">Motion, made simple.</div>
```

## fx-zoom-down-out

Shrink away downward.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-down-out">Motion, made simple.</div>
```

## fx-zoom-left

Scale in with a short move from the left.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-left">Motion, made simple.</div>
```

## fx-zoom-left-out

Shrink away to the left.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-left-out">Motion, made simple.</div>
```

## fx-zoom-out

zoom dismissal; the application owns DOM removal.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-out">Motion, made simple.</div>
```

## fx-zoom-right

Scale in with a short move from the right.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-right">Motion, made simple.</div>
```

## fx-zoom-right-out

Shrink away to the right.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-right-out">Motion, made simple.</div>
```

## fx-zoom-up

Rise and scale in.

- Pack: default
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-up">Motion, made simple.</div>
```

## fx-zoom-up-out

Shrink away upward.

- Pack: motion (new)
- Behavior: one-shot; target: element
- Rendering: transform / opacity
- Reduced motion: v2 policy: duration becomes .01ms, iterations become one, and transitions are disabled. Delay, pause, direction and effect endpoints are preserved.

```html
<div class="fx-zoom-up-out">Motion, made simple.</div>
```
