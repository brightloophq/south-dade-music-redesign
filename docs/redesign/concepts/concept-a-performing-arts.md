# Concept A — The Performing Arts House

**Phase:** 3.75 — Creative Direction
**Date:** 2026-08-06
**One line:** The website is not a brochure about a music school. It is the **venue itself** — a season bill, a foyer, a darkened house, and a lit stage.
**Depends on:** `01-brand-strategy.md` · `04-design-system.md` · `05-motion-system.md` · `image-style-guide.md`

---

## 1. Design philosophy

`04-design-system.md` §0 already found the resolution to this project's central
tension — *a 6-year-old's parent must find it warm; a 15-year-old must not find
it embarrassing* — and named it: **the stage**. Concept A is the argument that
we should stop treating that as a metaphor and start treating it as **the
architecture of the site**.

Every music school in South Miami-Dade presents itself as a *provider of
lessons*. A theatre never presents itself as a provider of seats. It presents a
**season** — named productions, dated performances, a company of people, a bill
you can read. That posture is available to South Dade Music today and to nobody
else in the market, because it is the only academy here that actually runs a
recurring showcase cycle.

**Three convictions:**

1. **A venue sells anticipation; a school sells enrolment.** Anticipation
   converts better and costs nothing to manufacture, because the 90-Day Stage
   Program is already a season with a dated climax.
2. **Typography does the heavy lifting, not photography.** This is the concept's
   strategic advantage and the reason it survives contact with reality: 18
   usable photographs exist and all 18 are consent-blocked behind gate I-1. A
   poster tradition is built for exactly this scarcity — a playbill is mostly
   words, set beautifully, and it has sold theatre for two centuries.
3. **Restraint reads as expensive.** The house is dark and quiet. One thing is
   lit at a time. That is both the theatrical truth and the antidote to the
   current site's WPBakery uniformity, where every section shouts at the same
   volume.

**The thesis in one sentence:** *If a parent lands here and feels the way they
feel walking into a theatre lobby ten minutes before curtain, we have already
won the argument about whether this place is serious.*

---

## 2. Emotional journey

The site reproduces the physical sequence of attending a performance. Each
homepage movement maps to a beat of `01-brand-strategy.md` §6.

| Movement | Theatre reality | What the parent feels | Brand-strategy stage |
|---|---|---|---|
| **The street** | You see the marquee from outside | *"Something happens here on a specific date."* | 1 · Ache → recognition |
| **The foyer** | Warm light, a programme in your hand | *"This is organised. Someone is in charge."* | 2 · Hope |
| **The house** | Lights dim, you settle, the room quiets | *"I'm going to pay attention now."* | 2 → 3 |
| **The bill** | You read what's on and who's in it | *"There is a structure. It has weeks and names."* | 3 · Scrutiny |
| **The performance** | One thing, lit, centre | *"That's what my kid would be doing."* | 3 · Scrutiny |
| **The interval** | House lights up, you check the price | *"Right — what does this cost and when?"* | 4 · Arithmetic |
| **The box office** | You buy a seat | *"Okay. How do we start?"* | 5 · Commitment |
| **The applause** | You leave having belonged to something | *"That's my kid up there."* | 6 · Pride |

**The interval is the most important design decision in this concept.** At the
point the parent needs price, dates and logistics, the house lights come up:
the page shifts to a light, plain, high-contrast register. This is not a
compromise of the theme — it *is* the theme. Theatres do this. It also satisfies
`05-motion-system.md` §17: *"motion intensity is inversely proportional to how
close the user is to a decision."*

---

## 3. Hero concept

**"The Bill."** A full-viewport `stage-950` ground carrying a poster, not a
banner.

