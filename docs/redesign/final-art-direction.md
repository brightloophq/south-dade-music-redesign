# Final Art Direction — The House and the Desk

**Phase:** 3.75 — Creative Direction · **final output**
**Date:** 2026-08-06
**Supersedes:** the three concepts as standalone proposals
**Synthesises:** [Concept A](./concepts/concept-a-performing-arts.md) (spine) · [Concept B](./concepts/concept-b-modern-academy.md) (decision layer) · [Concept C](./concepts/concept-c-cinematic-storytelling.md) (narrative order)
**Ranking rationale:** [`concept-comparison.md`](./concept-comparison.md)

---

## 1. The governing idea

> **The site has two rooms.**
>
> **The House** — dark, lit, composed. Where a parent is persuaded.
> **The Desk** — light, plain, specific. Where a parent decides.
>
> Every surface belongs to one room. Moving between them is a designed act, and
> the parent learns within one screen what each room means.

This is not a stylistic device. It is an information architecture the user can
*feel*, and it does four things at once:

1. It **enforces `05-motion-system.md` §17** — *motion intensity is inversely
   proportional to how close the user is to a decision* — as a visual law rather
   than a guideline someone has to remember.
2. It **structurally prevents the Phase 2 conversion failure.** Phase 2 found no
   price for any product, the $25 trial charge disclosed on 2 pages of 26, and a
   non-refundable deposit whose amount is published nowhere. When the law is
   *"facts live in the light,"* a price has nowhere dark to hide.
3. It **lets the brand sell transformation and lessons at the same time.**
   `01-brand-strategy.md` §0's central gap — the business delivers
   transformation and sells it like a commodity — is closed by giving each its
   own room instead of forcing one tone to do both jobs badly.
4. It **serves three audiences that want different things.** The teen and the
   Confidence Parent get the House. The Scholarship Family and the 10pm
   phone-researching parent get the Desk. Neither is a compromise of the other.

**The tagline holds the whole thing together:** *Ready for the stage.* The House
is the stage. The Desk is how you get ready.

---

## 2. The two registers, defined

Everything below is binding. A component declares its register; it does not
invent a hybrid.

| | 🎭 **THE HOUSE** | 📋 **THE DESK** |
|---|---|---|
| **Job** | Persuade, move, make them imagine | Inform, reassure, let them act |
| **Ground** | `stage-950` `#070A12` · `stage-900` `#0D1220` | `n-50` `#FAF9F7` · cards `n-0` |
| **Text** | `n-0` (18.7:1) · secondary `n-300` | `n-900` (17:1) · secondary `n-600` |
| **Accent** | `spot-400` text · `spot-500` fill | `velvet-700` links · `spot-500` fill only |
| **Rules/borders** | `stage-700` hairlines, used heavily | `n-200`, the grid is visible |
| **Display type** | Archivo 700, **width axis ~112 (expanded)** | Archivo 600–700, **normal width** |
| **Body** | Inter, short. **≤400 words per dark block** | Inter, 68ch, unlimited length |
| **Density** | Spacious — `space-20`/`space-24` | Comfortable — `space-10`→`space-16` |
| **Photography** | Production stills, bleeding off edges, no caption | Captioned, dated, inside the grid |
| **Motion** | Cinematic — reveals, scrub, light sweep | Minimal — `fade-rise` only, tables static |
| **Decorative texture** | Generated light textures permitted | ≤3% grain only. Never behind data |
| **Numbers** | May count up once | **Always static** |

### The five laws

1. **Anything a parent can act on lives at the Desk.** Prices, dates, ages,
   deposits, capacity, eligibility, terms, the guarantee, contact details,
   forms.
2. **Anything a parent must feel lives in the House.** The promise, the reframe,
   the method, the showcase, the turn.
3. **Never two primary CTAs in one viewport**, in either room (`04` §7 rule 3).
4. **No prose block over 400 words on a dark ground.** Long-form belongs to the
   Desk. Non-negotiable — it is a legibility rule, not an aesthetic one.
5. **One spotlight element per viewport.** If two things glow, neither is lit.

---

## 3. Register assignment

Every template, assigned. This table is the contract.

