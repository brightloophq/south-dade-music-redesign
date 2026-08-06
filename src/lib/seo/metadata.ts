/**
 * Metadata utilities.
 *
 * Next.js 16 Metadata API. `metadataBase` is set once in the root layout, so
 * every URL-based field here may use a relative path.
 * See node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 */

import type { Metadata } from 'next'

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import type { PageSeo } from '@/types/seo'
import { canonicalPath } from '@/lib/utils/url'

import { buildOpenGraph, buildTwitter } from './open-graph'
import { buildRobots } from './robots'

/** Truncate at a word boundary rather than mid-word. */
function clamp(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed

  const cut = trimmed.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/**
 * Development-time guard against the Phase 2 failure mode: keyword phrases
 * embedded in titles and descriptions. Warns rather than throws, so a content
 * mistake never breaks a production build.
 */
function assertNoKeywordStuffing(text: string, field: string): void {
  if (process.env.NODE_ENV === 'production') return

  const lower = text.toLowerCase()
  for (const phrase of seoConfig.bannedKeywordPhrases) {
    if (lower.includes(phrase)) {
      console.warn(`[seo] Banned keyword phrase "${phrase}" found in ${field}. See docs/redesign/06-seo-strategy.md.`)
    }
  }
}

/**
 * Build a page's Metadata object.
 *
 * @example
 * export const metadata = buildMetadata({
 *   title: 'Programs',
 *   description: '…',
 *   path: '/programs',
 * })
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const path = canonicalPath(seo.path)
  const isHome = path === '/'

  assertNoKeywordStuffing(seo.title, 'title')
  assertNoKeywordStuffing(seo.description, 'description')

  const title = clamp(seo.title, seoConfig.titleMaxLength)
  const description = clamp(seo.description, seoConfig.descriptionMaxLength)

  return {
    title: isHome ? seoConfig.defaultTitle : title,
    description,
    alternates: {
      canonical: path,
      ...(seo.alternateLocales ? { languages: seo.alternateLocales } : {}),
    },
    openGraph: buildOpenGraph({ ...seo, title, description, path }),
    twitter: buildTwitter({ ...seo, title, description, path }),
    robots: buildRobots({ noindex: seo.noindex, nofollow: seo.nofollow }),
    ...(seo.keywords?.length ? { keywords: [...seo.keywords] } : {}),
  }
}

/**
 * Root metadata. Sets `metadataBase` so relative URLs resolve everywhere below.
 * Applied once, in the root layout.
 */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seoConfig.defaultTitle,
      template: seoConfig.titleTemplate,
    },
    description: siteConfig.description,
    applicationName: siteConfig.shortName,
    formatDetection: { telephone: false, address: false, email: false },
    robots: buildRobots({}),
    openGraph: {
      type: 'website',
      siteName: siteConfig.shortName,
      locale: siteConfig.locale.default.replace('-', '_'),
      url: '/',
      title: seoConfig.defaultTitle,
      description: siteConfig.description,
    },
  }
}
