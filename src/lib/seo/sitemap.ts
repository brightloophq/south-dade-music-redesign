/**
 * Sitemap helper.
 *
 * Only `live` routes are emitted. Phase 2 found four URLs for one summer
 * product, one of them empty and indexable — a sitemap built from the
 * navigation config cannot reproduce that, because planned and gated routes are
 * filtered out by status.
 */

import type { MetadataRoute } from 'next'

import { seoConfig } from '@/config/seo'
import { footerNavigation, primaryNavigation } from '@/config/navigation'
import type { NavItem } from '@/types/navigation'
import type { SitemapEntry } from '@/types/seo'
import { absoluteUrl, canonicalPath } from '@/lib/utils/url'

function flatten(items: readonly NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flatten(item.children) : [])])
}

function isExcluded(path: string): boolean {
  return seoConfig.excludedPaths.some((excluded) => path === excluded || path.startsWith(`${excluded}/`))
}

/** Every route currently marked `live` in the navigation config. */
export function liveRoutes(): string[] {
  const fromNav = flatten(primaryNavigation)
  const fromFooter = footerNavigation.flatMap((group) => group.items)

  const paths = [...fromNav, ...fromFooter]
    .filter((item) => item.status === 'live')
    .map((item) => canonicalPath(item.href))
    .filter((path) => !isExcluded(path))

  return [...new Set(['/', ...paths])]
}

export function buildSitemap(extra: readonly SitemapEntry[] = []): MetadataRoute.Sitemap {
  const now = new Date()

  const base: MetadataRoute.Sitemap = liveRoutes().map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const additional: MetadataRoute.Sitemap = extra
    .filter((entry) => !isExcluded(canonicalPath(entry.path)))
    .map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified ?? now,
      ...(entry.changeFrequency ? { changeFrequency: entry.changeFrequency } : {}),
      ...(entry.priority !== undefined ? { priority: entry.priority } : {}),
    }))

  const seen = new Set<string>()
  return [...base, ...additional].filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}
