# Concept C — Cinematic Storytelling

**Phase:** 3.75 — Creative Direction
**Date:** 2026-08-06
**One line:** The website is a **documentary about ninety days in a child's life**. Scroll is the projector. The parent doesn't read the argument — they watch it happen.
**Depends on:** `01-brand-strategy.md` §12 · `05-motion-system.md` · `09-image-strategy.md` §11 · `image-style-guide.md`

---

## 1. Design philosophy

`01-brand-strategy.md` §12 contains a six-beat narrative — Recognition, Reframe,
Method, Structure, Guarantee, Belonging — that is, on the page, a genuinely
moving piece of writing. Concept A sets that story as a poster. Concept B sets
it as a syllabus. **Concept C is the argument that it should be told as a story,
in sequence, because a story is what it already is.**

The insight this concept runs on: the parent's problem is not informational, it
is *imaginative*. They cannot picture their shy eight-year-old on a stage. Every
list, table and testimonial asks them to *believe* it. A narrative sequence lets
them **watch** it — beat by beat, from the child who won't put her hand up to
the child who asks when the next showcase is.

**Three convictions:**

1. **Sequence is the medium.** Not sections stacked on a page — chapters that
   arrive in order and cannot be misread. The user controls pace; the site
   controls order.
2. **Show the transformation, don't assert it.** `01` §0 found the business
   sells transformation as a commodity. A commodity can be listed. A
   transformation has to be depicted over time.
3. **Chrome is the enemy.** Navigation, cards, borders and buttons all announce
   *"this is a website."* Strip them back so the imagery and the sentences carry
   the experience.

**The thesis in one sentence:** *A parent should arrive at the booking form
already having imagined their own child at week twelve — because we showed them
the whole ninety days on the way down.*

---

## 2. Emotional journey

A three-act structure, chaptered, with the parent as the viewer and their own
child as the implied protagonist.

| Chapter | Beat (`01` §12) | What the parent sees | What they feel |
|---|---|---|---|
| **00 · Cold open** | — | A dark, quiet frame. One line of type | Stillness. Attention |
| **01 · Recognition** | Beat 1 | *"She sings constantly at home. In front of anyone else, nothing."* | *"That's my kid."* Recognition, then ache |
| **02 · Reframe** | Beat 2 | *"That's not shyness. That's a skill she hasn't been taught yet."* | The hinge. Relief. Something is possible |
| **03 · The ladder** | Beat 3 | Five rungs, arriving one at a time: alone → heard → beside → among → before | *"There's a way through this."* |
| **04 · The weeks** | Beat 4 | Week 1 → Week 12, scrubbed | Concreteness. It has a date |
| **05 · The room** | Beat 5 | Week 11 — playing for the class. The first audience | Nerves, on their child's behalf |
| **06 · The stage** | — | Week 12. The full-bleed showcase frame. The payoff | Pride, anticipated |
| **07 · The turn** | Beat 6 | *"Then they ask when the next one is."* | Identity shift. The real product |
| **08 · Houselights** | — | The film ends. Interface returns: price, dates, guarantee, form | Readiness to act |

**Chapter 08 is the concept's structural admission.** The film has to end, and
the last thing a parent needs is a decision surface, not a mood. The transition
from film to interface must be deliberate and unmistakable — the equivalent of
lights up and the credits rolling.

**The protected line** — *"Because once they realize they can get through
something that feels scary, it changes how they approach everything else"*
(`01` §2, flagged as the best sentence on the current site) — lands at Chapter
07 as the closing title. It is the single strongest asset placement available in
this concept.

---

## 3. Hero concept

**"Cold Open."** No hero in the conventional sense. A near-empty first frame
that behaves like the opening seconds of a film.

```
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│                                                                       │
│                                                                       │
│                                                                       │
│              She sings constantly at home.                            │
│              In front of anyone else, nothing.                        │
│                                              ← display-md, n-0,       │
│                                                left-aligned, low in   │
│                                                the frame              │
│                                                                       │
│                                                                       │
│   FULL-BLEED: a real photograph, heavily under-lit, held very still.  │
│   Almost nothing is visible. The frame is mostly dark.                │
│                                                                       │
│   ─────────────────────────────                                       │
│   SOUTH DADE MUSIC          scroll ↓        ← minimal chrome only     │
└───────────────────────────────────────────────────────────────────────┘
```

