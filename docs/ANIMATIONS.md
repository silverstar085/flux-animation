# Animation reference

Generated from `src/effects.json`; edit that file, not this one. 183 effects and helpers; 210 public classes including controls. Every entry links to a live preview in the [demo](https://silverstar085.github.io/flux-animation/).

**Reduced motion.** With `prefers-reduced-motion: reduce`, every effect finishes immediately (.01ms, one iteration) and transitions are disabled. Delay, pause, direction and end states are kept. Exceptions are noted on the entry: loaders whose last frame would be invisible rest on a static, visible pose, and `fx-cycle-*` shows only its first child.

- [Chat](#chat) (20)
- [Loaders](#loaders) (21)
- [Updates](#updates) (11)
- [Entrances](#entrances) (37)
- [Exits](#exits) (24)
- [Attention](#attention) (23)
- [Stagger](#stagger) (10)
- [Interactions](#interactions) (19)
- [Size](#size) (10)
- [Visual effects](#visual-effects) (8)

## Chat

### fx-caret-dot

A pulsing dot at the end of a streaming answer.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-caret-dot)

```html
<p class="fx-caret-dot">Here is what I found</p>
```

### fx-ellipsis

Appends dots that count up to three: “Thinking...”.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the pseudo-element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-ellipsis)

```html
<span class="fx-ellipsis">Thinking</span>
```

### fx-shimmer-text

A highlight sweeps through the text itself, for “Thinking…” labels.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the element; rendering: paint
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shimmer-text)

```html
<span class="fx-shimmer-text">Thinking…</span>
```

### fx-skeleton-msg

A skeleton message with three lines of varied width and a travelling highlight.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-skeleton-msg)

```html
<div class="fx-skeleton-msg" style="width:220px" aria-hidden="true"></div>
```

### fx-step

A tool or agent step in progress: spinner icon before the label. Swap for fx-step-done or fx-step-error.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-step)

```html
<span class="fx-step">Searching the web</span>
```

### fx-step-done

A finished step: a checkmark pops in before the label. Set --fx-success to color it.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: one-shot; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-step-done)

```html
<span class="fx-step-done">Searched 3 sites</span>
```

### fx-step-error

A failed step: a cross pops in before the label. Set --fx-danger to color it.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: one-shot; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-step-error)

```html
<span class="fx-step-error">Couldn’t reach the site</span>
```

### fx-stream-word

A streamed word or token fades and comes into focus. Apply to each appended span.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stream-word)

```html
<p><span class="fx-stream-word">Streaming</span> <span class="fx-stream-word" style="--fx-delay:0.15s">one</span> <span class="fx-stream-word" style="--fx-delay:0.30s">word</span> <span class="fx-stream-word" style="--fx-delay:0.45s">at</span> <span class="fx-stream-word" style="--fx-delay:0.60s">a</span> <span class="fx-stream-word" style="--fx-delay:0.75s">time</span></p>
```

### fx-typing

A complete typing bubble: a bright dot hops across three dim dots. No child markup.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.1
- Behavior: loop; animates the pseudo-elements; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-typing)

```html
<span class="fx-typing" aria-hidden="true"></span>
```

### fx-bars

An equalizer of four scaled bars.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bars)

```html
<span class="fx-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
```

### fx-cursor

Blink a decorative text caret.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-cursor)

```html
<p class="fx-cursor">Writing a reply</p>
```

### fx-dots

Three softly bouncing typing dots.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots)

```html
<span class="fx-dots" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-msg

A small rise and scale for a message.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-msg)

```html
<div class="fx-msg">Hi! How can I help today?</div>
```

### fx-msg-user

A diagonal scale entrance for a user message.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-msg-user)

```html
<div class="fx-msg-user">Summarize this thread</div>
```

### fx-ping

An expanding presence halo.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-ping)

```html
<span class="fx-ping" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

### fx-progress

An indeterminate moving progress segment.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-progress)

```html
<div class="fx-progress" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

### fx-pulse-soft

pulse soft entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-pulse-soft)

```html
<div class="fx-pulse-soft" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

### fx-shimmer

Sweep a highlight across a skeleton.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shimmer)

