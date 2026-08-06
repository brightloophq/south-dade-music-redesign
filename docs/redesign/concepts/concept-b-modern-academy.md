# Concept B — The Modern Academy

**Phase:** 3.75 — Creative Direction
**Date:** 2026-08-06
**One line:** Not a mood — a **method, published**. The site looks like a well-run institution that has nothing to hide: bright, structured, specific, and priced.
**Depends on:** `01-brand-strategy.md` · `02-information-architecture.md` · `04-design-system.md` · `08-content-model.md`

---

## 1. Design philosophy

Concept A bets that a parent decides emotionally. **Concept B bets that a
parent decides emotionally and then needs permission to act — and that Phase 2
proved the permission layer, not the emotion layer, is what is actually broken.**

Look at what the extraction found. No price for any lesson product. Not one
instructor named anywhere on the site. No eligibility criteria, application
steps or document list on the scholarship page. A $25 trial charge disclosed on
two pages out of twenty-six. A non-refundable camp deposit whose amount is
published nowhere. Both event URLs 404.

That is not a site with an atmosphere problem. That is a site that **cannot
answer a question.** `01-brand-strategy.md` §6 says it plainly: the current site
fails at stages 3, 4 and 5 of the parent journey — Scrutiny, Arithmetic, and
Commitment. Every one of those is an information failure.

**Three convictions:**

1. **Clarity is the emotional experience.** For a parent choosing where to send
   a child twice a week, the feeling of *"these people are organised"* is not a
   lesser feeling than awe. It is the one that closes.
2. **Structure is the aesthetic.** The 90-Day Stage Program has weeks, tracks,
   rungs and a guarantee. That structure is genuinely unusual in this market and
   it can be *drawn*. A syllabus, rendered beautifully, is a competitive weapon.
3. **Nothing is behind an interaction.** Prices, dates, ages, names and terms
   are on the page, in the light, at first paint.

**The thesis in one sentence:** *We win by being the only academy in South
Miami-Dade whose website answers every question a parent has before they have to
call and ask.*

---

## 2. Emotional journey

The arc is not tension-and-release. It is **doubt progressively removed**. Each
homepage section retires one objection, and the parent's confidence accrues.

| Section | The objection in their head | What removes it | Journey stage (`01` §6) |
|---|---|---|---|
| **Hero** | *"Is this just lessons again?"* | A dated, specific promise with a number | 1 · Ache → 2 · Hope |
| **The method** | *"How is that even possible for a shy kid?"* | The Exposure Ladder, drawn, five named rungs | 2 · Hope |
| **The 12 weeks** | *"What actually happens, and when?"* | A published syllabus | 2 → 3 |
| **The people** | *"Who will be in the room with my child?"* | Named teachers, credentials, faces | 3 · Scrutiny |
| **The proof** | *"Has this ever actually happened?"* | Dated showcases, verbatim reviews | 3 · Scrutiny |
| **The numbers** | *"What does it cost?"* | A price table. Every product. No 'contact us' | 4 · Arithmetic |
| **The door in** | *"Can we afford it / will my kid be separated out?"* | Step Up steps, bilingual, ages from 3 | 4 · Arithmetic |
| **The guarantee** | *"What if we're wrong?"* | Risk reversal, stated flat | 5 · Commitment |
| **Start** | *"Okay — how?"* | One step, price in the label | 5 · Commitment |

**The emotional payoff is relief, not awe.** By the price table the parent has
stopped auditing and started planning. That is a different — and for the
Scholarship Family segment, a *better* — conversion mechanism than atmosphere.

---

## 3. Hero concept

**"The Promise, Specified."** A light hero that states the offer and immediately
substantiates it with four hard facts. No full-bleed image, no dark drama.

