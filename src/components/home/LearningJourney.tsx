import { FilmMargin, FilmVideo } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Caption, DISPLAY_SECTION, Eyebrow, TextLink } from '@/components/ui/Editorial'
import { journeyPhases, journeySection, shyQuestion } from '@/content/home'
import { cn } from '@/lib/utils/cn'

/**
 * THE LEARNING JOURNEY — the twelve weeks, walked.
 *
 * ## What it replaces
 *
 * Two treatments of the same three facts. The Walk: three pinned dark
 * viewports with a dot crossing a hairline and a line of italic each —
 * cinematic, and 2,700px of scroll carrying twenty-one words and no picture of
 * anyone learning anything. Then, further down, the same three week bands as
 * text rows with generated still lifes.
 *
 * ## What it is now
 *
 * One section in the stage register, built as a sticky split:
 *
 *   left   the programme named, the week counter, and the question every
 *          parent asks at exactly this point ("what if my child is too shy?")
 *   right  three phases, each a composed pair — an authentic photograph of the
 *          phase and a smaller inset that carries its mood
 *
 * The Walk's best idea survives as the counter: scroll is still footsteps.
 * As each phase crosses the reading line the numeral steps 1 → 10, then 11,
 * then 12, and the twelve ticks fill in the spot green. It is decorative
 * (`aria-hidden`) — the week bands themselves are real headings in the list.
 *
 * Each phase grows: I is a portrait, II opens wider, III takes the whole
 * column — the composition says "arrival" before the motion does.
 *
 * Motion is progressive and rhythmic (`JourneyTimeline`): each frame opens with
 * its own aperture, the inset follows a half-beat later, the counter steps.
 */
const PHASE_LAYOUT = [
  { frame: 'aspect-[4/5] w-[82%] sm:w-[70%]', inset: 'right-0 bottom-12 w-[38%] aspect-[4/5] sm:right-[6%] sm:w-[36%]', reveal: 'slot' },
  { frame: 'aspect-[4/3] w-[92%] ml-auto', inset: '-top-8 left-0 w-[40%] aspect-[3/2] sm:w-[36%]', reveal: 'curtain' },
  { frame: 'aspect-[3/2] w-full', inset: '-bottom-12 right-4 w-[48%] aspect-[2/1] sm:w-[42%]', reveal: 'arrive' },
] as const

export function LearningJourney() {
  return (
    <section
      id="twelve-weeks"
      data-film="journey"
      data-ground="stage"
      data-register="house"
      aria-labelledby="journey-heading"
      className="relative isolate overflow-clip bg-(--color-ground-stage) py-(--section-comfortable) text-n-50"
    >
      {/*
        The backstage clip from the original film, kept as the room's weather:
        a masked band at the top of the section, low and dark, behind the
        heading. No people, no text; it is the only video on the page.
      */}
      <FilmVideo
        name="walk-backstage"
        job="The learning journey — the backstage room the twelve weeks walk toward"
        opacity={0.26}
        className="-z-10 h-[80svh]"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%)',
        }}
      />

      <FilmMargin wide>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(72px+3.5rem)]">
              <Eyebrow>{journeySection.label}</Eyebrow>
              <h2 id="journey-heading" data-reveal-lines className={`mt-7 max-w-[12ch] ${DISPLAY_SECTION}`}>
                {journeySection.heading}
              </h2>
              <p className="mt-6 max-w-[38ch] font-body text-body-lg text-n-200">{journeySection.lead}</p>

              <div aria-hidden="true" data-journey-counter className="mt-12 hidden lg:block">
                <div className="flex items-end gap-4">
                  <span className="pb-3 font-display text-label uppercase text-(--color-ash)">Week</span>
                  <span
                    data-journey-week
                    className="min-w-[2ch] font-display text-[7rem] font-extralight leading-[0.78] tracking-[-0.04em] tabular-nums text-n-50"
                  >
                    12
                  </span>
                  <span className="pb-3 font-display text-label uppercase text-(--color-ash)">of 12</span>
                </div>
                <div className="mt-7 grid max-w-[22rem] grid-cols-12 gap-1.5">
                  {Array.from({ length: 12 }, (_, index) => (
                    <span key={index} className="relative block h-[3px] overflow-hidden bg-stage-700">
                      <span data-journey-tick className="absolute inset-0 origin-left bg-spot-500" />
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 max-w-[40ch] border-t border-stage-700 pt-8">
                <p className="font-body text-heading-lg italic text-n-50">{shyQuestion.question}</p>
                <p className="mt-3 font-body text-body-md text-n-200">{shyQuestion.answer}</p>
                <TextLink href={journeySection.programLink.href} className="mt-5">
                  {journeySection.programLink.label}
                </TextLink>
              </div>
            </div>
          </div>

          <ol className="flex flex-col gap-28 lg:col-span-7 lg:gap-44 lg:pt-4">
            {journeyPhases.map((phase, index) => {
              const layout = PHASE_LAYOUT[index] ?? PHASE_LAYOUT[0]
              const detail = 'detail' in phase ? phase.detail : null
              return (
                <li
                  key={phase.id}
                  data-journey-phase={index + 1}
                  data-week-from={phase.counter.from}
                  data-week-to={phase.counter.to}
                  aria-labelledby={`phase-${phase.id}`}
                >
                  <figure className="relative">
                    <MediaFrame
                      photo={phase.photo}
                      alt={phase.alt}
                      reveal={layout.reveal}
                      sizes="(min-width: 1280px) 660px, (min-width: 1024px) 56vw, 92vw"
                      className={layout.frame}
                      position="center 45%"
                    />
                    <div
                      data-journey-inset
                      className={cn(
                        'absolute rounded-(--radius-media) bg-(--color-ground-stage) p-1.5 lg:p-2',
                        layout.inset.split(' ').filter((c) => !c.startsWith('aspect-')).join(' '),
                      )}
                    >
                      <MediaFrame
                        photo={detail?.photo}
                        plate={'plate' in phase ? phase.plate : undefined}
                        alt={detail?.alt ?? ''}
                        sizes="(min-width: 1024px) 280px, 40vw"
                        className={cn('w-full', layout.inset.split(' ').find((c) => c.startsWith('aspect-')))}
                      />
                    </div>
                    <Caption className={cn(index === 1 && 'text-right', index === 2 && 'max-w-[48%]')}>
                      {phase.caption}
                    </Caption>
                  </figure>

                  <div className={cn('grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6', index === 2 ? 'mt-20' : 'mt-10')}>
                    <p className="font-display text-label uppercase tabular-nums text-(--color-ash)">
                      Phase {phase.numeral}
                      <span className="block pt-1.5 text-n-50">{phase.week}</span>
                    </p>
                    <h3
                      id={`phase-${phase.id}`}
                      className="font-body text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] italic leading-[1.2] text-n-50"
                    >
                      {phase.what}
                    </h3>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mt-(--section-compact) lg:grid lg:grid-cols-12 lg:gap-10">
          <p className="font-display text-body-sm text-(--color-ash) lg:col-span-7 lg:col-start-6">
            {journeySection.footnote}
          </p>
        </div>
      </FilmMargin>
    </section>
  )
}
