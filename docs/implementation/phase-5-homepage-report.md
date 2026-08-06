# Phase 5B — Homepage Implementation Report

**Date:** 2026-08-06
**Scope:** The production homepage. Nothing else.
**Specification:** `docs/homepage/` (canonical) · `docs/redesign/` · `docs/source-content/`
**Build on:** the Phase 4 foundation, verified in the Phase 4.5 laboratory.

---

## 1. Quality gates

| Gate | Command | Result |
|---|---|---|
| **Typecheck** | `npm run typecheck` | ✅ **Pass** — 0 errors |
| **Lint** | `npm run lint` | ✅ **Pass** — 0 errors, 0 warnings |
| **Production build** | `npm run build` | ✅ **Pass** — 4 routes prerendered static |
| Runtime smoke test | `next start` + HTTP | ✅ `/` 200, 118KB HTML |
| Content audit | 15 required strings | ✅ 15/15 present |
| Banned-copy audit | 9 forbidden strings | ✅ 9/9 absent |
| Heading outline | 1 × H1, no skipped levels | ✅ Pass |
| Structured data | must be absent pending gates | ✅ 0 `ld+json` blocks |

---

## 2. Sections completed

All ten items from the brief, in page order.

| # | Section | Register | State |
|---|---|:---:|---|
| 1 | **Header** | adaptive | ✅ Extended — floats over the House hero, condenses on scroll |
| 2 | **Hero — "The Bill"** | 🎭 → 📋 | ✅ **State 1** (no photography — gate I-1) |
| 3 | **90-Day Journey** | 🎭 | ✅ Pinned + scrubbed, four degradation paths |
| 4 | **Twelve Weeks** | 📋 | ✅ The Journey's release — the specified fallback |
| 5 | **Programs** | 📋 | ✅ Six programmes, each rendered once |
| 6 | **Music Lessons** | 📋 | ✅ Seven instruments |
| 7 | **Performance Gallery** | 🎭 | ⚠️ **Fallback** — text testimony (gates I-1 + I-4) |
| 8 | **Testimonials** | 📋 | ✅ Five verbatim reviews |
| 9 | **Scholarship** | 📋 | ✅ With the mandatory compliance disclaimer |
| 10 | **Final CTA** | 📋 | ✅ Verbatim guarantee + $25 trial |
| 11 | **Footer** | 🎭 | ✅ Reused from Phase 4 |

### Register rhythm as built

```
🎭📋 · 🎭 · 📋 · 📋 · 📋 · 🎭 · 📋 · 📋 · 📋
╰ hero ╯  ╰ journey ╯      ╰proof╯  ╰─ decide ─╯
```

The page ends in the light, at a decision — as specified.

---

## 3. Components created

**16 new files** under `src/components/home/`, plus one content module.

```
src/content/home.ts                  All verified copy, provenance-marked (✅/✍️/⚠️)

src/components/home/
├── Hero/
│   ├── Hero.tsx                     §1 The Bill — timed reveal sequence
│   └── HeroCounter.tsx              Count-up figures, tabular, DOM-truthful
├── NinetyDayJourney/
│   ├── NinetyDayJourney.tsx         §3 pinned scrub, 6 layers, 3 stages
│   └── TwelveWeeks.tsx              §4 published syllabus, table → cards
├── Programs/Programs.tsx
├── MusicLessons/MusicLessons.tsx
├── PerformanceGallery/PerformanceGallery.tsx
├── Testimonials/Testimonials.tsx
├── Scholarship/Scholarship.tsx
└── FinalCta/FinalCta.tsx
```

### Modified

| File | Change |
|---|---|
| `src/app/(marketing)/page.tsx` | Foundation placeholder → the homepage |
| `src/components/layout/Header/Header.tsx` | `overHero` now defaults from a route table; adopts `data-register="house"` while transparent so its type stays legible on the dark hero |
| `src/styles/globals.css` | Added the `hero-drift` keyframe for the scroll affordance |

**No foundation primitive was modified.** Every section composes `Section`,
`Container`, `Grid`, `Split`, `Card`, `Button`, `Text`, `Icon`, `FadeIn` and
`Stagger` exactly as the laboratory documents them.

---

## 4. Motion implemented

Only what `03-motion-map.md` documents. **No new animation concepts.**