```
┌───────────────────────────────────────────────────────────────────────┐
│  [LOGO]   90-Day Program  Programs  Lessons  Camps  Scholarships      │
│                                    About   EN|ES  [ Book a Trial—$25 ]│
├───────────────────────────────────────────────────────────────────────┤
│                                                        ┌────────────┐ │
│  THE 90-DAY STAGE PROGRAM            ← label, velvet   │            │ │
│                                                        │  REAL      │ │
│  In 90 days, your child             ← display-lg,      │  STUDENT   │ │
│  takes a stage.                       n-900, 2 lines   │  PHOTO     │ │
│                                                        │  4:5       │ │
│  Two classes a week — one for skill, ← body-lg, n-600  │            │ │
│  one for the band. Week 12 they play   68ch max        │            │ │
│  for you.                                              └────────────┘ │
│                                                                       │
│  [ Book a Trial — $25 ]   See the 12 weeks →                          │
│                                                                       │
├───────────┬───────────┬────────────┬──────────────────────────────────┤
│    90     │    12     │    3–18    │  Stage-Ready Guarantee           │
│   days    │  weeks    │    ages    │  Not ready? We keep coaching.    │
└───────────┴───────────┴────────────┴──────────────────────────────────┘
```

**Rules:**

- **7/5 asymmetric split** at `lg`+ (`04-design-system.md` §4 archetype 2).
  Never 50/50.
- **The fact bar is part of the hero, not a section below it.** It is visible
  without scrolling on desktop and immediately on first scroll on mobile. This
  is the concept's core move: the promise and its substantiation arrive together.
- **The guarantee appears above the fold.** It is the strongest risk-reversal
  the business owns and it currently appears on 2 pages of 26.
- **Numerals are `stat` tokens, tabular.** They may count up once
  (`05-motion-system.md` §7); the guarantee text never animates.
- ⚠️ Hero copy blocked on **gate B-4** (the 90-day promise wording).

---

## 4. Navigation behaviour

**The header is a control panel, not a marquee.** Solid from first paint —
`n-0` with an `n-200` hairline. It does not transform over a hero, because there
is no dark hero to transform over. Predictability is the point.

| Feature | Behaviour |
|---|---|
| Height | 80px → 64px on scroll, no colour change |
| Mega-menu | Opens on 150ms hover intent and on focus/click. `n-0` panel, `elev-3`, `n-200` hairline |
| Trial CTA | `spot-500` fill, always present, never scrolls away |
| Language toggle | **EN\|ES as a visible segmented control**, not a globe icon — a Spanish-speaking parent must see their language without decoding a symbol |
| Breadcrumbs | On every page 3+ levels deep, `BreadcrumbList` schema |

**The distinguishing feature: the mega-menu carries facts.** Where Concept A's
menu is a programme insert, Concept B's is a **directory**. Each programme entry
shows ages, format and price-from inline:

```
PROGRAMS ▾
┌─────────────────────────────────────────────────────────────────────┐
│  90-Day Stage Program ★    Ages 6–18 · 2×/week · 12 weeks · from $X  │
│  Private Lessons           Ages 3+   · 1×/week · ongoing  · from $X  │
│  Group Lessons             Ages 6–14 · 1×/week · ongoing  · from $X  │
│  Band Builders             Ages 10–18· 1×/week · ongoing  · from $X  │
│  Early Childhood           Ages 3–6  · 1×/week · ongoing  · from $X  │
├─────────────────────────────────────────────────────────────────────┤
│  Not sure which? Take 30 seconds →        All pricing →              │
└─────────────────────────────────────────────────────────────────────┘
```

A parent can compare five products without leaving the menu. ⚠️ Requires gate
B-8 (pricing) to close — until then the price column is omitted rather than
faked.

**Sidebar navigation on deep pages.** Long content (`/scholarships`, `/faq`,
`/terms`) gets a sticky in-page table of contents at `lg`+. This is the concept
that treats long-form as a first-class citizen rather than a problem.

---

## 5. Homepage hierarchy

Ten sections, light throughout, with **two dark punctuation moments** used
scarcely enough that they land.

| # | Section | Ground | Job |
|---|---|---|---|
| **1** | Hero + fact bar | Light | Promise, substantiated |
| **2** | **The Gradual Exposure Ladder** | Light | Five named rungs, drawn as a diagram. The method made visible ⚠️ gate B-3 |
| **3** | **The 12 weeks** — published syllabus | Light | Week-by-week table. "Weeks 1–10 skill · Week 11 the class · Week 12 you" |
| **4** | **Showcase** — the payoff | **Dark** ◆ | Punctuation 1. Full-bleed photography, minimal type. Earns its drama by being the only dark thing so far |
| **5** | **Your teachers** | Light | Named, credentialed, faces ⚠️ gate B-7 |
| **6** | **What it costs** | Light | A real price table. Every product, every format |
| **7** | **Scholarships & access** | Light | Step Up PEP + UA, steps, Spanish, from age 3 |
| **8** | **In their words** | Light | 14 verbatim reviews, source-badged |
| **9** | **The guarantee** | **Dark** ◆ | Punctuation 2. One sentence, large, static, no ornament |
| **10** | Start | Light | One CTA, price in label, terms disclosed above the form |

