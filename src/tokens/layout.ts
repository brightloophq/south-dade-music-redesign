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
 * Moderate, consistent radii. Heavy rounding reads as a children's product and
 * breaks the teen constraint; zero radius reads corporate.
 */
export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
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

export const grid = {
  xs: { columns: 4, gutter: '16px', margin: '20px' },
  sm: { columns: 4, gutter: '16px', margin: '24px' },
  md: { columns: 8, gutter: '24px', margin: '32px' },
  lg: { columns: 12, gutter: '24px', margin: '48px' },
  xl: { columns: 12, gutter: '32px', margin: '64px' },
  '2xl': { columns: 12, gutter: '32px', margin: 'auto' },
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
