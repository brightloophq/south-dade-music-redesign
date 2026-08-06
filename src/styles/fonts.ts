import localFont from 'next/font/local'

/**
 * Typefaces.
 * Canonical spec: docs/redesign/04-design-system.md §2
 *
 *   > "Two families only. Self-hosted WOFF2, subset to Latin + Latin-1
 *   > Supplement. No third-party font CDN."
 *
 * The files in `./fonts/` are the OFL-licensed variable fonts, committed to the
 * repository and loaded with `next/font/local`.
 *
 * ## Why local rather than `next/font/google`
 *
 * `next/font/google` also self-hosts at runtime, but it fetches from Google at
 * **build** time — a network dependency in CI, and one that Storybook's Vite
 * builder does not reproduce, so the fonts silently fell back to system sans in
 * the component laboratory. A typography lab rendering the wrong typeface is
 * worse than no lab.
 *
 * Committing the files fixes both: identical rendering in the app and in
 * Storybook, and no external request at build time or at runtime.
 *
 * Licence: both families are SIL Open Font License 1.1.
 *   Archivo — https://github.com/Omnibus-Type/Archivo
 *   Inter   — https://github.com/rsms/inter
 */

/**
 * Archivo — display.
 *
 * A grotesk with an expanded axis that reads like a concert bill: confident,
 * poster-like, not childish. The variable file carries both `wght` (100–900)
 * and `wdth` (62–125); the width axis is the brand's typographic signature —
 * expanded for poster statements, condensed for dated ledger lines
 * (docs/redesign/final-art-direction.md §7).
 */
export const archivo = localFont({
  src: [
    { path: './fonts/archivo-variable-latin.woff2', style: 'normal' },
    { path: './fonts/archivo-variable-latin-ext.woff2', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-archivo',
  weight: '100 900',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  /** Metric-matched fallback keeps CLS at 0 while the font loads. */
  adjustFontFallback: 'Arial',
})

/**
 * Inter — body and UI.
 *
 * Screen-optimised, with the Spanish diacritic coverage the bilingual path
 * needs (á é í ó ú ñ ü ¿ ¡ — hence the `latin-ext` subset, required before the
 * Spanish tree can ship at gate B-6) and tabular numerals for prices, dates,
 * week counters and capacity, which must not shift width while animating.
 */
export const inter = localFont({
  src: [
    { path: './fonts/inter-variable-latin.woff2', style: 'normal' },
    { path: './fonts/inter-variable-latin-ext.woff2', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  weight: '100 900',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/** Applied to <html> so both families are available as CSS custom properties. */
export const fontVariables = `${archivo.variable} ${inter.variable}`
