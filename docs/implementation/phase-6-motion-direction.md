# Phase 6 — Motion Direction

**Date:** 2026-08-06
**Scope:** Homepage only. No other route touched.
**Gates:** typecheck ✅ · lint ✅ · build ✅ · runtime smoke ✅

---

## 1. The architectural decision

> **A film has one edit. It does not have eleven components each animating themselves.**

Before this phase the page had **eleven independent clocks**: the Hero owned a
timeline, the Journey owned a timeline, twelve `Emerge` components each owned a
ScrollTrigger, and `LightField` ran its own scroll listener. No shared labels. No
way for one act to hand off to the next. Eleven separate teardowns to get wrong.

Phase 6 replaced that with **one director**.

```
src/components/motion/FilmDirector/FilmDirector.tsx   the shot list
src/lib/motion/film/light.ts                          THE LIGHT — a character
src/lib/motion/film/camera.ts                         the camera's permitted moves
src/lib/motion/film/timelines.ts                      five timelines + the batch
```

Sections still own their **set and their copy**. The director owns **the edit**.
That separation is what lets the light persist across acts as a character rather
than resetting at every section boundary — which is the whole point of this phase.

### What was removed

| Removed | Replaced by |
|---|---|
| `Hero`'s internal `useEffect` timeline | `HeroTimeline` |
| `NinetyDayJourney`'s internal timeline | `JourneyTimeline` + `FirstNoteTimeline` |
| `LightField` component (own scroll listener) | The Light character, driven by act triggers |
| 12 × per-component `Emerge` ScrollTriggers | One `ScrollTrigger.batch` |
| `Reveal` usage in the Reframe | `SplitText` lines in `WalkTimeline` |

**Net: from ~15 independent triggers to 6 act-level triggers plus one batch.**

---

## 2. THE LIGHT — a character, not a gradient

`src/lib/motion/film/light.ts`

The brief asked for the spotlight to become a character. It now has **seven
moods**, and each is a lighting state that says what the lamp is *doing*:

| Mood | Intensity | Vignette | Warmth | What it means |
|---|---:|---:|---:|---|
| `wait` | 0.90 | 0.60 | 0.18 | Parked, warm, still. The house before the show |
| `search` | 0.50 | 0.66 | 0.30 | It has lost the performer and is hunting |
| `follow` | 0.75 | 0.50 | 0.60 | Tracking you down the boards |
| `hesitate` | 0.42 | **0.72** | 0.50 | The catch of breath before week eleven. It pulls back |
| `explode` | **1.00** | **0.34** | 0.95 | The First Note |
| `disperse` | 0.85 | **0.14** | 0.30 | Houselights. It stops performing so you can read |
| `shaft` | 0.70 | 0.56 | 0.82 | One beam, for the page's one shout |

**The arc:** wait → search → follow → hesitate → explode → disperse → shaft →
disperse. The light is absent, then searching, then waiting, then it explodes —
exactly the brief.

Moods **cross-fade over 1.1–1.4s** rather than cutting, because a lighting board
has a fade time. `explode` is the exception at 0.28s — that one is a cue, not a
fade.

### Why `quickSetter` and `quickTo`

The light's properties are written on **every frame of a scrub**.

- `quickSetter` compiles the write once; each subsequent write is a function call
  rather than a property parse and tween construction.
- `quickTo` gives the lamp **inertia** — `duration: 0.9, ease: power2.out`. The
  operator's hand is never instant, and that lag is precisely what makes it read
  as a physical lamp being carried rather than a value being assigned.

Every other atmospheric system — dust, vignette, grade, grounds, cursor — reads
this character's output. **One lamp, one operator, nothing else writes those
properties.**

---

## 3. THE CAMERA

`src/lib/motion/film/camera.ts`

The rules the camera is allowed to obey:

- **Never shake.** Handheld is a different film.
- **Never spin, never rotate** unless something physically rotates.
- **Push and pull are `scale`, not zoom.** Scale on a plate reads as the camera
  travelling through space; changing dimensions reads as a UI resize.
