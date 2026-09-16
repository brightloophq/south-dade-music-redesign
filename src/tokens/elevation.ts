/**
 * Elevation, shadows, z-index and opacity tokens.
 * Canonical spec: docs/approved-design/Visual Specification.md §C
 *
 *   > "Shadows: none. Depth is the amber radial glow only, and only at the two
 *   > journey/release moments."
 *
 * Every drop shadow is `none`. Depth comes from the light source alone — a
 * shadow that does not agree with the light is a lie about the room.
 */

export const shadow = {
  none: 'none',
  1: 'none',
  2: 'none',
  3: 'none',
  4: 'none',
  darkModal: 'none',
  darkLightbox: 'none',
  /**
   * The ONE glow. Not a shadow and not a CTA ring — it is the spot radial that
   * appears at the mark and at the release, and nowhere else.
   */
  spotlight: '0 0 46px 12px rgba(76, 173, 103, 0.4)',
} as const

export type ShadowToken = keyof typeof shadow

/**
 * Elevation levels are retained as an API so existing components keep compiling,
 * but every level now resolves to a flat surface with no shadow. There are no
 * raised surfaces in this direction because there are no cards.
 */
export const elevation = {
  0: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-ground-wing)', shadow: shadow.none } },
  1: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-ground-wing)', shadow: shadow.none } },
  2: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-ground-wing)', shadow: shadow.none } },
  3: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-ground-wing)', shadow: shadow.none } },
  4: { light: { surface: 'var(--color-n-50)', shadow: shadow.none }, dark: { surface: 'var(--color-ground-wing)', shadow: shadow.none } },
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
