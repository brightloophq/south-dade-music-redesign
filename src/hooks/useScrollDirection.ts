'use client'

import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

export interface ScrollState {
  direction: ScrollDirection
  /** Distance from the top of the document, px. */
  y: number
  /** True once the user has scrolled past `threshold`. */
  isScrolled: boolean
  /** True once past `revealAfter` — drives the sticky mobile action bar. */
  isPastRevealPoint: boolean
}

export interface UseScrollDirectionOptions {
  /** Header condenses past this (04-design-system.md §11). */
  threshold?: number
  /** Sticky action bar appears after 25% of the viewport height. */
  revealAfter?: number
  /** Ignore jitter below this delta. */
  tolerance?: number
}

/**
 * Track scroll position and direction from a single passive listener,
 * rAF-throttled so it never blocks the main thread during scroll
 * (05-motion-system.md §15).
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollState {
  const { threshold = 24, tolerance = 6 } = options

  const [state, setState] = useState<ScrollState>({
    direction: 'up',
    y: 0,
    isScrolled: false,
    isPastRevealPoint: false,
  })

  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const revealAfter = options.revealAfter ?? window.innerHeight * 0.25

    const update = (): void => {
      const y = window.scrollY
      const delta = y - lastY.current

      if (Math.abs(delta) >= tolerance) {
        setState({
          direction: delta > 0 ? 'down' : 'up',
          y,
          isScrolled: y > threshold,
          isPastRevealPoint: y > revealAfter,
        })
        lastY.current = y
      } else {
        setState((previous) =>
          previous.isScrolled === y > threshold && previous.isPastRevealPoint === y > revealAfter
            ? previous
            : { ...previous, y, isScrolled: y > threshold, isPastRevealPoint: y > revealAfter },
        )
      }

      ticking.current = false
    }

    const onScroll = (): void => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(update)
    }

    lastY.current = window.scrollY
    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, tolerance, options.revealAfter])

  return state
}
