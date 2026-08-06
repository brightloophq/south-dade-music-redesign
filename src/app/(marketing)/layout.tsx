import { MAIN_CONTENT_ID } from '@/config/navigation'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'

/**
 * Marketing shell.
 *
 * Landmark structure, in order:
 *   skip link → <header> (banner) → <main> → <footer> (contentinfo)
 *
 * `<main>` carries the skip-link target and `tabIndex={-1}` so focus can be
 * moved to it programmatically on route change without adding it to the tab
 * order.
 *
 * ⚠️ Phase 4 ships the shell only. No marketing sections, no homepage content.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
