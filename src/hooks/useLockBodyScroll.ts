'use client'

import { useEffect } from 'react'

/**
 * Lock body scroll while an overlay is open, without the layout shift that
 * `overflow: hidden` causes when a scrollbar disappears.
 *
 * CLS target is 0.00 (05-motion-system.md §15) — a 15px jump when the drawer
 * opens would violate it on every desktop open.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      const current = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${current + scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [locked])
}
