# EE3 — Source Content + Visual Reconstruction Report

**Phase:** EE3 · **Date:** 2026-08-09
**Branch:** `master` · **HEAD:** `bc3830a`
**Status:** complete, validated, **uncommitted** — EE1 + EE2 + EE3 all intact in the working tree

---

## 1. The finding that shaped this phase

> **Not one legacy South Dade Music image exists in this repository.**

The brief asked me to re-open and visually inspect the extracted images. That is not executable for legacy assets: the only image files in the repo are generated plates. The five legacy files Phase 4D retrieved proved to be photographs of identifiable people — two including children — and were deleted on 2026-08-09. Obtaining the other 72 would mean downloading them from the live site, creating a second uncleared copy of material gated under I-1 and I-7. That is the exact Phase 4D mistake and I did not repeat it.

**What I could audit is the evidence — and the evidence is provably unreliable:**

> `assets-inventory.json` records four files as `assetType: "icon"`. Phase 4D downloaded **exactly those four** and they were photographs of identifiable people, two including children.

An asset labelled `icon` in this inventory has already been empirically shown to be a photograph of a child. No asset can therefore be promoted on the strength of its recorded type — which is precisely what would have been required to release the seven `instruments-we-teach-*.png` "tiles". They carry the same label and the same absence of evidence.

That is the audit the brief asked for. It neither weakens a legitimate gate nor blindly preserves an automated one; it tests the gate and finds the underlying data cannot support promotion.

**The one row the evidence does move:** `logo-1.png` is the only legacy asset whose `ownershipNeedsConfirmation` is `false`. Its first-party status is genuinely supported. It remains unpublished — but now for *design* reasons (raster only, doubles as og:image, gate D-1, gate B-5), not provenance.

---

## 2. Working tree

`master` @ `bc3830a`, in sync with `origin/master`. **45 entries, nothing committed.**

### Created in EE3
```
public/images/generated/instrument-keys.jpg          + metadata
public/images/generated/instrument-strings.jpg       + metadata
public/images/generated/instrument-percussion.jpg    + metadata
public/images/generated/stage-empty-chair.jpg        + metadata
docs/implementation/ee3-source-content-visual-reconstruction-report.md
```

### Modified in EE3
```
src/content/lessons.ts                          instrumentFamilies
src/app/(marketing)/(interior)/lessons/page.tsx      family index replaces flat list
src/app/(marketing)/(interior)/contact/page.tsx      rebuilt composition
src/app/(marketing)/(interior)/performances/page.tsx full-bleed stage plate
src/lib/internal/experience-coverage.ts          EE3_ASSET_DECISIONS
src/app/%5Finternal/content-review/page.tsx      asset-decision table
docs/redesign/generated-assets.md                ledger rows (appended by the pipeline)
```

---

## 3. Route-by-route

| Route | Before | EE3 | Remaining weakness |
|---|---|---|---|
| `/lessons` | 7 names in a flat list, 0 images | **4 instrument families**, 3 object studies, ages and equipment per family | Voice's absence is now meaningful, but Keyboard is still an unanswerable row |
| `/contact` | 110w in 2,482px, stacked `<dl>` | **Three parallel ways in**, visit block, 4 contextual next steps. 44 → **59 w/1000px** | Mobile stacks to 3,644px at 36 w/1000px — the least dense view on the site |
| `/performances` | Type only, most gate-damaged | **Full-bleed lit stage** at 2.39:1 from the direction's own shot list | Grew 15% to 4,571px. Still no real performance photograph, and cannot have one |
| `/programs` | Untouched | Untouched — already the strongest interior route at 94 w/1000px | No imagery beyond the paper surface |
| `/programs/90-day-stage-program` | 4 consecutive point lists | **Untouched** | **Not reconstructed. See §7.** |
| `/`, `/camps`, `/about`, `/private-lessons`, `/band-builders` | — | Untouched | Still template-shaped |

---

## 4. Images: approved, gated, rejected

### APPROVED — 4 new, all generated in EE3, all opened and viewed before use