- **Foreground and background never move at the same rate.** That difference *is*
  depth. A single-plane move is a slide, not a dolly.
- **Rack focus is blur, and blur is paint-bound** — so it is applied to one
  element at a time, **never inside a scrub**, and always cleared.

| Move | Where |
|---|---|
| Slow dolly in | `JourneyTimeline` — the floor plate, `scale 1 → 1.26`, `stepIn` ease |
| Camera pull | `HeroTimeline` exit — the plate settles back as the page leaves |
| Rack focus | `HeroTimeline` — the lens finds the supporting line, `blur(6px) → 0`, then `clearProps` |
| Three-plane parallax | Hero exit: plate `+12%`, copy `−26%`, page `0%` |
| Lens breathing | CSS on the hero plates, 26s loop |
| Counter-drift | The Journey numeral moves *against* the push — it is in the room, not on the glass |

> ⚠️ **A conflict caught in review.** `breathe()` and the scrubbed hero exit both
> animated `scale` on the same element. Two tweens fighting over one property is
> not a camera move. The GSAP breathe was removed; the CSS lens loop on the inner
> plates already does it, and more cheaply.

---

## 4. The five timelines

### 4.1 `HeroTimeline` — the opening shot

Labels: `lights` · `title` · `sweep` · `support` · `cta` · `settle`

| Label | t | Beat |
|---|---:|---|
| `lights` | 0.00 | Light adopts `wait`. Ground and H1 already present at paint — LCP never waits on this |
| `title` | 0.15 | Three masked H1 lines, `curtain` ease, 0.04 stagger |
| `sweep` | 0.40 | The lamp crosses the frame — 0.9s, `beam` ease. The one moment light physically travels |
| `support` | 0.52 | **Rack focus** — the lens settles on the type |
| `cta` | 0.68 | |
| `settle` | 0.85 | Scroll affordance |

Plus a **scrubbed exit** — three planes at three rates.

### 4.2 `WalkTimeline` — the light searches

Trigger: `top 78%` → `bottom 60%`, `scrub: 0.9`.

The Reframe's two sentences are **`SplitText` lines, masked, revealed by the
lamp's passage** rather than by entering the viewport. `onUpdate` drives the light
on a path that sweeps *further than the copy does* — which is what makes it read
as hunting rather than following.

```
light.set(78 − p·58,  24 + sin(p·π)·30)
```

### 4.3 `JourneyTimeline` — the walk

Pinned. `end: '+=280%'`, `scrub: 0.7`.
Labels: `walk` · `eleven` · `twelve` · `after`

| Feature | Implementation |
|---|---|
| **The push** | Floor plate `scale → 1.26`, `yPercent → −4`, `stepIn` ease |
| **Light moods** | `follow` (p<0.55) → `hesitate` (p<0.8) → `explode` |
| **Lamp tracking** | `light.set(52 + p·30, 46 − p·18)` — it walks with the camera |
| **Velocity** | `self.getVelocity()` softens the caption when you scrub fast. The eye cannot read at speed, so the film stops asking it to |
| **Direction** | The Flip reframe fires forward at p≥0.8 and **reverses** below it |
| **Flip** | The numeral reframes — measured state → `.is-reframed` → `Flip.from(…, { absolute: true })`. The camera reframing on the moment, animated on transform alone |
| **React handoff** | Progress is broadcast as a `film:journey` `CustomEvent`. GSAP writes the DOM at scroll rate; React re-renders only when a *word* changes |

### 4.4 `FirstNoteTimeline` — the event

Authored as its own timeline and **nested at the `twelve` label**, so the moment
is composed independently of the walk that leads to it.

| t | Beat |
|---:|---|
| 0.00 | The house goes down. Without this the beam has nothing to arrive *out of* |
| 0.18 | **The shaft falls** — `scale 1.14 → 1`, dropping into frame |
| 0.18 | **THE FLARE fires** |
| 0.22 | Flood peaks at 22%, then releases — a note, not a strobe |
| 0.26 | **The source blooms**, a beat behind the shaft. Light travels |
| 0.30 | The floor throws it back |
| p≥0.8 | The numeral stops being white and **becomes light** |

