import type { Metadata } from 'next'

import { DeskLabel, PageIntro } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { ConsentForm } from '@/components/forms/ConsentForm'
import { consentCategories, photoConsentPage } from '@/content/policies'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Photo consent',
  description:
    'South Dade Music does not publish a photograph of any student without written permission from a parent or guardian. This is how permission is given and withdrawn.',
  path: '/photo-consent',
})

/**
 * /photo-consent — Phase 4B, and the highest-leverage route in this phase.
 *
 * Gate I-1 blocks all 18 genuine photographs the academy owns — every authentic
 * image of the business — because consent was never recorded for any of them.
 * That is why `/performances` carries families' words instead of pictures and
 * why the homepage ships no photography at all. This flow is what unblocks it.
 *
 * ## ⚠️ Submission is deliberately disabled
 *
 * There is nowhere to send this yet. See `src/lib/consent/schema.ts` for the
 * four conditions that must be true before it is enabled. The form renders in
 * full so it can be read and reviewed by the owner and by a lawyer — but it
 * states plainly that it cannot be submitted, and it does not pretend to store
 * anything.
 *
 * ## Structure, kept deliberately separate
 *
 *   informational explanation → guardian identity → student identity →
 *   per-use permissions → acknowledgement → signature
 *
 * Permissions are per-use rather than one checkbox. A guardian may be happy for
 * a photograph to hang in the studio and not to appear on social media;
 * bundling those produces consent that is technically given and ethically
 * worthless.
 */
export default function PhotoConsentPage() {
  return (
    <>
      <PageIntro
        eyebrow={photoConsentPage.eyebrow}
        heading={photoConsentPage.heading}
        lead={photoConsentPage.intro}
      />

      {/* Why this exists, before anything is asked of the reader. */}
      <Movement name="consent-explanation" ground="house" className="pb-(--section-spacious)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-2">
              <DeskLabel>Before you decide</DeskLabel>
            </div>
            <div className="max-w-[840px] border-t border-(--color-border-default) pt-8">
              {photoConsentPage.explanation.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary) first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FilmMargin>
      </Movement>

      <ConsentForm
        categories={consentCategories}
        acknowledgement={photoConsentPage.acknowledgement}
        blockedNotice={photoConsentPage.submissionBlockedNotice}
        withdrawal={photoConsentPage.withdrawal}
      />
    </>
  )
}