| File | Depicts | Used on | Why |
|---|---|---|---|
| `instrument-keys.jpg` | Piano key edges, raking light | `/lessons` — Keys | Objects only. Gives a text-only route a real subject |
| `instrument-strings.jpg` | Strings over a bridge | `/lessons` — Strings | Serves four instruments |
| `instrument-percussion.jpg` | Drum head, rim, tension rods | `/lessons` — Percussion | — |
| `stage-empty-chair.jpg` | One chair on bare boards, one beam | `/performances` | From the direction's shot list. The honest image for a gated page: the stage exists and is waiting |

Plus the 3 EE2 plates (`atmos-stage-floor`, `atmos-curtain-shadow`, `atmos-paper-tooth`) still in service. **Every one contains no person, no room, no venue, and none is captioned or positioned as evidence of this academy.**

### OWNER-APPROVAL-REQUIRED

| Asset | Reason | Proposed destination |
|---|---|---|
| **18 genuine performance photographs** | I-1 consent + I-7 copyright. The highest-value media the business owns and the answer to nearly every text-only route | `/performances`, flagship, Band Builders, `/about` |
| **`instruments-we-teach-1…7.png`** | Would be genuinely useful. Not promoted because the `assetType` field that calls them icons has been empirically disproved. **Must be opened by you, not assumed** | `/lessons` families, if they prove to be graphics |
| **`logo-1.png`** | First-party evidence is good; blocked on D-1, B-5 and needing a vector | Header wordmark, og:image |

### REJECTED

| Asset | Reason |
|---|---|
| `m1000x1000.png` ×4 | Confirmed photographs of identifiable people including children |
| `step-up-for-students-*.png` ×2 | Third-party trademark, no licence (I-6) |
| 26 stock/template | Licensing cannot be established |
| 14 duplicates | Nothing unique |
| 5 generated plates | Safe but wrong — fight the single-light physics, or off-palette, or no slot |

---

## 5. Homepage

Unchanged in EE3 — EE2's work stands and I did not touch the film.

| | Value |
|---|---|
| Height | 14,120px desktop · 13,857px mobile |
| Viewports before Desk | **7.4** desktop · 6.8 mobile |
| First "South Dade Music" | 724px — 0.80 viewports |
| First programme signal | 496px — 0.55 viewports |
| Images | 5 · **22.1 KB** desktop, **5.0 KB** mobile (AVIF) |

---

## 6. Validation

`typecheck` ✅ · `lint` ✅ · `build` ✅ · `check:tokens` ✅ 13/13 · `check:a11y` ✅ 27/27 · `check:softnav` ✅ 6/6 + film rebuild · `probe:motion --production` ✅ 12/12.

**Across all 10 major routes, desktop and mobile: 0 page errors, 0 console errors, 0 horizontal overflow.** Every route now loads at least one image; none did before EE2. P0 (`bc3830a`) untouched.

One mobile defect found by measurement and fixed: the instrument plates were `hidden sm:block`, so `/lessons` transferred 0.9 KB on mobile against 8.1 KB on desktop — the one route where imagery does real work was text-only for the audience most likely to be on a phone. Now 10.1 KB AVIF at 390px.

One visual defect found by looking and fixed: the Voice family reserved an image column and painted a **solid black rectangle** — exactly the empty placeholder this project forbids. The row now runs full width with no image column at all, so the absence reads as design rather than breakage.

---

## 7. What I did not do, and why

**The 90-Day Stage Program was not reconstructed.** It is the flagship, Part 7 called it out explicitly, and it remains four consecutive point lists across 7,303px at 61 w/1000px. I ran out of the budget to do it properly, and a half-rebuilt flagship is worse than an honest untouched one. **This is the single largest outstanding item in EE3 and I would not call the phase finished with it open.**

Also untouched: `/about`, `/camps`, `/private-lessons`, `/programs/band-builders`, `/programs`. Part 4's charge — that interior routes share too much compositional DNA — is **only partially addressed**. Three routes now have genuinely different information architecture; five still follow the shared template.

---

## 8. Remaining weaknesses I would refuse to call finished

