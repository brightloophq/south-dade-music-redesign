# 04 — Design System

**Phase:** 3 — Product Strategy
**Date:** 2026-08-05
**Depends on:** `01-brand-strategy.md` (personality, audience), `02-information-architecture.md` (templates)

---

## 0. The central design constraint

One tension governs every decision in this document:

> **A 6-year-old's parent must find it warm. A 15-year-old must not find it embarrassing.**

Most music-school sites resolve this by picking a side — primary colours and clip-art (loses the teen, reads amateur to the parent), or conservatory austerity (loses the child, reads expensive and cold).

**We resolve it with a third frame: the stage itself.** Theatre is credible to a teenager, warm to a parent, and aspirational to both. A darkened house, a lit performer, a warm spill of light. That is the visual thesis, and it is drawn directly from the product — the 90-Day Stage Program.

**Design principles**

1. **Stage, not classroom.** Dark grounds, warm light, a single subject. Never desks and worksheets.
2. **Evidence over decoration.** A real photograph of a real student beats any illustration. Photography is the primary design material.
3. **Say the number.** Dates, weeks, ages and prices get typographic weight. Vagueness is the failure mode we are correcting.
4. **Calm structure, warm accents.** The layout is quiet and rigorous; the warmth comes from light and photography, not from busy ornament.
5. **Bilingual by construction.** Every component tolerates +35% text expansion in Spanish without breaking.
6. **Accessible by default.** This academy serves Unique Abilities scholarship students. Accessibility is a market requirement, not a compliance chore.

---

## 1. Colour palette

### Concept

Three families: **Stage** (the darkened house), **Spotlight** (the light), **Velvet** (the curtain). Plus a warm neutral ramp and a functional set.

### Stage — primary ground

| Token | Hex | Use |
|---|---|---|
| `stage-950` | `#070A12` | Deepest ground, hero backdrops, footer |
| `stage-900` | `#0D1220` | **Primary dark surface**, dark-mode base |
| `stage-800` | `#161E32` | Raised dark surfaces, cards on dark |
| `stage-700` | `#232E4A` | Borders on dark, dividers |
| `stage-600` | `#35436A` | Muted dark UI, disabled on dark |

A blue-black, not a true black. True black photographs badly against warm stage imagery and reads harsh on OLED mobile.

### Spotlight — primary accent

| Token | Hex | Use |
|---|---|---|
| `spot-300` | `#FFD68A` | Subtle highlights, glow edges |
| `spot-400` | `#FFC15C` | **Accent text on dark** — 11.7:1 on `stage-900` |
| `spot-500` | `#F5A524` | **Primary CTA fill** — 9.2:1 with `stage-950` text |
| `spot-600` | `#D4870E` | CTA hover, borders |
| `spot-700` | `#A66908` | Pressed state |

⚠️ **Hard rule:** `spot-500` on white is **2.0:1** — it fails all text contrast. Spotlight is **never** body text on light backgrounds. It is a fill, a highlight, or text on dark only.

### Velvet — secondary accent

| Token | Hex | Use |
|---|---|---|
| `velvet-500` | `#B12A4B` | Decorative, chart series |
| `velvet-600` | `#8B1E3F` | Secondary buttons — 8.9:1 with white text |
| `velvet-700` | `#6E1631` | **Links on light backgrounds** — 11.7:1 on white |

### Neutrals — warm grey ramp

| Token | Hex | Use |
|---|---|---|
| `n-0` | `#FFFFFF` | Pure white — cards on light |
| `n-50` | `#FAF9F7` | **Page background (light)** |
| `n-100` | `#F2F0EC` | Subtle fills, table stripes |
| `n-200` | `#E5E2DC` | **Borders, dividers** |
| `n-300` | `#D2CEC6` | Disabled borders |
| `n-400` | `#A9A49A` | Placeholder text (large only) |
| `n-500` | `#7C776D` | **Muted text** — 4.6:1 on `n-50` |
| `n-600` | `#5A564E` | Secondary text — 7.3:1 |
| `n-700` | `#403D37` | Strong secondary |
| `n-800` | `#2A2823` | Headings on light |
| `n-900` | `#171613` | **Body text on light** — 17:1 |

