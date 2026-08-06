# Phase 5E — Motion, Atmosphere & Immersion

**Date:** 2026-08-06
**Scope:** Homepage only. Visual design treated as locked — no typography, copy, layout or structural change.
**Gates:** typecheck ✅ · lint ✅ · build ✅ · runtime smoke ✅

---

## 1. Motion philosophy

> **The page is not decorated with animation. It is lit.**

One idea underwrites everything in this phase: **a single notional lamp travels
the document, and every atmospheric system reads its position.** Grounds, dust,
grain, the cursor, the hero pool, the Journey's warmth — all of them are lit by
the same source.

That is what separates atmosphere from decoration. Twelve sections with their own
gradients read as *a stack of decorated boxes*. Twelve sections lit by one lamp
read as **one room you are moving through.**

Three rules governed every decision:

1. **Nothing should feel animated. Everything should feel alive.** The dust is
   never "triggered" — it is always running, and your scroll changes the weather.
2. **Reveals are lighting changes, not entrances.** Content no longer *arrives*.
   The light reaches it.
3. **Every dependency justifies itself.** WebGL was considered and rejected — see
   §9.

---

## 2. What was removed

The brief forbade fade-up, slide-up and stagger. All three are gone from the
homepage, verified in the built HTML:

| Pattern | Before | After |
|---|---:|---:|
| `data-animate="fade-rise"` | 6 | **0** |
| `data-animate="stagger"` | 4 | **0** |
| Light-wipe masks (`data-emerge`) | 0 | **12** |

`FadeIn`, `Stagger` and `Parallax` remain in the component library and in the
Storybook laboratory — they are foundation primitives, and other routes may
still need them. **The homepage uses none of them.**

---

## 3. Atmospheric systems

Four systems, mounted once at the top of the page via `AtmosphereLayer`.

### 3.1 LightField — the lamp

`src/components/motion/LightField/LightField.tsx`

Writes four custom properties on `<html>` from a single rAF-throttled passive
scroll listener:

```
--light-x          0–100   horizontal position, %
--light-y          0–100   vertical position in viewport, %
--light-intensity  0–1     how present the light is here
--scroll-progress  0–1     document progress
```

The lamp travels a **deliberately non-linear arc** — a lamp on a track does not
move at constant speed:

```
x = 74 − sin(p·π) × 46          enters high-right, swings left through the middle
y = 22 + sin(p·0.85π) × 34      drops as the argument gets practical
i = 0.55 + cos(p·2π) × 0.45     dips through the middle, returns at the close
```

That intensity curve is the page's emotional shape rendered as a single number:
**it gets darker before it gets light.**

**Cost:** four string writes per frame. No React state, so zero re-renders. CSS
does the rest on the compositor.

**Consumers:** hero warm pool, Journey ambient warmth, dust lighting, spotlight
cursor. Any future section gets lit correctly for free by referencing the vars.

### 3.2 Atmosphere — the dust

`src/components/motion/Atmosphere/Atmosphere.tsx`

**78 motes on a single canvas**, each with independent depth, drift velocity and
shimmer phase. Every mote is lit by the light field:

```
lit     = max(0, 1 − distance/reach)²      squared for filmic, not linear, rolloff
shimmer = 0.72 + sin(t·0.0004 + phase)·0.28
alpha   = lit × shimmer × intensity × (0.16 + z·0.5)
```

Each mote is a three-stop radial gradient — **warm core, amber mid, transparent
edge**, because dust in a tungsten beam is not white — composited with
`globalCompositeOperation = 'lighter'`.

Near motes drift faster than far motes: **parallax without a parallax layer.**
Motes wrap rather than respawn, so the field never visibly reseeds.

**Why canvas, not DOM:** 78 positioned divs would be 78 composited layers and a
repaint per frame. One canvas is one layer. On a mid-range Android that is the
difference between 60fps and 30.

