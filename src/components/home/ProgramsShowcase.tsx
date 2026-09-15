import Link from 'next/link'

import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { DISPLAY_SECTION, Eyebrow, TextLink } from '@/components/ui/Editorial'
import { programFrames, programsShowcase } from '@/content/home'
import { programEntries } from '@/content/programs'
import { cn } from '@/lib/utils/cn'

/**
 * PROGRAMS — discovery, with a room for each.
 *
 * ## What it replaces
 *
 * A numbered playbill beside one sticky photograph that cross-faded on hover.
 * Elegant, and on touch the picture never changed: five of six programmes had
 * no image a phone visitor would ever see, and the list gave no sense of how
 * different a three-year-old's rhythm class is from a teenage band.
 *
 * ## What it is now
 *
 *   The flagship  a large frame and the programme set at statement size, with
 *                 its verified facts and a route into the twelve weeks below
 *   The others    five programmes, each with its own photograph, arranged in an
 *                 offset editorial grid — three portraits, then two landscapes
 *
 * Every summary and fact is `programEntries`, verbatim. No card chrome: the
 * photograph is the object and the type hangs beneath it.
 *
 * On a phone the five become a horizontal rail with scroll-snap and a visible
 * next frame, so discovery is a swipe rather than a 3,000px column.
 *
 * Motion is directional (`FramesTimeline`): frames open in alternating
 * directions as they arrive, like pages being laid on a desk.
 */
const LAYOUT = [
  { li: 'lg:col-span-4', frame: 'aspect-[4/5]', reveal: 'open-up' },
  { li: 'lg:col-span-4 lg:translate-y-16', frame: 'aspect-[4/5]', reveal: 'open-down' },
  { li: 'lg:col-span-4', frame: 'aspect-[4/5]', reveal: 'open-up' },
  { li: 'lg:col-span-6', frame: 'aspect-[3/2]', reveal: 'open-right' },
  { li: 'sm:col-span-2 lg:col-span-6 lg:translate-y-16', frame: 'aspect-[3/2] sm:aspect-[21/9] lg:aspect-[3/2]', reveal: 'open-left' },
] as const

export function ProgramsShowcase() {
  const flagship = programEntries.find((entry) => entry.flagship) ?? programEntries[0]!
  const rest = programEntries.filter((entry) => entry.id !== flagship.id)
  const flagshipFrame = programFrames[flagship.id as keyof typeof programFrames]

  return (
    <section
      id="programs"
      data-film="programs"
      aria-labelledby="programs-heading"
      className="relative bg-(--color-ground-house) pb-[calc(var(--section-comfortable)+4rem)] pt-(--section-compact)"
    >
      <FilmMargin wide>
        <div className="grid gap-8 border-t border-(--color-border-default) pt-(--section-compact) lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{programsShowcase.label}</Eyebrow>
            <h2 id="programs-heading" data-reveal-lines className={`mt-7 max-w-[18ch] text-(--color-text-primary) ${DISPLAY_SECTION}`}>
              {programsShowcase.heading}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] font-body text-body-lg text-(--color-text-secondary)">{programsShowcase.lead}</p>
            <TextLink href={programsShowcase.allLink.href} className="mt-3">
              {programsShowcase.allLink.label}
            </TextLink>
          </div>
        </div>

        {/* The flagship. */}
        <article
          data-program={flagship.id}
          aria-labelledby={`program-${flagship.id}`}
          className="mt-14 grid items-end gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10"
        >
          <Link href={flagship.route ?? '/programs'} tabIndex={-1} aria-hidden="true" className="group block lg:col-span-7">
            <MediaFrame
              photo={'photo' in flagshipFrame ? flagshipFrame.photo : undefined}
              alt={'alt' in flagshipFrame ? flagshipFrame.alt : ''}
              reveal="open-right"
              sizes="(min-width: 1280px) 660px, (min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/3] w-full"
              position="center 45%"
              imgClassName="transition-transform duration-[1400ms] ease-(--ease-stage) group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </Link>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="font-display text-label uppercase text-(--color-text-muted)">
              <span className="tabular-nums">No. 01</span>
              <span aria-hidden="true"> · </span>
              {programsShowcase.flagshipLabel}
            </p>
            <h3
              id={`program-${flagship.id}`}
              className="mt-4 font-body text-[clamp(2.125rem,1.5rem+2.2vw,3.5rem)] italic leading-[1.02] tracking-[-0.015em] text-(--color-text-primary)"
            >
              <Link href={flagship.route ?? '/programs'} className="underline-offset-[8px] decoration-1 hover:underline">
                {flagship.name}
              </Link>
            </h3>
            <p className="mt-5 max-w-[42ch] font-body text-body-lg text-(--color-text-secondary)">{flagship.summary}</p>
            <ul className="mt-7 border-t border-(--color-border-default)">
              {flagship.facts.map((fact) => (
                <li
                  key={fact}
                  className="border-b border-(--color-border-default) py-3 font-display text-body-sm text-(--color-text-primary)"
                >
                  {fact}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-7">
              <TextLink href={programsShowcase.journeyLink.href} arrow="↓">
                {programsShowcase.journeyLink.label}
              </TextLink>
              <TextLink href={flagship.route ?? '/programs'}>Program details</TextLink>
            </div>
          </div>
        </article>

        {/* The others. */}
        <div className="mt-20 lg:mt-28">
          <p className="font-display text-label uppercase text-(--color-text-muted)">{programsShowcase.moreLabel}</p>
          <div
            role="region"
            aria-label={programsShowcase.moreLabel}
            tabIndex={0}
            className="mx-[calc(var(--grid-margin)*-1)] mt-6 overflow-x-auto overscroll-x-contain px-(--grid-margin) pb-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex snap-x snap-mandatory gap-5 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
              {rest.map((entry, index) => {
                const layout = LAYOUT[index] ?? LAYOUT[0]
                const frame = programFrames[entry.id as keyof typeof programFrames]
                const href = entry.route ?? '/programs'
                return (
                  <li
                    key={entry.id}
                    data-program={entry.id}
                    className={cn('w-[78%] shrink-0 snap-start sm:w-auto', layout.li)}
                  >
                    <Link href={href} className="group block">
                      <MediaFrame
                        photo={'photo' in frame ? frame.photo : undefined}
                        plate={'plate' in frame ? frame.plate : undefined}
                        alt={'alt' in frame ? frame.alt : ''}
                        reveal={layout.reveal}
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 78vw"
                        className={cn('w-full', layout.frame)}
                        imgClassName="transition-transform duration-[1400ms] ease-(--ease-stage) group-hover:scale-[1.035] motion-reduce:transition-none"
                      />
                      <div className="mt-5 flex items-baseline gap-4">
                        <span className="font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                          No.&nbsp;{String(index + 2).padStart(2, '0')}
                        </span>
                        <h3 className="font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] decoration-1 group-hover:underline">
                          {entry.name}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-[44ch] font-body text-body-md text-(--color-text-secondary)">{entry.summary}</p>
                      <p className="mt-3 font-display text-body-sm text-(--color-text-muted)">{entry.facts.join(' · ')}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </FilmMargin>
    </section>
  )
}