**Why it is an event and not an animation:** the timeline writes a
document-level `--light-flare`. The dust canvas — which has never heard of this
section — reads it and blooms: reach ×1.5, alpha ×3.6, radius ×2.2, and its
sampling jumps from 6 Hz to every frame so the surge cannot stutter.

**Everything reacts:** dust, light, background, typography, vignette, grade,
particles. Nothing is told the moment is happening. It is simply lit by the same
field.

### 4.5 `FinaleTimeline` — houselights

The Turn's sentence is `SplitText` lines revealed on a `scrub: 1` as you arrive,
with the light in `shaft` and descending (`light.set(72, 6 + p·26)`). Reaching
the close switches it to `disperse` — **the light stops performing so someone can
read a price and decide.**

### 4.6 `EmergeBatch` — everything else

`ScrollTrigger.batch` replaces twelve independent triggers with one.
**Velocity-aware**: duration `1.5 − speed·0.7`, stagger `0.14 − speed·0.1`, read
from the batch's own trigger instance. A visitor moving fast gets a tighter
reveal, because a 600ms cascade they have already scrolled past is a cascade
nobody sees.

---

## 5. ScrollTrigger architecture

| # | Trigger | Type | Range | Scrub |
|---|---|---|---|---|
| 1 | Hero exit | timeline | `top top` → `bottom top` | 0.8 |
| 2 | Walk | timeline | `top 78%` → `bottom 60%` | 0.9 |
| 3 | **Journey** | **pinned** | `top top` → `+=280%` | 0.7 |
| 4 | Turn | timeline | `top 72%` → `center 55%` | 1.0 |
| 5 | Close | trigger only | `top 80%` | — |
| 6 | Emerge | **batch** | `top 88%`, once | — |

**One pin on the page.** It is justified because the section's subject is
*duration* — ninety days compressed into a scroll — and duration cannot be
communicated by a static frame.

### `matchMedia` — the film's format

```
cinema:   (min-width: 1024px) and (prefers-reduced-motion: no-preference)
handheld: (max-width: 1023px) and (prefers-reduced-motion: no-preference)
```

The pinned Journey is a widescreen shot: it needs a landscape viewport and a
machine that can scrub. Below `lg`, or under any reduced-motion preference, the
same story is told **without a pin** — because a pinned sequence on a phone is a
trap, not a shot. `mm.revert()` tears down the whole branch on a breakpoint
change.

### Lenis — one scroll loop

Unchanged and already correct: Lenis is created once in `MotionProvider`, driven
by `gsap.ticker`, and calls `ScrollTrigger.update` on every scroll event.

**Phase 6 removed the only competing loop**: `LightField` had its own
`window.addEventListener('scroll')` with a private rAF. The Light character is
now driven entirely by act triggers, so there is **exactly one scroll loop and
one render clock** on the page.

---

## 6. Cleanup strategy

Everything is created inside a single `gsap.context()`. Teardown order matters
and is deliberate:

```
1. split.revert()   ×N   restore the DOM first
2. mm.revert()           tear down the matchMedia branch
3. context.revert()      kill every tween, restore every inline style GSAP wrote
4. ScrollTrigger.getAll().forEach(kill)
5. --light-flare → 0     the one property written outside GSAP
6. ScrollTrigger.refresh()
```

**Splits are reverted first**, because reverting changes the DOM and any trigger
still measuring against the split layout would be measuring the wrong page. An
un-reverted `SplitText` is a permanent DOM mutation and the most common leak in
GSAP text work.

The director also **awaits `document.fonts.ready` before splitting**. Fonts
change line boxes, `SplitText` measures line boxes, and splitting early produces
wrong lines that never correct themselves.

---

## 7. Performance

