import type { Metadata } from 'next'

import { PageIntro, PolicyFooterNote, PolicySection } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { termsPage } from '@/content/policies'
import { contactFacts } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Terms',
  description:
    'Terms covering the use of this website, booking a trial and camp registration.',
  path: '/terms',
})

/**
 * /terms — Phase 4B.
 *
 * ⚠️ **No source page exists.**
 *
 * Three sections ship as stated fact because the estate genuinely publishes
 * them: the trial terms ($25, credited to tuition) and the camp refund terms,
 * both verbatim, plus a neutral statement about the site itself.
 *
 * Three render as "under review" because inventing them would create binding
 * obligations the business never agreed to:
 *
 *   · **Tuition and fees** — gate B-8, published nowhere for any programme.
 *   · **Liability** — requires legal input, never guessed.
 *   · **Governing law** — depends on the registered legal entity, and gate B-5
 *     has not settled which of four names that is.
 *
 * The camp refund terms ship in full and unedited. They are the only published
 * policy in the estate and a parent agreeing to them deserves to read them
 * before booking — even though the extraction recommends legal review of the
 * wording, and the deposit amount itself is stated nowhere.
 */
export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow={termsPage.eyebrow} heading={termsPage.heading} lead={termsPage.intro} />

      {termsPage.sections.map((section) => (
        <PolicySection key={section.id} section={section} />
      ))}

      <Movement
        name="terms-note"
        ground="house"
        className="pb-(--section-feature) pt-(--section-comfortable)"
      >
        <FilmMargin wide>
          <PolicyFooterNote>
            Parts of these terms are still being finalised with the academy. If you need an answer
            before then, contact {contactFacts.email} or {contactFacts.phoneDisplay} and we will
            answer directly.
          </PolicyFooterNote>
        </FilmMargin>
      </Movement>
    </>
  )
}
