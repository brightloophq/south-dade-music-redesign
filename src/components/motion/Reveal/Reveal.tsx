'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { motionConfig } from '@/config/motion'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

export interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  start?: string
}

/**
 * `curtain-up` — masked headline reveal (05-motion-system.md §4).
 * Text masked by its own line box, revealed bottom-to-top.
 *
 * ⚠️ H1 and major section headings only. **Maximum two per page** — this is the
 * most expensive-looking pattern and loses its effect when repeated.
 *
 * The mask wrapper uses `overflow: clip` rather than `hidden` so it never
 * creates a scroll container, and the inner element is the only thing that
 * moves — keeping the animation to `transform` alone.
 *
 * ⚠️ Phase 4 ships the primitive. It is not applied to any UI yet.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = motionConfig.duration.slower,
  start = motionConfig.scrollTrigger.start,
}: RevealProps) {
  const maskRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const capability = useMotionCapability()

  useEffect(() => {
    const mask = maskRef.current
    const inner = innerRef.current
    if (!capability.reveals || !mask || !inner) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async (): Promise<void> => {
      const { gsap } = await import('@/lib/motion/gsap')
      if (cancelled) return

      const context = gsap.context(() => {
        gsap.set(inner, { yPercent: 100, willChange: 'transform' })

        gsap.to(inner, {
          yPercent: 0,
          duration: duration / 1000,
          delay: delay / 1000,
          ease: motionConfig.gsapEase.curtain,
          scrollTrigger: { trigger: mask, start, once: motionConfig.scrollTrigger.once },
          onComplete: () => {
            gsap.set(inner, { clearProps: 'willChange' })
            inner.dataset.animateDone = 'true'
          },
        })
      }, mask)

      cleanup = () => context.revert()
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [capability.reveals, delay, duration, start])

  return (
    <span ref={maskRef} className={cn('block overflow-clip', className)} data-animate="curtain-up">
      <span ref={innerRef} className="block">
        {children}
      </span>
    </span>
  )
}
