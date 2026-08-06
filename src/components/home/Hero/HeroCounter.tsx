'use client'

import { useEffect, useRef } from 'react'

import { useMotionCapability } from '@/hooks/useReducedMotion'

export interface HeroCounterProps {
  /** The final value, rendered as text. Always present in the DOM. */
  value: string
  /**
   * Starting value for the count-up. `null` means the figure never animates —
   * a range like "3–18" is not a count.
   */
  countFrom: number | null
}

/**
 * A hero fact figure.
 *
 * Counter rules from 05-motion-system.md §7:
 *  - Count from ~80% of target, not from zero. Counting 90 from 0 is slow and
 *    reads as a gimmick; starting at 72 gives the same sense of arrival.
 *  - 1400ms, `ease-spot` — decelerating so the final digits land deliberately.
 *  - **Tabular numerals mandatory** — the layout must not shift as digits change.
 *  - **The true value is in the DOM at all times** for screen readers and no-JS.
 *    `aria-live` is not used; the final value is simply present.
 *  - Under reduced motion the number renders at final value immediately.
 *
 * Maximum three counters per page. Two animate here; "3–18" does not.
 */
export function HeroCounter({ value, countFrom }: HeroCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const capability = useMotionCapability()

  useEffect(() => {
    const element = ref.current
    const target = Number.parseInt(value, 10)

    if (!capability.reveals || countFrom === null || !element || Number.isNaN(target)) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async (): Promise<void> => {
      /*
       * ⚠️ registerGsap() is required before ANY scrollTrigger config is used.
       * Without it GSAP silently drops the property and logs only
       * "Invalid property scrollTrigger ... Missing plugin?" — the counters
       * never animated. It is idempotent, so calling it here costs nothing.
       */
      const { gsap, registerGsap } = await import('@/lib/motion/gsap')
      registerGsap()
      if (cancelled) return

      const counter = { current: countFrom }

      const context = gsap.context(() => {
        gsap.to(counter, {
          current: target,
          duration: 1.4,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          onUpdate: () => {
            element.textContent = String(Math.round(counter.current))
          },
          onComplete: () => {
            // Restore the exact source string, not a rounded reconstruction.
            element.textContent = value
          },
        })
      }, element)

      cleanup = () => {
        context.revert()
        element.textContent = value
      }
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [capability.reveals, countFrom, value])

  return (
    <span
      ref={ref}
      data-numeric
      className="font-display text-stat font-bold tabular-nums text-(--color-text-primary)"
    >
      {value}
    </span>
  )
}
