# 07 — Technical Foundation

What the build is, and therefore what a design can express cheaply versus
expensively.

---

## 1. Stack

| | |
|---|---|
| Framework | **Next.js 16.3.0** — App Router, Turbopack |
| UI | **React 19.2.8** |
| Language | **TypeScript 5** (strict) |
| Styling | **Tailwind CSS 4.3.3** — `@theme` layer, `@utility`, cascade layers |
| Animation | **GSAP 3.15.0** + ScrollTrigger, SplitText, Flip, CustomEase, `@gsap/react` |
| Smooth scroll | **Lenis 1.3.26**, driven by `gsap.ticker` |
| Components | **Storybook 10.5.6** (`@storybook/nextjs-vite`, a11y + docs addons) |
| Fonts | `next/font/local` with committed `.woff2` — **no font CDN requests** |

## 2. Architecture

```
src/app/          routes — only the homepage is built
src/components/   ui/ · layout/ · home/ · motion/
src/lib/motion/   gsap setup · film/ timelines · camera · light · diagnostics
src/tokens/       colours · typography · layout · elevation · motion
src/config/       site · navigation · seo · theme · motion policy
src/content/      verified copy, extracted from the live site
src/styles/       globals · tokens.css · fonts/
```

## 3. The token layer — the swap point

**This is the most important thing for a designer to understand.**

Every colour, size, weight, radius, shadow and duration resolves through
`src/tokens/`, which mirrors into CSS custom properties. Components reference
**semantic aliases**, never raw palette values.

**A new visual language expressed as token values propagates through the entire
build without touching a single component.**

| Change | Cost |
|---|---|
| New palette | Token edit |
| New type scale | Token edit |
| New typeface | Token edit + 2 font files |
| Radius / shadow changes | Token edit |
| **New section order or layout primitive** | **Component work** |

Design in whatever tool you like, but express the outcome as **token values**
wherever possible. Anything that cannot be expressed through tokens should be
called out explicitly so it can be scoped.

## 4. Current typography

**Two families, both variable, both self-hosted:**

- **Archivo** — display. Variable `wght 100–900` **and `wdth 62–125`**
- **Inter** — body and UI. Variable weight

Subsets: `latin` and `latin-ext` (the latter is required for Spanish).

### Fluid scale — `clamp()` computed for 375 → 1440px

| Token | min → max | Family | Weight | Use |
|---|---|---|---|---|
| `display-xl` | 40 → 88px | Archivo | bold, **expanded** | Homepage hero only |
| `display-lg` | 34 → 64px | Archivo | bold | Page heroes |
| `display-md` | 30 → 48px | Archivo | semibold | Major section heads |
| `heading-lg` | 26 → 36px | Archivo | semibold | H2 |
| `heading-md` | 22 → 28px | Archivo | semibold | H3, card titles |
| `heading-sm` | 19 → 22px | Inter | semibold | H4, labels |
| `body-lg` | 18 → 20px | Inter | regular | Lead paragraphs |
| `body-md` | 16 → 17px | Inter | regular | **Default — never smaller, on any device** |
| `body-sm` | 14 → 15px | Inter | regular | Captions |

Line heights: display `1.15` · body `1.6` · **Spanish body `1.7`** — accented
ascenders need the room.

Tracking: display-xl `-0.03em` · display-lg `-0.025em` · display-md `-0.02em`.

> ⚠️ Gate **D-2** — Archivo is not yet formally approved as the display face.
> A change of typeface is a **token edit plus two font files**, not a rebuild.

## 5. Current colour system

Three named families plus a warm neutral ramp and a functional set.

**Stage** — the darkened house. A blue-black, never a true black.
`950 #070A12` · `900 #0D1220` · `800 #161E32` · `700 #232E4A` · `600 #35436A`

**Spotlight** — the light. Primary accent.
`300 #FFD68A` · `400 #FFC15C` · `500 #F5A524` · `600 #D4870E` · `700 #A66908`

**Velvet** — the curtain. Secondary accent.
`500 #B12A4B` · `600 #8B1E3F` · `700 #6E1631`

