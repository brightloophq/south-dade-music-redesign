/**
 * SEO configuration.
 * Canonical spec: docs/redesign/06-seo-strategy.md
 *
 * Phase 2 found the mission statement occupied by a search query
 * ("Music Lessons Near Me") and "Singing Lessons For Kids" repeated six times
 * on one page. Keyword stuffing is banned outright — SEO is earned by structure
 * and depth (01-brand-strategy.md §4 principle 4).
 */

import { siteConfig } from './site'

export const seoConfig = {
  /** `%s` is the page title; the site name is appended. */
  titleTemplate: `%s · ${siteConfig.shortName}`,
  /** Used verbatim on the home route, where the template would read oddly. */
  defaultTitle: siteConfig.shortName,

  titleMaxLength: 60,
  descriptionMaxLength: 160,

  defaultOgType: 'website' as const,
  ogImageWidth: 1200,
  ogImageHeight: 630,

  twitterCard: 'summary_large_image' as const,

  /**
   * Routes excluded from the sitemap and marked noindex.
   * `/members` is excluded until a real portal exists — it is lorem ipsum today
   * (02-information-architecture.md §1).
   */
  excludedPaths: ['/members', '/search', '/api', '/_next'] as const,

  /**
   * ⚠️ Structured data is gated. No business schema until the owner conflicts
   * are resolved — B-5 (four brand names), I-8 (three unit numbers), B-4 (the
   * falsifiable 90-day claim) and the contact conflicts.
   * Emitting LocalBusiness or Course schema now would publish contradictory
   * facts to search engines. See src/lib/seo/structured-data.ts.
   */
  structuredData: {
    enabled: siteConfig.structuredDataEnabled,
    blockedBy: ['B-4', 'B-5', 'I-8', 'contact reconciliation'] as const,
    /** Breadcrumbs carry no business claims and are safe to emit now. */
    breadcrumbsAllowed: true,
  },

  /**
   * Banned from titles, descriptions and headings. Phase 2 found all of these
   * used as nouns inside body sentences.
   */
  bannedKeywordPhrases: [
    'music lessons near me',
    'kids music classes south dade',
    'piano lessons near me',
    'singing lessons for kids',
    'group music classes south dade',
  ] as const,
} as const

export type SeoConfig = typeof seoConfig