**Rules:**

- **The H1 is not the first thing on screen.** ⚠️ This is a real SEO and
  accessibility conflict. Resolution: the visible opening line *is* the H1, and
  the brand/promise line arrives at Chapter 02. `06-seo-strategy.md` and the
  heading-hierarchy rule in `04` §2 must both be re-checked against this — it is
  the concept's first compromise and it is not free.
- **The hero photograph is the LCP element**, present at paint, never lazy, never
  JS-dependent (`05` §9 rule 2). The under-lighting is a *grade*, baked into the
  asset — not an opacity animation, which would make LCP dependent on script.
- **No CTA above the fold.** The concept's most aggressive bet. Mitigated by a
  persistent, low-weight utility affordance and the sticky bar appearing at 25%
  scroll.
- **The scroll affordance is mandatory here**, not decorative — it is the only
  instruction the user gets.

---

## 4. Navigation behaviour

**Chrome recedes; chapters advance.** This concept has the most unconventional
navigation and therefore the highest usability risk.

| Element | Behaviour |
|---|---|
| **Header** | Reduced to a wordmark + menu affordance during the film. No nav items, no CTA |
| **Chapter rail** | A slim right-edge progress indicator: 9 marks, current one lit. Clickable — **each chapter is a real anchor with a real URL fragment** |
| **Menu** | Full-screen overlay, `stage-950` at 96%, typographic list. Opens from the affordance, closes on Escape |
| **Post-film** | At Chapter 08 the **full conventional header materialises** — nav items, language toggle, trial CTA — and stays for every interior page |
| **Interior pages** | Standard header from `02-information-architecture.md` §2. **The film treatment is homepage-only** |

**The critical decision: interior pages are not cinematic.** `/pricing`,
`/scholarships`, `/faq` and the booking flow use a conventional, light,
readable treatment. Applying the film language to a Step Up eligibility page
would be actively harmful. This concept is therefore **two design systems**, and
that is its honest cost.

**Non-negotiables:** no scroll-jacking, no forced snapping, no wheel hijacking
(`05` §16 rule 18). Chapters are *triggered* by scroll position; scroll speed is
never overridden. A user must be able to flick to the bottom in one gesture.

---

## 5. Homepage hierarchy

Nine chapters, then the interface returns. Chapter length is measured in scroll
distance, and **the total film must not exceed ~700vh** — beyond that, parents
on a phone abandon.

| Ch | Name | Scroll | Treatment | Notes |
|---|---|---|---|---|
| **00** | Cold open | 100vh | Full-bleed still, one line | Static. LCP |
| **01** | Recognition | 100vh | Type over darkness, photograph resolving | The ache |
| **02** | Reframe | 80vh | Type-only. Black frame, one sentence | The hinge — deliberately imageless |
| **03** | The ladder | 150vh | **Pinned, scrubbed.** 5 rungs illuminate ⚠️ gate B-3 | Pin 1 |
| **04** | The weeks | 150vh | **Pinned, scrubbed.** Week 1 → 12 ⚠️ gate B-4 | Pin 2. `05` §6 caps pins at 2 sitewide — **both are spent here** |
| **05** | The room | 80vh | Week 11. Photograph + one line | |
| **06** | The stage | 100vh | Full-bleed showcase frame. The payoff | ⚠️ Needs a real, consented showcase image |
| **07** | The turn | 80vh | Closing title — the protected line | |
| **08** | Houselights | — | **Interface returns.** Guarantee, price, dates, teachers, testimonials, CTA | Conventional light layout |

**Chapter 08 carries everything Concept B puts across ten sections.** That is
the trade: the film is the top of the funnel; the bottom of the funnel is
compressed into one long conventional region below it.

⚠️ **Structural warning.** Both permitted pinned sequences are consumed by the
homepage. `/programs/90-day-stage-program` — the flagship page — cannot then have
a pinned timeline of its own without breaking `05` §6. Either the homepage gives
one up, or the rule changes, or the flagship page is weaker than the homepage
about its own product.

