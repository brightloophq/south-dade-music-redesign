import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { FilmMargin, GhostNumeral, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { contactFacts, ninetyDayPage, trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: '90-Day Stage Program',
  description:
    'A step-by-step plan that helps students prepare for a live performance in about three months. Weeks 1–10 skill, week 11 the class, week 12 the showcase.',
  path: '/programs/90-day-stage-program',
})

/**
 * /programs/90-day-stage-program — Tier 1, route 3 of 4.
 *
 * The flagship. The homepage sells this programme and, until now, there was
 * nowhere to land.
 *
 * ## Two published descriptions, both kept
 *
 * The source describes this programme twice and incompatibly: a 12-week grid
 * (homepage, `/programs/`) and a three-step narrative with no week numbers
 * (the programme page). Rather than pick one and lose content, both ship —
 * the grid as the schedule, the steps as the method. They are not in conflict
 * with each other, only with the arithmetic.
 *
 * ## ⚠️ What does not ship
 *
 * **The performance promise.** Gate B-4. The footer says "every student
 * performs"; this programme's own page says students "get the chance to
 * perform". Two unconditional claims and two conditional ones exist. Neither
 * ships — the week grid and the verbatim guarantee carry the meaning without
 * making a claim the same site contradicts.
 *
 * **Tuition.** Gate B-8. Published nowhere in the estate. Only the $25
 * spot-hold appears.
 *
 * **Session frequency.** "Two classes weekly" appears on two pages and is
 * contradicted by all seven instrument pages.
 *
 * **"About three months."** 12 weeks is 84 days. The lead sentence is verbatim
 * and retains it; the page does not repeat or reconcile it.
 *
 * ## Motion
 *
 * The desk does not move. One ghost numeral sits behind the schedule as
 * architecture — `aria-hidden`, and the figure it gestures at is stated
 * legibly in the rows beside it.
 */
export default function NinetyDayStageProgramPage() {
  return (
    <>
      <PageIntro
        eyebrow={ninetyDayPage.eyebrow}
        heading={ninetyDayPage.title}
        lead={ninetyDayPage.lead}
      >
        <p className="mt-7 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
          {ninetyDayPage.intro}
        </p>
        <div className="mt-10">
          <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
            Book a Trial
          </Button>
        </div>
      </PageIntro>

      {/* The schedule. The one place a grid is correct, because it is one. */}
      <Movement name="the-weeks" ground="house" className="relative overflow-hidden py-(--section-spacious)">
        <GhostNumeral value="90" color="#EFEBE1" className="-right-[4vw] top-[6%]" />
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="relative z-[2] grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>The twelve weeks</DeskLabel>
            <dl className="max-w-[840px]">
              {ninetyDayPage.weeks.map((week) => (
                <div
                  key={week.id}
                  className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
                >
                  <dt className="w-32 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                    {week.label}
                  </dt>
                  <dd className="font-body text-body-lg text-(--color-text-primary)">{week.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FilmMargin>
      </Movement>

      <DeskSection label="How it runs" id="the-three-steps">
        <ol>
          {ninetyDayPage.steps.map((step) => (
            <li key={step.id} className="border-t border-(--color-border-default) py-8 first:border-t-0 first:pt-0">
              <p className="font-display text-label uppercase text-(--color-text-muted)">
                {step.label}
              </p>
              <h2 className="mt-3 font-display text-heading-lg text-(--color-text-primary)">
                {step.title}
              </h2>
              <p className="mt-3 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </DeskSection>

      <DeskSection label="In this program" id="in-this-program">
        <PointList items={ninetyDayPage.inProgram} />
      </DeskSection>

      <DeskSection label={ninetyDayPage.confidence.heading} id="build-confidence">
        <PointList items={ninetyDayPage.confidence.items} />
      </DeskSection>

      <DeskSection label={ninetyDayPage.skills.heading} id="performance-skills">
        <PointList items={ninetyDayPage.skills.items} />
      </DeskSection>

      <DeskSection label={ninetyDayPage.audience.heading} id="who-its-for">
        <PointList items={ninetyDayPage.audience.items} />
      </DeskSection>

      {/* The guarantee. Verbatim, never paraphrased, never animated. */}
      <Movement name="guarantee" ground="house" className="pb-(--section-feature) pt-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{ninetyDayPage.guarantee.label}</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[52ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
                {ninetyDayPage.guarantee.text}
              </p>
              <p className="mt-9 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                {trialOffer.terms}
              </p>
              <div className="mt-9">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
              <p className="mt-10 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                We serve families in {contactFacts.serviceArea.join(', ')}, and nearby areas.
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
