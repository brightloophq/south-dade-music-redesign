/**
 * Breadcrumb helper.
 * Required on all pages three levels deep or more (02-IA §2).
 */

import { primaryNavigation } from '@/config/navigation'
import type { BreadcrumbItem, NavItem } from '@/types/navigation'
import { canonicalPath } from '@/lib/utils/url'

const HOME: BreadcrumbItem = { label: 'Home', href: '/' }

function findLabel(items: readonly NavItem[], href: string): string | null {
  for (const item of items) {
    if (canonicalPath(item.href) === href) return item.label
    if (item.children) {
      const nested = findLabel(item.children, href)
      if (nested) return nested
    }
  }
  return null
}

/** Title-case a URL segment as a fallback when the nav has no matching label. */
function humanize(segment: string): string {
  return segment
    .split('-')
    .map((word) => (word.length > 2 ? word[0]!.toUpperCase() + word.slice(1) : word))
    .join(' ')
}

/**
 * Derive breadcrumbs from a pathname, preferring navigation labels over
 * URL-derived ones so the trail matches what the user clicked.
 */
export function buildBreadcrumbs(pathname: string, overrides: Readonly<Record<string, string>> = {}): BreadcrumbItem[] {
  const path = canonicalPath(pathname)
  if (path === '/') return [HOME]

  const segments = path.split('/').filter(Boolean)
  const trail: BreadcrumbItem[] = [HOME]

  let accumulated = ''
  for (const segment of segments) {
    accumulated += `/${segment}`
    trail.push({
      href: accumulated,
      label: overrides[accumulated] ?? findLabel(primaryNavigation, accumulated) ?? humanize(segment),
    })
  }

  return trail
}

/** `true` when a trail is deep enough to warrant rendering (02-IA §2). */
export function shouldRenderBreadcrumbs(trail: readonly BreadcrumbItem[]): boolean {
  return trail.length >= 3
}