---

## 6. Typography

**Type is dialogue, not architecture.** Sparse, large, and placed in the frame
like a subtitle or a title card.

| Element | Treatment |
|---|---|
| Chapter titles | Archivo 600, `display-md` 30→48px, `n-0`, left-aligned, low-left in frame |
| Title cards (Ch 02, 07) | Archivo 700, `display-lg` 34→64px, centred **only here** |
| In-frame lines | Inter 400, `body-lg` 18→20px, `n-0` at 90%, max 40ch — **shorter than the system default**, because in-frame text is read at a glance |
| Chapter numerals | Inter 600 tabular, `label`, `spot-400` — `01 / 09` |
| Chapter 08 onward | Full system typography (`04` §2), light ground |

### Rules specific to this concept

- **No more than 25 words per frame.** If a chapter needs more, it isn't a
  chapter — it's a section, and it belongs in Chapter 08.
- **Text never sits over a moving image.** `05` §9 rule 4 is absolute. Where a
  photograph parallaxes, type is pinned to a static layer above it, or the
  motion stops before the type is legible.
- **A scrim is mandatory** behind all in-frame type — a controlled gradient, so
  contrast is a known quantity and not a property of whatever pixel is behind it.
- **Never a typewriter or scramble effect** (`05` §16 rule 21). Tempting in a
  cinematic register; banned because it delays comprehension and breaks screen
  readers.
- ⚠️ Spanish at 40ch with +35% expansion becomes 54ch — every in-frame line must
  be authored in both languages and checked at both.

---

## 7. Colour palette

**Near-monochrome, warming across the arc.** Colour is a narrative device: the
film starts cold and dark, and warms as the child progresses. By Chapter 06 the
frame is at full spotlight warmth.

| Chapter | Grade | Tokens |
|---|---|---|
| 00–01 | Cold, desaturated, very dark | `stage-950`, `stage-900`, minimal `spot` |
| 02 | Pure dark, type only | `stage-950` + `n-0` |
| 03–04 | Warming — amber entering as rungs/weeks illuminate | `stage-900` + `spot-400` accents |
| 05 | Warm mid | `spot-400` present, `velvet-600` in shadow |
| 06 | **Full spotlight** | `spot-500`, `spot-300` — the brightest frame in the project |
| 07 | Warm, settling | `spot-400` receding |
| 08 | **Houselights: full light system** | `n-50` ground, `n-900` text, `spot-500` CTA |

**The warming arc is the concept's most distinctive visual idea** and it is
achieved almost entirely through photographic grading plus generated ground
textures — not through UI colour, which stays inside the existing tokens.

⚠️ **Hazard.** Grading real documentary photographs to serve a narrative arc
edges toward the `09-image-strategy.md` §4 prohibition on *"enhancing real photos
beyond colour grade and crop."* Colour grade is explicitly permitted; **any
grade that changes what a viewer believes happened is not.** The line: a warmer
grade is fine, inventing light that wasn't in the room is not.

---

## 8. Photography direction

**This concept is entirely load-bearing on imagery, and that is its defining
risk.**

| Attribute | Direction |
|---|---|
| Format | 16:9 and wider. Letterboxed frames. Full-bleed always |
| Motion | Ken Burns permitted on **one** hero image only (`05` §8) — nowhere else |
| Light | Single-source, directional, cinematic. Deep shadow with retained detail |
| Grade | Consistent LUT-style treatment across the whole film so chapters read as one piece |
| Framing | Cinematic — negative space, subject off-centre, room in frame |
| Subject | Real students, real rooms, real showcase. **No stock. No AI people. Ever.** |

### What this concept actually requires

| Asset | Needed | Exists today |
|---|---|---|
| Cold-open frame (under-lit, wide) | 1 | ⚠️ Would need a purpose-shot frame |
| Recognition frame | 1 | ⚠️ |
| Week-11 "the room" frame | 1 | ⚠️ |
| **Showcase payoff frame** | 1 hero-grade | Possibly `P1088527.jpg` |
| Chapter 08 supporting set | 6–10 | Partially |
| **Showcase film (60–90s)** | 1 | ❌ **Zero video exists** |

