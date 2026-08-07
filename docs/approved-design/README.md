# Approved Design Package — South Dade Music Homepage
**"The Film" · Direction approved 7 Aug 2026 · Typography frozen**

Place this folder in the engineering repository as `docs/approved-design/`.
Nothing in here is a proposal; the direction is approved. Do not redesign.

## Contents

| File | What it is |
|---|---|
| **`The Film.html`** | **The visual source of truth.** Annotated comps of all 12 desktop shots (with transition frames), the 6-beat mobile re-cut, and the typography / colour / image-direction specimens. Every shot carries camera, lens, light, sound and emotional objective. Open in a browser; it is self-contained (loads Bricolage from `fonts/`, Newsreader from Google Fonts for preview only). Where any other document disagrees with this file, this file wins. |
| `Visual Specification.md` | The rules and their reasons: type roles, computed contrast table, composition laws, art direction per movement, imagery treatment, identity, interface elements, motion grammar (§I), and the open owner items. Enforce reviews against this. |
| `HANDOFF.md` | The mapping onto this repository: what ships as a token edit vs. the 8 items needing component work, gates answered (D-1, D-2, B-4, B-8, I-3), scope honoured. |
| `tokens.css` | Drop-in replacement for `src/styles/tokens.css` — same Tailwind v4 `@theme` structure and token names. Update the `src/tokens/*.ts` mirrors in the same commit. |
| `fonts/` | Font binaries — see caveat below. |

## Fonts — one manual step remains

- `fonts/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf` — the approved
  structure face, full variable axes (opsz 12–96, wdth 75–100, wght 200–800).
  **Supplied as .ttf**: convert to woff2 (latin + latin-ext) before wiring into
  `next/font/local` — e.g. `npx fonttools` / `woff2_compress`, or
  `npx glyphhanger` subsetting. This packaging environment cannot produce
  binary font conversions, so the woff2 files named in the delivery structure
  are not included.
- **Newsreader (roman + italic) is not included** — no file was uploaded. Pull
  the variable woff2s (latin + latin-ext, `ital·opsz 6–72·wght 200–800`) from
  Google Fonts or github.com/productiontype/Newsreader (OFL). Until then the
  comps load it from the Google Fonts CDN; the production build must self-host
  per the no-font-CDN rule.

## Implementation order

1. **Fonts** — convert/obtain the two woff2 families; wire via `next/font/local`
   as `--font-bricolage` and `--font-newsreader`; set `font-optical-sizing: auto`.
2. **Tokens** — replace `src/styles/tokens.css` with `tokens.css`; update
   `src/tokens/*.ts` mirrors. This alone restyles every existing component
   (radius→0, shadows→none, new palette, new scale).
3. **Desk movements** (shots 08–12) — Programs playbill, testimonials
   anchor+marginalia, scholarship notice, CTA, colophon footer. Static, light,
   no motion. Ship first; they carry the transaction.
4. **Film movements** (shots 01–03) — letterbox primitive, grain overlay, seam,
   ghost numerals, no-header hero. Reveals by light only.
5. **The Walk** (shots 04–06) — pinned sequence №1 on the existing GSAP rig.
   Mobile and reduced-motion use the static three-frame cut — build that first;
   the pin is an enhancement of it.
6. **The Release** (shot 07) — pinned sequence №2: 1.5s stillness → 400ms flash
   → 1.8s house-lights rise. The shout slot ships as the typeset blank.
7. **Verify** — `npm run probe:motion`, the contrast table, the failure tests at
   the end of the design brief (no second shout, no card, no amber-as-accent,
   grain intact, dark not shortened).

## Assumptions

- The token layer is the swap point as documented in
  `docs/design-handoff/07-technical-foundation.md` §3; token names are stable.
- `[data-register='house']` remains the dark-register hook (values re-pointed,
  attribute unchanged) — zero component churn from the rename of meaning.
- The motion runtime (GSAP + Lenis, capability tiers, `sdm:reduced-motion`)
  is consumed as-is; only its art direction changes.
- All copy is verbatim from `src/content/` / `docs/source-content` — nothing
  here rewrites content.
- Comps are designed at 1440 (desktop) and 390 (mobile); behaviour at 768/1024
  interpolates per Visual Specification.md §C.

## Owner-blocked decisions — do not resolve in code

1. **The shout word** — `display-xl` has exactly one use and its word is
   unwritten. Ship the typeset blank (shot 07) until the owner decides.
2. **The eight generated atmospheric assets** — verdicts in `The Film.html`
   (image-direction specimen); all remain unapproved pending human review.
3. **Business name / unit number / "every student" wording** (gates B-5, I-8,
   B-4) — the design quotes only the conditional guarantee; the words
   "every student" appear nowhere and must not be introduced.
4. **Tuition** — no price other than the $25 trial (credited to tuition) and
   the published camp prices may appear.
5. **Video** — recommended commission (10–15s, no faces); not designed-for
   until it exists.