**The structural argument:** sections 2, 3 and 6 do not exist on the current
site in any form. They are the three highest-value additions in the entire
project, and this concept makes them the spine of the homepage rather than
buried interior pages.

**Two dark sections only.** Contrast is a currency; Concept B spends it twice.

---

## 6. Typography

Same families as the system (`04-design-system.md` §2) — **Archivo** display,
**Inter** body — used with restraint rather than drama. No expanded width axis.

| Element | Treatment |
|---|---|
| Hero H1 | Archivo 700, **normal width**, `display-lg` 34→64px, −0.025em |
| Section heads | Archivo 600, `display-md` 30→48px |
| Card titles | Archivo 600, `heading-md` |
| Body | Inter 400, `body-md` 16→17px, 68ch, 1.6 (1.7 ES) |
| **Data / tables** | Inter 400–600, **tabular numerals throughout** |
| Eyebrows | `label` — 13px, 600, 0.08em, uppercase, `velvet-700` |
| Stats | Archivo 700 tabular, `stat` 48→96px |

**The typographic signature is the data set, not the display set.** Prices,
weeks, ages, times and capacities are typeset with real care — aligned decimal
points, consistent units, tabular numerals so nothing shifts. That sounds
unglamorous and it is exactly what makes an institution look competent.

### Rules specific to this concept

- **Never use display type where a table would be clearer.** This concept's
  failure mode is dressing up data as marketing.
- **Prose max 68ch, always.** Long-form is a primary surface here.
- **Heading hierarchy is strictly semantic** — Phase 2 found H2 used as body
  lead-ins ("We offer", "Key benefits include") and H1 rendered 2–3× per page.
  Enforced in CI (`04` §2).
- **Spanish is the easy case in this concept.** Normal-width type at moderate
  sizes absorbs +35% expansion without incident. This is a genuine advantage
  over Concept A.

---

## 7. Colour palette

**System defaults, held.** `04-design-system.md` §1's 60/25/10/5 ratio was
written for this concept.

| Role | Token | Use |
|---|---|---|
| Page ground | `n-50` `#FAF9F7` | The default. Warm, not white |
| Cards | `n-0` | Raised surfaces |
| Borders, rules | `n-200` `#E5E2DC` | Heavy use — the grid is visible |
| Body text | `n-900` `#171613` | 17:1 |
| Secondary text | `n-600` `#5A564E` | 7.3:1 |
| **Links** | `velvet-700` `#6E1631` | 11.7:1 on white. The concept's accent voice |
| Primary CTA | `spot-500` fill + `stage-950` text | 9.2:1 |
| Punctuation grounds | `stage-950` | Sections 4 and 9 only |
| Functional | `success-600` `warn-600` `error-600` `info-600` | Capacity, deadlines, validation |

**Amber is rationed hard.** In a light-dominant concept `spot-500` can only be
a fill — it fails contrast as text on light (2.0:1) and is banned. That
constraint is a gift: it means the CTA is the only amber thing on the page, and
therefore unmissable.

**`velvet-700` does the expressive work.** Links, eyebrows and secondary
buttons carry the brand's warmth on light grounds without touching the
banned amber-on-white combination.

**Functional colour is used properly here** — this is the only concept with
enough data surfaces (capacity, deadlines, seat counts, eligibility status) for
`success` / `warn` / `info` to earn their place.

---

## 8. Photography direction

Photography is **evidence in a documentary register**, not atmosphere.

