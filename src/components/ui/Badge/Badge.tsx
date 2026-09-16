import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warn' | 'error' | 'info'
export type BadgeVariant = 'solid' | 'soft' | 'outline'

export interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: BadgeTone
  variant?: BadgeVariant
  /**
   * Renders the badge as a status region announced to assistive technology.
   * Use for capacity and deadline changes — not for static labels.
   */
  live?: boolean
}

const toneClass: Record<BadgeVariant, Record<BadgeTone, string>> = {
  solid: {
    neutral: 'bg-n-800 text-n-0',
    /** The spot is a FILL here, never text on light — spot-500 on house is 2.6:1. */
    accent: 'bg-spot-500 text-stage-950',
    success: 'bg-success text-n-0',
    warn: 'bg-warn text-n-0',
    error: 'bg-error text-n-0',
    info: 'bg-info text-n-0',
  },
  soft: {
    neutral: 'bg-n-100 text-n-700',
    accent: 'bg-spot-300/30 text-n-800',
    success: 'bg-success/12 text-success',
    warn: 'bg-warn/12 text-warn',
    error: 'bg-error/12 text-error',
    info: 'bg-info/12 text-info',
  },
  outline: {
    neutral: 'border border-n-300 text-n-700',
    accent: 'border border-spot-600 text-n-800',
    success: 'border border-success text-success',
    warn: 'border border-warn text-warn',
    error: 'border border-error text-error',
    info: 'border border-info text-info',
  },
}

/**
 * Badge / tag.
 * Type: the `label` token — 13px, 600 weight, 0.08em tracking, uppercase.
 *
 * ⚠️ Capacity badges must never fabricate scarcity (05-motion-system.md §7).
 * A "3 seats left" badge is a factual claim and requires a real figure.
 */
export function Badge({ children, className, tone = 'neutral', variant = 'soft', live = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-(--radius-sm) px-2 py-1',
        'font-body text-label font-semibold uppercase tracking-[0.08em]',
        toneClass[variant][tone],
        className,
      )}
      {...(live ? { role: 'status', 'aria-live': 'polite' } : {})}
    >
      {children}
    </span>
  )
}
