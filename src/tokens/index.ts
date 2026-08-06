/**
 * Design tokens — the single typed source of truth.
 * Canonical spec: docs/redesign/04-design-system.md and 05-motion-system.md
 *
 * These values are mirrored by hand into `src/styles/tokens.css`, which is what
 * generates the Tailwind utilities. TypeScript consumers (GSAP timelines,
 * capability checks, tests) import from here.
 *
 * ⚠️ Known trade-off: two representations of the same values can drift.
 * See docs/implementation/phase-4-foundation-report.md "Token drift" for the
 * proposed codegen follow-up.
 */

export * from './colors'
export * from './typography'
export * from './layout'
export * from './elevation'
export * from './motion'

import { palette, semanticColors } from './colors'
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStretch, measure } from './typography'
import { spacing, radius, breakpoints, container, grid, sectionPadding, touchTarget } from './layout'
import { shadow, elevation, zIndex, opacity } from './elevation'
import { duration, easing, stagger, entrance } from './motion'

/** Convenience namespace for consumers that want everything under one import. */
export const tokens = {
  color: { ...palette, semantic: semanticColors },
  type: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStretch, measure },
  space: spacing,
  radius,
  breakpoints,
  container,
  grid,
  sectionPadding,
  touchTarget,
  shadow,
  elevation,
  zIndex,
  opacity,
  motion: { duration, easing, stagger, entrance },
} as const

export type Tokens = typeof tokens
