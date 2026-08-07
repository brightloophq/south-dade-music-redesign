# Final Design Implementation Report — "The Film"

**Date:** 2026-08-07
**Direction:** `docs/approved-design/` (approved 7 Aug 2026, typography frozen)
**Scope:** homepage only. No other route was built.
**Baseline:** `223516d` — foundation unfrozen for implementation

---

## 1. Result

| Gate | Result |
|---|---|
| `npm run typecheck` | ✅ pass |
| `npm run lint` | ✅ pass |
| `npm run build` | ✅ pass |
| `npm run build-storybook` | ✅ pass |
| `npm run check:tokens` | ✅ **13/13** |
| `npm run probe:motion` (development) | ✅ **13/13** |
| `npm run probe:motion --production` | ✅ **13/13** |

Verified in a real browser, not inferred from builds.

---

## 2. ⚠️ The one deviation from the approved package — audit this

**`Visual Specification.md` §B specifies `#7a7364` for muted text on the house
ground and states it computes to 4.6:1. It computes to 4.285:1 — a WCAG AA
failure for body text.**

That token carries the scholarship disclaimer, the programme footnote and every
caption on the ivory ground. The spec asserts both a hex and a ratio and they
contradict each other.

**Resolution:** the ratio won, because it is the accessibility contract and the
spec explicitly calls it *computed*.

| | Value | Ratio on `#F7F4EE` |
|---|---|---|
| Specified | `#7a7364` | 4.285:1 ❌ fails AA |
| **Shipped** | **`#746e61`** | **4.61:1 ✅** — the figure the spec claims |

A four-unit shift, imperceptible side by side, delivering exactly the ratio the
document promises. Recorded in three places so it cannot be lost:
`src/styles/tokens.css`, `src/tokens/colors.ts`, and asserted permanently by
`npm run check:tokens`.

**This needs owner sign-off.** It is the same class of defect corrected in
Phase 4, where two documented ratios also failed computation.

## 2.1 Three internal conflicts in the package — resolved by its own rule

The README states: *"Where any other document disagrees with `The Film.html`,
this file wins."* No design decision was required.

| Conflict | Resolution |
|---|---|
| §F/§G specify **Archivo** for wordmark, CTA type and form labels — but Archivo is deleted | **Bricolage.** The Film.html sets all three in Bricolage; `tokens.css` has no Archivo token. §F/§G is stale v1 prose. |
| §C/§H say **110px** margin; tokens.css and HANDOFF say **150px** | **150px.** Every comp hangs type at `left:150px`. |
| §A says the Google Fonts CDN is acceptable | **Self-hosted.** The README overrides: *"the production build must self-host per the no-font-CDN rule."* |

## 2.2 Two additions of mine that the comps do not have — removed

While reviewing the rendered hero against shot 02 I found I had added a fact row
(90 / 12 / 3–18) and a guarantee line. **The Film.html carries neither.** Both
were removed. The comps win, including over my own reasonable-seeming additions.

---

## 3. Token migration

`docs/approved-design/tokens.css` installed as `src/styles/tokens.css`; all five
TypeScript mirrors rewritten in the same commit.

| Change | Detail |
|---|---|
| **Grounds** | Six new `--color-ground-*` tokens: pitch, wing, memory, stage, flash, house |
| **Naming collision resolved** | `stage` meant a 5-step dark ramp *and* a movement ground. Grounds are namespaced `--color-ground-*`, so nothing was silently repointed. |
| **Spotlight** | 5-step ramp → one light `#E9A23B` + one derived dark `#8A5A1B` |
| **Velvet** | Retired; tokens resolve to the text colour so stale references fail soft |
| **Neutrals** | Re-anchored to ivory `#F7F4EE` |
| **Radius** | All steps → `0`; `--radius-full` retained for the CTA pill alone |
| **Shadows** | All → `none`; `--shadow-spotlight` redefined as the one amber glow |
| **Type** | `display-xl` → THE SHOUT (96→180px); `display-lg` → Statement (26→46px); new `--text-whisper`, `--text-ghost` |
| **Beats** | `--duration-release` 400ms · `--duration-still` 1500ms · `--duration-houselights` 1800ms |
| **Grid** | `--grid-margin` reaches **150px** at ≥1280px — the film margin |
| **Registers** | `[data-register='house']` kept verbatim; its values are now the film grounds. Zero component churn, exactly as HANDOFF §1 intended. |

**New tool:** `npm run check:tokens` asserts CSS↔TypeScript agreement, the
zero-radius and zero-shadow laws, the three film beats, the film margin, font
retirement, and **computes every contrast pair** rather than trusting a table.
It is what caught the defect in §2.

---

## 4. Typography migration

**Inter and Archivo are gone from production** — tokens, font files and all.

| Family | Role | Axes | Files |
|---|---|---|---|
| **Bricolage Grotesque** | Structure | `opsz 12–96 · wdth 75–100 · wght 200–800` | 2 (latin, latin-ext) |
| **Newsreader** | Voice | `opsz 6–72 · wght 200–800`, roman + italic | 4 |