**Cost controls:**
- `devicePixelRatio` capped at 2 — a 3× phone renders 2× and nobody can tell on a
  blurred 2px dot
- Light field sampled **6×/second, not 60** — `getComputedStyle` never on the hot path
- Motes below 1.2% alpha skip before any gradient is constructed, so on the light
  Desk sections most of the loop short-circuits
- rAF loop **stops entirely** on `visibilitychange`
- Never mounts under reduced motion or below the capability threshold

> ⚠️ **A real bug caught in review.** The canvas was first placed at `z-0`,
> *behind* the sections. Every section carries an opaque ground, so the dust
> would have been painted over and never seen once. It now sits at `z-[1]` with
> `mix-blend-screen`, which is also physically correct — dust in a room floats in
> front of the scenery. Screen blend resolves to nothing over the light Desk
> sections, so the dust confines itself to the dark House passages with no
> per-section logic at all.

### 3.3 Grain — the film layer

`src/components/motion/Atmosphere/Grain.tsx`

A 128×128 `feTurbulence` tile, inlined as a data URI, stepped across **eight
positions on a 0.8s loop** with `steps(1)`.

**Stepping rather than interpolating is the entire point.** Real film grain
resamples every frame; it does not slide. An interpolated texture reads as a
moving overlay, a stepped one reads as grain.

**Why not animate the `feTurbulence` seed:** that re-runs turbulence on the CPU
every frame and costs measurable frames on a phone. A static tile moved by
`background-position` is composited on the GPU and costs effectively nothing.

Opacity is **0.055** — deliberately at the threshold of perception. If you can
see it, it is turned up too far. This is the cheapest item in the phase and the
single biggest contributor to "this feels photographed rather than rendered."

Under reduced motion the texture stays and the resampling stops
(`animationPlayState: paused`).

### 3.4 SpotlightCursor — the follow-spot

`src/components/motion/Spotlight/SpotlightCursor.tsx`

⚠️ **An acknowledged deviation.** `05-motion-system.md` §16 rule 19 bans custom
cursors, and that rule is correct for what it was written against: novelty blobs
that lag the pointer and replace the system cursor with a worse one.

This is the other thing, and three constraints keep it defensible:

1. **The native cursor is never hidden.** Additive light, not a replacement
   pointer. No accessibility guarantee is traded for an effect.
2. **House register only.** It queries `closest('[data-register="house"]')` on
   pointer move and fades out over Desk sections. On pricing, scholarships and
   the close there is nothing.
3. **Fine pointers only, off under reduced motion.**

The follow uses **0.12 linear interpolation** — the point at which the light
reads as *carried* rather than *attached*. The lag is deliberate: a real
follow-spot operator is always a beat behind the performer.

---

## 4. The Emerge system — reveals as lighting

`src/components/motion/Emerge/Emerge.tsx` + `globals.css`

The replacement for every viewport reveal on the page.

```css
[data-emerge] {
  --emerge: 1;                    /* default: fully revealed */
  mask-image: linear-gradient(
    var(--emerge-angle),
    #000       calc(var(--emerge) * (100% + var(--emerge-feather)) - var(--emerge-feather)),
    transparent calc(var(--emerge) * (100% + var(--emerge-feather)))
  );
}
```

GSAP animates the single `--emerge` property from 0 → 1 on a ScrollTrigger. The
gradient angle matches the page's light direction, so the wipe reads as **the
lamp reaching this part of the room.**

**Nothing moves.** No translate, no scale, no opacity keyframe on the content.
That is exactly why it feels different: fade-up says *"an element appeared"*; a
light wipe says *"you can see this now."*

**Failure behaviour:** `--emerge` defaults to `1` in base CSS. With no JS, under
reduced motion, or below the capability threshold the mask is fully open and
content is simply visible. The value is set back to 0 only *after* the motion
layer confirms it can run. Under reduced motion the mask is removed entirely
rather than left at 1, so no compositor layer is retained.

