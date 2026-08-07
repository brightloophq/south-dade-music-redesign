import localFont from 'next/font/local'

/**
 * Typefaces — approved direction "The Film" (7 Aug 2026).
 * Canonical spec: docs/approved-design/Visual Specification.md §A
 *
 *   > "Bricolage Grotesque keeps the institutional register while carrying real
 *   > authorship … Newsreader stays exactly as briefed: it is the whisper, and
 *   > nothing whispers better."
 *
 * Archivo and Inter are **removed**. Inter was the native typeface of the exact
 * dialect the brief prohibits (docs/design-handoff/09-current-design-problems.md
 * §2); Archivo was replaced at gate D-2 for being institutional but anonymous.
 *
 * ## Why local rather than `next/font/google`
 *
 * `next/font/google` self-hosts at runtime but fetches from Google at **build**
 * time — a network dependency in CI, and one Storybook's Vite builder does not
 * reproduce, so fonts silently fell back to system sans in the component
 * laboratory. A typography lab rendering the wrong typeface is worse than none.
 *
 * The committed `.woff2` files are produced by `npm run build:fonts`. Both
 * families are SIL Open Font License 1.1.
 *   Bricolage Grotesque — https://github.com/ateliertriay/bricolage
 *   Newsreader          — https://github.com/productiontype/Newsreader
 */

/**
 * Bricolage Grotesque — STRUCTURE.
 *
 * Wordmark, labels, statements, ghost numerals and the single shout. Variable
 * on three axes: `opsz 12–96`, `wdth 75–100`, `wght 200–800`. The optical-size
 * axis is the reason this face won over Archivo — the display cut at heavy
 * weights is genuinely theatrical, and the text cut stays institutional.
 */
export const bricolage = localFont({
  src: [
    { path: './fonts/bricolage-variable-latin.woff2', style: 'normal' },
    { path: './fonts/bricolage-variable-latin-ext.woff2', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-bricolage',
  weight: '200 800',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  /** Metric-matched fallback keeps CLS at 0 while the font loads. */
  adjustFontFallback: 'Arial',
})

/**
 * Newsreader — VOICE.
 *
 * Every whispered in-frame line, the programme text, the testimonial quotes.
 * Variable on `opsz 6–72` and `wght 200–800`, roman and italic. The italic is
 * the child's interior line and is a voice, never an emphasis.
 *
 * `latin-ext` carries the Spanish diacritics (á é í ó ú ñ ü ¿ ¡) the bilingual
 * path needs at gate B-6; Spanish body copy keeps `--leading-body-es: 1.7`.
 */
export const newsreader = localFont({
  src: [
    { path: './fonts/newsreader-variable-latin.woff2', style: 'normal' },
    { path: './fonts/newsreader-variable-latin-ext.woff2', style: 'normal' },
    { path: './fonts/newsreader-italic-variable-latin.woff2', style: 'italic' },
    { path: './fonts/newsreader-italic-variable-latin-ext.woff2', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-newsreader',
  weight: '200 800',
  fallback: ['ui-serif', 'Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

/** Applied to <html> so both families are available as CSS custom properties. */
export const fontVariables = `${bricolage.variable} ${newsreader.variable}`