| Attribute | Direction |
|---|---|
| Light | Warm, practical, **daylight-led**. Window light in the studio register, not stage spill |
| Register mix | Heavily weighted to **studio** and **community** (`04` §13) — the warm, well-lit, multiple-people registers. Stage register reserved for section 4 |
| Framing | Mid-shots showing context — a teacher's hand guiding, a room, an instrument in use |
| Treatment | Ungraded beyond colour correction. **Crops are square-ish and honest.** No bleeding off edges, no cinematic letterboxing |
| Placement | Inside cards, inside the grid, with captions. Photography is *content*, and content has a caption |
| **Captions** | **Every feature photograph carries a visible caption with date and context.** This is a concept-defining rule |

**The caption rule is the whole idea.** A photograph with *"Winter showcase,
March 2025 — Band Builders ensemble"* underneath it is proof. The same
photograph full-bleed with no caption is decoration. Phase 2 found six undated
showcase photographs; this concept's answer is to date them or drop them.

⚠️ **This concept is the hungriest for photography of the three** — it needs
teacher portraits (gate B-7), dated showcase sets (gate I-4), and studio
sessions across seven instruments. Consent (gate I-1) blocks all of it.
**This is Concept B's principal risk**, and it is the mirror image of Concept
A's principal advantage.

---

## 9. Gemini-generated decorative assets

**Deliberately minimal.** In a concept whose thesis is *published, verifiable
structure*, generated decoration is close to a contradiction. The rule here is
stricter than the style guide requires.

### Used

| Template | Use | Notes |
|---|---|---|
| `decorative-section-background` | Very subtle warm texture on `n-50` grounds, ≤3% presence | The light variant, as authored |
| `scholarship-graphic` | `/scholarships` hero ground | Deliberately plain — the template was written for exactly this |
| `abstract-musical-composition` | Open-graph / social cards only | Not on-page |
| `stage-light-texture` | **Sections 4 and 9 only** — the two dark punctuation moments | The one place drama is licensed |
| `camp-campaign-graphic` | `/camps` campaign card ground | Never the selling image |

### New templates required

1. **`data-field-ground`** — an extremely quiet warm neutral field with a faint
   baseline structure, for the pricing and syllabus tables. ≤2% opacity.
2. **`diagram-substrate`** — a soft warm ground for the Exposure Ladder and
   12-week diagrams, so the diagrams sit *on* something rather than floating.

### Not used, on principle

`hero-atmospheric-background` is **not** used on the homepage. A generated
atmospheric hero in a concept whose promise is *"we show you the real thing"*
undercuts the argument on the first screen.

**Volume estimate: 3–5 approved assets.** Lowest of the three concepts, by
design.

---

## 10. GSAP opportunities

The smallest motion budget of the three, and the most defensible one.
`05-motion-system.md` §17 is explicit: motion intensity is inversely
proportional to proximity to a decision. Concept B is *all* decision surfaces.

| # | Moment | Technique | Budget |
|---|---|---|---|
| **1** | **The Gradual Exposure Ladder** ★ | Pinned, scrubbed, 5 rungs illuminating in sequence, previous rungs dimming but staying visible so progression is legible (`05` §6 pin 2) | **40%** |
| **2** | **The 12-week syllabus** | Scroll-triggered, **not** pinned. Week rows reveal in grouped stagger; the week-11 and week-12 rows are typographically distinguished | 20% |
| **3** | Counters | 90, 12, 3–18 in the fact bar — once, `ease-spot`, tabular. **Never the price table** | 12% |
| **4** | Card grid reveals | `fade-rise`, `stagger-base`, grouped beyond 8 items | 10% |
| **5** | Table row reveals | Very short `fade-rise`, tight stagger, once. Pricing table is **exempt** — it renders static | 8% |
| **6** | Gallery FLIP → lightbox | Section 4 showcase only | 10% |

**The signature moment is the Ladder, not the Timeline.** This is a meaningful
divergence from `05-motion-system.md` §1, which nominates the 90-Day Timeline.
The argument: in a concept built on published structure, the *method* is the
differentiator and the *schedule* is a table. A table does not need to be
animated to be persuasive — it needs to be accurate.

⚠️ The Ladder is blocked on **gate B-3** (the five rungs are a reconstruction
and must be owner-confirmed). If B-3 fails, this concept loses its signature
moment and has no fallback of equal weight. **That is a real structural risk.**

**Rejected here:** hero light sweep (no dark hero), curtain reveals (theatrical
register belongs to Concept A), parallax anywhere.