```html
<div class="fx-shimmer" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

### fx-spin

Rotate continuously.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-spin)

```html
<span class="fx-spin" style="display:inline-block;width:24px;height:24px;border:3px solid #e2e6ee;border-top-color:currentColor;border-radius:50%" aria-hidden="true"></span>
```

### fx-stream

Fade in a streamed chunk.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stream)

```html
<p>Here is <span class="fx-stream">the next chunk</span></p>
```

## Loaders

### fx-bars-travel

An opacity highlight travels through five bars.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bars-travel)

```html
<span class="fx-bars-travel" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
```

### fx-bars-wave

Five bars rise and fall with offset phases.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bars-wave)

```html
<span class="fx-bars-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
```

### fx-dots-orbit

Three dots physically orbit their center.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-orbit)

```html
<span class="fx-dots-orbit" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-zigzag

Dots alternate between diagonal positions.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-zigzag)

```html
<span class="fx-dots-zigzag" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dual-ring

Two concentric arcs rotate in opposite directions.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the pseudo-elements; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dual-ring)

```html
<span class="fx-dual-ring" aria-hidden="true"></span>
```

### fx-ring-pulse

An outlined ring expands and fades.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the pseudo-elements; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-ring-pulse)

```html
<span class="fx-ring-pulse" aria-hidden="true"></span>
```

### fx-skeleton-wave

An angled highlight travels across a skeleton block.

- Import: `flux-animation/loaders`, `flux-animation/chat`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-skeleton-wave)

```html
<div class="fx-skeleton-wave" style="width:140px;height:14px;background:#e2e6ee;border-radius:7px" aria-hidden="true"></div>
```

### fx-sonar

Two expanding rings ripple with offset phases.

- Import: `flux-animation/loaders`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the pseudo-elements; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sonar)

```html
<span class="fx-sonar" aria-hidden="true"></span>
```

### fx-bloom

Breathe a soft shadow halo.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bloom)

```html
<span class="fx-bloom" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

### fx-comet

Send a fading streak across its track.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-comet)

```html
<div class="fx-comet" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

### fx-dots-elastic

A three-dot elastic loading indicator.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-elastic)

```html
<span class="fx-dots-elastic" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-fade

A three-dot fade loading indicator.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-fade)

```html
<span class="fx-dots-fade" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-flow

A three-dot flow loading indicator.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-flow)

```html
<span class="fx-dots-flow" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-scale

A three-dot scale loading indicator.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-scale)

```html
<span class="fx-dots-scale" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-spinner

A three-dot spinner loading indicator.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-spinner)

```html
<span class="fx-dots-spinner" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-dots-wave

A three-dot wave loading indicator.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-dots-wave)

```html
<span class="fx-dots-wave" aria-hidden="true"><i></i><i></i><i></i></span>
```

### fx-fill

Sweep, hold, and fade a tint.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fill)

```html
<div class="fx-fill">Motion, made simple.</div>
```

### fx-orbit

Rotate a single orbiting dot.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-orbit)

```html
<span class="fx-orbit" style="display:inline-block;width:28px;height:28px" aria-hidden="true"></span>
```

### fx-ripple

Expand a shadow halo.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-ripple)

```html
<span class="fx-ripple" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:currentColor" aria-hidden="true"></span>
```

### fx-scan

Sweep a narrow beam back and forth.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-scan)

