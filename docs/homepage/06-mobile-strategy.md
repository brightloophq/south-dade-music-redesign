# 06 — Mobile Strategy

**Phase:** 5A — Homepage Creative Blueprint
**Date:** 2026-08-06
**Governed by:** `04-design-system.md` §4 · `05-motion-system.md` §6, §15 · `02-IA` §4

---

## 1. The premise

> **Mobile is not a reduction of the desktop page. It is where the decision is
> actually made.**

The Confidence Parent researches this at 10pm on a phone, with four browser tabs
open, comparing South Dade Music against soccer, jiu-jitsu and Kumon. A
meaningful share of this market — South Miami-Dade, a large Spanish-speaking
population, many Step Up scholarship families — is on **mid-range Android**, not
a flagship iPhone.

That produces three consequences the desktop design does not get to argue with:

1. **Both pinned sequences are unavailable.** §3 and §5 do not pin below `lg`. The
   page's two most impressive moments are desktop-only, so **the mobile page must
   be persuasive without them.**
2. **Every generated texture is a cost.** They are decorative, and on 4G decoration
   competes with the LCP.
3. **The parent wants the price and the age range fast.** A design that makes them
   scroll through persuasion to reach arithmetic is a design that loses to a
   competitor with a worse-looking page and a visible price.

---

## 2. Section-by-section

| § | Section | Mobile treatment | Change from desktop |
|---|---|---|---|
| **1** | The Bill | Content-height, not viewport-height. Order: eyebrow → H1 (4–5 lines, 40px, **width axis 100**) → hairline → week line → CTAs → 4:5 image → fact bar 2×2 | Expanded width **drops to normal** — line breaks get unreliable at this measure. Photograph moves **below** the CTAs |
| **2** | The Reframe | ~30px, 4–6 lines, full section of quiet retained | **Not compressed.** This is the emotional pivot and it needs the silence |
| **3** | **The Journey** | **Not pinned.** Vertical sequence: rule runs top→bottom, week markers as a left rail, three stages as three blocks with `fade-rise` | ⚠️ **The signature moment loses its signature.** See §3 below |
| **4** | The 12 Weeks | **Stacked cards.** Weeks 1–10 collapse to one summary card; weeks 11 and 12 get their own | ⭐ Table → cards. **Never horizontally scrolled** |
| **5** | The Ladder | Five steps as a vertical list with a connecting rule | Not pinned |
| **6** | Who Teaches | 1 column, or 2-up compact above four instructors | No hover states at all |
| **7** | Evidence | 2-up gallery, **captions always visible**, lightbox retains swipe + counter | Hover-revealed captions do not exist on touch |
| **8** | In Their Words | 1 column, **5 reviews** + *"Read all 14"* | 8 → 5. **No carousel** |
| **9** | What It Costs | **Stacked cards** | ⭐ Hard rule — never a scrolled pricing table |
| **10** | The Door In | Single column, steps as an accordion **open by default** | Nothing procedural hides behind an interaction |
| **11** | The Turn | ~30px | **Not compressed** — emotional peak |
| **12** | Guarantee + Start | Full-width `xl` CTA. **Sticky bar hides here** | So it never obscures the real close or the footer |

**Scroll budget: ≈700vh** (desktop ≈850vh). The reduction comes from §3 and §5
losing their pin distance, not from cutting content.

---

## 3. The honest problem: §3 without a pin

On desktop, the Journey is a scrubbed sequence where a point of light travels a
rule and blooms at week 12. On mobile that is gone. `05-motion-system.md` §6
rule 4 is unambiguous: **do not attempt pinning on mobile.**

**This is a real loss and it should not be papered over.** The mobile page's most
important section is the one that works least like its design.

### What replaces it

Not a shrunken version — a **different composition with the same emotional
structure**:

```
   ┌──────────────────────────────┐
   │  What ninety days looks like │
   │                              │
   │  ●  WEEKS 1–10               │   ← marker dim, rail cool
   │  │  Skill development        │
   │  │  and rehearsal.           │
   │  │                           │
   │  ●  WEEK 11                  │   ← marker brighter, rail warming
   │  │  They play for the class. │      six small points beside it
   │  │                           │
   │  ◉  WEEK 12                  │   ← marker blooms, ground darkest
   │     Dress rehearsal and      │
   │     live showcase.           │
   └──────────────────────────────┘
```