**Warm neutrals** — cool greys fight the amber and make photography look
clinical.
`0 #FFFFFF` · `50 #FAF9F7` · `100 #F2F0EC` · `200 #E5E2DC` · `300 #D2CEC6` ·
`400 #A9A49A` · `500 #777269` · `600 #59554D` · `700 #403D37` · `800 #2A2823` ·
`900 #171613`

**Functional** — all pass 4.5:1 on `n-50` and on white.
success `#1F7A4C` · warn `#9A5B00` · error `#B3261E` · info `#1F5C8B`

### Two values were corrected against the design system's own spec

`04-design-system.md` stated contrast ratios that did not hold when computed:

| Token | Documented | Actual | Corrected to | Now |
|---|---|---|---|---|
| `n-500` on `n-50` | 4.6:1 (AA) | **4.23:1 — fails AA** | `#777269` | 4.54:1 ✅ |
| `n-600` on `n-50` | 7.3:1 (AAA) | **6.94:1 — misses AAA** | `#59554D` | 7.05:1 ✅ |

Both are imperceptible shifts that make the system's accessibility promises
true. ⚠️ **Requires sign-off at gate D-1 before the tokens are frozen.**

**A new palette supersedes these values, but the thresholds that forced them
still apply to whatever replaces them.**

## 6. Verified contrast — all 16 pairs pass

| Pair | Ratio | Level |
|---|---|---|
| `n-900` on `n-50` | 17.20:1 | AAA |
| `n-600` on `n-50` | 7.05:1 | AAA |
| `n-500` on `n-50` | 4.54:1 | AA |
| `n-0` on `stage-900` | 18.68:1 | AAA |
| `spot-400` on `stage-900` | 11.59:1 | AAA |
| `stage-950` on `spot-500` — primary CTA | 9.70:1 | AAA |
| `n-0` on `velvet-600` | 8.92:1 | AAA |
| `velvet-700` on `n-0` — links | 11.53:1 | AAA |
| `n-400` on `stage-950` — footer muted | 7.98:1 | AA |
| `spot-400` on `stage-950` — footer links | 12.28:1 | AA |
| error / success / warn / info on `n-50` | 6.21 / 5.06 / 5.16 / 6.74 | AA |

**Amber on light is the trap.** `spot-500` as *text* on a light ground fails.
The primary CTA works because it is an amber **fill with dark text**
(9.70:1), never amber type.

## 7. Accessibility already built in

| Feature | Where |
|---|---|
| `<main tabIndex={-1}>` so focus moves on route change | marketing layout |
| Focus trap in the mobile drawer, focus restored on close | `useFocusTrap` |
| **No** focus trap in the desktop mega-menu — a menu is not a dialog | `Navigation` |
| **44px minimum touch targets** on all controls | Button md/lg/xl, nav, inputs |
| Visible focus indicators | base layer |
| `prefers-reduced-motion` honoured, plus a **user-facing override** | `sdm:reduced-motion` |
| Skip links | layout |

The reduced-motion preference is stored in `localStorage` under
`sdm:reduced-motion` with values `reduced` / `full`; absent means follow the OS.

## 8. Performance

| Budget | Value |
|---|---|
| Target frame rate | **60fps** |
| Minimum acceptable | **50fps** |
| Max main-thread block | **50ms** |
| Capability floor | `hardwareConcurrency ≤ 2` **or** `deviceMemory ≤ 2` GB, or modest on both |

Fonts are self-hosted with no CDN request. GSAP is dynamically imported inside
effects so it stays off the critical path. Images are served through
`next/image`.

> A note learned the hard way: Chrome quantizes `navigator.deviceMemory` and
> caps it at 8. An earlier gate of `cores ≤ 4 || memory ≤ 4` silently disabled
> scrub, pinning and parallax on ordinary laptops. Any design that depends on a
> capability tier should assume the tier detection is deliberately generous now.

## 9. Verification tooling

`npm run probe:motion` drives the real page in headless Chrome and asserts that
motion actually runs — 13 assertions, in both development and production modes.
It exists because three consecutive phases passed typecheck, lint and build
while the motion layer was silently disabled at runtime.

**Relevant to a designer only as reassurance:** if a motion behaviour is
specified, there is a mechanism to prove it shipped.
