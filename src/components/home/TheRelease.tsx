import { FilmMargin, Movement } from '@/components/film'

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
 * space reserved so that setting it later causes no layout shift. The caption
 * beneath explains the absence rather than hiding it.
 *
 * The blank slot is `aria-hidden` — there is no word to announce, and a screen
 * reader must not be handed an empty heading. The meaning of this movement is
 * carried by the visible caption, which is real text.
 */
export function TheRelease() {
  return (
    <Movement
      name="release"
      ground="flash"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden py-(--section-feature)"
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

        <p className="mt-6 max-w-[720px] font-display text-label uppercase text-(--color-spot-700)">
          The largest word on this site. The owner&rsquo;s to choose — not ours to invent.
        </p>
      </FilmMargin>
    </Movement>
  )
}

/**
 * SHOT 07B — the house lights coming up.
 *
 * A physical rise from stage blue to ivory, not a cut and not a fade. This
 * movement is the gradient itself: the room getting brighter while you are
 * still in it. The letterbox retracts across the same 1800ms.
 *
 * It carries one line, and then the film is over.
 */
export function HouseLights() {
  return (
    <div
      data-film="houselights"
      data-register="house"
      aria-hidden="true"
      /*
        EE2 — 70svh → 46svh. This is a gradient the visitor passes through, not
        a frame they read: its only content is one line. Half a screen of
        luminance change still reads as a physical rise, and the movement
        returns ~215px.
      */
      className="relative isolate flex min-h-[46svh] items-start py-(--section-spacious)"
      style={{
        backgroundImage:
          'linear-gradient(180deg, var(--color-ground-stage) 0%, #4a4638 45%, var(--color-ground-house) 100%)',
      }}
    >
      <FilmMargin>
        <p className="font-body text-whisper italic text-(--color-ground-house) opacity-85">
          The house lights come up.
        </p>
      </FilmMargin>
    </div>
  )
}