The vertical rail carries the same three beats: **accumulation → the catch of
breath → arrival.** Each block reveals with `fade-rise` as it crosses 80%
viewport, and the marker for that block brightens on arrival. The ground darkens
across the three blocks exactly as it does on desktop.

**What survives:** the three stages, the warming, the darkening ground, the week-12
bloom, all twelve weeks as text.
**What is lost:** the continuous travel of the performer point, and the sensation
of ten weeks passing under your thumb.

The compensation is that the mobile version reaches §4's table **sooner** — and
the table is the more persuasive artefact for a parent doing arithmetic on a
phone.

---

## 4. Navigation and persistent conversion

| Element | Behaviour |
|---|---|
| **Header** | 56px. Logo + hamburger + **persistent trial button**. The CTA is never sacrificed for space |
| **Drawer** | Full-screen `stage-900`, opens right, **accordion sections — never nested screens**. Focus trapped, restored on close. Escape closes. Body scroll locked with scrollbar compensation |
| **Sticky action bar** | Appears after **25% scroll**. `stage-900`, top hairline. `xl` primary CTA + call. **Hides when a form field is focused. Hides at §12** so it never obscures the close or the footer |
| **Skip link** | First tab stop, `z-index: 900` — above the header (200) and drawer (300) |
| **Language switch** | ⚠️ B-6. Static indicator, not a control, until the Spanish tree exists |

### The escape hatch

A **"Jump to prices"** affordance in the sticky bar, live from 25% scroll.

This is the mobile page's most commercially important control and it looks like a
convenience. A parent who wants the number should get it in one tap rather than
scrolling nine sections — and a parent who gets the number quickly and *stays* is
a far better lead than one who bounces at §5.

---

## 5. Typography on mobile

| Token | Desktop | Mobile | Note |
|---|---|---|---|
| `display-xl` (§1 H1) | 88px, width 112 | **40px, width 100** | Expanded width abandoned — unreliable line breaks at this measure |
| `display-md` (§2, §11) | 48px | 30px | |
| `heading-lg` (H2s) | 36px | 26px | |
| `body-md` | 17px | **16px** | **Never smaller, on any device** |
| `label` | 13px | 13px | Fixed |

**Line length:** 68ch is a desktop constraint; on a 360px viewport the natural
measure is ~40ch, which is inside the comfortable range without intervention.

⚠️ **Spanish + mobile is the worst case in the project.** *"Listos para el
escenario"* at 40px in a 320px viewport is the specific combination to test
first, not last.

---

## 6. Performance — the budgets that bite

| Metric | Target | Mobile risk |
|---|---|---|
| **LCP** | <2.5s on 4G, **never JS-dependent** | The §1 H1 or the 4:5 texture. Must be `fetchpriority="high"`, never lazy |
| **CLS** | **0.00** | Fact bar has reserved height; every image has explicit dimensions; the sticky bar overlays rather than reflows |
| **INP** | <200ms | Drawer open is the heaviest interaction |
| **Frame rate** | 60fps, **never below 50** | The §3 vertical sequence and the houselights |
| GSAP + ScrollTrigger | <45KB gz | Measured at 44KB |
| Total animation JS | <70KB gz | |

### Capability degradation

`hardwareConcurrency ≤ 4` **or** `deviceMemory ≤ 4GB` → scrub, pinning and
parallax off; simple reveals retained. `Save-Data` → full reduced-motion
behaviour.

On such a device the mobile page renders as: static hero, static §3 diagram with
all twelve weeks, static §5 with all five rungs lit, opacity-only reveals, no
houselights. **Every word is present. Nothing is hidden behind a capability the
device does not have.**

### Asset budget

| Asset | Mobile treatment |
|---|---|
| §1 hero ground | **4:5, separately generated**, AVIF ≤120KB |
| §3 ambient ×3 | 4:5 or 9:16, **1K**, AVIF ≤60KB each |
| §5 substrate | **Omitted** — not justified on 4G |
| §2 / §11 grounds | **Omitted** — flat ground |
| §7 gallery | Thumbnails ≤40KB, lazy, full frames on demand |

**Never centre-crop a 16:9 texture to 4:5.** The 16:9 composition puts its
uncluttered zone on the left third; centre-cropping destroys exactly the zone the
headline needs.