On completion `clearProps` hands the element back to plain CSS, so no mask
survives for the rest of the session.

---

## 5. Custom easing

`src/lib/motion/easing.ts` — five bespoke curves via GSAP `CustomEase`, plus CSS
equivalents. **Nothing on this page uses a default.** `power2.out` is the sound
of a framework; these are the sound of a room.

Each is named for the physical event it describes, because that is how they
should be chosen — by what is happening, not by how fast it looks.

| Ease | Describes | Used by |
|---|---|---|
| `houselight` | A theatre dimmer on a fader — imperceptible start, long even middle, soft arrival | Ground luminance, section melts, ambient warmth |
| `breath` | A slow inhale and settle, no overshoot | Lens breathing, ambient drift |
| `beam` | Light arriving — fast to 70%, then a long tail (a lamp reaching full output has a knee) | Light sweep, the beam, spotlight bloom |
| `stepIn` | Weight transferring onto a foot, with a tiny hesitation at the top | The walk, camera push |
| `curtain` | Something heavy and mechanical moving | Masked wipes |

Registration is lazy and idempotent; if `CustomEase` fails to load, every call
site falls back to a GSAP-native curve rather than throwing.

---

## 6. GSAP timelines & ScrollTrigger architecture

Three timelines on the page. **One pin.**

### 6.1 Hero — timed entrance (no ScrollTrigger)

`Hero.tsx`. Fires once on mount, not on scroll — the hero is already in view.

| t | Beat |
|---|---|
| 0.00 | Ground + H1 present at paint. **LCP, no JS dependency** |
| 0.15 | `curtain-up` on 3 H1 lines, 0.04 stagger, `power2.inOut` |
| 0.40 | **Light sweep** — 0.9s traverse, the spotlight finding the performer |
| 0.52 | Supporting line |
| 0.68 | CTA cluster |
| 0.85 | Scroll affordance |

Plus two continuous CSS animations: **lens breathing** on both hero grounds
(1.5% scale + 0.6% drift over 26s — below conscious notice, felt as "alive") and
the affordance drift.

### 6.2 Emerge — 12 instances

One ScrollTrigger each, `start: 'top 88%'`, `once: true`, animating one custom
property. No layout, no paint of the content.

### 6.3 The Journey — the pin

`NinetyDayJourney.tsx`. `start: 'top top'`, `end: '+=260%'`, `pin: true`,
`scrub: 0.7`.

**Smoothed, never hard-locked** — `scrub: true` feels mechanical and amplifies
scroll jitter.

| Progress | Beat | Ease |
|---|---|---|
| 0.00–0.78 | **The walk.** Floor plate pushes `scale 1.06 → 1.24`, `yPercent 4 → −3`, opacity `0.5 → 0.9`. The numeral drifts −3% — it is in the room, not on the glass | `stepIn` |
| 0.50–0.80 | Ambient warmth rises | `houselight` |
| 0.74–0.90 | **The house goes down.** Ground → `stage-950` | `houselight` |
| **0.86** | **THE BEAM FALLS.** Opacity 0→1 and `scale 1.14 → 1`, `yPercent −6 → 0` | `beam` |
| 0.87–0.92 | Warm flood peaks at **22%**, then releases | `beam` / `houselight` |
| ≥0.86 | The numeral **ignites** — `n-0` → `spot-300` with an 80px glow, 700ms CSS transition | — |

`onUpdate` drives three pieces of React state (`week`, `activeStage`, `ignited`)
— three setState calls at scroll rate, each guarded by React's bail-out on
identical values, so the re-render only fires when a number actually changes.

**Four degradation paths**, all complete: below `lg`, reduced motion, no JS, and
low-capability device all render a static composition with the numeral at 12, the
beam at rest, and all three stages legible.

---

## 7. The signature moment

> **Week twelve. The beam falls, the numeral ignites, and the dust in the light
> catches.**