| Surface | Register | Rationale |
|---|---|---|
| Homepage hero, reframe, timeline, showcase, final CTA band | 🎭 House | Persuasion |
| Homepage syllabus, teachers, testimonials, pricing, access | 📋 Desk | Facts |
| `/programs/90-day-stage-program` | 🎭 **House** hero → 📋 **Desk** body | The flagship earns a full House opening; its structure and price are Desk |
| Programme detail pages | 🎭 Hero band → 📋 Desk body | |
| `/lessons` hub + 7 instrument pages | 📋 **Desk**, House hero band | Practical, parent-answering (`01` §4) |
| `/camps` | 📋 **Desk** | Transactional, dated, deposit-bearing. One House band for the campaign image |
| **`/scholarships`** | 📋 **Desk, entirely** | *"Plain, procedural, dignified"* (`01` §4). **No House treatment anywhere on this page** |
| **`/pricing`** | 📋 **Desk, entirely** | No motion on any figure (`05` §17) |
| `/teachers` | 📋 Desk | Portraits need honest, even light ⚠️ gate B-7 |
| `/performances`, `/events` | 🎭 **House** | The proof layer. The one place photography leads |
| `/about` | 🎭 House opening → 📋 Desk body | |
| `/faq`, `/terms`, `/privacy`, `/accessibility` | 📋 **Desk** | Zero motion (`05` §17) |
| `/contact`, booking flows | 📋 **Desk** | Zero atmosphere |
| Header | Adaptive — see §5 | |
| Footer | 🎭 House ground, Desk legibility | `stage-950`, `n-300` text, `spot-400` links (`04` §11) |
| **`/es/*`** | Mirrors English exactly | Spanish is a first-class path, not a lesser one |

---

## 4. Hero

**The Bill** (Concept A §3), with **Concept B's fact bar** welded to its base.
This single composition is where the two rooms meet, and it is the most
important screen in the project.

```
┌───────────────────────────────────────────────────────────────────────┐
│  SOUTH DADE MUSIC   90-Day  Programs  Lessons  Camps  Scholarships    │
│                             About  EN|ES  [ Book a Trial — $25 ]      │
├───────────────────────────────────────────────────────────────────────┤
│ 🎭 HOUSE                                                              │
│                                                                       │
│   THE 90-DAY STAGE PROGRAM              ← label, spot-400             │
│                                                                       │
│   In 90 days,                           ← display-xl, Archivo 700     │
│   your child                              expanded, n-0, 3 lines      │
│   takes a stage.                                                      │
│   ────────────────────────────          ← stage-700 hairline          │
│   Weeks 1–10 skill · Week 11 the        ← body-lg, n-300              │
│   class · Week 12 you.                                                │
│                                                                       │
│   [ Book a Trial — $25 ]  Come watch a showcase →                     │
│                                                                       │
│                        ┌────────────────────────────────────────────┐ │
│                        │  ONE PRODUCTION STILL — bleeding off the   │ │
│                        │  right and bottom edges. Generated stage-  │ │
│                        │  light texture behind the type, not the    │ │
│                        │  photograph.                               │ │
├────────────┬───────────┴──┬─────────────┬────────────────────────────┤ │
│ 📋 DESK    │              │             │                            │ │
│     90     │      12      │    3–18     │  Stage-Ready Guarantee     │ │
│    days    │    weeks     │    ages     │  Not ready? We keep        │ │
│            │              │             │  coaching. No extra charge.│ │
└────────────┴──────────────┴─────────────┴────────────────────────────┘
```

**Why the seam is here.** The parent meets both rooms in the first screen and
learns the language immediately: *dark is the promise, light is the proof.*
Everything below the fold is then legible without instruction.

**Rules:**
- H1 present at first paint. Never `opacity: 0` in CSS. LCP never JS-dependent.
- The photograph bleeds off two edges — never a floating rounded rectangle on
  dark, which reads as a stock-photo card.
- The guarantee is above the fold, at the Desk, **static forever**.
- Counters may animate once; the guarantee text never does.
- ⚠️ Hero copy blocked on **gate B-4**. Until it closes, the unconditional
  footer claim (*"every student performs… within 90 days"*) does not ship.