---

## 11. Mobile experience

**This is the concept that is best on a phone**, and mobile is where a parent
actually researches this decision.

| Surface | Behaviour |
|---|---|
| Hero | Single column. H1 → sub → CTAs → photo → fact bar as a 2×2 grid |
| Fact bar | 2×2 on `xs`, 4-across from `md`. Never horizontally scrolled |
| **Pricing table** | **Transforms to stacked cards below `md`** (`04` §10). Never horizontal-scrolled — this is a hard rule and the single most common failure in competitor sites |
| Syllabus | Vertical week list, sticky week-number rail |
| Ladder | **Not pinned.** Five stacked steps, `fade-rise` each |
| Mega-menu | Full-screen `stage-900` drawer, accordion, facts retained inline |
| Sticky action bar | After 25% scroll — `xl` button + call. Hides on form focus |
| Long-form | In-page ToC collapses to a sticky "Jump to" control |

**Why it wins on mobile:** light grounds, high contrast, no heavy decorative
imagery, no pinned sequences, minimal JS. LCP is a real photograph or a
headline — never a generated texture. This concept has the best chance of
hitting the `05` §15 budget of LCP <2.5s on 4G.

---

## 12. Interaction philosophy

> **Nothing is hidden. Nothing surprises. Everything responds immediately.**

| Principle | Expression |
|---|---|
| **Disclosure over reveal** | Accordions, tabs and filters expand *content that was announced*. Nothing is discovered by accident |
| **Progressive disclosure in forms only** | Camp booking steps through dates → block → child → deposit (`04` §9 rule 10). Marketing content never steps |
| **Immediate acknowledgement** | Every interaction shows a state change within 100ms |
| **Filters and comparison are first-class** | `/lessons` filters by age and instrument; `/pricing` compares formats. This is the only concept with genuine tool-like interaction |
| **Hover is a courtesy, never a requirement** | `@media (hover: hover)`. No hover-only content, ever (WCAG 2.2) |
| **The click target never moves** | Shadow and colour, not translation |

**The recommender.** `02-information-architecture.md` §2 calls for a *"Not sure
which programme? → Take 30 seconds"* path. In Concept B this becomes a real,
small, four-question tool that outputs a named recommendation with a price and
a booking link. It is the most differentiated interaction in the concept and it
is entirely on-brand: helpful, specific, procedural.

---

## 13. Conversion philosophy

**Remove every unknown, then ask once.** `01-brand-strategy.md` §6 stage 4 is
called *Arithmetic* for a reason.

| Tier | CTA | Framing |
|---|---|---|
| **1** | **Book a Trial — $25** | One per page. Price in the label, always |
| **2** | **See all pricing** | Unusually, a *link to a price list* is a Tier-2 conversion action here. It is the highest-intent click a doubtful parent makes |
| **2** | **Check if you qualify** | Step Up guided eligibility path |
| **2** | **Reserve a Seat — $X deposit** | Camp. ⚠️ Deposit amount must be published (gate B-8) |
| **3** | Call · Directions · Español | Persistent utility |

### The conversion mechanics that define this concept

1. **A `/pricing` page that lists every product.** It does not exist today for
   any product. It is the single highest-conviction addition in this concept.
2. **Terms above the form, never inside it.** The $25 charge, the
   non-refundable deposit, the make-up policy — stated before the parent starts
   typing.
3. **Intent captured at source** as a hidden field, so a $450 camp reservation
   and a free enquiry are finally distinguishable (`02` §10 rule 4).
4. **The comparison table as a conversion surface.** Parents comparing private
   vs group vs 90-Day is *good* — it means they are buying. Most sites hide this
   and force a phone call.

**The philosophical bet:** transparency converts better than persuasion for the
Scholarship Family segment, which `01` §5 identifies as *"the single largest
untapped demand pool on the site."* That family's blocking question is
procedural — *"do you take my scholarship and what do I actually have to do?"*
— and no amount of atmosphere answers it.

---

## 14. Accessibility implications

**This is the most accessible of the three concepts by a clear margin**, which
matters commercially: the academy serves Unique Abilities scholarship students.

### Where this concept is strong

