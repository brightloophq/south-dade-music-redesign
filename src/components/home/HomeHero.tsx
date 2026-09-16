import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { DISPLAY_HERO } from '@/components/ui/Editorial'
import { hero } from '@/content/home'

/**
 * THE OPENING — client-review rebuild.
 *
 * ## What it replaces
 *
 * The opening was type on flat black with a masked backstage clip at 42%
 * opacity and a ghost "90" — followed by the Reframe and three pinned Walk
 * frames, four more near-empty dark viewports, before a visitor saw anything
 * that proved this academy exists. Measured, the first authentic photograph
 * arrived at roughly y=5,400px.
 *
 * ## What it is now
 *
 * The same room, lit. Two students playing bass and guitar on the South Dade
 * stage fill the frame from the first paint; the film's language survives as
 * the letterbox, the grain, the single warm source and the pitch grade — not
 * as absence.
 *
 *   identity   who and where, as a stage direction
 *   statement  the promise, at hero size
 *   lead       one plain sentence for a first-time visitor
 *   actions    the trial (primary) and the way in (secondary)
 *   facts      four verified facts under a hairline
 *
 * ## Motion (see `HeroTimeline`)
 *
 * Cinematic and slow: the photograph settles from a long push-in as the
 * preloader lifts, the statement rises line by line from a mask, the rest
 * follows. On scroll the plate drifts and the grade deepens. Nothing here
 * waits for motion: every element is fully visible in the server HTML, and the
 * photograph is the LCP element at `priority`.
 */
export function HomeHero() {
  return (
    <section
      data-film="opening"
      data-ground="pitch"
      data-register="house"
      aria-labelledby="hero-heading"
      className="relative isolate -mt-16 flex min-h-svh flex-col justify-end overflow-hidden bg-(--color-ground-pitch) lg:-mt-[72px]"
    >
      <div data-hero-plate className="absolute inset-0 -z-20 origin-[60%_50%]">
        <MediaFrame
          photo="ensemble-guitars"
          alt="Two South Dade Music students playing bass and electric guitar side by side on stage under red and blue light."
          sizes="100vw"
          priority
          rounded={false}
          className="size-full"
          imgClassName="object-[62%_center] lg:object-[center_38%]"
        />
      </div>

      {/*
        THE GRADE. Two scrims, both for legibility and neither a filter on the
        photograph: pitch from the left where the type sits, and from the floor
        so the fact strip always has ground under it.
      */}
      <div
        aria-hidden="true"
        data-hero-grade
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,7,11,0.9)_0%,rgba(5,7,11,0.62)_38%,rgba(5,7,11,0.12)_78%)] max-lg:bg-[linear-gradient(180deg,rgba(5,7,11,0.35)_0%,rgba(5,7,11,0.2)_30%,rgba(5,7,11,0.92)_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-(--color-ground-pitch) to-transparent"
      />
      {/* One warm source, house right — the light every movement shares. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_88%_30%,rgba(76,173,103,0.14),transparent_70%)]"
      />

      {/*
        Bottom padding clears the 60px letterbox bar. It is a fixed value, not
        `--letterbox-h`, because the bar animates and padding that followed it
        would shift layout.
      */}
      <FilmMargin wide className="relative z-[3] pb-[92px] pt-36 lg:pb-[108px] lg:pt-44">
        <div data-hero-content>
          <div className="max-w-[46rem]">
            <p data-hero-item className="font-display text-label uppercase text-n-200">
              {hero.identity}
            </p>

            <h1 id="hero-heading" data-hero-heading className={`mt-6 text-n-50 ${DISPLAY_HERO}`}>
              {hero.headingLines.join(' ')}
            </h1>

            <p data-hero-item className="mt-7 max-w-[36rem] font-body text-body-lg text-n-100">
              {hero.lead}
            </p>

            <div data-hero-item className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Button href={hero.primaryCta.href} size="lg" price={hero.primaryCta.price}>
                {hero.primaryCta.label}
              </Button>
              <Link
                href={hero.exploreCta.href}
                className="group inline-flex min-h-11 items-center gap-2 font-display text-body-md font-medium text-n-50 underline decoration-white/35 underline-offset-[7px] transition-[text-decoration-color] duration-(--duration-base) hover:decoration-white"
              >
                {hero.exploreCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-(--duration-base) ease-(--ease-stage) group-hover:translate-y-0.5 motion-reduce:transition-none"
                >
                  ↓
                </span>
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4 lg:mt-20">
            {hero.factStrip.map((fact) => (
              <div key={fact.label} data-hero-fact>
                <dt className="font-display text-label uppercase text-(--color-ash)">{fact.label}</dt>
                <dd className="mt-1.5 font-body text-body-lg italic text-n-50">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </FilmMargin>
    </section>
  )
}