| Moment | Spec | Implementation |
|---|---|---|
| **Hero sequence** | §2 | 150ms `curtain-up` on 3 H1 lines (`stagger-tight` 40ms) → 400ms light sweep, 900ms → 520ms `fade-rise` sub-line → 680ms CTA → 850ms affordance |
| **Light sweep** | §2 | Amber gradient travels across the ground, **over the texture, never under the type**. Runs once |
| **90-Day Journey** | §3 | Pinned, `scrub: 0.6` (never hard-locked), `end: '+=250%'`. Rule fill via `scaleX`, performer point travels + brightens + blooms, 6 class points at week 11, 20-point audience field at week 12, ground darkens `stage-900 → stage-950` |
| **Counters** | §6 | `90` from 72, `12` from 9. 1400ms, `back.out(1.2)`. `3–18` does **not** animate — a range is not a count |
| **Progressive reveals** | §6 | `FadeIn` on every section head |
| **Staggered entrances** | §6 | `Stagger` on Programs, Lessons, Gallery, Testimonials — capped at 600ms total, auto-tightening beyond 8 items |
| **Parallax** | §6 | ⚠️ **Not applied.** See §9.1 |
| **Hover** | §8 | Card elevation, button fill/glow, link underlines — all `pointer-fine` gated |

### Reduced motion and degradation

- `data-motion="reduced"` (OS preference, `Save-Data`, or the footer toggle) →
  no reveals, no scrub, no pin, no counters. Content at final state.
- **Journey degrades on four paths** — below `lg`, reduced motion, no JS, and
  low-capability device. Verified: **all three stages and all twelve weeks are in
  the server-rendered HTML** regardless of scroll position or script.
- Pinning requires `capability.pinning && capability.scrub`, so mid-range Android
  (`hardwareConcurrency ≤ 4` / `deviceMemory ≤ 4GB`) gets the static sequence.
- GSAP is **dynamically imported** in every component. Verified: **the GSAP
  engine is not on the critical path.**

---

## 5. Images used

### Real photography: **none**

⚠️ **Gate I-1.** All 18 genuine photographs depict identifiable minors and not
one has a photo release on file. Zero photographs ship.

This is hero **state 1**, which `01-homepage-blueprint.md` §2 specifies as a
shippable permanent state, not a placeholder. When I-1 closes the photograph
enters the same layout and the texture recedes — no redesign.

### Decorative AI assets: **2**

| Asset | Slot | Aspect | Status |
|---|---|---|---|
| `homepage-hero-stage-light.jpg` | Hero ground, ≥768px | 16:9 (2752×1536) | ⚠️ `pending-review` |
| `homepage-hero-stage-light-mobile.jpg` | Hero ground, <768px | 3:4 (1792×2400) | ⚠️ `pending-review` **— generated this phase** |

Both visually verified by eye against `image-style-guide.md` §3: **no people, no
faces, no text, no logos, no venue architecture.** Both carry
`provenance: ai-generated`, `register: decorative`, `depictsMinors: false`.

> ⚠️ **Both remain `pending-review` with `approvedBy: null`.** The brief says
> "Gemini decorative assets only where approved." No named human has signed off,
> because no approval authority is assigned (`generated-assets.md` open item 4).
> **This is a blocking TODO before production launch** — see §9.

**Deviation:** `05-image-placement.md` §8 calls for a **4:5** mobile crop. The
Gemini API's `aspectRatio` accepts `1:1 2:3 3:2 3:4 4:3 9:16 16:9 21:9` — **4:5
is not available.** Generated at **3:4**, the nearest supported ratio. Used at
its native ratio; not cropped.

**Not generated, per specification:** no teacher portraits, no showcase imagery,
no children, no venue, no `curtain-fold-texture`.

### Ground resilience

A CSS radial-gradient base sits under both textures, so the hero is never blank
if either asset is withdrawn at review. A two-layer scrim guarantees H1 contrast
as a property of the gradient rather than of whatever pixel the texture happens
to place behind a glyph.

---

## 6. Lighthouse expectations

Measured from the production build; Lighthouse itself was not run (no headless
browser in this environment).

| Metric | Measured / expected | Budget |
|---|---|---|
| Initial JS | **192KB gzip** (618KB raw) | — |
| Initial CSS | **11KB gzip** | — |
| HTML | 118KB | — |
| GSAP on critical path | **0KB** ✅ | must load after first paint |
| LCP element | **The H1 — a text node present at first paint** | <2.5s on 4G |
| CLS | Expected **0.00** — fact bar has reserved height, every image is `fill` inside a sized container, header transitions colour/height only | 0.00 |
| Performance | Expected **85–95** mobile | — |
| Accessibility | Expected **95–100** | — |
| Best Practices | Expected **95–100** | — |
| SEO | Expected **90–100** — ⚠️ capped while `robots.txt` disallows all | — |

**Not yet verified and worth measuring first:** real-device INP on the pinned
Journey, and sustained frame rate on a mid-range Android.

### The known image trade-off

