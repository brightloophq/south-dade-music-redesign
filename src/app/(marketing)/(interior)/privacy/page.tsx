import type { Metadata } from 'next'

import { PageIntro, PolicyFooterNote, PolicySection } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { privacyPolicy } from '@/content/policies'
import { contactFacts } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy',
  description:
    'What happens to the information you give South Dade Music when you enquire, book a trial, or contact us.',
  path: '/privacy',
})

/**
 * /privacy — Phase 4B.
 *
 * ⚠️ **No source page exists.** The estate publishes no privacy policy at all,
 * despite capturing leads through a third-party form on every page.
 *
 * Three sections render as "under review" rather than inventing obligations:
 * retention (never decided), children (the audience is aged 3–18 and the
 * obligations are the most consequential on the page), and analytics (no tag
 * inventory exists, so what runs cannot be described honestly).
 *
 * The booking provider is deliberately **not named** — gate B-5 has not settled
 * which of four names is the legal entity, and account ownership is unconfirmed.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow={privacyPolicy.eyebrow}
        heading={privacyPolicy.heading}
        lead={privacyPolicy.intro}
      />

      {privacyPolicy.sections.map((section) => (
        <PolicySection key={section.id} section={section} />
      ))}

      <Movement name="privacy-note" ground="house" className="pb-(--section-feature) pt-(--section-comfortable)">
        <FilmMargin wide>
          <PolicyFooterNote>
            Parts of this policy are still being finalised with the academy. If you need an answer
            before then, contact {contactFacts.email} or {contactFacts.phoneDisplay} and we will
            answer directly.
          </PolicyFooterNote>
        </FilmMargin>
      </Movement>
    </>
  )
}
