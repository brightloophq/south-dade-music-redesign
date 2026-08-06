# Phase 4 — Foundation Implementation Report

**Date:** 2026-08-06
**Scope:** Production-ready engineering foundation. **No marketing content, no homepage, no page sections.**
**Stack:** Next.js 16.3.0 (App Router, Turbopack) · React 19.2.8 · TypeScript 5 · Tailwind CSS 4.3.3 · GSAP 3.15 · @gsap/react 2.1.2 · Lenis 1.3.26 · Lucide React 1.28 · React Hook Form 7.84 · Zod 4.4.3
**Canonical specs:** `docs/redesign/04-design-system.md` · `05-motion-system.md` · `02-information-architecture.md` · `08-content-model.md` · `final-art-direction.md`

---

## 1. Status

| Gate | Command | Result |
|---|---|---|
| **Typecheck** | `npm run typecheck` | ✅ **Pass** — 0 errors |
| **Lint** | `npm run lint` | ✅ **Pass** — 0 errors, 0 warnings |
| **Production build** | `npm run build` | ✅ **Pass** — 4 routes prerendered static |
| **Runtime smoke test** | `next start` + HTTP | ✅ `/` 200 · `/robots.txt` 200 · `/sitemap.xml` 200 · unknown route 404 |
| **Contrast contract** | computed, all pairs | ✅ **16/16 pass** (after two corrections — see §7) |

`npm run check` runs all three gates in sequence.

```
Route (app)
┌ ○ /              (foundation placeholder, noindex)
├ ○ /_not-found
├ ○ /robots.txt
└ ○ /sitemap.xml
○  (Static)  prerendered as static content
```

---

## 2. Files created

**116 source files** under `src/`. The `app/` directory was moved to `src/app/` and `tsconfig.json`'s `@/*` path updated to `./src/*`.

### Tokens — 6 files
```
src/tokens/colors.ts        palette · semantic aliases · contrast contract · banned combinations
src/tokens/typography.ts    families · width axis · fluid scale · measure · enforceable rules
src/tokens/layout.ts        spacing · section rhythm · radius · breakpoints · grid · containers
src/tokens/elevation.ts     shadows · elevation pairs · z-index · semantic opacity
src/tokens/motion.ts        durations · easings · staggers · entrance patterns · budgets
src/tokens/index.ts         barrel + `tokens` namespace
```

### Styles — 3 files
```
src/styles/tokens.css       Tailwind v4 @theme + :root customs + [data-register="house"]
src/styles/globals.css      base layer · focus · reduced motion · custom utilities · Lenis
src/styles/fonts.ts         Archivo + Inter via next/font (self-hosted)
```

### Config — 5 files
```
src/config/site.ts          gated business facts, open-gate registry, indexing switch
src/config/navigation.ts    primary nav, footer nav, CTA, utility actions, MAIN_CONTENT_ID
src/config/seo.ts           title template, limits, excluded paths, banned keyword phrases
src/config/motion.ts        runtime motion policy, pinning registry, never-animate list
src/config/theme.ts         the two registers, route→register table, `registerForPath()`
```

### Types — 4 files
```
src/types/navigation.ts     NavItem · NavGroup · PrimaryCta · RouteStatus · BreadcrumbItem
src/types/content.ts        Asset · Lesson · Program · Camp · Faq · Testimonial · Gallery ·
                            Performance · Cta + publication rules as executable predicates
src/types/seo.ts            PageSeo · StructuredDataNode · SitemapEntry
src/types/index.ts          barrel
```

### Lib — 12 files
```
src/lib/utils/     cn.ts · url.ts (canonicalPath, absoluteUrl, isExternalHref) · index.ts
src/lib/seo/       metadata.ts · open-graph.ts · robots.ts · sitemap.ts ·
                   breadcrumbs.ts · structured-data.ts · index.ts
src/lib/motion/    gsap.ts (single registration) · capability.ts · animations.ts ·
                   types.ts · index.ts
```

### Hooks — 7 files
```
useMediaQuery · useReducedMotion · useScrollDirection · useFocusTrap ·
useLockBodyScroll · useIsomorphicLayoutEffect · index
```

### Components — 74 files

