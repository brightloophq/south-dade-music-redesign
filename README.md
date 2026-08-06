# South Dade Music

Redesign of the South Dade Music website — a music academy in Florida City, Florida.

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you need
npm run dev                  # http://localhost:3000
```

Nothing in `.env.local` is required to run the site. The variables only enable
optional tooling — image generation and the motion debug panel.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | typecheck + lint + build |
| `npm run probe:motion` | Verify the motion layer in a real browser — see below |
| `npm run storybook` | Component laboratory on :6006 |
| `npm run generate:image` | Generate an atmospheric asset (see `docs/redesign/`) |

## Verifying motion

Typecheck, lint and build **cannot** tell you whether the motion layer runs.
Three consecutive phases of this project passed all three while the homepage was
silently frozen: a capability gate had resolved to `false` on ordinary hardware,
a GSAP plugin was never registered, and a colour ramp's only caller had been
deleted. None of that is visible to a static check.

`npm run probe:motion` drives the real page in headless Chrome and asserts that
light travels, the grade evolves, the week counter advances and the flare fires.

```bash
npm run dev                                        # terminal 1
npm run probe:motion                               # terminal 2 — dev mode
npm run probe:motion http://localhost:3100/ --production
```

**Requires a system Chrome or Edge.** The probe uses `playwright-core`, which
ships no browser binaries by design — one diagnostic script does not justify a
~150 MB download. Searched paths are in `CHROME_CANDIDATES` at the top of
`scripts/motion-probe.mjs`; add yours if it differs.

Dev mode reads the diagnostics store and reports every timeline individually.
Production mode asserts the opposite: that the instrumentation is *gone* and the
film runs anyway. See `docs/implementation/delivery-readiness.md`.

## Motion debug panel

Set `NEXT_PUBLIC_MOTION_DEBUG=true` in `.env.local` for a live overlay showing
GSAP state, capability resolution, and per-timeline progress.

It is gated on that flag **and** `NODE_ENV !== 'production'`, so a production
build strips it even if the flag is left on. The diagnostics store behind it
compiles to empty functions in production — verified by scanning the build
output, not assumed.

## Layout

```
src/app/          routes (only the homepage is built so far)
src/components/   ui/ · layout/ · home/ · motion/
src/lib/motion/   gsap setup, film/ timelines, camera, light, diagnostics
src/tokens/       design tokens — the single source of colour/type/space
src/content/      verified copy, extracted from the live site
docs/             extraction, strategy, art direction, implementation reports
scripts/          generate-image.mjs · motion-probe.mjs
```

## Status

The homepage is built. The other 28 routes referenced by the navigation and
homepage CTAs — including `/contact/book-a-trial` — do not exist yet, so those
links 404. Several content decisions are still gated pending client sign-off
(pricing, teacher names, photo consent); see the decision gates in `docs/`.
