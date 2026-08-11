'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * A short exposure between public routes.
 *
 * ## What it is
 *
 * A film site that cuts between pages with no transition reads as a set of
 * documents. This is the smallest gesture that makes the set feel like one
 * production: a brief darkening across the viewport as the new route paints,
 * in the film's own register.
 *
 * ## What it deliberately is not
 *
 * **It never delays navigation.** There is no exit animation, no interception
 * of the click, no artificial wait before the router runs. Next has already
 * navigated by the time this component sees a new pathname; the overlay plays
 * *over* the page that has arrived. If the transition were skipped entirely the
 * visitor would land on the same page at the same moment.
 *
 * That is the difference between a transition and an SPA gimmick, and it is why
 * this is 260ms of `opacity` on a `pointer-events-none` layer rather than a
 * curtain that owns the navigation.
 *
 * ## Reduced motion
 *
 * Returns `null`. No overlay is mounted, nothing fades, and navigation is
 * instant — which it already was.
 */
export function RouteTransition() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'exposing'>('idle')
  const first = useRef(true)

  useEffect(() => {
    if (reducedMotion) return
    /* The first paint is a page load, not a transition. */
    if (first.current) {
      first.current = false
      return
    }

    setPhase('exposing')
    const timer = window.setTimeout(() => setPhase('idle'), 260)
    return () => window.clearTimeout(timer)
  }, [pathname, reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      aria-hidden="true"
      data-route-transition={phase}
      className="pointer-events-none fixed inset-0 z-(--z-header) bg-(--color-ground-pitch) transition-opacity duration-(--duration-base) ease-(--ease-stage) motion-reduce:hidden"
      style={{ opacity: phase === 'exposing' ? 0.42 : 0 }}
    />
  )
}