- **Interior heroes** use a two-thirds-height House band. **No light sweep** —
  that belongs to the homepage alone (`05` §9).

---

## 5. Navigation

**Concept A's marquee behaviour carrying Concept B's fact-bearing menu.**

| State | Behaviour |
|---|---|
| Over House hero | Transparent, hairline at 20% `n-0`, 80px |
| Scrolled / over Desk | `n-0` ground, `n-200` hairline, 64px |
| Over deep House sections | `stage-950` at 96% + backdrop blur, `stage-700` hairline |

**The header adapts to the register beneath it.** It is the one component that
crosses rooms, and it must always be legible against what it sits on.

**The 90-Day Program keeps its permanent, unhidden top-level slot** — the single
most important IA change (`02` §2) — and is typographically distinguished: set
in Archivo where siblings are Inter, with a `spot-400` hairline beneath. It
reads as *the current production*.

**The mega-menu is a Desk surface even when opened from a House header.** Light
ground, and it carries facts inline:

```
PROGRAMS ▾
  90-Day Stage Program ★   Ages 6–18 · 2×/week · 12 weeks · from $X
  Private Lessons          Ages 3+   · 1×/week · ongoing  · from $X
  Group Lessons            Ages 6–14 · 1×/week · ongoing  · from $X
  Band Builders            Ages 10–18· 1×/week · ongoing  · from $X
  Early Childhood          Ages 3–6  · 1×/week · ongoing  · from $X
  ─────────────────────────────────────────────────────────────────
  Not sure which? Take 30 seconds →          All pricing →
```

⚠️ The price column requires gate B-8. **Until it closes the column is omitted,
never faked.**

**`EN | ES` is a visible segmented control**, not a globe icon. A Spanish-only
parent must see their language without decoding a symbol.

**Mobile:** full-screen `stage-900` drawer, accordion, opens right, facts
retained inline. Sticky action bar after 25% scroll. The trial button is never
sacrificed for space.

---

## 6. Homepage hierarchy

**Concept C's six-beat narrative order, delivered in Concept A and B's two
rooms.** This is the synthesis at its most concrete: the film's *sequence*
without the film's *dependencies*.

| # | Section | Room | Beat (`01` §12) | Job |
|---|---|---|---|---|
| **1** | **The Bill** + fact bar | 🎭→📋 | — | Promise, substantiated |
| **2** | **The reframe** | 🎭 | Beat 2 | *"That's not shyness. That's a skill she hasn't been taught yet."* One sentence, `display-md`, no supporting copy. **The persuasive hinge** |
| **3** | **The 90-Day Timeline** ★ | 🎭 | Beat 4 | The signature moment. Pinned, scrubbed, releases into a real showcase photograph |
| **4** | **The 12 weeks, published** | 📋 | Beat 4 | The Timeline's claims as a readable table. Drama then substance |
| **5** | **The method — Exposure Ladder** | 🎭 | Beat 3 | Five rungs ⚠️ gate B-3 |
| **6** | **Your teachers** | 📋 | — | Named, credentialed, faces ⚠️ gate B-7. Until then, this slot is *Our Method* expanded |
| **7** | **Evidence — showcase** | 🎭 | — | The proof layer. Dated, captioned, gallery + lightbox ⚠️ gate I-4 |
| **8** | **In their words** | 📋 | — | 14 verbatim reviews. Light, because a quote must never look art-directed |
| **9** | **What it costs** | 📋 | — | Real price table, every product ⚠️ gate B-8 |
| **10** | **The door in** | 📋 | — | Step Up PEP + UA steps, bilingual, from age 3 |
| **11** | **The turn** | 🎭 | Beat 6 | The protected line: *"Because once they realize they can get through something that feels scary, it changes how they approach everything else."* |
| **12** | **The guarantee + start** | 📋 | Beat 5 | Risk reversal stated flat, then one CTA, terms above the form |

**The rhythm:** 🎭📋 · 🎭 · 🎭 · 📋 · 🎭 · 📋 · 🎭 · 📋 · 📋 · 📋 · 🎭 · 📋

Persuasion and proof alternate, tightening toward the Desk as the parent nears
the decision. **Beat 6 (the turn) deliberately sits after the price**, because
the last emotional note should land once the arithmetic is done — not before it.

