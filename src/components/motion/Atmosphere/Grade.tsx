'use client'

import { useMotionCapability } from '@/hooks/useReducedMotion'

/**
 * The grade.
 *
 * Two fixed overlays that give the page a **colour temperature and a frame** —
 * the two things that separate a graded photograph from a screenshot.
 *
 * ## 1. The tint wash
 *
 * A single soft-light layer carrying `--atmos-tint`, the colour the light field
 * says this act should be. As you scroll, the whole page moves through
 * **deep charcoal → warm amber → soft ivory → golden stage light → quiet dark**
 * without one section being recoloured.
 *
 * `soft-light` is the right blend for this: it lifts and warms without crushing
 * blacks or washing whites, so body copy on the Desk sections keeps its 17:1
 * contrast while still sitting in the same light as everything else. Opacity is
 * held low deliberately — this should be felt, never seen as a colour cast.
 *
 * ## 2. The vignette
 *
 * Every cinematic frame has one and no default web page does. It closes in
 * during the dark acts and opens out through the ivory middle, so the page
 * physically *breathes* — the frame tightens when the story tightens.
 *
 * Both layers are `pointer-events-none`, `aria-hidden`, and driven entirely by
 * CSS custom properties, so they cost one composited layer each and never
 * re-render.
 */
export function Grade() {
  const capability = useMotionCapability()

  return (
    <>
      {/* The tint wash — the act's colour temperature over everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
        style={{
          backgroundColor: 'rgb(var(--atmos-tint) / 1)',
          // Warm acts carry more wash than cool ones; the ivory middle is
          // nearly clear so the reading sections stay honest.
          opacity: capability.reveals
            ? 'calc(0.10 + var(--atmos-warmth, 0.3) * 0.14)'
            : '0.06',
          transition: 'background-color 900ms linear',
        }}
      />

      {/*
        The vignette. Two stops rather than one — a hard edge reads as a
        photo filter, a soft double falloff reads as a lens.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 45%, transparent 42%, rgba(4,6,10,0.28) 78%, rgba(4,6,10,0.62) 100%)',
          opacity: capability.reveals ? 'var(--vignette, 0.3)' : '0.22',
          transition: 'opacity 700ms linear',
        }}
      />
    </>
  )
}
