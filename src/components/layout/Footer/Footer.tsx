import Link from 'next/link'

import { footerNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { contactFacts } from '@/content/pages'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { Text } from '@/components/ui/Typography'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

import { MotionToggle } from './MotionToggle'

function FooterLink({ item }: { item: NavItem }) {
  if (item.status !== 'live') {
    /*
     * `item.gate` is deliberately NOT emitted as an attribute. Gate IDs are
     * internal decision-register vocabulary; they belong in the typed config,
     * in comments and in docs/implementation, not in markup a visitor can
     * read. Nothing selects on them at runtime — they were write-only.
     */
    return (
      <span
        className="inline-flex min-h-11 items-center font-body text-body-sm text-n-400"
        data-route-status={item.status}
      >
        {item.label}
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      className="inline-flex min-h-11 items-center font-body text-body-sm text-n-300 transition-colors duration-(--duration-fast) hover:text-spot-400"
    >
      {item.label}
    </Link>
  )
}

/**
 * Site footer.
 * Canonical spec: docs/redesign/02-information-architecture.md §3 · 04 §11
 *
 * "The footer carries the address, hours and phone — it is load-bearing and
 * must be treated as content, not chrome."
 *
 * Phase 2 found two phone numbers, two email addresses and three unit numbers
 * across the estate. The footer publishes the two that are settled — the
 * sitewide phone and email, the same pair carried by `/contact` and by every
 * policy page — and withholds the postal address pending gate I-8, linking to
 * `/contact` instead of repeating a disputed unit number on 27 pages.
 */
export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear()

  return (
    <footer
      data-register="house"
      className={cn('mt-auto bg-stage-950 text-n-300', className)}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <Container width="wide" className="py-(--section-comfortable)">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerNavigation.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <Text
                token="label"
                as="h3"
                id={`footer-${group.id}`}
                className="mb-2 text-spot-400"
              >
                {group.label}
              </Text>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Divider spacing="base" className="bg-stage-700" />

        {/*
          Contact block.

          This slot was a Phase 4 foundation placeholder and was never revisited
          when Tier 1 shipped `/contact`. Until the hardening pass it rendered
          the sentence "Address, hours and phone are pending owner confirmation.
          See docs/source-content/contact-details.json" — an internal note, with
          a repository path, on all 27 routes. That is engineering scaffolding
          addressed to the wrong audience: a parent reading the footer learns
          nothing and sees the seams.

          What ships now is what is already published elsewhere on this site:
          the phone and email carried by `/contact` and by every policy page.
          Nothing new is asserted.

          ⚠️ Still withheld — the postal address. Gate I-8: three unit numbers
          are in evidence (117 / 1157 / 115) and sending a parent to the wrong
          door is the one contact error with a real-world cost. `/contact`
          publishes the best-corroborated value with that caveat; the footer,
          which appears on every page, links there rather than repeating it.
        */}
        <section aria-labelledby="footer-contact" className="mb-8">
          <Text token="label" as="h3" id="footer-contact" className="mb-2 text-spot-400">
            Contact
          </Text>
          <Text token="body-sm" className="text-n-400">
            <a
              href={contactFacts.phoneHref}
              className="transition-colors duration-(--duration-fast) hover:text-spot-400"
            >
              {contactFacts.phoneDisplay}
            </a>
            {' · '}
            <a
              href={`mailto:${contactFacts.email}`}
              className="transition-colors duration-(--duration-fast) hover:text-spot-400"
            >
              {contactFacts.email}
            </a>
            {' · '}
            <Link
              href="/contact"
              className="transition-colors duration-(--duration-fast) hover:text-spot-400"
            >
              Visit us
            </Link>
          </Text>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Text token="body-sm" className="text-n-400">
            © {year} {siteConfig.shortName}
            {/* ⚠️ Gate B-5 — legal entity name unconfirmed; four names in use. */}
          </Text>

          <MotionToggle />
        </div>
      </Container>
    </footer>
  )
}