---

## 7. Typography

Two families, as specified in `04-design-system.md` §2. **No new typefaces.**

| Element | House | Desk |
|---|---|---|
| Hero H1 | Archivo 700, **width ~112**, `display-xl` 40→88px, −0.03em, LH 1.05 | — |
| Section heads | Archivo 600, width ~106, `display-md` | Archivo 600, normal, `display-md` |
| Bill line | Archivo 500 **condensed**, uppercase, 0.12em — `WEEK 12 · SHOWCASE` | — |
| Card titles | — | Archivo 600, `heading-md` |
| Body | Inter 400, `body-lg`, ≤45ch | Inter 400, `body-md`, 68ch |
| Data | — | Inter 400–600, **tabular numerals throughout** |
| Eyebrows | `label`, `spot-400` | `label`, `velvet-700` |
| Stats | Archivo 700 tabular, `stat` 48→96px | Same, static |

**The variable width axis is the brand's typographic signature** — expanded for
poster statements, condensed for dated ledger lines, normal everywhere at the
Desk. It costs nothing extra: Archivo is already a variable font in the system.

### Rules

- **Maximum two expanded-width statements per page.**
- **Never centre display type.** Left-aligned, hung on the grid.
- **Sentence case for headings**; uppercase only for `label` and bill lines.
- **Exactly one H1 per page**, levels never skipped, audited in CI (`04` §2).
- ⚠️ **Spanish stress test is a design-review gate.** *"Listos para el
  escenario"* is 27 characters against 21. The width axis narrows to ~100 on the
  Spanish tree rather than reducing size. Prove it before build.

---

## 8. Colour

**No new tokens.** `04-design-system.md` §1 stands entirely. What changes is the
**ratio**, and it now varies by room.

| | System default | House | Desk | **Site blended** |
|---|---|---|---|---|
| Neutral light | 60% | 25% | **80%** | **55%** |
| Stage darks | 25% | **60%** | 8% | **30%** |
| Photography-led | 10% | 10% | 8% | 10% |
| Accent | 5% | 5% | 4% | **5%** |

The blended result sits close to the system's original intent — which is the
proof the synthesis is not fighting the design system, only distributing it.

**Hard rules, enforced at the token layer, not by review:**

- ❌ `spot-500` on white is **2.0:1**. Banned for text, permanently. Fill only.
- ✅ `velvet-700` `#6E1631` carries expressive weight at the Desk — links,
  eyebrows, secondary buttons — at 11.7:1 on white.
- ❌ **Velvet is never a background field.** A red velvet ground is the fastest
  route to dinner-theatre. Buttons and accents only.
- ✅ Functional colours (`success` `warn` `error` `info`) are **Desk-only** —
  capacity, deadlines, validation, eligibility.

---

## 9. Photography

**Concept A's grade, Concept B's caption discipline.**

| Attribute | Direction |
|---|---|
| Grade | Warm highlights, blue-black shadows retaining detail, restrained saturation (`04` §13) |
| Light | Single directional source — stage or window. Never flat fluorescent |
| House framing | Tight, generous negative dark space, bleeding off two edges |
| Desk framing | Mid-shot with context, inside the grid, **with a visible caption** |
| **Captions** | **Every Desk photograph carries date and context.** *"Winter showcase, March 2025 — Band Builders ensemble."* A photograph with a date is proof; the same photograph undated is decoration |
| Treatment | **No duotone, no colour overlay, no blend modes.** These are documentary evidence |
| Enhancement | Colour grade and crop only. **No AI subject insertion, removal or expansion** |

**Launch allocation from the 18 genuine photographs** (`image-style-guide.md` §2):

| Slot | Asset |
|---|---|
| Hero production still | `P1088527.jpg` |
| Timeline release frame | `DSCF3094-scaled.jpg` |
| Evidence gallery | `P1088689` · `P1088608` · `P1088597` · `P1088570` · `P1088680` |
| Violin page hero | `P1088639.jpg` — **promote**; likely the only genuine violin image |
| Guitar / Drums / Bass / Early Childhood / Private | `P1088541` · `P1088662` `P1088659` · `IMG_2582` `MG_0957` · `IMG_5012` · `P1088548` |