```
┌───────────────────────────────────────────────────────────────────────┐
│  SOUTH DADE MUSIC          90-Day  Programs  Lessons  Camps  EN|ES  ▸ │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   SEASON · CYCLE 12 · SHOWCASE WEEK 12          ← label, spot-400     │
│                                                                       │
│   In 90 days,                                    ← display-xl,        │
│   your child                                       Archivo expanded,  │
│   takes a stage.                                   3 lines, n-0       │
│                                                                       │
│   ───────────────────────────────────            ← hairline rule      │
│                                                                       │
│   Weeks 1–10 skill · Week 11 the class ·         ← body-lg, n-300     │
│   Week 12 you.                                                        │
│                                                                       │
│   [ Book a Trial — $25 ]   Come watch a showcase →                    │
│                                                                       │
│                          ┌──────────────────────────────────────────┐ │
│                          │                                          │ │
│                          │   ONE PHOTOGRAPH, LIT LIKE A             │ │
│                          │   PRODUCTION STILL — bleeding off        │ │
│                          │   the right and bottom edges             │ │
│                          └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
```

**Rules:**

- **Type is the hero, photography is the evidence.** The H1 occupies roughly
  half the viewport width at `lg`+. The photograph is a supporting witness
  bleeding off two edges — deliberately not a full-bleed background, so the
  headline never sits on a moving or busy field (`05-motion-system.md` §9 rule 4).
- **The eyebrow is a real, dated fact** — the current cycle and the week the
  next showcase falls in. ⚠️ Blocked on a real event record existing; until
  then it reads `THE 90-DAY STAGE PROGRAM` with no date. **We do not fabricate
  a season.**
- **The generated stage-light texture sits behind the type**, not behind the
  photograph — the left third of the Phase 3.5 test asset is exactly the deep
  uncluttered zone the H1 needs.
- **Zero-risk secondary CTA** — *"Come watch a showcase"* is the strongest
  conversion asset the business owns (`02-information-architecture.md` §10) and
  in this concept it is thematically perfect: a theatre's first offer is always
  a seat.

**Interior heroes** drop to a two-thirds-height band, same construction, no
light sweep — per `05-motion-system.md` §9, the sweep belongs to the homepage
alone.

---

## 4. Navigation behaviour

**The header is a marquee.** A slim band, `stage-950`, that behaves like the
front-of-house sign.

| State | Behaviour |
|---|---|
| Over hero | Fully transparent, hairline bottom rule at 20% `n-0`, 80px |
| On scroll | Condenses to 64px, ground fills to `stage-950` at 96% with backdrop blur, hairline `stage-700` |
| Light sections | Inverts to `n-0` with `n-200` hairline — the house lights are up |
| Mega-menu open | Panel drops as a **programme insert**: `stage-900`, `elev-3`, full width |

**The 90-Day Program keeps its permanent unhidden slot** (`02-information-architecture.md`
§2) and in this concept it is typographically distinguished — set in Archivo
where the other items are Inter, with a `spot-400` hairline beneath. It reads as
*the current production* and the rest reads as *also playing*.

**Mega-menu as programme insert.** Three columns of listings with a right-hand
plate carrying one showcase photograph and the trial CTA — the way a theatre
programme puts the cast list left and the season advert right.

**Nav underline draws from the centre outward** (`05-motion-system.md` §11) —
in this concept read as a stage light widening.

**What the nav must not do here:** no curtain-wipe on open, no theatrical
flourish on a functional control. The marquee is the theme; the menu is a menu.

---

## 5. Homepage hierarchy

Nine movements. Dark unless marked.

| # | Movement | Register | Job | Notes |
|---|---|---|---|---|
| **1** | **The Bill** (hero) | Dark | Name the promise in one line | §3 |
| **2** | **The reframe** | Dark | *"That's not shyness. It's a skill she hasn't been taught yet."* | `01` §12 beat 2 — the persuasive hinge, set at `display-md` as a standalone statement, no supporting copy |
| **3** | **The 90-Day Timeline** | Dark → lit | The signature moment | Pinned, scrubbed. 60% of motion budget (`05` §1) |
| **4** | **The Company** | Dark | Teachers — faces and names | ⚠️ Gate B-7. Until it closes, this becomes *The Method* (Exposure Ladder) |
| **5** | **The house lights come up** ☀ | **Light** | The interval — price, ages, formats, what's included | The register break. This is where the concept earns trust rather than atmosphere |
| **6** | **Evidence** | Dark | Showcase gallery, dated | ⚠️ Zero dated events exist. Ships as an archive with honest labelling or not at all |
| **7** | **In their words** ☀ | **Light** | 14 verbatim testimonials | Light because a quote must never look art-directed. Verbatim or omitted (`01` §4) |
| **8** | **The door in** ☀ | **Light** | Scholarships, bilingual, age 3 | Plain and procedural (`05` §17) |
| **9** | **Box office** | Dark | Final CTA + the guarantee, stated flat | Guarantee text never animates (`05` §16 rule 4) |

