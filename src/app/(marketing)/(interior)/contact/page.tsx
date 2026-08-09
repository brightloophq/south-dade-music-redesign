import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro } from '@/components/page'
import { contactFacts, contactPage, trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'South Dade Music, 601 W Palm Dr, Florida City, FL 33034. Call 786-753-9509 or email info@southdademusic.com.',
  path: '/contact',
})

/**
 * /contact — Tier 1, route 2 of 4.
 *
 * ## The source page it replaces
 *
 * `/contact-enroll/` is named for enrolling and contains an address, an email,
 * a phone number and nothing else. No form, no map, no hours, no directions,
 * no parking guidance, no response promise, no enrolment steps — and four CTAs
 * elsewhere on the site point at it expecting a form that does not exist.
 *
 * This page fixes the last part: every route out of here goes somewhere real.
 *
 * ## ⚠️ The address is gated
 *
 * Gate I-8. Three unit numbers exist across the estate — 117, 1157 and 115.
 * **Unit 117** is published because it is the only one corroborated twice: the
 * contact page's own body copy *and* the Google Maps place record. The camp
 * pages say 1157, which is where parents would drive for drop-off, so this must
 * be settled before any camp page ships.
 *
 * No directions, map or parking guidance appear, because none exists in the
 * estate and inventing a route to a disputed unit number would be worse than
 * omitting it.
 *
 * Hours, phone, email and address are never animated — they are in the
 * `neverAnimate` list in the motion config, and this is why.
 */
export default function ContactPage() {
  const { address } = contactFacts

  return (
    <>
      <PageIntro
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        lead={contactPage.serviceLine}
      />

      <DeskSection label="Visit" id="visit" ruled={false}>
        <address className="not-italic">
          <p className="font-body text-display-md leading-[1.3] text-(--color-text-primary)">
            {address.street}, {address.unit}
            <br />
            {address.locality}, {address.region} {address.postalCode}
          </p>
        </address>

        <dl className="mt-12">
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
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
            <dd className="font-body text-body-lg tabular-nums text-(--color-text-primary)">
              {contactFacts.hours}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
            <dt className="w-24 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
              Area
            </dt>
            <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
              {contactFacts.serviceArea.join(' · ')} and nearby areas
            </dd>
          </div>
        </dl>
      </DeskSection>

      {/* The trial is the reason most people are on this page. */}
      <Movement name="contact-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Enrol</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {trialOffer.terms}
              </p>
              <div className="mt-9">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
