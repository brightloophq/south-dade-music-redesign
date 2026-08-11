import { MAIN_CONTENT_ID } from '@/config/navigation'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Ambience } from '@/components/motion/Ambience'
import { Preloader } from '@/components/motion/Preloader'
import { RouteTransition } from '@/components/motion/RouteTransition'
import { SkipLink } from '@/components/layout/SkipLink'

/**
 * Marketing shell.
 *
 * Landmark structure, in order:
 *   skip link → <main> → <footer> (contentinfo)
 *
 * ## The homepage has navigation again
 *
 * It shipped without a header on the grounds that "the hero *is* the header".
 * That was true of the hero and false of the site: a visitor five viewports
 * into a dark film had no way to reach Programs, Lessons, Performances or
 * Camps without scrolling to the footer, and this is a business that needs to
 * be navigable.
 *
 * The header is now rendered here, for every route in the group, and it reads
 * the film. Through the dark it is transparent with no rule and sits in the
 * house register, so it is legible over the film without putting a bar across
 * it; when `#desk-begins` passes under it, it takes the desk register with the
 * letterbox and the grain, on the same scroll position.
 *
 * The skip link's target is `<main>`, so keyboard users still bypass both the
 * navigation and the film. `tabIndex={-1}` keeps it out of the tab order while
 * allowing programmatic focus on route change.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <SkipLink />
      <RouteTransition />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <Ambience />
    </>
  )
}