⚠️ **All 18 are blocked on gate I-1** (photo-release consent for identifiable
minors). **The direction degrades gracefully:** with zero approved photographs
the site still stands as a typographic system with generated light textures.
This resilience is the single most valuable thing inherited from Concept A.

---

## 10. Generated decorative assets

Governed by [`image-style-guide.md`](./image-style-guide.md). Pipeline:
`scripts/generate-image.mjs`. Register: `decorative`. Every asset
`pending-review` until a named human approves it.

### House — permitted

| Template | Use | Status |
|---|---|---|
| `hero-atmospheric-background` | The Bill's ground behind the H1 | ✅ **Generated** — `homepage-hero-stage-light.jpg`, pending review |
| `stage-light-texture` | Timeline ground · showcase band · final CTA band | Templated |
| `decorative-section-background` (dark variant) | Reframe and turn sections | Templated |
| `abstract-musical-composition` | `/lessons` hub ground, open-graph cards | Templated |

### Desk — permitted, minimal

| Template | Use |
|---|---|
| `scholarship-graphic` | `/scholarships` ground — deliberately plain |
| `decorative-section-background` (light) | ≤3% presence on `n-50` |
| `camp-campaign-graphic` | `/camps` backdrop only — **never the selling image** |

### New templates required

1. **`paper-bill-grain`** — warm paper tooth for Desk grounds, ≤3% opacity, so
   the light register feels printed rather than blank.
2. **`marquee-bulb-glow`** — diffuse warm bloom for the header band on scroll.
   No fixtures, no signage, no letters. Very low opacity.
3. **`diagram-substrate`** — soft warm ground so the Timeline and Ladder
   diagrams sit on something rather than floating.

### Deliberately **not** built

**`curtain-fold-texture`** (proposed in Concept A §9) is **cut.** It is the
single most likely asset to tip the direction into pastiche, and the light
textures already carry the theatrical register without it. If a curtain is ever
wanted, it must be photographed, not generated.

### Absolute prohibitions

No people, faces, hands or crowds · no text, letters or logos · no venue
architecture, proscenium arches or seating (those read as *our building*) · no
generated image of a student, teacher, classroom, lesson, showcase or award. The
pipeline blocks all of these before a request is sent, and `personGeneration:
ALLOW_NONE` is **unavailable** on the Developer API — so **human visual review
is mandatory, not optional** (see `generated-assets.md` open item 6).

**Volume target: 8–10 approved assets.**

---

## 11. Motion

`05-motion-system.md` governs entirely. Budget: **60% of motion effort to the
one signature moment.**

| # | Moment | Room | Technique | Budget |
|---|---|---|---|---|
| **1** | **The 90-Day Timeline** ★ | 🎭 | Pinned, scroll-scrubbed with smoothing, ~250vh. Rule draws left→right, week markers illuminate, **ambient ground darkens toward week 12**, releases into a real showcase photograph | **50%** |
| **2** | **The Exposure Ladder** | 🎭 | Pinned, scrubbed, five rungs illuminating, previous dimming but visible ⚠️ gate B-3 | 15% |
| **3** | **Room transitions** | — | Ground cross-fade at register boundaries, ~500ms, once, legible at both ends | 10% |
| **4** | **Hero light sweep** | 🎭 | Warm gradient across the still at 400ms, 900ms duration. **Homepage only** | 8% |
| **5** | **Curtain-up headlines** | 🎭 | Masked line reveals, `ease-curtain`. **Max two per page** | 6% |
| **6** | **Gallery FLIP → lightbox** | 🎭 | Image travels; it does not cross-fade | 6% |
| **7** | **Counters** | 🎭 | 90, 12, 3–18. Once, `ease-spot`, tabular. **Never near a CTA, never in the price table** | 5% |

**Both permitted pinned sequences are used, and neither is on a page that
duplicates the other's job** — the Timeline anchors the homepage and
`/programs/90-day-stage-program`; the Ladder anchors the method sections of that
page and `/about`. This resolves Concept C's structural conflict.