Warm-tinted, not neutral grey. Cool greys fight the amber spotlight and make photography look clinical.

### Functional

| Token | Hex | Use |
|---|---|---|
| `success-600` | `#1F7A4C` | Confirmations, "seat reserved" |
| `warn-600` | `#9A5B00` | Capacity warnings, deadlines |
| `error-600` | `#B3261E` | Form errors |
| `info-600` | `#1F5C8B` | Neutral notices |

All four pass 4.5:1 on `n-50` and on white.

### Semantic aliases

Components reference these, never raw palette values.

```
--surface-page          n-50        --surface-page-dark      stage-900
--surface-raised        n-0         --surface-raised-dark    stage-800
--surface-sunken        n-100       --border-default         n-200
--text-primary          n-900       --text-primary-dark      n-0
--text-secondary        n-600       --text-secondary-dark    n-300
--text-muted            n-500       --text-accent-dark       spot-400
--action-primary-bg     spot-500    --action-primary-fg      stage-950
--action-secondary-bg   velvet-600  --action-secondary-fg    n-0
--link-default          velvet-700  --link-dark              spot-400
--focus-ring            spot-500    --focus-ring-offset      stage-950
```

### Contrast reference

*Ratios computed from the values above; re-verify with an automated checker during build.*

| Pair | Ratio | Verdict |
|---|---|---|
| `n-900` on `n-50` | ~17:1 | AAA |
| `n-600` on `n-50` | ~7.3:1 | AAA |
| `n-500` on `n-50` | ~4.6:1 | AA |
| `n-0` on `stage-900` | ~18.7:1 | AAA |
| `spot-400` on `stage-900` | ~11.7:1 | AAA |
| `stage-950` on `spot-500` | ~9.2:1 | AAA — primary CTA |
| `n-0` on `velvet-600` | ~8.9:1 | AAA — secondary CTA |
| `velvet-700` on `n-0` | ~11.7:1 | AAA — links |
| ❌ `spot-500` on `n-0` | ~2.0:1 | **Fails — banned for text** |

### Usage ratios

Roughly **60 / 25 / 10 / 5** — neutral surfaces / stage darks / photography-led sections / accent. Spotlight amber should feel scarce and therefore valuable; if everything glows, nothing does.

### ⚠️ Gate D-1

The existing logo's colours were not extracted (only the file `logo-1.png`). The palette above is derived from brand strategy, not from the mark. **The logo must be reviewed before tokens are frozen** — if it carries an incompatible hue, either the logo is refreshed or `velvet` is re-tuned.

---

## 2. Typography

### Typefaces

| Role | Family | Why | Licence |
|---|---|---|---|
| **Display** | **Archivo** (variable, width + weight axes) | Grotesk with an expanded axis that reads like a concert bill — confident, poster-like, not childish. Extreme widths give hero drama; normal width stays readable. | OFL, self-hosted |
| **Body / UI** | **Inter** (variable) | Screen-optimised, excellent Spanish diacritic coverage (á é í ó ú ñ ü ¿ ¡), tabular numerals for prices and dates. | OFL, self-hosted |
| **Numerals** | Inter, `font-variant-numeric: tabular-nums` | Prices, dates, week counters, capacity — must not shift width when animating. | — |

Two families only. Self-hosted WOFF2, subset to Latin + Latin-1 Supplement. **No third-party font CDN** — the current site already loads emoji from `s.w.org`, and we are removing external dependencies, not adding them.

⚠️ **Fallback if Archivo is rejected at design review:** *Bricolage Grotesque* (more characterful) or *Söhne Breit* (licensed). Do not substitute a rounded or geometric "friendly" face — it collapses the teen credibility constraint.

