'use client'

/**
 * THE CAMERA.
 *
 * The browser is the camera. These are the only moves it is allowed to make.
 *
 * Everything here resolves to `transform` and `opacity` — the two properties the
 * compositor can animate without touching layout or paint. A camera move that
 * causes a reflow is not a camera move; it is a bug with a nice name.
 *
 * ## The rules
 *
 * · **Never shake.** Handheld is a different film.
 * · **Never spin. Never rotate** unless something is physically rotating.
 * · **Push and pull are scale, not zoom** — scale on a plate reads as the camera
 *   moving through space; changing an image's dimensions reads as a UI resize.
 * · **Foreground and background never move at the same rate.** That difference
 *   *is* depth. A single-plane move is a slide, not a dolly.
 * · **Rack focus is blur, and blur is expensive** — so it is applied to at most
 *   one element at a time, never inside a scrub, and always released.
 */

export interface CameraMove {
  scale?: number
  y?: string | number
  x?: string | number
  opacity?: number
}

/**
 * A slow dolly in. The plate grows and lifts fractionally, as if the lens is
 * travelling toward it rather than magnifying it.
 */
export const push = (amount = 0.18): CameraMove => ({
  scale: 1 + amount,
  yPercent: -amount * 14,
}) as CameraMove

/** Pulling back. Used at act ends, so the room is given away before it is left. */
export const pull = (amount = 0.1): CameraMove => ({
  scale: 1 - amount * 0.4,
  yPercent: amount * 8,
}) as CameraMove

/**
 * Parallax depth. `depth` 0 = locked to the camera (foreground),
 * 1 = infinitely far (background). Returns the drift for one plane.
 *
 * Capped at 12% differential — beyond that it stops reading as depth and starts
 * reading as a broken sticky element.
 */
export function plane(depth: number, travel = 12): { yPercent: number } {
  const clamped = Math.max(0, Math.min(1, depth))
  return { yPercent: -travel * (1 - clamped) * 0.12 * 8 }
}

/**
 * Rack focus. The lens finds a new subject.
 *
 * Blur is a paint-bound filter, so this is used sparingly and never scrubbed:
 * it plays once at a discrete moment and clears itself. `willChange` is set for
 * the duration only.
 */
export function rackFocus(
  gsap: typeof import('gsap').gsap,
  target: gsap.TweenTarget,
  { from = 8, duration = 1.1 }: { from?: number; duration?: number } = {},
): gsap.core.Tween {
  gsap.set(target, { filter: `blur(${from}px)`, willChange: 'filter' })
  return gsap.to(target, {
    filter: 'blur(0px)',
    duration,
    ease: 'power2.out',
    onComplete: () => gsap.set(target, { clearProps: 'filter,willChange' }),
  })
}

/**
 * Lens breathing. A living camera is never perfectly still, even locked off.
 * ~1.8% over 24s — below conscious notice, felt as presence.
 */
export function breathe(gsap: typeof import('gsap').gsap, target: gsap.TweenTarget): gsap.core.Tween {
  return gsap.to(target, {
    scale: 1.018,
    duration: 12,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}