**The warming arc from Concept C survives in one place only:** inside the
Timeline, where the ground darkens and week 12 becomes the brightest moment on
the page. It is opacity on two layered elements — cheap, safe, and it is the
emotional payoff.

### Prohibited

Curtain-wipe page transitions · scroll-jacking, snapping, wheel hijacking ·
cursor-followers and custom cursors · preloaders · typewriter or scramble
effects · auto-advancing carousels · looping ambient motion during reading ·
animated photographs of students · confetti, sparkles, note particles.

### Desk motion budget

`fade-rise` reveals only. **Pricing tables, deposit amounts, dates, capacity,
policy text, the guarantee and contact details never animate** (`05` §16).

---

## 12. Mobile

The device where the decision is made. Mobile is not a reduction of the desktop
design — it is where the direction has to be *most* disciplined.

| Surface | Behaviour |
|---|---|
| Hero | Type stacks to 4–5 lines at 40px. Photograph moves below the CTAs as a **4:5 crop generated separately** — never centre-cropped from 16:9. Fact bar becomes 2×2 |
| Header | 56px, logo + hamburger + persistent trial button |
| Room transitions | **Retained** — they work better on mobile, because the whole viewport changes state |
| Timeline & Ladder | **Not pinned** (`05` §6 rule 4). Vertical stacked steps, `fade-rise` each. Full week structure readable in every degraded state |
| **Pricing table** | **Stacked cards below `md`.** Never horizontally scrolled. Hard rule |
| Long-form | Sticky "Jump to" control replacing the desktop in-page ToC |
| Sticky action bar | After 25% scroll, `stage-900`, `xl` button + call. Hides on form focus |
| Textures | 1K AVIF, ≤60KB at mobile widths. **Never an LCP element.** `marquee-bulb-glow` and `paper-bill-grain` are desktop-only |

**Budgets** (`05` §15): LCP <2.5s on 4G and never JS-dependent · CLS **0.00** ·
INP <200ms · GSAP + ScrollTrigger <45KB gzipped · total animation JS <70KB ·
60fps sustained, never below 50fps on a mid-range Android.

**Device-capability degradation:** `hardwareConcurrency ≤ 4` or `deviceMemory ≤
4GB` disables scrub, pinning and parallax while keeping simple reveals.
`Save-Data` degrades to reduced-motion behaviour.

---

## 13. Conversion

**Box-office language, Desk mechanics.** Three tiers per `02` §10.

| Tier | CTA | Room | Notes |
|---|---|---|---|
| **1** | **Book a Trial — $25** | 📋 | One per page. Price in the label, always. Persistent in header and mobile bar |
| **2** | **Come watch a showcase** | 🎭 | The zero-risk entry — the strongest conversion asset the business owns. ⚠️ Blocked until `/events` has real records |
| **2** | **Reserve a Seat — $X deposit** | 📋 | ⚠️ Deposit amount must be published first (gate B-8) |
| **2** | **Check if you qualify** | 📋 | Step Up guided eligibility path |
| **2** | **See all pricing** | 📋 | A price list is a genuine conversion action for a doubtful parent |
| **3** | Call · Directions · Español | 📋 | Persistent utility |

### The mechanics that fix Phase 2

1. **`/pricing` exists and lists every product.** It does not exist today for
   any product. Highest-conviction addition in the project.
2. **Terms above the form, never inside it** — the $25 charge, the
   non-refundable deposit, the make-up policy.
3. **Intent captured at source** as a hidden field, so a $450 camp reservation
   and a free enquiry are finally distinguishable.
4. **Every CTA is a real link or control.** The twenty text-only prompts found
   in Phase 2 become buttons or are deleted.
5. **The guarantee is a Desk statement** — plain ground, static, never over
   texture. It is the most valuable sentence the business owns and it must look
   like a promise, not a poster.
6. **No CTA promises something unproven.** Nothing says *"watch our showcase
   film"* until one exists.

---

## 14. Accessibility

A market requirement — the academy serves Unique Abilities scholarship students
(`04` §0 principle 6).

### What the two-room structure buys us

- **All long-form lives at the Desk**, at 17:1 on light — eliminating the
  dark-mode prose fatigue that is Concept A's main accessibility weakness