### Type scale

Fluid, `clamp()`-based, 1.250 (major third) on mobile widening to 1.333 at desktop.

| Token | Mobile → Desktop | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | 40 → 88px | Archivo 700, expanded | −0.03em | Homepage hero only |
| `display-lg` | 34 → 64px | Archivo 700 | −0.025em | Page heroes |
| `display-md` | 30 → 48px | Archivo 600 | −0.02em | Major section heads |
| `heading-lg` | 26 → 36px | Archivo 600 | −0.015em | H2 |
| `heading-md` | 22 → 28px | Archivo 600 | −0.01em | H3, card titles |
| `heading-sm` | 19 → 22px | Inter 600 | 0 | H4, labels |
| `body-lg` | 18 → 20px | Inter 400 | 0 | Lead paragraphs |
| `body-md` | 16 → 17px | Inter 400 | 0 | **Default body** |
| `body-sm` | 14 → 15px | Inter 400 | 0 | Captions, meta |
| `label` | 13 → 13px | Inter 600 | 0.08em, uppercase | Eyebrows, tags |
| `stat` | 48 → 96px | Archivo 700, tabular | −0.04em | Counters: "90", "12", "$450" |

### Rules

- **Body minimum 16px.** Never smaller, on any device.
- **Line length 60–75 characters.** `max-width: 68ch` on prose.
- **Line height:** 1.15 display · 1.3 headings · 1.6 body · 1.7 for Spanish body (accented ascenders need room).
- **One display face per viewport.** Two competing display treatments read as a template.
- **Sentence case for headings.** Not Title Case, not ALL CAPS except the `label` token. The current site's `## SUMMER JAM MUSIC CAMP 2026` and `## WHY CHOOSE SOUTH DADE MUSIC` shout; the brand is composed.
- **Never centre more than three lines** of body copy.
- **Spanish expansion:** all heading components tested at +35% character count. `display-xl` must not require a font-size override to fit "Listos para el escenario".

### Heading hierarchy — a correctness requirement

Phase 2 found H2 used as body lead-ins (*"We offer"*, *"Key benefits include"* on the bass and ukulele pages) and H1 rendered two or three times per page. The new system enforces:

- **Exactly one H1 per page**
- Heading levels never skip
- Visual size is a token choice, decoupled from semantic level
- Automated audit in CI

---

## 3. Spacing system

4px base unit. An 8px rhythm for layout, 4px for component internals.

| Token | px | Use |
|---|---|---|
| `space-0` | 0 | |
| `space-1` | 4 | Icon-to-label |
| `space-2` | 8 | Tight internal |
| `space-3` | 12 | Form field internals |
| `space-4` | 16 | **Default component padding** |
| `space-5` | 24 | Card padding, paragraph gaps |
| `space-6` | 32 | Component groups |
| `space-8` | 48 | Sub-section gaps |
| `space-10` | 64 | **Section padding (mobile)** |
| `space-12` | 96 | Section padding (tablet) |
| `space-16` | 128 | **Section padding (desktop)** |
| `space-20` | 160 | Hero breathing room |
| `space-24` | 192 | Maximum, feature sections only |

### Section rhythm

```
Mobile     64px  vertical section padding
Tablet     96px
Desktop   128px
Feature   160–192px  (hero, showcase, the 90-day timeline)
```

Generous vertical space is what separates a premium feel from a template. The current site's WPBakery output has near-uniform section padding, which is why every section reads with the same importance.

### Density rule

Three densities: **comfortable** (marketing pages, default), **compact** (tables, admin), **spacious** (hero, showcase). A component declares its density; it does not invent spacing.

---

## 4. Grid

### Breakpoints

