import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, DeskSection, PageIntro, PointList } from '@/components/page'
import { camp, campFaqs, campSessions } from '@/content/camps'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Summer Jam Music Camp',
  description:
    'A three-week screen-free day camp for ages 7 to 15, four hours a day, ending in an End-of-Camp Concert. All instruments provided.',
  path: '/camps',
})

/**
 * /camps — Tier 3. Replaces four source routes with one page.
 *
 * `/summer-jam-music-camp-2026/` · `/summer-programs/` · `/summer-camp/` ·
 * `/summercamp/` all described the same product. The other three redirect here.
 *
 * ## ⚠️ Why there is no "reserve a seat" button
 *
 * Both 2026 sessions ended before the content was extracted, and all four
 * source routes **still** carry a live prompt to "secure your child's place
 * before sessions fill up". A parent can read a booking call-to-action for a
 * camp that finished months ago.
 *
 * This page states what the camp is and what it cost, puts the sessions in the
 * past tense where the source is dated, and asks people to get in touch about
 * the next one. Whether a 2027 camp exists is an owner question; inventing one
 * or repeating a dead CTA would both be worse than saying nothing.
 *
 * ## ⚠️ No address
 *
 * Gate I-8. The camp pages give Unit **1157**; the contact page and the Google
 * place record give Unit **117**. The camp page is where a parent would drive
 * for drop-off, which makes this the most consequential instance of the
 * conflict. The page links to `/contact` rather than pick a side.
 *
 * ## ⚠️ No deposit figure
 *
 * The down payment is "required today" and "strictly non-refundable", and its
 * amount is stated nowhere in the estate. The refund terms ship in full because
 * they are legally load-bearing; the missing number is recorded in the audit.
 */
export default function CampsPage() {
  return (
    <>
      <PageIntro eyebrow={camp.eyebrow} heading={camp.name} lead={camp.summary} />

      {/* The honest status, before anything that looks like an offer. */}
      <Movement name="camp-status" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-2">
              <DeskLabel>Status</DeskLabel>
            </div>
            <div className="max-w-[840px] border-t border-(--color-border-default) pt-8">
              <h2 className="max-w-[24ch] font-display text-display-md text-(--color-text-primary)">
                {camp.status.heading}
              </h2>
              <p className="mt-6 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {camp.status.body}
              </p>
              <dl className="mt-9">
                {campSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5"
                  >
                    <dt className="w-32 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                      {session.label}
                    </dt>
                    <dd className="font-body text-body-lg text-(--color-text-primary)">
                      {session.dates}
                      <span className="text-(--color-text-muted)"> · {session.days}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <Button href="/contact" variant="secondary" size="lg">
                  Ask about the next camp
                </Button>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>

      <DeskSection label="What it is" id="what-it-is">
        <dl>
          {[
            ['Ages', camp.ageRange],
            ['Schedule', camp.schedule],
            ['Instruments', camp.instruments],
            ['Capacity', camp.capacity],
          ].map(([term, value]) => (
            <div
              key={term}
              className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
            >
              <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                {term}
              </dt>
              <dd className="max-w-[52ch] font-body text-body-lg text-(--color-text-primary)">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </DeskSection>

      <DeskSection label="Daily blocks" id="blocks">
        <dl>
          {camp.blocks.map((block) => (
            <div
              key={block.id}
              className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
            >
              <dt className="w-40 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
                {block.label}
              </dt>
              <dd className="font-body text-body-lg tabular-nums text-(--color-text-primary)">
                {block.time}
                <span className="ml-3 font-display text-label uppercase tabular-nums text-(--color-text-muted)">
                  {block.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </DeskSection>

      <DeskSection label="What is included" id="included">
        <PointList items={camp.included} />
      </DeskSection>

      <DeskSection label="The concert" id="concert">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {camp.performance}
        </p>
      </DeskSection>

      {/* 2026 pricing, stated as what it was. */}
      <DeskSection label="2026 pricing" id="pricing">
        <dl>
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t-0 py-5 pt-0">
            <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
              Per session
            </dt>
            <dd className="font-body text-body-lg tabular-nums text-(--color-text-primary)">
              {camp.price.standard}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-1 border-t border-(--color-border-default) py-5">
            <dt className="w-36 shrink-0 font-display text-label uppercase text-(--color-text-muted)">
              Paid in full
            </dt>
            <dd className="font-body text-body-lg tabular-nums text-(--color-text-primary)">
              {camp.price.payInFull}
            </dd>
          </div>
        </dl>
        <p className="mt-6 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
          These were the 2026 figures. Pricing for the next camp has not been announced.
        </p>
      </DeskSection>

      <DeskSection label="Questions" id="faqs">
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
      </DeskSection>

      {/* Legally load-bearing. Ships in full, unedited, and never animated. */}
      <Movement name="camp-terms" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Terms</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-md text-(--color-text-primary)">
                {camp.refundTerms}
              </p>
              <p className="mt-6 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
                {camp.behaviouralPolicy}
              </p>
              <p className="mt-10 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
                Camp is held at our Florida City studio.{' '}
                <Link href="/contact" className="text-(--color-text-primary) underline underline-offset-[6px]">
                  Address and hours
                </Link>
                .
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
