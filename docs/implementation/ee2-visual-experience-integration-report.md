# EE2 — Visual Experience Integration Report

**Phase:** EE2 — Visual Experience Integration
**Date:** 2026-08-09
**Built on:** `bc3830a` *(fix(motion): preserve React DOM ownership across film navigation)*
**Status:** complete, validated, **uncommitted** — EE1 + EE2 both reviewable in the working tree

---

## 1. Previous measured baseline

Measured in a real browser at 1440×900 before EE2:

| | Before |
|---|---|
| Homepage height | 16,406px |
| Desk (business content) begins | 8,910px — **9.9 viewports** |
| First readable "South Dade Music" | 9,102px |
| Film share of the page | 54% |
| Runtime image requests | **0** |
| `<img>` elements | **0** |
| Generated assets loaded | **0 of 8** |
| Escape hatch | specified in the direction, never built |

---

## 2. New homepage total height

| | Before | After | Change |
|---|---|---|---|
| Desktop 1440×900 | 16,406px | **14,120px** | −14% |
| Mobile 390×844 | — | **13,857px** | — |

---

## 3. Viewport distance before business identity

**This is the headline number.**

| Signal | Before | After |
|---|---|---|
| Programme named ("The 90-Day Stage Program") | 9,769px | **496px — 0.55 viewports** |
| Academy named and located | 9,102px | **724px — 0.80 viewports** |
| Desk begins | 8,910px · 9.9 vp | **6,624px · 7.4 viewports** |
| Mobile — identity | — | **594px · 0.70 viewports** |
| Mobile — desk | — | 5,705px · 6.8 viewports |

The brief asked for a meaningful identity signal within the first 1–2 viewports. Both signals now land **inside the first viewport, on desktop and mobile**, without the opening becoming a conventional hero: they are set at 12px in the label register as programme-note typography, beside the existing whisper, headline and CTA.

`hero.eyebrow` had existed in the content module since the copy framework was written and was never rendered — the homepage sold a named flagship product without naming it.

---

## 4. Film duration / scroll changes

No movement was removed. Every act still runs, in order, at its designed intensity.

| Movement | Before | After | Saved |
|---|---|---|---|
| Opening | 900px | 900px | — |
| Reframe | 900px (`min-h-svh`) | 702px (`78svh`) | 198px |
| The Turn | 630px (`70svh`) | 468px (`52svh`) | 162px |
| **The Walk** (pin) | 3,600px (`+=300%`) | **2,430px** (`+=170%`) | **1,170px** |
| **The Release** (pin) | 2,250px (`+=150%`) | **1,710px** (`+=90%`) | **540px** |
| House Lights | 630px (`70svh`) | 414px (`46svh`) | 216px |
| **Total to desk** | **8,910px** | **6,624px** | **2,286px (−26%)** |

**What was actually removed was waiting, not story.** The Walk gave each of three frames a full viewport of scroll while the cross-fades sit at progress 0.33 and 0.70 — so roughly a third of every frame was travel during which nothing changed. At 170% the cross-fades land in the same relative places; there is simply less nothing between the beats.

The Release pin is not scrubbed — it holds the viewport while a fixed 3.7s timeline plays. Its length controlled *how long the visitor was held*, not how fast the beat ran, and 150% held them for ~1,350px after the timeline had finished. The three beat lengths (1.5s still / 0.4s flash / 1.8s rise) are **untouched**; they are the design and were never the cost.

Verified unchanged: pin spacer heights are exactly `viewport + end%` (2,430 and 1,710), the letterbox still reaches 60px and retracts to 0, grain present in the film and absent at the desk, seam opens to 9px, amber spills to 260px, shout slot present and empty.

---

## 5. Skip-film implementation

`src/components/film/SkipFilm.tsx` — the control 07-the-walk.md §10 has always specified and the build never had.