| Name | Min | Columns | Gutter | Margin |
|---|---|---|---|---|
| `xs` | 0 | 4 | 16px | 20px |
| `sm` | 480 | 4 | 16px | 24px |
| `md` | 768 | 8 | 24px | 32px |
| `lg` | 1024 | 12 | 24px | 48px |
| `xl` | 1280 | 12 | 32px | 64px |
| `2xl` | 1536 | 12 | 32px | auto (max 1440) |

**Content max-width 1440px.** Prose max-width 68ch. Full-bleed permitted for photography, hero and showcase galleries only.

### Layout archetypes

1. **Centred prose** — FAQ, policy, article. Single 68ch column.
2. **Split hero** — 7/5 asymmetric at `lg`+. Copy left, photography right. Never 50/50; symmetry reads static.
3. **Card grid** — 1 / 2 / 3 columns at xs / md / lg. Programme and instrument listings.
4. **Editorial alternating** — image/text pairs reversing down the page. Programme detail.
5. **Full-bleed stage** — edge-to-edge dark photography with overlaid copy. Showcase, hero.
6. **Sticky-rail** — sticky summary card (price, dates, CTA) beside scrolling detail. Camp and programme pages. **This is the pattern that fixes the "no CTA at the bottom" failure.**

---

## 5. Elevation

Dark-first surfaces mean shadows work differently. Elevation is expressed through **surface value first, shadow second**.

| Level | Light theme | Dark theme | Use |
|---|---|---|---|
| `elev-0` | `n-50`, no shadow | `stage-900` | Page ground |
| `elev-1` | `n-0` + `0 1px 2px rgba(23,22,19,.06)` | `stage-800`, no shadow | Cards |
| `elev-2` | `n-0` + `0 4px 12px rgba(23,22,19,.08)` | `stage-800` + hairline `stage-700` | Hover, dropdowns |
| `elev-3` | `n-0` + `0 12px 32px rgba(23,22,19,.12)` | `stage-800` + `0 12px 32px rgba(0,0,0,.4)` | Modals, mega-menu |
| `elev-4` | `n-0` + `0 24px 64px rgba(23,22,19,.16)` | as above, stronger | Rarely — lightbox |

**Spotlight glow** — one special elevation, reserved for the primary CTA and the active showcase image:
`0 0 0 1px spot-600, 0 8px 24px rgba(245,165,36,.24)`
Used sparingly. It is the visual signature of the brand and loses meaning if applied broadly.

**Rules:** never more than two elevation levels visible in one viewport region · shadows are always warm-tinted (derived from `n-900`), never pure black on light · no shadows on dark surfaces except modals.

---

## 6. Radius

| Token | px | Use |
|---|---|---|
| `radius-none` | 0 | Full-bleed imagery, dividers |
| `radius-sm` | 4 | Tags, badges, inputs |
| `radius-md` | 8 | **Buttons, cards** |
| `radius-lg` | 16 | Feature cards, media |
| `radius-xl` | 24 | Hero media, showcase panels |
| `radius-full` | 9999 | Avatars, pills, icon buttons |

**One radius family per component group.** Moderate, consistent radii — heavy rounding reads as a children's product and breaks the teen constraint; zero radius reads corporate.

---

## 7. Buttons

### Variants

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `spot-500` | `stage-950` | none | Book a Trial, Reserve a Seat. **One per page.** |
| **Secondary** | `velvet-600` | `n-0` | none | Second action — Watch a showcase |
| **Tertiary** | transparent | `velvet-700` | 1px `n-300` | Learn more, See details |
| **Ghost** | transparent | `velvet-700` | none | Inline, low emphasis |
| **On-dark primary** | `spot-500` | `stage-950` | none | Same as primary — works on both |
| **On-dark secondary** | transparent | `n-0` | 1px `rgba(255,255,255,.4)` | Hero secondary |
| **Destructive** | `error-600` | `n-0` | none | Admin only |

### Sizes