**The alternation is the point.** Dark → dark → dark → **light** → dark →
**light** → **light** → dark. The parent is moved between the house and the
foyer, and every time the lights come up they get a fact they can act on. This
is the mechanism that stops the concept from becoming a mood piece.

---

## 6. Typography

Concept A pushes the existing stack (`04-design-system.md` §2) to its dramatic
maximum. No new families — **Archivo** (variable, width + weight) and **Inter**.

### The poster register

| Element | Treatment |
|---|---|
| Hero H1 | Archivo 700, **width axis ~112 (expanded)**, `display-xl` 40→88px, −0.03em, line-height 1.05 |
| Section heads | Archivo 600, normal width, `display-md` |
| The bill line | Archivo 500 **condensed**, uppercase, 0.12em tracking — used for dated facts: `WEEK 12 · SHOWCASE · SATURDAY` |
| Body | Inter 400, `body-md`, 68ch, line-height 1.6 (1.7 Spanish) |
| Numerals | Inter tabular — 90, 12, $25, $450 |

**The width axis is the concept's signature.** Expanded for the poster
statements, condensed for the dated ledger lines. That contrast — wide and
narrow in the same family — is what a printed bill looks like, and it costs
nothing extra because Archivo is already a variable font in the system.

### Rules specific to this concept

- **Maximum two expanded-width statements per page.** Wide type at scale is the
  most expensive-looking thing here and dies instantly from repetition.
- **Never centre the poster type.** Left-aligned, ragged right, hung on the grid.
  Centred display type reads wedding-invitation.
- **Sentence case survives** (`04` §2). A bill is set in caps; our *headlines*
  are not. Only the `label` and bill-line tokens go uppercase.
- ⚠️ **Spanish stress test is harder in this concept.** *"Listos para el
  escenario"* is 27 characters against 21; at expanded width and `display-xl`
  it will break to a third line at `lg`. The width axis must be allowed to
  narrow to ~100 on the Spanish tree rather than reducing the size. This must
  be proven at design review, not at build.

---

## 7. Colour palette

**Same tokens. Inverted ratio.** This is what makes Concept A visually radical
without inventing a second design system.

| | `04-design-system.md` §1 default | **Concept A** |
|---|---|---|
| Neutral light surfaces | 60% | **25%** |
| Stage darks | 25% | **60%** |
| Photography-led | 10% | 10% |
| Accent | 5% | 5% |

**Dark is the default ground; light is the exception that signals *"this is a
fact you can act on."*** The registers stop being decoration and become
information.

| Surface | Token | Where |
|---|---|---|
| The house | `stage-950` | Hero, timeline, evidence, box office, footer |
| Raised in the dark | `stage-800` | Cards on dark, mega-menu |
| Rules in the dark | `stage-700` | Hairlines — used heavily; the bill is ruled |
| The foyer | `n-50` | Interval, testimonials, scholarships |
| The light | `spot-500` / `spot-400` | One CTA, one accent, per viewport |
| The curtain | `velvet-600` | Secondary buttons only. **Not** used as a decorative field — a red velvet background is the single fastest way to make this concept look like a wedding-band website |

⚠️ **The known hazard.** `spot-500` on white is 2.0:1 and banned for text
(`04` §1). In a dark-dominant concept the temptation to reach for amber
constantly is severe. **Hard rule for Concept A: one spotlight element per
viewport.** If two things glow, neither is lit.

---

## 8. Photography direction

Photographs are treated as **production stills** — the images a theatre releases
from a run.