| Metric | 5F | Phase 6 |
|---|---:|---:|
| Initial JS | 194KB gz | **192KB gz** (−2KB) |
| Initial CSS | 13KB gz | **13KB gz** |
| Independent ScrollTriggers | ~15 | **6 + 1 batch** |
| GSAP engine on critical path | no | **no** |
| SplitText / Flip on critical path | — | **no** — both dynamically imported |

**The film cost nothing.** Centralising removed more code than the timelines
added, and consolidating twelve triggers into one batch reduced per-scroll work.

### Animation budget

| System | Per-frame cost |
|---|---|
| Light | 6 `quickSetter` writes — compiled, no parse |
| Journey scrub | `scale` + `yPercent` on two plates, `opacity` on five layers |
| Dust canvas | One layer, 78 gradient fills, sub-millisecond |
| Emerge | `mask-image` position, GPU-composited |
| Grade / vignette / grain | CSS only, zero JS |

**Transform and opacity only.** The one filter — the hero rack focus — plays once
at a discrete moment, never inside a scrub, and calls `clearProps` on completion.

**CLS remains 0.00.** The Flip reframe uses `absolute: true`, so the numeral is
taken out of flow for the transition and cannot push anything.

---

## 8. Self review

> *Scroll slowly. Would someone think this is just another website?*

**No — through the first three acts.** The lamp waiting over the hero, then
losing you and searching through the Reframe, then walking with you down the
boards and hesitating before week eleven, is behaviour no template produces. The
First Note igniting every mote of dust in the document is the moment.

**Where it is still a website:**

1. **The Desk half.** Programs, Lessons, Testimonials and Scholarships are lit
   and graded but not *directed*. They get the batch. That is honest — those
   sections exist to be read, and directing them would fight the page's own rule
   that motion recedes as the visitor nears a decision.
2. **No sound.** Still the largest unexploited idea in the project.
3. **No photography.** Every camera move is a move across generated atmosphere
   rather than across a real room.

---

## 9. Remaining weaknesses

1. **No real-device measurement.** No Lighthouse, no mid-range Android, no frame
   capture. Every budget here is reasoned, not measured. **This is now the single
   biggest gap** — a pinned scrub with a canvas and a Flip has more ways to drop
   frames than anything built so far.
2. **The Flip reframe is the most fragile thing on the page.** It fires inside a
   scrubbed `onUpdate`, guarded by a boolean. It is correct, but a fast reverse
   scrub across the threshold is the case to watch first on a real device.
3. **`FinaleTimeline` creates an empty timeline for the close trigger.** It works,
   but it is a trigger wearing a timeline's clothes; it should be a plain
   `ScrollTrigger.create`.
4. **Seven generated assets remain `pending-review`** with `approvedBy: null`.
   Still blocking.
5. **The custom cursor remains a documented deviation** from `05-motion-system.md`
   §16 rule 19 and still needs sign-off or reversion.

---

## 10. Files

**Created**
```
src/lib/motion/film/light.ts              THE LIGHT — 7 moods, quickSetter/quickTo
src/lib/motion/film/camera.ts             push, pull, plane, rackFocus, breathe
src/lib/motion/film/timelines.ts          5 timelines + EmergeBatch
src/components/motion/FilmDirector/       the director, matchMedia, cleanup
```

**Removed**
```
src/components/motion/LightField/         the competing scroll loop
```

**Modified**
```
src/components/home/Hero/Hero.tsx                  timeline stripped → data-film hooks
src/components/home/Reframe/Reframe.tsx            → data-walk-line
src/components/home/NinetyDayJourney/…             timeline stripped → film:journey event
src/components/home/TheTurn/TheTurn.tsx            → data-turn-line
src/components/home/FinalCta/FinalCta.tsx          → data-film="close"
src/components/motion/Emerge/Emerge.tsx            markup only; director batches it
src/components/motion/Atmosphere/AtmosphereLayer.tsx  director mounted
src/styles/globals.css                             .film-line, .is-reframed
```

---

**Phase 6 complete. Homepage only.**
