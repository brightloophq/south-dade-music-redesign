'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

/** Once per browser session, not once per navigation. */
const SESSION_KEY = 'sdm:preloaded'

/**
 * The house lights before the house lights.
 *
 * Pitch → the authentic mark appears → one restrained amber exposure behind it
 * → the frame opens into the film. It is the same grammar as the rest of the
 * site: light arrives, nothing slides.
 *
 * ## It is not allowed to become a delay
 *
 * The first-session sequence is timed, not throttled:
 *
 *   0.0s   pitch
 *   0.3s   the mark begins to arrive
 *   0.8s   the mark is fully readable
 *   1.2s   the amber exposure begins behind it
 *   2.2s   the light has finished developing
 *   2.4s   the frame begins opening into the film
 *   3.0s   the overlay is gone
 *
 * There is no spinner, no percentage, no progress bar and no "Loading" text,
 * because none of those tell a visitor anything true. The logo and the light
 * are the whole sequence.
 *
 * Critically it does **not** wait on the hero video, photography or fonts. Those
 * stream in behind it. A preloader that waits for noncritical assets is a
 * preloader that hides bad performance, which is the failure this one is written
 * to avoid.
 *
 * ## Once per session
 *
 * A `sessionStorage` flag means internal navigation never replays it —
 * `RouteTransition` handles those. Refreshing within the session does not replay
 * it either; a new tab or a new session does.
 *
 * ## Reduced motion
 *
 * No exposure, no scale, no 700ms hold. The overlay is mounted only long enough
 * to avoid a flash of unstyled entry and fades in 120ms.
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
   * than none. The effect only ever decides when to dismiss it, and does so
   * from a callback, never synchronously during the effect.
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
      /* Already shown this session — dismiss on the next tick, never replay. */
      const skip = window.setTimeout(() => setState('hidden'), 0)
      return () => window.clearTimeout(skip)
    }

    document.documentElement.dataset.preloading = 'true'

    const hold = reducedMotion ? 120 : 2300
    const startedAt = performance.now()

    const finish = () => {
      const remaining = Math.max(0, hold - (performance.now() - startedAt))
      window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          /* Non-fatal. */
        }
        setState('opening')
        delete document.documentElement.dataset.preloading
        /* Unmount after the exposure has finished playing. */
        window.setTimeout(() => setState('hidden'), reducedMotion ? 160 : 640)
      }, remaining)
    }

    /*
      DOM-ready, NOT `window.load`.

      `load` waits for images, fonts and the hero video — measured at ~1.2s
      here, which turned a 700ms presentation into a 1.9s wait and made the
      overlay a place to hide loading behind. DOM-ready is the honest signal:
      the document is parseable, the film's first frame is a text node on black,
      and everything else is allowed to stream in behind the site rather than in
      front of it.
    */
    if (document.readyState !== 'loading') finish()
    else {
      document.addEventListener('DOMContentLoaded', finish, { once: true })
      /* Hard ceiling: never hold longer than this, whatever happens. */
      const ceiling = window.setTimeout(finish, 3600)
      return () => {
        document.removeEventListener('DOMContentLoaded', finish)
        window.clearTimeout(ceiling)
      }
    }
  }, [reducedMotion])

  if (state === 'hidden') return null

  return (
    <div
      aria-hidden="true"
      data-preloader={state}
      className={cn(
        'pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-(--color-ground-pitch)',
        'transition-opacity ease-(--ease-stage) motion-reduce:transition-none',
        state === 'opening' ? 'opacity-0' : 'opacity-100',
      )}
      style={{ transitionDuration: reducedMotion ? '160ms' : '600ms' }}
    >
      {/*
        The exposure. One warm source behind the mark, off-centre right, the
        same direction the light comes from everywhere else on this site.
      */}
      {!reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 55% at 62% 52%, rgba(233,162,59,0.16), transparent 70%)',
            animation: 'sdm-preload-expose 1000ms var(--ease-stage) 1200ms both',
          }}
        />
      ) : null}

      <Image
        src="/brand/south-dade-music-light.png"
        alt=""
        width={720}
        height={428}
        priority
        className="relative w-[168px] max-w-[42vw]"
        style={
          reducedMotion
            ? undefined
            : { animation: 'sdm-preload-mark 500ms var(--ease-stage) 300ms both' }
        }
      />
    </div>
  )
}
