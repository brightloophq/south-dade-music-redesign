import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export interface VisuallyHiddenProps {
  children: ReactNode
  as?: ElementType
  /**
   * Reveal the content when it receives focus. Used by the skip link, which
   * must be invisible until it is the first tab stop.
   */
  focusable?: boolean
  className?: string
}

/**
 * Content available to assistive technology but not visually rendered.
 *
 * Prefer this over `display: none` or `visibility: hidden`, both of which
 * remove the content from the accessibility tree entirely.
 */
export function VisuallyHidden({ children, as: Component = 'span', focusable = false, className }: VisuallyHiddenProps) {
  return <Component className={cn(focusable ? 'sr-only-focusable' : 'sr-only', className)}>{children}</Component>
}
