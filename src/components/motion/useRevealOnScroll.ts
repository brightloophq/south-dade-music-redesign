'use client'

import { useEffect, type RefObject } from 'react'

import { motionConfig } from '@/config/motion'

export interface RevealConfig {
  delay?: number
  distance?: number
  duration?: number
  start?: string
  /** Stagger interval in ms, when revealing a set of children. */
  stagger?: number
  /** Reveal direct children rather than the element itself. */
  childrenSelector?: string
}

/**
 * Shared ScrollTrigger lifecycle for the reveal primitives.
 *
 * Rules enforced here so no consumer can opt out:
 *  - `once: true` — elements animate on first entry, never on scroll-back
 *    (05-motion-system.md §4 rule 1)
 *  - Trigger at 80% viewport (rule 2)
 *  - Content starts visible; it is only hidden after GSAP confirms it can run
 *    (rule 5) — so a JS failure never produces a blank page
 *  - One trigger manages a group; batching beats twelve individual triggers
 *    (§15 rule 4)
 *  - `will-change` is cleared on completion (§15 rule 2)
 *  - Triggers are killed on unmount (§15 rule 3)
 */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  config: RevealConfig = {},
): void {
  const {
    delay = 0,
    distance = 24,
    duration = motionConfig.duration.slow,
    start = motionConfig.scrollTrigger.start,
    stagger,
    childrenSelector,
  } = config

  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async (): Promise<void> => {
      const [{ gsap, ScrollTrigger }, { resolveStagger }] = await Promise.all([
        import('@/lib/motion/gsap'),
        import('@/lib/motion/animations'),
      ])

      if (cancelled) return

      const targets = childrenSelector
        ? gsap.utils.toArray<HTMLElement>(element.querySelectorAll(childrenSelector))
        : [element]

      if (targets.length === 0) return

      const context = gsap.context(() => {
        gsap.set(targets, { opacity: 0, y: distance, willChange: 'transform, opacity' })

        const tween = gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: duration / 1000,
          delay: delay / 1000,
          ease: motionConfig.gsapEase.stage,
          ...(stagger !== undefined || childrenSelector
            ? { stagger: resolveStagger(targets.length, stagger) / 1000 }
            : {}),
          scrollTrigger: {
            trigger: element,
            start,
            once: motionConfig.scrollTrigger.once,
          },
          onComplete: () => {
            gsap.set(targets, { clearProps: 'willChange' })
            for (const target of targets) target.dataset.animateDone = 'true'
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      }, element)

      cleanup = () => {
        context.revert()
        ScrollTrigger.refresh()
      }
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [ref, enabled, delay, distance, duration, start, stagger, childrenSelector])
}