- A real `<a href="#desk-begins">`, so keyboard operation, focus ring, right-click and screen-reader semantics come for free, and **it works with no JavaScript at all**
- First in the page tree, so it is the first tab stop inside the page — as §11 of the direction asks
- Set in the label register at 11–12px, ash on dark. Not a button, no fill, no border
- Fixed at `calc(var(--letterbox-h) + 18px)` — reads the same custom property the bars animate, so it can never overlap them at any point in the retraction
- **No smooth-scroll handler.** Lenis owns scrolling; calling `scrollTo` would put a second animator on the same axis. A native anchor jump sets `scrollY` and Lenis follows. It also means reduced-motion visitors get an instant jump, which is what they asked for
- Hides once the desk arrives, via an IntersectionObserver on the desk sentinel — deliberately the same mechanism as `Letterbox` and deliberately **not** ScrollTrigger, so it is correct under reduced motion, on a low-capability device, and if the motion runtime never loads
- Pure React. Nothing for a pin to wrap, so it cannot recreate the fault fixed in `bc3830a`

Verified present and visible in the first frame on desktop and mobile; opacity 0 once the desk is reached.

---

## 6–8. Atmospheric assets — reviewed, approved, rejected

**All eight were opened and viewed, then checked against the rendered page.** No verdict was formed from a filename, a prompt string or a metadata field.

### Approved — 3

| Asset | Narrative job | Treatment |
|---|---|---|
| **`atmos-stage-floor`** | **The Walk** — the boards she is crossing, becoming visible as the light finds them | Opacity rises **0.18 → 0.30 → 0.55** across the three frames. Anchored bottom, masked upward into the dark, under the existing hairline and dot. This is the plate the direction explicitly asked for and the build replaced with a 1px rule |
| **`atmos-curtain-shadow`** | **The Turn** — cloth in a raking beam: the wings she is standing behind | `saturate(0.35)`, screen blend, 0.22, masked from the right. The desaturation is load-bearing: the plate carries magenta and crimson through its centre, outside the two-colour palette |
| **`atmos-paper-tooth`** | **The House + every interior `PageIntro`** — uncoated stock: the printed programme the desk is set on | Multiply at 0.24–0.28, **one non-repeating full-bleed plate**. That is the fix for the defect that kept it out of the build — tiled, its diagonal light sweep printed a visible grid; used once at generated scale it reads as light falling across a page |

### Rejected — 5

| Asset | Why |
|---|---|
| `homepage-hero-stage-light` | No slot exists. ACT I opens on true black with nothing in the frame — the most deliberate decision on the page — and the plate would become the LCP of a film whose LCP is specified as a text node on black |
| `homepage-hero-stage-light-mobile` | Companion to a hero the direction does not have |
| `atmos-spotlight-cone` | Multiple beams converging from top centre. The film has exactly one light, house right, whose position the runtime moves — a baked cone fights that physics |
| `atmos-warm-bloom` | A picture of a light, where the beat is a 400ms luminance change. The literal reading of the least literal moment on the page |
| `atmos-depth-folds` | Criss-crossing beams; reads as a light show, against a film built on single-source restraint |

**Nothing was generated.** Nothing depicts a person, a student, a teacher, a family, an audience or a facility. Every plate is `aria-hidden` with empty `alt` — a plate that would need alt text is doing a job this system must not do.

---

## 9. Assets actually loaded by the browser

**3 of 8**, confirmed by network interception on the production build:

| Route | Requests |
|---|---|
| `/` | 3 — stage floor, curtain shadow, paper tooth |
| Every interior route | 1 — paper tooth |

Before EE2 this number was **0 on every route**.

---

## 10. Browser image transfer sizes

| | Requests | Format | Total transferred |
|---|---|---|---|
| Desktop 1440×900 | 3 | **AVIF** | **22.0 KB** (6.3 + 10.9 + 4.8) |
| Mobile 390×844 | 3 | **AVIF** | **4.9 KB** (1.7 + 2.3 + 0.9) |

Source files total **6.7 MB**. None is ever served. `next/image` re-encodes to AVIF at the requested width; `images.formats` and `images.qualities` are declared in `next.config.ts`.

All plates are `loading="lazy"`, none is `priority`, and none causes layout shift (`fill` inside positioned parents).

