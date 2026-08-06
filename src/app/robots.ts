import type { MetadataRoute } from 'next'

import { buildRobotsFile } from '@/lib/seo/robots'

/**
 * Indexing is OFF unless NEXT_PUBLIC_ALLOW_INDEXING=true, so no preview or
 * staging deployment can be indexed by accident.
 */
export default function robots(): MetadataRoute.Robots {
  return buildRobotsFile()
}
