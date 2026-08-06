import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type ClusterGap = 'none' | '1' | '2' | '3' | '4' | '5' | '6'
export type ClusterAlign = 'start' | 'center' | 'end' | 'baseline'
export type ClusterJustify = 'start' | 'center' | 'end' | 'between'

export interface ClusterProps {
  children: ReactNode
  className?: string
  gap?: ClusterGap
  align?: ClusterAlign
  justify?: ClusterJustify
  as?: ElementType
  /** Prevent wrapping. Use sparingly — it risks overflow in Spanish. */
  nowrap?: boolean
}

const gapClass: Record<ClusterGap, string> = {
  none: 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-6',
  '6': 'gap-8',
}

const alignClass: Record<ClusterAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
}

const justifyClass: Record<ClusterJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
}

/**
 * Horizontal grouping that wraps — button rows, tag lists, meta lines.
 *
 * Wraps by default because every component must tolerate +35% text expansion in
 * Spanish without breaking (04-design-system.md §0 principle 5). `nowrap` opts
 * out and should be justified.
 */
export function Cluster({
  children,
  className,
  gap = '3',
  align = 'center',
  justify = 'start',
  as: Component = 'div',
  nowrap = false,
}: ClusterProps) {
  return (
    <Component
      className={cn('flex', nowrap ? 'flex-nowrap' : 'flex-wrap', gapClass[gap], alignClass[align], justifyClass[justify], className)}
    >
      {children}
    </Component>
  )
}