**One real finding here.** At 58% height the floor plate became the Largest Contentful Paint element for a visitor who scrolls immediately, and Next warned. The correct answer was **not** `priority` — that would preload a decorative below-fold image and damage the real LCP. The box was capped to 40% instead, which keeps the floor doing its job and leaves type as the largest paint. `probe:motion`'s console-noise assertion caught this; it was a genuine regression, not a probe artefact.

---

## 11. Homepage information improvements

| Act | Question | Where it is answered now |
|---|---|---|
| I | Where am I? | Opening — programme at 496px, academy and city at 724px |
| II | What does this child feel? | Reframe, the Turn, the Walk |
| III | What changes? | The Walk's three frames, now labelled with the verbatim week structure |
| IV | Performance / release | The Release |
| V | What is South Dade Music? | The House — statement, tagline, service area, ages |
| VI | How does a student get there? | Twelve weeks + the shy question |
| VII | Which path fits? | Playbill with summaries; both lesson formats named and linked |
| VIII | Why trust this? | Showcase testimony, scholarships, the guarantee |
| IX | What next? | One CTA, priced |

The Walk now carries the programme through the film itself: each frame is labelled *"The 90-Day Stage Program · Weeks 1–10"*, *"Week 11 · she plays for the class"*, *"Week 12 · dress rehearsal and live showcase"* — all verbatim. The film says what it is a film **of**.

---

## 12–14. Programme, lesson and performance improvements

Largely delivered in EE1 and verified visible in EE2's browser QA: flagship dominates by type size alone (no cards, no badges), the pathway states the order between programmes, the private-vs-group comparison answers "which one is mine" without a page load, and testimony sits against the claims it supports.

EE2's contribution here is that the programme is now legible **inside the film** rather than only after it, and the desk has a surface.

---

## 15. Interior-page density improvements

`DeskSection` moved from `--section-spacious` to `--section-comfortable`, halving per-section padding, and `PageIntro` from `feature`/`spacious` to `spacious`/`comfortable`.

| Route | Before | After | Words / 1000px |
|---|---|---|---|
| `/about` | 5,413px | 5,029px (−7%) | 61 |
| `/scholarships` | 4,464px | 4,144px (−7%) | 59 |
| `/programs/band-builders` | 5,668px | 5,284px (−7%) | 53 |
| `/piano-lessons` | 5,721px | 5,401px (−6%) | 57 |
| `/private-lessons` | 5,042px | 4,722px (−6%) | 44 |
| `/contact` | 2,610px | 2,482px (−5%) | 44 |

**This is a weak result and I am not going to dress it up.** 1–7% is not the improvement the brief asked for. Two reasons, one legitimate and one not:

- **Legitimate:** several routes (`/programs`, `/lessons`, `/performances`) set their spacing inline on `Movement` rather than through `DeskSection`, so the shared change did not reach them. Fixing that means editing spacing on every interior page individually — a broad edit I judged out of proportion to the gain immediately before a visual review.
- **Not fixable by layout:** `/private-lessons` renders **every one of the 19 strings its source module holds**. `/contact` has 110 words because the estate publishes 110 words. These pages are thin because the source is thin, and the brief correctly forbids inventing marketing copy to pad them.

---

## 16. Mobile changes

Reviewed independently at 390×844, not as a squeezed desktop.

- Desk at **5,705px = 6.8 viewports**, identity at **0.70 viewports**
- **Zero horizontal overflow** (the 36px header defect found in EE1 remains fixed)
- **No pins below 1024px** — the mobile re-cut is unchanged; the Walk is three stacked frames and the Release a static flash frame
- The floor plate renders in the mobile cut and reads correctly; total image payload **4.9 KB**
- Skip-film present and legible at 390px
- Display type does not clip; ghost numerals bleed as architecture, as designed

---

## 17. Experience-coverage changes

`/_internal/content-review` gains a **per-route delivery table** above the item table, with the six EE2 dimensions: *visible early · visible late · visually supported · text only · gated media · intentionally withheld*.

It records, per route, the measured y-offset of the first business signal, page height, word count, words per 1000px, and how many images the browser actually loaded — because item-level status could not distinguish "a visitor meets this in the first screen" from "this is genuinely present, nine screens down". EE1 put eight homepage enrichments below 9,102px and honestly reported every one as *prominent*, which was true and useless.

---