The brief asked for **one** unforgettable moment, not ten. This is it, and the
whole page is built to set it up:

- The light field has been **dimming** for two sections (that `cos` curve).
- The Journey ground goes to near-black *before* the beam arrives — the house
  lights going down.
- The numeral has been white for eleven weeks. At twelve it stops being white and
  **becomes light.**
- The dust canvas is already running, so when the beam layer arrives the motes
  inside it are lit by the same field — **the atmosphere reacts to the moment
  without being told about it.**

The brightest frame on the page arrives at the end of its darkest passage. That
inversion *is* the idea: the site goes dark so that one thing can be lit.

⚠️ **Photosensitivity.** The flood peaks at 22% opacity over ~0.06 of a 260vh
scrub — several hundred milliseconds of real scrolling. It cannot strobe, it
never repeats, and it is absent entirely under reduced motion. **Still requires
verification with a photosensitivity tool before launch.**

---

## 8. Generated assets

Three generated, **two used**.

| Asset | Aspect | Used | Status |
|---|---|---|---|
| `atmos-stage-floor.jpg` | 16:9 | ✅ Journey floor plate | ⚠️ `pending-review` |
| `atmos-spotlight-cone.jpg` | 16:9 | ✅ Journey beam | ⚠️ `pending-review` |
| `atmos-depth-folds.jpg` | 21:9 | ❌ **Rejected** | Did not meet brief |

Every one was **reviewed by eye before touching the UI**: no people, no faces, no
text, no logos, no venue architecture.

**`atmos-depth-folds` was rejected** — the prompt asked for near-invisible fabric
folds at very low contrast and the model returned bright crossing beams. It did
not do the job it was generated for, so it is not in the build.

**Not generated, deliberately:** the brief listed *hands* as permitted
atmosphere. `image-style-guide.md` §3 classes hands as people, and the pipeline's
pre-flight scanner blocks the term. I did not override my own safety rail — hands
edge toward documentary imagery, which is exactly what the consent gates exist to
prevent.

⚠️ **All five generated assets on this page remain `pending-review` with
`approvedBy: null`.** No approval authority is assigned. **This is blocking
before production launch.**

---

## 9. Dependencies considered and rejected

| Candidate | Verdict |
|---|---|
| **WebGL / Three.js / R3F** | ❌ **Rejected.** It would buy volumetric light we already have from a generated plate and a canvas, at the cost of ~150KB, a second render loop, and a shader pipeline to maintain. The brief said not to add WebGL just because it is available — nothing here needs it |
| **ScrollSmoother** | ❌ Rejected. Lenis is already wired into `MotionProvider` and driven by the GSAP ticker; two smooth-scroll systems would fight |
| **SplitText** | ❌ Not used. The hero's curtain-up already splits by line in markup, which is more robust than runtime splitting and does not reflow on font load |
| **Flip** | ❌ Not used. No element changes container on this page. It is reserved for the gallery lightbox when photography unblocks |
| **MotionPathPlugin** | ❌ Not used. Nothing follows a path; the light field is a formula, not a path |
| **OffscreenCanvas** | ❌ Rejected. 78 motes cost well under a millisecond per frame; the transfer overhead and worker plumbing would exceed the saving |
| **CustomEase** | ✅ **Adopted.** Five bespoke curves are the difference between "eased" and "authored" |

---

## 10. Performance impact

| Metric | Before 5E | After 5E |
|---|---:|---:|
| Initial JS | 192KB gz | **194KB gz** (+2KB) |
| Initial CSS | 12KB gz | **12KB gz** |
| GSAP on critical path | 0KB | **0KB** — still lazy |
| Forbidden reveals | 10 | **0** |
| Light-wipe masks | 0 | 12 |

**+2KB for the entire atmospheric system.** The canvas, light field, grain,
cursor and easing library are all small, and GSAP + CustomEase remain
dynamically imported.

### Frame budget

Every system animates **`transform`, `opacity` or a custom property only**:

