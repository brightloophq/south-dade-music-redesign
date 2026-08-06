import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type StackGap = 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch'

export interface StackProps {
  children: ReactNode
  className?: string
  /** Spacing token (04-design-system.md §3). `4` = 16px. */
  gap?: StackGap
  align?: StackAlign
  as?: ElementType
}

const gapClass: Record<StackGap, string> = {
  none: 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-6',
  '6': 'gap-8',
  '8': 'gap-12',
  '10': 'gap-16',
  '12': 'gap-24',
}

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

/**
 * Vertical rhythm primitive — one axis, one spacing decision.
 *
 * A component declares its density; it does not invent spacing
 * (04-design-system.md §3).
 *
 * Note the gap scale maps design-system tokens to Tailwind's 4px base:
 * token `5` (24px) → `gap-6`, token `6` (32px) → `gap-8`, and so on.
 */
export function Stack({ children, className, gap = '4', align = 'stretch', as: Component = 'div' }: StackProps) {
  return <Component className={cn('flex flex-col', gapClass[gap], alignClass[align], className)}>{children}</Component>
}