| Group | Components |
|---|---|
| **layout/** | `Header` · `Footer` (+ `MotionToggle`) · `Navigation` · `MobileNav` · `SkipLink` |
| **ui/** | `Button` · `Card` (+Media/Body/Facts/Footer) · `Container` · `Section` · `Grid` · `Stack` · `Cluster` · `Sidebar` · `Split` · `Typography` (Text/Eyebrow/Prose) · `Icon` · `Badge` · `Divider` · `VisuallyHidden` |
| **forms/** | `FormField` (+Label/HelperText/ValidationMessage/`useField`) · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` |
| **motion/** | `MotionProvider` (+context, +stores) · `FadeIn` · `Reveal` · `Stagger` · `Parallax` · `useRevealOnScroll` |

### App + providers + content — 8 files
```
src/app/layout.tsx                 root (Server Component) — fonts, metadataBase, viewport
src/app/(marketing)/layout.tsx     shell: SkipLink → Header → main → Footer
src/app/(marketing)/page.tsx       foundation placeholder (noindex) — NOT the homepage
src/app/not-found.tsx              404 with its own landmarks, zero external deps
src/app/robots.ts · sitemap.ts     metadata routes
src/providers/AppProviders.tsx     single client boundary
src/content/index.ts               typed, deliberately-empty collections
```

### Modified
```
tsconfig.json    @/* → ./src/*
package.json     + typecheck, check scripts
```

---

## 3. Architecture decisions

### 3.1 The root layout stays a Server Component

Only `AppProviders` crosses into the client. Page content is server-rendered, so the LCP element never waits on JavaScript — a hard requirement from `05-motion-system.md` §15 rule 9. New providers go inside `AppProviders`, not the layout.

### 3.2 Two token representations, one canonical

Tailwind v4 generates utilities from CSS `@theme`, so CSS must hold the values. TypeScript consumers (GSAP timelines, capability checks, tests) need them too. Both exist and are kept in sync by hand.

> ⚠️ **Token drift is a real risk.** `src/styles/tokens.css` and `src/tokens/*.ts` must be changed together. **Recommended follow-up:** generate the CSS from the TS at build time, or add a CI test asserting the two agree. Not done in Phase 4 because it adds a build step before there is anything to protect.

### 3.3 Registers are data attributes, not a colour scheme

`[data-register="house"]` re-points the semantic colour aliases. A `<Section register="house">` needs no register-specific classes on its children — they read `--color-text-primary` and get the right value.

This is deliberate: the two rooms are an **information architecture**, not a user preference (`final-art-direction.md` §1). Using `prefers-color-scheme` would have handed the decision to the OS.

### 3.4 Route status prevents links to nowhere

Every nav item carries `status: 'live' | 'planned' | 'gated'`. Non-live items render as text, not links, and carry `data-route-status` / `data-gate`. `02-IA` §10 rule 3 requires every CTA be a real link; the inverse — a link to a page that does not exist — is prevented structurally rather than by discipline.

The sitemap is built from the same config filtered to `live`, so it emits only `/`. That is correct: Phase 2 found four URLs for one summer product, one of them empty and indexable.

### 3.5 Browser state via `useSyncExternalStore`, not effects

`MotionProvider` reads the stored preference and the device profile through external stores (`src/components/motion/MotionProvider/stores.ts`).

This started as a lint failure (`react-hooks/set-state-in-effect`) and was fixed properly rather than suppressed. Two real reasons:
- The provider wraps every page; setState-in-effect costs each mount a second render pass.
- The value is correct on the **first** client render, so motion never briefly resolves the wrong way before an effect corrects it.

The same reasoning applied to `Navigation` and `MobileNav`, which now close on route change by adjusting state during render.

### 3.6 GSAP is loaded dynamically, always

`registerGsap()` is reached through `await import('@/lib/motion/gsap')` inside an effect. A static import would put the GSAP engine into the provider chunk — which is on every page — violating "no animation library on the critical path" (`05` §15 rule 10). Verified in §6.

### 3.7 Forms: composition enforces accessibility

Controls call `useField()` and **throw** outside `<FormField>`. There is no `hideLabel` prop. An unlabelled input is not something a developer can build by accident.

`Select` is a native `<select>` and `Checkbox`/`Radio` keep the native input in the DOM. The academy serves Unique Abilities scholarship students, so assistive-technology compatibility is a market requirement — a custom listbox would trade that away for styling.

### 3.8 No `clsx` / `tailwind-merge`

`cn()` is ~25 lines with no dependencies. Tailwind v4's cascade layers mean late-declared utilities win, so a merge step is not needed for this codebase's conflict cases. If real conflict bugs appear, the implementation changes in one file rather than at every call site.

### 3.9 Explicit layout props over generated `LayoutProps<'/'>`

Next 16 generates `LayoutProps` into `.next/types`, which does not exist on a clean checkout — so `npm run typecheck` would fail before `npm run build` had ever run. Layouts use explicit `{ children: React.ReactNode }` so the gates are order-independent.

---

## 4. Token system

| Category | Location | Notes |
|---|---|---|
| **Colour** | `tokens/colors.ts` + `@theme` | Stage / Spotlight / Velvet + warm neutrals + functional. Semantic aliases re-point per register. |
| **Typography** | `tokens/typography.ts` | 11 fluid `clamp()` steps computed for 375→1440px. Width axis: condensed 87.5% / normal / wide 106% / expanded 112%. |
| **Spacing** | `tokens/layout.ts` | 4px base; 13 steps 0→192px. Section rhythm responsive via `--section-*`. |
| **Radius** | `tokens/layout.ts` | none/sm/md/lg/xl/full — 0/4/8/16/24/9999. |
| **Elevation** | `tokens/elevation.ts` | 5 levels, light **and** dark pairings. Dark surfaces carry elevation with tone, not shadow. |
| **Shadows** | `@theme` | Warm-tinted (from `n-900`), never pure black on light. Plus `--shadow-spotlight`, the brand signature. |
| **Containers** | `@theme` | prose 68ch · narrow 768 · content 1200 · wide 1440. |
| **Breakpoints** | `@theme` | 480 / 768 / 1024 / 1280 / 1536. |
| **Transitions** | `tokens/motion.ts` + `:root` | 6 durations, 4 easings (CSS + GSAP flavours), 4 staggers. |
| **Z-index** | `:root` | 11 named layers. Skip link at 900, above header (200) and drawer (300). |
| **Opacity** | `:root` | Named by intent: disabled, muted, veil, scrim, hairline-on-dark. |

**Fluid scale example** — `display-xl` 40→88px becomes
`clamp(2.5rem, 1.4437rem + 4.507vw, 5.5rem)`.

**Rules encoded as data, not prose:** `bannedCombinations` (amber on white), `typographyRules` (16px body floor, one H1, +35% Spanish expansion), `motionConfig.neverAnimate` (12 entries), `motionConfig.prohibited` (13 entries), `assetPublicationRules` (4 executable predicates).

### Typography

Archivo and Inter load through `next/font/google`, which downloads the files at build time and serves them from our own origin. **Verified: zero references to `fonts.googleapis.com`, `fonts.gstatic.com` or `s.w.org` in the built CSS; 10 `.woff2` files in `.next/static/media`.**

Both load as **variable** fonts (no `weight` array), which is required before extra axes may be requested and gives the full weight range in one file. Archivo requests `axes: ['wdth']` for the width axis. `latin-ext` is subset for Spanish diacritics.

---

## 5. Accessibility

### Implemented

| Feature | Where |
|---|---|
| **Skip link**, first tab stop, `z-index: 900` above header and drawer | `SkipLink`, both layouts |
| **Semantic landmarks** — banner / main / contentinfo / nav | `(marketing)/layout.tsx`, verified in prerendered HTML |
| `<main tabIndex={-1}>` so focus can be moved on route change | `(marketing)/layout.tsx` |
| **Focus ring**, 2px `spot-500` at 2px offset, never reduced, never animated | `globals.css` |
| **Focus trap** in the mobile drawer, focus restored on close | `useFocusTrap` |
| **No focus trap** in the desktop mega-menu — a menu is not a dialog | `Navigation` |
| Escape + outside-click closes menus | `Navigation`, `MobileNav` |
| **Body scroll lock without layout shift** (scrollbar-width compensated) | `useLockBodyScroll` |
| **Reduced motion** — OS preference, `Save-Data`, and a manual footer toggle | `MotionProvider`, `MotionToggle`, `globals.css` |
| Focus indicators exempt from reduced-motion suppression | `globals.css` |
| **44px minimum touch targets** on all controls | Button sizes md/lg/xl, nav items, checkbox/radio wrappers |
| Hover states gated behind `@media (pointer:fine) and (hover:hover)` | `pointer-fine:` variant — **verified in compiled CSS** |
| Programmatic label/description/error association | `FormField` + `useField` |
| `role="alert"` on validation messages, no entrance animation | `ValidationMessage` |
| Required marked in text, not colour alone | `Label`, `RadioGroup` |
| `<fieldset>`/`<legend>` for radio groups | `RadioGroup` |
| Zoom not blocked — no `maximumScale`, no `userScalable: false` | `viewport` export |
| Decorative icons `aria-hidden`; icon-only buttons need `aria-label` | `Icon` |
| `text-wrap: balance` on headings, `pretty` on paragraphs | `globals.css` |
| Spanish line-height 1.7 via `:lang(es)` | `globals.css` |

### Verified contrast — all 16 pairs pass

| Pair | Ratio | Target |
|---|---|---|
| `n-900` on `n-50` | 17.20:1 | AAA |
| `n-600` on `n-50` | 7.05:1 | AAA |
| `n-500` on `n-50` | 4.54:1 | AA |
| `n-0` on `stage-900` | 18.68:1 | AAA |
| `spot-400` on `stage-900` | 11.59:1 | AAA |
| `stage-950` on `spot-500` (primary CTA) | 9.70:1 | AAA |
| `n-0` on `velvet-600` | 8.92:1 | AAA |
| `velvet-700` on `n-0` (links) | 11.53:1 | AAA |
| `n-400` on `stage-950` (footer muted) | 7.98:1 | AA |
| `spot-400` on `stage-950` (footer links) | 12.28:1 | AA |
| error / success / warn / info on `n-50` | 6.21 / 5.06 / 5.16 / 6.74 | AA |
| ❌ `spot-500` on `n-0` | 2.04:1 | **correctly fails — banned** |

---

## 6. Performance

### Measured, this build

| Metric | Value | Budget (`05` §15) |
|---|---|---|
| Initial JS (8 chunks, gzip) | **181 KB** | — |
| Initial CSS (gzip) | **9 KB** | — |
| **GSAP + ScrollTrigger** (lazy chunk, gzip) | **44 KB** | **< 45 KB** ✅ |
| **Animation JS on the critical path** | **0 KB** ✅ | must load after first paint |
| Routes prerendered static | 4 / 4 | — |
| External runtime requests (fonts, icons, CSS) | **0** ✅ | first-party only |

The initial bundle contains motion *config* (easing strings, stagger values) and dynamic-import references only — verified by grepping the referenced chunks for the GSAP engine (`registerPlugin`, `_gsScope`): **0 matches**.

### Built in

- **Animation is `transform` and `opacity` only** — enforced inside the reveal utilities, not left to call sites.
- **`will-change` set immediately before, cleared on completion**; elements marked `data-animate-done` so they never re-animate.
- **ScrollTrigger instances killed** on unmount via `gsap.context().revert()` and `killScrollTriggers()`.
- **One trigger per group** — `Stagger` batches rather than creating N triggers.
- **Stagger capped at 600ms total**, switching to a tight interval beyond 8 items.
- **Device capability gate** — `hardwareConcurrency ≤ 4` or `deviceMemory ≤ 4GB` disables scrub, pinning and parallax; `Save-Data` degrades to reduced motion entirely.
- **Resize debounced 200ms** before the device profile recomputes.
- **Scroll listener is passive and rAF-throttled**, one listener for the whole app.
- **Lenis loaded lazily** and driven by the GSAP ticker, so scroll and animation share one clock.
- **CLS protection** — scrollbar compensation on scroll lock; the header transitions colour and height, never transform; button loading state locks width and keeps the label.
- **Content is never `opacity: 0` in base CSS.** `data-animate-ready` is set only after GSAP confirms it can run, so a JS failure leaves everything visible.

---

## 7. Deviations from the specification

Three, all deliberate. Each needs sign-off.

### 7.1 Two neutral values corrected ⚠️ **needs gate D-1 sign-off**

`04-design-system.md` §1 states contrast ratios that do not hold when computed:

| Token | Documented | Computed | Corrected to | Now |
|---|---|---|---|---|
| `n-500` on `n-50` | 4.6:1 (AA) | **4.23:1 — fails AA** | `#7C776D` → `#777269` | 4.54:1 ✅ |
| `n-600` on `n-50` | 7.3:1 (AAA) | **6.94:1 — misses AAA** | `#5A564E` → `#59554D` | 7.05:1 ✅ |

`n-500` is the muted-text token used at `body-sm` (14–15px) — normal-size text, so 4.5:1 applies. This was a genuine WCAG AA failure in the specified palette, not a rounding quibble.

Both shifts are imperceptible and preserve the warm tint. **The palette is not frozen until gate D-1 (logo review); these corrections should be confirmed then.**

Separately, `n-500` on `stage-950` computes to 4.44:1, also below AA — so the footer's muted text uses `n-400` (7.98:1) instead. `n-500` is a light-ground token only.

### 7.2 The signature moment is not built

`05-motion-system.md` §1 allocates 60% of motion effort to the 90-Day Timeline. That is a page section, explicitly out of Phase 4 scope. The foundation registers both permitted pinned sequences in `motionConfig.pinning.approved` so a third cannot be added silently.

### 7.3 Business structured data is suppressed

`buildOrganization()`, `buildLocalBusiness()` and `buildWebSite()` return `null` and will keep returning `null` until `siteConfig.structuredDataEnabled` is flipped. The shapes are written and ready.

Reason: four brand names, three unit numbers, two phone numbers and two email addresses are live in the estate. Publishing contradictory facts in a machine-readable form is worse than publishing them in prose, because it is harder to walk back. `buildBreadcrumbList()` is active — it describes site structure, not business facts.

---

## 8. Remaining blockers

### Owner decisions — block content, not engineering

| Gate | Question | Blocks in this codebase |
|---|---|---|
| **B-4** | Approve honest 90-day promise wording | Hero H1, footer claim, structured data |
| **B-5** | Single brand name + ™ status | `siteConfig.name`, header wordmark, all schema |
| **B-6** | Bilingual: build it or drop the claim | `/es` tree; language switch is a static indicator today |
| **B-7** | Instructor names, credentials, permission | `/teachers` route |
| **B-8** | Pricing for every product | `primaryCta.priceSuffix` is `null`; CTA renders without a price; `/pricing` |
| **D-1** | Logo review before token freeze | Palette confirmation **incl. §7.1 corrections** |
| **I-1** | Photo-release consent for all 18 photographs | Every real photograph |
| **I-4** | Next showcase date | `/events`, showcase CTA |
| **I-8** | Correct unit number (117 / 1157 / 115) | Footer contact block, `LocalBusiness` schema |
| **B-3 / M-3** | Ladder rungs · showcase footage | Pinned sequence 2, timeline payoff |

Contact conflicts also unresolved: **phone** (sitewide footer vs a different number on the subdomain) and **email** (`info@` vs `contact@`). The footer contact block is intentionally empty rather than guessing.

### Engineering follow-ups — not blockers

1. **Token drift protection** — codegen or a CI equality test between `tokens.css` and `tokens/*.ts` (§3.2).
2. **Contrast in CI** — `contrastContract` and `bannedCombinations` are exported for exactly this; no runner is wired up.
3. **Automated a11y testing** — axe or Playwright. Phase 4 verified landmarks by inspecting prerendered HTML and contrast by computation; neither is a substitute for a suite.
4. **Heading-hierarchy audit in CI** — `04` §2 requires it; `typographyRules` holds the constraints.
5. **Seven bespoke instrument icons** — brand assets, drawn on the design grid, not Phase 4.
6. **Lint rule for banned amber-on-light** — currently a documented rule and a data export, not an enforced check.
7. **No test framework installed.** Nothing in `package.json` runs unit tests. Worth adding before component logic grows.
8. **`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING`** are unset, so the site defaults to `https://www.southdademusic.com` and **`robots.txt` currently emits `Disallow: /`** — correct for a non-production deployment, and must be set deliberately at launch.

---

## 9. What was deliberately not built

Per the Phase 4 brief:

- ❌ No homepage sections, no hero
- ❌ No lesson, program, camp or scholarship pages
- ❌ No business forms — primitives only; the trial and camp flows are blocked on B-8 anyway
- ❌ No marketing content or business copy
- ❌ No generated images integrated into the UI (`public/images/generated/homepage-hero-stage-light.jpg` remains `pending-review` and unreferenced)
- ❌ No UI animation — motion primitives ship unapplied
- ❌ No business structured data

`src/content/index.ts` exports empty, correctly-typed collections so consuming code can be written and type-checked before content exists.

---

## 10. Verification commands

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # next build
npm run check       # all three, in order
npm run dev         # local development
```

---

**Phase 4 complete. Stopping here. No Phase 5 work has begun; the homepage awaits approval.**
