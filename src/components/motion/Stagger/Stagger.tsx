'use client'

import { useRef, type ReactNode } from 'react'

import { motionConfig } from '@/config/motion'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'
import { useRevealOnScroll } from '../useRevealOnScroll'

export interface StaggerProps {
  children: ReactNode
  className?: string
  /** Interval between items, ms. Capped at a 600ms total regardless. */
  interval?: number
  delay?: number
  distance?: number
  duration?: number
  start?: string
  /** Which descendants animate. Defaults to direct children. */
  itemSelector?: string
}

/**
 * Staggered `fade-rise` across a group (05-motion-system.md §2).
 *
 * One ScrollTrigger manages the whole group — batching beats twelve individual
 * triggers (§15 rule 4).
 *
 * Total stagger is capped at 600ms and switches to a tight interval beyond 8
 * items. A 12-card grid at 80ms would take 960ms to finish, so the last card
 * would arrive after the user has already scrolled past it.
 *
 * ⚠️ Phase 4 ships the primitive. It is not applied to any UI yet.
 */
export function Stagger({
  children,
  className,
  interval = motionConfig.stagger.base,
  delay = 0,
  distance = 24,
  duration = motionConfig.duration.slow,
  start = motionConfig.scrollTrigger.start,
  itemSelector = ':scope > *',
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const capability = useMotionCapability()

  useRevealOnScroll(ref, capability.reveals, {
    delay,
    distance,
    duration,
    start,
    stagger: interval,
    childrenSelector: itemSelector,
  })

  return (
    <div ref={ref} className={cn(className)} data-animate="stagger">
      {children}
    </div>
  )
}
