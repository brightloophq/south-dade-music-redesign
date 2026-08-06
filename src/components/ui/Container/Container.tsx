import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type ContainerWidth = 'prose' | 'narrow' | 'content' | 'wide' | 'full'

export interface ContainerProps {
  children: ReactNode
  className?: string
  /**
   * `prose` is 68ch — the 60–75 character measure.
   * `wide` is the 1440px content maximum.
   * `full` is edge-to-edge, permitted for photography, hero and galleries only.
   */
  width?: ContainerWidth
  as?: ElementType
  /** Suppress the responsive side margin, for nested containers. */
  flush?: boolean
  id?: string
}

const widthClass: Record<ContainerWidth, string> = {
  prose: 'max-w-(--container-prose)',
  narrow: 'max-w-(--container-narrow)',
  content: 'max-w-(--container-content)',
  wide: 'max-w-(--container-wide)',
  full: 'max-w-none',
}

/**
 * Horizontal layout container.
 * Canonical spec: docs/redesign/04-design-system.md §4
 *
 * Side margins follow the responsive grid: 20 / 24 / 32 / 48 / 64px, driven by
 * the `--grid-margin` custom property so every container agrees at every
 * breakpoint without repeating the media queries.
 */
export function Container({ children, className, width = 'content', as: Component = 'div', flush = false, id }: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn('mx-auto w-full', widthClass[width], !flush && 'px-(--grid-margin)', className)}
    >
      {children}
    </Component>
  )
}
