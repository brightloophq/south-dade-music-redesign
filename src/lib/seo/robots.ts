/**
 * Robots helpers.
 *
 * Indexing is OFF unless `NEXT_PUBLIC_ALLOW_INDEXING=true`. Phase 2 found an
 * agency staging domain serving assets to 22+ live pages; the inverse mistake —
 * a staging deployment being indexed — is prevented here by default.
 */

import type { Metadata, MetadataRoute } from 'next'

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils/url'

type RobotsMetadata = NonNullable<Metadata['robots']>

export function buildRobots(options: { noindex?: boolean; nofollow?: boolean }): RobotsMetadata {
  const index = siteConfig.indexingEnabled && !options.noindex
  const follow = siteConfig.indexingEnabled && !options.nofollow

  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  }
}

/** Powers `src/app/robots.ts`. */
export function buildRobotsFile(): MetadataRoute.Robots {
  if (!siteConfig.indexingEnabled) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...seoConfig.excludedPaths],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  }
}