| Size | Height | Padding X | Type | Use |
|---|---|---|---|---|
| `sm` | 36px | 16px | `body-sm` 600 | Inline, cards |
| `md` | 44px | 24px | `body-md` 600 | **Default** — meets minimum touch target |
| `lg` | 52px | 32px | `body-lg` 600 | Hero, section CTA |
| `xl` | 60px | 40px | `body-lg` 600 | Mobile sticky bar |

### States

`default → hover` (−8% lightness, `elev-2`) `→ active` (−16%, no shadow, 1px translate-y) `→ focus-visible` (2px `spot-500` ring, 2px offset) `→ disabled` (`n-200` fill, `n-400` text, no pointer) `→ loading` (spinner, label persists, width locked)

### Content rules

1. **Verb + object.** "Book a trial", not "Submit" or "Click here".
2. **Price in the label** where a price exists — *"Book a Trial — $25"*, *"Reserve a Seat — $X deposit"*. This structurally prevents the current non-disclosure failure.
3. **Never two primaries in one viewport.**
4. **Minimum 44×44px** touch target with 8px separation.
5. **Every button is a real link or a real control.** The twenty text-only prompts found in Phase 2 become buttons or are deleted.
6. Icons are decorative and `aria-hidden`; the label carries meaning.

---

## 8. Cards

### Types

| Card | Contents | Notes |
|---|---|---|
| **Programme** | Image, eyebrow (age band), title, 1-line summary, 3 facts (duration/format/ages), price or "from", CTA | Facts are the differentiator — the current cards have prose truncated mid-sentence |
| **Instrument** | Photo (**subject-verified**), name, start age, "what you need", CTA | Fixes the wrong-instrument-photo defect |
| **Teacher** | Portrait, name, instruments, one-line bio, credential, CTA | ⚠️ gate B-7 |
| **Showcase** | Hero image, date, venue, student count, gallery link | Requires real event data |
| **Testimonial** | Quote, attribution, source badge, rating | Never edited; verbatim or omitted |
| **Camp session** | Dates, block times, ages, price, seats remaining, CTA | Live capacity if available |
| **FAQ** | Question, expandable answer | Accessible accordion |
| **Stat** | Large numeral + label | Tabular numerals, counter-animated |
| **Article** | Image, category, title, excerpt, read time | Future blog |

### Anatomy

```
┌─────────────────────────────────┐
│  [ 16:9 or 4:3 media ]          │  radius-lg top corners
├─────────────────────────────────┤
│  EYEBROW · label                │  space-5 padding
│  Card title                     │  heading-md
│  One-line summary, never        │  body-md, n-600
│  truncated mid-sentence.        │  line-clamp: 2, ellipsis
│                                 │
│  ▪ Fact  ▪ Fact  ▪ Fact         │  body-sm, n-500
│                                 │
│  [ CTA → ]                      │
└─────────────────────────────────┘
```

### Rules

- **Equal height within a row.** Facts pin to the bottom.
- **Whole card is the click target**; nested CTA is visual affordance, not a second tab stop.
- **Never truncate mid-sentence.** Phase 2 found three programme cards cut off mid-word. Copy is authored to length; `line-clamp` is a safety net with a proper ellipsis, not a layout strategy.
- Hover: `elev-1 → elev-2`, media scale 1.03, 200ms. No lift on touch devices.
- Every card image requires meaningful `alt`. Empty `alt=""` only when the adjacent title fully describes it.

---

## 9. Forms

The current site has **zero native forms**. Everything below is new and must be built to a high standard, because it is now the entire conversion mechanism.

### Field anatomy

```
Label (always visible, never a placeholder)     body-sm 600, n-800
┌──────────────────────────────────────┐
│  Value                               │        44px min height
└──────────────────────────────────────┘        1px n-300, radius-sm
Helper text or error                            body-sm, n-500 / error-600
```

### Rules

