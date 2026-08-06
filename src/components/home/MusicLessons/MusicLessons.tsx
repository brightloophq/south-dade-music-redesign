import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { Emerge } from '@/components/motion/Emerge'
import { instruments, lessonsSection } from '@/content/home'

/**
 * Music lessons.
 *
 * ## What changed in refinement
 *
 * This was seven bordered rectangles in a four-column grid, each containing a
 * word and an age. It was the weakest object on the page — a component
 * showcase, and the fourth grid in a row.
 *
 * It is now a **cast list**: names set large, the age beneath in small type,
 * hairline-separated, flowing across the measure. That is the theatre's own
 * convention for listing a company, and it costs nothing but confidence.
 *
 * The instruments are the most emotionally loaded nouns on the page — piano,
 * guitar, drums, violin — and boxing each one in a rectangle drained them. Set
 * at `heading-lg` with air around them they read as a promise rather than a
 * product matrix.
 *
 * ⚠️ Keyboard is still omitted: the source lists it as sold without a page, and
 * the current site carries a Keyboard tile that links nowhere.
 *
 * ⚠️ No icons. The seven bespoke instrument marks are brand assets to be drawn
 * on the design grid (04-design-system.md §12); a generic Lucide glyph would be
 * a wrong mark, and a wrong mark is worse than none.
 */
export function MusicLessons() {
  return (
    <Section register="desk" density="spacious" id="lessons" aria-labelledby="lessons-heading" contained={false}>
      <Container width="wide">
        <Emerge>
          <div className="grid gap-6 lg:grid-cols-12">
            <Text token="heading-lg" as="h2" id="lessons-heading" className="lg:col-span-5">
              {lessonsSection.heading}
            </Text>
            <Text token="body-lg" className="max-w-[42ch] text-(--color-text-secondary) lg:col-span-6 lg:col-start-7">
              {lessonsSection.lead}
            </Text>
          </div>
        </Emerge>

        {/*
          A cast list. Two columns at `lg` so the eye reads down rather than
          across — a seven-item row would land four-and-three and look broken.
        */}
        <ul className="mt-16 grid grid-cols-1 gap-x-(--grid-gutter) border-t border-(--color-border-default) lg:grid-cols-2">
          {instruments.map((instrument) => (
            <li
              key={instrument.id}
              className="flex items-baseline justify-between gap-6 border-b border-(--color-border-default) py-6"
            >
              <span className="font-display text-heading-lg font-semibold text-(--color-text-primary)">
                {instrument.name}
              </span>
              <span className="shrink-0 font-body text-body-sm text-(--color-text-muted)">
                {instrument.startAge}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
