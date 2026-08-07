import { FilmMargin, Movement } from '@/components/film'
import { reframe, theTurn } from '@/content/home'

/**
 * SHOT 03 — the Reframe, and the Turn that follows it.
 *
 * The Film.html: *"Reverse angle. We look back at the kitchen, not the stage.
 * 85mm. Close, private. None — the warmest dark on the site: memory, not fear.
 * Recognition. The diagonal is the hinge: problem upper-left, answer
 * lower-right."*
 *
 * ## The diagonal is the whole composition
 *
 * Two voices in opposite corners of a dark room. The parent's observation sits
 * upper-left in the whisper; the answer lands lower-right as a statement. The
 * reader's eye crosses the hinge, which is the persuasive move made physical —
 * this is the beat that shifts the problem from the child's character to a
 * teachable gap, and it is the most important twenty-three words on the page.
 *
 * The ground is `memory`: brown-black, not the blue-black of the walk. Nobody
 * names it; everybody feels that the past is a different temperature.
 *
 * There is no light in this movement. It is the coldest, darkest beat, and the
 * only one with no amber anywhere.
 */
export function Reframe() {
  return (
    <>
      <Movement
        name="reframe"
        ground="memory"
        aria-labelledby="reframe-heading"
        className="flex min-h-svh flex-col justify-between py-(--section-feature)"
      >
        <FilmMargin>
          <p className="max-w-[380px] font-body text-whisper italic text-(--color-ash)">
            {reframe.recognition}
          </p>
        </FilmMargin>

        <FilmMargin>
          <h2
            id="reframe-heading"
            className="ml-auto max-w-[560px] text-right font-display text-display-lg text-(--color-text-primary)"
            style={{ fontVariationSettings: "'opsz' 48, 'wght' 600" }}
          >
            {reframe.hinge}
          </h2>
        </FilmMargin>
      </Movement>

      {/*
        MOVEMENT 4 — The Turn. Ground: wing. Whisper only, eight-word cap.
        Visual Specification.md §D: "one thought, held". It gets its own screen
        and nothing else is on it.
      */}
      <Movement
        name="the-turn"
        ground="wing"
        className="flex min-h-[70svh] items-center py-(--section-feature)"
      >
        <FilmMargin>
          <p className="max-w-[640px] font-body text-whisper italic text-(--color-ash)">
            {theTurn.line}
          </p>
        </FilmMargin>
      </Movement>
    </>
  )
}
