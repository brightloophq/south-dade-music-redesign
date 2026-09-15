import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Caption, DISPLAY_SECTION, Eyebrow, TextLink } from '@/components/ui/Editorial'
import { performanceStory } from '@/content/home'
import { cn } from '@/lib/utils/cn'

/**
 * COMMUNITY & PERFORMANCES — the evidence, as a spread.
 *
 * Four authentic events, laid out as an asymmetric picture spread rather than
 * a gallery grid: a wide ensemble frame, a smaller frame dropped against it, a
 * band, a recital, and one family's words set in the gap between them. The
 * three verbatim performance lines sit beside the heading as the spread's
 * standfirst.
 *
 * It is ivory, between two dark sections, on purpose: this is the part of the
 * page that is in the light — families in chairs, students on a stage.
 *
 * Motion is energetic but restrained (`PerformancesTimeline`): the three lines
 * arrive from alternating sides, each frame opens, and on scroll the frames
 * drift at slightly different rates so the spread has depth without anything
 * leaving its column.
 */
const SPREAD = [
  { figure: 'col-span-2 md:col-span-7', frame: 'aspect-[3/2]', drift: '-5', reveal: 'open-right', sizes: '(min-width: 1024px) 55vw, 100vw' },
  { figure: 'col-span-1 md:col-span-5 md:mt-28', frame: 'aspect-[4/5] md:aspect-[4/3]', drift: '7', reveal: 'open-up', sizes: '(min-width: 1024px) 38vw, 50vw' },
  { figure: 'col-span-2 md:col-span-5 md:col-start-5 md:-mt-6', frame: 'aspect-[3/2]', drift: '-3', reveal: 'open-left', sizes: '(min-width: 1024px) 38vw, 100vw' },
  { figure: 'col-span-1 row-start-2 col-start-2 md:row-start-auto md:col-span-3 md:col-start-10 md:mt-24', frame: 'aspect-[4/5]', drift: '9', reveal: 'open-up', sizes: '(min-width: 1024px) 24vw, 50vw' },
] as const

export function PerformanceStory() {
  const [first, second, third, fourth] = performanceStory.frames

  return (
    <section
      data-film="performances"
      aria-labelledby="performances-heading"
      className="relative overflow-clip bg-(--color-ground-house) py-(--section-comfortable)"
    >
      <FilmMargin wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>{performanceStory.label}</Eyebrow>
            <h2 id="performances-heading" data-reveal-lines className={`mt-7 text-(--color-text-primary) ${DISPLAY_SECTION}`}>
              {performanceStory.heading}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-(--color-border-default)">
              {performanceStory.lines.map((line) => (
                <li
                  key={line}
                  data-perf-line
                  className="border-b border-(--color-border-default) py-3 font-body text-heading-md italic text-(--color-text-primary)"
                >
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[46ch] font-body text-body-md text-(--color-text-secondary)">{performanceStory.body}</p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-12 md:gap-x-5 lg:mt-20 lg:gap-x-8">
          {[first, second, third].map((frame, index) => {
            const layout = SPREAD[index]!
            return (
              <figure key={frame.photo} data-perf-drift={layout.drift} className={layout.figure}>
                <MediaFrame
                  photo={frame.photo}
                  alt={frame.alt}
                  reveal={layout.reveal}
                  sizes={layout.sizes}
                  className={cn('w-full', layout.frame)}
                />
                <Caption>{frame.caption}</Caption>
              </figure>
            )
          })}

          <figure data-perf-drift={SPREAD[3].drift} className={SPREAD[3].figure}>
            <MediaFrame
              photo={fourth.photo}
              alt={fourth.alt}
              reveal={SPREAD[3].reveal}
              sizes={SPREAD[3].sizes}
              className={cn('w-full', SPREAD[3].frame)}
            />
            <Caption>{fourth.caption}</Caption>
          </figure>

          {/* One family's words, in the gap the spread leaves for them. */}
          <figure className="col-span-2 self-end md:col-span-4 md:col-start-1 md:row-start-2 md:-mt-10 md:pr-4">
            <blockquote className="font-body text-heading-md italic leading-[1.45] text-(--color-text-primary)">
              &ldquo;{performanceStory.quote.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-display text-label uppercase text-(--color-text-muted)">
              {performanceStory.quote.author} · Google review
            </figcaption>
            <TextLink href={performanceStory.link.href} className="mt-6">
              {performanceStory.link.label}
            </TextLink>
          </figure>
        </div>
      </FilmMargin>
    </section>
  )
}