⚠️⚠️ **The blocking problem.** `09-image-strategy.md` §11 records *zero video
across 26 pages*, and gate M-3 asks whether showcase footage exists for the
timeline release moment. The answer today is no. Concept C without video is a
film made of stills — which can work, but it is not what this concept promises.
And all 18 usable photographs are consent-blocked behind gate I-1.

**Concept C cannot be built today.** It can be built after a showcase shoot and
a film. That is a scheduling fact, not a design opinion — and
`09-image-strategy.md` §12 notes the showcase shoot cannot even be *scheduled*
until a real showcase is scheduled.

---

## 9. Gemini-generated decorative assets

Generated assets play a **connective** role: the grounds and transitions between
photographic chapters, never the chapters themselves.

### Used

| Template | Use |
|---|---|
| `hero-atmospheric-background` | Chapter 00 ground beneath the under-lit frame; Chapter 02's imageless title card |
| `stage-light-texture` | Chapters 03–04 pinned-sequence grounds; the warming arc's amber layers |
| `abstract-musical-composition` | Chapter 07 closing-title ground |
| `decorative-section-background` | Chapter 08 light ground |
| `scholarship-graphic` · `camp-campaign-graphic` | Interior pages only |

### New templates required

1. **`chapter-transition-veil`** — a directional haze gradient used to hand off
   between chapters, generated at several warmth points along the arc (cold →
   warm) so transitions are consistent with the grade.
2. **`letterbox-grain`** — a very fine film-grain overlay for tonal consistency
   across chapters shot on two different cameras (Panasonic and Fujifilm are both
   in evidence in the existing set). **≤2% opacity.**
3. **`spotlight-bloom-warm`** — the Chapter 06 payoff bloom, layered *behind* the
   real photograph, never over it.

### The hard line

The temptation in this concept is severe and must be named: **when a chapter's
photograph does not exist, the answer is to cut the chapter, not to generate the
image.** A generated frame of a child on a stage is a fabricated testimonial —
prohibited absolutely by `image-style-guide.md` §3, and the pipeline blocks it
before any request is sent. **If Concept C runs out of real photographs, it runs
out of film.**

**Volume estimate: 7–10 approved assets** across the warmth arc.

---

## 10. GSAP opportunities

**The highest motion budget of the three by a wide margin** — this concept is
mostly motion engineering.

| # | Moment | Technique | Budget |
|---|---|---|---|
| **1** | **The weeks** (Ch 04) | Pinned, scrubbed with smoothing, ~150vh. Week markers, warming ground, release into the showcase frame | **30%** |
| **2** | **The ladder** (Ch 03) | Pinned, scrubbed, 5 rungs ⚠️ gate B-3 | **25%** |
| **3** | **Chapter transitions** | Cross-dissolve + veil, driven by scroll position, once each | 15% |
| **4** | **The warming arc** | Ground and overlay opacity interpolated across the whole scroll — one continuous timeline, not per-section | 10% |
| **5** | **In-frame type** | Masked line reveals per chapter, `ease-curtain` | 8% |
| **6** | **Chapter rail** | Progress indicator, current chapter lit | 5% |
| **7** | Ken Burns (one image) | Very slow scale, hero only | 4% |
| **8** | Chapter 08 reveals | Conventional `fade-rise` | 3% |

**The genuinely novel idea:** the warming arc as a *single continuous GSAP
timeline* mapped to total document scroll, with chapters as labelled positions
on it. The whole page is one film strip rather than nine independent triggers.
Elegant — and the most fragile thing in this document, because one badly-behaved
resize or route change desynchronises the entire page.

⚠️ **Budget conflict.** `05` §15 caps total animation JS at 70KB gzipped and
GSAP + ScrollTrigger at 45KB. This concept needs ScrollTrigger, and likely
ScrollSmoother, on the critical narrative path. The budget will be tight and
must be measured, not assumed.

---

## 11. Mobile experience

**The weakest surface of the three, and the one where the decision is made.**

