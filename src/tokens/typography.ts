/**
 * Typography tokens — approved direction "The Film" (7 Aug 2026).
 * Canonical spec: docs/approved-design/Visual Specification.md §A
 *
 * Two families. **Bricolage Grotesque** is structure — the building. It carries
 * real authorship where Archivo was institutional but anonymous, and its
 * optical-size axis is why it won gate D-2. **Newsreader** is voice — the
 * person inside the building.
 *
 * Archivo and Inter are removed.
 *
 * The scale is fluid, clamp()-based, computed across 375px → 1440px, and is
 * expressed as ROLES rather than sizes. Frequency is part of the spec: a role
 * used more often than its budget is a defect, not a preference.
 *
 * ⚠️ Mirrored into `src/styles/tokens.css` (@theme). Change both together.
 */

export const fontFamily = {
  /** Bricolage Grotesque — structure. opsz 12–96 · wdth 75–100 · wght 200–800. */
  display: 'var(--font-display)',
  /** Newsreader — voice. opsz 6–72 · wght 200–800 · roman + italic. */
  body: 'var(--font-body)',
} as const

/** Bricolage width-axis positions. The face is never stretched past 100. */
export const fontStretch = {
  condensed: '75%',
  normal: '100%',
} as const

/** Optical-size axis positions, per role. `font-optical-sizing: auto` elsewhere. */
export const opticalSize = {
  label: 12,
  text: 14,
  statement: 48,
  display: 96,
} as const

export const fontWeight = {
  ghost: 200,
  light: 300,
  regular: 400,
  semibold: 600,
  shout: 800,
} as const

/** Spanish body copy gets 1.7 — accented ascenders need the room. */
export const lineHeight = {
  shout: '0.95',
  ghost: '0.8',
  display: '1.15',
  heading: '1.3',
  body: '1.55',
  whisper: '1.6',
  bodyEs: '1.7',
  none: '1',
} as const

export const letterSpacing = {
  shout: '-0.02em',
  ghost: '-0.04em',
  display: '-0.01em',
  normal: '0',
  label: '0.2em',
  bill: '0.22em',
} as const

/**
 * The roles. `frequency` is enforceable spec, not documentation.
 *
 * The one-shout rule is the load-bearing constraint: the build previously used
 * display type in five places, and five shouts is no shouts.
 */
export const fontSize = {
  /** THE SHOUT — once on the entire site. Word withheld pending the owner. */
  'display-xl': {
    clamp: 'clamp(6rem, 4.1512rem + 7.8873vw, 11.25rem)',
    min: 96,
    max: 180,
    family: 'display',
    weight: fontWeight.shout,
    opsz: opticalSize.display,
    stretch: fontStretch.normal,
    tracking: letterSpacing.shout,
    leading: lineHeight.shout,
    frequency: 1,
    use: 'The Release, and nowhere else',
  },
  /** Statement — twice per page. */
  'display-lg': {
    clamp: 'clamp(1.625rem, 1.1849rem + 1.8779vw, 2.875rem)',
    min: 26,
    max: 46,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.statement,
    stretch: fontStretch.normal,
    tracking: letterSpacing.display,
    leading: '1.15',
    frequency: 2,
    use: 'Hero statement, the Reframe hinge',
  },
  'display-md': {
    clamp: 'clamp(1.5rem, 1.2359rem + 1.1268vw, 2.25rem)',
    min: 24,
    max: 36,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.statement,
    stretch: fontStretch.normal,
    tracking: letterSpacing.display,
    leading: '1.2',
    use: 'Desk section statements',
  },
  'heading-lg': {
    clamp: 'clamp(1.375rem, 1.2429rem + 0.5634vw, 1.75rem)',
    min: 22,
    max: 28,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.display,
    leading: lineHeight.heading,
    use: 'H2',
  },
  'heading-md': {
    clamp: 'clamp(1.1875rem, 1.1215rem + 0.2817vw, 1.375rem)',
    min: 19,
    max: 22,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.heading,
    use: 'H3, playbill non-flagship rows',
  },
  'heading-sm': {
    clamp: 'clamp(1.0625rem, 1.0185rem + 0.1878vw, 1.1875rem)',
    min: 17,
    max: 19,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: '1.35',
    use: 'H4',
  },
  /** Whisper — Newsreader italic 300. The child's interior line. ~12 per page. */
  whisper: {
    clamp: 'clamp(1rem, 0.912rem + 0.3756vw, 1.25rem)',
    min: 16,
    max: 20,
    family: 'body',
    weight: fontWeight.light,
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.whisper,
    italic: true,
    frequency: 12,
    use: 'Every in-frame line. A voice, never an emphasis.',
  },
  'body-lg': {
    clamp: 'clamp(1.0625rem, 1.0185rem + 0.1878vw, 1.1875rem)',
    min: 17,
    max: 19,
    family: 'body',
    weight: fontWeight.regular,
    opsz: opticalSize.text,
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
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.body,
    use: 'Programme text — never smaller, on any device',
  },
  /** Captions only. The 16px floor still applies to body copy. */
  'body-sm': {
    clamp: '0.9375rem',
    min: 15,
    max: 15,
    family: 'body',
    weight: fontWeight.regular,
    opsz: opticalSize.text,
    stretch: fontStretch.normal,
    tracking: letterSpacing.normal,
    leading: lineHeight.body,
    use: 'Captions, footnotes, the scholarship disclaimer',
  },
  label: {
    clamp: '0.75rem',
    min: 10,
    max: 12,
    family: 'display',
    weight: fontWeight.semibold,
    opsz: opticalSize.label,
    stretch: fontStretch.normal,
    tracking: letterSpacing.label,
    leading: '1.3',
    uppercase: true,
    use: 'Eyebrows, tags, the vertical wordmark — sparingly',
  },
  /**
   * Ghost numeral — architecture, not text.
   *
   * Sits 3–5% above its ground colour and is always `aria-hidden`. It is the
   * week number standing behind the frame, not a label on it.
   */
  ghost: {
    clamp: 'clamp(20.625rem, 11.162rem + 40.3756vw, 47.5rem)',
    min: 330,
    max: 760,
    family: 'display',
    weight: fontWeight.ghost,
    opsz: opticalSize.display,
    stretch: fontStretch.normal,
    tracking: letterSpacing.ghost,
    leading: lineHeight.ghost,
    presentational: true,
    use: 'Hero "90", journey 1 / 6 / 12',
  },
} as const

export type FontSizeToken = keyof typeof fontSize

/** Line length. Verified against the Spanish reframe line at +22%. */
export const measure = {
  prose: '68ch',
  /** In-frame copy is read at a glance and runs shorter. */
  tight: '45ch',
} as const

/**
 * Enforceable typographic rules, kept as data so a review or CI audit can
 * reference them rather than re-deriving them from prose.
 */
export const typographyRules = {
  minBodyPx: 16,
  maxH1PerPage: 1,
  /** The one-shout rule. */
  maxShoutPerSite: 1,
  headingLevelsMayNotSkip: true,
  sentenceCaseHeadings: true,
  uppercaseTokens: ['label'],
  /** Nothing is centred, ever. */
  centredTextPermitted: false,
  /** Spanish runs ~22% longer; headings are tested at +35%. */
  spanishExpansionFactor: 1.35,
} as const
