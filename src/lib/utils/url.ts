/**
 * URL helpers.
 * Canonical URL strategy: docs/redesign/02-information-architecture.md §11
 */

import { siteConfig } from '@/config/site'

/**
 * Normalise a path to its canonical form: leading slash, no trailing slash
 * (except root), no duplicate slashes, no query or hash.
 */
export function canonicalPath(path: string): string {
  if (!path || path === '/') return '/'

  const withoutQuery = path.split(/[?#]/)[0] ?? ''
  const withLeading = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`
  const collapsed = withLeading.replace(/\/{2,}/g, '/')
  const trimmed = collapsed.replace(/\/+$/, '')

  return trimmed === '' ? '/' : trimmed
}

/** Compose an absolute URL from a path, for OG tags and JSON-LD. */
export function absoluteUrl(path: string): string {
  const origin = siteConfig.url.replace(/\/+$/, '')
  return `${origin}${canonicalPath(path)}`
}

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href) || /^(mailto:|tel:|sms:)/i.test(href)
}