| Surface | Behaviour |
|---|---|
| Frames | 4:5 or 9:16 crops, **generated/shot separately** — never centre-cropped from 16:9 |
| Chapters | Retained as a sequence, but **no pinning** (`05` §6 rule 4) — each chapter becomes a full-viewport stacked frame with `fade-rise` type |
| Ch 03 / 04 | Degrade to vertical stacked steps. **The two signature moments lose their signature on mobile** |
| Scroll length | Must be re-tuned — 700vh on desktop is punishing on a phone. Target ≤450vh |
| Chapter rail | Becomes a thin top progress bar |
| Chrome | The sticky action bar must appear earlier — by 15% scroll, not 25% |
| Data | LCP is a large photograph. AVIF mandatory, ≤120KB at mobile widths |

**The core mobile problem:** a parent researching at 10pm on a phone wants the
price and the age range. This concept makes them scroll through a film to reach
Chapter 08. **Mitigation is mandatory:** a persistent "Skip to details →"
control from the first frame, plus the sticky action bar, plus the chapter rail
as a jump target. Even mitigated, this is a real cost.

⚠️ Device-capability degradation (`05` §15 rule 7) means low-end Android drops
scrub and pinning entirely — leaving the concept's two best moments as static
diagrams on precisely the devices much of the target market uses.

---

## 12. Interaction philosophy

> **The user's only job is to keep going. Everything else gets out of the way.**

| Principle | Expression |
|---|---|
| **One input, one meaning** | Scroll advances the story. Nothing else is required to experience it |
| **Pace is the user's; order is ours** | No snapping, no jacking, no forced dwell. But the chapters cannot be encountered out of sequence by scrolling |
| **Chrome appears when needed** | Utility affordances fade in at rest and out during active scroll |
| **No hover-dependent content** | Desktop hover is a courtesy only; the film is identical on touch |
| **Escape hatches everywhere** | Skip-to-details, chapter rail, menu overlay, sticky action bar. **A user must never feel trapped in the narrative** |

**The philosophical risk, stated plainly:** an experience that rewards patience
is competing against a parent with fifteen minutes and four browser tabs. The
escape hatches are not a concession to the design — they are what makes it
survivable.

---

## 13. Conversion philosophy

**Delayed conversion, earned by narrative.** The bet: a parent who has watched
the whole ninety days converts at a much higher rate — and fewer of them reach
the form, but far more of the ones who do are ready.

| Tier | CTA | Placement |
|---|---|---|
| **1** | **Book a Trial — $25** | Chapter 08 primary; sticky bar from 25% (15% mobile); header after houselights |
| **2** | **Come watch a showcase** | Chapter 07 — the emotionally correct moment for a zero-risk ask ⚠️ blocked on real events |
| **2** | **Skip to details →** | **From frame one.** A conversion action disguised as an escape hatch, and the concept's most important control |
| **3** | Call · Directions · Español | Persistent utility, low weight |

### The mechanics

1. **The guarantee opens Chapter 08.** Coming directly after the emotional peak,
   at the exact moment doubt returns. Static, plain, never animated (`05` §16).
2. **Price and terms are conventional** — light ground, above the form, no
   atmosphere (`04` §9 rule 9).
3. **Intent captured at source**, as in every concept.

⚠️ **The measurable risk.** Delayed conversion is a real strategy and also a
real gamble. It should ship with an A/B measurement plan against a short-form
control, because if the film depresses top-of-funnel enquiries the business
feels it in weeks, not quarters.

---

## 14. Accessibility implications

**The most accessibility-hostile of the three concepts.** Every risk below is
solvable; none is free.

