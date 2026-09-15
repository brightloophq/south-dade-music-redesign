'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { useMotionCapability } from '@/hooks/useReducedMotion'

/** The aperture each photograph opens from, by the role `Photo` was given. */
const FROM: Record<string, string> = {
  wipe: 'inset(0% 100% 0% 0%)',
  sweep: 'inset(100% 0% 0% 0%)',
  mask: 'inset(0% 0% 100% 0%)',
}

/**
 * Photograph reveals on interior routes.
 *
 * Every interior `Photo` has always declared how it should arrive —
 * `data-reveal="mask" | "wipe" | "sweep"` — but only the homepage mounts the
 * GSAP director, so on 26 routes the attribute did nothing. This gives those
 * routes the same aperture vocabulary without loading GSAP: an
 * IntersectionObserver and one Web Animations call per image.
 *
 *  - Only photographs **below the fold at mount** are prepared, so nothing the
 *    visitor can already see is hidden and re-shown.
 *  - The clip is set inline and removed as the animation starts; when it
 *    finishes the element has no inline style left at all.
 *  - Reduced motion (and any device the capability check marks as unable to
 *    run reveals) gets no observer and no clip.
 *  - It re-runs on every interior navigation and cleans up after itself.
 */
export function InteriorReveals() {
  const pathname = usePathname()
  const capability = useMotionCapability()

  useEffect(() => {
    if (!capability.reveals || typeof IntersectionObserver === 'undefined') return

    const fold = window.innerHeight * 0.92
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('main [data-reveal]:not([data-reveal="none"])'),
    ).filter((el) => el.getBoundingClientRect().top > fold)

    for (const el of targets) el.style.clipPath = FROM[el.dataset.reveal ?? ''] ?? FROM.mask!

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          observer.unobserve(el)
          const from = el.style.clipPath
          el.style.clipPath = ''
          el.animate([{ clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)' }], {
            duration: el.dataset.reveal === 'wipe' ? 1100 : 900,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          })
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      for (const el of targets) el.style.clipPath = ''
    }
  }, [pathname, capability.reveals])

  return null
}
