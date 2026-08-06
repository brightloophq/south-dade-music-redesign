/**
 * Structured-data helpers.
 *
 * ⚠️ BUSINESS SCHEMA IS GATED.
 *
 * Phase 2 found four brand names, three unit numbers, two phone numbers, two
 * email addresses, and a sitewide 90-day claim contradicted by the guarantee
 * that qualifies it. Emitting LocalBusiness, Organization or Course schema now
 * would publish contradictory facts to search engines in a machine-readable
 * form — which is worse than publishing them in prose, because it is harder to
 * walk back.
 *
 * `buildOrganization` and `buildLocalBusiness` therefore return `null` until
 * `seoConfig.structuredData.enabled` is flipped, which requires gates B-4, B-5,
 * I-8 and the contact reconciliation to close.
 *
 * Breadcrumbs carry no business claims and are safe to emit today.
 */

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import type { BreadcrumbItem } from '@/types/navigation'
import type { StructuredDataNode } from '@/types/seo'
import { absoluteUrl } from '@/lib/utils/url'

const SCHEMA_CONTEXT = 'https://schema.org'

/** Serialise for a `<script type="application/ld+json">` tag, XSS-safe. */
export function serializeJsonLd(node: StructuredDataNode | readonly StructuredDataNode[]): string {
  return JSON.stringify(node).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

/**
 * BreadcrumbList. Safe now — it describes site structure, not business facts.
 * Required on all pages three levels deep or more (02-IA §2).
 */
export function buildBreadcrumbList(items: readonly BreadcrumbItem[]): StructuredDataNode | null {
  if (items.length < 2) return null

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}

/**
 * WebSite. Emits only the site name and URL — no claims, no search action
 * (there is no search endpoint yet, and declaring one that 404s is worse than
 * declaring none).
 *
 * ⚠️ Still gated on B-5: the `name` is one of four competing brand names.
 */
export function buildWebSite(): StructuredDataNode | null {
  if (!seoConfig.structuredData.enabled) return null

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: siteConfig.name.value,
    url: siteConfig.url,
    inLanguage: siteConfig.locale.default,
  }
}

/**
 * ⚠️ BLOCKED — gate B-5. Returns null until a single brand name is chosen.
 * The shape is written so it is ready the day the gate closes.
 */
export function buildOrganization(): StructuredDataNode | null {
  if (!seoConfig.structuredData.enabled) return null
  if (!siteConfig.name.resolved) return null

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    name: siteConfig.name.value,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(siteConfig.ogImage ? { logo: absoluteUrl(siteConfig.ogImage) } : {}),
    ...(Object.keys(siteConfig.social).length ? { sameAs: Object.values(siteConfig.social) } : {}),
  }
}

/**
 * ⚠️ BLOCKED — gates B-5 and I-8. Three unit numbers are in evidence
 * (117, 1157, 115) and two phone numbers. A LocalBusiness record with the wrong
 * unit sends parents to the wrong door.
 */
export function buildLocalBusiness(): StructuredDataNode | null {
  if (!seoConfig.structuredData.enabled) return null

  const { address, phone } = siteConfig.contact
  if (!siteConfig.name.resolved || !address.resolved || !phone.resolved) return null

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'MusicSchool',
    name: siteConfig.name.value,
    url: siteConfig.url,
    telephone: phone.value,
    email: siteConfig.contact.email.value,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.value.street} ${address.value.unit}`,
      addressLocality: address.value.locality,
      addressRegion: address.value.region,
      postalCode: address.value.postalCode,
      addressCountry: address.value.country,
    },
    areaServed: siteConfig.serviceArea.map((name) => ({ '@type': 'City', name })),
  }
}

/** Reasons structured data is currently suppressed — surfaced in the build report. */
export function structuredDataBlockers(): readonly string[] {
  if (seoConfig.structuredData.enabled) return []
  return seoConfig.structuredData.blockedBy
}
