import { FilmMargin, GhostNumeral, Movement } from '@/components/film'
import { journey } from '@/content/home'

/**
 * SHOTS 04–06 — The Walk. Pinned sequence №1 of 2.
 *
 * The Film.html: *"Tracking right at walking pace, locked to the floor line.
 * Scroll = footsteps: 100vh per 12 steps. 35mm widening to 24mm — the space
 * opens as she commits. One source, house right. Intensity 8%→20% across three
 * shots. It never moves; she moves toward it. Dread converting to nerve."*
 *
 * > *"The visitor stops scrolling a page and starts crossing a floor."*
 *
 * ## Built static first, pinned second
 *
 * README §Implementation order 5: *"Mobile and reduced-motion use the static
 * three-frame cut — build that first; the pin is an enhancement of it."*
 *
 * That is exactly what this is. The markup below is three complete frames that
 * read correctly stacked, with no JavaScript at all: each carries its own
 * ghost numeral, its own floor line, its own dot position and its own line of
 * copy. The Walk timeline pins the container and cross-fades between them; if
 * it never runs, the visitor scrolls three frames and gets the same story.
 *
 * The floor line is **continuous across all three frames** — it is the same
 * floor, and the cut does not interrupt it. That continuity is what makes the
 * three frames read as one walk rather than three slides.
 *
 * ## The wrapper carries the wing ground
 *
 * Once the pin stacks the three frames and cross-fades between them, both the
 * outgoing and incoming frames are briefly semi-transparent. With no ground on
 * the wrapper the ivory page background showed straight through and washed the
 * whole walk out to grey — the cross-fade has to composite over dark, not over
 * the desk.
 *
 * ## The dot is the child
 *
 * It crosses the full frame: 150px (the film margin) at week 1, centre at week
 * 6, 1180px at week 12 — where it brightens to ivory and picks up the one
 * glow. The light source never moves.
 */

/** Per-frame staging. Positions are percentages so the pin scrubs cleanly. */
const FRAMES = [
  {
    id: 'weeks-1-10',
    numeral: '1',
    ghost: '#131824',
    ground: 'wing' as const,
    dot: '10%',
    dotClass: 'size-[13px] bg-stage-600',
    glow: null,
    line: 'Alone, in a room with the door closed.',
  },
  {
    id: 'week-11',
    numeral: '6',
    ghost: '#131824',
    ground: 'wing' as const,
    dot: '48%',
    dotClass: 'size-[13px] bg-[#c9c3b4]',
    glow: 'radial-gradient(ellipse 480px 640px at 86% 62%, rgba(233,162,59,0.08), transparent 70%)',
    line: 'For one person. Then for the class.',
  },
  {
    id: 'week-12',
    numeral: '12',
    ghost: '#141a2c',
    ground: 'stage' as const,
    dot: '82%',
    dotClass: 'size-[17px] bg-(--color-ground-house) shadow-(--shadow-spotlight)',
    glow: 'radial-gradient(ellipse 560px 780px at 82% 55%, rgba(233,162,59,0.2), transparent 70%)',
    line: 'She reaches her mark. Everything stops.',
  },
]

export function TheWalk() {
  return (
    <section
      data-film="walk"
      data-register="house"
      aria-labelledby="walk-heading"
      className="relative bg-(--color-ground-wing)"
    >
      <h2 id="walk-heading" className="sr-only">
        {journey.heading}
      </h2>

      {FRAMES.map((frame, index) => (
        <Movement
          key={frame.id}
          as="div"
          name={`walk-frame-${index + 1}`}
          ground={frame.ground}
          data-walk-frame={index + 1}
          className="flex min-h-svh flex-col justify-end overflow-hidden py-(--section-feature)"
        >
          {frame.glow ? (
            <div
              aria-hidden="true"
              data-walk-glow
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: frame.glow }}
            />
          ) : null}

          <GhostNumeral
            value={frame.numeral}
            color={frame.ghost}
            className="left-[var(--grid-margin)] top-[8%]"
          />

          {/*
            The floor. One hairline, at the same height in every frame, so the
            eye reads it as continuous across the cuts.
          */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-[190px] h-px bg-stage-700" />

          {/* The child. */}
          <div
            aria-hidden="true"
            data-walk-dot
            className={`absolute bottom-[184px] rounded-full ${frame.dotClass}`}
            style={{ left: frame.dot }}
          />

          <FilmMargin className="relative z-[3]">
            <p className="max-w-[460px] font-body text-whisper italic text-(--color-ash)">
              {frame.line}
            </p>
          </FilmMargin>
        </Movement>
      ))}
    </section>
  )
}