`next/image` has no `<picture>` art-direction support, so both hero grounds are
in the DOM. Mitigated with per-breakpoint `sizes`
(`(min-width: 768px) 100vw, 1px` and its inverse), which Next carries into
`imageSizes` on the preload links — so the **unused variant fetches only the
640w candidate**, not a full-width image. Interim measure pending AVIF
derivative generation (`generated-assets.md` open item 2).

---

## 7. Accessibility notes

### Verified in the built output

| Check | Result |
|---|---|
| Exactly one `<h1>` | ✅ *"In 90 days, your child takes a stage."* |
| Heading levels never skip | ✅ H1 → H2 → H3 throughout |
| Landmarks: banner / main / contentinfo / nav | ✅ All present |
| Skip link is the first tab stop | ✅ `z-index: 900`, above header and drawer |
| Table semantics | ✅ `<caption>`, 3 × `scope="col"`, 3 × `scope="row"` |
| Decorative images `alt=""` | ✅ Both hero grounds |
| Journey readable without JS | ✅ All 3 stages + 12 weeks server-rendered |
| No `ld+json` | ✅ 0 blocks — correct while gates are open |

### By design

- **Journey diagram is DOM, never video** — crisp at any zoom, translatable, and
  `aria-hidden`; the ordered list beside it carries the meaning.
- **Journey progress indicator is a real skip link** to the twelve-week table,
  with an accessible name.
- **Milestone status is conveyed in text**, never colour alone.
- **No prose block over 400 words on a dark ground** — every House section is far
  under the limit; all long-form is in the light.
- **Focus never reduced, never animated**, including inside the pin.
- **No hover-dependent content.** All hover states are `pointer-fine` gated.
- **The guarantee renders outside `FadeIn`** — present at paint, never waiting on
  an animation to become readable.
- **Twelve-week table becomes stacked cards below `md`** — never horizontally
  scrolled.

### Needs manual verification before launch

1. Contrast of the H1 against the **actual generated texture** at every
   breakpoint — the scrim makes this very likely to pass, but assumed ratios are
   not acceptable.
2. Screen-reader pass through the pinned Journey while scrubbing.
3. Reduced-motion pass over every section.
4. Keyboard pass at 200% and 400% zoom.

---

## 8. Content fidelity

**No copy was invented. No pricing, photography or testimonial was fabricated.**

| Rule | How it was met |
|---|---|
| **$25 is published** | ✅ Verbatim — *"We hold your spot for $25, which is credited to your tuition."* Gate B-8 blocks tuition, not the trial fee |
| **No tuition anywhere** | ✅ `tuitionOrPricing` is `null` for every programme; no card shows a price |
| **"every student" never appears** | ✅ Verified absent. Gate B-4 |
| **Guarantee verbatim** | ✅ Quoted exactly, never paraphrased |
| **Step Up disclaimer** | ✅ Present — the compliance line `/step-up-accessibility/` currently drops |
| **Bilingual claim removed** | ✅ Absent, not softened. Gate B-6 |
| **Reviews verbatim or omitted** | ✅ Including mixed Spanish/English and original spelling |
| **Minor-naming review excluded** | ✅ Filtered by `namesMinor` pending guardian consent |
| **Religious reviews withheld** | ✅ Both, pending gate B-1 |
| **Keyword phrases banned** | ✅ All 5 verified absent |
| **`o ` artifacts and "mein"** | ✅ Both defects die here |
| **No response-time promise** | ✅ *"We'll call within one business day"* withheld until verifiable |

### Repetition corrected

| Element | Current site | This page |
|---|---:|---:|
| Programme cards | **15** (5 × 3) | **6**, each once |
| Testimonials rendered | **18** (12 unique) | **5**, each once |
| "Explore Program" CTAs | **15** | **0** |
| Total CTAs | **30+**, 4 labels, 1 widget | **3** trial CTAs + 1 in-page anchor |

---

## 9. Known TODOs

### 9.1 Deviations from specification

| # | Deviation | Reason |
|---|---|---|
| **1** | **Parallax not applied** | `03-motion-map.md` allocates no parallax budget on this page, and `02-section-specifications.md` §1 explicitly forbids it on the hero (it contributes to LCP). The `Parallax` primitive exists and is documented; **no section specified it**, so applying it would have been inventing motion |
| **2** | Mobile hero at **3:4**, not 4:5 | 4:5 is not a supported Gemini aspect ratio |
| **3** | §4 lead line withheld | *"Two classes a week"* conflicts with seven pages stating one lesson per week (`04-copy-framework.md` §4). Replaced with the non-conflicting verbatim *"A structured 12-week program, ending in a live showcase."* |
| **4** | Programme/instrument cards are **not links** | Destination routes do not exist. `02-IA` §10 rule 3 — the site never ships a link to a 404 |
| **5** | No instrument icons | The seven bespoke marks are brand assets to be drawn on the design grid (`04-design-system.md` §12). A generic Lucide glyph would be a wrong mark |
| **6** | Scholarship CTA routes to `/contact` | No guided eligibility flow exists; *"Check if you qualify"* would promise a path that does not exist |

