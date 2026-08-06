# 02 — Information Architecture

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Source of truth:** `docs/source-content/manifest.json`, `duplicate-routes.md`, `programs.json`, `instruments.json`

---

## 0. What the current IA gets wrong

Five structural failures, all evidenced in Phase 2:

1. **The flagship product is an orphan in its own hierarchy.** `/90-day-stage-program/` links to neither `/private-lessons/` nor `/band-builders/` — the two classes it is literally composed of, per the `/resources/` FAQ. Nothing links back. A parent cannot discover what they are buying.
2. **Two live services are unreachable.** `/group-music-lessons/` and `/singing-lessons/` are absent from the nav, from `/programs/`, and from `/instruments/`. Voice is a core offering (promoted six times on `/programs/`, listed on the subdomain) with no route in.
3. **One label, two destinations.** The nav's "Summer Programs" → `/summer-jam-music-camp-2026/`; the homepage and `/programs/` cards under the same label → `/summer-programs/`.
4. **Four URLs for one summer product**, one of which is completely empty and indexable.
5. **The conversion layer has no hierarchy.** Thirty-plus CTAs, four different labels, all resolving to a single undifferentiated widget — so a $450 camp reservation and a free-trial enquiry are indistinguishable.

The IA below fixes all five and adds the four pages the business needs but does not have: **`/teachers`**, **`/pricing`**, **`/events`**, and a **Spanish tree**.

---

## 1. Complete sitemap

Legend: **NEW** = did not exist · **MOVED** = existing content, new route · **MERGE** = consolidated · ⚠️ = blocked on a decision gate

```
/                                          Home                              MOVED (/)
│
├── /programs                              Programme hub                     MOVED (/programs/)
│   ├── /programs/90-day-stage-program      ★ Flagship                       MOVED
│   ├── /programs/private-lessons                                            MOVED
│   ├── /programs/group-lessons                                              MOVED (de-orphaned)
│   ├── /programs/band-builders                                              MOVED
│   ├── /programs/early-childhood                                            MOVED
│   └── /programs/adults                    ⚠️ gate B-2                       NEW
│
├── /lessons                               Instrument hub                    MOVED (/instruments/)
│   ├── /lessons/piano                                                       MOVED
│   ├── /lessons/guitar                                                      MOVED
│   ├── /lessons/drums                                                       MOVED
│   ├── /lessons/bass                                                        MOVED
│   ├── /lessons/violin                                                      MOVED
│   ├── /lessons/ukulele                                                     MOVED
│   └── /lessons/voice                                                       MOVED (de-orphaned)
│       └── ⚠️ keyboard — gate: fold into /lessons/piano or create route
│
├── /camps                                 Evergreen camp parent             MERGE (/summer-programs/)
│   └── /camps/summer-jam-2027              Dated child                      NEW (pattern from 2026)
│       └── /camps/summer-jam-2026          Archived, noindex                MOVED
│
├── /scholarships                          Step Up PEP & UA                  MOVED (/step-up-accessibility/)
│   ├── /scholarships/pep                   Deep page                        NEW (optional, phase 2)
│   └── /scholarships/unique-abilities      Deep page                        NEW (optional, phase 2)
│
├── /performances                          Showcase hub                      MOVED
│   ├── /performances/[year]-[slug]         Individual showcase records      NEW
│   └── /events                             Upcoming calendar                NEW
│
├── /about                                 Story, method, mission            MOVED
│   └── /teachers                           ★ Instructor profiles            NEW ⚠️ gate B-7
│       └── /teachers/[slug]                Individual bios                  NEW
│
├── /pricing                               ★ All tuition                     NEW ⚠️ gate B-8
│
├── /faq                                   Consolidated FAQ                  MOVED (/resources/)
│
├── /contact                               Contact + enrol                   MOVED (/contact-enroll/)
│   └── /contact/book-a-trial               Dedicated booking landing        NEW
│
├── /es/*                                  Full Spanish tree ⚠️ gate B-6     NEW
│
└── Utility
    ├── /privacy-policy                                                      NEW
    ├── /terms                              Incl. refund & make-up policy    NEW
    ├── /accessibility                      Statement                        NEW
    ├── /sitemap.xml  /robots.txt  /404  /search
    └── ✗ /members — EXCLUDED until a real portal exists (lorem ipsum today)
```

