import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { Emerge } from '@/components/motion/Emerge'
import { twelveWeeks } from '@/content/home'

/**
 * §4 — The twelve weeks, published.
 *
 * The Journey's release. Drama hands off to substance: the pin lets go, the
 * houselights come up, and the weeks arrive as type.
 *
 * ⚠️ Gates I-1 and M-3 are open — no consented showcase photograph and no
 * showcase footage exist — so this **is** the release, per
 * docs/homepage/03-motion-map.md §3.2. That is the specified fallback, and the
 * blueprint is explicit that it is a good ending rather than a compromised one:
 * it is the page's thesis made literal, House persuades and Desk proves.
 *
 * ⚠️ The verbatim lead "Two classes a week. One for skill, one for the band."
 * is **withheld**: it conflicts with seven pages stating one lesson per week
 * (docs/homepage/04-copy-framework.md §4). The week rows carry no such conflict.
 *
 * ⭐ SEO: a published week-by-week syllabus is rare in this category and is the
 * highest-value content block on the page.
 */
export function TwelveWeeks() {
  return (
    <Section register="desk" density="comfortable" id="twelve-weeks" aria-labelledby="twelve-weeks-heading" contained={false}>
      <Container width="content">
        <Emerge>
          <Text token="heading-lg" as="h2" id="twelve-weeks-heading">
            {twelveWeeks.heading}
          </Text>
          <Text token="body-lg" className="measure mt-3 text-(--color-text-secondary)">
            {twelveWeeks.lead}
          </Text>
        </Emerge>

        {/* Desktop and tablet — a real table with full semantics. */}
        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              The twelve-week structure of the 90-Day Stage Program
            </caption>
            <thead>
              <tr className="border-b border-(--color-border-default)">
                <th scope="col" className="w-40 py-3 pr-6 font-body text-label font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                  Week
                </th>
                <th scope="col" className="py-3 pr-6 font-body text-label font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                  What happens
                </th>
                <th scope="col" className="w-44 py-3 font-body text-label font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                  Milestone
                </th>
              </tr>
            </thead>
            <tbody>
              {twelveWeeks.rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.milestone
                      ? 'border-b border-(--color-border-default) border-l-2 border-l-spot-500'
                      : 'border-b border-(--color-border-default)'
                  }
                >
                  <th
                    scope="row"
                    className={`py-4 ${row.milestone ? 'pl-4' : ''} pr-6 font-display text-heading-md font-semibold tabular-nums text-(--color-text-primary)`}
                  >
                    {row.week}
                  </th>
                  <td className="py-4 pr-6 font-body text-body-md text-(--color-text-secondary)">{row.what}</td>
                  {/* Milestone status is conveyed in text, never by colour alone. */}
                  <td className="py-4 font-body text-body-sm font-semibold text-(--color-text-primary)">
                    {row.milestone ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*
          Mobile — a hairline-ruled list, not stacked cards.

          Refinement: three bordered, rounded, filled panels reproduced the card
          language this page spent its budget removing. Rules carry the same
          structure at a fraction of the visual noise, and they match the
          desktop table rather than becoming a second design.
        */}
        <ul className="mt-8 border-t border-(--color-border-default) md:hidden">
          {twelveWeeks.rows.map((row) => (
            <li
              key={row.id}
              className={`border-b border-(--color-border-default) py-5 ${
                row.milestone ? 'border-l-2 border-l-spot-500 pl-4' : ''
              }`}
            >
              <span className="font-display text-heading-md font-semibold tabular-nums text-(--color-text-primary)">
                {row.week}
              </span>
              <p className="mt-2 font-body text-body-md text-(--color-text-secondary)">{row.what}</p>
              {row.milestone ? (
                <p className="mt-2 font-body text-body-sm font-semibold text-(--color-text-primary)">{row.milestone}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-body text-body-sm text-(--color-text-muted)">{twelveWeeks.footnote}</p>
      </Container>
    </Section>
  )
}
