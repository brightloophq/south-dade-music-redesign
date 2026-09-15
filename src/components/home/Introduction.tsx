import Link from 'next/link'

import { DESK_SENTINEL_ID, FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Caption, DISPLAY_SECTION, Eyebrow } from '@/components/ui/Editorial'
import { introduction } from '@/content/home'

/**
 * WHAT SOUTH DADE IS — the house lights.
 *
 * The first light section, and the one that carries `#desk-begins`: the
 * letterbox retracts, the grain stops and the header turns ivory as it arrives,
 * so the film ends exactly where the business introduces itself.
 *
 * ## Composition
 *
 * Statement left, the room right. The large frame is the academy's own stage
 * with the banner that reads *build community, make music* — the tagline set
 * beside it is literally printed in the photograph. A small detail frame (a
 * hand on a violin) overlaps its lower corner on an ivory mat, so the pair
 * reads as one layered composition: the place, and the practice that happens
 * in it.
 *
 * Motion is editorial (`IntroTimeline`): the stage opens left-to-right, the
 * detail rises into place a beat later and keeps a slow counter-drift on
 * scroll, which is where the sense of depth comes from.
 */
export function Introduction() {
  return (
    <section
      id={DESK_SENTINEL_ID}
      data-film="introduction"
      aria-labelledby="intro-heading"
      className="relative bg-(--color-ground-house) py-(--section-comfortable)"
    >
      <FilmMargin wide>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:pt-6">
            <Eyebrow>{introduction.label}</Eyebrow>
            <h2 id="intro-heading" data-reveal-lines className={`mt-7 max-w-[15ch] text-(--color-text-primary) ${DISPLAY_SECTION}`}>
              {introduction.statement}
            </h2>
            <p data-intro-item className="mt-6 font-body text-heading-lg italic text-(--color-text-primary)">
              {introduction.tagline}
            </p>
            <p data-intro-item className="mt-7 max-w-[46ch] font-body text-body-lg text-(--color-text-secondary)">
              {introduction.body}
            </p>

            <dl data-intro-item className="mt-10">
              {introduction.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-(--color-border-default) py-4"
                >
                  <dt className="font-display text-label uppercase text-(--color-text-muted)">{fact.label}</dt>
                  <dd className="font-body text-body-md text-(--color-text-primary)">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p data-intro-item className="mt-6 flex flex-wrap gap-x-7 gap-y-1">
              {introduction.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-display text-label uppercase text-(--color-text-primary) underline decoration-(--color-border-default) underline-offset-[7px] hover:decoration-current"
                >
                  {link.label}
                </Link>
              ))}
            </p>
          </div>

          <div className="relative pb-20 lg:col-span-7 lg:pb-28">
            <figure>
              <MediaFrame
                photo={introduction.main.photo}
                alt={introduction.main.alt}
                reveal="open-right"
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 56vw, 100vw"
                className="aspect-[4/3] w-full"
                position="center 55%"
              />
              <Caption className="ml-auto max-w-[52%] text-right">{introduction.main.caption}</Caption>
            </figure>

            <div
              data-intro-detail
              className="absolute bottom-0 left-4 w-[42%] rounded-(--radius-media) bg-(--color-ground-house) p-1.5 sm:left-8 sm:w-[28%] lg:-left-10 lg:w-[36%] lg:p-2"
            >
              <MediaFrame
                photo={introduction.detail.photo}
                alt={introduction.detail.alt}
                reveal="rise"
                sizes="(min-width: 1024px) 240px, 40vw"
                className="aspect-[4/5] w-full"
                position="center 40%"
              />
            </div>
          </div>
        </div>
      </FilmMargin>
    </section>
  )
}