1. **The flagship is untouched.** See §7.
2. **Five routes still share one composition.** Part 4 is half-done.
3. **`/private-lessons` at 44 w/1000px** — it renders all 19 strings its source holds. Layout cannot fix a thin source.
4. **`/contact` on mobile is 36 w/1000px** — the three-column composition stacks and loses its density advantage.
5. **No photograph of a person, a lesson, an ensemble or this building exists anywhere on the site.** Object studies are honest, and they are not the same thing. Only I-1 fixes this.
6. **Keyboard** is still an unanswerable row on `/lessons`.
7. **`cn()` still has no conflict resolution** — open since EE1, has silently broken two components historically.

---

## 9. Owner decisions that would unlock the most

1. **I-1 — photo consent.** Unblocks 18 photographs and would change more than any further design work.
2. **Open the 7 `instruments-we-teach` files** and tell me what they are. If graphics, they go straight into the families.
3. **B-8 tuition** · **M-3 showcase footage** · **I-4 a dated event** · **D-1/B-5 logo and name**.

---

## 10. Confirmation

**NOTHING COMMITTED. NOTHING PUSHED. EE1 + EE2 + EE3 ARE ALL INTACT IN THE WORKING TREE.**
Indexing off · no gated photography published · no owner decision invented · no business fact fabricated.

---

# EE3.1 — Flagship Experience Reconstruction

**Date:** 2026-08-09 · **Target:** `/programs/90-day-stage-program`
**Status:** complete, validated, uncommitted

## What the source audit found

Three verbatim blocks had **never been migrated**, and one of them was the page's own hero subtitle:

| Recovered | Source | Why it matters |
|---|---|---|
| *"From the Practice Room to the Spotlight in Three Months"* | `90-day-stage-program.md` — the H1's own hero subtitle | Names the start, the end and the duration in nine words, in the same stage vocabulary the film is built from |
| *"Programs that include performance help students grow faster and feel more connected to music."* | H2 "Why Stage Experience Matters" | **The objection a parent actually arrives with** — is a "stage programme" pressure? Was answered nowhere |
| *"At the end of the 90 days, students get the chance to perform. This is the highlight of the program."* | H2 "A Real Performance at the End" | The clearest statement of what the ninety days are *for* |

**Deliberately omitted:** the sentence that follows the second block — *"In fact, music programs that offer real performance opportunities help students develop confidence and stronger skills over time."* It is presented as research and cites nothing; the extraction itself flags it *"Should be sourced or softened."*

The source page also carries **no proof of any kind** — no outcome, no parent quote, no photograph, no video — and links to none of the programmes it is built from.

## Before → after

| | Before | After |
|---|---|---|
| Height (desktop) | 7,303px | **6,245px** (−14%) |
| Height (mobile) | 6,971px | 6,973px |
| Words | 446 | 478 |
| Words / 1000px | 61 | **77** (+26%) |
| Major movements | 9 | **7** |
| Consecutive list-only sections | **4** | **2** |
| Images | 1 | 2 |
| In-page CTAs | 2 | **1**, at 5,131px of 6,245px |

### Architecture

```
BEFORE                          AFTER
intro                           THE OFFER      what it is, first viewport
week grid                       WHY THE STAGE  recovered — why performance exists
where-taught                    THE NINETY DAYS  3 steps + week bands as ONE sequence
3 steps                         WHAT CHANGES   two outcome lists side by side
list: in this program           THE END        finale + stage plate + the only proof
list: build confidence          WHO IT IS FOR  + guarantee + one CTA
list: performance skills
list: who it is for
guarantee + CTA
```

The week bands and the three-step narrative described the same ninety days from two different source pages and sat several screens apart with nothing connecting them. They are now one sequence, with the bands attributed — because this page's own source gives the three steps and **no week numbers at all**.

## Images and proof

`stage-empty-chair` is reused from `/performances`, its meaning changed by composition rather than caption: there it opens the page and reads *the stage is waiting*; here it arrives after three steps of preparation, directly above the finale, and reads *this is where the work has been going*. A ghost `90` sits in it at 10% amber.

One quote — Dexter's, the only one describing the concert — placed at the finale where the claim is made, not in a testimonials section.

## Validation

`typecheck` · `lint` · `build` · `check:tokens` 13/13 · `check:a11y` 27/27 · `check:softnav` 6/6 · `probe:motion --production` 12/12. Desktop and mobile: **0 console errors, 0 overflow**. P0 `bc3830a` untouched.

