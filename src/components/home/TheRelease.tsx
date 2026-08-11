import { FilmMargin, Movement } from '@/components/film'
import { Photo } from '@/components/media/Photo'

/**
 * SHOT 07 A→B — First Note, then the house lights. Pinned sequence №2 of 2.
 *
 * The Film.html: *"Whip to the audience POV for one beat — the only cut in the
 * film. The flash is not photographed; it is experienced. Full warm white,
 * 400ms, then a 1.8s physical rise from stage blue to ivory. Never a fade — a
 * dimmer. One note. Whatever instrument she chose. Held."*
 *
 * > *"The climax and the exhale. The film ends here; the desk begins."*
 *
 * ## The three beats are non-negotiable lengths
 *
 *   1500ms  stillness at the mark — no easing, no micro-motion, nothing
 *    400ms  hard cut to flash. The shout appears at full size instantly
 *   1800ms  letterbox retraction and dimmer rise to ivory
 *
 * A longer flash reads as a transition rather than a cut. A shorter stillness
 * does not build nerve. These are in the token layer as `--duration-still`,
 * `--duration-release` and `--duration-houselights`.
 *
 * ## The shout is deliberately blank
 *
 * Visual Specification.md, open item 1: *"the single largest piece of type on
 * the site is intentionally blank."* The word is the owner's to choose and is
 * not ours to invent.
 *
 * So this ships as the **typeset silence**: the 5px rule that holds the word's
 * baseline, at the exact width and position the word will occupy, with the
 * space reserved so that setting it later causes no layout shift.
 *
 * The blank slot is `aria-hidden` — there is no word to announce, and a screen
 * reader must not be handed an empty heading.
 *
 * ## ⚠️ MI2 — the caption that explained the absence is GONE
 *
 * It read: *"The largest word on this site. The owner's to choose — not ours
 * to invent."*
 *
 * That is design-review language and it was shipping as customer-facing copy,
 * on a nearly empty cream screen, at the climax of the film. A visitor was
 * being told about an unresolved production decision.
 *
 * The unresolved state now lives where it belongs — the internal review tool,
 * under MI2 — and the word is still not invented here. What the beat carries
 * instead is the stage direction the film has been building toward, which is
 * true whatever word eventually lands on the rule.
 *
 * The movement is also 64svh rather than a full screen: it was spending 900px
 * of scroll on a horizontal rule.
 */