| Attribute | Direction |
|---|---|
| Grade | Warm highlights, blue-black shadows retaining detail, restrained saturation (`04` §13) |
| Light | Single directional source. Practical stage light or window light. Never fill-flat |
| Framing | Tight on the subject with generous negative dark space — the frame must *contain* darkness, because it is being placed on a dark ground |
| Crop | Bleeding off two edges in feature positions; never a floating rounded rectangle on dark, which reads as a stock-photo card |
| Treatment | **No duotone, no colour overlay, no blend modes.** The photographs are documentary evidence; stylising them undermines the one thing they are for |

**Working with 18 photographs.** This concept needs the fewest images of the
three, because type carries the pages. The recommended allocation:

- 1 hero-grade still (`P1088527.jpg`)
- 1 timeline release image (§10) — the payoff frame
- 6–8 in the evidence gallery
- 1 per instrument page, **subject-verified** (fixes the guitar-on-violin defect)

⚠️ Every one of these is blocked on **gate I-1** (photo-release consent). The
concept degrades gracefully: with zero approved photographs it still stands up
as a typographic poster system with generated light textures. **No other concept
in this set can say that.**

---

## 9. Gemini-generated decorative assets

Per `image-style-guide.md`: decoration sits behind evidence, never replaces it.
Concept A is the heaviest consumer of decorative assets and therefore needs the
tightest discipline.

### From the existing templates

| Template | Use in Concept A | Aspect |
|---|---|---|
| `hero-atmospheric-background` | The Bill's ground behind the H1 — **already generated and reviewed** (`homepage-hero-stage-light.jpg`) | 16:9 + 4:5 mobile |
| `stage-light-texture` | Movement 3 timeline ground; movement 9 box-office band | 21:9 |
| `decorative-section-background` | Dark variant behind movements 2 and 4 | 21:9 |
| `abstract-musical-composition` | Open-graph cards, `/lessons` hub ground | 3:2, 1:1 |
| `scholarship-graphic` | Movement 8 — **light register**, deliberately plain | 16:9 |
| `camp-campaign-graphic` | `/camps` backdrop only, never the selling image | 1:1, 4:5 |

### New templates this concept requires

1. **`curtain-fold-texture`** — soft vertical velvet folds in near-black with a
   `velvet-600` undertone, for section transitions. **Risk flag:** this is the
   asset most likely to tip the concept into pastiche. Generate it, review it,
   and be willing to throw it away.
2. **`marquee-bulb-glow`** — a diffuse warm bulb-light bloom, no fixtures, no
   sign, no letters, for the header band on scroll. Very low opacity.
3. **`paper-bill-grain`** — a subtle warm paper tooth for the *light* register,
   so the foyer sections feel printed rather than blank. **≤3% opacity.**

### Non-negotiables

- No people, no faces, no venue architecture, no proscenium arch, no seating —
  those read as *our building*, which is barred outright.
- No letterforms, no logos, no signage. A generated marquee with generated
  letters on it is a fabricated venue.
- All assets `register: decorative`, `approvalStatus: pending-review` until a
  named human signs off.

**Volume estimate:** 9–12 approved assets. Highest of the three concepts.

---

## 10. GSAP opportunities

Budget per `05-motion-system.md`: 60% of effort to the one signature moment.

| # | Moment | Technique | Budget |
|---|---|---|---|
| **1** | **The 90-Day Timeline** ★ | Pinned, scroll-scrubbed with smoothing, ~250vh. Rule draws left→right, week markers illuminate, ground darkens toward week 12, releases into a real showcase photograph | **60%** |
| **2** | **House lights** | The register break at movement 5. Ground cross-fades `stage-950` → `n-50` over ~500ms as the section crosses 80% viewport, once. **Everything in the section is legible at both ends** — no text is mid-transition-illegible | 12% |
| **3** | **Hero light sweep** | Per `05` §9 — warm gradient sweeps across the still at 400ms, 900ms duration | 10% |
| **4** | **Curtain-up headlines** | Masked line reveals, `ease-curtain`. **Maximum two per page** | 8% |
| **5** | **Gallery FLIP → lightbox** | Image travels from grid to lightbox and back (`05` §8) | 6% |
| **6** | **Counters** | 90, 12, $25 — `ease-spot`, once, tabular. Never near a CTA | 4% |

**The one genuinely new idea:** the timeline's ambient ground *darkens* as it
progresses, so week 12 is the brightest moment on a page that has been getting
darker. It is the house lights going down before the performer appears — and it
is achieved with opacity on two layered elements, which is cheap and safe.