- **All data is real tables** with `<caption>` and `<th scope>`, directly
  navigable by screen reader
- **House text is `n-0` on `stage-900` at 18.7:1** and short by rule
- `spot-400` on `stage-900` at 11.7:1 — accent text genuinely readable
- Minimal motion at every decision surface, so the reduced-motion path is close
  to the default where it matters most

### Required mitigations

| Risk | Mitigation |
|---|---|
| **Room transition = luminance flip** | ≥500ms, never repeats, disabled under reduced motion (static Desk ground), verified against the WCAG 2.3.1 three-flash threshold |
| `spot-500` misuse | Banned as text on light; enforced at the token with a lint rule, not by review |
| Text over generated texture | Contrast verified against **the actual asset with the actual copy**, per breakpoint. Never assumed |
| Expanded-width type | Permitted only at `display-md` and above |
| Pinned sequences | Four degradation paths each: below `lg`, reduced motion, no JS, low-end device. **Full week structure readable in all four** |
| Spanish expansion | +35% tested on every heading component before build |

### Non-negotiable

Focus indicators never reduced, never animated, always full strength · skip link
first tab stop · no hover-only content (WCAG 2.2) · a **manual reduced-motion
toggle in the footer** alongside the OS preference, persisted · every animated
surface tested with the preference on — a launch gate.

---

## 15. What we are deliberately not doing

Naming rejected ideas protects the direction from drifting back toward them.

| Rejected | From | Why |
|---|---|---|
| Curtain-wipe page transitions | A | 800ms on every navigation; hurts the parent journey most |
| Velvet as a background field | A | Fastest route to dinner-theatre |
| `curtain-fold-texture` asset | A | Highest pastiche risk; light textures already carry the register |
| Marquee bulbs as literal fixtures | A | A generated venue is a fabricated venue |
| Dark-dominant scholarship or pricing pages | A | Must feel plain, procedural, trustworthy |
| Making the syllabus the signature moment | B | The Timeline is the signature; a table needs accuracy, not animation |
| Generated atmospheric hero at the Desk | B | Undercuts *"we show you the real thing"* |
| A cold-open homepage with no CTA | C | Buries the answers a parent came for |
| Full cinematic chaptering at launch | C | Requires a film that does not exist |
| Spending both pinned sequences on the homepage | C | Leaves the flagship weaker than the homepage about its own product |
| Custom cursors, preloaders, scroll-jacking, typewriter effects | C | Banned by `05` §16 |

---

## 16. Phase-two evolution

**Concept C is not discarded. It is scheduled.**

The moment a showcase is filmed and consent is on file, the homepage's House
sections can be re-authored as Concept C's chapter sequence — the narrative
order is already in place (§6), so this is a re-treatment, not a rebuild.

| Trigger | Unlocks |
|---|---|
| Showcase film delivered (gate M-3) | The Timeline's release moment becomes footage rather than a still |
| Consent obtained for the showcase set (I-1) | Full-bleed House photography throughout |
| A dated showcase exists (I-4) | The Bill's dated eyebrow · *"Come watch a showcase"* goes live |
| Teacher publication approved (B-7) | Teacher portraits and intro videos |

**Recommendation to the owner, independent of concept:** commission the showcase
film now. `09-image-strategy.md` §11 ranks it the single largest content gap in
the project, and it is the asset that unlocks the highest-ceiling version of
this site.

---

## 17. Dependencies and gates

Nothing below is a design opinion. Each is a decision the owner must make.

| Gate | Question | Blocks in this direction |
|---|---|---|
| **B-3** | Confirm the Exposure Ladder rungs | Homepage §5, pinned sequence 2 |
| **B-4** | Approve the honest 90-day promise wording | **Hero H1**, footer, structured data |
| **B-5** | Single brand name + ™ status | Logo lockup, header, schema |
| **B-6** | Bilingual: build it or drop the claim | The `/es` tree, type stress tests |
| **B-7** | Instructor names, credentials, permission | Homepage §6, `/teachers` |
| **B-8** | Pricing for every product | Homepage §9, `/pricing`, mega-menu, camp deposit |
| **D-1** | Logo review before token freeze | Palette confirmation |
| **I-1** | Photo-release consent for all 18 photographs | **Every real photograph on the site** |
| **I-4** | Next showcase date | The Bill's eyebrow, `/events`, showcase CTA |
| **M-3** | Showcase footage | Timeline payoff, phase-two evolution |

