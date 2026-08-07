/**
 * Colour tokens — approved direction "The Film" (7 Aug 2026).
 * Canonical spec: docs/approved-design/Visual Specification.md §B
 *
 * Colour is a **temperature arc, not a palette.** Grounds are rooms, not a
 * lightness ramp: the walk is blue-black and cold, memory is brown-black and
 * warm, the house is ivory. Nobody names these; everybody feels that the past
 * is a different temperature from the stage.
 *
 * ⚠️ Mirrored into `src/styles/tokens.css` (@theme), which generates the
 * Tailwind utilities. Change both together.
 */

/**
 * The grounds. One per movement.
 *
 * These are namespaced `ground` deliberately: the legacy `stage` ramp below
 * still exists for UI depth on dark, and a bare `stage` would silently mean two
 * different things.
 */
export const ground = {
  pitch: '#05070B',
  wing: '#0E121B',
  memory: '#17120C',
  stage: '#0D1220',
  flash: '#FFF3DC',
  house: '#F7F4EE',
} as const

/** Retained for UI depth on dark — borders, sunken surfaces. Not grounds. */
export const stage = {
  950: '#05070B',
  900: '#0D1220',
  800: '#0E121B',
  700: '#242C3D',
  600: '#3A4256',
} as const

/**
 * Spotlight is ONE light, not a ramp.
 *
 * `500` is the light itself. `700` is the amber-derived dark used where amber
 * must speak as text on a light ground — amber at full strength is 1.9:1 on
 * house and is banned as text.
 */
export const spot = {
  500: '#E9A23B',
  700: '#8A5A1B',
} as const

/**
 * ⚠️ RETIRED. A second accent breaks the amber budget.
 *
 * Kept only so stale references fail soft into the text colour rather than
 * throwing. Remove in cleanup once no component references them.
 */
export const velvet = {
  500: '#17120C',
  600: '#17120C',
  700: '#17120C',
} as const

/** Warm neutrals, re-anchored to the ivory house ground. */
export const neutral = {
  0: '#FFFFFF',
  50: '#F7F4EE',
  100: '#EFEBE1',
  200: '#D8D2C4',
  300: '#BFB9AA',
  400: '#A39A86',
  /** ⚠️ Corrected from #7A7364 (4.285:1 — fails AA). See tokens.css. */
  500: '#746E61',
  600: '#58524A',
  700: '#403D37',
  800: '#2A2823',
  900: '#17120C',
} as const

/** Secondary voice on dark grounds. */
export const ash = '#8A8578'

export const functional = {
  success: '#1F7A4C',
  warn: '#9A5B00',
  error: '#B3261E',
  info: '#1F5C8B',
} as const

export const palette = { ground, stage, spot, velvet, neutral, ash, functional } as const

/**
 * The amber ration — four uses on the entire homepage, fixed.
 *
 * Amber is light, never decoration: not a border, not a hover, not a link
 * colour. Exported as data so a review can assert against it by name.
 */
export const amberUses = [
  'seam-of-light',
  'the-source',
  'release-flash',
  'primary-cta-fill',
] as const

/**
 * Semantic aliases. Components reference these, never raw palette values.
 * Defaults are the LIGHT register — "The Desk". `[data-register='house']`
 * re-points them to the film grounds.
 */
export const semanticColors = {
  surfacePage: 'var(--color-surface-page)',
  surfaceRaised: 'var(--color-surface-raised)',
  surfaceSunken: 'var(--color-surface-sunken)',
  borderDefault: 'var(--color-border-default)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  actionPrimaryBg: 'var(--color-action-primary-bg)',
  actionPrimaryFg: 'var(--color-action-primary-fg)',
  actionSecondaryBg: 'var(--color-action-secondary-bg)',
  actionSecondaryFg: 'var(--color-action-secondary-fg)',
  linkDefault: 'var(--color-link-default)',
  focusRing: 'var(--color-focus-ring)',
} as const

/**
 * Contrast pairs, computed in Visual Specification.md §B and re-asserted here
 * so a checker can verify them rather than trusting a table in a document.
 */
export const contrastContract = [
  { fg: ground.house, bg: ground.pitch, min: 7, note: 'body on dark — 18.1:1' },
  { fg: neutral[900], bg: ground.house, min: 7, note: 'body on house — 15.6:1' },
  { fg: ground.stage, bg: spot[500], min: 7, note: 'CTA text on amber — 9.4:1' },
  { fg: ash, bg: ground.pitch, min: 4.5, note: 'ash on dark — 5.3:1' },
  { fg: neutral[500], bg: ground.house, min: 4.5, note: 'muted on house — 4.6:1' },
] as const

/**
 * ⚠️ HARD RULE (Visual Specification.md §B): amber on house is **1.9:1** —
 * confirmed failing, never set as text. Amber is a fill or a light, never type.
 */
export const bannedCombinations = [
  { fg: spot[500], bg: ground.house, reason: '1.9:1 — never as text' },
  { fg: spot[500], bg: neutral[0], reason: 'fails all text contrast' },
  { fg: spot[500], bg: ground.flash, reason: 'fails all text contrast' },
] as const
