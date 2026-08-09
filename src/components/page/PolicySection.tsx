import { DeskRow } from '@/components/page/PageShell'
import { underReview } from '@/content/policies'

/**
 * A policy section.
 *
 * Renders one of two states, and never anything else:
 *
 *   **stated**       the section has a body built from verified fact
 *   **under-review** the section cannot be written without an owner or legal
 *                    answer, so it says so, restrainedly
 *
 * The under-review state exists because the alternative is worse. A policy page
 * states obligations; inventing one creates a commitment the business never
 * agreed to and may not be able to meet. An honest "we are finalising this,
 * ask us meanwhile" costs nothing and misleads nobody.
 *
 * No internal TODO language, gate ID or engineering note ever reaches the page.
 * Those live in `src/content/policies.ts` and the owner-decision register.
 */
export interface PolicySectionData {
  id: string
  heading: string
  body: string | null
  status: 'stated' | 'under-review'
}

export function PolicySection({ section }: { section: PolicySectionData }) {
  const isReview = section.status === 'under-review' || !section.body

  return (
    <DeskRow label={section.heading} id={section.id}>
      <div className="border-t border-(--color-border-default) pt-7">
        {isReview ? (
          <>
            <p className="font-display text-label uppercase text-(--color-text-muted)">
              {underReview.label}
            </p>
            <p className="mt-4 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
              {underReview.body}
            </p>
          </>
        ) : (
          <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
            {section.body}
          </p>
        )}
      </div>
    </DeskRow>
  )
}

/**
 * The standing note at the foot of every policy page.
 *
 * Says the honest thing: parts of this are still being finalised, and here is a
 * person to ask. Better than a fabricated "last updated" date, which would
 * imply a review that never happened.
 */
export function PolicyFooterNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-10 max-w-[62ch] font-body text-body-sm text-(--color-text-muted)">
      {children}
    </p>
  )
}