1. **Visible labels always.** Placeholder-as-label fails accessibility and memory.
2. **One column.** Never side-by-side fields on mobile; rarely on desktop.
3. **Ask the minimum.** Trial booking: child's name, age, instrument interest, parent name, phone, preferred contact language. Nothing else.
4. **Inline validation on blur**, never on keystroke. Errors are specific and constructive.
5. **Error summary at the top** of long forms, focus moved to it, linked to fields.
6. **Required is explicit** — mark required, not optional.
7. **Correct input types and autocomplete** — `tel`, `email`, `autocomplete="tel"` etc.
8. **Language preference is a first-class field**, not an afterthought.
9. **Price disclosed above the form**, never inside or after it.
10. **Progressive disclosure** for camp: dates → block → child details → deposit. Never one long form.
11. **Success state names what happens next** and by when.

### Booking-flow specifics

- Intent is captured from the entry point (which programme, which page) as a hidden field — this fixes the current inability to distinguish a $450 camp reservation from a free enquiry.
- ⚠️ **Gate:** the deposit amount must be known before the camp form can ship.

---

## 10. Tables

Used sparingly: pricing comparison, camp session comparison, schedule.

| Property | Value |
|---|---|
| Header | `n-100` fill, `label` type, `n-700` |
| Row height | 56px comfortable / 44px compact |
| Borders | Horizontal only, 1px `n-200` |
| Zebra | `n-50` on odd rows — optional, only above 6 rows |
| Numerals | Tabular, right-aligned |
| Mobile | Transform to stacked cards below `md`. **Never horizontal-scroll a pricing table.** |

Accessibility: `<caption>`, `<th scope>`, no layout tables, sortable columns announce state.

---

## 11. Navigation

### Desktop header

Height 80px, condensing to 64px on scroll. Transparent over dark hero, `n-0` + hairline border thereafter. Logo left, nav centre, language toggle + primary CTA right.

### Mega-menu

Full-width panel, `elev-3`, opens on hover *with* 150ms intent delay and on focus/click for keyboard. Columns per `02-information-architecture.md` §2. Closes on Escape, outside click, or focus exit. Never traps focus.

### Mobile drawer

Full-screen, `stage-900`, opens from the right. Accordion sections, never nested screens. Close button top-right, 48×48. Body scroll locked. Focus trapped while open, restored on close.

### Sticky mobile action bar

Appears after 25% scroll. `stage-900` with top hairline. Primary CTA + call. Hides when a form field is focused. Never obscures the footer.

### Breadcrumbs

On all pages three levels deep or more. `Home / Programs / 90-Day Stage Program`. Marked up with `BreadcrumbList` schema.

### Footer

Four columns per IA §3. `stage-950` ground, `n-300` text, `spot-400` links. The footer carries the address, hours and phone — it is load-bearing and must be treated as content, not chrome.

---

## 12. Icons

### Style

- **Stroke-based, 1.75px at 24px**, rounded caps and joins
- 24×24 default grid; 20px inline, 32px feature, 48px empty states
- Optically balanced, not geometrically rigid
- Never multi-colour. Single `currentColor`.
- **No emoji as UI.** The current site renders 🎹 🎸 🥁 🎻 📞 📍 🌐 as remote images from `s.w.org` — an external request per page for a decorative glyph. Removed entirely.

### Set

Base: an open-source stroke set (Lucide or equivalent, ISC/MIT) for UI affordances.
**Custom: instrument marks.** Seven bespoke icons — piano, guitar, drums, bass, violin, ukulele, voice — drawn on the same grid. These are brand assets and worth the investment; they carry the `/lessons` hub, the nav mega-menu and the instrument cards.

### Rules

- Icons never replace a label on a primary action
- Decorative icons are `aria-hidden="true"`
- Icon-only buttons require `aria-label` and a tooltip
- Minimum 44px hit area regardless of glyph size

---

## 13. Photography style

Photography is the primary design material. Full asset audit in `09-image-strategy.md`; this section defines the look.

### Direction

