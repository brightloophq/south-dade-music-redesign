# Implementation Handoff — "The Film" onto the Next.js build

Companion to `Visual Specification.md` (rules + rationale) and `The Film.html`
(annotated comps). This file maps the frozen direction onto the repository at
`uploads/south-dade-music-redesign` (frozen at `c460a4e`), whose token layer is
the swap point per `docs/design-handoff/07-technical-foundation.md` §3.

## 1. What ships as a token edit — `handoff/tokens.css`

Drop-in replacement for `src/styles/tokens.css`. Update the `src/tokens/*.ts`
mirrors together with it. Headlines:

- **Palette** → the temperature arc. New `--color-ground-*` tokens (pitch, wing,
  memory, stage, flash, house). Neutrals re-anchored to ivory `#F7F4EE`.
  **Velvet is retired** — its tokens now resolve to the text colour so stale
  references fail soft; remove them in cleanup. Spotlight collapses from a
  5-step ramp to one light (`#E9A23B`) + one derived dark (`#8A5A1B`).
- **Type** → `--font-bricolage` + `--font-newsreader` (see §2). Scale re-valued
  in place: `display-xl` is now THE SHOUT (96→180px, one use per site),
  `display-lg` the Statement (26→46px, twice per page); new roles
  `--text-whisper` and `--text-ghost`.
- **Radius** → all 0 except `--radius-full` (the CTA pill).
- **Shadows** → all `none`. `--shadow-spotlight` is redefined as the one glow
  (the mark / the release), no longer a CTA ring.
- **Motion** → curves unchanged; three structural durations added:
  `--duration-release` 400ms, `--duration-still` 1500ms,
  `--duration-houselights` 1800ms.
- **Registers** → `[data-register='house']` attribute kept verbatim (zero
  component churn) but its values are now the film grounds; the default (light)
  register is the desk. Movement grounds (pitch/memory/stage) apply per-section
  via `bg-ground-*` utilities that `@theme` generates automatically.
- `--grid-margin` at ≥1280px becomes **150px** — the film margin where all
  subtitle-hung type sits.

## 2. Fonts — gate D-2 resolved

- **Archivo: replaced. Inter: removed** (per `09-current-design-problems.md` §2).
- **Bricolage Grotesque** (structure): variable `opsz 12–96 · wdth 75–100 ·
  wght 200–800`. Source file is in this project at
  `fonts/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf` — convert to woff2
  (latin + latin-ext) for `next/font/local`. OFL licensed.
- **Newsreader** (voice): variable `ital · opsz 6–72 · wght 200–800`. Pull the
  variable woff2 (latin + latin-ext, roman + italic) from Google Fonts / GitHub.
  OFL licensed. `font-optical-sizing: auto` on both.
- Both cover latin-ext → Spanish is covered; Spanish body keeps `--leading-body-es: 1.7`.

## 3. What needs component work (cannot be expressed as tokens)

Scoped per `07` §3's own table — new layout primitives:

1. **Letterbox** — 60px bars (`--letterbox-bar`) on film movements, retracting
   over `--duration-houselights` at the release. One new layout primitive.
2. **Ghost numerals** — `--text-ghost` at `--opacity-ghost` behind the journey
   frames and hero. Presentational span, `aria-hidden`.
3. **The seam** — 3px→9px amber gradient strip on the left edge, scroll-driven
   (existing GSAP light rig can own it).
4. **The Walk** — pinned sequence №1: continuous floor hairline, the dot
   traversing 0→100% across three viewports, ghost numeral counting 1→6→12.
   Mobile + reduced-motion: three plain stacked frames (already comped).
5. **The Release** — pinned sequence №2: 1.5s stillness → 400ms flash → 1.8s
   dimmer-rise. The shout slot ships as the typeset blank until the owner
   supplies the word.
6. **No header component on the homepage** — vertical wordmark + one CTA live
   inside the hero (`--opacity-header-ground: 0`). Interior pages keep the
   existing header in the desk register.
7. **Delete Card usage on the homepage** — Programs becomes the playbill list
   (index label + hairline rows, flagship at `display-md` italic vs `heading-md`
   for the rest). Testimonials become anchor-quote + marginalia column.
8. **Grain** — one fixed overlay at `--opacity-grain` over film movements only
   (the SVG turbulence data-URI in `The Film.html` works as-is).

Nothing else in `src/components/ui` changes shape — Button/Input/Label restyle
entirely through tokens (radius collapses to 0, secondary becomes no-fill
underline, `--shadow-spotlight` leaves the CTA).

## 4. Gates answered by this direction

- **D-1 (palette sign-off):** superseded — new palette delivered with computed
  contrast (Visual Specification.md §B): 18.1 / 15.6 / 9.4 / 5.3 / 4.6:1; amber
  as text on light fails (1.9:1) and is banned as text.
- **D-2 (display face):** Archivo replaced by Bricolage Grotesque; rationale in
  Visual Specification.md §A. Inter removed.
- **B-4 ("every student"):** the words appear nowhere in any comp; guarantee is
  quoted only in its conditional form.
- **B-8 (prices):** only the $25 trial (credited to tuition) appears.
- **I-3 (video):** recommend commissioning 10–15s of showcase footage, faces
  never shown — highest-value asset the owner can produce. Not designed-for
  until it exists.
- **Dark/light decision (deliverable B-5):** both, as an information
  architecture — the film (dark) sells, the desk (light) transacts. Argued in
  Visual Specification.md §D.

## 5. Out of scope, honoured

No copy rewrites (all strings verbatim from `src/content/home.ts` /
`docs/source-content`), no sitemap changes, no motion-runtime re-architecture —
the seven timelines, Lenis, capability tiers and `sdm:reduced-motion` override
are consumed as-is.