export function TheRelease() {
  return (
    <Movement
      name="release"
      ground="flash"
      className="relative flex min-h-[52svh] flex-col justify-center overflow-hidden py-(--section-comfortable)"
    >
      <FilmMargin className="relative z-[3]">
        {/*
          THE SHOUT SLOT.

          `--text-display-xl` reserves the full 96→180px line box so the word
          can be dropped in without moving anything. The rule sits on the
          baseline the word will share.
        */}
        <div
          aria-hidden="true"
          data-shout-slot
          className="flex items-end"
          style={{ minHeight: 'calc(var(--text-display-xl) * 0.95)' }}
        >
          <div className="h-[5px] w-full max-w-[1140px] bg-(--color-n-900)" />
        </div>

        {/*
          The one note. ✍️ AUTHORED, and deliberately a stage direction rather
          than a claim — it describes the film's own climax, which is the same
          register as every other line in the dark, and it asserts nothing about
          the business that the business has not published.
        */}
        {/*
          THE LINE AND THE MOMENT IT DESCRIBES, ON ONE AXIS.

          This beat was a rule, a sentence, and most of a screen of empty ivory.
          Measured: a 1,007px frame carrying 687px of content — 160px of padding
          above and below, `justify-end` pushing everything down, and the
          photograph stacked *under* the line so it entered the viewport long
          after the words it belongs to. At the climax of the film it read as an
          unfinished page.

          It is now one composition. The rule still runs full width; beneath it
          the line and the photograph share a single axis, text left at a narrow
          measure, image right and larger. The frame is 52svh and centred rather
          than 64svh and bottom-aligned, so the ivory that remains is breathing
          room rather than a gap.

          Audit #18 is the photograph of exactly this sentence: an instructor
          leaning down to hand a microphone to a very small child in a waistcoat,
          on stage, the academy banner behind them, an audience already seated.
          The half-second before a first note. No generated image could have
          supplied it.

          Approval basis: OWNER APPROVED EXISTING PORTFOLIO.
        */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-14">
          <p className="max-w-[26ch] font-body text-whisper italic text-(--color-ash)">
            One note. Whatever instrument she chose. Held.
          </p>

          <figure>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-(--radius-media-sm) bg-(--color-ground-pitch) sm:rounded-(--radius-media)">
              <Photo
                id="first-note"
                alt="An instructor leaning down to hand a microphone to a small child in a waistcoat on the South Dade Music stage, with the academy banner behind them and an audience seated."
                position="center 42%"
                sizes="(min-width: 1024px) 660px, 100vw"
              />
            </div>
          </figure>
        </div>
      </FilmMargin>
    </Movement>
  )
}

/**
 * SHOT 07B — the house lights coming up. **Rebuilt in MI2.**
 *
 * ## What this was
 *
 * A 46svh gradient carrying one line, followed — several hundred pixels later,
 * inside the business-introduction movement — by the first authentic
 * photograph, set as a 2.39:1 band. The film spent seven and a half viewports
 * walking a child toward a stage and then showed you that stage in a strip.
 *
 * The gradient and the photograph were doing the same job in two places, and
 * neither was doing it well.
 *
 * ## What it is now
 *
 * One movement, and the payoff of the entire dark opening:
 *
 *   darkness  →  the scrim lifts and the exposure rises
 *             →  the real South Dade stage fills the viewport
 *             →  the whisper hands over and the desk begins
 *
 * The photograph occupies `100svh`. The rise is scrubbed, so the visitor pulls
 * the lights up themselves — the same gesture the Walk uses, which is why this
 * reads as the end of that walk rather than as a new section.
 *
 * ## The photograph is not filtered
 *
 * The animation is a **scrim and an exposure envelope**, both of which resolve
 * to nothing: at the end of the timeline the image is at `brightness(1)` with
 * the overlay at zero opacity. Whatever the visitor ends up looking at is the
 * photograph as taken. A permanent grade would have made a documentary image
 * into an art-directed one, which is the line MI1 established and this must not
 * cross.
 *
 * ## Reduced motion
 *
 * `FilmDirector` never registers the timeline, so the element renders at its
 * static values — and the static values are the LIT state. Someone who has
 * asked for less motion gets the photograph immediately and completely; they
 * lose the reveal, not the payoff.
 */
export function HouseLightsReveal() {
  return (
    <section
      data-film="houselights"
      data-register="house"
      aria-labelledby="houselights-heading"
      className="relative isolate min-h-svh overflow-hidden bg-(--color-ground-pitch)"
    >
      <h2 id="houselights-heading" className="sr-only">
        The South Dade Music stage
      </h2>

      {/*
        MI1 asset, MI2 staging. `stage-set-floral` is audit #65: this academy's
        own stage, dressed, Casio keyboards and a drum kit under a green and
        purple wash, the SOUTH DADE MUSIC banner reading "build community. make
        music." at the left. Nobody is on it.

        ⚠️ PREVIEW ONLY. Copyright (I-7) unconfirmed.
      */}
      {/*
        The crop is responsive, and it has to be.

        The frame is 3:2 landscape and the viewport it fills is portrait on a
        phone, so a single `object-position` cannot serve both — and the axis
        that matters is not the obvious one.

        At 390×844 the image covers by height, so the *whole* height is already
        in frame and a vertical offset does nothing at all. What gets cropped is
        the width: only about a third of it survives, and centring that third
        lands on a keyboard and an empty floor. The banner reading "build
        community. make music." sits at roughly 45% across, just outside it —
        and that banner is the reason this photograph is the payoff.

        So below `sm` the frame moves *horizontally* to 40%, which puts the
        banner and the kit in the window, and returns to `center 58%` once the
        viewport is wide enough to show the composition as shot.

        Expressed as utilities on the image rather than as the inline
        `object-position` the component usually writes, because inline styles
        cannot carry a media query — so `MediaReview` takes no `position` here
        and the two crops are ordinary responsive classes.
      */}
      <div data-houselights-plate className="absolute inset-0">
        <Photo
          id="stage-floral"
          reveal="none"
          alt="The South Dade Music stage, dressed and empty: keyboards, a drum kit and congas under coloured lighting, with the academy banner reading build community, make music."
          imgClassName="object-[40%_center] sm:object-[center_58%]"
          sizes="100vw"
        />
      </div>

      {/*
        THE SCRIM. Starts opaque and lifts — this is the dark the visitor has
        been in for the whole film, leaving the room. It animates to zero, so
        the photograph ends up completely uncovered.
      */}
      <div
        aria-hidden="true"
        data-houselights-scrim
        className="pointer-events-none absolute inset-0 bg-(--color-ground-pitch) opacity-0"
      />

      {/*
        The last line of the film, held against the dark and handed over as the
        light arrives.
      */}
      <FilmMargin className="relative z-[3] flex min-h-svh items-start py-(--section-spacious)">
        <p
          data-houselights-line
          className="font-body text-whisper italic text-(--color-ground-house)"
        >
          The house lights come up.
        </p>
      </FilmMargin>
    </section>
  )
}