| Attribute | Direction |
|---|---|
| **Light** | Warm, directional, practical sources. Stage light, window light, amber spill. Never flat fluorescent. |
| **Colour** | Warm mid-tones, deep shadows that retain detail, restrained saturation. Grade toward the palette — amber highlights, blue-black shadows. |
| **Framing** | Tight on faces and hands. Wide only for stage context. |
| **Moment** | Between-moments — concentration, a glance to a bandmate, relief after the last note. **Not** posed grins at camera. |
| **Subject** | Real students, real teachers, real rooms. |
| **Depth** | Shallow on portraits; deep on ensemble to show the group. |

### Three photographic registers

1. **Stage** — dark, dramatic, single subject in light. Heroes, showcase, the 90-day narrative.
2. **Studio** — warm daylight, teacher and student, hands on instrument. Lesson and instrument pages.
3. **Community** — wider, brighter, multiple people, parents present. Camp, about, events.

### Prohibitions

- ❌ No stock photography of children. Every child shown must be a real student, with consent on file.
- ❌ No smiling-at-camera thumbs-up shots
- ❌ No instrument-only product shots as a page hero
- ❌ **No photograph on a page about a different instrument.** Phase 2 found a guitar photo heading the violin, singing *and* guitar pages, and a piano photo heading the ukulele page. The content model enforces subject verification.
- ❌ No third-party stock with untraceable licensing — the current site uses Turkish (`ozel-gitar-kursu`), French (`20240420_Impulse-Day`) and Medium-CDN-hash assets

### Technical

- Formats AVIF → WebP → JPEG; `srcset` at 480/768/1200/1920
- Aspect ratios: 16:9 hero · 4:3 card · 1:1 portrait · 3:2 editorial
- Explicit `width`/`height` on every image — zero CLS
- Lazy-load below fold; hero is `fetchpriority="high"`, never lazy
- **Every content image has meaningful alt text.** The current site has none on any gallery image, and placeholders (`"img"`, `"Image 1"`, `"..."`, the filename) elsewhere.

---

## 14. Illustration rules

Illustration is **secondary and structural**. This brand's credibility comes from photographs of real children; illustration must never compete with that.

### Permitted

- **Diagrams** — the Gradual Exposure Ladder, the 90-day week timeline, the skill + ensemble track structure. These explain the product and are the highest-value illustration work in the project.
- **Instrument icons** — the seven custom marks
- **Abstract stage motifs** — light beams, curtain sweeps, waveform rules used as section dividers or backgrounds
- **Empty and error states** — minimal, single-weight line art

### Style

Single-weight line work matching the icon system, in `spot-400` / `n-300` / `velvet-600` on stage grounds. Geometric, restrained, no gradients, no 3D, no mascot.

### Prohibited

- ❌ Any illustrated depiction of children — it competes with the real photography and undercuts authenticity
- ❌ Cartoon characters, mascots, musical-note confetti
- ❌ Generic vector "people" packs
- ❌ Illustration where a photograph exists
- ❌ Illustration as a hero on any page that sells a real experience

---

## 15. Accessibility rules

This academy accepts **Unique Abilities** scholarships. Accessibility is a market requirement.

### Target

**WCAG 2.2 Level AA across the site; AAA for text contrast wherever the palette permits** (most pairs above already exceed AAA).

### Non-negotiables

**Colour & contrast**
- Body text ≥ 4.5:1; large text ≥ 3:1; UI components and focus indicators ≥ 3:1
- Colour never the sole carrier of meaning — capacity warnings pair colour with an icon and text
- `spot-500` banned as text on light grounds

**Keyboard**
- Every interactive element reachable and operable; logical tab order
- Visible focus: 2px `spot-500` ring, 2px offset, ≥3:1 against both adjacent surfaces
- Skip-to-content link, first tab stop
- Focus trapped in modals and the mobile drawer; restored on close
- No keyboard traps anywhere, including the third-party booking embed

