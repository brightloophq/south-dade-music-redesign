'use client'

import { useMotionCapability } from '@/hooks/useReducedMotion'

/**
 * Film grain.
 *
 * The cheapest thing in this phase and the single biggest contributor to
 * "this feels like film rather than a webpage". Digital gradients are too
 * clean; every frame of every reference in the brief — A24, Apple's dark
 * product pages, any Broadway teaser — carries grain, and its absence is why
 * flat CSS gradients read as *rendered* rather than *photographed*.
 *
 * ## Implementation
 *
 * One fixed `<div>` with an inline SVG `feTurbulence` as a background image,
 * stepped across eight positions on a 0.8s loop. Stepping rather than
 * interpolating is what makes it read as grain rather than as a moving texture
 * — real film grain resamples every frame, it does not slide.
 *
 * ## Why not animate `feTurbulence`'s seed
 *
 * Animating the filter re-runs the turbulence on the CPU every frame, which is
 * expensive enough to cost frames on a mid-range phone. A static tile moved by
 * `background-position` is composited on the GPU and costs effectively nothing.
 *
 * Opacity is deliberately near the threshold of perception. If you can see it,
 * it is turned up too far.
 */

/** 128×128 turbulence tile, inlined so it costs no request. */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export function Grain() {
  const capability = useMotionCapability()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.055] mix-blend-overlay motion-safe:animate-[grain-shift_0.8s_steps(1)_infinite]"
      style={{
        backgroundImage: GRAIN_TILE,
        backgroundRepeat: 'repeat',
        // Static under reduced motion: the texture stays, the resampling stops.
        animationPlayState: capability.reveals ? 'running' : 'paused',
      }}
    />
  )
}
