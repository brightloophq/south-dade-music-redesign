'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export interface EmergeProps {
  children: ReactNode
  className?: string
  /** Angle of the light wipe, degrees. Follows the page's light direction. */
  angle?: number
  /** Softness of the wipe edge, as a percentage of the element. */
  feather?: number
}

/**
 * **Emerge** — content revealed by light passing over it.
 *
 * As of Phase 6 this component is **markup only**. It declares a mask and its
 * angle; the film director finds every `[data-emerge]` on the page and reveals
 * them in velocity-aware batches via `ScrollTrigger.batch`.
 *
 * That change matters: twelve components each owning a ScrollTrigger is twelve
 * independent clocks with no shared edit. One batch is one trigger, one
 * decision, and a stagger that tightens when the visitor is moving fast —
 * because a 600ms cascade they have already scrolled past is a cascade nobody
 * sees.
 *
 * `--emerge` defaults to 1 in base CSS, so with no JavaScript, under reduced
 * motion, or below the capability threshold the mask is fully open and the
 * content is simply visible.
 */
export function Emerge({ children, className, angle = 104, feather = 46 }: EmergeProps) {
  return (
    <div
      data-emerge
      className={cn(className)}
      style={
        {
          '--emerge-angle': `${angle}deg`,
          '--emerge-feather': `${feather}%`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
