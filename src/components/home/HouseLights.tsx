import { Button } from '@/components/ui/Button'
import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { DISPLAY_SECTION, Eyebrow } from '@/components/ui/Editorial'
import { finalCta } from '@/content/home'
import { contactFacts } from '@/content/pages'

/**
 * THE CALL TO ACTION — the house lights, at the end this time.
 *
 * The page opened on a stage in the dark; it closes on the room facing it.
 * The recital room with families already seated fills the frame under a pitch
 * grade, and as the section arrives the grade lifts and one warm source comes
 * up behind the words (`FinaleTimeline`) — warm and resolving, the light that
 * was rationed through the whole page, spent here.
 *
 * The guarantee is the heading's proof, verbatim and never animated. The $25
 * and its credit sit directly under the action. The phone number is the
 * human alternative beside it — the one thing a hesitant parent actually
 * wants next to a booking button.
 *
 * Static state is the lit state: without motion the grade sits at a fixed,
 * legible value and the glow is on.
 */
export function HouseLights() {
  return (
    <section
      data-film="finale"
      data-ground="pitch"
      data-register="house"
      aria-labelledby="finale-heading"
      className="relative isolate overflow-hidden bg-(--color-ground-pitch) py-(--section-spacious) text-n-50"
    >
      <div data-finale-plate className="absolute inset-0 -z-20">
        <MediaFrame
          photo="recital-room"
          alt="The South Dade Music recital room during a showcase: rows of families seated on folding chairs facing the stage."
          sizes="100vw"
          rounded={false}
          className="size-full"
          position="center 55%"
        />
      </div>
      <div
        aria-hidden="true"
        data-finale-scrim
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,7,11,0.93)_0%,rgba(5,7,11,0.8)_45%,rgba(5,7,11,0.5)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,7,11,0.7)_0%,rgba(5,7,11,0.9)_60%)]"
      />
      <div
        aria-hidden="true"
        data-finale-glow
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_18%_60%,rgba(76,173,103,0.16),transparent_70%)]"
      />

      <FilmMargin wide>
        <div className="max-w-[46rem]">
          <Eyebrow>{finalCta.guaranteeLabel}</Eyebrow>
          <h2 id="finale-heading" data-reveal-lines className={`mt-7 max-w-[18ch] ${DISPLAY_SECTION}`}>
            {finalCta.heading}
          </h2>
          <p className="mt-7 max-w-[52ch] font-body text-body-lg text-n-100">{finalCta.guarantee}</p>

          <div data-finale-actions className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={finalCta.cta.href} size="lg" price={finalCta.cta.price}>
              {finalCta.cta.label}
            </Button>
            <a
              href={contactFacts.phoneHref}
              className="inline-flex min-h-11 items-center font-display text-body-md font-medium text-n-50 underline decoration-white/35 underline-offset-[7px] hover:decoration-white"
            >
              Or call {contactFacts.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 max-w-[52ch] font-body text-body-sm text-n-200">{finalCta.trialNote}</p>
        </div>
      </FilmMargin>
    </section>
  )
}
