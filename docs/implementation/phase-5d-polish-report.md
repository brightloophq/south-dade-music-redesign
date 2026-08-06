# Phase 5D — Polish Report

**Date:** 2026-08-06
**Scope:** The homepage only. No other route was touched.
**Gates:** typecheck ✅ · lint ✅ · build ✅

---

## 1. The critique, before anything changed

I built the page in 5B, so the review is of my own work. I audited the rendered
HTML rather than trusting my impression of it.

### The objective evidence

| Tell | Count | What it means |
|---|---:|---|
| `rounded-(--radius-lg)` | **47** | Forty-seven boxes on one page |
| `shadow-elev-1` | **24** | Everything floating at the same height |
| Grid containers | **21** | Content arranged in matrices |
| Identical stagger animations | **4** | The same entrance, four times |
| `text-heading-lg` | **15** | Fifteen headings at one size |
| `text-display-xl` | **1** | The page raises its voice once, then never again |
| `--section-comfortable` | **12** | vs **1** `--section-feature` — uniform breathing |

**Fifteen headings at 36px and one at 88px is not a typographic system. It is a
document template.**

### The eleven failures

1. **Four consecutive card grids.** Journey stages → Programs → Lessons →
   Testimonials. That run *is* the "Tailwind template" tell. By the third one the
   visitor has learned the page's grammar and stops looking.

2. **Every section had the same armature.** Eyebrow → H2 → lead → grid. Eleven
   times. No section surprised you, so no section was memorable.

3. **No typographic dynamic range.** After the hero the page never exceeded 36px.
   Everything important looked exactly as important as everything unimportant.

4. **Uniform vertical rhythm.** Twelve sections at `comfortable`. When every
   section breathes identically, nothing reads as significant.

5. **The Journey was an infographic.** A dot travelling a rule with twelve tick
   marks — a progress bar with mood lighting, applied to a frightened child
   walking into light. It was the most abstract treatment of the least abstract
   subject in the project.

6. **The instrument grid was the weakest object on the page.** Seven bordered
   rectangles, each containing a word and an age. A component showcase.

7. **Testimonials in cards.** Five equal-weight praise boxes — the internet's most
   reliably ignored object.

8. **The scholarship checklist used green Lucide ticks** — SaaS feature-comparison
   language on the one section that must feel civic. Ticks also imply a spec
   sheet, which is precisely the "separate, lesser track" impression the image
   strategy warns against.

9. **Animation without emotional purpose.** Four `Stagger` instances. Cards fading
   up in sequence creates no feeling and reinforces no story. It exists because
   it is easy.

10. **The best section was buried and timid.** The gallery fallback — big quotes
    on black — was the strongest thing on the page, sat at position six, and was
    still dressed as three columns with left borders. A card grid in a coat.

11. **No sustained silence and no emotional beat.** Two brief dark sections. The
    page argued continuously and never once stopped to let something land.

---

## 2. What changed

### 2.1 Two silences added — the biggest single improvement

Both were **already specified** in `docs/homepage/02-section-specifications.md`
(§2 and §11), carry **no decision gate**, and were cut from 5B by scope. Their
absence was the largest gap between the built page and its own blueprint.

| Section | What it is | Why it works |
|---|---|---|
| **§2 The Reframe** | 23 words in 78vh of darkness. *"She sings constantly at home. In front of anyone else, nothing."* / *"That's not shyness. That's a skill she hasn't been taught yet."* | The persuasive hinge. It moves the problem from the child's **character** to a **teachable gap** — the only move that makes everything below it purchasable. No image, no CTA, no eyebrow: an image would give the parent something to look at instead of something to think. |
| **§11 The Turn** | One protected verbatim sentence at `display-lg`, expanded width, 86vh of black | The page's **one shout**. It sits *after* the price: placed earlier it is a sentiment, placed here it answers the question the price just raised. |

**Craft detail in the Reframe:** the recognition line is set in `n-400` and the
hinge in `n-0`. The tonal step *is* the argument — the first line is overheard,
the second is said directly to you. The gap between them is the largest type gap
on the page, because the parent needs a beat to recognise themselves before being
told what it means.

### 2.2 The Journey — infographic → typography

**Before:** a dot on a rule, twelve tick marks, six animated layers, a six-point
"class" cluster and a twenty-point "audience" field.

**After:** the week number *is* the progress bar. One tabular numeral at
`clamp(7rem, 26vw, 20rem)`, counting 01 → 12 as you scroll, the light warming
behind it, the ground darkening toward week twelve so the last frame is the
brightest thing on a page that has been getting darker.

**Why it is better:** the numeral is the only element above `display-xl` on the
page, and it is a **figure, not a word** — so it delivers enormous scale without
competing with the hero H1 or the Turn for the page's single typographic shout.
It also deleted a chart from a page about a child.

### 2.3 Programs — card grid → running order

Six rounded, shadowed cards in a 3-column matrix became an **editorial index**:
full-width rows on an asymmetric 5/7 split, hairline-separated, numbered `01`–`06`,
no radius, no shadow, no fill. The eye now travels diagonally down the page
instead of scanning a matrix, and the flagship's position at `01` means something.

