import type { Metadata } from 'next'

import { DeskLabel, DeskSection, PageIntro, PointList, PolicyFooterNote } from '@/components/page'
import { FilmMargin, Movement } from '@/components/film'
import { accessibilityPage } from '@/content/policies'
import { underReview } from '@/content/policies'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility',
  description:
    'What we commit to on this site, how instruction is adapted, and how to tell us when something does not work.',
  path: '/accessibility',
})

/**
 * /accessibility — Phase 4B.
 *
 * ⚠️ **No source page exists**, and the live site had observable defects:
 * placeholder alt text ("Image 1/2/3"), filename-as-alt, missing alt on all six
 * gallery images, and H2 misuse as body lead-ins.
 *
 * ## Why the site commitments are stated as fact
 *
 * Because each one is mechanically checked. `check:tokens` computes every
 * declared contrast pair; `scripts/check-a11y.mjs` Tab-walks all 27 routes and
 * asserts keyboard reach, focus visibility, heading order, target size and text
 * size at a 390px viewport, and that motion stops under
 * `prefers-reduced-motion`. These are not aspirations — they fail the build if
 * they stop being true.
 *
 * ⚠️ **This was not true when the page was first written.** It cited a "route
 * audit" that did not exist, and two of its six claims were false: body copy is
 * 15px at the small end, not 16px, and controls are 24px at the small end, not
 * 44px. The claims have been rewritten to the AA bar the site actually holds
 * and the checking tool now exists. An accessibility statement that cannot be
 * verified is worse than none — it asks a disabled visitor to trust a promise
 * nobody checked.
 *
 * ## ⚠️ Physical access renders as under-review
 *
 * The estate publishes **nothing** about step-free access, parking, restrooms
 * or sensory accommodation at 601 W Palm Dr. It cannot be guessed, and getting
 * it wrong would strand exactly the family it is meant to help. This is the
 * single most useful thing the owner could supply for this page.
 */
export default function AccessibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow={accessibilityPage.eyebrow}
        heading={accessibilityPage.heading}
        lead={accessibilityPage.intro}
      />

      <DeskSection label="On this site" id="site" ruled={false}>
        <PointList items={accessibilityPage.siteCommitments} />
        <p className="mt-8 max-w-[62ch] font-body text-body-md text-(--color-text-secondary)">
          {accessibilityPage.howWeKnow}
        </p>
      </DeskSection>

      <DeskSection label="In lessons" id="instruction">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {accessibilityPage.inclusionStatement}
        </p>
      </DeskSection>

      {/* Physical access — honestly absent rather than guessed. */}
      <DeskSection label="Getting into the building" id="physical-access">
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
        name="a11y-feedback"
        ground="house"
        className="pb-(--section-feature) pt-(--section-comfortable)"
      >
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Tell us</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {accessibilityPage.feedback}
              </p>
              <PolicyFooterNote>
                This statement describes the rebuilt site. Parts of it are still being confirmed
                with the academy.
              </PolicyFooterNote>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
