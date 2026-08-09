'use client'

import { useEffect, useRef, useState } from 'react'

import { DESK_SENTINEL_ID } from './Letterbox'

/**
 * skip the film ↓
 *
 * The escape hatch the direction has always specified and the build never had.
 *
 * 07-the-walk.md §10: *"The escape hatch is permanent. `skip the film ↓` from
 * frame one, landing at Act VII. A parent with fifteen minutes and four tabs
 * gets the price in one tap. Roughly 40% will take it, and **that is a success,
 * not a failure** — they arrive at the offer having seen that this place is
 * serious."*
 *
 * §ACT II lists it among the rules that keep a pinned sequence legitimate:
 * *"normal scroll speed always exits · no snapping · no wheel hijacking · a
 * flick to the bottom works · a permanent `skip the film ↓` in the corner from
 * the first frame. **The user is never trapped. They are invited.**"*
 *
 * Without it the homepage asks for roughly seven screens of scrolling before it
 * will say what the business is, with no way out. That is a trap with good
 * lighting.
 *
 * ## Why it is a link and not a button
 *
 * It navigates within the document, so it is an anchor. That gives keyboard
 * operation, focus ring, right-click, open-in-new-tab and screen-reader
 * semantics for free, and it still works with no JavaScript at all — which
 * matters, because the film's whole point is that it degrades to a readable
 * page.
 *
 * The href targets the first desk movement, which is also the sentinel the
 * letterbox and the grain observe. One landmark, three consumers.
 *
 * ## Why no smooth-scroll handler
 *
 * Lenis owns scrolling on this page. Calling `scrollTo` here would put a second
 * animator on the same axis, which is the exact class of bug the motion system
 * was restructured to remove. A native anchor jump sets `scrollY` directly and
 * Lenis follows it, so the correct implementation is to **not** intercept the
 * click. It also means a reduced-motion visitor gets an instant jump, which is
 * what they asked for.
 *
 * ## Why it disappears
 *
 * Offering to skip a film you have already finished is noise. An
 * IntersectionObserver on the desk sentinel hides it once the desk arrives —
 * deliberately the same mechanism as `Letterbox`, and deliberately **not**
 * ScrollTrigger: this control must be correct under reduced motion, on a
 * low-capability device, and if the motion runtime never loads at all.
 *
 * ## DOM ownership
 *
 * Pure React. No GSAP, no reparenting, nothing for a pin to wrap. It is a
 * sibling of the film rather than a child of it, so it cannot be pinned away
 * with a movement — and it cannot recreate the `removeChild` fault fixed in
 * bc3830a.
 */
export function SkipFilm() {
  const [atDesk, setAtDesk] = useState(false)
  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const sentinel = document.getElementById(DESK_SENTINEL_ID)
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setAtDesk(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: '0px 0px -55% 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={`#${DESK_SENTINEL_ID}`}
      data-skip-film
      aria-hidden={atDesk ? 'true' : undefined}
      tabIndex={atDesk ? -1 : undefined}
      className={[
        'fixed right-4 z-[61] inline-flex min-h-11 items-center gap-2 px-1',
        'font-display text-[11px] uppercase tracking-[0.18em] lg:text-label',
        'text-(--color-ash) transition-[opacity,color] duration-(--duration-base)',
        'hover:text-(--color-n-0) focus-visible:text-(--color-n-0)',
        'motion-reduce:transition-none',
        atDesk ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      /*
       * Sits clear of the letterbox bar, which is 60px while the film runs and
       * 0 once the house lights are up. Reading the same custom property the
       * bars animate means this can never overlap them at any point in the
       * retraction.
       */
      style={{ bottom: 'calc(var(--letterbox-h, 0px) + 18px)' }}
    >
      skip the film
      <span aria-hidden="true">↓</span>
    </a>
  )
}
