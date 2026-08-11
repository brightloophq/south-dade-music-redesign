import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro } from '@/components/page'
import { faqPage, guaranteeCrossReference, siteFaqs } from '@/content/faq'
import { campFaqs } from '@/content/camps'
import { instrumentPages } from '@/content/lessons'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Questions',
  description:
    'Ages, scholarships, how the $25 trial works, and the summer camp. Answers from what South Dade Music publishes.',
  path: '/faq',
})

/**
 * /faq — Tier 3.
 *
 * Replaces `/resources/`, whose FAQ block is the **only published source of
 * pricing, guarantee, age and scholarship terms in the entire estate**.
 *
 * ## ⚠️ Three of the seven site-wide answers do not ship
 *
 * They assert things the rest of the site contradicts:
 *
 *   · "full bilingual support" — no Spanish content exists anywhere (B-6)
 *   · "every student performs in a live showcase" — the programme page says
 *     students "get the chance to perform" (B-4)
 *   · "two classes weekly" — all seven instrument pages say one per week
 *
 * They are withheld rather than reworded. Rewording would invent a resolution
 * nobody has evidence for, and this page is precisely where a contradiction
 * does the most damage: a parent reads an FAQ to settle a question, not to
 * acquire a new one. Each is recorded in `withheldFaqs` with its reason.
 *
 * ## The 33 instrument FAQs are not duplicated here
 *
 * They already answer their question in context, on the instrument page the
 * parent is reading. This page points at them rather than restating them.
 *
 * ## No FAQPage schema yet
 *
 * Structured data remains disabled site-wide pending B-4, B-5 and I-8. Emitting
 * FAQ schema now would publish gated claims into search results.
 */
export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow={faqPage.eyebrow} heading={faqPage.heading} lead={faqPage.lead} />

      <DeskSection label={faqPage.siteLabel} id="about-the-academy" ruled={false}>
        <dl>
          {siteFaqs.map((faq) => (
            <div
              key={faq.q}
              className="border-t border-(--color-border-default) py-7 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-heading-lg text-(--color-text-primary)">{faq.q}</dt>
              <dd className="mt-3 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
          The trial is backed by{' '}
          <Link
            href={guaranteeCrossReference.href}
            className="text-(--color-text-primary) underline underline-offset-[6px]"
          >
            {guaranteeCrossReference.label}
          </Link>
          .
        </p>
      </DeskSection>

      {/* Tuition is unpublished everywhere. Say it plainly, once. */}
      <Movement name="faq-pricing" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>What does it cost?</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {faqPage.pricingNote}
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

      <DeskSection label={faqPage.campLabel} id="summer-camp">
        <dl>
          {campFaqs.map((faq) => (
            <div
              key={faq.q}
              className="border-t border-(--color-border-default) py-7 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-heading-md text-(--color-text-primary)">{faq.q}</dt>
              <dd className="mt-3 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8">
          <Link
            href="/camps"
            className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
          >
            About the camp
          </Link>
        </p>
      </DeskSection>

      {/* Instrument questions live on their instrument page, in context. */}
      <Movement name="faq-instruments" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>{faqPage.instrumentLabel}</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                Starting age, lesson format, what to practise on and what students learn are
                answered on each instrument&rsquo;s own page.
              </p>
              <p className="mt-6 font-body text-display-md italic leading-[1.35] text-(--color-text-primary)">
                {instrumentPages.map((instrument, index) => (
                  <span key={instrument.id}>
                    <Link href={instrument.route} className="underline-offset-[6px] hover:underline">
                      {instrument.name}
                    </Link>
                    {index < instrumentPages.length - 1 ? (
                      <span aria-hidden="true" className="text-(--color-text-muted)">
                        {' · '}
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