**New tool:** `npm run build:fonts` subsets the approved `.ttf` to woff2 and
pulls Newsreader's variable woff2s at **build** time, then self-hosts them. The
production site makes no font request.

**Axis preservation was verified in a real browser**, not assumed: `wght 200↔800`
and `wdth 75↔100` measurably change glyph widths, and Spanish diacritics render.
A subsetter that silently dropped `fvar` would have compiled and looked wrong.

Loaded via `next/font/local` with `font-optical-sizing: auto`.

---

## 5. Components removed

| Removed | Why |
|---|---|
| `home/Hero`, `Reframe`, `NinetyDayJourney`, `Programs`, `MusicLessons`, `PerformanceGallery`, `Testimonials`, `Scholarship`, `TheTurn`, `FinalCta` | Superseded — the homepage composition does not survive, per the brief |
| `motion/Spotlight` (SpotlightCursor) | **Custom cursors are on the direction's prohibited list** |
| `motion/Atmosphere` (dust canvas, Grade wash, old Grain, AtmosphereLayer) | Dust is not in this direction; a global tint wash would contaminate the per-movement grounds; grain is replaced by a film-scoped version |
| `EmergeBatch` timeline | The fade-up vocabulary is banned by name; every reveal here is by light |
| Header on the homepage | HANDOFF §3.6. **The component is intact** for interior routes — omitted, not deleted |

---

## 6. Components created

**Film primitives** — `src/components/film/`

| Component | What it does |
|---|---|
| `Letterbox` | 60px bars, retracting over 1800ms at the house lights |
| `GhostNumeral` | `aria-hidden` presentational numeral, 3–5% above its ground |
| `Seam` | Amber edge, 3px→9px, with the 0→260px spill |
| `FilmGrain` | Grain over the film movements only |
| `Movement` / `FilmMargin` | A room with a ground and a register; the 150px film margin |

**Movements** — `src/components/home/`

`Opening` (shots 01–02) · `Reframe` (shot 03 + The Turn) · `TheWalk` (04–06) ·
`TheRelease` + `HouseLights` (07 A→B) · `Desk` (08–12: playbill, twelve weeks,
lessons, evidence, testimonials, scholarship, final CTA)

### Two design decisions worth recording

**The letterbox owns its own presence via an IntersectionObserver, not GSAP.**
Tying it to the motion runtime would mean a reduced-motion visitor either gets
bars welded over the ivory desk forever, or never sees them. Presence is
independent; only the animated retraction is motion.

**`FilmGrain` shares the letterbox's desk sentinel**, so the two cannot disagree
about where the film ends.

---

## 7. Timelines created

Six, all labelled so the choreography is observable and testable.

| Timeline | Shot | Behaviour |
|---|---|---|
| `Opening` | 01 | The seam at rest. The load screen *is* the first frame. |
| `Wings` | 02 | Seam 3→9px, spill 0→260px. Scrub 0.8. |
| `Memory` | 03 | The temperature drop to brown-black. Scrub 0.9. |
| `Walk` | 04–06 | **PINNED №1.** Three frames, dot crossing, ghost 1→6→12. Scrub 0.7. |
| `Release` | 07 | **PINNED №2.** 1500ms still → 400ms flash → 1800ms rise. |
| `Houselights` | 07B | The dimmer rise. Scrub 1. |

**Pin budget honoured:** exactly two, re-allocated in config from the old pair to
`the-walk` + `the-release`. The desk does not move at all.

**The Release is deliberately time-based, not scrubbed.** Every other timeline
gives the visitor the pace. This one must not: a scrub would let someone cross
the 1500ms stillness in 200ms and destroy the only moment the page exists to
deliver.

**Runtime reused, not rebuilt.** GSAP, ScrollTrigger, Lenis, capability tiers,
`sdm:reduced-motion`, `FilmDirector` cleanup, `light.ts`, `camera.ts`,
`diagnostics.ts` all consumed as-is.

### One regression found and fixed in the browser

Removing `AtmosphereLayer` from the page silently removed `FilmDirector` with
it — it had been mounted *inside* the atmosphere layer. Typecheck, lint and
build all passed while **not a single timeline ran.** The browser probe caught
it. `FilmDirector` is now mounted explicitly on the page.

---

## 8. Assets

**No image is referenced by the homepage.** The probe confirms: *image requests
— none.*

This is correct and deliberate. `The Film.html` places no photography or texture
asset in any of its twelve shots — the comps are typographic and use CSS
gradients — and §E states *"all eight remain unapproved pending human review;
nothing here should ship without that sign-off."* Shipping an unapproved asset
would violate the spec.