**Explicitly rejected in this concept**, despite the theme: curtain-wipe page
transitions (`05` §12 — 800ms on every navigation, hurts the parent journey
most), spotlight cursor-following (`05` §16 rule 19), any looping bulb flicker.

---

## 11. Mobile experience

The poster survives the phone better than the film does; a bill is a vertical
format by nature.

| Surface | Behaviour |
|---|---|
| Hero | Type stacks to 4–5 lines at `display-xl` 40px. Photograph moves **below** the CTAs as a 4:5 bleed — generated separately, never centre-cropped from 16:9 |
| Header | 56px, logo + hamburger + persistent trial button; the button is never sacrificed |
| Drawer | Full-screen `stage-900`, accordion, opens right (`04` §11) |
| Timeline | **Not pinned** (`05` §6 rule 4). Becomes a vertical stacked sequence of 3 stages, `fade-rise` each |
| Register break | Retained — it works better on mobile than desktop, because the whole viewport changes state |
| Sticky action bar | After 25% scroll, `stage-900`, `xl` button + call |
| Textures | 1K assets, `stage-light-texture` only. `curtain-fold` and `paper-grain` are desktop-only — the weight is not justified on 4G |

**The mobile risk:** dark-dominant designs are heavier in perceived weight and
this concept uses more decorative imagery than the others. Every generated
texture must be AVIF, ≤60KB at mobile widths, and must not be an LCP element.

---

## 12. Interaction philosophy

> **One thing is lit at a time.**

| Principle | Expression |
|---|---|
| **Light is the feedback mechanism** | Hover, focus and active states warm rather than move. A card doesn't lift — its edge catches light |
| **Rules and hairlines respond** | The bill is ruled; rules brighten `stage-700` → `spot-400` on hover. Cheap, on-theme, and never moves a click target |
| **Nothing follows the cursor** | Banned outright (`05` §16) |
| **Focus is a spotlight** | 2px `spot-500` ring at 2px offset — the same visual language as hover, at full strength always |
| **Silence between moments** | No ambient looping motion anywhere. A theatre before curtain is *still* |

**The discipline that makes this work:** every hover state in this concept is
achievable with `opacity` and `background-color` on a layered pseudo-element.
No transforms means no layout shift, no `will-change` leakage, and 60fps on a
mid-range Android — which matters because this is the concept most at risk of
feeling heavy.

---

## 13. Conversion philosophy

**Box office logic.** A theatre never hides the price of a seat; it publishes a
price list and a seating plan. That posture is exactly the corrective this
project needs, given Phase 2 found no price for any lesson product.

| Tier | CTA | Concept A framing |
|---|---|---|
| **1** | **Book a Trial — $25** | Price in the label, always. One per page (`02` §10) |
| **2** | **Come watch a showcase** | The zero-risk entry. Thematically native: the first thing a venue offers is a seat. ⚠️ Blocked until `/events` has real records |
| **2** | **Reserve a Seat** | Camp booking. ⚠️ Deposit amount must be published first (gate B-8) |
| **3** | Call · Directions · Español | Utility, persistent |

**The rule that protects the concept from itself:** *conversion surfaces are
always in the light register.* Booking, pricing, camp reservation and the
scholarship path are `n-50` grounds with `n-900` text, minimal motion, and no
decorative texture. The house is for persuasion. The box office is for
transacting, and it is brightly lit and boring on purpose.

**The guarantee is set as a plain statement on a light ground**, never
animated, never over texture (`05` §16 rule 4). It is the single most valuable
sentence the business owns and it must look like a promise, not a poster.

---

## 14. Accessibility implications

Serving Unique Abilities scholarship families makes this a market requirement
(`04` §0 principle 6), not a compliance exercise.

### Where this concept is strong

- **Dark ground with `n-0` text is 18.7:1** — well beyond AAA
- `spot-400` on `stage-900` is 11.7:1 — accent text is genuinely readable
- Type-led design means **less reliance on images conveying meaning**
- Restraint means fewer moving parts to trip vestibular triggers