## Remaining weakness of the flagship

- **Two consecutive list sections remain** (what-changes, who-it-is-for). Both are genuinely lists; four was a defect, two is the material's real shape.
- **Still no photograph of a student, a lesson or a showcase.** Only I-1 fixes that.
- **No tuition** (B-8) — a parent still cannot learn what the flagship costs.
- **The 90 / 12-week / "about three months" conflict** is carried, not resolved.
- Mobile is 6,973px for 456 words — the sequence stacks and gets long.

## Classification of the remaining EE3 routes

| Route | w/1000px | Consecutive lists | Verdict |
|---|---|---|---|
| `/programs` | 94 / 79 mobile | 1 | **ACCEPTABLE FOR NOW** — densest interior route; already has the pathway, the pull quote and a real flagship hierarchy |
| `/camps` | 79 / 74 | 1 | **ACCEPTABLE FOR NOW** — longest page at 7,582px, but genuinely content-rich and well structured |
| `/about` | 61 / 56 | 1 | **ACCEPTABLE FOR NOW** — limited by gates (B-7 teachers, withheld mission), not by composition |
| `/programs/band-builders` | 53 / 49 | **4** | **REQUIRES EE3.2** — carries the exact defect just fixed on the flagship: four consecutive list-only sections |
| `/private-lessons` | **44 / 39** | 2 | **REQUIRES EE3.2** — thinnest interior route. It renders all 19 strings its source holds, so this is a composition problem, not a content one |

---

# EE3.2 — Remaining Interior Reconstruction + EE3 Closure

**Date:** 2026-08-09 · **Targets:** `/programs/band-builders`, `/private-lessons`

## Previously unmigrated content discovered

Six more verbatim blocks that had never reached the rebuild — bringing the EE3 total to **nine**.

| Route | Recovered | Why it mattered |
|---|---|---|
| Band Builders | *"Experience the Thrill of Collaborative Performance"* | The page's own hero subtitle |
| Band Builders | *"Band Builders is designed for kids and teens who want more than just private lessons."* | **The organizing idea** — the only sentence that places the programme relative to the rest of the offer |
| Private Lessons | *"Accelerate Your Progress with Dedicated Professional Mentorship"* | Hero subtitle |
| Private Lessons | *"Lessons are one-on-one, so students get full attention."* | **The entire reason the page exists.** The rebuild had compressed it to the two words `One-on-one` in a data row |
| Private Lessons | *"At South Dade Music, we offer private music lessons in South Miami-Dade for kids, teens, and adults."* | The opening line |
| Private Lessons | *"We teach children, teens, and adults, so anyone can start at any time."* | The age line, verbatim |

**Three hero subtitles in a row were missing.** The extraction records them as a parenthetical on the H1 line, which is evidently how all three were skipped in migration. That is a systematic extraction-reading failure, not three coincidences.

**A correction to EE3's own diagnosis:** EE3 said `/private-lessons` "renders all 19 source strings, so composition not content." True of the module, false of the source — four blocks had never reached the module.

## Measurements

| | Band Builders | Private Lessons |
|---|---|---|
| Height desktop | 5,284 → **4,042px** (−24%) | 4,722 → **3,916px** (−17%) |
| Height mobile | 5,295 → 4,724px | 4,809 → 4,617px |
| Words | 281 → 288 | 209 → 246 |
| **Words / 1000px desktop** | 53 → **71** (+34%) | 44 → **63** (+43%) |
| Words / 1000px mobile | 49 → 56 | 39 → 49 |
| Major movements | 7 → **5** | 7 → **6** |
| **Consecutive list-only** | **4 → 2** | 2 → 2 |
| Images | 1 → **4** (9.6 KB) | 1 (4.7 KB) |
| In-page CTAs | 1 @ 3,014px | 1 @ 2,889px |

## Architecture

**Band Builders — organizing idea `alone → together`**, taken from its own recovered sentence. Deliberately *not* a smaller flagship journey.

