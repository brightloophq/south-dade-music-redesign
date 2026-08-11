import type { Metadata } from 'next'
import Link from 'next/link'

import { DeskLabel, DeskSection, PageIntro, PolicyFooterNote } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { lessonCancellationPage, underReview } from '@/content/policies'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Cancellations and missed lessons',
  description:
    'How to cancel or reschedule a lesson, and how camp registration differs.',
  path: '/lesson-cancellation',
})

/**
 * /lesson-cancellation — Phase 4B.
 *
 * ## Why this page exists at all
 *
 * `/piano-lessons/` advertises **"Supportive make-up policies"** and no such
 * policy is published anywhere in the estate. A parent is told a policy exists
 * and then cannot read it. That is worse than silence, because it invites an
 * assumption the business may not honour.
 *
 * This page does not invent one. It states the two things that are true —
 * contact us early, and camp terms are different — and marks the rest as being
 * finalised.
 *
 * ## ⚠️ Three things a parent actually asks, all unpublished
 *
 * Notice period, make-up entitlement and refund terms for lessons are stated
 * nowhere. They render as under-review rather than as invented obligations,
 * because a published cancellation policy is enforceable against the business.
 *
 * The camp cross-reference is deliberate: camp terms are strict and
 * non-refundable, and nobody should assume they apply to weekly lessons — or
 * that lesson flexibility applies to camp.
 */
export default function LessonCancellationPage() {
  return (
    <>
      <PageIntro
        eyebrow={lessonCancellationPage.eyebrow}
        heading={lessonCancellationPage.heading}
        lead={lessonCancellationPage.intro}
      />

      <DeskSection label="If you need to cancel" id="how-to-cancel" ruled={false}>
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {lessonCancellationPage.body}
        </p>
      </DeskSection>

      <DeskSection label="Notice, make-ups and refunds" id="terms">
        <div className="border-t border-(--color-border-default) pt-7">
          <p className="font-display text-label uppercase text-(--color-text-muted)">
            {underReview.label}
          </p>
          <p className="mt-4 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
            {underReview.body}
          </p>
        </div>
      </DeskSection>

      <Movement
        name="camp-difference"
        ground="house"
        className="pb-(--section-feature) pt-(--section-comfortable)"
      >
        <FilmMargin wide>
          <hr data-desk-rule className="origin-left border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Camp is different</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {lessonCancellationPage.campNote}
              </p>
              <p className="mt-6">
                <Link
                  href="/camps"
                  className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
                >
                  Camp terms in full
                </Link>
              </p>
              <PolicyFooterNote>
                These terms are confirmed with you when you enrol.
              </PolicyFooterNote>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