```html
<div class="fx-scan" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

### fx-trace

Draw a line across its track.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: loop; animates the pseudo-element; rendering: transform / opacity
- Reduced motion: Rests on a static, visible pose.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-trace)

```html
<div class="fx-trace" style="width:140px;height:5px;background:#e2e6ee" aria-hidden="true"></div>
```

## Updates

### fx-clip

Clip overflowing roll or drawer effects.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: helper; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-clip)

```html
<div class="fx-clip"><div class="fx-roll-up">Rolling text</div></div>
```

### fx-cycle-2

Rotate 2 decorative status labels in a shared grid.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Cycling stops; the first child stays visible and the others stay hidden.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-cycle-2)

```html
<div class="fx-cycle-2" aria-hidden="true"><span>Step 1</span><span>Step 2</span></div>
<span class="sr-only">Working…</span>
```

### fx-cycle-3

Rotate 3 decorative status labels in a shared grid.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Cycling stops; the first child stays visible and the others stay hidden.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-cycle-3)

```html
<div class="fx-cycle-3" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span></div>
<span class="sr-only">Working…</span>
```

### fx-cycle-4

Rotate 4 decorative status labels in a shared grid.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Cycling stops; the first child stays visible and the others stay hidden.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-cycle-4)

```html
<div class="fx-cycle-4" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span><span>Step 4</span></div>
<span class="sr-only">Working…</span>
```

### fx-cycle-5

Rotate 5 decorative status labels in a shared grid.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: loop; animates the children; rendering: transform / opacity
- Reduced motion: Cycling stops; the first child stays visible and the others stay hidden.
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-cycle-5)

```html
<div class="fx-cycle-5" aria-hidden="true"><span>Step 1</span><span>Step 2</span><span>Step 3</span><span>Step 4</span><span>Step 5</span></div>
<span class="sr-only">Working…</span>
```

### fx-roll-down

roll down entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-down)

```html
<div class="fx-roll-down">Motion, made simple.</div>
```

### fx-roll-down-out

roll down dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-down-out)

```html
<div class="fx-roll-down-out">Motion, made simple.</div>
```

### fx-roll-up

roll up entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-up)

```html
<div class="fx-roll-up">Motion, made simple.</div>
```

### fx-roll-up-out

roll up dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-up-out)

```html
<div class="fx-roll-up-out">Motion, made simple.</div>
```

### fx-thought

Rise through a soft blur.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-thought)

```html
<div class="fx-thought">Motion, made simple.</div>
```

### fx-thought-out

Dissolve upward through a blur.

- Import: `flux-animation`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-thought-out)

```html
<div class="fx-thought-out">Motion, made simple.</div>
```

## Entrances

### fx-down-left

Fade in from the lower-left corner.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-down-left)

```html
<div class="fx-down-left">Motion, made simple.</div>
```

### fx-down-right

Fade in from the lower-right corner.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-down-right)

```html
<div class="fx-down-right">Motion, made simple.</div>
```

### fx-flip-in-bottom

Unfold from the bottom edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-in-bottom)

```html
<div class="fx-flip-in-bottom">Motion, made simple.</div>
```

### fx-flip-in-left

Unfold from the left edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-in-left)

```html
<div class="fx-flip-in-left">Motion, made simple.</div>
```

### fx-flip-in-right

Unfold from the right edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-in-right)

```html
<div class="fx-flip-in-right">Motion, made simple.</div>
```

### fx-flip-in-top

Unfold from the top edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-in-top)

```html
<div class="fx-flip-in-top">Motion, made simple.</div>
```

### fx-sheet-left

Slide a drawer in from the left.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-left)

```html
<div class="fx-sheet-left">Motion, made simple.</div>
```

### fx-sheet-right

Slide a drawer in from the right.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-right)

```html
<div class="fx-sheet-right">Motion, made simple.</div>
```

### fx-spring-down

Drop with a small overshoot and settle.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-spring-down)

```html
<div class="fx-spring-down">Motion, made simple.</div>
```

### fx-spring-left

Spring in from the left.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-spring-left)

```html
<div class="fx-spring-left">Motion, made simple.</div>
```

### fx-spring-right

Spring in from the right.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-spring-right)

```html
<div class="fx-spring-right">Motion, made simple.</div>
```

### fx-spring-up

Rise with a small overshoot and settle.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-spring-up)

```html
<div class="fx-spring-up">Motion, made simple.</div>
```

### fx-up-left

Fade in from the upper-left corner.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-up-left)

```html
<div class="fx-up-left">Motion, made simple.</div>
```

### fx-up-right

Fade in from the upper-right corner.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-up-right)

```html
<div class="fx-up-right">Motion, made simple.</div>
```

### fx-zoom-left

Scale in with a short move from the left.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-left)

```html
<div class="fx-zoom-left">Motion, made simple.</div>
```

### fx-zoom-right

Scale in with a short move from the right.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-right)

```html
<div class="fx-zoom-right">Motion, made simple.</div>
```

### fx-blur

Focus in from a blur.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-blur)

```html
<div class="fx-blur">Motion, made simple.</div>
```

### fx-bounce-in

Bounce into view.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bounce-in)

```html
<div class="fx-bounce-in">Motion, made simple.</div>
```

### fx-down

Drop and fade in.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-down)

```html
<div class="fx-down">Motion, made simple.</div>
```

### fx-fade

Fade in gently.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fade)

```html
<div class="fx-fade">Motion, made simple.</div>
```

### fx-flip-x

Tip forward in 3D.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-x)

```html
<div class="fx-flip-x">Motion, made simple.</div>
```

### fx-flip-y

Turn in from the side.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-y)

```html
<div class="fx-flip-y">Motion, made simple.</div>
```

### fx-grow-x

Grow visually on the horizontal axis; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-grow-x)

```html
<div class="fx-grow-x">Motion, made simple.</div>
```

### fx-left

Enter from the left.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-left)

```html
<div class="fx-left">Motion, made simple.</div>
```

### fx-pop

Scale in with a spring easing.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-pop)

```html
<div class="fx-pop">Motion, made simple.</div>
```

### fx-reveal

Unmask from the top and fade in.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-reveal)

```html
<div class="fx-reveal">Motion, made simple.</div>
```

### fx-right

Enter from the right.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-right)

```html
<div class="fx-right">Motion, made simple.</div>
```

### fx-roll-in

Roll in from the left.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-in)

```html
<div class="fx-roll-in">Motion, made simple.</div>
```

### fx-rotate

Tilt upright.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-rotate)

```html
<div class="fx-rotate">Motion, made simple.</div>
```

### fx-sheet-down

sheet down entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-down)

```html
<div class="fx-sheet-down">Motion, made simple.</div>
```

### fx-sheet-up

sheet up entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-up)

```html
<div class="fx-sheet-up">Motion, made simple.</div>
```

### fx-swing

Hinge in from the top.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-swing)

```html
<div class="fx-swing">Motion, made simple.</div>
```

### fx-up

Rise and fade in.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-up)

```html
<div class="fx-up">Motion, made simple.</div>
```

### fx-wipe

Unmask from the left and fade in.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wipe)

```html
<div class="fx-wipe">Motion, made simple.</div>
```

### fx-zoom

Scale in gently.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom)

```html
<div class="fx-zoom">Motion, made simple.</div>
```

### fx-zoom-down

zoom down entrance.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-down)

```html
<div class="fx-zoom-down">Motion, made simple.</div>
```

### fx-zoom-up

Rise and scale in.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-up)

```html
<div class="fx-zoom-up">Motion, made simple.</div>
```

## Exits

### fx-flip-y-out

Tip away sideways in 3D.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-y-out)

```html
<div class="fx-flip-y-out">Motion, made simple.</div>
```

### fx-right-out

Dismiss to the right; alias of fx-slide-out.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-right-out)

```html
<div class="fx-right-out">Motion, made simple.</div>
```

### fx-roll-out

Roll away to the right with a fade.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-roll-out)

```html
<div class="fx-roll-out">Motion, made simple.</div>
```

### fx-sheet-down-out

Dismiss downward; alias of fx-sheet-out.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-down-out)

```html
<div class="fx-sheet-down-out">Motion, made simple.</div>
```

### fx-sheet-left-out

Dismiss a drawer to the left.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-left-out)

```html
<div class="fx-sheet-left-out">Motion, made simple.</div>
```

### fx-sheet-right-out

Dismiss a drawer to the right.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-right-out)

```html
<div class="fx-sheet-right-out">Motion, made simple.</div>
```

### fx-sheet-up-out

Dismiss a drawer through its top edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-up-out)

```html
<div class="fx-sheet-up-out">Motion, made simple.</div>
```

### fx-swing-out

Hinge away from the top edge.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-swing-out)

```html
<div class="fx-swing-out">Motion, made simple.</div>
```

### fx-zoom-down-out

Shrink away downward.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-down-out)

```html
<div class="fx-zoom-down-out">Motion, made simple.</div>
```

### fx-zoom-left-out

Shrink away to the left.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-left-out)

```html
<div class="fx-zoom-left-out">Motion, made simple.</div>
```

### fx-zoom-right-out

Shrink away to the right.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-right-out)

```html
<div class="fx-zoom-right-out">Motion, made simple.</div>
```

### fx-zoom-up-out

Shrink away upward.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-up-out)

```html
<div class="fx-zoom-up-out">Motion, made simple.</div>
```

### fx-blur-out

blur dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-blur-out)

```html
<div class="fx-blur-out">Motion, made simple.</div>
```

### fx-down-out

down dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-down-out)

```html
<div class="fx-down-out">Motion, made simple.</div>
```

### fx-drop-out

drop dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-drop-out)

```html
<div class="fx-drop-out">Motion, made simple.</div>
```

### fx-fade-out

fade dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fade-out)

```html
<div class="fx-fade-out">Motion, made simple.</div>
```

### fx-flip-x-out

flip x dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flip-x-out)

```html
<div class="fx-flip-x-out">Motion, made simple.</div>
```

### fx-left-out

left dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-left-out)

```html
<div class="fx-left-out">Motion, made simple.</div>
```

### fx-pop-out

pop dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-pop-out)

```html
<div class="fx-pop-out">Motion, made simple.</div>
```

### fx-rotate-out

rotate dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-rotate-out)

```html
<div class="fx-rotate-out">Motion, made simple.</div>
```

### fx-sheet-out

sheet dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-sheet-out)

```html
<div class="fx-sheet-out">Motion, made simple.</div>
```

### fx-slide-out

slide dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-slide-out)

```html
<div class="fx-slide-out">Motion, made simple.</div>
```

### fx-up-out

up dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-up-out)

```html
<div class="fx-up-out">Motion, made simple.</div>
```

### fx-zoom-out

zoom dismissal; the application owns DOM removal.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-zoom-out)

```html
<div class="fx-zoom-out">Motion, made simple.</div>
```

## Attention

### fx-breathe

A subtle scale-and-opacity breathing loop.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-breathe)

```html
<div class="fx-breathe">Motion, made simple.</div>
```

### fx-hop

Lift with a squash-and-stretch landing.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-hop)

```html
<div class="fx-hop">Motion, made simple.</div>
```

### fx-nod

Two small vertical movements for acknowledgment.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-nod)

```html
<div class="fx-nod">Motion, made simple.</div>
```

### fx-pendulum

A calm, top-anchored swinging loop.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-pendulum)

```html
<div class="fx-pendulum">Motion, made simple.</div>
```

### fx-recoil

Compress backward, then recover with an overshoot.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-recoil)

```html
<div class="fx-recoil">Motion, made simple.</div>
```

### fx-settle

A damped rotational settle.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-settle)

```html
<div class="fx-settle">Motion, made simple.</div>
```

### fx-shake-y

A vertical error shake.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shake-y)

```html
<div class="fx-shake-y">Motion, made simple.</div>
```

### fx-wobble

Sideways travel coupled with a diminishing rotation.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wobble)

```html
<div class="fx-wobble">Motion, made simple.</div>
```

### fx-bell

A diminishing top-anchored ring.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bell)

```html
<div class="fx-bell">Motion, made simple.</div>
```

### fx-bounce

Two diminishing bounces.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-bounce)

```html
<div class="fx-bounce">Motion, made simple.</div>
```

### fx-buzz

A tiny horizontal vibration.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-buzz)

```html
<div class="fx-buzz">Motion, made simple.</div>
```

### fx-flash

A quick opacity cue.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-flash)

```html
<div class="fx-flash">Motion, made simple.</div>
```

### fx-float

A gentle vertical floating loop.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: loop; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-float)

```html
<div class="fx-float">Motion, made simple.</div>
```

### fx-glow

A soft animated shadow glow.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-glow)

```html
<div class="fx-glow">Motion, made simple.</div>
```

### fx-heartbeat

A double scale heartbeat.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-heartbeat)

```html
<div class="fx-heartbeat">Motion, made simple.</div>
```

### fx-jello

A diminishing skew wobble.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-jello)

```html
<div class="fx-jello">Motion, made simple.</div>
```

### fx-nudge

Two small rightward nudges.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-nudge)

```html
<div class="fx-nudge">Motion, made simple.</div>
```

### fx-pulse

A small scale pulse.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-pulse)

```html
<div class="fx-pulse">Motion, made simple.</div>
```

### fx-ring

A focus-triggered shadow ring.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-ring)

```html
<button class="fx-ring">Try this effect</button>
```

### fx-rubber

A squash-and-stretch pulse.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-rubber)

```html
<div class="fx-rubber">Motion, made simple.</div>
```

### fx-shake

A horizontal error shake.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shake)

```html
<div class="fx-shake">Motion, made simple.</div>
```

### fx-tada

A playful scale-and-rotation celebration.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-tada)

```html
<div class="fx-tada">Motion, made simple.</div>
```

### fx-wiggle

A small rotational wiggle.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wiggle)

```html
<div class="fx-wiggle">Motion, made simple.</div>
```

## Stagger

### fx-stagger-down

Children enter from above in sequence.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-down)

```html
<ul class="fx-stagger fx-stagger-down">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-roll-up