**Page count:** 31 English routes at launch (excluding dated children and utility), versus 26 today — but four of today's are dead weight (`/summer-camp/`, `/summercamp/`, `/members/`, `/media_slider/*`).

---

## 2. Main navigation

### Design constraints

- **Maximum 6 top-level items.** The current nav has 8 and still omits two live services.
- **The flagship must be visible without a hover.** Today, `/90-day-stage-program/` is buried at position 5 of a dropdown.
- **The primary CTA is not a nav item.** It is a persistent button.
- **Language switch is a first-class control**, not a footer link.

### Recommended structure

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   The 90-Day Program   Programs ▾   Lessons ▾   Camps   Scholarships │
│                                            About ▾    │  EN|ES  │ Book a Trial│
└──────────────────────────────────────────────────────────────────────────────┘
```

| Item | Type | Target | Rationale |
|---|---|---|---|
| **The 90-Day Program** | Direct link | `/programs/90-day-stage-program` | The differentiator gets a permanent, unhidden slot. This is the single most important IA change. |
| **Programs** ▾ | Mega-menu | `/programs` | Private · Group · Band Builders · Early Childhood · ⚠️ Adults |
| **Lessons** ▾ | Mega-menu | `/lessons` | 7 instruments, each with an icon |
| **Camps** | Direct link | `/camps` | Seasonal prominence; evergreen parent so it never expires |
| **Scholarships** | Direct link | `/scholarships` | Elevated from a buried item — this is the secondary audience's entry door |
| **About** ▾ | Dropdown | `/about` | Our Method · Teachers · Performances · FAQ · Contact |
| **EN \| ES** | Toggle | mirrors current route | ⚠️ gate B-6 |
| **Book a Trial** | Button, persistent | `/contact/book-a-trial` | Distinct visual weight; never scrolls away |

### Mega-menu content

**Programs ▾**
```
BY STRUCTURE                    BY AGE                      START HERE
90-Day Stage Program ★          Early Childhood (3–6)       Book a trial → $25
Private Lessons                 Kids & Teens (6–18)         Not sure which?
Group Lessons                   Adults ⚠️                    → Take 30 seconds
Band Builders
                                                            [Showcase thumbnail]
```

**Lessons ▾**
```
Piano    Guitar    Drums    Bass                 "Not sure which instrument?"
Violin   Ukulele   Voice                         → Our teachers help you choose
                                                 [Instrument photo]
```

### What the nav must never do

- No item labelled "Instruments" — parents search for *lessons*, not *instruments* (the current label costs clarity for zero gain)
- No "Resources" — it is an FAQ; call it FAQ and put it under About
- No dead-end labels resolving to two different URLs
- No dropdown deeper than one level

---

## 3. Footer navigation

Four columns plus a utility bar. The footer is where the extraction found the *only* copies of the hours, the ™ line, and the phone number — it is load-bearing and must be treated as such.

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  PROGRAMS          LESSONS           ABOUT              VISIT US               │
│  90-Day Program    Piano             Our Story          601 W Palm Dr          │
│  Private Lessons   Guitar            Our Method         Unit ⚠️ [117/1157/115]  │
│  Group Lessons     Drums             Teachers           Florida City, FL 33034 │
│  Band Builders     Bass              Performances                              │
│  Early Childhood   Violin            Events             786-753-9509 ⚠️         │
│  Summer Camps      Ukulele           FAQ                info@southdademusic.com│
│  Scholarships      Voice             Contact            Mon–Sat 8:00am–6:00pm  │
│                                                         Sun closed             │
│                                                         [Map link] [Directions]│
├───────────────────────────────────────────────────────────────────────────────┤
│  "Home of the 90-Day Stage Program — every student gets stage-ready."  ⚠️ B-4  │
│  Serving Florida City · Homestead · Cutler Bay · Palmetto Bay                  │
│  [IG] [FB] [YT] ⚠️ gate: profiles must be recovered                             │
├───────────────────────────────────────────────────────────────────────────────┤
│  © 2026 [Legal entity ⚠️ B-5]  ·  Privacy · Terms · Accessibility · Español    │
└───────────────────────────────────────────────────────────────────────────────┘
```

**Footer rules**
- The service-area city list is a deliberate local-SEO surface (see `06-seo-strategy.md` §5) — real cities only, no keyword padding
- Hours and address appear here **and** on `/contact` — never footer-only, which is today's failure
- The ™ line is retained only if gate B-5 confirms registration
- Social icons ship only when real profiles exist; **no placeholder icons**

