# 01 — Homepage Blueprint

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Status:** Design documentation. **No implementation.**
**Governing direction:** [`../redesign/final-art-direction.md`](../redesign/final-art-direction.md) — *The House and the Desk*
**Source of truth:** `docs/source-content/` · `docs/redesign/`

---

## 1. What this page has to do

The homepage is not a summary of the business. It is the instrument that closes a
specific gap, identified in `01-brand-strategy.md` §0:

> **South Dade Music already owns a genuinely differentiated product — and sells
> it like a commodity.**

The academy has a named, dated, guaranteed transformation programme. The current
homepage follows its H1 with *"Music Lessons Near Me"*, *"Kids Music Classes
South Dade"*, and *"Piano Lessons Near Me"*. It renders its five programme cards
**three times**. It repeats twelve testimonials **eighteen times**. It states the
mission as a search query.

**The entire homepage is the work of closing that gap.**

### The five jobs, in priority order

| # | Job | Owner | Evidence it currently fails |
|---|---|---|---|
| **1** | Make a parent believe their shy child could stand on a stage in 90 days | §2 Reframe, §3 The Journey | The 12-week structure is a bullet list with `o ` artifacts and the word *"mein"* left in the copy |
| **2** | Remove the quit risk | §12 Guarantee | The Stage-Ready Guarantee appears on **2 pages of 26**, and on **none of the 6 programme pages** |
| **3** | Answer the shy-child objection out loud | §2, §5 | *"That is exactly what we train for"* — the single best conversion asset on the site — is buried in an FAQ accordion |
| **4** | Let a Scholarship Family see a route in | §10 | `/step-up-accessibility/` has no criteria, no steps, no document list, no outbound link |
| **5** | Survive the teen veto | Whole page | Current design reads as a children's activity site |

### The competitive frame that drives the design

`01-brand-strategy.md` §10: the real competition for a Tuesday afternoon and
$150–250 a month is **soccer, dance, jiu-jitsu, Kumon and the iPad.** Every one
of those sells a visible outcome on a date — a belt, a recital, a grade level, a
game on Saturday. Music lessons traditionally sell nothing visible for two years.

> **The 90-day showcase is how this brand competes with a black belt.**
> The homepage must make that outcome as legible as a belt.

---

## 2. The hero — three concepts

Three genuinely different answers to the first 3 seconds. Each is evaluated
against brand strategy, audience, and the assets that actually exist.

---

### Concept A — **The Bill** (Theatre)

A full-viewport `stage-950` ground carrying a **poster**, not a banner. The
promise is set in Archivo at expanded width across three lines. A single
production still bleeds off the right and bottom edges. A ruled hairline
separates the promise from the week structure. Below it, a **fact bar** in the
light register.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 🎭 HOUSE                                                                 │
│   THE 90-DAY STAGE PROGRAM              ← label · spot-400               │
│                                                                          │
│   In 90 days,                           ← display-xl, Archivo 700        │
│   your child                              expanded ~112, n-0             │
│   takes a stage.                          3 lines, left-hung             │
│   ─────────────────────────────         ← stage-700 hairline             │
│   Weeks 1–10 skill · Week 11 the        ← body-lg · n-300                │
│   class · Week 12 you.                                                   │
│                                                                          │
│   [ Book a Trial — $25 ]  Come watch a showcase →                        │
│                                 ┌──────────────────────────────────────┐ │
│                                 │ ONE PRODUCTION STILL, bleeding off   │ │
│                                 │ right + bottom. Generated stage-light│ │
│                                 │ texture sits BEHIND THE TYPE, not the│ │
│                                 │ photograph.                          │ │
├───────────┬───────────┬─────────┴─┬────────────────────────────────────┴─┤
│ 📋 DESK   │           │           │                                      │
│    90     │    12     │   3–18    │  Stage-Ready Guarantee               │
│   days    │  weeks    │   ages    │  Not ready? We keep coaching.        │
└───────────┴───────────┴───────────┴──────────────────────────────────────┘
```

**Emotional bet:** *anticipation.* A venue sells a season; a school sells
enrolment. Anticipation converts better and costs nothing to manufacture, because
the 90-Day Stage Program is already a season with a dated climax.

---

### Concept B — **The Promise, Specified** (Modern Academy)

A light hero. 7/5 asymmetric split — copy left, a real photograph right in a 4:5
crop. The promise is stated at `display-lg` in normal width, immediately
substantiated by the same four-fact bar, which here is the hero's structural
partner rather than its base.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 📋 DESK                                          ┌────────────────────┐  │
│  THE 90-DAY STAGE PROGRAM                        │                    │  │
│                                                  │   REAL STUDENT     │  │
│  In 90 days, your child        ← display-lg      │   PHOTOGRAPH       │  │
│  takes a stage.                  n-900, 2 lines  │   4:5 portrait     │  │
│                                                  │                    │  │
│  Two classes a week — one for   ← body-lg        │   Load-bearing:    │  │
│  skill, one for the band.         n-600, 68ch    │   the hero does    │  │
│  Week 12 they play for you.                      │   not work without │  │
│                                                  │   it.              │  │
│  [ Book a Trial — $25 ]  See the 12 weeks →      └────────────────────┘  │
├───────────┬───────────┬────────────┬─────────────────────────────────────┤
│    90     │    12     │    3–18    │  Stage-Ready Guarantee              │
└───────────┴───────────┴────────────┴─────────────────────────────────────┘
```

