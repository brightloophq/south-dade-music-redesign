import Link from 'next/link'
import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type CardElevation = 0 | 1 | 2
export type CardPadding = 'none' | 'tight' | 'base' | 'loose'

export interface CardProps {
  children: ReactNode
  className?: string
  elevation?: CardElevation
  padding?: CardPadding
  as?: ElementType
  /**
   * Makes the whole card the click target via a stretched overlay link.
   * The nested CTA remains a visual affordance and is NOT a second tab stop
   * (04-design-system.md §8).
   */
  href?: string
  /** Accessible name for the stretched link, when the title alone is ambiguous. */
  linkLabel?: string
  /** Equal height within a row — facts pin to the bottom. */
  fill?: boolean
  interactive?: boolean
}

const elevationClass: Record<CardElevation, string> = {
  0: 'bg-(--color-surface-page)',
  1: 'bg-(--color-surface-raised) shadow-elev-1 in-data-[register=house]:shadow-none',
  2: 'bg-(--color-surface-raised) shadow-elev-2 in-data-[register=house]:shadow-none in-data-[register=house]:border in-data-[register=house]:border-(--color-border-default)',
}

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  tight: 'p-4',
  base: 'p-6',
  loose: 'p-8',
}

/**
 * Card shell.
 * Canonical spec: docs/redesign/04-design-system.md §8
 *
 * Elevation is expressed through surface value first, shadow second — dark
 * surfaces carry elevation with tone rather than shadow, which is why the
 * `in-data-[register=house]` variants drop the shadow.
 *
 * Hover: `elev-1 → elev-2`, media scale 1.03, 200ms. **No lift on touch
 * devices** — `@media (hover: hover)` is applied via the `hover:` variant plus
 * the `pointer-fine` guard, since sticky-hover on mobile is a known bug class.
 *
 * Content rules (enforced in review, not in code):
 *  - Never truncate mid-sentence. Copy is authored to length; `line-clamp` is a
 *    safety net with a proper ellipsis, not a layout strategy.
 *  - Every card image requires meaningful `alt`.
 */
export function Card({
  children,
  className,
  elevation = 1,
  padding = 'base',
  as: Component = 'div',
  href,
  linkLabel,
  fill = true,
  interactive,
}: CardProps) {
  const isInteractive = interactive ?? Boolean(href)

  return (
    <Component
      className={cn(
        'relative isolate flex flex-col rounded-(--radius-lg)',
        elevationClass[elevation],
        paddingClass[padding],
        fill && 'h-full',
        isInteractive &&
          cn(
            'transition-shadow duration-(--duration-base) ease-(--ease-stage)',
            'pointer-fine:hover:shadow-elev-2',
            'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--color-focus-ring)',
          ),
        className,
      )}
    >
      {children}
      {href ? (
        <Link
          href={href}
          className="absolute inset-0 z-10 rounded-(--radius-lg) focus:outline-none"
          aria-label={linkLabel}
        >
          <span className="sr-only">{linkLabel ?? 'Read more'}</span>
        </Link>
      ) : null}
    </Component>
  )
}

/** Media slot. Sits above the padded body and clips to the card's top corners. */
export function CardMedia({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative -mx-6 -mt-6 mb-5 overflow-clip rounded-t-(--radius-lg)',
        'pointer-fine:group-hover:[&_img]:scale-103 [&_img]:transition-transform [&_img]:duration-(--duration-base)',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-1 flex-col gap-3', className)}>{children}</div>
}

/** Facts pin to the bottom so equal-height cards align across a row. */
export function CardFacts({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ul className={cn('mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-body-sm text-(--color-text-muted)', className)}>
      {children}
    </ul>
  )
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('relative z-20 mt-4', className)}>{children}</div>
}
