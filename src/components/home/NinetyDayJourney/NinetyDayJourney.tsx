'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Container } from '@/components/ui/Container'
import { journey } from '@/content/home'
import { useMotionCapability } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

/**
 * §3 — The 90-Day Journey. **The signature moment.**
 *
 * One moment on this page is designed to stop a scroll, and this is it.
 *
 * ## The sequence
 *
 * You are looking down a wooden stage floor that recedes into darkness. As you
 * scroll, the camera **pushes forward along the boards** and the week numeral
 * counts up — you are walking the twelve weeks, not reading about them.
 *
 * Around week eleven the light begins to warm. Then, at week twelve, three
 * things happen within a few hundred milliseconds of scroll:
 *
 *   1. the ground drops to near-black — the house lights going down
 *   2. a volumetric beam falls into the frame and **the dust inside it ignites**
 *   3. the numeral — which has been white all the way up — turns to light
 *
 * The brightest frame on the page arrives at the end of the darkest passage.
 * That inversion is the whole idea: the site goes dark so one thing can be lit.
 *
 * ## Why it earns a pin
 *
 * Pinning is easy to abuse and this is the only pin on the page. It is
 * justified because the section's subject is *duration* — ninety days
 * compressed into a scroll — and duration cannot be communicated by a static
 * frame. Everywhere else, scroll triggers motion; here scroll **is** the motion.
 *
 * Escape is always available: normal scroll speed exits, nothing snaps, and the
 * progress control is a real link to the table below.
 *
 * ## Degradation — four paths, all complete
 *
 * Below `lg`, under reduced motion, without JS, and on a low-capability device
 * this is a static composition with the numeral at 12, the beam at rest, and
 * all three stages legible. No information lives in the animation.
 */
export function NinetyDayJourney() {
  const capability = useMotionCapability()
  const [activeStage, setActiveStage] = useState(0)
  const [week, setWeek] = useState(1)
  const [ignited, setIgnited] = useState(false)

  const pinned = capability.pinning && capability.scrub

  /*
   * The director owns the timeline; this section owns the set and the copy.
   *
   * Progress arrives as a DOM event rather than a prop, because the timeline
   * lives outside React entirely — which is the point. GSAP writes to the DOM
   * at scroll rate; React re-renders only when a *word* changes, not a pixel.
   */
  useEffect(() => {
    if (!pinned) return

    const onProgress = (event: Event): void => {
      const p = (event as CustomEvent<number>).detail
      setActiveStage(p >= 0.8 ? 2 : p >= 0.55 ? 1 : 0)
      setWeek(Math.min(12, Math.max(1, Math.ceil(p * 12) || 1)))
      setIgnited(p >= 0.8)
    }

    document.addEventListener('film:journey', onProgress)
    return () => document.removeEventListener('film:journey', onProgress)
  }, [pinned])

  const stage = journey.stages[activeStage] ?? journey.stages[0]!

  return (
    <section
      data-film="journey"
      data-register="house"
      aria-labelledby="journey-heading"
      className="relative isolate overflow-clip bg-stage-900"
    >
      {/* ---------------------------------------------------------------
        The set. Six layers, all decorative — the meaning is in the list.
      --------------------------------------------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* The floor. The camera pushes along it. */}
        <div data-j-floor className="absolute inset-0 origin-bottom will-change-transform">
          <Image
            src="/images/generated/atmos-stage-floor.jpg"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-bottom plate"
          />
        </div>

        {/* The house going down. */}
        <div data-j-dark className={cn('absolute inset-0 bg-stage-950', pinned && 'opacity-0')} />

        {/* Ambient warmth, tied to the page-wide light field. */}
        <div
          data-j-warm
          className={cn(
            'absolute inset-0',
            'bg-[radial-gradient(60%_58%_at_calc(var(--light-x)*1%)_calc(var(--light-y)*1%),rgba(245,165,36,0.16),transparent_70%)]',
            pinned && 'opacity-0',
          )}
        />

        {/* THE BEAM. */}
        <div data-j-beam className={cn('absolute inset-0 mix-blend-screen will-change-transform', pinned && 'opacity-0')}>
          <Image
            src="/images/generated/atmos-spotlight-cone.jpg"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover plate"
          />
        </div>

        {/*
          THE BLOOM. A separate plate from the beam: the beam is the shaft, the
          bloom is the source. They arrive a few frames apart so the light reads
          as travelling rather than switching on.
        */}
        <div data-j-bloom className={cn('absolute inset-0 mix-blend-screen will-change-transform', pinned && 'opacity-0')}>
          <Image
            src="/images/generated/atmos-warm-bloom.jpg"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover plate"
          />
        </div>

        {/* Reflected floor light — the beam bouncing back off the boards. */}
        <div
          data-j-bounce
          className={cn(
            'absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(245,165,36,0.22),transparent)]',
            pinned && 'opacity-0',
          )}
        />

        {/* The warm flood at the moment the light arrives. */}
        <div data-j-flood className={cn('absolute inset-0 bg-spot-300', pinned && 'opacity-0')} />
      </div>

      <Container width="wide" className="flex min-h-[78svh] flex-col justify-between py-(--section-feature) lg:min-h-svh">
        <div className="flex items-baseline justify-between gap-8">
          <h2 id="journey-heading" className="font-body text-label font-semibold uppercase tracking-[0.14em] text-n-400">
            {journey.heading}
          </h2>
          <a
            href="#twelve-weeks"
            className="shrink-0 font-body text-label font-semibold uppercase tracking-[0.14em] text-n-500 transition-colors duration-500 hover:text-spot-400"
          >
            {journey.skipLabel}
          </a>
        </div>

        <div className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-(--grid-gutter)">
            {/*
              The numeral is the progress bar, the diagram and the drama in one
              element. At week twelve it stops being white and becomes light.
            */}
            <p
              aria-hidden="true"
              data-numeric
              data-j-numeral
              className={cn(
                'col-span-1 font-display text-[clamp(7rem,26vw,20rem)] leading-[0.78] font-bold tabular-nums tracking-[-0.05em] will-change-transform lg:col-span-5',
                'transition-[color,text-shadow] duration-700',
                ignited
                  ? 'text-spot-300 [text-shadow:0_0_80px_rgba(255,214,138,0.55)]'
                  : 'text-n-0 [text-shadow:0_0_0_transparent]',
              )}
            >
              {String(pinned ? week : 12).padStart(2, '0')}
            </p>

            <div data-j-caption className="col-span-1 lg:col-span-6 lg:col-start-7">
              <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-spot-400">
                {stage.weekLabel}
              </p>
              <p className="mt-4 max-w-[16ch] font-display text-display-md leading-[1.1] font-semibold text-n-0">
                {stage.title}
              </p>
            </div>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-clip border-y border-stage-700 lg:grid-cols-3">
          {journey.stages.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'py-6 transition-opacity duration-700 motion-reduce:transition-none lg:px-6 lg:first:pl-0 lg:last:pr-0',
                pinned && index !== activeStage ? 'opacity-35' : 'opacity-100',
              )}
            >
              <span className="font-body text-label font-semibold uppercase tracking-[0.14em] text-n-500">
                {item.weekLabel}
              </span>
              <p className="mt-2 font-body text-body-md text-n-300">{item.title}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