## 18. Runtime validation

All against a production build.

| Gate | Result |
|---|---|
| `typecheck` · `lint` · `build` | ✅ |
| `check:tokens` | ✅ 13/13 |
| `check:a11y` | ✅ 27/27 routes |
| `check:softnav` | ✅ 6/6 hops + film rebuild |
| `probe:motion --production` | ✅ **12/12 assertions** |
| Homepage → interior soft nav | ✅ 4/4, destinations render |
| Interior → homepage, film reinitialises | ✅ 2 pins rebuilt, 0 survived the exit |
| `removeChild` errors | ✅ **0** |
| Console errors | ✅ **0** |
| Runtime overlays | ✅ **0** |
| Horizontal overflow 390 / 1440 | ✅ 0 / 0 |
| Indexing | ✅ off, all three layers |

**P0 (`bc3830a`) is untouched and green.** The wrappers and the layout-effect teardown are exactly as committed.

Two defects were found and fixed *by* validation during this phase: the undeclared `images.qualities` (console warning) and the LCP-candidate floor plate. Both were caught by `probe:motion`'s console assertion.

---

## 19. Visual QA findings

Inspected in a real browser — 9 desktop captures across the homepage acts, 3 mobile captures.

**What reads well:** the opening now states who this is without ceasing to be a film; the floor plate genuinely transforms the Walk from a diagram into a place; the House movement with paper tooth reads as a printed programme; programme discovery has clear editorial hierarchy with no cards.

**One real defect found and fixed by looking:** the programme eyebrow was first set in `--color-spot-700`, which is **3.42:1 on the pitch ground** — below the 4.5:1 AA floor for 12px text, and invisible to `check:tokens`, which only validates the pairs it declares. Changed to ash (5.3:1). This also protects the amber rationing rule: amber appears exactly four times on the page, and a fifth use is what makes the other four stop meaning anything.

**Still not right:** the Release movement is ~600px of empty warm white above the rule. That is the typeset silence holding space for a word the owner has not chosen, and it is correct by specification — but on screen it reads as an empty page rather than as a held breath.

---

## 20. Remaining weaknesses

1. **7.4 viewports is better, not good.** The film still asks for seven screens before the desk. Further reduction is available (the Walk and Release pins are still the two largest blocks) but starts trading against the concept rather than against dead space.
2. **Interior density barely moved** — see §15. The inline-spacing routes were not reached, and the genuinely thin pages cannot be fixed by layout.
3. **The 90-Day page still runs four consecutive point lists** — the most template-feeling stretch on the site, unchanged since EE1 because restructuring the flagship is a redesign.
4. **Three plates is thin.** The site now has imagery, but a music academy with three abstract textures and no photograph of anything is still visually poor. That is a gate problem, not a design one.
5. **No sound.** The direction calls it the single largest missed opportunity in the project, on a music school, where it is the subject. Untouched.
6. **`cn()` still has no conflict resolution** — the EE1 follow-up is still open, and has silently broken two components historically.
7. **The Release's empty field** — see §19.

---

## 21. Owner-gated opportunities

Unchanged and still blocking, in rough order of what they unlock:

1. **I-1 — photo consent.** The single highest-value item for this phase's subject. It unblocks 18 photographs and every media position now designed and waiting.
2. **B-8 — tuition.** Still the biggest unanswered question on the site.
3. **M-3 — showcase footage.** 10–15 seconds, no faces, would unblock the film's payoff without touching I-1.
4. **I-4 — a dated event.** The Upcoming location is built and honestly empty.
5. **B-4** performance promise · **B-5** brand name · **B-7** teachers · **I-8** unit number · **B-6** Spanish · **B-2** adults.
6. **The shout word** — the largest type on the site is still deliberately blank.

**Media positions are designed and empty by intent.** There are no grey placeholders, no skeleton boxes and no "image coming soon" anywhere: where approved media does not exist, the page is either carried by abstract approved atmosphere or is deliberately typographic.

---

## Stop conditions honoured

Not committed · not pushed · indexing not enabled · no gated photography published · no owner decision invented · no further phase begun. EE1 and EE2 are both intact and reviewable in the working tree.
