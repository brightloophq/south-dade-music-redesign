# Phase 5F — Cinematic Art Direction

**Date:** 2026-08-06
**Scope:** Visual atmosphere only. No layout, copy, navigation or section change.
**Gates:** typecheck ✅ · lint ✅ · build ✅ · runtime smoke ✅

---

## 1. Lighting philosophy

> **A dark section is a field of colour. A room is a place where light comes from somewhere, lands on something, and bounces back.**

Phase 5E gave the page one moving light source. This phase gave that light
**physical consequences**: a colour temperature, a bounce, a frame, and a
surface for it to fall on.

Four principles governed every decision:

**1. Light must come from somewhere and go somewhere.**
Before this phase, House sections were dark gradients — light with no source and
no destination. Now every one has a *reflected floor bounce* rising off its lower
edge, because a real stage throws light back off its boards. Its absence is
precisely why CSS "dark sections" read as fields of colour rather than as rooms.

**2. The page has a time of day.**
A single soft-light wash carries the act's colour temperature over everything, so
the page evolves through five graded states without one section being recoloured.

**3. Every frame has an edge.**
Cinema vignettes. Web pages do not. The vignette here *closes in during the dark
acts and opens through the ivory middle* — the frame tightens when the story
tightens.

**4. Nothing terminates at a rectangle.**
Every atmospheric plate carries a radial mask falloff so it dissolves rather than
stopping. A hard image edge is the single loudest "this is a web page" signal.

---

## 2. Colour evolution

Five stops, interpolated with **smoothstep** so acts ease into one another rather
than cross-fading linearly.

| Progress | Stop | RGB | Warmth | Vignette | Under which act |
|---:|---|---|---:|---:|---|
| 0.00 | **deep charcoal** | `20 20 26` | 0.08 | 0.62 | Hero — the house before the show |
| 0.26 | **warm amber** | `245 165 36` | 0.72 | 0.48 | Reframe → Journey — the light finding you |
| 0.52 | **soft ivory** | `250 246 238` | 0.34 | **0.16** | Twelve Weeks → Lessons — the reading sections |
| 0.78 | **golden stage light** | `255 193 92` | 0.88 | 0.40 | Performances → Testimonials — the proof |
| 1.00 | **quiet dark** | `10 12 18` | 0.10 | 0.66 | The Turn → close |

**The vignette curve is the emotional shape.** It is tightest at the beginning
and end (0.62 / 0.66) and almost absent through the ivory middle (0.16) — so the
frame physically opens when the parent is doing arithmetic and closes when they
are being moved.

### How it is applied

A single fixed `mix-blend-soft-light` layer carrying `rgb(var(--atmos-tint))`,
at `0.10 + warmth × 0.14` opacity.

`soft-light` is the correct blend and the choice matters: it lifts and warms
without crushing blacks or washing whites, so **body copy on the Desk sections
keeps its 17:1 contrast** while still sitting in the same light as everything
else. `overlay` or `multiply` would have tinted the reading sections and cost
accessibility for atmosphere — an unacceptable trade on a page serving Unique
Abilities families.

---

## 3. Atmospheric assets

Four generated this phase. **Three used, one rejected.** Every one was reviewed by
eye before touching the UI: no people, no faces, no text, no logos, no venue
architecture.

### 3.1 `atmos-paper-tooth.jpg` — ✅ used · 1:1 · 2K