| Risk | Severity | Mitigation |
|---|---|---|
| **Two pinned scrubbed sequences** | High | Both degrade to static, fully-labelled diagrams under reduced motion, below `lg`, on low-end devices and without JS. Four degradation paths each |
| **Content revealed by scroll position** | High | All chapter content in the DOM at all times, never `opacity: 0` in base CSS (`05` §4 rule 5). The film is an enhancement layer over a readable document |
| **Text over imagery** | High | Mandatory scrim; contrast verified against the actual asset, per chapter, per breakpoint |
| **Heading hierarchy** | High | The cold-open line as H1 conflicts with brand-name-first SEO convention. Must be resolved explicitly, not by accident |
| **Screen-reader narrative order** | Medium-High | Chapters must read as coherent prose linearly. The story is an accessibility *advantage* here if authored properly |
| **Vestibular triggers** | High | The warming arc is opacity-only (safe). Any parallax capped at 12% and off below `md` |
| **Cognitive load / time pressure** | Medium | Escape hatches; no timed content anywhere |
| **Low-vision users on dark grades** | Medium | Chapter 08 onward is fully light. The film is short by design |
| **Keyboard users** | High | Chapter rail must be fully keyboard-navigable; the film must be skippable with a first-tab-stop control |

**The reduced-motion experience is effectively a different design** — a
sequence of static, captioned frames with all text visible. It must be designed
deliberately, not derived, and `05` §14 is explicit that it is a first-class
alternative, not a degraded one. **Budget for it as a real deliverable.**

---

## 15. Advantages

1. **Highest emotional ceiling by a distance.** It is the only concept that can
   make a parent feel the outcome rather than evaluate it.
2. **It tells the story the business already has.** `01` §12's six beats are
   strong writing that no other format fully exploits.
3. **It is the answer to the imagination problem.** The core market cannot
   picture their shy child on a stage; this concept shows them.
4. **Strongest social and paid-media derivative value.** Chapters become
   vertical ad creative directly — real leverage for a business that runs
   seasonal camp campaigns.
5. **Maximum differentiation.** No music school in Florida has anything like it.
6. **Teen-proof.** A 15-year-old will not be embarrassed by a film. This is the
   strongest concept for the quaternary audience.
7. **It makes the showcase film the centrepiece it should be** —
   `09-image-strategy.md` §11 ranks the showcase film as the #1 missing asset in
   the entire project.

---

## 16. Weaknesses

1. **It cannot be built today.** Zero video exists (gate M-3). All 18
   photographs are consent-blocked (I-1). The showcase shoot cannot be scheduled
   until a showcase is scheduled (I-4). **This is a blocking dependency, not a
   risk.**
2. **It buries the answers a parent came for.** Price, ages, dates and
   scholarship steps all live past the film. For the Scholarship Family — the
   largest untapped segment — this is close to hostile.
3. **It is two design systems.** The film and the conventional interior pages
   must both be built and maintained.
4. **It spends both permitted pinned sequences on the homepage**, leaving the
   flagship programme page structurally weaker than the homepage about its own
   product.
5. **Worst mobile experience** of the three, on the device where the decision is
   made, for an audience with mid-range Android phones.
6. **Worst accessibility profile** and the largest reduced-motion design debt.
7. **Highest performance risk** — animation JS budget, large imagery, LCP
   exposure.
8. **Highest cost and longest timeline**, with the most content produced by
   third parties (photographer, filmmaker) outside the build team's control.
9. **Fragile.** One desynchronised timeline and the entire homepage misbehaves.
10. **Ages fastest.** Scroll-driven cinematic sites are strongly date-stamped;
    this will read as *2026* in 2029.

---

## 17. Complexity

**Overall: High.**

| Dimension | Rating | Why |
|---|---|---|
| Layout engineering | **Medium** | Full-bleed frames are simple; the interface layer is conventional |
| **Motion engineering** | **Very High** | Two pinned scrubbed sequences + a continuous document-scroll timeline + chapter transitions |
| Asset pipeline | **Very High** | Cinematic grading, multiple crops per frame, film, AVIF at scale |
| Performance engineering | **High** | Large imagery + heavy JS against a hard LCP budget |
| Accessibility engineering | **Very High** | Four degradation paths per pinned sequence; a separately designed reduced-motion experience |
| Dual system maintenance | **High** | Film + conventional, indefinitely |
| **Content dependency** | **Blocking** | Requires assets that do not exist and cannot yet be scheduled |

**The single hardest thing:** keeping the continuous scroll timeline synchronised
across resize, orientation change, route change and lazy-loaded imagery, without
layout shift, at 60fps on a mid-range Android.

---

## 18. Estimated implementation effort

