import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type SplitRatio = '7/5' | '5/7' | '8/4' | '4/8' | '6/6'

export interface SplitProps {
  start: ReactNode
  end: ReactNode
  className?: string
  /**
   * Asymmetric by default. **Never 50/50** — symmetry reads static
   * (04-design-system.md §4 archetype 2). `6/6` exists for the rare case where
   * two genuinely equal items are compared, and should be justified.
   */
  ratio?: SplitRatio
  /** Reverse the visual order at `lg`+ without changing DOM order. */
  reverse?: boolean
  align?: 'start' | 'center' | 'end'
  gap?: 'base' | 'loose'
}

const ratioClass: Record<SplitRatio, [string, string]> = {
  '7/5': ['lg:col-span-7', 'lg:col-span-5'],
  '5/7': ['lg:col-span-5', 'lg:col-span-7'],
  '8/4': ['lg:col-span-8', 'lg:col-span-4'],
  '4/8': ['lg:col-span-4', 'lg:col-span-8'],
  '6/6': ['lg:col-span-6', 'lg:col-span-6'],
}

const alignClass = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
} as const

/**
 * Split layout — archetype 2 (docs/redesign/04-design-system.md §4).
 * 7/5 asymmetric at `lg`+. Copy on one side, photography on the other.
 *
 * Stacks to a single column below `lg`. DOM order is always `start` then `end`,
 * so reading and tab order stay correct regardless of `reverse`.
 */
export function Split({ start, end, className, ratio = '7/5', reverse = false, align = 'center', gap = 'base' }: SplitProps) {
  const [startClass, endClass] = ratioClass[ratio]

  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-12',
        gap === 'loose' ? 'gap-10 lg:gap-16' : 'gap-8 lg:gap-(--grid-gutter)',
        alignClass[align],
        className,
      )}
    >
      <div className={cn('min-w-0', startClass, reverse && 'lg:order-2')}>{start}</div>
      <div className={cn('min-w-0', endClass, reverse && 'lg:order-1')}>{end}</div>
    </div>
  )
}
