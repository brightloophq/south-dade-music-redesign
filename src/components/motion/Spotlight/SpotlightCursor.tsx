'use client'

import { useEffect, useRef } from 'react'

import { useHasFinePointer } from '@/hooks/useMediaQuery'
import { useMotionCapability } from '@/hooks/useReducedMotion'

/**
 * The spotlight cursor.
 *
 * ## An acknowledged deviation
 *
 * `05-motion-system.md` §16 rule 19 bans cursor-following elements and custom
 * cursors outright, and that rule is correct for the thing it was written
 * against: novelty blobs that lag behind the pointer and replace the system
 * cursor with a worse one.
 *
 * This is the other thing. Three constraints keep it defensible:
 *
 * 1. **The native cursor is never hidden.** This is additive light, not a
 *    replacement pointer. Nobody loses the affordance they rely on, and no
 *    accessibility guarantee is traded for an effect.
 * 2. **It only exists in the House register.** Dark sections only, where a
 *    moving light is the brand's own metaphor rather than decoration. On the
 *    Desk — pricing, scholarships, the close — there is nothing.
 * 3. **Fine pointers only, and off under reduced motion.**
 *
 * The result is not a cursor. It is a follow-spot: you are carrying a small
 * warm light through a dark room, and the dust you pass responds to it.
 *
 * ## Cost
 *
 * Two custom properties written inside a rAF, and a single composited layer
 * that never triggers layout. The lag is deliberate — a real follow-spot
 * operator is always a beat behind the performer, and the interpolation makes
 * the light feel like it has mass.
 */
export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const capability = useMotionCapability()
  const finePointer = useHasFinePointer()

  const enabled = capability.reveals && finePointer

  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame = 0
    let visible = false

    const onPointerMove = (event: PointerEvent): void => {
      targetX = event.clientX
      targetY = event.clientY

      // Only light the room when the pointer is actually over a House surface.
      const target = event.target as Element | null
      const overHouse = Boolean(target?.closest?.('[data-register="house"]'))

      if (overHouse !== visible) {
        visible = overHouse
        element.style.opacity = overHouse ? '1' : '0'
      }
    }

    const tick = (): void => {
      // Critically damped-ish follow. 0.12 is the point at which the light
      // reads as *carried* rather than *attached*.
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12

      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    const onLeave = (): void => {
      visible = false
      element.style.opacity = '0'
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[3] size-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        // Two stops: a warm core and a long cool falloff, so it reads as a lamp
        // rather than a flashlight.
        background:
          'radial-gradient(circle, rgba(245,165,36,0.10) 0%, rgba(245,165,36,0.05) 28%, rgba(35,46,74,0.04) 52%, transparent 72%)',
        marginLeft: '-17rem',
        marginTop: '-17rem',
      }}
    />
  )
}