---

## 4. Mobile navigation

Mobile is the majority surface for this audience. The pattern must survive a parent standing in a school pickup line.

### Structure

```
┌─────────────────────────────┐
│ [LOGO]      EN|ES    [ ☰ ]  │   Sticky, 56px, condenses on scroll
└─────────────────────────────┘
              ⋮
┌─────────────────────────────┐
│  [ Book a Trial — $25 ]     │   Sticky bottom bar, appears after 25% scroll
│  [ Call ]  [ WhatsApp ⚠️ ]   │
└─────────────────────────────┘
```

### Drawer contents (full-screen, top-down priority)

```
1  ★ The 90-Day Program          ← visually distinct, first
2    Programs            ▸        ← accordion, not a new screen
3    Lessons             ▸
4    Camps
5    Scholarships
6    About               ▸
   ─────────────────────
     Teachers
     Performances
     Pricing
     FAQ
     Contact
   ─────────────────────
     786-753-9509  ·  Directions
     Español
   ─────────────────────
   [ Book a Trial — $25 ]
```

### Mobile-specific rules

- **Accordions, not stacked screens.** Never make a parent navigate back to compare two programmes.
- **Sticky bottom action bar** with 2–3 actions maximum. Call must be one tap.
- **The $25 is in the button label.** Phase 2 found the trial price disclosed on 2 of 26 pages; putting it in the CTA itself makes non-disclosure structurally impossible.
- **Thumb zone:** all primary actions in the lower 40% of the viewport.
- **Minimum target 44×44px**, 8px minimum spacing between adjacent targets.
- **The drawer opens instantly.** No entrance choreography over 200ms (see `05-motion-system.md` §14).

---

## 5. Parent navigation flow

The dominant path. Designed so every step answers the question raised by the previous one.

```
   Google / Instagram / word of mouth
                 │
                 ▼
    ┌────────────────────────┐
    │        HOMEPAGE        │  Q: "Is this for us?"
    │  Promise + the ladder  │  A: 90 days → a stage
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  90-DAY STAGE PROGRAM  │  Q: "What actually happens?"
    │  Week-by-week + guarantee│ A: Weeks 1–10 / 11 / 12
    └───────────┬────────────┘
        ┌───────┼────────┬────────────┐
        ▼       ▼        ▼            ▼
   ┌─────────┐ ┌──────┐ ┌──────────┐ ┌────────┐
   │TEACHERS │ │PERFOR│ │ PRICING  │ │LESSONS │
   │"Who?"   │ │MANCES│ │"How much"│ │"Which  │
   │         │ │"Real?"│ │          │ │ one?"  │
   └────┬────┘ └──┬───┘ └────┬─────┘ └───┬────┘
        └─────────┴──────────┴───────────┘
                        │
                        ▼
              ┌───────────────────┐
              │  BOOK A TRIAL     │  $25, credited to tuition
              │  disclosed upfront│
              └───────────────────┘
```

**Critical design requirement — the four-way answer bar.** The 90-Day page must offer all four next questions (*who / real? / cost / which instrument*) in one visible module, because parents do not ask them in a fixed order. Today, that page links to none of them.

### Cross-links every programme page must carry

| From | Must link to | Why |
|---|---|---|
| Any programme | `/pricing`, `/teachers`, `/contact/book-a-trial` | The three universal blockers |
| `/programs/90-day-stage-program` | `/programs/private-lessons`, `/programs/band-builders`, `/performances` | Its own components + proof |
| `/programs/private-lessons` | `/lessons/*`, `/programs/band-builders` | Instrument choice + step 3 of its stated path |
| `/programs/band-builders` | `/programs/private-lessons`, `/programs/90-day-stage-program` | Its prerequisite + its parent product |
| Any instrument page | Its programmes, `/teachers`, `/pricing` | Fixes the current dead-end pattern |
| `/scholarships` | `/programs`, `/contact`, stepupforstudents.org | Currently links to none of these |

---

## 6. Student journey (in the IA)

Students do not browse; they arrive at a page a parent opened. The IA serves them through **evidence density**, not navigation.

