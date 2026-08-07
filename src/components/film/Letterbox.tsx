'use client'

import { useEffect, useRef } from 'react'

import { useMotionCapability } from '@/hooks/useReducedMotion'

/**
 * The letterbox.
 *
 * 60px bars, top and bottom, present through the film movements and retracted
 * when the house lights come up. Spec: Visual Specification.md §C and §H.5 —
 * *"bars slide off-screen, not cut … the only 'slide' in the whole spec, and it
 * moves bars, never content, so it doesn't violate the fade/slide-up ban."*
 *
 * ## Why an IntersectionObserver rather than a ScrollTrigger
 *
 * The bars must be correct even when GSAP never runs — reduced motion, a
 * low-capability device, or a script failure. Tying their presence to the
 * motion runtime would mean a visitor with reduced motion either gets bars
 * permanently welded over the ivory desk, or never sees them at all.
 *
 * So presence is owned here, by an observer on the desk sentinel, and the
 * *animation* of the retraction is the only part GSAP contributes. Under
 * reduced motion the same state change happens with no tween — which is
 * precisely what the spec asks for: *"the letterbox is simply absent from the
 * ivory movements rather than retracting."*
 *
 * The height is published as `--letterbox-h` so the Release timeline can
 * animate the same property the CSS reads, and so film movements can inset
 * their content clear of the bars.
 */

/** The id of the first desk movement. Crossing it ends the film. */
export const DESK_SENTINEL_ID = 'desk-begins'

export function Letterbox() {
  const capability = useMotionCapability()
  const retracted = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    const sentinel = document.getElementById(DESK_SENTINEL_ID)
    if (!sentinel) return

    // The film opens at the top of the document, so bars are correct at first
    // paint and never appear as a late shift.
    root.style.setProperty('--letterbox-h', '60px')

    let frame = 0
    const setBars = (open: boolean) => {
      if (retracted.current === open) return
      retracted.current = open

      const target = open ? '0px' : '60px'
      if (!capability.reveals) {
        root.style.setProperty('--letterbox-h', target)
        return
      }
      /*
       * A hand-rolled rAF ramp rather than a GSAP tween: this component must
       * not import GSAP. It is on the critical path for the first frame, and
       * the whole point of owning presence here is to be independent of the
       * motion runtime.
       */
      const from = open ? 60 : 0
      const to = open ? 0 : 60
      const started = performance.now()
      const DURATION = 1800 // --duration-houselights

      cancelAnimationFrame(frame)
      const step = (now: number) => {
        const t = Math.min(1, (now - started) / DURATION)
        // easeInOutCubic — a dimmer, not a cut.
        const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
        root.style.setProperty('--letterbox-h', `${(from + (to - from) * eased).toFixed(2)}px`)
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setBars(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: '0px 0px -60% 0px' },
    )
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      root.style.removeProperty('--letterbox-h')
    }
  }, [capability.reveals])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] contents">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] bg-black"
        style={{ height: 'var(--letterbox-h, 0px)' }}
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] bg-black"
        style={{ height: 'var(--letterbox-h, 0px)' }}
      />
    </div>
  )
}
