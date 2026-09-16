'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

/** Once per browser session, not once per navigation. */
const SESSION_KEY = 'sdm:preloaded'

/** How long the curtain takes to lift. Mirrored by the unmount delay. */
const LIFT_MS = 950

/**
 * The house lights before the house lights.
 *
 * Pitch → the authentic mark develops → a hairline draws beneath it → one
 * restrained green exposure behind it → the tagline → the curtain lifts and
 * the stage photograph is already settling underneath.
 *
 * ## The sequence (cold visit)
 *
 *   0.00s  pitch
 *   0.30s  the mark develops out of the dark
 *   0.90s  the hairline draws
 *   1.20s  the exposure opens behind the mark
 *   1.45s  "Build Community. Make Music."
 *   2.45s  the curtain begins to lift — `data-preloading` is cleared here, so
 *          the hero's push-in and line reveal start *under* the rising edge
 *   3.40s  the overlay is gone
 *
 * Under 3.5 seconds, inside the 3–5s brief, and it is timed rather than
 * throttled: there is no spinner, percentage or "Loading" text, because none of
 * those would tell a visitor anything true.
 *
 * ## It is not allowed to become a delay
 *
 * It does **not** wait on the hero photograph, the video or fonts. It waits for
 * DOM-ready, and a hard ceiling guarantees it can never hold longer. The hero
 * photograph is `priority` and streams in behind it.
 *
 * ## Once per session
 *
 * A `sessionStorage` flag means internal navigation and same-session reloads
 * never replay it. `RouteTransition` handles internal navigation.
 *
 * ## Reduced motion
 *
 * No development, no rule, no curtain: the overlay is held for 120ms and fades.
 *
 * ## It is silent
 *
 * Nothing here touches audio. Sound only ever begins after an explicit press of
 * the sound control.
 */
export function Preloader() {
  const reducedMotion = useReducedMotion()
  /*
   * Starts in `holding` so the very first paint of a fresh session is already
   * the overlay — a preloader that appears one frame *after* the page is worse
   * than none. The effect only ever decides when to dismiss it.
   */
  const [state, setState] = useState<'hidden' | 'holding' | 'opening'>('holding')

  useEffect(() => {
    let seen = false
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* Private mode or storage disabled — treat as seen and never block. */
      seen = true
    }
    if (seen) {
      const skip = window.setTimeout(() => setState('hidden'), 0)
      return () => window.clearTimeout(skip)
    }

    document.documentElement.dataset.preloading = 'true'

    const hold = reducedMotion ? 120 : 2450
    const startedAt = performance.now()
    const timers: number[] = []

    const finish = () => {
      const remaining = Math.max(0, hold - (performance.now() - startedAt))
      timers.push(
        window.setTimeout(() => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, '1')
          } catch {
            /* Non-fatal. */
          }
          setState('opening')
          delete document.documentElement.dataset.preloading
          timers.push(window.setTimeout(() => setState('hidden'), reducedMotion ? 180 : LIFT_MS + 40))
        }, remaining),
      )
    }

    /*
      DOM-ready, NOT `window.load` — `load` waits for images, fonts and video,
      which would turn the overlay into a place to hide loading behind.
    */
    const cleanup = () => {
      timers.forEach((t) => window.clearTimeout(t))
      delete document.documentElement.dataset.preloading
    }
    if (document.readyState !== 'loading') {
      finish()
      return cleanup
    }
    document.addEventListener('DOMContentLoaded', finish, { once: true })
    /* Hard ceiling: never hold longer than this, whatever happens. */
    timers.push(window.setTimeout(finish, 3600))
    return () => {
      document.removeEventListener('DOMContentLoaded', finish)
      cleanup()
    }
  }, [reducedMotion])

  if (state === 'hidden') return null

  const lifting = state === 'opening'

  return (
    <div
      aria-hidden="true"
      data-preloader={state}
      className={cn(
        'pointer-events-none fixed inset-0 z-[950] flex flex-col items-center justify-center bg-(--color-ground-pitch)',
        reducedMotion
          ? cn('transition-opacity duration-150', lifting ? 'opacity-0' : 'opacity-100')
          : cn(
              'transition-[clip-path] ease-(--ease-curtain)',
              lifting ? '[clip-path:inset(0_0_100%_0)]' : '[clip-path:inset(0_0_0_0)]',
            ),
      )}
      style={reducedMotion ? undefined : { transitionDuration: `${LIFT_MS}ms` }}
    >
      {/* The exposure. One warm source behind the mark, off-centre right. */}
      {!reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 55% at 62% 52%, rgba(76,173,103,0.16), transparent 70%)',
            animation: 'sdm-preload-expose 1000ms var(--ease-stage) 1200ms both',
          }}
        />
      ) : null}

      <div
        className={cn(
          'relative flex flex-col items-center',
          !reducedMotion && 'transition-[transform,opacity] duration-700 ease-(--ease-stage)',
          lifting && !reducedMotion ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100',
        )}
      >
        <Image
          src="/brand/south-dade-music-light.png"
          alt=""
          width={720}
          height={428}
          priority
          sizes="176px"
          className="w-[176px] max-w-[44vw]"
          style={reducedMotion ? undefined : { animation: 'sdm-preload-mark 700ms var(--ease-stage) 300ms both' }}
        />
        <span
          className="mt-7 block h-px w-24 origin-left bg-spot-500/80"
          style={reducedMotion ? undefined : { animation: 'sdm-preload-rule 900ms var(--ease-stage) 900ms both' }}
        />
        <span
          className="mt-5 font-display text-label uppercase text-(--color-ash)"
          style={reducedMotion ? undefined : { animation: 'sdm-preload-line 700ms var(--ease-stage) 1450ms both' }}
        >
          Build Community · Make Music
        </span>
      </div>
    </div>
  )
}