| Rung (from `01-brand-strategy.md` §7) | Page that carries it | Content requirement |
|---|---|---|
| Alone | `/programs/private-lessons` | One-to-one framing, teacher faces |
| Heard | `/lessons/[instrument]` | "First song by week X" milestone |
| Beside | `/programs/band-builders` | Ensemble photography ⚠️ *thin today* |
| Among | `/programs/90-day-stage-program` | Week 11 explicitly named |
| Before | `/performances` | Showcase film ⚠️ **zero video exists** |
| Again | `/events` | The next showcase date, published |

**Teen-specific requirement:** a teen landing on `/lessons/guitar` or `/programs/band-builders` must reach ensemble evidence within one click. If those pages look like a children's site, the teen vetoes the purchase.

---

## 7. Programme hierarchy

The single most important conceptual fix in this document.

### The correct model (from `/resources/`: *"two classes weekly: one for skill, one for band application"*)

```
                   90-DAY STAGE PROGRAM
                   (the product families buy)
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
      SKILL TRACK                        ENSEMBLE TRACK
      Private Lessons                    Band Builders
      1-to-1, weekly                     group, weekly
      choose an instrument               play with others
             │                                 │
             └────────────────┬────────────────┘
                              ▼
                    WEEK 12 · LIVE SHOWCASE
```

### Standalone entry points (not everyone buys the flagship)

```
Early Childhood (3–6)  →  play-based, no performance requirement ⚠️ gate B-4
Group Lessons (6+)     →  social/lower-cost entry, can feed the ensemble track
Summer Camps (7–15)    →  3-week compressed version of the same arc
Adults ⚠️ B-2          →  separate track entirely
```

### Hierarchy rules

1. **`/programs` presents the 90-Day Program as the default**, with the others as components or alternatives — not as five equal siblings, which is today's flat and confusing presentation.
2. **Every component page states its relationship** to the flagship in its first screen.
3. **Early Childhood is explicitly outside the 90-day promise** until gate B-4 resolves whether a 3-year-old performs.
4. ⚠️ **Blocked:** whether the 90-Day Program is priced as a bundle or as two separate enrolments. This determines whether `/programs/private-lessons` and `/programs/band-builders` are products or explainers. **Gate B-8.**

---

## 8. Instrument hierarchy

### Flat, seven items, one template

```
/lessons  ──┬── /lessons/piano      5–6+   keyboard sufficient to start
            ├── /lessons/guitar     6–7+   own instrument needed
            ├── /lessons/drums      5–6+   practice pad sufficient
            ├── /lessons/bass       7–8+   starter bass + small amp
            ├── /lessons/violin     5–6+   correctly sized violin needed
            ├── /lessons/ukulele    5–6+   own instrument needed
            └── /lessons/voice      5–6+   nothing needed
```

All start ages and equipment requirements are extracted verbatim from `instruments.json`.

### Sorting and filtering on `/lessons`

- **Default order:** by popularity — Piano, Guitar, Drums, Voice, Violin, Ukulele, Bass
- **Filter: "Good for ages…"** — 5+ / 7+ / teens — using the extracted start ages, which is a genuine parent need currently unserved
- **Filter: "Nothing to buy"** — surfaces Voice, and Piano/Drums with their low-cost entry options. A real objection handler.

### Resolved inconsistencies

| Issue found | IA resolution |
|---|---|
| Voice orphaned | Full member of `/lessons` and the nav |
| Keyboard advertised with no page | ⚠️ Gate: fold into `/lessons/piano` as "Piano & Keyboard" (recommended), or create a route |
| `/instruments/` listed 6, homepage 7, subdomain 7 incl. Voice | Single canonical list of 7 |
| Violin/ukulele/voice pages show the wrong instrument photo | Content model enforces one required, subject-verified hero per instrument (`08-content-model.md`) |
| "All lessons are private" on 3 pages vs group offered elsewhere | ⚠️ Gate: each instrument declares available formats explicitly per `formats[]` field |

---

## 9. Internal linking strategy

Today: programme pages link to **zero** other programme pages. Instrument pages link to nothing but global nav. This is the largest, cheapest SEO and UX win available.

### Link rules by template

| Template | Required outbound links | Min |
|---|---|---|
| Home | Flagship, 3 programmes, 4 instruments, performances, scholarships, pricing, trial | 12 |
| `/programs` hub | All child programmes, pricing, trial | 7 |
| Programme page | Parent hub, sibling programmes, related instruments, teachers, pricing, proof, trial | 8 |
| `/lessons` hub | All 7 instruments, related programmes, pricing | 10 |
| Instrument page | Hub, 2 related instruments, its programmes, teachers of it, pricing, trial | 7 |
| `/camps` | Dated child, programmes, pricing, FAQ | 5 |
| `/scholarships` | Programmes, contact, **stepupforstudents.org**, FAQ | 5 |
| `/performances` | Individual showcases, flagship, band builders, events | 5 |
| `/teachers` | Instruments taught, programmes taught, trial | 6 |
| Blog/article (future) | 2 pillar pages, 1 conversion page | 3 |