Children roll upward in sequence; clip overflow where needed.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-roll-up)

```html
<ul class="fx-stagger fx-stagger-roll-up">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-rotate

Children tilt into place in sequence.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-rotate)

```html
<ul class="fx-stagger fx-stagger-rotate">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-zoom

Children scale in gently in sequence.

- Import: `flux-animation/motion`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-zoom)

```html
<ul class="fx-stagger fx-stagger-zoom">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger

Stagger child entrances; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger)

```html
<ul class="fx-stagger">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-blur

Stagger child entrances with the blur variant; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-blur)

```html
<ul class="fx-stagger fx-stagger-blur">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-fade

Stagger child entrances with the fade variant; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-fade)

```html
<ul class="fx-stagger fx-stagger-fade">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-left

Stagger child entrances with the left variant; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-left)

```html
<ul class="fx-stagger fx-stagger-left">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-pop

Stagger child entrances with the pop variant; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-pop)

```html
<ul class="fx-stagger fx-stagger-pop">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### fx-stagger-right

Stagger child entrances with the right variant; use fx-stagger on the parent.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: one-shot; animates the children; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-stagger-right)

```html
<ul class="fx-stagger fx-stagger-right">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## Interactions

### fx-fill-h-down

Sweep a background tint up from the bottom.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fill-h-down)

```html
<button class="fx-fill-h-down">Try this effect</button>
```

### fx-fill-h-left

Sweep a background tint in from the left.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fill-h-left)

```html
<button class="fx-fill-h-left">Try this effect</button>
```

### fx-fill-h-right

Sweep a background tint in from the right.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fill-h-right)

```html
<button class="fx-fill-h-right">Try this effect</button>
```

### fx-fill-h-up

Sweep a background tint down from the top.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-fill-h-up)

```html
<button class="fx-fill-h-up">Try this effect</button>
```

### fx-overline

Reveal a stroke above the label.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-overline)

```html
<button class="fx-overline">Try this effect</button>
```

### fx-underline-center

Reveal an underline outward from its center.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-underline-center)

```html
<button class="fx-underline-center">Try this effect</button>
```

### fx-underline-double

Reveal two coordinated underline strokes.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-underline-double)

```html
<button class="fx-underline-double">Try this effect</button>
```

### fx-underline-right

Reveal an underline from the right.

- Import: `flux-animation/interactions`, `flux-animation/all` · new in 3.0
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-underline-right)

```html
<button class="fx-underline-right">Try this effect</button>
```

### fx-brighten

Brighten on hover or focus.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-brighten)

```html
<button class="fx-brighten">Try this effect</button>
```

### fx-btn

Scale down on press.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-btn)

```html
<button class="fx-btn">Try this effect</button>
```

### fx-glow-h

Add a glow on hover or focus.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-glow-h)

```html
<button class="fx-glow-h">Try this effect</button>
```

### fx-grow

Grow slightly on hover or focus.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-grow)

```html
<button class="fx-grow">Try this effect</button>
```

### fx-lift

Lift and add a shadow on hover or focus.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: paint
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-lift)

```html
<button class="fx-lift">Try this effect</button>
```

### fx-push

Sink slightly on press.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/chat`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-push)