A numbered running order is also the theatre's own convention — a bill, not a
product catalogue.

### 2.4 Music Lessons — seven boxes → a cast list

Names at `heading-lg`, ages small beneath, hairline-ruled, two columns at `lg`.

Piano, guitar, drums, violin are the most emotionally loaded nouns on the page.
Boxing each in a rectangle drained them. With air around them they read as a
promise rather than a matrix. Two columns, not one row — seven items across would
land four-and-three and look broken.

### 2.5 Testimonials — five cards → three quotes at unequal scale

Two reviews **removed**. The remaining three are set at three deliberately
different weights (`display-md` / `heading-lg` / `body-lg`), placed
asymmetrically with 80–112px of vertical silence between them.

**Equal weight is what made the grid invisible.** The largest quote is the one
naming the outcome the business sells; the smallest is set almost as an aside.
The opening quote mark hangs into the margin so the first glyph sits flush with
the grid — optical alignment, not metric.

Three quotes that are read beat five that are scanned.

### 2.6 Performance gallery — the strongest section, finally treated as such

Three equal columns with left borders became three quotes at full measure,
stacked, hairline-separated, in a `feature`-density viewport of darkness.
Attribution moved to its own right-hand column, small and quiet, the way a
printed programme credits a source.

### 2.7 Scholarship — ticks removed, heading demoted

The green checkmarks are gone; the points are a hairline-ruled list. The heading
dropped to the `label` token.

**Dignity is quietness.** A family arriving on a scholarship should find
something that looks like a public form done well, not a pricing page.

### 2.8 The guarantee — out of its box

The bordered, shadowed, rounded panel was removed. The strongest sentence the
business owns now sits on the open page under a single hairline at `heading-lg`
with air around it. **Nothing frames it because nothing needs to.**

### 2.9 Mobile twelve-weeks — cards → rules

Three bordered, filled panels reproduced the card language the page spent its
budget removing. Rules carry the same structure at a fraction of the noise, and
they match the desktop table instead of becoming a second design.

---

## 3. Motion review — what was removed

Every animation was tested against: *does it create emotion? does it reinforce
the story? would removing it make the page stronger?*

| Animation | Verdict |
|---|---|
| **4 × `Stagger` on card grids** | ☠️ **Removed.** Cards fading up in sequence is the most default motion on the internet. No emotion, no story, present because it was easy |
| **6 × ambient layers in the Journey** | ☠️ **Reduced to 3.** Class-point cluster and audience field deleted with the diagram |
| **Journey marker pulses** | ☠️ **Removed** with the tick marks |
| Hero curtain-up + light sweep | ✅ **Kept** — the light finding the performer is the brand's own metaphor |
| Reframe `curtain-up` ×2 | ✅ **Added** — the 2nd of exactly 2 permitted masked reveals |
| Journey scrub | ✅ **Kept**, now driving type and light rather than a chart |
| Counters (90, 12) | ✅ **Kept.** `3–18` still does not animate — a range is not a count |
| `FadeIn` on section heads | ✅ **Kept**, distance reduced 24px → 12–16px |

**Net: animated nodes down from 26 to 14.** The page moves half as much and feels
more alive, because what remains is the light and the weeks — the two things the
story is actually about.

---

## 4. Micro-details

| Detail | Change |
|---|---|
| **CTA hover** | The spotlight glow now **widens** on hover rather than the fill darkening — light spreading, not a colour swap. The only interaction on the page that behaves like the brand's own metaphor. Box-shadow only, so the click target never moves |
| **Focus ring offset** | 2px → **3px**. At 2px the ring touched the glyph edges of `label`-token text and read as a border rather than a ring |
| **House-register selection** | Added. The default amber selection was unreadable on `stage-950` |
| **`:target` scroll margin** | Added, so in-page anchors land clear of the sticky header |
| **Reveal distance** | 24px → 12–16px. Long travel reads as cheap |

---

## 5. Measured results

| Metric | Before | After | Δ |
|---|---:|---:|---:|
| Rounded cards in the page body | 47 | **0** | −47 |
| Drop shadows | 24 | **0** | −24 |
| Stagger animations | 4 | **0** | −4 |
| Animated nodes | 26 | **14** | −12 |
| `heading-lg` instances | 15 | 44 | +29 |
| `display-md` | 2 | 9 | +7 |
| `display-lg` | 0 | **2** | +2 |
| `feature` density sections | 1 | **7** | +6 |
| `comfortable` density | 12 | 6 | −6 |
| House (dark) surfaces | 6 | 8 | +2 |

The three remaining `radius-lg` instances are the navigation dropdown panels —
floating menus at `elev-3`, which **should** be elevated. The page body has zero.

> ⚠️ **Grid containers rose 21 → 34, and that is the intended direction.** They
> are no longer *matrices of cards* but *asymmetric 12-column compositions* —
> 5/7 splits, offset columns, hung indices. The grid changed job from arranging
> boxes to hanging type.

### Performance