### Hub-and-spoke clusters

```
CLUSTER 1 — Transformation (pillar: /programs/90-day-stage-program)
  ├ /programs/private-lessons  ├ /programs/band-builders
  ├ /performances              └ /about (method)

CLUSTER 2 — Instruments (pillar: /lessons)
  └ 7 instrument pages, cross-linked to programmes and teachers

CLUSTER 3 — Access (pillar: /scholarships)
  ├ /scholarships/pep  ├ /scholarships/unique-abilities
  ├ /pricing           └ /es/* (bilingual mirror)

CLUSTER 4 — Seasonal (pillar: /camps)
  └ dated camp children, archived by year

CLUSTER 5 — Trust (pillar: /about)
  ├ /teachers  ├ /performances  ├ /events  └ /faq
```

### Anchor-text policy

- **Descriptive, human, varied.** "See how the 90-day cycle works" not "click here" and not "kids music classes south dade".
- **Never** repeat an exact-match keyword phrase as anchor text more than twice sitewide.
- **Banned:** every keyword string Phase 2 flagged — *Music Lessons Near Me*, *Kids Music Classes South Dade*, *Group Music Classes South Dade*, *Piano Lessons Near Me*, *Guitar Teacher Near Me*, *Violin Teachers Near Me*, *Private Drum Lessons* as a proper noun.

### Orphan prevention

Every published route must be reachable within **three clicks of the homepage** and linked from at least **two** other pages. Enforced as a build-time check. This alone would have prevented `/group-music-lessons/`, `/singing-lessons/` and `/members/` from going unnoticed.

---

## 10. Conversion hierarchy

Phase 2 found four CTA labels resolving to one widget, plus twenty unlinked text prompts sitting at the bottom of instrument pages — the exact point of highest intent.

### Three tiers

**Tier 1 — Primary (one per page, always)**
> **Book a Trial — $25**
> `/contact/book-a-trial` → segmented booking flow
Price in the label. High-emphasis button. Persistent in header and mobile action bar.

**Tier 2 — Secondary (contextual, one or two per page)**

| Context | CTA | Destination |
|---|---|---|
| Camp pages | **Reserve a Seat** | Camp-specific flow, deposit amount shown ⚠️ B-8 |
| Scholarship | **Check if you qualify** | Guided eligibility path |
| Undecided | **Not sure which programme?** | Short recommender |
| Teacher pages | **Request this teacher** | Booking, teacher pre-selected |
| Events | **Come watch a showcase** | Free, zero-risk entry ⚠️ needs a real event |

**Tier 3 — Utility (persistent, low emphasis)**
Call · WhatsApp ⚠️ · Directions · Email · Español

### The zero-risk entry point

The strongest available conversion asset is **not** the paid trial — it is *"free performances"* (`/resources/`). Inviting a hesitant parent to **come and watch a showcase** costs nothing, proves the promise, and self-selects buyers. This should be Tier 2 sitewide.
⚠️ **Blocked:** no event has a published date and both event URLs 404. Cannot ship until `/events` has real records.

### Rules

1. **One primary CTA per page.** No competing equals.
2. **Price disclosed before the form**, never inside it.
3. **Every CTA is a link.** The twenty text-only prompts become real buttons or are deleted.
4. **Intent is captured at source** — the booking flow records which product the enquiry came from. One widget for all intents makes attribution impossible today.
5. **No CTA promises something unproven.** Nothing may say "book a Spanish consultation" or "watch our showcase film" until those exist.
6. **Camp CTAs must state the deposit amount.** Today it is non-refundable, "required today", and unpublished. ⚠️ Hard block.

---

## 11. Canonical URL strategy

### Rules

1. Lowercase, hyphenated, no trailing slash, no dates in evergreen slugs
2. Depth ≤ 3 segments
3. Semantic parents (`/lessons/piano`, not `/piano-lessons`)
4. `<link rel="canonical">` self-referencing on every indexable page
5. Dated content uses `/parent/[year]-[slug]`; the parent is always evergreen
6. Spanish mirrors English exactly under `/es/`, with reciprocal `hreflang`

