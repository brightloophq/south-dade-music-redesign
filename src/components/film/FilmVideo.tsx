'use client'

import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

/**
 * Ambient cinematic footage for The Walk.
 *
 * ## What this is, and what it is not
 *
 * Generated with Veo. It is **atmosphere, not evidence**: an empty theatre
 * stage seen from the wings, a curtain edge, warm light across boards, dust in
 * the beam. No people ever appear, there is no text, no signage and no
 * branding, and nothing in it could be read as footage of this academy.
 * Documentary truth is carried entirely by the approved South Dade photography
 * in `public/media/`.
 *
 * ## Why it loops cleanly
 *
 * The generation runs light → dark. It ships reversed-then-forward, so the loop
 * is dark → light → dark: the first and last frames are the same black, there is
 * no cut, and the arc is the one the film wants — the room slowly revealing
 * itself and settling back.
 *
 * ## It must never cost the first paint
 *
 * The Walk sits roughly two viewports below the fold, so nothing is fetched
 * until it is close:
 *
 *   · the `<video>` element is not mounted at all until an IntersectionObserver
 *     fires with a generous root margin
 *   · until then the poster is a plain background image, so the frame is never
 *     empty and never shifts
 *   · `preload="none"` means even the mounted element fetches only on play
 *   · the mobile encode is a separate, much smaller file selected by `media`
 *
 * ## Reduced motion
 *
 * The video is never mounted. The poster stays. Someone who asked for less
 * motion gets the composition, not a still of a thing that was about to move.
 */
export interface FilmVideoProps {
  /** Basename in `public/media/film`, without extension. */
  name: string
  /** Why this footage is here. Required, same discipline as the plates. */
  job: string
  className?: string
  /** 0–1. The Walk ramps this per frame as the light finds the floor. */
  opacity?: number
  style?: React.CSSProperties
}

export function FilmVideo({ name, job, className, opacity = 1, style }: FilmVideoProps) {
  const reducedMotion = useReducedMotion()
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const host = hostRef.current
    if (!host) return

    /* Already close enough on load — mount straight away. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200% 0px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [reducedMotion])

  const poster = `/media/film/${name}-poster.jpg`

  return (
    <div
      ref={hostRef}
      data-film-video={name}
      data-film-video-job={job}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{
        opacity,
        backgroundImage: `url(${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 70%',
        ...style,
      }}
    >
      {mounted ? (
        <video
          className="size-full object-cover"
          style={{ objectPosition: 'center 70%' }}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disableRemotePlayback
        >
          <source
            src={`/media/film/${name}-mobile.mp4`}
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source src={`/media/film/${name}.mp4`} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}