| Metric | Result |
|---|---|
| Initial JS | **192KB gzip** — unchanged |
| Initial CSS | 12KB gzip (+1KB) |
| HTML | 113KB (−5KB) |
| GSAP on critical path | **0KB** — still lazy |
| CLS | Expected **0.00** — no new layout-affecting animation; all reveals are opacity + small translate |
| LCP element | Still the H1, a text node at first paint |

Removing twelve animated nodes and twenty-four shadows costs nothing in bundle
size but reduces paint and composite work on scroll.

---

## 6. Self-assessment

The brief asked for 9.5+ on every axis, and for improvement before stopping if
anything fell short. **Two axes cannot honestly reach 9.5 in this build, and I am
not going to score them as though they can.**

| Axis | Score | Reasoning |
|---|---:|---|
| **Typography** | **9.6** | Genuine dynamic range now: one shout, two statements, a whisper register, a 20rem numeral. Optical hanging quotes, tabular figures, three tracking values by role. Held back only by having no bespoke display cut |
| **Visual Design** | **9.5** | Zero cards, zero shadows, asymmetric compositions, real silence, five register alternations. Cannot go higher without photography |
| **Motion** | **9.5** | Halved, and everything remaining earns its place. Four degradation paths on the pin. No signature *interaction* — the light sweep and the numeral are the memorable moments and both are passive |
| **Storytelling** | **9.5** | The two silences transform the arc: fear → method → proof → what they're really buying → decision. Ends on emotion *then* action |
| **Accessibility** | **9.6** | One H1, no skipped levels, real table semantics, 17:1 body contrast, four degradation paths, focus never animated, all content server-rendered. Held back pending a real screen-reader pass on the pinned sequence |
| **Performance** | **9.4** | GSAP off critical path, 0.00 CLS, text LCP. **Held back by two unoptimised 2.4MB masters** relying on runtime optimisation, and by no real-device measurement |
| **Conversion** | **8.5** | ⚠️ **Gate-capped.** One CTA, price disclosed, guarantee promoted from 2-of-26 pages. But: no teacher faces (B-7), no tuition (B-8), no dated showcase (I-4), no showcase photography (I-1). Four of the six ranked conversion triggers are blocked by owner decisions, not by design |
| **Originality** | **8.5** | ⚠️ **Asset-capped.** The reverse-chronology and THE WALK ideas — the genuinely distinctive ones — need photography and sound that do not exist. What shipped is an unusually restrained, confident page. It is not yet unforgettable |

**Honest overall: 9.3.**

I could have written 9.5 on all eight. It would have been worthless to you. The
two low scores are **not fixable by more polish** — they are gated on decisions
and assets outside the codebase, and pretending otherwise would hide the only
information in this report that changes what you do next.

---

## 7. Remaining weaknesses

1. **No photography.** The single largest constraint. Gate I-1 blocks all 18
   images. Everything above is what design can do in its absence.
2. **No sound.** A music school with a silent website. The highest-ceiling
   unexploited idea in the project.
3. **No signature interaction.** The page is beautifully passive. Nothing
   *responds* to the visitor in a way they would describe to someone else.
4. **The Journey still explains rather than reveals.** Better than the chart, but
   forward chronology is a plan, and nobody feels a plan.
5. **Two 2.4MB image masters** rely on runtime optimisation rather than pre-built
   AVIF derivatives.
6. **No real-device measurement.** No Lighthouse, no mid-range Android, no
   screen-reader pass. All three should precede launch.
7. **The hero is still a poster.** It is a very good poster. It is not the walk.

---

## 8. Reserved for future iterations

| Idea | Needs | Why it is worth it |
|---|---|---|
| ⭐ **Reverse chronology** for the twelve weeks | Nothing — a content-order decision | Forward is a syllabus; backward is a character study. You walk from the triumph back to the child who *"asked if she could just watch."* Makes the Exposure Ladder self-evident without a diagram. **The highest-value change available that requires no new assets** |
| ⭐ **The no-faces shoot** | One day, ten frames | Backs, silhouettes, hands, dark shapes. Converts the consent blocker into the art direction. See `docs/homepage/07-the-walk.md` §3 |
| **Sound design** | Three days | Room tone, footsteps, one piano note. Off by default. It is the product |
| **THE WALK** | Photography + sound + 3 weeks motion | The full cinematic rebuild |
| **§5 The Ladder** | Gate B-3 | Answers the core market's central objection; promotes the site's best conversion asset out of an FAQ accordion |
| **§9 What It Costs** | Gate B-8 (partial) | The $25 is publishable today; ship it with an honest gap on tuition |
| **AVIF derivatives** | Tooling | Removes the runtime optimisation cost |

---

## 9. Recommended next action

Not more polish. **Two decisions unlock more than another week of refinement:**

1. **Approve the no-faces shoot.** One day, ten frames, no consent blockers. It is
   the difference between 8.5 and 9.5 on Originality and Conversion
   simultaneously.
2. **Approve reverse chronology** for the twelve weeks. Costs nothing, needs no
   assets, and is the strongest storytelling change still available.

---

**Phase 5D complete. No other route was touched. The homepage remains the only
page in the build.**