**Emotional bet:** *relief.* The parent stops auditing and starts planning.

---

### Concept C — **Cold Open** (Cinematic)

No hero in the conventional sense. A near-empty first frame that behaves like the
opening seconds of a film: a full-bleed, heavily under-lit photograph, almost
nothing visible, and one line of type low in the frame — the parent's own
sentence, not the school's.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                                                                          │
│        She sings constantly at home.        ← display-md, n-0            │
│        In front of anyone else, nothing.      low-left in frame          │
│                                                                          │
│   FULL-BLEED, HEAVILY UNDER-LIT. The frame is mostly darkness.           │
│   ──────────────────────                                                 │
│   SOUTH DADE MUSIC              scroll ↓    ← minimal chrome only        │
└──────────────────────────────────────────────────────────────────────────┘
```

**Emotional bet:** *recognition, then ache.* The parent sees their own life
before they see a school.

---

### Evaluation against brand strategy

Weights reflect what determines success for *this* homepage.

| Criterion | Wt | **A · Bill** | **B · Specified** | **C · Cold Open** |
|---|---:|---:|---:|---:|
| **Buildable at launch** (assets that exist) | 20 | **10** | 4 | 1 |
| Fit to product truth (a stage, dated) | 15 | **10** | 7 | 9 |
| Confidence Parent — stages 1–2 (Ache → Hope) | 15 | 8 | 6 | **10** |
| Scholarship Family — procedural clarity | 10 | 7 | **9** | 3 |
| **Teen veto survival** | 10 | **9** | 4 | **9** |
| LCP / Core Web Vitals | 10 | **9** | 7 | 4 |
| Accessibility | 10 | 7 | **10** | 4 |
| Differentiation in market | 10 | 9 | 4 | **10** |
| | | | | |
| **WEIGHTED TOTAL** | 100 | **87** | 62 | 61 |

### Why Concept A wins — and it is not close

**1. It is the only concept that can be built on launch day.**

This is decisive and it is a fact about the calendar, not a matter of taste.
`09-image-strategy.md` §1 and gate **I-1**: all 18 genuine photographs depict
identifiable minors and **not one has a photo release on file.** On launch day
the homepage may have **zero** consented photographs.

- **Concept B is load-bearing on a photograph.** Remove it and the 5-column side
  of a 7/5 split is empty. The hero doesn't degrade — it breaks.
- **Concept C is impossible.** It requires a purpose-shot, heavily-graded
  cinematic frame that has never been captured, and its whole grammar is
  photographic.
- **Concept A needs type and light.** A poster tradition has sold theatre for two
  centuries on exactly that budget. The generated stage-light texture already
  exists and is reviewed (`homepage-hero-stage-light.jpg`).

**2. It resolves the design system's central tension, which is the hardest
constraint in the project.** `04-design-system.md` §0: *a 6-year-old's parent
must find it warm; a 15-year-old must not find it embarrassing.* Theatre is
credible to a teenager and warm to a parent. Concept B reads as **school** —
precisely what the teen (`03-user-journey.md` §4) is checking for and will veto.

**3. It carries the fact bar without becoming a brochure.** The strongest idea in
Concept B is not its layout — it is the **welding of promise to proof in one
screen**. That idea transplants into A intact, and in A it does more work,
because the light bar arriving under a dark poster teaches the parent the site's
entire information architecture in one gesture: *dark is the promise, light is
what you can act on.*

**4. It protects LCP.** The hero's LCP element is a headline and a texture, not a
3000px photograph. `05-motion-system.md` §15 requires LCP < 2.5s on 4G and never
JS-dependent. Concept C makes a large graded photograph the LCP element on the
device where the decision is actually made.

### What A gives up, honestly

Concept C's opening line — *"She sings constantly at home. In front of anyone
else, nothing."* — is the most emotionally accurate sentence available to this
project, and A's hero does not use it. **That is a real loss, and it is
recovered:** the line becomes §2, the first thing below the fold, arriving as a
title card. The parent gets the poster first and the recognition second, which
sequences *aspiration → recognition* rather than the reverse. On balance this is
better for a cold visitor who does not yet know what the site is.

### The refinement that makes the choice safe: a two-state hero

The hero is designed **once**, for two asset states, so it never needs
redesigning when gate I-1 closes.

| | **State 1 — Launch** (no consented photography) | **State 2 — Post-I-1** |
|---|---|---|
| Right two-thirds | Generated stage-light texture, full-bleed, beams raking from upper right | Production still enters, bleeding off right + bottom; texture recedes behind the type only |
| Type position | Unchanged — left-hung, 3 lines | Unchanged |
| Fact bar | Unchanged | Unchanged |
| Eyebrow | `THE 90-DAY STAGE PROGRAM` | `SEASON · CYCLE 12 · SHOWCASE [DATE]` ⚠️ gate I-4 |
| Light sweep | Runs across the texture | Runs across the photograph — *the spotlight finding the performer* |

**Neither state is a placeholder for the other.** State 1 must be good enough to
launch and to stay indefinitely.

---

## 3. The section order

Twelve movements. The rhythm alternates rooms, tightening toward the Desk as the
parent approaches a decision — which is `05-motion-system.md` §17 expressed as
page structure rather than as a motion budget.

| # | Section | Room | Journey stage (`01` §6) | Job |
|---|---|:---:|---|---|
| **1** | **The Bill** — hero + fact bar | 🎭→📋 | 1 Ache → 2 Hope | Name the promise; substantiate it in the same screen |
| **2** | **The Reframe** | 🎭 | 1 → 2 | *"That's not shyness. That's a skill she hasn't been taught yet."* The persuasive hinge |
| **3** | **The 90-Day Journey** ★ | 🎭 | 2 Hope | **The signature.** Compress 90 days into one scroll |
| **4** | **The 12 Weeks, published** | 📋 | 2 → 3 | The Journey's claims as a readable table a parent can diary |
| **5** | **The Ladder** — the method | 🎭 | 2 Hope | Answer *"what if she's too shy?"* out loud ⚠️ B-3 |
| **6** | **Who teaches your child** | 📋 | 3 Scrutiny | Faces, names, credentials ⚠️ B-7 |
| **7** | **Evidence** — showcase | 🎭 | 3 Scrutiny | Proof it happened ⚠️ I-1 · I-4 |
| **8** | **In their words** | 📋 | 3 Scrutiny | 14 verbatim reviews, source-badged |
| **9** | **What it costs** | 📋 | 4 Arithmetic | Remove every unknown ⚠️ B-8 |
| **10** | **The door in** | 📋 | 4 Arithmetic | Step Up, bilingual, from age 3 |
| **11** | **The turn** | 🎭 | 6 Pride | The protected line. The real product |
| **12** | **The guarantee + start** | 📋 | 5 Commitment | Risk reversal, then one CTA |

```
Rhythm:  🎭📋 · 🎭 · 🎭 · 📋 · 🎭 · 📋 · 🎭 · 📋 · 📋 · 📋 · 🎭 · 📋
         ╰─ persuade ─╯   ╰ prove ╯   ╰──── decide ────╯  ╰ feel ╯ ╰ act ╯