---

## 7. Touch and accessibility

| Rule | Application |
|---|---|
| **44×44px minimum**, 8px separation | Every CTA, nav item, accordion header, gallery thumbnail |
| **No hover-dependent content** | §7 captions always visible. §6 name always visible |
| `@media (hover: hover) and (pointer: fine)` | All hover states gated — sticky-hover on touch is a known bug class |
| **Zoom never blocked** | No `maximum-scale`, no `user-scalable=no` |
| **Focus full strength** | Including inside the drawer |
| **Escape closes** the drawer | Focus returns to the toggle |
| Body scroll lock | Scrollbar-width compensated — no layout shift on open |
| Accordions | §10 steps **open by default** — procedural content never hides |
| Orientation | Both supported. Landscape phones get the tablet treatment |

**Reduced motion on mobile is the likeliest state to actually ship to a real
user**, between OS preferences, Save-Data, and low-end devices. It must be
reviewed as a primary presentation, not a fallback.

---

## 8. What mobile does better than desktop

Not everything degrades. Three things are genuinely stronger:

1. **The houselights land harder.** A full-viewport register change reads as a
   room change on a phone in a way it cannot on a 27-inch monitor where the eye
   sees several sections at once.
2. **The pricing cards beat the table.** A stacked card per format is more
   scannable than a comparison grid, and it removes the horizontal-scroll failure
   mode entirely.
3. **§4 arrives sooner.** Without §3's pin distance the parent reaches the
   published twelve weeks faster — and that table is the single most persuasive
   artefact on the page for someone doing arithmetic.

---

## 9. Mobile test matrix

Before this page ships:

| Test | Device / condition | Pass criterion |
|---|---|---|
| LCP | Mid-range Android, throttled 4G | <2.5s |
| CLS | All breakpoints, hero → fact bar | 0.00 |
| Frame rate | Mid-range Android, §3 + houselights | ≥50fps sustained |
| Pricing table | 320px viewport | **No horizontal scroll anywhere** |
| §1 H1 | 320px, English **and** Spanish | No overflow, no forced size override |
| Drawer | Keyboard + screen reader | Focus trapped, restored, Escape closes |
| Sticky bar | With a form field focused | Hides |
| Sticky bar | At §12 | Hides |
| Reduced motion | Preference on | All 12 weeks + 5 rungs visible, nothing hidden |
| No JS | Script disabled | Full page readable, all content present |
| Low capability | `deviceMemory ≤ 4` simulated | Static diagrams, no scrub |
| Touch targets | All interactive elements | ≥44×44px, ≥8px apart |
| Zoom | 200% and 400% | No content loss, no horizontal scroll |
| Landscape | Phone, rotated | Tablet treatment, no clipping |

---

## 10. The mobile-first decisions worth restating

These were made *for* mobile and then applied to desktop, not the reverse:

- **The fact bar is part of the hero.** On mobile it is the first thing after the
  CTAs, so the promise is substantiated before the first scroll.
- **§4 exists at all.** Desktop could have relied on §3's drama. Mobile cannot,
  so the published table became a section — and it turned out to be the page's
  strongest SEO asset.
- **§9 ships with an honest gap rather than nothing.** A parent on a phone will
  not phone to ask. The $25, the structure, and *"we'll quote you before you
  commit"* are worth more than a blank space.
- **The escape hatch is in the sticky bar.** Designed for the impatient mobile
  parent; it makes the desktop page better too.

---

**End of Phase 5A.**

| Document | Covers |
|---|---|
| [`01-homepage-blueprint.md`](./01-homepage-blueprint.md) | Strategy, hero concepts and choice, section order, register map, gates |
| [`02-section-specifications.md`](./02-section-specifications.md) | All twelve sections × seventeen attributes, with fallbacks |
| [`03-motion-map.md`](./03-motion-map.md) | The 90-Day Journey beat by beat, plus every other motion |
| [`04-copy-framework.md`](./04-copy-framework.md) | Every line, provenance-marked, with the banned list |
| [`05-image-placement.md`](./05-image-placement.md) | Photography and generated assets, in two states |
| [`06-mobile-strategy.md`](./06-mobile-strategy.md) | This document |

**No implementation has begun. Phase 5B awaits approval.**