```html
<button class="fx-push">Try this effect</button>
```

### fx-rotate-h

Rotate and scale on hover or focus.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-rotate-h)

```html
<button class="fx-rotate-h">Try this effect</button>
```

### fx-shine

Sweep a highlight across the surface.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shine)

```html
<button class="fx-shine">Try this effect</button>
```

### fx-skew-h

Skew on hover or focus.

- Import: `flux-animation`, `flux-animation/core`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-skew-h)

```html
<button class="fx-skew-h">Try this effect</button>
```

### fx-tilt

Tilt in perspective on hover or focus.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-tilt)

```html
<button class="fx-tilt">Try this effect</button>
```

### fx-underline

Reveal an underline from the left.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: interaction; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-underline)

```html
<button class="fx-underline">Try this effect</button>
```

## Size

### fx-collapse-h

Collapse the maximum height; this changes layout.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: layout
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-collapse-h)

```html
<div class="fx-collapse-h">Motion, made simple.</div>
```

### fx-collapse-w

Collapse the maximum width; this changes layout.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: layout
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-collapse-w)

```html
<div class="fx-collapse-w">Motion, made simple.</div>
```

### fx-expand-h

Expand the maximum height; this changes layout.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: layout
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-expand-h)

```html
<div class="fx-expand-h">Motion, made simple.</div>
```