### Redirect map (from Phase 2)

| Old | New | Type | Note |
|---|---|---|---|
| `/about/` | `/about` | 301 | |
| `/programs/` | `/programs` | 301 | |
| `/instruments/` | `/lessons` | 301 | Renamed for search intent |
| `/piano-lessons/` | `/lessons/piano` | 301 | |
| `/guitar-lessons/` | `/lessons/guitar` | 301 | |
| `/drum-lessons/` | `/lessons/drums` | 301 | |
| `/bass-guitar-lessons/` | `/lessons/bass` | 301 | |
| `/violin-lessons/` | `/lessons/violin` | 301 | |
| `/ukulele-lessons/` | `/lessons/ukulele` | 301 | |
| `/singing-lessons/` | `/lessons/voice` | 301 | De-orphaned |
| `/private-lessons/` | `/programs/private-lessons` | 301 | |
| `/group-music-lessons/` | `/programs/group-lessons` | 301 | De-orphaned |
| `/band-builders/` | `/programs/band-builders` | 301 | |
| `/early-childhood/` | `/programs/early-childhood` | 301 | |
| `/90-day-stage-program/` | `/programs/90-day-stage-program` | 301 | |
| `/step-up-accessibility/` | `/scholarships` | 301 | |
| `/resources/` | `/faq` | 301 | |
| `/contact-enroll/` | `/contact` | 301 | |
| `/performances/` | `/performances` | 301 | |
| `/summer-programs/` | `/camps` | 301 | Prose merged |
| `/summer-jam-music-camp-2026/` | `/camps/summer-jam-2026` | 301 | Archived, noindex |
| `/summercamp/` | `/camps` | 301 | **Salvage 4 pillar icons first** |
| `/summer-camp/` | `/camps` | 301 | **Urgent — empty and indexable today** |
| `/members/` | `/` | 301 | Lorem ipsum; no portal exists |
| `/media_slider/` | — | 410 | De-register the CPT |
| `/media_slider/slider/` | — | 410 | De-register the CPT |
| `/event/bazaar-and-flea-market-performance` | `/performances` | 301 | Currently 404 |
| `/events/month/2025-03/` | `/events` | 301 | Currently 404 |
| `/home` | `/` | 301 | Orphan link found in markup |
| `/contact-enroll/home`, `/members/home` | `/` | 301 | Orphan links in markup |

**Redirect discipline:** single hop only, no chains, no loops. Preserve for a minimum of 12 months. Verify every row before DNS cutover.

### `try.southdademusic.com`

⚠️ **Gate B-5.** Three options:
- **(a) Retire** — 301 the subdomain to `/`. Recommended once the main site converts properly.
- **(b) Align** — keep as a paid-traffic landing page, corrected to the single brand name, phone and address.
- **(c) Isolate** — keep as-is but `noindex`, so it cannot contradict the main site in search.

It must not remain live, indexed, and contradictory. **Salvage first:** two unique testimonials (John Granada, Charles Percy — note the latter names two minors) and the logo variant.

---

## 12. Search, 404 and edge routes

- **`/search`** — site search across programmes, instruments, FAQ, teachers, performances. Zero-result state offers the top three conversion paths.
- **`/404`** — must not carry the staging-domain hero it uses today. Offers: 90-Day Program, Lessons, Camps, Contact, plus search.
- **`/es/*`** — full mirror, not a subset. A partial Spanish tree is worse than none because it strands the user mid-journey.

---

## 13. IA decision gates

| Gate | Question | Blocks |
|---|---|---|
| **IA-1** | Keyboard: fold into piano, or its own route? | `/lessons` structure, nav |
| **IA-2** | Is the 90-Day Program sold as a bundle or two enrolments? | `/programs` hierarchy, `/pricing`, booking flow |
| **IA-3** | Does Early Childhood sit inside the 90-day promise? | `/programs` copy, structured data |
| **IA-4** | Bilingual — full `/es/` tree at launch or post-launch? | Scope, content model, budget |
| **IA-5** | Fate of `try.southdademusic.com` | Redirects, brand consistency |
| **IA-6** | Are there real, dated upcoming events to publish? | `/events`, the zero-risk CTA |
| **IA-7** | Adult provision real? | `/programs/adults` |

---

**Next:** `03-user-journey.md`