> An extremely subtle warm paper texture. Uncoated cream stock (#FAF6EE) seen flat
> and straight on, with a fine irregular fibre tooth and almost imperceptible tonal
> drift across the sheet. No pattern, no grid, no fold, no shadow, no edges — an
> infinite continuous surface. Absolutely no people, no words, no logos.

**Where:** multiplied into every `[data-register="desk"]` ground at 760px.

**Why it matters most of the four.** The Desk sections were flat `#FAF9F7` —
clean, and completely untactile. This is the trick a printed programme uses, and
the reason good stock feels expensive in the hand. Applied as a second background
layer with `background-blend-mode: multiply` rather than a pseudo-element, so it
cannot disturb stacking or hit-testing anywhere on the page.

### 3.2 `atmos-warm-bloom.jpg` — ✅ used · 16:9 · 2K

> A soft golden light bloom on pure black. One warm amber source (#FFD68A) glowing
> out of the centre-right, its halo falling away smoothly and evenly to complete
> black at every edge. No visible beam, no shafts, no rays — only the bloom itself,
> like a lamp seen through fog.

**Where:** the First Note. It arrives at progress 0.875, a beat *after* the beam.

**Why:** the beam is the shaft; the bloom is the source. Separating them by a few
frames makes the light read as **travelling** rather than switching on.

### 3.3 `atmos-curtain-shadow.jpg` — ✅ used · 21:9 · 2K

> Heavy dark theatre curtain fabric, photographed in near-darkness. Deep vertical
> folds in almost-black blue-charcoal (#0A0D14), extremely low contrast, with only
> the faintest warm rim catching two fold edges at the far left. Ninety percent of
> the frame is pure shadow with no detail.

**Where:** behind The Turn, at **16% opacity**.

⚠️ **Held deliberately low.** `final-art-direction.md` §15 names curtain texture
as the fastest route to dinner-theatre, and it is right. At 16% the vertical folds
read as depth behind the words and nobody consciously identifies them as fabric.
The model returned it brighter than the prompt asked; the opacity is doing the
work the prompt didn't.

### 3.4 `atmos-depth-folds.jpg` — ❌ **rejected**

Generated in Phase 5E. Asked for near-invisible fabric at very low contrast;
returned bright crossing beams. **It did not do the job it was generated for, so
it is not in the build.** `atmos-curtain-shadow` is the successful retry with a
far more explicit darkness instruction.

### Not generated, deliberately

The brief listed **hands** as permitted atmosphere. `image-style-guide.md` §3
classes hands as people and the pipeline's pre-flight scanner blocks the term.
I did not override my own safety rail: hands edge toward documentary imagery,
which is exactly what the consent gates exist to prevent.

---

## 4. Image treatment — the `plate` grade

Every atmospheric image now carries one utility:

```css
@utility plate {
  filter: contrast(0.92) saturate(0.94) brightness(1.02);
  mask-image: radial-gradient(120% 100% at 50% 50%, #000 55%, transparent 100%);
}
```

| Decision | Reasoning |
|---|---|
| `contrast(0.92)` | Pulls blacks open. Raw generated plates clip to pure black at the edges, which reads as a cutout. Lifting them keeps shadow detail and lets layers sit *in* one another rather than on top |
| `saturate(0.94)` | Amber turns orange under blend modes. Easing saturation keeps `spot-500` reading as stage light rather than as a filter |
| `brightness(1.02)` | Compensates for the contrast reduction so the plate does not go muddy |
| Radial mask falloff | **The most important line.** No plate terminates at a rectangle; each dissolves into the ground. This alone removes most of the stock-photo feel |

A static filter rasterises once and costs nothing. **No filter is animated in any
scroll loop** — that remains prohibited.

---

## 5. Lighting layers, added this phase

| Layer | Implementation | Why |
|---|---|---|
| **Reflected floor light** | `section[data-register='house']::after` — a warm gradient rising 34% off the lower edge, its strength tied to `--atmos-warmth` | Real stages bounce light off boards. Its absence is why flat dark gradients read as colour fields |
| **Vignette** | Fixed radial, two stops, opacity from `--vignette` | A single-stop vignette reads as a photo filter; a double falloff reads as a lens |
| **Tint wash** | Fixed `soft-light`, `rgb(var(--atmos-tint))` | The act's colour temperature over everything |
| **Journey floor bounce** | Local amber gradient off the boards, ignites with the beam | The beam bouncing back at the moment it lands |
| **Curtain depth** | 16% plate behind The Turn | Depth behind the page's one shout |
| **Paper tooth** | Multiplied into Desk grounds | Tactility |

⚠️ **A bug caught in review.** The floor-bounce rule was first written as
`[data-register='house']::after`, which also matched the **header** (it adopts the
House register while floating over the hero) and the mobile drawer. A warm smear
across the navigation. Now scoped to `section[data-register='house']` — neither a
header nor a drawer is a room with a floor.

---

## 6. The signature moment, reviewed and rebuilt

The brief asked whether the First Note is unforgettable. **It was good and not
unforgettable**, for one specific reason: it was *local*. A beam fell in one
section while the rest of the page carried on as if nothing had happened.

### What changed

The Journey now writes a **page-wide custom property** during the moment:

```
--light-flare   0 → 1 over progress 0.86–0.92, then released
```

The dust canvas — which knows nothing about the Journey, has never heard of week
twelve, and has no reference to that section — **reads `--light-flare` and
blooms**:

| Property | Effect at full flare |
|---|---|
| Lamp reach | `× 1.5` — the light's influence spreads across the whole viewport |
| Mote alpha | `× 3.6` |
| Mote radius | `× 2.2` — motes physically bloom, not just brighten |
| Sample rate | 6 Hz → **every frame**, because stepping the surge would stutter the most important moment |

So at the instant the beam lands, **every mote of dust on screen catches it.**

### The full sequence

| Progress | Beat |
|---:|---|
| 0.00–0.78 | The camera pushes along the boards. Twelve weeks pass under your thumb |
| 0.50–0.80 | The light warms |
| **0.74** | **The house goes down.** Ground → `stage-950` |
| **0.86** | **The beam falls.** `scale 1.14 → 1`, dropping into frame |
| 0.86–0.92 | **The flare surges.** The entire page's atmosphere ignites |
| 0.87 | Warm flood, peaking at 22% |
| 0.875 | **The bloom arrives** — the source, a beat behind the shaft |
| 0.88 | Reflected floor light — the beam bouncing off the boards |
| ≥0.86 | **The numeral stops being white and becomes light** — `spot-300`, 80px glow |

**One local moment; the whole room responds.** That is the difference between an
effect and a moment.

⚠️ **Photosensitivity.** The flood peaks at 22% across ~0.06 of a 260vh scrub —
several hundred milliseconds of real scrolling. It cannot strobe, never repeats,
and is absent under reduced motion. **Still requires verification with a
photosensitivity tool before launch.**

---

## 7. Transitions between acts

Light is now the connecting language:

- **The tint wash is continuous.** It does not reset at section boundaries, so
  two adjacent sections are always the same temperature. This is the single
  biggest contributor to continuity, and it required no per-section work.
- **The hero melts** into the Reframe with a gradient bleed at its base.
- **The vignette is document-wide**, so the frame never resets.
- **A `melt-b` utility** now exists for gradient bleeds at section feet.

⚠️ **Partial, honestly.** `melt-b` is available but is only applied to the hero.
Applying it to every House/Desk boundary means adding a wrapper or a positioned
child to each section — a structural change, and this phase was scoped to
atmosphere only. The tint and vignette carry most of the continuity; the
remaining hard edges are at the Journey→TwelveWeeks and Performances→Testimonials
boundaries.

---

## 8. Performance

| Metric | 5E | 5F |
|---|---:|---:|
| Initial JS | 194KB gz | **194KB gz** — unchanged |
| Initial CSS | 12KB gz | **13KB gz** (+1KB) |
| GSAP on critical path | 0KB | **0KB** |
| Atmospheric plates | 2 | **4, all `loading="lazy"`** |

**+1KB of CSS for the entire art direction.** Every layer is a CSS custom
property, a gradient, or a blend mode — no new JavaScript at all.

| System | Cost |
|---|---|
| Tint wash | One composited layer, `background-color` transition |
| Vignette | One composited layer, `opacity` from a var |
| Floor bounce | A gradient on an existing pseudo-element. Free |
| Paper tooth | A second background layer, rasterised once |
| `plate` grade | Static filter + mask, rasterised once |
| Flare | Two `setProperty` calls per frame during ~0.06 of one scrub |

**All four atmospheric plates are `loading="lazy"`** and none is the LCP element —
that remains the H1, a text node at first paint. CLS is unchanged at 0.00: every
layer added is `fixed` or `absolute inset-0` and `pointer-events-none`.

### Reduced motion

| Layer | Behaviour |
|---|---|
| Tint wash | Present, parked at the ivory stop, 6% |
| Vignette | Present, fixed 0.22 |
| Floor bounce | Present — it is lighting, not motion |
| Paper tooth | Present |
| Plates | Present, static |
| Flare | Never fires |
| Dust | Not mounted |

**Reduced motion still gets the art direction.** Only the movement is removed —
which is the correct reading of the preference, and the version of this page a
reduced-motion visitor sees is a graded, vignetted, tactile still frame rather
than a stripped one.

---

## 9. Remaining artistic improvements

1. **Section melts are incomplete.** Two hard boundaries remain. Needs a
   structural wrapper — outside this phase's remit.
2. **The paper tooth tiles at 760px.** The plate has a diagonal tonal drift, so at
   very close inspection on a tall viewport the repeat is findable. A seamless
   tile or a larger generation would fix it.
3. **No practical lighting fixtures.** The brief mentioned practical stage
   lighting; everything here is ambient and volumetric. Actual practicals — a
   visible lamp, a rim on a physical object — need photography.
4. **The curtain is a compromise.** The model returned it brighter than briefed
   and opacity is doing the work. A regeneration with an explicit exposure
   instruction would be better than 16% on a too-bright plate.
5. **No colour grading on the hero plates.** The two hero grounds predate the
   `plate` utility and are still ungraded, to avoid touching the LCP path. They
   should be graded once measured.
6. **Still no photography and still no sound.** Every atmospheric decision here is
   compensating for their absence, and doing it well. Neither is a code problem.

---

## 10. Files

**Generated**
```
public/images/generated/atmos-paper-tooth.jpg       ✅ Desk tactility
public/images/generated/atmos-warm-bloom.jpg        ✅ First Note source
public/images/generated/atmos-curtain-shadow.jpg    ✅ depth behind The Turn
public/images/generated/atmos-depth-folds.jpg       ❌ rejected (5E)
```

**Created**
```
src/components/motion/Atmosphere/Grade.tsx          tint wash + vignette
```

**Modified**
```
src/components/motion/LightField/LightField.tsx     5-stop colour ramp, smoothstep, vignette curve
src/components/motion/Atmosphere/Atmosphere.tsx     flare response
src/components/motion/Atmosphere/AtmosphereLayer.tsx  Grade mounted
src/components/home/NinetyDayJourney/...            bloom, floor bounce, page-wide flare, plate grading
src/components/home/TheTurn/TheTurn.tsx             curtain depth
src/styles/globals.css                              grade vars, paper tooth, floor bounce, plate, melt-b
```

⚠️ **All seven generated assets on this page remain `pending-review` with
`approvedBy: null`.** No approval authority is assigned. **Blocking before
production launch.**

---

**Phase 5F complete. Homepage only — no other route created or touched.**