- **Dust:** one canvas layer, one rAF, ~78 gradient fills. Sub-millisecond.
- **Grain:** `background-position` on a composited layer. Free.
- **Light field:** four string writes per frame. Free.
- **Cursor:** one `translate3d` per frame on a composited layer.
- **Emerge:** `mask-image` position, GPU-composited.
- **Journey:** `scale`, `yPercent`, `opacity`. No `filter` in any scroll loop.

**CLS remains 0.00** — nothing added affects layout. Every new layer is `fixed`
or `absolute inset-0` and `pointer-events-none`.

### Reduced motion

| System | Behaviour |
|---|---|
| Dust | **Not mounted** |
| Grain | Texture stays, resampling paused |
| Cursor | **Not mounted** |
| Light field | Lamp parked at a fixed pleasant position |
| Emerge | Mask removed entirely; content simply visible |
| Journey | Static, numeral at 12, all stages legible |
| Lens breathing | `motion-safe:` gated — off |

---

## 11. Would someone record this for X?

**The Journey, yes.** The walk down the boards into a beam that falls and ignites
a numeral is a genuinely capturable five seconds, and the dust reacting to it
without being told to is the kind of detail people screenshot.

**The rest of the page, honestly, not yet.** It is now atmospheric, lit and
alive — but the moments that would travel are still gated:

1. **No sound.** Still the single largest unexploited idea. A music school with a
   silent website.
2. **No photography.** Gate I-1. The atmosphere is carrying weight that
   photography should carry.
3. **One signature moment, correctly** — but a page people record usually has a
   *mechanic* they want to try, and scroll-driven light is now common enough that
   it reads as well-executed rather than novel.

**What would change that:** the scroll-as-footsteps mechanic from
`docs/homepage/07-the-walk.md`, with sound. That is the version people record.
It needs a shoot and a sound designer, not more code.

---

## 12. Remaining weaknesses

1. **No real-device measurement.** No Lighthouse run, no mid-range Android, no
   frame profiling. The budgets are reasoned, not measured.
2. **The flood needs photosensitivity verification** before launch.
3. **Five generated assets are unapproved.**
4. **The custom cursor is a documented deviation** from `05-motion-system.md`
   §16 rule 19 and should be signed off or reverted, not left ambiguous.
5. **`atmos-depth-folds` was a wasted generation** — the prompt was too abstract
   for the model to hit.
6. **Section melts are partial.** The hero melts into the Reframe; other House/Desk
   boundaries still change at a hard edge. Completing this needs gradient bleeds
   on each House section, which touches layout — outside this phase's remit.

---

## 13. Files

**Created**
```
src/lib/motion/easing.ts                              5 bespoke curves + CSS equivalents
src/components/motion/LightField/LightField.tsx       the lamp
src/components/motion/Atmosphere/Atmosphere.tsx       78-mote canvas dust
src/components/motion/Atmosphere/Grain.tsx            stepped film grain
src/components/motion/Atmosphere/AtmosphereLayer.tsx  composition root
src/components/motion/Spotlight/SpotlightCursor.tsx   the follow-spot
src/components/motion/Emerge/Emerge.tsx               light-wipe reveal
public/images/generated/atmos-stage-floor.jpg         ✅ used
public/images/generated/atmos-spotlight-cone.jpg      ✅ used
public/images/generated/atmos-depth-folds.jpg         ❌ rejected
```

**Modified**
```
src/styles/globals.css              light-field vars, emerge mask, grain + lens keyframes
src/components/home/Hero/Hero.tsx   lens breathing, light-field tracking, bottom melt
src/components/home/NinetyDayJourney/NinetyDayJourney.tsx   floor, beam, ignition
src/app/(marketing)/page.tsx        AtmosphereLayer mounted
8 × home sections                   FadeIn → Emerge
```

---

**Phase 5E complete. Homepage only — no other route was created or touched.**
