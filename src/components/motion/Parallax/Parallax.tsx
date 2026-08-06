'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { motionConfig } from '@/config/motion'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

export interface ParallaxProps {
  children: ReactNode
  className?: string
  /**
   * Differential between this layer and the page, 0–0.12.
   * Values above the cap are clamped, not honoured.
   */
  speed?: number
}

/**
 * Bounded parallax (05-motion-system.md §5).
 *
 * Hard constraints, enforced here rather than trusted to call sites:
 *  - **Maximum 12% differential.** Values above the cap are clamped.
 *  - **Background imagery and single decorative layers only.**
 *  - **Never on text.** Parallaxed type is unreadable while moving and is a
 *    known accessibility problem. Passing text as children is a misuse; there
 *    is a development-time warning below.
 *  - Disabled entirely below `md` and under reduced motion — handled by
 *    `capability.parallax`.
 *  - Never on any element contributing to LCP.
 *
 * ⚠️ Phase 4 ships the primitive. It is not applied to any UI yet.
 */
export function Parallax({ children, className, speed = 0.08 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const capability = useMotionCapability()

  const clamped = Math.max(0, Math.min(Math.abs(speed), motionConfig.parallax.maxDifferential))

  useEffect(() => {
    const element = ref.current
    if (!capability.parallax || !element) return

    if (process.env.NODE_ENV !== 'production') {
      const text = element.textContent?.trim() ?? ''
      if (text.length > 0) {
        console.warn(
          '[motion] <Parallax> contains text. Parallaxed type is unreadable while moving and is an accessibility problem. See docs/redesign/05-motion-system.md §5.',
        )
      }
    }

    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async (): Promise<void> => {
      const { gsap } = await import('@/lib/motion/gsap')
      if (cancelled) return

      const context = gsap.context(() => {
        gsap.set(element, { willChange: 'transform' })

        gsap.to(element, {
          yPercent: clamped * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            // Always smoothed; never `scrub: true` hard-locked (05 §5).
            scrub: motionConfig.scrollTrigger.scrubSmoothing,
          },
        })
      }, element)

      cleanup = () => context.revert()
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [capability.parallax, clamped])

  return (
    <div ref={ref} className={cn(className)} data-animate="parallax" aria-hidden="true">
      {children}
    </div>
  )
}