- **Light grounds with `n-900` text: 17:1.** No halation, no dark-mode prose
  fatigue, best-case for dyslexic and astigmatic readers
- Minimal motion — fewer vestibular triggers, and the reduced-motion path is
  nearly identical to the default
- **Information is text, not imagery.** Prices and schedules in real tables with
  `<caption>` and `<th scope>` are directly navigable by screen reader
- Structural semantics are the design — heading hierarchy, tables, lists
- Long-form is designed for, not tolerated
- No dark/light register flipping, so no flash-threshold risk

### Where care is still required

| Risk | Mitigation |
|---|---|
| Data density | Tables need `<caption>`, scope, and a stacked-card mobile transform. Never a scroll container |
| The two dark punctuation sections | Full contrast re-verification; they are the only inverted surfaces |
| The recommender tool | Must be keyboard-complete, announce results in a live region, and be skippable — never a gate to the content |
| Filters | Announce result counts; never rely on colour alone for active state |
| `spot-500` | Fill only, never text on light. Enforced at the token |

**Bilingual advantage.** Normal-width type plus table-based layout absorbs +35%
Spanish expansion better than any other concept here.

---

## 15. Advantages

1. **It fixes what is actually broken.** Phase 2's failures are informational,
   and this concept is an information design.
2. **Best-in-class for the Scholarship Family** — `01` §5's largest untapped
   segment, whose questions are entirely procedural.
3. **Lowest risk of the three.** Few ways to execute this badly. It degrades
   into "clean and clear," not into "amateur."
4. **Best mobile and best Core Web Vitals.** Light, low-JS, no heavy textures.
5. **Most accessible** — a market requirement here, not a checkbox.
6. **Easiest bilingual build.** ⚠️ Gate B-6 is expensive in every concept, but
   cheapest in this one.
7. **Best long-term maintainability.** A component system a non-designer can
   extend without breaking the look.
8. **Lowest generated-asset load** — 3–5 assets, minimal review overhead.
9. **SEO-structurally strongest.** Real tables, real schema, deep content — the
   architecture `06-seo-strategy.md` wants.

---

## 16. Weaknesses

1. **It does not create desire.** It converts a parent who has already decided
   to consider you. It is weak at the top of the funnel where the *Ache* stage
   lives — and `01` §12's emotional spine (Recognition → Reframe) is the
   business's most persuasive asset.
2. **It is not memorable.** A parent comparing four academies on a Tuesday
   evening will remember the one that looked like a theatre, not the one that
   looked like a well-organised school.
3. **The teen veto is a live risk.** `01` §5 warns the 13–17 segment *"will veto
   anything that looks like a children's website."* Light, systematic and
   institutional risks reading as *school* — which is precisely what a teenager
   is trying to escape on a Thursday evening.
4. **It is the most blocked concept.** Its spine is pricing (gate B-8),
   teachers (B-7), the Ladder (B-3) and dated events (I-4). **Without those
   gates it is an empty frame** — a beautifully structured page with nothing to
   put in it.
5. **Hungriest for photography** — teacher portraits, seven instrument sets,
   dated showcases, all consent-blocked (I-1).
6. **Risks looking generic.** The Stripe/Linear clarity idiom is now the default
   of every well-funded SaaS site; it reads competent but not distinctive.
7. **Sells the wrong thing.** `01` §0's core insight is that the business
   delivers *transformation* and sells it as a *commodity*. A syllabus is closer
   to the commodity end.

---

## 17. Complexity

**Overall: Medium.**

| Dimension | Rating | Why |
|---|---|---|
| Layout engineering | **Medium** | More templates and more states, but all conventional |
| Motion engineering | **Low-Medium** | One pinned sequence, otherwise reveals |
| Data/table components | **Medium-High** | Pricing comparison, syllabus, capacity, mobile transforms — the real work |
| Interactive tooling | **Medium** | The recommender and the filters are genuine features |
| Typography engineering | **Low** | No variable-width axis work |
| Asset production | **Low** | 3–5 generated assets |
| Accessibility QA | **Medium** | Highest baseline, so least remediation |
| **Content dependency** | **Very High** | The dominant risk. This concept *is* its content |

**The single hardest thing:** the pricing and comparison system — a table that
is genuinely usable on a 360px screen, translatable, screen-reader-navigable,
and maintainable by the business as prices change.

