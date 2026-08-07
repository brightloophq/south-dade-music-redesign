'use client'

import { useEffect, useState } from 'react'

import { useMotionCapability } from '@/hooks/useReducedMotion'
import { DESK_SENTINEL_ID } from './Letterbox'

/**
 * Film grain — over the film movements only.
 *
 * Spec: HANDOFF.md §3.8 and The Film.html shot 08 — *"House lights, flat and
 * honest. No grain from here down."* The grain is what makes the dark read as
 * photographed rather than rendered; on the ivory desk it would read as dirt
 * on a printed page, and the desk's whole job is to be trustworthy.
 *
 * At `--opacity-grain` (5%) it is deliberately near the threshold of
 * perception. If you can see it as texture, it is turned up too far.
 *
 * ## Implementation
 *
 * One fixed tile, stepped across positions rather than interpolated — real
 * grain resamples every frame, it does not slide. Animating `feTurbulence`'s
 * seed instead would re-run the filter on the CPU every frame and cost real
 * frames on a mid-range phone; a static tile moved by `background-position` is
 * composited on the GPU and costs effectively nothing.
 *
 * Presence is owned by the same desk sentinel the letterbox uses, so the two
 * cannot disagree about where the film ends.
 */

/** 128×128 turbulence tile, inlined so it costs no request. */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export function FilmGrain() {
  const capability = useMotionCapability()
  const [inFilm, setInFilm] = useState(true)

  useEffect(() => {
    const sentinel = document.getElementById(DESK_SENTINEL_ID)
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setInFilm(!(entry.isIntersecting || entry.boundingClientRect.top < 0)),
      { rootMargin: '0px 0px -60% 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      data-film-grain
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay transition-opacity duration-(--duration-houselights) motion-safe:animate-[grain-shift_0.8s_steps(1)_infinite]"
      style={{
        backgroundImage: GRAIN_TILE,
        backgroundRepeat: 'repeat',
        opacity: inFilm ? 'var(--opacity-grain)' : 0,
        // Static under reduced motion: the texture stays, the resampling stops.
        animationPlayState: capability.reveals ? 'running' : 'paused',
      }}
    />
  )
}
