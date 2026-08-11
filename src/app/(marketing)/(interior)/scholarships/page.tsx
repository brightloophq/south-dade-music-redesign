import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro } from '@/components/page'
import { scholarshipsPage } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Step Up for Students scholarships',
  description:
    'South Dade Music accepts PEP and Unique Abilities scholarships. These scholarships are administered and awarded by Step Up for Students.',
  path: '/scholarships',
})

/**
 * /scholarships — Tier 1, route 4 of 4.
 *
 * Built fourth because it serves the audience with the least slack: families
 * for whom a scholarship decides whether their child can take part at all.
 * In the source estate that path is blocked end to end.
 *
 * ## The disclaimer is the point
 *
 * The compliance line — *"administered and awarded by Step Up for Students,
 * not by South Dade Music"* — exists on `/resources/` and is **dropped by the
 * source's own scholarship page**, which is the single place it matters most.
 * It ships here, adjacent to the claim, as it must be.
 *
 * ## ⚠️ What is missing at source, not omitted by choice
 *
 * Eligibility criteria, application steps, the required-document list, coverage
 * amounts and any link to the administering body are published **nowhere** in
 * the estate. They cannot be migrated because they do not exist.
 *
 * So this page does the only honest thing available: it states what is known,
 * says plainly that eligibility is not ours to determine, and routes families
 * to a person. It does not invent a process, and it does not imply one exists.
 *
 * These are the highest-value owner inputs on the whole site
 * (`content-migration-coverage.md` §7).
 *
 * ## Treatment
 *
 * A formal notice with a footnote — *"dignity, not charity styling"*
 * (The Film.html, shot 10). No icon row, no tinted help panel, no rounded box.
 * The disclaimer is set small but never faint: 4.61:1 on the ivory ground.
 */
export default function ScholarshipsPage() {
  return (
    <>
      <PageIntro
        eyebrow={scholarshipsPage.eyebrow}
        heading={scholarshipsPage.heading}
        lead={scholarshipsPage.participation.body}
      />

      <DeskSection label={scholarshipsPage.whatIsIt.heading} id="what-is-step-up" ruled={false}>
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {scholarshipsPage.whatIsIt.body}
        </p>
      </DeskSection>

      <DeskSection label="The two streams" id="streams">
        <dl>
          {scholarshipsPage.streams.map((stream) => (
            <div
              key={stream.id}
              className="border-t border-(--color-border-default) py-8 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-heading-lg text-(--color-text-primary)">
                {stream.name}
                <span className="ml-3 font-display text-label uppercase text-(--color-text-muted)">
                  {stream.full}
                </span>
              </dt>
              <dd className="mt-3 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {stream.body}
              </dd>
            </div>
          ))}
        </dl>
      </DeskSection>

      <DeskSection label={scholarshipsPage.participation.heading} id="how-we-participate">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {scholarshipsPage.participation.model}
        </p>
      </DeskSection>

      <DeskSection label={scholarshipsPage.inclusive.heading} id="inclusive-approach">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {scholarshipsPage.inclusive.body}
        </p>
        <p className="mt-6 font-body text-whisper italic text-(--color-text-secondary)">
          {scholarshipsPage.inclusive.line}
        </p>
      </DeskSection>

      {/*
        The next step, and the mandatory disclaimer beneath it. The disclaimer
        is never animated — it is policy text, and it sits with the claim.
      */}
      <Movement name="scholarship-next" ground="house" className="pb-(--section-feature) pt-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{scholarshipsPage.next.heading}</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {scholarshipsPage.next.body}
              </p>
              <div className="mt-9">
                <Button href={scholarshipsPage.next.cta.href} size="lg">
                  {scholarshipsPage.next.cta.label}
                </Button>
              </div>
              <p className="mt-12 max-w-[62ch] font-body text-body-sm italic text-(--color-text-muted)">
                {scholarshipsPage.disclaimer}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
