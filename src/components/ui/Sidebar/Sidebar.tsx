import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export interface SidebarProps {
  /** The sticky rail — summary card, price, dates, CTA, or an in-page ToC. */
  side: ReactNode
  /** The scrolling detail column. */
  children: ReactNode
  className?: string
  /** Which edge the rail sits on at `lg`+. */
  sidePosition?: 'start' | 'end'
  /** Rail width at `lg`+. */
  sideWidth?: 'narrow' | 'base' | 'wide'
  /** Stick the rail while the detail column scrolls. */
  sticky?: boolean
  /** Offset from the top when sticky, so it clears the header. */
  stickyOffset?: string
}

const sideWidthClass = {
  narrow: 'lg:w-64',
  base: 'lg:w-80',
  wide: 'lg:w-96',
} as const

/**
 * Sticky-rail layout — archetype 6 (docs/redesign/04-design-system.md §4).
 *
 * A sticky summary card beside scrolling detail. Used by the camp and programme
 * pages, and by long-form pages for an in-page table of contents.
 *
 * **This is the pattern that fixes the "no CTA at the bottom" failure** Phase 2
 * found, where twenty text-only prompts sat at the point of highest intent.
 *
 * Stacks to a single column below `lg`; the rail moves above the content so a
 * mobile user meets the summary first.
 */
export function Sidebar({
  side,
  children,
  className,
  sidePosition = 'end',
  sideWidth = 'base',
  sticky = true,
  stickyOffset = 'calc(var(--header-height, 80px) + 1.5rem)',
}: SidebarProps) {
  const rail = (
    <aside
      className={cn('w-full shrink-0', sideWidthClass[sideWidth], sticky && 'lg:sticky lg:self-start')}
      style={sticky ? { top: stickyOffset } : undefined}
    >
      {side}
    </aside>
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:gap-12',
        sidePosition === 'start' ? 'lg:flex-row' : 'lg:flex-row-reverse',
        className,
      )}
    >
      {rail}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