**Screen readers**
- Semantic landmarks: `header`, `nav`, `main`, `aside`, `footer`
- One H1; no skipped levels; visual size decoupled from semantics
- All images have alt; decorative images `alt=""`
- Form fields programmatically associated with labels; errors linked via `aria-describedby`
- Accordions, tabs and menus use correct ARIA patterns and announce state
- Live regions for async results (form submission, capacity updates)

**Motion**
- `prefers-reduced-motion: reduce` honoured globally — see `05-motion-system.md` §14
- No auto-playing video with sound
- No content flashing more than 3×/second
- Carousels and galleries are pausable and keyboard-operable

**Targets & input**
- ≥44×44px, ≥8px separation
- No hover-only disclosure of essential information
- Orientation not locked; content reflows at 320px width and 400% zoom without horizontal scroll

**Language**
- `lang` on `<html>`, and `lang` on any inline foreign-language passage — required for the bilingual site and for the Spanish testimonial currently mis-announced
- `hreflang` reciprocal between EN and ES routes

**Content**
- Plain language; short sentences
- Link text meaningful out of context — "click here" banned
- Documents (camp pack, policies) published as accessible tagged PDFs or, preferably, as HTML

### Testing gates

| Gate | Requirement |
|---|---|
| Automated | axe-core zero critical/serious violations in CI on every template |
| Manual keyboard | Full journey completed with keyboard only |
| Screen reader | NVDA + Windows, VoiceOver + iOS, on all conversion paths |
| Zoom | 400% zoom, 320px viewport, no horizontal scroll |
| Reduced motion | Every animation verified disabled or reduced |
| Colour blindness | Deuteranopia/protanopia simulation on all status states |

An accessibility statement ships at `/accessibility` with a contact route for reporting barriers.

---

## 16. Dark and light usage

Not a user-toggled theme. **Sections are deliberately dark or light**, chosen for narrative reasons.

| Context | Ground | Why |
|---|---|---|
| Homepage hero | `stage-950` | The darkened house before the lights come up |
| The 90-day timeline | `stage-900` | Signature moment, maximum drama |
| Showcase gallery | `stage-950` | Photography reads best on dark |
| Programme detail | `n-50` | Long-form reading comfort |
| Instrument pages | `n-50` | Practical, informational |
| Pricing | `n-50` | Clarity and trust — never dramatic |
| Scholarships | `n-50` | Plain, procedural, dignified |
| FAQ, policies | `n-0` | Maximum legibility |
| Footer | `stage-950` | Closes the frame |

**Rule:** never more than two dark↔light transitions in a single scroll of a content page. Alternating repeatedly reads as a template and destroys the sense of authored pacing.

---

## 17. Design tokens — naming convention

```
--sdm-{category}-{name}-{variant}

--sdm-color-stage-900
--sdm-color-action-primary-bg
--sdm-space-6
--sdm-radius-md
--sdm-type-display-xl-size
--sdm-elev-2
--sdm-motion-duration-base
--sdm-motion-ease-stage
```

Three tiers: **primitive** (raw values) → **semantic** (roles) → **component** (local overrides). Components consume semantic tokens only. No component references a primitive directly; no hard-coded hex, px or ms values anywhere in the codebase.

---

## 18. Design decision gates

| Gate | Question | Blocks |
|---|---|---|
| **D-1** | Logo colours and refresh — do they fit the palette? | Token freeze |
| **D-2** | Archivo approved as display face? | Type scale, all comps |
| **D-3** | Photography shoot budget approved? | Entire visual system — no substitute exists |
| **D-4** | Can teacher portraits be published? (= B-7) | Teacher cards, about, trust layer |
| **D-5** | Bilingual at launch? (= B-6) | All components must be expansion-tested |
| **D-6** | Custom instrument icon set commissioned? | `/lessons` hub, nav, cards |

---

**Next:** `05-motion-system.md`