### fx-expand-w

Expand the maximum width; this changes layout.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: layout
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-expand-w)

```html
<div class="fx-expand-w">Motion, made simple.</div>
```

### fx-grow-x-to

Grow visually on the horizontal axis and hold the configured scale; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-grow-x-to)

```html
<div class="fx-grow-x-to" style="--fx-x:1.5;width:100px;height:24px;background:currentColor"></div>
```

### fx-grow-y

Grow visually on the vertical axis; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-grow-y)

```html
<div class="fx-grow-y">Motion, made simple.</div>
```

### fx-shrink-x

Shrink visually on the horizontal axis; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shrink-x)

```html
<div class="fx-shrink-x">Motion, made simple.</div>
```

### fx-shrink-x-to

Shrink visually on the horizontal axis and hold the configured scale; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shrink-x-to)

```html
<div class="fx-shrink-x-to" style="--fx-x:.6;width:100px;height:24px;background:currentColor"></div>
```

### fx-shrink-y

Shrink visually on the vertical axis; surrounding layout does not move.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: one-shot; animates the element; rendering: transform / opacity
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-shrink-y)

```html
<div class="fx-shrink-y">Motion, made simple.</div>
```

### fx-width

Transition an application-supplied width change.

- Import: `flux-animation`, `flux-animation/all`
- Behavior: toggle; animates the element; rendering: layout
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-width)