### Where this concept is dangerous

| Risk | Mitigation |
|---|---|
| **Amber-on-light temptation** | `spot-500` on white is 2.0:1. Hard-banned; enforced by lint on the token, not by review |
| **Light-on-dark body copy at length** | Halation makes long dark-mode prose harder for astigmatic and dyslexic readers. **Rule: no prose block over 400 words on a dark ground.** Long-form goes in the light register — which the interval structure already gives us |
| **The register break as a motion trigger** | A full-ground luminance flip is a flash risk. Must be ≥500ms, must never repeat, must be disabled under reduced motion (static light ground), and must be verified against WCAG 2.3.1 three-flash threshold |
| **Decorative texture behind text** | Every generated ground must be contrast-tested with its actual overlaid copy, not assumed |
| **Expanded-width type at small sizes** | Only permitted at `display-md` and above |

### Non-negotiable

Focus indicators never reduced, never animated. Reduced motion renders the
timeline static with all three stages visible and labelled, and the register
break as a static light section.

---

## 15. Advantages

1. **It is the only concept that is true to the product.** The business sells a
   stage. This design *is* a stage. Nothing has to be invented or claimed.
2. **It works with almost no photography** — the decisive practical advantage
   given 18 consent-blocked images and zero video. Type and light carry it.
3. **It solves the 6-year-old / 15-year-old constraint cleanly.** Theatre is
   credible to a teenager and warm to a parent. No other frame does both.
4. **It is differentiated in-market by a wide margin.** Every competitor is a
   light template with stock children. This looks like a season announcement.
5. **The register break gives the site an information architecture you can
   *feel*** — dark means persuasion, light means facts. That is a genuinely
   useful mental model for a parent, and it enforces `05` §17 structurally.
6. **Highest emotional ceiling of the three at the lowest asset cost.**
7. **The generated-asset pipeline built in Phase 3.5 was effectively designed
   for this concept** — six templates, five of which it uses directly.

---

## 16. Weaknesses

1. **Pastiche risk is real and permanent.** Curtains, marquees and bulbs are one
   bad asset away from dinner-theatre. The velvet field and `curtain-fold`
   texture are the two most likely failure points.
2. **Dark-dominant hurts the transactional layer** unless the register break is
   executed rigorously — and it is the first thing that will get value-engineered
   out under deadline pressure.
3. **Scholarship and pricing pages fight the theme.** `05` §17 requires them to
   feel *plain, procedural and trustworthy*. In a theatre concept they become
   visually orphaned. The interval structure answers this, but it is a seam.
4. **Long-form content suffers.** The FAQ, policies and the Step Up application
   path are long, and they cannot live on dark grounds.
5. **The "season" framing is currently unbacked.** Zero dated events exist and
   both event URLs 404. The concept's most powerful device — a bill with dates —
   is blocked on content the owner must produce (gate I-4).
6. **Spanish typography is hardest here.** Expanded display type plus +35%
   expansion is the worst-case combination in the whole project.
7. **Heaviest decorative-asset load** — 9–12 generated assets, each needing
   review, conversion and a mobile variant.

---

## 17. Complexity

**Overall: Medium-High.**

| Dimension | Rating | Why |
|---|---|---|
| Layout engineering | **Medium** | Standard grid work. The asymmetric poster hero is straightforward |
| Motion engineering | **High** | Pinned scrubbed timeline is the hardest single piece in the project |
| Register-break mechanics | **Medium-High** | Ground luminance transition tied to scroll, with reduced-motion and flash-safety paths |
| Typography engineering | **Medium** | Variable-width axis plumbing + Spanish stress testing |
| Asset production | **High** | 9–12 generated assets × review × AVIF/WebP × mobile variants |
| Accessibility QA | **High** | Every dark surface + every texture needs contrast verification with real copy |
| Content dependency | **Medium** | Lowest photography dependency of the three; but the dated-season device is blocked |

**The single hardest thing:** making the dark→light register break feel
intentional rather than like a rendering bug, on every viewport, under reduced
motion, and on a slow Android.

---

## 18. Estimated implementation effort

Assumes one senior front-end engineer with design support. **Excludes** content
production, photography, copywriting and translation.

