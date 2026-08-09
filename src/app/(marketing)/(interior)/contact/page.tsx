import type { Metadata } from 'next'
import Link from 'next/link'

import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
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

      {/*
        EE3 — rebuilt as three parallel ways in, not a stacked definition list.

        This route publishes ~110 words and was spending 2,482px doing it,
        because every fact sat in its own full-width row separated by a third of
        a screen. The words are unchanged and not one has been added: what
        changed is that they are now *composed*.

        A visitor arriving here has already decided to make contact. The page's
        whole job is to make the three real ways of doing that equally
        available and instantly scannable, so they sit side by side as parallel
        actions rather than stacked as trivia.
      */}
      <Movement name="reach-us" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Three ways in</DeskLabel>
            </div>

            <div className="max-w-[840px]">
              <ul className="grid gap-px border-t border-(--color-border-default) sm:grid-cols-3">
                <li className="border-b border-(--color-border-default) py-7 sm:border-b-0 sm:pr-8">
                  <p className="font-display text-label uppercase text-(--color-text-muted)">Call</p>
                  <p className="mt-3">
                    <a
                      href={contactFacts.phoneHref}
                      className="inline-flex min-h-11 items-center font-body text-heading-lg italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                    >
                      {contactFacts.phoneDisplay}
                    </a>
                  </p>
                  <p className="mt-1 font-body text-body-sm tabular-nums text-(--color-text-secondary)">
                    {contactFacts.hours}
                  </p>
                </li>

                <li className="border-b border-(--color-border-default) py-7 sm:border-b-0 sm:border-l sm:border-l-(--color-border-default) sm:px-8">
                  <p className="font-display text-label uppercase text-(--color-text-muted)">Email</p>
                  <p className="mt-3">
                    <a
                      href={`mailto:${contactFacts.email}`}
                      className="inline-flex min-h-11 items-center break-all font-body text-heading-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                    >
                      {contactFacts.email}
                    </a>
                  </p>
                </li>

                <li className="py-7 sm:border-l sm:border-l-(--color-border-default) sm:pl-8">
                  <p className="font-display text-label uppercase text-(--color-text-muted)">
                    Book a trial
                  </p>
                  <p className="mt-3 font-body text-heading-lg italic text-(--color-text-primary)">
                    {trialOffer.price}
                  </p>
                  <p className="mt-3">
                    <Link
                      href="/contact/book-a-trial"
                      className="inline-flex min-h-11 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                    >
                      Hold a place
                    </Link>
                  </p>
                </li>
              </ul>

              <p className="mt-7 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                {trialOffer.terms}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/* Where and when, as one block rather than four rows. */}
      <Movement name="visit" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Visit</DeskLabel>
            </div>
            <div className="grid max-w-[840px] gap-10 sm:grid-cols-2">
              <address className="not-italic" id="visit">
                <p className="font-body text-display-md leading-[1.3] text-(--color-text-primary)">
                  {address.street}, {address.unit}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                </p>
              </address>
              <div>
                <p className="font-display text-label uppercase text-(--color-text-muted)">
                  Who we serve
                </p>
                <p className="mt-3 max-w-[36ch] font-body text-body-lg text-(--color-text-primary)">
                  {contactFacts.serviceArea.join(' · ')} and nearby areas
                </p>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      {/*
        EE3 — contextual next steps.

        Most people reaching a contact page are still deciding. These are the
        four routes that answer the question behind the visit, and they cost
        nothing to offer. Structural links only — no new claim.
      */}
      <Movement name="before-you-call" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-8 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>Before you call</DeskLabel>
            </div>
            <ul className="grid max-w-[840px] gap-x-10 gap-y-5 sm:grid-cols-2">
              {[
                { href: '/programs', label: 'What we run', note: 'Six programmes, and how they fit together.' },
                { href: '/lessons', label: 'What you can learn', note: 'Seven instruments, private or group.' },
                { href: '/faq', label: 'Common questions', note: 'Ages, scholarships, how the trial works.' },
                { href: '/scholarships', label: 'Step Up scholarships', note: 'PEP and UA are accepted here.' },
              ].map((item) => (
                <li key={item.href} className="border-t border-(--color-border-default) pt-5">
                  <Link
                    href={item.href}
                    className="font-body text-heading-md italic text-(--color-text-primary) underline-offset-[6px] hover:underline"
                  >
                    {item.label}
                  </Link>
                  <p className="mt-1 font-body text-body-sm text-(--color-text-secondary)">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
