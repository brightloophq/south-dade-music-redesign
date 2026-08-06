import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { Emerge } from '@/components/motion/Emerge'
import { programs, programsSection } from '@/content/home'

/**
 * Programs.
 *
 * ## What changed in refinement
 *
 * This was a three-column grid of six rounded, shadowed cards — the single most
 * "Tailwind template" object on the page, and one of four consecutive grids.
 *
 * It is now an **editorial index**: full-width rows, hung on an asymmetric
 * 5/7 split, separated by hairlines rather than boxed. No radius, no shadow,
 * no fill. The programme name sits large on the left; the summary and facts
 * hang right and lower, so the eye travels diagonally down the page instead of
 * scanning a matrix.
 *
 * A numbered index is the theatre's own convention — a running order, not a
 * product catalogue. It also makes the flagship's position (01) meaningful
 * rather than decorative.
 *
 * Motion: the staggered card entrance was removed. Cards fading up in sequence
 * is the most default animation on the internet; it created no emotion and
 * reinforced no story. One quiet reveal on the header remains.
 *
 * Content is unchanged — every value is still verbatim from
 * `docs/source-content/programs.json`, and no price appears anywhere (gate B-8).
 */
export function Programs() {
  return (
    <Section register="desk" density="spacious" id="programs" aria-labelledby="programs-heading" contained={false}>
      <Container width="wide">
        <Emerge>
          <div className="grid gap-6 lg:grid-cols-12">
            <Text
              token="heading-lg"
              as="h2"
              id="programs-heading"
              className="lg:col-span-5"
            >
              {programsSection.heading}
            </Text>
            <Text token="body-lg" className="max-w-[38ch] text-(--color-text-secondary) lg:col-span-6 lg:col-start-7">
              {programsSection.lead}
            </Text>
          </div>
        </Emerge>

        <ol className="mt-16 border-t border-(--color-border-default)">
          {programs.map((program, index) => (
            <li
              key={program.id}
              className="group grid grid-cols-1 gap-4 border-b border-(--color-border-default) py-8 lg:grid-cols-12 lg:gap-(--grid-gutter) lg:py-10"
            >
              {/* The running order. Tabular so the column never shifts. */}
              <span
                aria-hidden="true"
                className="font-body text-label font-semibold tabular-nums text-(--color-text-muted) lg:col-span-1"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-heading-lg font-semibold text-(--color-text-primary) lg:col-span-5">
                {program.name}
                {program.flagship ? (
                  <span className="ml-3 align-middle font-body text-label font-semibold uppercase tracking-[0.12em] text-(--color-link-default)">
                    Flagship
                  </span>
                ) : null}
              </h3>

              <div className="lg:col-span-5 lg:col-start-8">
                <p className="max-w-[46ch] font-body text-body-md text-(--color-text-secondary)">
                  {program.summary}
                </p>
                {/*
                  Facts as a hairline-separated run rather than bullets or pills.
                  Pills would reintroduce the card language this section exists
                  to remove.
                */}
                <p className="mt-4 font-body text-body-sm text-(--color-text-muted)">
                  {program.facts.join('  ·  ')}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