**Critical path to a homepage: B-4, B-5, B-7, B-8, I-1.**

**What ships if none of them close:** the House register, the typography system,
the navigation, the Timeline as an abstract diagram, the generated light
textures, and the Desk structure with empty tables. It would be a coherent,
handsome, honest site with visible gaps — which is materially better than
today's site, and dramatically better than what Concept B or C would produce
under the same conditions. **That resilience is why this direction is built on
Concept A's spine.**

---

## 18. Estimated effort

One senior front-end engineer with design support. Excludes content,
photography, copywriting and translation.

| Workstream | Effort |
|---|---|
| Tokens + two-register infrastructure | 1.5 wks |
| Typography (variable width axis, fluid scale, ES stress test) | 1 wk |
| Navigation — adaptive header, fact-bearing mega-menu, drawer | 1.5 wks |
| Homepage — 12 sections across two registers | 2.5 wks |
| **90-Day Timeline** (pinned, scrubbed, 4 degradation paths) | **2 wks** |
| **Exposure Ladder** (pinned, 4 degradation paths) | 1.5 wks |
| Room-transition mechanics + reduced motion + flash safety | 1 wk |
| **Pricing & comparison system** (incl. mobile card transform) | 1.5 wks |
| 12-week syllabus component | 0.75 wks |
| Interior templates (programme, instrument, camp, scholarship, teachers, FAQ, policies) | 3.5 wks |
| Forms + segmented booking flow | 2 wks |
| Gallery + lightbox FLIP | 1 wk |
| Generated-asset production, review, conversion | 0.75 wks |
| Accessibility audit and remediation | 1.5 wks |
| Performance tuning | 1 wk |
| **Total** | **≈ 23 wks** (~5.3 months) |

**≈3.5 weeks more than Concept A alone**, buying the entire Desk decision layer:
pricing, comparison, syllabus, guided scholarship path, and the accessibility
baseline. That is the best-value trade available in this document.

**Optional descope:** the programme recommender tool (−1.5 wks) and the Exposure
Ladder pin (−1.5 wks, degrades to a static diagram) are the two cleanest cuts if
timeline pressure arrives. **The Timeline is not a cut.**

---

## 19. The one-paragraph brief

> South Dade Music is a theatre that teaches. The website has two rooms. **The
> House** is dark, warm and composed — deep blue-black grounds, one amber light,
> poster typography set wide, a single production still lit like evidence. It is
> where a parent meets the promise, watches ninety days compress into a scroll,
> and imagines their own child in that light. **The Desk** is bright, plain and
> specific — warm off-white, tabular numerals, real tables, visible captions,
> almost no motion. It is where the same parent finds the price, the ages, the
> dates, the scholarship steps and the guarantee, and books a trial for
> twenty-five dollars. Moving between the rooms is the design. Nothing that
> matters is hidden in the dark, and nothing that should move a parent is
> flattened into a table. *Ready for the stage* is the promise; the House is the
> stage, and the Desk is how you get ready.

---

## 20. Open decisions for the owner

Not blockers for design work; blockers for build.

1. **Gate B-4** — approve the honest 90-day wording. Blocks the hero H1, which
   blocks everything.
2. **Gate B-5** — one brand name. Four are currently in use.
3. **Gate B-8** — publish prices, including the camp deposit amount.
4. **Gate B-7** — permission to name and photograph instructors.
5. **Gate I-1** — photo-release consent for all 18 existing photographs.
6. **Gate B-3** — confirm the five Exposure Ladder rungs.
7. **Gate B-6** — commit to bilingual, or drop the claim. It cannot stay claimed
   and unbuilt.
8. **Commission the showcase film.** Independent of everything above, and the
   highest-value content decision available.
9. **Name a reviewer** for generated assets. No AI output ships without one.

---

**Status:** Creative direction complete. **No implementation has begun.**
**Next phase:** design comps or engineering kickoff, at the owner's direction.
