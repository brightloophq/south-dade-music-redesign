import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page/PageShell'
import type { Instrument } from '@/content/lessons'
import { trialOffer } from '@/content/pages'

/**
 * The instrument lesson page.
 *
 * One template, seven routes. Every string comes from the typed `Instrument`
 * record generated from the extraction — nothing is written here, so no page
 * can drift from its source, and a correction to the extraction propagates to
 * all seven at once.
 *
 * ## Structure
 *
 * overview → who it is for → starting age → format → what they learn →
 * equipment → programme connections → FAQs → book a trial
 *
 * ## Two conflicts are carried, not resolved
 *
 * **Format.** Each page ships its own verbatim format line, because that is
 * what that page says. Five instrument pages claim all lessons in that
 * instrument are private while four other pages sell group instruction in the
 * same instruments — so the line is attributed to this instrument rather than
 * generalised into a site-wide claim.
 *
 * **Frequency.** Same treatment. Every instrument page says one lesson per
 * week; `/resources/` says two classes weekly. Seven pages against two, and no
 * evidence for either, so neither is promoted to a site-wide fact.
 *
 * ## What is deliberately absent
 *
 * No price, no lesson length, no guarantee, no scholarship note. None of the
 * seven source pages states any of them, and three of the four are gated
 * anyway. The source pages also ended in a block of unlinked text CTAs —
 * "Contact us to schedule a lesson" with no link — which is why every route out
 * of this page is a real control.
 */
export function InstrumentLessonPage({ instrument }: { instrument: Instrument }) {
  const {
    name,
    description,
    recommendedAge,
    lessonFormat,
    lessonFrequency,
    skillLevel,
    equipmentNeeded,
    benefits,
    curriculum,
    programConnections,
    faqs,
  } = instrument

  return (
    <>
      <PageIntro eyebrow="Music lessons" heading={`${name} lessons`} lead={description}>
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      {/*
        The facts a parent scans for, as data rather than prose. Tabular so the
        eye can compare them against another instrument in one pass.
      */}
      <Movement name="at-a-glance" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-2">
              <DeskLabel>At a glance</DeskLabel>
            </div>
            <dl className="max-w-[840px]">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Starting age
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  Most children can begin {recommendedAge}.
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Format
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {lessonFormat}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Frequency
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {lessonFrequency}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Who it is for
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {skillLevel}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Equipment
                </dt>
                <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                  {equipmentNeeded}
                </dd>
              </div>
            </dl>
          </div>
        </FilmMargin>
      </Movement>

      <DeskSection label="What students learn" id="curriculum">
        <PointList items={curriculum} />
      </DeskSection>

      <DeskSection label="What it builds" id="benefits">
        <PointList items={benefits} />
      </DeskSection>

      {programConnections.length ? (
        <DeskSection label="Where it leads" id="programme-connections">
          <PointList items={programConnections} />
          <p className="mt-8 font-body text-body-md text-(--color-text-secondary)">
            Every instrument leads to the same place —{' '}
            <Link
              href="/programs/90-day-stage-program"
              className="text-(--color-text-primary) underline underline-offset-[6px]"
            >
              the 90-Day Stage Program
            </Link>
            .
          </p>
        </DeskSection>
      ) : null}

      {faqs.length ? (
        <DeskSection label="Questions" id="faqs">
          <dl>
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="border-t border-(--color-border-default) py-7 first:border-t-0 first:pt-0"
              >
                <dt className="font-display text-heading-md text-(--color-text-primary)">
                  {faq.q}
                </dt>
                <dd className="mt-3 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </DeskSection>
      ) : null}

      {/*
        The source page ended here with unlinked text: "Contact us to schedule
        a lesson", "Visit our South Dade studio". Every instrument page lost the
        visitor at the bottom of the funnel. This one does not.
      */}
      <Movement name="instrument-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Start</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {trialOffer.terms}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
                <Link
                  href="/lessons"
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  All instruments
                </Link>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
