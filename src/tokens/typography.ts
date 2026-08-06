/**
 * Typography tokens — canonical source: docs/redesign/04-design-system.md §2
 *
 * Two families only: Archivo (display, variable weight + width) and Inter
 * (body/UI, variable). Self-hosted via next/font — no third-party font CDN.
 *
 * The scale is fluid, clamp()-based, computed across a 375px → 1440px viewport.
 */

export const fontFamily = {
  /** Archivo — grotesk with an expanded axis that reads like a concert bill. */
  display: 'var(--font-display)',
  /** Inter — screen-optimised, full Spanish diacritic coverage, tabular numerals. */
  body: 'var(--font-body)',
} as const

/**
 * Archivo width-axis positions. The brand's typographic signature:
 * expanded for poster statements, condensed for dated ledger lines.
 * See docs/redesign/final-art-direction.md §7.
 */
export const fontStretch = {
  condensed: '87.5%',
  normal: '100%',
  wide: '106%',
  expanded: '112%',
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

/**
 * Line heights. Spanish body copy gets 1.7 — accented ascenders need room.
 * (04-design-system.md §2)
 */
export const lineHeight = {
  display: '1.15',
  heading: '1.3',
  body: '1.6',
  bodyEs: '1.7',
  none: '1',
} as const

export const letterSpacing = {
  displayXl: '-0.03em',
  displayLg: '-0.025em',
  displayMd: '-0.02em',
  headingLg: '-0.015em',
  headingMd: '-0.01em',
  stat: '-0.04em',
  normal: '0',
  label: '0.08em',
  bill: '0.12em',
} as const

/**
 * Fluid type scale. Each entry is a clamp() computed for 375 → 1440px.
 * `min`/`max` are the design-system endpoints in px, kept for reference and
 * for automated verification that the clamp matches the spec.
 */
export const fontSize = {
  'display-xl': {
    clamp: 'clamp(2.5rem, 1.4437rem + 4.507vw, 5.5rem)',
    min: 40,
    max: 88,
    family: 'display',
    weight: fontWeight.bold,
    stretch: fontStretch.expanded,
    tracking: letterSpacing.displayXl,
    leading: lineHeight.display,
    use: 'Homepage hero only',
  },
  'display-lg': {
    clamp: 'clamp(2.125rem, 1.4648rem + 2.8169vw, 4rem)',
    min: 34,
    max: 64,
    family: 'display',
    weight: fontWeight.bold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.displayLg,
    leading: lineHeight.display,
    use: 'Page heroes',
  },
  'display-md': {
    clamp: 'clamp(1.875rem, 1.4789rem + 1.6901vw, 3rem)',
    min: 30,
    max: 48,
    family: 'display',
    weight: fontWeight.semibold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.displayMd,
    leading: lineHeight.display,
    use: 'Major section heads',
  },
  'heading-lg': {
    clamp: 'clamp(1.625rem, 1.4049rem + 0.939vw, 2.25rem)',
    min: 26,
    max: 36,
    family: 'display',
    weight: fontWeight.semibold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.headingLg,
    leading: lineHeight.heading,
    use: 'H2',
  },
  'heading-md': {
    clamp: 'clamp(1.375rem, 1.243rem + 0.5634vw, 1.75rem)',
    min: 22,
    max: 28,
    family: 'display',
    weight: fontWeight.semibold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.headingMd,
    leading: lineHeight.heading,
    use: 'H3, card titles',
  },
  'heading-sm': {
    clamp: 'clamp(1.1875rem, 1.1215rem + 0.2817vw, 1.375rem)',
    min: 19,
    max: 22,
    family: 'body',
    weight: fontWeight.semibold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.heading,
    use: 'H4, labels',
  },
  'body-lg': {
    clamp: 'clamp(1.125rem, 1.081rem + 0.1878vw, 1.25rem)',
    min: 18,
    max: 20,
    family: 'body',
    weight: fontWeight.regular,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.body,
    use: 'Lead paragraphs',
  },
  'body-md': {
    clamp: 'clamp(1rem, 0.978rem + 0.0939vw, 1.0625rem)',
    min: 16,
    max: 17,
    family: 'body',
    weight: fontWeight.regular,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.body,
    use: 'Default body — never smaller, on any device',
  },
  'body-sm': {
    clamp: 'clamp(0.875rem, 0.853rem + 0.0939vw, 0.9375rem)',
    min: 14,
    max: 15,
    family: 'body',
    weight: fontWeight.regular,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.body,
    use: 'Captions, meta',
  },
  label: {
    clamp: '0.8125rem',
    min: 13,
    max: 13,
    family: 'body',
    weight: fontWeight.semibold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.label,
    leading: lineHeight.heading,
    use: 'Eyebrows, tags — the only uppercase token',
  },
  stat: {
    clamp: 'clamp(3rem, 1.9437rem + 4.507vw, 6rem)',
    min: 48,
    max: 96,
    family: 'display',
    weight: fontWeight.bold,
    stretch: fontStretch.normal,
    tracking: letterSpacing.stat,
    leading: lineHeight.none,
    use: 'Counters: 90, 12, $450 — tabular numerals',
  },
} as const

export type FontSizeToken = keyof typeof fontSize

/** Line length. `max-width: 68ch` on prose (04-design-system.md §2). */
export const measure = {
  prose: '68ch',
  /** In-frame / hero copy is read at a glance and runs shorter. */
  tight: '45ch',
} as const

/**
 * Typographic rules that are enforceable, kept as data so a future lint rule or
 * CI audit can reference them rather than re-deriving them from prose.
 */
export const typographyRules = {
  minBodyPx: 16,
  maxH1PerPage: 1,
  headingLevelsMayNotSkip: true,
  sentenceCaseHeadings: true,
  uppercaseTokens: ['label'],
  /** All heading components must be tested at +35% character count. */
  spanishExpansionFactor: 1.35,
} as const