```html
<div class="fx-width" style="width:100px">Resize me</div>
```

## Visual effects

### fx-blur-zoom-in

Scale up through a soft focus pull.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-blur-zoom-in)

```html
<div class="fx-blur-zoom-in">Motion, made simple.</div>
```

### fx-blur-zoom-out

Scale away while defocusing.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: filter
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-blur-zoom-out)

```html
<div class="fx-blur-zoom-out">Motion, made simple.</div>
```

### fx-iris-in

Open a circular mask around a configurable origin.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-iris-in)

```html
<div class="fx-iris-in">Motion, made simple.</div>
```

### fx-iris-out

Close a circular mask around a configurable origin.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-iris-out)

```html
<div class="fx-iris-out">Motion, made simple.</div>
```

### fx-wipe-down

Unmask from the bottom without fading.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wipe-down)

```html
<div class="fx-wipe-down">Motion, made simple.</div>
```

### fx-wipe-left

Unmask from the left without fading.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wipe-left)

```html
<div class="fx-wipe-left">Motion, made simple.</div>
```

### fx-wipe-right

Unmask from the right without fading.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wipe-right)

```html
<div class="fx-wipe-right">Motion, made simple.</div>
```

### fx-wipe-up

Unmask from the top without fading.

- Import: `flux-animation/visual`, `flux-animation/all` · new in 3.0
- Behavior: one-shot; animates the element; rendering: mask
- [Live preview](https://silverstar085.github.io/flux-animation/#fx-wipe-up)

```html
<div class="fx-wipe-up">Motion, made simple.</div>
```
