# Motion Runtime Diagnosis

**Date:** 2026-08-06
**Trigger:** Live preview showed effectively no motion, while three consecutive phases reported working GSAP timelines, dust, light fields and cinematic transitions.
**Method:** Real headless Chrome driving `http://localhost:3000`, not source inspection.

---

## 0. The meta-failure

Phases 5E, 5F and 6 each declared success on the strength of **typecheck, lint and
production build passing**. All three passed. None of them proved a single
ScrollTrigger was ever created in a browser.

Every defect below is invisible to static analysis. Two of them produce **no error
at all** — GSAP silently drops an unknown config key, and a capability gate that
resolves to `false` is indistinguishable from a page that simply has no motion.

The fix for that is `scripts/motion-probe.mjs`, which drives a real browser and
asserts on observed values.

---

## 1. Root causes

Five defects. Two were primary, three compounded them.

### 1.1 ⭐ PRIMARY — the capability gate disabled the film on ordinary hardware

`src/components/motion/MotionProvider/stores.ts`

```
lowEnd = cores <= 4 || deviceMemory <= 4
```

Taken literally from `05-motion-system.md` §15 rule 7. When `lowEnd` is true,
`resolveCapability` switches off **scrub, pinning, parallax and smooth scroll** —
every visible motion on the page except the reveal batch.

**Why the threshold is wrong on desktop:**

- `navigator.deviceMemory` is **quantised and capped at 8 by Chrome**. It is a
  privacy bucket, not a measurement. A 6GB machine reports 4.
- Four physical cores is an ordinary laptop, not a constrained device.
- `||` means **one weak signal was enough**.

Modelled against real machines:

| Machine | Old gate | New gate |
|---|---|---|
| 4-core laptop, reports 8GB | ⛔ **all motion off** | ✅ enabled |
| 8-core desktop, reports 4GB | ⛔ **all motion off** | ✅ enabled |
| 4-core, reports 4GB | ⛔ off | ⛔ off (fair) |
| Firefox/Safari (no `deviceMemory`) | ✅ | ✅ |
| 2-core netbook | ⛔ off | ⛔ off (correct) |

**Fix:** a single weak signal is no longer sufficient.

```
lowEnd = cores <= 2 || memory <= 2 || (cores <= 4 && memory <= 4)
```

The real guard against slow hardware is the runtime frame-rate check, not a spec
sheet read through a privacy filter.

> ⚠️ **Note on this machine.** The probe reports 12 cores / 16GB, so the old gate
> did *not* fire here. This defect explains the reported symptom on the user's
> machine; it was not what the probe measured locally. Both were fixed.

### 1.2 ⭐ PRIMARY — the colour grade was orphaned dead code

`src/lib/motion/film/light.ts` · `timelines.ts`

Phase 5F built the five-stop colour evolution inside `LightField`. **Phase 6
deleted `LightField`** and moved its job to the Light character — but nothing ever
called `light.tint()`.

**Probe evidence, before:**

```
scrollY      tint
      0      250 246 238
   3319      250 246 238
   6639      250 246 238
  13261      250 246 238      ← one value for the entire document
```

The whole "deep charcoal → warm amber → soft ivory → golden → quiet dark" arc was
a function nobody invoked. **A regression introduced by my own refactor.**

**Fix:** `GradeTimeline` — a document-wide scrubbed ScrollTrigger that owns tint
and warmth. Moods no longer write warmth (they were fighting for the same
property, last writer winning at random). **Colour is a property of the story;
moods are what the lamp is doing.**

### 1.3 GSAP plugin registration race — the silent killer

`FilmDirector` and `HeroCounter` both imported gsap and used `scrollTrigger`
configs **without calling `registerGsap()`**, relying on `MotionProvider`'s
separate dynamic import winning a race between two effects in the same tick.

When ScrollTrigger is not registered, `gsap.timeline({ scrollTrigger: {…} })`
**does not throw.** GSAP discards the unknown key and logs at most a warning.

**Probe evidence, before:**

