# 11 — Implementation Constraints

What the design must respect to be buildable in this codebase.

---

## 1. The repository is frozen

Frozen at commit **`c460a4e`**. No application code changes until design
specifications are approved. This document describes the target, not work in
progress.

## 2. Express the design as tokens

Everything in `src/tokens/` propagates through the build without component work:
colour, typography, spacing, radius, elevation, motion, layout, breakpoints.

**Cheap:** new palette, new type scale, new typeface, new radius and shadow
rules, new spacing rhythm.

**Expensive:** new section order, new layout primitives, new component
structures, anything requiring new React components.

Neither is forbidden. But a direction that lands entirely in tokens can ship in
days, and one that restructures components cannot.

**If something cannot be expressed through tokens, say so explicitly** so it can
be scoped rather than discovered during implementation.

## 3. Accessibility is non-negotiable

| Requirement | Standard |
|---|---|
| Body text contrast | **4.5:1 minimum**, AAA where achievable |
| Large text contrast | 3:1 minimum |
| Non-text/UI contrast | 3:1 minimum |
| Touch targets | **44 × 44px minimum**, every control |
| Body text size | **16px minimum on every device** — never smaller |
| Focus indicators | Always visible, never removed, never animated |
| Motion | `prefers-reduced-motion` honoured + user-facing override |
| Colour | Never the sole carrier of meaning |
| Headings | Semantic order, never chosen for size |

**Amber on light is the known trap.** The accent as *text* on a light ground
fails contrast. It works as a **fill with dark text** — that is how the current
CTA achieves 9.70:1.

Any new palette must ship a computed contrast table. The last one shipped ratios
that did not hold when computed; two tokens had to be corrected.

## 4. Performance budget

| Metric | Budget |
|---|---|
| Frame rate | 60fps target, 50fps floor |
| Main-thread block | ≤ 50ms |
| Fonts | Self-hosted `.woff2`, **no CDN requests** |
| Font files | Every added face and style is a real download — variable fonts pay for themselves |
| Images | `next/image`, correct aspect ratios, no layout shift |
| GSAP | Dynamically imported, off the critical path |

**Implication for typography:** a design needing four faces × three weights ×
two styles is 24 files. Variable fonts with the axes you actually use are
strongly preferred.

## 5. Bilingual reality

Spanish body copy is already specified at line-height **1.7**. Spanish runs
roughly **15–25% longer** than English.

Any display type set tight to a measure must survive that expansion. Check the
longest Spanish string at every size where type is set large.

⚠️ Gate B-6 decides whether Spanish ships. Design as though it will.

## 6. Motion constraints

Repeated here because they bind the visual design:

- ❌ **fade up, slide up, stagger** — forbidden by name
- ❌ No custom cursors, preloaders, scroll-jacking, horizontal scroll, parallax
  on text, auto-advancing carousels
- ❌ **Never animate** prices, deposits, refund terms, policy text, camp dates,
  capacity, guarantee text, contact details, errors, focus indicators
- Maximum **two pinned sequences sitewide**, ≤ 300vh each, desktop only
- Motion budget is **none** on FAQ and contact templates

Every scroll-driven moment needs a **static equivalent that carries the same
meaning.**

## 7. Content constraints

Full detail in `05-business-claims-and-gates.md`. The short version:

❌ No invented prices, teachers, testimonials, student photographs, showcase
dates, student counts, ratings, or social profiles. ❌ The words "every student"
appear nowhere.

**Where a fallback is documented, the fallback is the design** — not a
placeholder awaiting the thing the gate prohibits.

## 8. Component inventory that already exists

Buttons (4 sizes, variants), links, form inputs with adornments, labels, error
states, header with mobile drawer, desktop navigation, footer, container/grid
primitives, and the homepage sections.

All have Storybook stories. A new visual language re-skins them through tokens.

## 9. Browser and device targets

Modern evergreen browsers. Breakpoints at 375 / 768 / 1024 / 1440.

Motion degrades on genuinely low-end hardware — `cores ≤ 2` or `memory ≤ 2`GB.
⚠️ Gate M-4: the real P75 device profile has never been confirmed from
analytics, so the tiers are engineering estimates.

## 10. What implementation will verify

After the design lands, implementation runs:

- `npm run typecheck && npm run lint && npm run build`
- `npm run probe:motion` — 13 runtime assertions in a real browser
- A computed contrast audit of every specified pair

**Typecheck, lint and build passing does not mean the design shipped.** That
lesson cost three phases on this project. Any motion or visual behaviour that
matters should be specified precisely enough to be asserted.