---

## 18. Estimated implementation effort

One senior front-end engineer with design support. Excludes content, photography,
copy and translation.

| Workstream | Effort |
|---|---|
| Design system tokens + light-first foundation | 1 week |
| Typography + data/numeral system | 0.5 weeks |
| Navigation — fact-carrying mega-menu, drawer, in-page ToC | 1.5 weeks |
| Homepage — 10 sections | 2 weeks |
| **Exposure Ladder** (pinned, scrubbed, degradation paths) | **1.5 weeks** |
| 12-week syllabus component | 1 week |
| **Pricing & comparison system** (incl. mobile transform) | **2 weeks** |
| Programme recommender tool | 1.5 weeks |
| Interior templates (programme, instrument, camp, scholarship, teachers, FAQ, policies) | 3.5 weeks |
| Forms and segmented booking flow | 2 weeks |
| Gallery + lightbox | 0.75 weeks |
| Generated-asset production and review | 0.25 weeks |
| Accessibility audit and remediation | 1 week |
| Performance tuning | 0.5 weeks |
| **Total** | **≈ 19 weeks** (~4.4 months) |

**Note the counter-intuitive result:** Concept B is *not* meaningfully cheaper
than Concept A. It trades motion and art-direction complexity for template
count, tooling and data-component work. Cheaper to *design*, similar to
*build*, and much more expensive to *fill with content*.

---

## 19. Competitive references

| Reference | What to take |
|---|---|
| **Stripe** (docs and pricing) | Data typography; how a price table becomes a persuasive surface |
| **GOV.UK Design System** | Procedural clarity, plain language, accessibility as default. **The reference for `/scholarships`** |
| **Linear** | Restrained modern grid; how to be systematic without being cold |
| **Khan Academy** | Educational structure made legible to a parent |
| **Outschool** | The closest true competitor pattern — filterable class discovery with prices, ages and formats visible |
| **Brilliant** | Progression as a visual system |
| **MIT OpenCourseWare** | Published syllabus as a trust artefact |
| **Monzo / Wise** | Financial transparency patterns — fee disclosure done as a feature |

**Anti-references:** SaaS landing pages with feature-grid-and-gradient
sameness; franchise lesson-chain sites (Music & Arts, School of Rock's
templated locale pages) whose clarity reads as corporate rather than local.

---

## 20. Why this concept would outperform a traditional music-school website

A traditional music-school site is also light and also organised — so this
concept's advantage is not the *style*, it is the **specificity**.

1. **It publishes what the category hides.** In this market, price is behind a
   phone call almost universally. A parent who can compare formats and costs at
   11pm without contacting anyone has been given something no competitor offers.
   That is a conversion advantage independent of design quality.
2. **It converts the Scholarship Family, whom nobody is serving.** `/step-up-accessibility/`
   currently has no eligibility criteria, no application steps, no document list
   and no link to Step Up for Students. A guided, bilingual, documented path is
   a *product*, and this concept is the one that can hold it.
3. **It makes the method visible.** The Gradual Exposure Ladder is currently one
   sentence in an FAQ. Drawn and named, it becomes the answer to *"what if my
   child is too shy?"* — the core market's central objection.
4. **It answers the objection the category can't.** *"We tried an activity and
   they quit after a month."* A published 12-week structure with a guarantee
   answers that concretely; "experienced, passionate teachers" does not.
5. **It wins the mobile evening-research moment**, which is where this decision
   is actually made — fastest, most legible, most complete.
6. **It is structurally better for search.** `06-seo-strategy.md` wants depth
   and structure, not repetition. This concept produces genuinely useful pages
   (pricing, syllabus, eligibility) that earn links and answer queries, replacing
   the current keyword-stuffing.

**The honest caveat:** this concept is only as good as the facts poured into
it, and today most of those facts are behind decision gates B-3, B-7, B-8 and
I-1. Concept B with closed gates is the most persuasive website in the market.
Concept B with open gates is an elegant empty shell — and it has no atmospheric
fallback to hide behind, which is exactly the fallback Concept A has.

---

**See also:** `concept-a-performing-arts.md` · `concept-c-cinematic-storytelling.md` · `concept-comparison.md`
