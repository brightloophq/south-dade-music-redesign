import Link from 'next/link'

import { footerNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { Text } from '@/components/ui/Typography'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

import { MotionToggle } from './MotionToggle'

function FooterLink({ item }: { item: NavItem }) {
  if (item.status !== 'live') {
    return (
      <span
        className="inline-flex min-h-11 items-center font-body text-body-sm text-n-400"
        data-route-status={item.status}
        {...(item.gate ? { 'data-gate': item.gate } : {})}
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
 * ⚠️ Phase 4 ships the reusable shell with **placeholder navigation and no
 * final business copy**. The contact block is deliberately withheld: Phase 2
 * found two phone numbers, two email addresses and three unit numbers in the
 * estate, and publishing the wrong one sends a parent to the wrong door. The
 * slot is marked and gated rather than filled with a guess.
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
          Contact block — intentionally empty in Phase 4.

          ⚠️ Blocked on:
            · I-8  three unit numbers in evidence (117 / 1157 / 115)
            · phone conflict: sitewide footer vs a different number on the subdomain
            · email conflict: info@ (footer) vs contact@ (contact page body)

          Address, hours and phone are load-bearing content. They ship when the
          owner confirms which values are correct — not before.
        */}
        <section aria-labelledby="footer-contact" data-gate="I-8" className="mb-8">
          <Text token="label" as="h3" id="footer-contact" className="mb-2 text-spot-400">
            Contact
          </Text>
          <Text token="body-sm" className="text-n-400">
            Address, hours and phone are pending owner confirmation. See{' '}
            <code className="font-mono">docs/source-content/contact-details.json</code>.
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