```

### Why the turn (§11) sits *after* the price

Conventional pages end on emotion. This one ends on emotion **and then a
decision surface**, because §11 is not a closing flourish — it is the answer to a
question the price raises. A parent who has just read a number is asking *"is it
worth it?"* The protected line answers exactly that:

> *"Because once they realize they can get through something that feels scary, it
> changes how they approach everything else."*

Placed before the price it is a nice sentiment. Placed after it, it is a
justification. `01-brand-strategy.md` §2 identifies this as the single best
sentence on the current website; this is the position where it does the most work.

### Why twelve sections and not six

The instinct to shorten is right in general and wrong here. Phase 2's homepage is
long *and* empty — it renders five programme cards three times and twelve
testimonials eighteen times, so length signals padding. This page is long because
**each section retires one documented objection** (§1 table, and
`03-user-journey.md` §3). Nothing repeats.

**Scroll budget:** ≈ 850vh desktop, ≈ 700vh mobile. §3 accounts for ~250vh of
that on desktop and is user-paced.

---

## 4. Register map and the transitions between rooms

| Boundary | From | To | Treatment |
|---|---|---|---|
| §1 hero → fact bar | 🎭 | 📋 | **Hard edge.** No fade. The parent must feel the change, because this is where they learn the language |
| §2 → §3 | 🎭 | 🎭 | Continuous |
| §3 → §4 | 🎭 | 📋 | **Houselights.** Ground cross-fades over ~500ms as §4 crosses 80% viewport. The emotional payoff hands off to the readable structure |
| §4 → §5 | 📋 | 🎭 | Houselights down |
| §5 → §6 | 🎭 | 📋 | Houselights up |
| §6 → §7 | 📋 | 🎭 | Houselights down — the proof layer is the one place photography leads |
| §7 → §8 | 🎭 | 📋 | Houselights up, and they **stay up** for §8–§10 |
| §10 → §11 | 📋 | 🎭 | Final dim. One section only |
| §11 → §12 | 🎭 | 📋 | Final houselights. The page ends in the light, at a decision |

**Six transitions, not twelve.** §8–§10 stay in one room deliberately: the parent
is doing arithmetic across three sections and a luminance change mid-calculation
would be an interruption, not a signal.

⚠️ Every ground-luminance transition carries a flash-safety obligation — ≥500ms,
never repeating, disabled under reduced motion, verified against the WCAG 2.3.1
three-flash threshold. Specified in [`03-motion-map.md`](./03-motion-map.md) §7.

---

## 5. CTA hierarchy for the whole page

Three tiers per `02-information-architecture.md` §10. **One Tier-1 per viewport,
never two.**

| Tier | CTA | Appears | Notes |
|---|---|---|---|
| **1** | **Book a Trial — $25** | §1 hero · §12 close · sticky bar · header | ✅ **The $25 is publishable** — see §7 below |
| **2** | **Come watch a showcase** | §1 secondary · §7 · §11 | The zero-risk entry. ⚠️ Blocked on I-4 |
| **2** | **See the 12 weeks** | §3 release · §4 | An internal jump, not a route change |
| **2** | **Check if you qualify** | §10 | Step Up guided path |
| **2** | **See all pricing** | §9 | ⚠️ B-8 |
| **3** | Call · WhatsApp · Directions · Español | Sticky bar · footer | ⚠️ WhatsApp claimed in copy, no link exists — do not ship until it does |

**The trial CTA is repeated exactly three times** on the page plus the persistent
header and mobile bar. Phase 2 found **30+ CTAs across four labels resolving to
one undifferentiated widget**; repetition without differentiation is the failure
being corrected, so every instance here carries the same label, the same price,
and a different `sourceContext` for attribution.

---

## 6. Accessibility posture

The academy serves Unique Abilities scholarship students. Accessibility is a
market requirement (`04-design-system.md` §0 principle 6), and the homepage is
where it is most at risk because it carries the most motion and the most dark
ground.

| Commitment | Where it bites on this page |
|---|---|
| **One `<h1>`**, levels never skipped | §1 only. §2's title card is a `<p>` at display scale |
| **No prose block over 400 words on dark** | §2, §3, §5, §7, §11 are all short by construction; §11 is one sentence |
| **Every pinned sequence has four degradation paths** | §3 and §5 — below `lg`, reduced motion, no JS, low-end device |
| **Full information in every degraded state** | The 12-week structure is readable as a table (§4) regardless of §3 |
| **Room transitions are flash-safe** | ≥500ms, once, disabled under reduced motion |
| **Nothing essential behind hover** | §7 gallery captions always visible on touch |
| **Focus never reduced, never animated** | Including inside the pinned sequence |
| **Contrast verified against the real asset** | §1 type sits on a generated texture — assumed ratios are not acceptable |

---

## 7. Corrections to earlier phases

Two, found while reading the source content at homepage resolution. Both change
what ships.

### 7.1 The $25 trial price **is** publishable — Phase 4 was over-cautious

Phase 4 set `primaryCta.priceSuffix = null` behind gate **B-8**. That was wrong.
B-8 blocks **tuition** pricing. The trial fee is a verbatim extracted fact,
published on the live site today, in `faqs.json` and `home.md`:

> *"It is a 90-Day Stage Experience Preview. We hold your spot for **$25**, which
> is credited to your tuition upon enrollment."*

**Action:** the primary CTA reads **"Book a Trial — $25"** everywhere, and §9
carries the crediting condition. This matters commercially:
`03-user-journey.md` §3 ranks *"a trial that is cheap and clearly explained"* as
the sixth-strongest conversion trigger, and it is the only one of the six that is
not blocked by a gate.

⚠️ Still blocked by B-8: monthly tuition, per-format pricing, the camp deposit
amount.

### 7.2 The homepage must not repeat the unconditional promise

Three claims are live simultaneously and cannot all be true (`01` §8, gate B-4):

- Footer, sitewide: *"every student performs in a live showcase within 90 days"* — **unconditional**
- `/performances`: students perform *"when they feel ready"* — **conditional**
- The guarantee: *"if your child is **not prepared** to step on stage…"* — **concedes the unconditional claim is false**

**Action:** the hero H1 is **"In 90 days, your child takes a stage."** — a
promise about the programme's shape, not a universal quantifier over students.
The recommended compliant wording for the supporting line is pending B-4. Until
that gate closes, **no sentence on this page contains the words "every student."**

---

## 8. Decision gates, by section

Nothing below is an engineering blocker. Each is an owner decision that changes
what a section can say.

| Gate | Question | Sections blocked | Fallback if still open |
|---|---|---|---|
| **B-4** | Approve honest 90-day wording | §1, §3, §12 | Hero H1 as specified; supporting line omits quantifiers |
| **B-5** | Single brand name | §1 wordmark, schema | Type-set wordmark, "South Dade Music" |
| **B-3** | Confirm the Ladder's five rungs | §5 | §5 becomes *"How a first lesson works"* — a 3-step, unnamed version |
| **B-7** | Instructor names + permission | §6 | §6 becomes *"What happens in the room"* — process, not people |
| **B-8** | Tuition pricing | §9 | §9 ships with the trial ($25), age bands, session structure, and an honest *"tuition on request"* |
| **B-6** | Bilingual: build or drop | §10 | The Spanish claim is **removed**, not softened. One real Spanish review (Maria Carolina Linares) remains as evidence |
| **B-1** | Faith-affiliated or secular | §8 | Two religious reviews withheld from the homepage set |
| **I-1** | Photo-release consent | §1 state 2, §7 | Hero state 1; §7 becomes text-and-testimony proof |
| **I-4** | Next showcase date | §1 eyebrow, §7, all "watch a showcase" CTAs | Secondary CTA becomes *"See the 12 weeks"* |
| **M-3** | Showcase footage exists | §3 release moment | Release resolves to a still, or to the §4 table |

**Critical path to shipping this page: B-4, B-5, I-1.** Everything else has a
fallback that is honest and still converts.

---

## 9. What this page deliberately does not do

- ❌ **No auto-advancing carousel.** The current site has one; it is an accessibility and comprehension failure.
- ❌ **No repeated programme cards.** Phase 2 renders five cards three times. Here the programme grid does not appear on the homepage at all — the flagship gets §3–§4, and the rest is a nav concern.
- ❌ **No testimonial repetition.** Twelve reviews rendered eighteen times becomes ten rendered once.
- ❌ **No keyword copy.** *"Music Lessons Near Me"*, *"Kids Music Classes South Dade"* and *"Singing Lessons For Kids"* are banned from the page.
- ❌ **No instrument tile grid.** The current homepage carries seven unlinked tiles including a Keyboard tile with no destination.
- ❌ **No "Why choose us" numbered list.** Five generic adjectives; every competitor has them.
- ❌ **No mission statement block.** The extracted mission is a meta description that escaped.
- ❌ **No fabricated scarcity.** No seat counters without a real figure.
- ❌ **No stock photography of children.** Under any circumstance.

---

**Next:** [`02-section-specifications.md`](./02-section-specifications.md)
