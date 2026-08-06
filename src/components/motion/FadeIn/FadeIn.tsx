'use client'

import { useRef, type ReactNode } from 'react'

import { motionConfig } from '@/config/motion'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'
import { useRevealOnScroll } from '../useRevealOnScroll'

export interface FadeInProps {
  children: ReactNode
  className?: string
  /** Delay in ms. */
  delay?: number
  /** Travel distance in px. Deliberately small — long travel reads as cheap. */
  distance?: number
  duration?: number
  /** Viewport position at which the reveal begins. */
  start?: string
}

/**
 * `fade-rise` — the workhorse entrance (05-motion-system.md §4).
 * Opacity 0→1, translateY 24px→0, once, triggered at 80% viewport.
 *
 * Content renders fully visible and is hidden only once the motion layer
 * confirms it can animate. A JavaScript failure leaves the content readable —
 * reveals are progressive enhancement, never `opacity: 0` in base CSS.
 *
 * ⚠️ Phase 4 ships the primitive. It is not applied to any UI yet.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = motionConfig.duration.slow,
  start = motionConfig.scrollTrigger.start,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const capability = useMotionCapability()

  useRevealOnScroll(ref, capability.reveals, { delay, distance, duration, start })

  return (
    <div ref={ref} className={cn(className)} data-animate="fade-rise">
      {children}
    </div>
  )
}
