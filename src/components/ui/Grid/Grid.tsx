import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12
export type GridGap = 'none' | 'tight' | 'base' | 'loose'

export interface GridProps {
  children: ReactNode
  className?: string
  /** Columns at `xs`. */
  cols?: GridColumns
  /** Columns from `md` (768px). */
  colsMd?: GridColumns
  /** Columns from `lg` (1024px). */
  colsLg?: GridColumns
  gap?: GridGap
  as?: ElementType
  /** Equal-height rows — card facts pin to the bottom (04 §8). */
  equalHeight?: boolean
}

/**
 * Responsive grid.
 * Canonical spec: docs/redesign/04-design-system.md §4
 *
 * The design system's column counts are 4 / 8 / 12 at xs / md / lg. Component
 * grids are expressed in the layout archetypes instead — card grids are
 * 1 / 2 / 3 at xs / md / lg (archetype 3), which is what `cols` defaults to.
 *
 * Gutters follow `--grid-gutter`: 16 / 24 / 32px across breakpoints.
 */

// Tailwind cannot see dynamically-built class names, so the maps are explicit.
const colsClass: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const colsMdClass: Record<GridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
}

const colsLgClass: Record<GridColumns, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
}

const gapClass: Record<GridGap, string> = {
  none: 'gap-0',
  tight: 'gap-4',
  base: 'gap-(--grid-gutter)',
  loose: 'gap-8 lg:gap-12',
}

export function Grid({
  children,
  className,
  cols = 1,
  colsMd,
  colsLg,
  gap = 'base',
  as: Component = 'div',
  equalHeight = false,
}: GridProps) {
  return (
    <Component
      className={cn(
        'grid',
        colsClass[cols],
        colsMd && colsMdClass[colsMd],
        colsLg && colsLgClass[colsLg],
        gapClass[gap],
        equalHeight && 'items-stretch',
        className,
      )}
    >
      {children}
    </Component>
  )
}
