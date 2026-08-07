import { MAIN_CONTENT_ID } from '@/config/navigation'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'

/**
 * Marketing shell.
 *
 * Landmark structure, in order:
 *   skip link → <main> → <footer> (contentinfo)
 *
 * ## There is no <header> on the homepage
 *
 * HANDOFF.md §3.6: *"No header component on the homepage — vertical wordmark +
 * one CTA live inside the hero. Interior pages keep the existing header in the
 * desk register."*
 *
 * The homepage is the only route this group currently serves, so the header is
 * not rendered here. When interior routes are built they will need a nested
 * layout that reinstates it — the component is untouched and ready. This is a
 * deliberate omission, not a deletion: `src/components/layout/Header` and
 * `MobileNav` are intact.
 *
 * The skip link's target is `<main>`, which is unchanged, so keyboard users
 * still bypass the film and land on content. `tabIndex={-1}` keeps it out of
 * the tab order while allowing programmatic focus on route change.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
