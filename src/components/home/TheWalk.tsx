import { Atmosphere, FilmMargin, GhostNumeral, Movement } from '@/components/film'
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
/**
 * Per-frame staging.
 *
 * ## EE2 additions
 *
 * **`label`** — the programme, named in the film. Each frame now carries its
 * week band as a stage direction, so the walk is legibly *the 90-Day Stage
 * Program* rather than an unattributed mood piece. All three are ✅ VERBATIM
 * from the published week structure, and they are set at 12px in the label
 * register: information delivered cinematically, not a heading bolted on.
 *
 * **`floor`** — the opacity of the photographic floor plate in that frame. It
 * rises 0.18 → 0.30 → 0.55 across the walk, so the ground she is crossing
 * literally becomes visible as the light finds it. That is the temperature arc
 * expressed in a surface rather than only in a background colour: wing is cold
 * and the floor is barely there; stage is warm and the boards are lit.
 */
const FRAMES = [
  {
    id: 'weeks-1-10',
    numeral: '1',
    ghost: '#131824',
    ground: 'wing' as const,
    dot: '10%',
    dotClass: 'size-[13px] bg-stage-600',
    glow: null,
    floor: 0.18,
    label: 'The 90-Day Stage Program · Weeks 1–10',
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
    floor: 0.3,
    label: 'Week 11 · she plays for the class',
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
    floor: 0.55,
    label: 'Week 12 · dress rehearsal and live showcase',
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
          {/*
            THE FLOOR — EE2.

            07-the-walk.md §ACT II asks for *"a single photographic plate of a
            scuffed wooden stage floor"*. The build shipped a 1px hairline
            instead, which reads as a diagram of a floor rather than a floor.

            `atmos-stage-floor` is the one generated asset that actually depicts
            what its metadata claims: boards, lit from house right, through
            haze, no people. It is anchored to the bottom of the frame, masked
            so it dissolves upward into the dark rather than ending on an edge,
            and it sits *under* the existing hairline and dot — which stay,
            because they are the elements the timeline animates.

            Lazy-loaded and far below the fold, so the opening frame is still a
            text node on true black.
          */}
          <Atmosphere
            asset="atmos-stage-floor"
            job="The Walk — the boards she is crossing, becoming visible as the light finds them"
            opacity={frame.floor}
            position="center 78%"
            sizes="100vw"
            quality={48}
            /*
             * ⚠️ Height is capped deliberately.
             *
             * At 58% this plate became the Largest Contentful Paint element for
             * a visitor who scrolls immediately, and Next warned accordingly.
             * The correct answer is NOT `priority` — that would preload a
             * decorative below-fold image and damage the real LCP, which the
             * direction requires to be a text node on black. Capping the box
             * keeps the floor doing its job while leaving the type as the
             * largest paint.
             */
            className="top-auto bottom-0 h-[40%]"
            maskImage="linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0) 100%)"
          />

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
            {/*
              The programme, as a stage direction. Verbatim week structure, at
              label scale — the film now says what it is a film *of*.
            */}
            <p className="font-display text-label uppercase text-(--color-text-muted)">
              {frame.label}
            </p>
            <p className="mt-4 max-w-[460px] font-body text-whisper italic text-(--color-ash)">
              {frame.line}
            </p>
          </FilmMargin>
        </Movement>
      ))}
    </section>
  )
}
