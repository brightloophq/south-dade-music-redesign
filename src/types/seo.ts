/**
 * SEO types.
 * Canonical spec: docs/redesign/06-seo-strategy.md
 */

import type { BreadcrumbItem } from './navigation'

export type OgType = 'website' | 'article' | 'profile'

export interface PageSeo {
  title: string
  description: string
  /** Path relative to the site origin, e.g. `/programs`. Always leading-slash. */
  path: string
  /** Absolute or root-relative image URL. Falls back to the site OG image. */
  image?: string | null
  imageAlt?: string
  ogType?: OgType
  /** Per-page override; defaults to the site-wide indexing switch. */
  noindex?: boolean
  nofollow?: boolean
  /** hreflang alternates, keyed by locale. */
  alternateLocales?: Readonly<Record<string, string>>
  publishedTime?: string
  modifiedTime?: string
  breadcrumbs?: readonly BreadcrumbItem[]
  keywords?: readonly string[]
}

/**
 * A minimal JSON-LD node. Deliberately loose — schema shapes vary widely and a
 * stricter type would fight the spec more than it would help.
 */
export interface StructuredDataNode {
  '@context'?: string
  '@type': string
  [key: string]: unknown
}

export interface SitemapEntry {
  path: string
  lastModified?: Date | string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}