| Workstream | Effort |
|---|---|
| Design system tokens + dark/light register infrastructure | 1.5 weeks |
| Typography system (variable width axis, fluid scale, ES stress test) | 1 week |
| Navigation — marquee header, mega-menu, mobile drawer | 1.5 weeks |
| Homepage — 9 movements | 2.5 weeks |
| **90-Day Timeline** (pinned, scrubbed, 4 degradation paths) | **2 weeks** |
| Register-break mechanics + reduced-motion + flash safety | 1 week |
| Interior templates (programme, instrument, camp, scholarship, teachers) | 3 weeks |
| Gallery + lightbox FLIP | 1 week |
| Forms and booking flow | 1.5 weeks |
| Generated-asset production, review and conversion | 1 week |
| Accessibility audit and remediation | 1.5 weeks |
| Performance tuning (dark textures, mobile budgets) | 1 week |
| **Total** | **≈ 19.5 weeks** (~4.5 months) |

**Sensitivity:** dropping the pinned timeline to a static diagram saves ~2
weeks and removes the concept's signature. Not recommended.

---

## 19. Competitive references

Referenced for **visual posture only** — none are music schools, and that is
deliberate.

| Reference | What to take |
|---|---|
| **National Theatre (UK)** | Season-bill logic; how a dated programme becomes the primary navigation |
| **Park Avenue Armory** | Dark ground, enormous restraint, one lit image at a time |
| **Berliner Philharmoniker — Digital Concert Hall** | Proof that dark + warm + rigorous can feel premium rather than gloomy |
| **The Shed (NYC)** | Contemporary poster typography; how to be a venue without being ornate |
| **Criterion Collection** | Editorial treatment of stills; type-led, image-supported |
| **Playbill (the printed artefact)** | The bill line, the ruled ledger, the cast list — the actual source of the type system |
| **Roundhouse (London)** | Youth-arts credibility — warm to a parent, not embarrassing to a teenager. **The closest analogue to our core constraint** |

**Anti-references — what this must not become:** Broadway musical marketing
sites (loud, gradient-heavy, all-caps), casino and dinner-theatre aesthetics,
any site using red velvet as a background field.

---

## 20. Why this concept would outperform a traditional music-school website

A traditional music-school site is a light template with a stock photograph of a
smiling child at a piano, a list of instruments, and a contact form. It sells
**time by the half-hour**. Its implicit promise is *"lessons will happen."*

Concept A outperforms it on five mechanisms:

1. **It changes the unit of sale from a slot to a season.** `01-brand-strategy.md`
   §10 identifies the real competition as soccer, jiu-jitsu, Kumon and the iPad
   — all of which sell a visible outcome on a date. A bill with a dated showcase
   competes with a black belt. A list of instruments does not.
2. **It converts the site's biggest weakness into its aesthetic.** The academy
   has 18 usable photographs and zero video. A traditional design starves; a
   poster tradition thrives on type and light. The constraint stops being a
   problem and becomes a look.
3. **It passes the teen veto.** The quaternary audience (`01` §5) will reject
   anything that looks like a children's website, and the teen is the influencer
   on guitar, drums, bass and voice. A theatre reads as adult, serious and
   slightly cool. Primary colours and clip-art lose that audience on sight.
4. **The register break structurally fixes the conversion failure.** Phase 2
   found 30+ CTAs resolving to one widget and prices disclosed nowhere. Making
   *"facts live in the light"* a design law means a price can't hide in
   atmosphere — it has nowhere dark to hide.
5. **It is memorable in a category that is entirely forgettable.** A parent
   comparing four local academies on a Tuesday evening will remember exactly one
   of them the next morning. Differentiation here is not vanity; it is the
   difference between being the default choice and being one of four tabs.

**The honest caveat:** this concept's ceiling is the highest of the three and
its floor is the lowest. Executed with discipline it is the best website in the
category. Executed carelessly — one velvet gradient, one bulb graphic, one
centred serif — it is a community-theatre flyer. It demands art direction to be
held all the way through build.

---

**See also:** `concept-b-modern-academy.md` · `concept-c-cinematic-storytelling.md` · `concept-comparison.md`