```
BEFORE                              AFTER
intro                               THE OFFER      what it is, and what it is more than
list: what students do              ALONE          three instruments, separate, one shared rule
list: who it is for                 TOGETHER       the four outcomes, two-up
list: how it works                  THE PATH       numbered, step 2 linked, contradiction stated
list: performing                    PERFORMING     the conditional + its one corroborating quote
CTA
```

The three approved object studies sit as separate crops under **one continuous rule** — separate instruments, shared musical space. The composition is the argument.

**Private Lessons — organizing idea `a decision, not a specification`.**

```
BEFORE                              AFTER
intro + CTA                         THE OFFER      what it is, who can start
at-a-glance dl                      WHY ONE-TO-ONE the recovered argument, raised voice
list: learning path                 WHAT TO LEARN  the 7 it names; Keyboard flagged as unlinkable
list: where it leads                THE PATH       4 steps, destinations linked
list: how we work                   BEYOND         performance + practicalities, two columns
scholarships + CTA                  PAYING FOR IT  scholarships + one CTA
```

## What is deliberately NOT said

- **Whether private lessons are a prerequisite for Band Builders.** The source lists beginners *and* students already in private lessons, while its own numbered path makes private lessons step 2. Both ship; the page states the question is unsettled.
- **That Band Builders is the "band application" half of the flagship.** That rests on the disputed "two classes weekly" line. The flagship is linked as a destination — routing, not containment.
- **Frequency.** "Weekly" ships as this page's own word, never generalised.

## Defect found and fixed by validation

`check:a11y` failed `/private-lessons`: the step-4 link wrapped its entire parent span, so it did not qualify for the inline-in-prose exemption and measured 153×18 — below WCAG 2.5.8 AA. Fixed with `min-h-6`.

## EE3 closure — whole-site classification

Measured at 1440×900 on a production build. **0 console errors, 0 horizontal overflow across all 13 routes.**

| Route | w/1000px | Consec. lists | Images | Classification |
|---|---|---|---|---|
| `/faq` | 100 | 0 | 1 | **EXPERIENCE COMPLETE** |
| `/programs` | 94 | 1 | 1 | **EXPERIENCE COMPLETE** |
| `/lessons` | 88 | 1 | 4 | **EXPERIENCE COMPLETE** |
| `/camps` | 79 | 1 | 1 | **REQUIRES FUTURE OWNER INPUT** — 2026 sessions finished; a 2027 decision is the content |
| `/programs/90-day-stage-program` | 77 | 2 | 2 | **EXPERIENCE COMPLETE** |
| `/performances` | 72 | 1 | 2 | **ACCEPTABLE WITH GATE LIMITATION** — I-1 blocks all photography, I-4 means no dated event |
| `/programs/band-builders` | 71 | 2 | 4 | **EXPERIENCE COMPLETE** |
| `/private-lessons` | 63 | 2 | 1 | **EXPERIENCE COMPLETE** |
| `/about` | 61 | 1 | 1 | **REQUIRES FUTURE OWNER INPUT** — B-7 blocks teachers, mission withheld pending rewrite |
| `/scholarships` | 59 | 0 | 1 | **REQUIRES FUTURE OWNER INPUT** — eligibility, steps, documents published nowhere |
| `/contact` | 59 | 1 | 1 | **ACCEPTABLE WITH SOURCE LIMITATION** — no map or directions exist; I-8 disputes the unit |
| `/` | 53 | 1 | 5 | **EXPERIENCE COMPLETE** — density is low by design; it is a film |
| `/contact/book-a-trial` | 45 | 1 | 1 | **ACCEPTABLE WITH GATE LIMITATION** — no native form; HighLevel ownership unconfirmed |

## Repetition: system consistency vs template dependence

**Legitimate consistency** — `PageIntro` on every interior route (every page needs a title in the same register); the 220px label rail (the desk's grid); hairline separators; `Atmosphere` paper on every desk.

**Genuine template dependence, and the one thing I would still call a weakness:** **8 of 13 routes end with the same trial CTA movement.** It is defensible — the trial is the single conversion action — but it means eight pages have an identical last screen. Not fixed in EE3.2 because varying it arbitrarily would be exactly the "arbitrary variation" the brief forbids; it needs a decision about whether every route should convert to the same action.