| Asset | Verdict (Visual Specification.md §E) | Status |
|---|---|---|
| `homepage-hero-stage-light` | Usable, re-brief warmer +200K | **PENDING OWNER APPROVAL** |
| `atmos-spotlight-cone` | Usable, re-brief warmer +200K | **PENDING OWNER APPROVAL** |
| `atmos-stage-floor` | Usable for transitions | **PENDING OWNER APPROVAL** |
| `atmos-curtain-shadow` | Usable for transitions | **PENDING OWNER APPROVAL** |
| `atmos-paper-tooth` | House sections only, ≤4% | **PENDING OWNER APPROVAL** |
| `atmos-warm-bloom` | Diffuse where the release needs sudden | **REPLACE** — re-brief tighter |
| `homepage-hero-stage-light-mobile` | Not addressed | **PENDING OWNER APPROVAL** |
| `atmos-depth-folds` | — | **REJECTED** |

No new assets were generated. No AI-generated people, students, teachers,
parents, facilities, performances or awards exist anywhere in this build.

---

## 9. Accessibility report

| Check | Result |
|---|---|
| Heading structure | 1 × `h1`, **no level skips** |
| Landmarks | `main` 1 · `footer` 1 · `header` 0 *(intentional on the homepage)* |
| Skip link | Present, first tab stop, targets `<main>` |
| Keyboard | **14 stops, 0 without a visible focus ring** |
| Images missing `alt` | 0 |
| Focusable content inside `aria-hidden` | 0 |
| Ghost numerals | 4, **all `aria-hidden`** |
| Shout slot | `aria-hidden` — an empty heading is never announced |
| Body text floor | 16px, both languages |
| Touch targets | 44px minimum; the CTA is 52px |
| Contrast | Every pair computed: 18.36 / 16.96 / 8.62 / 5.48 / 4.61:1 |

### Reduced motion — the parallel cut

Verified with `prefers-reduced-motion: reduce`:

- Walk frames stay `relative` — the **static three-frame triptych**, all three
  lines legible
- **All 16 movements present**, 616 words — no content is motion-only
- Grain present but `animationPlayState: paused` — texture stays, resampling stops
- Letterbox changes state without a tween, and is **absent** from the ivory
  movements rather than retracting, exactly as §H specifies
- The shout slot is present

**Scroll is never trapped.** Both pins are ScrollTrigger pins with finite
`end` values; there is no scroll-jacking, no snapping and no wheel capture.

**The release flash is WCAG-safe.** One transition from `#0D1220` to `#FFF3DC`
over 400ms — a single change, not a repeating flash. It is nowhere near the
three-per-second threshold for photosensitive seizures.

---

## 10. Performance report

Measured against a production build, cold load, 1440×900.

| Metric | Result |
|---|---|
| **CLS** | **0** |
| **LCP** | **408ms** |
| TTFB | 59ms |
| DOMContentLoaded | 119ms |
| Load | 285ms |
| Transfer | 903 KB |
| **Median frame through both pins** | **16.7ms (~60fps)** |
| p95 frame | 16.8ms |
| **Long frames (>50ms)** | **0** |
| Page errors | 0 |

**Zero CLS** comes from three deliberate choices: metric-matched font fallbacks,
the shout slot reserving its full line box before the word exists, and the
letterbox defaulting to 60px so the film opens correctly at first paint rather
than shifting into place.

Client JS: 19 chunks, 770 KB raw. Fonts: 6 files, 653 KB — the cost of two
variable families with real axes, self-hosted and subset.

GSAP stays off the critical path via dynamic import inside effects. Grain is a
GPU-composited static tile stepped by `background-position`, not an animated
`feTurbulence` filter. The letterbox ramp is one rAF loop; there is no second
loop competing with Lenis.

---

## 11. Remaining owner decisions

1. **⚠️ The contrast correction in §2** — needs sign-off.
2. **The shout word.** Ships as the typeset blank. The largest type on the site
   is intentionally empty and the probe asserts it stays that way.
3. **The eight generated assets.** None approved; none shipped.
4. **A vector logo**, or confirmation that a type-only wordmark ships permanently.
5. **Whether focus-state amber counts inside the four-use budget** or is a
   legitimate interface-only fifth. Currently amber, preserving the a11y contract.
6. **"Every student performs" vs "gets the chance to perform."** Neither claim
   is used anywhere.

## 12. Remaining engineering TODOs

1. **28 internal links 404** — every programme, lesson, camp and contact route,
   including `/contact/book-a-trial`, the primary CTA. Homepage-only was the
   stated scope; this is the largest remaining gap.
2. **Interior routes need a nested layout that reinstates `<Header />`.** The
   marketing layout drops it for the homepage; the component is intact.
3. **Storybook stories** still cover retired primitives (`FadeIn`, `Stagger`,
   `Parallax`). They build and pass, but the vocabulary they demonstrate is
   banned on this page — worth pruning when interior routes land.
4. **`velvet` tokens** resolve to the text colour so stale references fail soft.
   Delete once nothing references them.
5. **Structured data** stays disabled pending gates B-4, B-5, I-8.
