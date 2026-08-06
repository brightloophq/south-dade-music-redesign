/**
 * Colour tokens — canonical source: docs/redesign/04-design-system.md §1
 *
 * Three families: Stage (the darkened house), Spotlight (the light),
 * Velvet (the curtain), plus a warm neutral ramp and a functional set.
 *
 * ⚠️ These values are mirrored into `src/styles/tokens.css` (@theme), which is
 * what generates the Tailwind utilities. Change both together — see
 * docs/implementation/phase-4-foundation-report.md "Token drift".
 */

/** The darkened house. A blue-black, never a true black. */
export const stage = {
  950: '#070A12',
  900: '#0D1220',
  800: '#161E32',
  700: '#232E4A',
  600: '#35436A',
} as const

/** The light. Primary accent. */
export const spot = {
  300: '#FFD68A',
  400: '#FFC15C',
  500: '#F5A524',
  600: '#D4870E',
  700: '#A66908',
} as const

/** The curtain. Secondary accent. */
export const velvet = {
  500: '#B12A4B',
  600: '#8B1E3F',
  700: '#6E1631',
} as const

/**
 * Warm-tinted neutrals. Cool greys fight the amber and make photography look clinical.
 *
 * ⚠️ Two values differ from docs/redesign/04-design-system.md §1, deliberately.
 * The documented ratios did not hold when computed:
 *   n-500  #7C776D → 4.23:1 on n-50 (doc claims 4.6:1 AA)  → corrected to #777269 (4.54:1)
 *   n-600  #5A564E → 6.94:1 on n-50 (doc claims 7.3:1 AAA) → corrected to #59554D (7.05:1)
 * Both are imperceptible shifts that make the design system's own accessibility
 * promises true. **Requires sign-off at gate D-1 before the tokens are frozen.**
 */
export const neutral = {
  0: '#FFFFFF',
  50: '#FAF9F7',
  100: '#F2F0EC',
  200: '#E5E2DC',
  300: '#D2CEC6',
  400: '#A9A49A',
  500: '#777269',
  600: '#59554D',
  700: '#403D37',
  800: '#2A2823',
  900: '#171613',
} as const

/** All four pass 4.5:1 on `n-50` and on white. */
export const functional = {
  success: '#1F7A4C',
  warn: '#9A5B00',
  error: '#B3261E',
  info: '#1F5C8B',
} as const

export const palette = { stage, spot, velvet, neutral, functional } as const

/**
 * Semantic aliases. Components reference these, never raw palette values.
 * Each maps to a CSS custom property declared in `src/styles/tokens.css`.
 */
export const semanticColors = {
  surfacePage: 'var(--color-surface-page)',
  surfacePageDark: 'var(--color-surface-page-dark)',
  surfaceRaised: 'var(--color-surface-raised)',
  surfaceRaisedDark: 'var(--color-surface-raised-dark)',
  surfaceSunken: 'var(--color-surface-sunken)',
  borderDefault: 'var(--color-border-default)',
  borderDark: 'var(--color-border-dark)',
  textPrimary: 'var(--color-text-primary)',
  textPrimaryDark: 'var(--color-text-primary-dark)',
  textSecondary: 'var(--color-text-secondary)',
  textSecondaryDark: 'var(--color-text-secondary-dark)',
  textMuted: 'var(--color-text-muted)',
  textAccentDark: 'var(--color-text-accent-dark)',
  actionPrimaryBg: 'var(--color-action-primary-bg)',
  actionPrimaryFg: 'var(--color-action-primary-fg)',
  actionSecondaryBg: 'var(--color-action-secondary-bg)',
  actionSecondaryFg: 'var(--color-action-secondary-fg)',
  linkDefault: 'var(--color-link-default)',
  linkDark: 'var(--color-link-dark)',
  focusRing: 'var(--color-focus-ring)',
} as const

/**
 * Contrast pairs verified against docs/redesign/04-design-system.md §1.
 * Exported so an automated checker can assert them in CI rather than trusting
 * the table in the docs.
 */
export const contrastContract = [
  { fg: neutral[900], bg: neutral[50], min: 7, note: 'body on light' },
  { fg: neutral[600], bg: neutral[50], min: 7, note: 'secondary on light' },
  { fg: neutral[500], bg: neutral[50], min: 4.5, note: 'muted on light' },
  { fg: neutral[0], bg: stage[900], min: 7, note: 'body on dark' },
  { fg: spot[400], bg: stage[900], min: 7, note: 'accent text on dark' },
  { fg: stage[950], bg: spot[500], min: 7, note: 'primary CTA' },
  { fg: neutral[0], bg: velvet[600], min: 7, note: 'secondary CTA' },
  { fg: velvet[700], bg: neutral[0], min: 7, note: 'links on light' },
] as const

/**
 * ⚠️ HARD RULE (04-design-system.md §1): `spot-500` on white is ~2.0:1.
 * Spotlight is never body text on light backgrounds — fill, highlight, or text
 * on dark only. Listed here so a lint rule can reference it by name.
 */
export const bannedCombinations = [
  { fg: spot[500], bg: neutral[0], reason: '~2.0:1 — fails all text contrast' },
  { fg: spot[500], bg: neutral[50], reason: '~2.0:1 — fails all text contrast' },
  { fg: spot[400], bg: neutral[0], reason: 'fails all text contrast' },
] as const