```
console warnings : 2
  ! Invalid property scrollTrigger set to {trigger: span.font-display…} Missing plugin?
  ! Invalid property scrollTrigger set to {trigger: span.font-display…} Missing plugin?
```

Those two are the hero fact-bar counters (`90`, `12`) — they never animated.

**Fix:** `registerGsap()` (idempotent) called at every entry point before any
scrollTrigger config is used.

### 1.4 A 6,000px dead zone — moods were set on enter, never on leave

The light adopted `hesitate` inside the Journey and **stayed there**, because no
act reclaimed it on exit.

**Probe evidence, before:**

```
scrollY   light-x  intensity  vignette
   4647     82.0      0.42      0.49
   ...      82.0      0.42      0.34      ← frozen
  10622     82.0      0.42      0.34
```

Roughly 6,000px — the whole of Programs, Lessons, Performances and Testimonials —
with the lamp completely inert. **This is the "mostly static UI" the user saw.**

**Fix:** `onLeave: () => light.mood('disperse')` and `onEnterBack: → 'follow'` on
the Journey, plus a slow positional drift in `GradeTimeline` gated to
progress 0.36–0.80 so it can never fight an act that owns the lamp.

### 1.5 The debug panel caused a hydration error

The panel read `localStorage` during render, so SSR produced `(blocked)` and the
client produced `(not set)`. React reported a hydration mismatch and **regenerated
the entire tree** — the tool built to diagnose the page was corrupting it.

**Fix:** read through `useSyncExternalStore` with a neutral server snapshot; write
the `window.__MOTION_DIAGNOSTICS__` bridge in an effect, never during render.

### 1.6 Latent — content could be masked to invisible

`EmergeBatch` set `--emerge: 0` on **every** target immediately, then relied on
the batch to reveal them. Had the batch failed for any reason (an unregistered
plugin, a refresh race, an earlier throw), twelve blocks of real content would
have stayed masked to invisible with no error anywhere.

**Fix:** content already on screen is never masked; a watchdog releases anything
still masked after three seconds. **A reveal that does not happen must degrade to
"visible", never to "gone".**

---

## 2. Evidence — before and after

| Signal | Before | After |
|---|---|---|
| Page errors | **1** (hydration) | **0** |
| Console warnings | **2** (missing plugin) | **0** |
| ScrollTrigger instances | 16 | **19** |
| Timelines created | 6 | **7 / 7** |
| Distinct colour tints across scroll | **1** | **18** |
| Light-x travel | Δ62 (flat 82.0 for 6,000px) | **Δ55.9, continuous** |
| Light intensity range | Δ0.48 (frozen 0.42 mid-page) | **Δ0.43, resolves to 0.85** |
| Vignette range | Δ0.41 | **Δ0.47** |
| Week counter | 01→12 ✅ | 01→12 ✅ |
| First Note flare peak | 0.83 ✅ | **0.79 ✅** |
| Counters (`90`, `12`) | ✗ never animated | ✅ animate |

### Motion state at rest — after

```
data-motion          full
data-animate-ready   true
localStorage key     sdm:reduced-motion   value: (not set)  → follows OS
prefers-reduced      false
Save-Data            false
cores / deviceMemory 12 / 16
GSAP loaded          true
ScrollTrigger reg.   true
ScrollTrigger count  19
Lenis initialised    true
dust canvas          active, 1440×900 @1x
capability           reveals ✓ scrub ✓ pinning ✓ parallax ✓ smoothScroll ✓
```

> **The localStorage key is `sdm:reduced-motion`.** Current value: **not set**, so
> motion correctly follows the OS preference. Values are `reduced` / `full`;
> removing the key restores automatic behaviour. The footer toggle writes it.

---

## 3. Live timeline inventory

Measured in-browser. Only timelines that actually exist are listed.

