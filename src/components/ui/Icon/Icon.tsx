import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export type IconSize = 'inline' | 'base' | 'feature' | 'empty-state'

export interface IconProps {
  /** A Lucide icon component. */
  icon: LucideIcon
  size?: IconSize
  className?: string
  /**
   * Accessible label. Omit for decorative icons — they are `aria-hidden`.
   * An icon-only button must label the *button*, not the icon.
   */
  label?: string
}

const sizePx: Record<IconSize, number> = {
  inline: 20,
  base: 24,
  feature: 32,
  'empty-state': 48,
}

/**
 * Icon wrapper.
 * Canonical spec: docs/redesign/04-design-system.md §12
 *
 * Style: stroke-based, 1.75px at 24px, rounded caps and joins, single
 * `currentColor` — never multi-colour.
 *
 * Rules:
 *  - Icons never replace a label on a primary action.
 *  - Decorative icons are `aria-hidden="true"` (the default here).
 *  - Icon-only buttons require `aria-label` on the button.
 *  - Minimum 44px hit area regardless of glyph size — the responsibility of the
 *    control, not the icon.
 *
 * **No emoji as UI.** The current site renders 🎹 🎸 🥁 as remote images from
 * `s.w.org` — an external request per page for a decorative glyph. Removed
 * entirely; external font and image CDNs are not reintroduced.
 *
 * ⚠️ The seven bespoke instrument marks (piano, guitar, drums, bass, violin,
 * ukulele, voice) are brand assets and are NOT part of Phase 4. They are drawn
 * on the design grid in a later phase.
 */
export function Icon({ icon: IconComponent, size = 'base', className, label }: IconProps) {
  const px = sizePx[size]

  return (
    <IconComponent
      width={px}
      height={px}
      strokeWidth={1.75}
      absoluteStrokeWidth
      className={cn('shrink-0', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  )
}
