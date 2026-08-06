import type { MetadataRoute } from 'next'

import { buildSitemap } from '@/lib/seo/sitemap'

/**
 * Built from the navigation config, filtered to routes marked `live`.
 * Phase 4 has none, so this emits the root route only — which is correct:
 * a sitemap listing pages that do not exist is worse than a short sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap()
}