| Timeline | File | Trigger | Targets found | Start → End | Scrub | Pin |
|---|---|---|---:|---|---|---|
| **GradeTimeline** | `film/timelines.ts` | `document.documentElement` | 5 stops | `top top` → `bottom bottom` | `true` | — |
| **HeroTimeline** | `film/timelines.ts` | `[data-film="hero"]` | 3 lines | `top top` → `bottom top` | 0.8 | — |
| **WalkTimeline** | `film/timelines.ts` | `[data-film="walk"]` | 5 split lines | `top 78%` → `bottom 60%` | 0.9 | — |
| **JourneyTimeline** | `film/timelines.ts` | `[data-film="journey"]` | 4 | `top top` → `+=280%` | 0.7 | **yes** |
| **FirstNoteTimeline** | `film/timelines.ts` | nested at `twelve` label | 5 layers | — | inherits | — |
| **FinaleTimeline** | `film/timelines.ts` | `[data-film="turn"]` | 8 split lines | `top 72%` → `center 55%` | 1.0 | — |
| **EmergeBatch** | `film/timelines.ts` | 11 offscreen elements | 11 | `top 88%`, once | — | — |

**All 7 created. All triggers found in the DOM. All targets resolved.**

Reduced motion intentionally disables all of them — `FilmDirector` never mounts
when `capability.reveals` is false, and `matchMedia` additionally gates the pin to
`(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.

### Progress observed while scrolling

```
 scrollY  light-x  intens  flare  vignette  week   tint
       0     74.0    0.90   0.00      0.60    01   250 246 238   ← ivory, waiting
     664     57.5    0.88   0.00      0.60    01    52  41  27   ← charcoal
    1316     20.0    0.75   0.00      0.61    01   123  86  31   ← searching
    2655     62.5    0.74   0.00      0.57    05   243 164  36   ← amber, walking
    3319     70.4    0.70   0.79      0.58    08   245 172  54   ← FLARE
    3983     75.9    0.47   0.39      0.56    11   247 196 114   ← hesitate
    4647     74.7    0.47  -0.00      0.55    12   249 224 184
    5975     67.7    0.85   0.00      0.19    12   250 243 231   ← houselights, ivory
    7966     56.9    0.85   0.00      0.14    12   255 196 101   ← golden
   10622     55.5    0.85   0.00      0.14    12    12  14  19   ← quiet dark
   13261     72.0    0.85   0.00      0.14    12    10  12  18