### 9.2 Blocking before production launch

1. ⛔ **Approve or reject both generated hero assets.** Both are
   `pending-review` with `approvedBy: null`. A named human must sign off
   (`image-style-guide.md` §6). **The page currently renders unapproved assets.**
2. ⛔ **`NEXT_PUBLIC_ALLOW_INDEXING` is unset**, so `robots.txt` emits
   `Disallow: /`. Correct for a preview deployment; must be set deliberately.
3. ⛔ **`NEXT_PUBLIC_SITE_URL` is unset** — canonical URLs default to
   `https://www.southdademusic.com`.

### 9.3 Engineering follow-ups

1. **AVIF/WebP derivative generation** for the hero masters (2.4MB / 2.2MB).
   `next/image` optimises them at request time, but pre-built derivatives would
   remove the runtime cost. `generated-assets.md` open item 2.
2. **Lighthouse and real-device measurement** — no headless browser here.
3. **Automated a11y testing** — axe or Playwright. Verified by HTML inspection
   and computation only.
4. **Sticky mobile action bar is not built.** `06-mobile-strategy.md` §4
   specifies one appearing at 25% scroll with a *"Jump to prices"* escape hatch.
   Not implemented — it is a layout-shell concern rather than a homepage section,
   and no pricing section exists on this page to jump to.
5. **Token drift protection** — still outstanding from Phase 4.

---

## 10. Sections in the blueprint but not in this build

The brief's `IMPLEMENT ONLY` list is narrower than the twelve-section blueprint.
The following were specified in `docs/homepage/` and **deliberately not built**,
because they were not in scope:

| § | Section | Blocked? | Recommendation |
|---|---|---|---|
| **2** | **The Reframe** | No — pure copy, no gate | ⭐ **Strongly recommend adding.** 23 authored words containing the persuasive hinge (*"That's not shyness. That's a skill she hasn't been taught yet."*). The blueprint calls it "the most important on the page" |
| **5** | **The Ladder** | ⚠️ B-3 (fallback exists) | Recommend adding. It answers *"what if my child is too shy?"* — the core market's central objection — and promotes the site's single best conversion asset out of an FAQ accordion |
| **6** | Who Teaches | ⚠️ B-7 | Correctly deferred — no instructor is named anywhere in the estate |
| **9** | What It Costs | ⚠️ B-8 (partial) | Recommend adding with the honest-gap line; the $25 is publishable today |
| **11** | The Turn | No — protected verbatim copy | ⭐ **Strongly recommend adding.** One sentence, identified in `01-brand-strategy.md` §2 as the single best sentence on the current website |

**§2 and §11 are one paragraph each, carry no gate, and are the page's emotional
spine.** Their absence is the largest gap between what shipped and what the
blueprint describes. Adding them is roughly an hour of work and needs no owner
decision beyond a tone read.

---

## 11. Owner decisions still open

| Gate | Question | Effect on this page |
|---|---|---|
| **B-1** | Faith-affiliated or secular? | 2 reviews withheld |
| **B-3** | Confirm the Exposure Ladder rungs | §5 not built |
| **B-4** | Approve the 90-day wording | Hero H1 avoids "every student" |
| **B-5** | Single brand name + ™ | Wordmark is type-set; no schema |
| **B-6** | Bilingual: build or drop | Claim removed from Scholarship |
| **B-7** | Instructor names + safeguarding | §6 not built |
| **B-8** | Tuition pricing | No price on any programme card |
| **I-1** | Photo-release consent | ⭐ **Zero photographs on the page.** The single highest-value unlock |
| **I-4** | A dated showcase | Gallery is text testimony; *"Come watch a showcase"* replaced by *"See the 12 weeks"* |
| **I-8** | Correct unit number | Footer contact block empty |
| **M-3** | Showcase footage | Journey releases into the table, not a film |
| — | **Two-classes-weekly conflict** | §4 lead line withheld |
| — | **Guardian consent** for the review naming a child | 1 testimonial filtered out |
| — | **Named asset-approval authority** | 2 assets stuck at `pending-review` |

---

**Phase 5B complete. Stopping here.** No other route was created — About,
Programs, Lessons, Camps, FAQ, Contact and Teachers remain unbuilt.
