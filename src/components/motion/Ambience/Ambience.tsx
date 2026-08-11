'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils/cn'

const STORAGE_KEY = 'sdm:sound'
/** Background level. Deliberately low — this is room tone, not a soundtrack. */
const TARGET_VOLUME = 0.18
const FADE_MS = 900

/**
 * Optional ambience, and the control that owns it.
 *
 * ## Muted is not a default, it is the contract
 *
 * Nothing plays until the visitor presses this button. There is no autoplay
 * attempt, no "unmute on first scroll", no play-on-interaction trick. A parent
 * who opens this site at 11pm gets silence.
 *
 * ## Why it is mounted in the layout rather than the page
 *
 * The `<audio>` element lives above the router, so client-side navigation never
 * remounts it and the track never restarts. Move it into a page and every
 * internal link would cut the music back to zero.
 *
 * ## Fades, not switches
 *
 * Volume ramps 0 → 0.18 and back over 900ms on a `requestAnimationFrame` loop.
 * Playback only stops once the fade-out has finished, so there is never an
 * abrupt start or a clipped tail.
 *
 * ## Autoplay policy
 *
 * `play()` is only ever called inside the click handler, which is a user
 * gesture, so the policy is satisfied by construction. The promise is still
 * caught: if a browser refuses anyway the control returns to off and the visitor
 * sees the truth. No unhandled rejection, no console error.
 *
 * ## Accessibility
 *
 * A real `<button>` with `aria-pressed`, a labelled state, keyboard operation
 * and a visible focus ring. It is never hidden. It is deliberately **not** tied
 * to `prefers-reduced-motion` — someone who dislikes motion may still want
 * sound, and someone who wants silence is not asking about animation.
 */
export function Ambience() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const [on, setOn] = useState(false)

  /*
    The stored preference is deliberately NOT restored as playback.

    Reading it back and calling play() would be blocked without a gesture, and
    more importantly it would start sound on a page the visitor did not ask to
    make noise. The preference is written on toggle so a future session can be
    made to respect it if the owner ever wants that; today nothing plays until
    this button is pressed.
  */

  const fadeTo = useCallback((target: number, done?: () => void) => {
    const el = audioRef.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const from = el.volume
    const startedAt = performance.now()

    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / FADE_MS)
      /* easeInOutSine — no audible knee at either end. */
      const eased = 0.5 - Math.cos(Math.PI * t) / 2
      el.volume = Math.max(0, Math.min(1, from + (target - from) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else done?.()
    }
    rafRef.current = requestAnimationFrame(step)
  }, [])

  const toggle = useCallback(async () => {
    const el = audioRef.current
    if (!el) return

    if (on) {
      fadeTo(0, () => el.pause())
      setOn(false)
      try {
        window.localStorage.setItem(STORAGE_KEY, 'off')
      } catch {
        /* Non-fatal. */
      }
      return
    }

    el.volume = 0
    try {
      await el.play()
    } catch {
      /* Blocked or unavailable — stay off and say so. Never throw. */
      setOn(false)
      return
    }
    fadeTo(TARGET_VOLUME)
    setOn(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, 'on')
    } catch {
      /* Non-fatal. */
    }
  }, [on, fadeTo])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <>
      {/*
        `preload="none"` — 301KB is not fetched until somebody asks for sound.
        A visitor who never presses this pays nothing for it.
      */}
      <audio ref={audioRef} src="/media/audio/ambience.mp3" loop preload="none" playsInline />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}
        data-ambience={on ? 'on' : 'off'}
        className={cn(
          'fixed bottom-5 left-5 z-(--z-header) inline-flex min-h-11 items-center gap-2.5 px-3 py-2',
          'font-display text-label uppercase tracking-wide',
          'text-(--color-text-primary) mix-blend-difference',
          'transition-opacity duration-(--duration-base) ease-(--ease-stage) motion-reduce:transition-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot-500',
          'opacity-70 hover:opacity-100',
        )}
      >
        <span aria-hidden="true">Sound</span>
        {/*
          The state is a filled or hollow ring, not an icon set — the same
          hairline vocabulary as the rest of the site. `mix-blend-difference`
          keeps it legible over the film and the desk without a background
          plate, which is what a media player would need.
        */}
        <span
          aria-hidden="true"
          className={cn(
            'block size-2 rounded-full border border-current transition-colors duration-(--duration-base)',
            on ? 'bg-current' : 'bg-transparent',
          )}
        />
      </button>
    </>
  )
}
