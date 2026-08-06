import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type DividerSpacing = 'none' | 'tight' | 'base' | 'loose'

export interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  spacing?: DividerSpacing
  /**
   * Optional label rendered inside the rule — the "bill line" treatment.
   * When present the divider becomes decorative and the label carries meaning.
   */
  children?: ReactNode
}

const spacingClass: Record<DividerSpacing, string> = {
  none: 'my-0',
  tight: 'my-4',
  base: 'my-8',
  loose: 'my-12',
}

/**
 * Hairline rule.
 *
 * "The bill is ruled" — rules are a primary structural device in the House
 * register (docs/redesign/concepts/concept-a-performing-arts.md §12). The
 * border colour follows `--color-border-default`, so it becomes `stage-700` on
 * dark grounds and `n-200` on light automatically.
 *
 * A plain divider is decorative and hidden from assistive technology; a
 * labelled one is a real separator with its label announced.
 */
export function Divider({ className, orientation = 'horizontal', spacing = 'base', children }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block w-px self-stretch bg-(--color-border-default)', className)}
      />
    )
  }

  if (children) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-4', spacingClass[spacing], className)}
      >
        <span aria-hidden="true" className="h-px flex-1 bg-(--color-border-default)" />
        <span className="font-body text-label font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
          {children}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-(--color-border-default)" />
      </div>
    )
  }

  return <hr aria-hidden="true" className={cn('h-px border-0 bg-(--color-border-default)', spacingClass[spacing], className)} />
}