```

Every column changes. The full five-stop grade is visible in the tint column.

---

## 4. Image runtime inventory

Every asset the browser **actually requested**, with observed status.

| Asset | Component | HTTP | Rendered | Notes |
|---|---|---:|---|---|
| `homepage-hero-stage-light.jpg` | `Hero` | **200** | ✅ visible ≥768px | `sizes` collapses it to a thumbnail below `md` |
| `homepage-hero-stage-light-mobile.jpg` | `Hero` | **200** | ✅ visible <768px | 3:4, generated separately |
| `atmos-paper-tooth.jpg` | CSS, `[data-register="desk"]` | **200** | ✅ multiplied into Desk grounds | 760px tile |
| `atmos-stage-floor.jpg` | `NinetyDayJourney` | **200** | ✅ scrubbed, camera push | `loading="lazy"` |
| `atmos-spotlight-cone.jpg` | `NinetyDayJourney` | **200** | ✅ First Note beam | opacity 0 → 1 at p 0.86 |
| `atmos-warm-bloom.jpg` | `NinetyDayJourney` | **200** | ✅ First Note source | arrives a beat after the beam |
| `atmos-curtain-shadow.jpg` | `TheTurn` | **200** | ✅ at 16% opacity | held low deliberately — pastiche risk |
| `atmos-depth-folds.jpg` | — | n/a | ❌ **not referenced** | Rejected in 5E; did not meet brief |

**All seven referenced assets return 200 and render.** No overlay hides them; the
Grade tint is `soft-light` and the vignette is edge-weighted, neither of which
occludes an image.

> ⚠️ `pending-review` status does **not** block integration technically — it is a
> governance flag. All seven remain `approvedBy: null` and still require a named
> human sign-off before production.

---

## 5. The debug panel

`src/components/motion/MotionDebugPanel/` — renders only when
`NEXT_PUBLIC_MOTION_DEBUG=true` **and** `NODE_ENV !== 'production'`.

Shows live: GSAP loaded · ScrollTrigger registered · instance count · provider
ready · reducedMotion · override · localStorage value · `data-motion` ·
`data-animate-ready` · all five capability flags · dust active · canvas
dimensions and DPR · scrollY · document progress · and per-timeline
created/trigger-found/targets/pin/scrub/progress.

Exposes no secrets — every value is browser state already readable from the
console. `NEXT_PUBLIC_MOTION_DEBUG=true` has been added to `.env.local`; the
`GEMINI_API_KEY` entry was untouched.

**To disable:** remove that line, or set it to `false`.

---

## 6. The probe

`scripts/motion-probe.mjs` — drives real headless Chrome via `playwright-core`
using the **system Chrome install** (no browser download).

```bash
node scripts/motion-probe.mjs [url]     # exits non-zero if any assertion fails
```

Asserts, against observed browser values:

```
PASS  no page errors             0
PASS  GSAP registered            true
PASS  ScrollTrigger count > 0    19
PASS  Lenis driving scroll       true
PASS  no missing-plugin warnings 0
PASS  all timelines created      7/7
PASS  canvas present & sized     1440×900
PASS  light travels              Δ55.9
PASS  light intensity varies     Δ0.43
PASS  vignette breathes          Δ0.47
PASS  colour grade evolves       18 tints
PASS  week counter changes       01,02,05,08,11,12
PASS  First Note flare fires     max 0.79
```

**This should run in CI.** It is the only check in the project that can catch a
silently-disabled motion layer.

---

## 7. Quality gates

| Gate | Result |
|---|---|
| `npm run typecheck` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ 4 routes static |
| `node scripts/motion-probe.mjs` | ✅ **13/13 assertions pass** |

Two lint errors surfaced during this work and were fixed properly rather than
suppressed: `setState` inside an effect in the panel (replaced with
`useSyncExternalStore`) and a global write during render (moved to an effect).

---

## 8. Remaining limitations

1. **No visual confirmation.** The probe reads computed values, DOM state and
   console output. It does **not** compare pixels. Every assertion above proves a
   value changed, not that a human perceives it as beautiful. Screenshot
   comparison is the obvious next step and is not built.
2. **No frame-rate measurement.** Still the largest gap. The pinned scrub plus
   canvas plus Flip has real potential to drop frames, and nothing here measures
   it.
3. **Desktop viewport only.** The probe runs at 1440×900. The mobile path — where
   the pin is deliberately disabled — is unverified.
4. **The old thresholds could not be reproduced locally** (this machine reports
   12 cores / 16GB). The capability fix is proven by modelling, not by observation
   on affected hardware.
5. **`--light-y` is not asserted**, only `--light-x`.
6. **Seven generated assets remain `pending-review`** with no approval authority
   assigned.
7. **`NEXT_PUBLIC_MOTION_DEBUG=true` is currently set** in `.env.local`. It is
   development-gated in code, but it should be removed before any deployment.

---

## 9. Files changed

**Created**
```
scripts/motion-probe.mjs                              real-browser runtime probe
src/lib/motion/diagnostics.ts                         observable diagnostics store
src/components/motion/MotionDebugPanel/               dev-only live panel
```

**Fixed**
```
src/components/motion/MotionProvider/stores.ts        capability gate (PRIMARY)
src/lib/motion/film/timelines.ts                      GradeTimeline restored (PRIMARY)
                                                      mood handoff on leave
                                                      idle drift 0.36–0.80
                                                      Emerge fail-safe + watchdog
src/lib/motion/film/light.ts                          moods stop fighting the grade
src/components/motion/FilmDirector/FilmDirector.tsx   registerGsap(), load refresh
src/components/home/Hero/HeroCounter.tsx              registerGsap()
src/lib/motion/easing.ts                              'stage' ease actually defined
package.json                                          + playwright-core (dev)
.env.local                                            + NEXT_PUBLIC_MOTION_DEBUG
```

---

**Diagnosis complete. Homepage only — no other route touched.**
