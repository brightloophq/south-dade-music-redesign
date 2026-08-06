/**
 * Elevation, shadows, z-index and opacity tokens.
 * Canonical source: docs/redesign/04-design-system.md §5
 *
 * Dark-first surfaces mean shadows work differently. Elevation is expressed
 * through surface value first, shadow second. Shadows are always warm-tinted
 * (derived from n-900), never pure black on light.
 */

export const shadow = {
  none: 'none',
  1: '0 1px 2px rgba(23, 22, 19, 0.06)',
  2: '0 4px 12px rgba(23, 22, 19, 0.08)',
  3: '0 12px 32px rgba(23, 22, 19, 0.12)',
  4: '0 24px 64px rgba(23, 22, 19, 0.16)',
  /** Dark-theme modal shadows are cool and deep; surfaces carry elevation otherwise. */
  darkModal: '0 12px 32px rgba(0, 0, 0, 0.4)',
  darkLightbox: '0 24px 64px rgba(0, 0, 0, 0.55)',
  /**
   * The visual signature of the brand. Reserved for the primary CTA and the
   * active showcase image. Loses meaning if applied broadly.
   */
  spotlight: '0 0 0 1px #D4870E, 0 8px 24px rgba(245, 165, 36, 0.24)',
} as const

export type ShadowToken = keyof typeof shadow

/**
 * Elevation levels pair a surface value with a shadow, per theme.
 * Rule: never more than two elevation levels visible in one viewport region.
 */
export const elevation = {
  0: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-stage-900)', shadow: shadow.none } },
  1: { light: { surface: 'var(--color-n-0)', shadow: shadow[1] }, dark: { surface: 'var(--color-stage-800)', shadow: shadow.none } },
  2: { light: { surface: 'var(--color-n-0)', shadow: shadow[2] }, dark: { surface: 'var(--color-stage-800)', shadow: shadow.none } },
  3: { light: { surface: 'var(--color-n-0)', shadow: shadow[3] }, dark: { surface: 'var(--color-stage-800)', shadow: shadow.darkModal } },
  4: { light: { surface: 'var(--color-n-0)', shadow: shadow[4] }, dark: { surface: 'var(--color-stage-800)', shadow: shadow.darkLightbox } },
} as const

export type ElevationLevel = keyof typeof elevation

/**
 * Z-index scale. Tailwind v4 has no `--z-*` theme namespace, so these are
 * plain custom properties consumed as `z-(--z-header)`.
 *
 * The skip link sits above everything: it is the first tab stop and must never
 * be occluded by a sticky header or drawer.
 */
export const zIndex = {
  below: -1,
  base: 0,
  raised: 10,
  sticky: 100,
  header: 200,
  drawer: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  skipLink: 900,
} as const

export type ZIndexToken = keyof typeof zIndex

/** Semantic opacity. Named by intent so usage stays consistent. */
export const opacity = {
  0: '0',
  disabled: '0.4',
  muted: '0.6',
  hairlineOnDark: '0.2',
  border: '0.4',
  /** Page-transition veil (05-motion-system.md §12). */
  veil: '0.85',
  /** Lightbox backdrop — stage-950 at 92% (05-motion-system.md §8). */
  scrim: '0.92',
  /** Condensed header ground on scroll. */
  headerGround: '0.96',
  full: '1',
} as const
