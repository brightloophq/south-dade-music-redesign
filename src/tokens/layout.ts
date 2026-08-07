/**
 * Spacing, radius, breakpoints, containers and grid tokens.
 * Canonical source: docs/redesign/04-design-system.md §3, §4, §6
 */

/** 4px base unit. 8px rhythm for layout, 4px for component internals. */
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  8: '48px',
  10: '64px',
  12: '96px',
  16: '128px',
  20: '160px',
  24: '192px',
} as const

export type SpacingToken = keyof typeof spacing

/**
 * Section rhythm (04 §3). Generous vertical space is what separates a premium
 * feel from a template — the current site's near-uniform padding is why every
 * section reads with the same importance.
 */
export const sectionPadding = {
  compact: { mobile: spacing[8], tablet: spacing[10], desktop: spacing[12] },
  comfortable: { mobile: spacing[10], tablet: spacing[12], desktop: spacing[16] },
  spacious: { mobile: spacing[12], tablet: spacing[16], desktop: spacing[20] },
  feature: { mobile: spacing[16], tablet: spacing[20], desktop: spacing[24] },
} as const

export type Density = keyof typeof sectionPadding

/**
 * Radius is ZERO — approved direction, Visual Specification.md §C.
 *
 *   > "Radius: 0 everywhere except the CTA pill (999px), full stop."
 *
 * Radius is the single strongest component-library tell there is. The scale is
 * kept as an API so existing components compile unchanged; every step now
 * resolves to 0. `full` survives for one reason only: the primary action is a
 * pill, and that exception is the whole reason the token still exists.
 */
export const radius = {
  none: '0px',
  sm: '0px',
  md: '0px',
  lg: '0px',
  xl: '0px',
  /** The CTA pill. The only rounded thing on the site. */
  full: '9999px',
} as const

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * The grid. Mirrors `--grid-margin` / `--grid-gutter` in tokens.css.
 *
 * The 150px margin at ≥1280px is **the film margin** — the line every
 * subtitle-hung line of type in movements 1–6 sits on, and the line the amber
 * seam travels along. It is not generic page padding; moving it breaks the
 * relationship between the light and the words.
 *
 * Mobile is 24px, not 20 — also part of the film margin decision.
 */
export const grid = {
  xs: { columns: 4, gutter: '16px', margin: '24px' },
  sm: { columns: 4, gutter: '16px', margin: '24px' },
  md: { columns: 8, gutter: '24px', margin: '32px' },
  lg: { columns: 12, gutter: '24px', margin: '48px' },
  /** The film margin. */
  xl: { columns: 12, gutter: '32px', margin: '150px' },
  '2xl': { columns: 12, gutter: '32px', margin: '150px' },
} as const

/**
 * Composition laws, kept as data so a review can assert them by name.
 * Visual Specification.md §C.
 */
export const compositionLaws = {
  /** No bordered, filled or elevated containers of any kind. */
  cardsPermitted: false,
  /** Depth is light, never a drop shadow. */
  shadowsPermitted: false,
  /** Lists are separated by 1px hairlines — a rule, not a card edge. */
  hairlineOnDark: '#242C3D',
  hairlineOnHouse: '#D8D2C4',
  /** Content sits in columns 2–8 through the film, opening to 2–11 at the desk. */
  filmColumns: [2, 8],
  deskColumns: [2, 11],
  /** Nothing is centred, ever. */
  centredPermitted: false,
  /** 60px bars, film movements only. */
  letterboxBar: '60px',
} as const

/** Content max-width 1440px. Prose 68ch. Full-bleed for photography only. */
export const container = {
  prose: '68ch',
  narrow: '768px',
  content: '1200px',
  wide: '1440px',
  full: '100%',
} as const

export type ContainerWidth = keyof typeof container

/** Minimum touch target, enforced across buttons, icon buttons and nav items. */
export const touchTarget = {
  min: '44px',
  separation: '8px',
} as const
