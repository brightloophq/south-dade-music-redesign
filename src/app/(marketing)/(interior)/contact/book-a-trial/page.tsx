import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro } from '@/components/page'
import { bookTrialPage, contactFacts, trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Book a Trial — $25, credited to tuition',
  description:
    'Hold a place in the next 90-Day Stage Program cycle for $25, credited to your tuition when you enrol.',
  path: '/contact/book-a-trial',
})

/**
 * /contact/book-a-trial — Tier 1, route 1 of 4.
 *
 * ## Why this was built first
 *
 * It is the destination of the homepage's only call to action, and it returned
 * 404 in production. The site's single conversion path was broken
 * (`content-migration-coverage.md` §14 and the build order, item 1).
 *
 * ## What is deliberately not here
 *
 * **No native form.** The estate has zero native forms; 100% of lead capture
 * runs through one HighLevel widget. Building a local form would mean choosing
 * where submissions go, which is an owner decision that also touches who owns
 * the lead database. So this page sends people to the verified endpoint and —
 * more importantly — offers a phone number, because one third-party widget
 * serving every intent is the single biggest fragility in the estate.
 *
 * **No response-time promise.** Four exist in the source; the extraction flags
 * every one as unverified.
 *
 * **No lesson length, no tuition, no "what happens next".** Published nowhere.
 * Gate B-8.
 *
 * The $25 and its credited-back term are the strongest commercial asset this
 * business has and appeared on two pages out of twenty-six. Here they are the
 * first thing on the page.
 */
export default function BookATrialPage() {
  return (
    <>
      <PageIntro
        eyebrow={bookTrialPage.eyebrow}
        heading={bookTrialPage.heading}
        lead={bookTrialPage.lead}
      >
        <div className="mt-10">
          <Button href={bookTrialPage.cta.href} size="lg" price={bookTrialPage.cta.price}>
            {bookTrialPage.cta.label}
          </Button>
        </div>
        <p className="mt-5 font-display text-label uppercase text-(--color-text-muted)">
          {trialOffer.name}
        </p>
      </PageIntro>

      <DeskSection label="What you are holding a place in" id="what-the-trial-previews">
        <ol className="mt-1">
          {bookTrialPage.previews.map((line, index) => (
            <li
              key={line}
              className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-body text-body-lg text-(--color-text-primary)">{line}</span>
            </li>
          ))}
        </ol>
      </DeskSection>

      {/*
        The direct routes. A parent who will not fill in a third-party survey
        can still reach a person — and if the widget ever goes down, this page
        still converts.
      */}
      <Movement name="direct-contact" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{bookTrialPage.directHeading}</DeskLabel>
            <dl className="max-w-[840px]">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0">
                <dt className="w-24 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Phone
                </dt>
                <dd className="font-body text-body-lg">
                  <a
                    href={contactFacts.phoneHref}
                    className="inline-flex min-h-6 items-center text-(--color-text-primary) underline underline-offset-[6px]"
                  >
                    {contactFacts.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-24 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Email
                </dt>
                <dd className="font-body text-body-lg">
                  <a
                    href={`mailto:${contactFacts.email}`}
                    className="inline-flex min-h-6 items-center text-(--color-text-primary) underline underline-offset-[6px]"
                  >
                    {contactFacts.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
                <dt className="w-24 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                  Hours
                </dt>
                <dd className="font-body text-body-lg text-(--color-text-primary) tabular-nums">
                  {contactFacts.hours}
                </dd>
              </div>
            </dl>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