One senior front-end engineer with design support **plus** a motion specialist.
Excludes photography, film production, content, copy and translation — which are
the dominant costs here.

| Workstream | Effort |
|---|---|
| Design system tokens + dual-register foundation | 1.5 weeks |
| Chapter framework + continuous scroll timeline | 2.5 weeks |
| **Ch 03 — Exposure Ladder** (pinned, 4 degradation paths) | 1.5 weeks |
| **Ch 04 — The weeks** (pinned, 4 degradation paths) | 2 weeks |
| Chapter transitions + warming arc | 1.5 weeks |
| Cold open + in-frame type system + scrims | 1 week |
| Chapter 08 conventional interface region | 1.5 weeks |
| Interior templates (conventional system, full set) | 3.5 weeks |
| Forms and booking flow | 1.5 weeks |
| **Reduced-motion alternative experience** (designed + built) | **1.5 weeks** |
| Mobile chapter re-tuning + separate crops | 1.5 weeks |
| Generated-asset production across the warmth arc | 1 week |
| Performance engineering (LCP, JS budget, imagery) | 2 weeks |
| Accessibility audit and remediation | 2 weeks |
| **Total** | **≈ 24 weeks** (~5.5 months) |

**Plus, outside the build:** a showcase photography shoot, a 60–90s showcase
film, and consent processes for every appearing student. `09-image-strategy.md`
§12 puts those on a timeline that starts with *"the next real showcase date"* —
currently unknown.

---

## 19. Competitive references

| Reference | What to take |
|---|---|
| **MasterClass** | **The closest strategic analogue** — sells transformation through cinematic craft, then converts on a conventional page |
| **Apple product pages** | Scroll-driven chaptering done responsibly; escape hatches; the discipline of ending the film |
| **NYT "Snow Fall"** and successors | Long-form scroll narrative with real editorial substance |
| **The Pudding** | Scrollytelling that respects the reader and degrades honestly |
| **Aesop** | Restraint at the frame level — how little can be on screen |
| **Criterion Channel** | Grading consistency across a set of stills from different sources |
| **Waking Up (Sam Harris)** | Calm, dark, low-chrome, emotionally-led conversion |
| **Nike / Peloton campaign microsites** | Transformation narrative; also a caution — these are campaigns with campaign budgets, not evergreen sites |

**Anti-references:** awards-bait scroll sites with custom cursors and preloaders
(both banned by `05` §16); anything requiring a loading animation to begin.

---

## 20. Why this concept would outperform a traditional music-school website

1. **It solves the imagination problem, which is the actual sales obstacle.** A
   traditional site asserts *"builds confidence."* This one shows a child moving
   from silence to a stage across ninety days. Assertion is what every
   competitor already does and no parent believes.
2. **It makes the product legible in ten seconds.** A parent who watches
   Chapters 03–04 understands the Gradual Exposure Ladder and the 12-week
   structure better than any prose page could deliver — and those two things are
   the moats (`01` §9).
3. **It competes with the black belt** (`01` §10). Soccer and jiu-jitsu sell a
   visible, filmable outcome. Music has traditionally sold nothing visible for
   two years. This concept is the only one that puts the outcome *on screen*.
4. **It converts the teen.** The 13–17 influencer segment will veto a children's
   website; a film reads as culture, not school.
5. **It generates campaign assets as a by-product.** Chapters cut directly to
   vertical social — meaningful for a business selling seasonal camps.
6. **It treats the showcase film as the strategic asset it is.** The film is the
   #1 gap in the project; this concept forces its production rather than
   deferring it again.

**The honest verdict.** Concept C is the best answer to a question the business
cannot currently afford to ask. Its dependencies — a filmed showcase, consented
photography, a scheduled event — are the same dependencies flagged as P0 in
`09-image-strategy.md` §12 and unresolved in `10-launch-plan.md`. As a launch
concept it is not viable. **As the phase-two evolution of a site launched on a
different concept, it is the strongest thing in this document** — and the
chapter structure should be designed for now even if it is built later.

---

**See also:** `concept-a-performing-arts.md` · `concept-b-modern-academy.md` · `concept-comparison.md`
