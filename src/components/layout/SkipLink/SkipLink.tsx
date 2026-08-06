import { MAIN_CONTENT_ID } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

export interface SkipLinkProps {
  targetId?: string
  label?: string
  className?: string
}

/**
 * Skip to content.
 *
 * The first tab stop on every page (docs/redesign/04-design-system.md §16).
 * Hidden until focused, then revealed in place at the top-left.
 *
 * Two rules make this work correctly and are easy to get wrong:
 *  1. It sits at `--z-skip-link` (900), above the sticky header and the drawer.
 *     A skip link occluded by a header is a skip link that does not exist.
 *  2. It is **never animated** (05-motion-system.md §16 rule 10) — it appears
 *     instantly, at full strength, including under reduced motion.
 */
export function SkipLink({ targetId = MAIN_CONTENT_ID, label = 'Skip to content', className }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only-focusable',
        'focus-visible:top-4 focus-visible:left-4 focus-visible:z-(--z-skip-link)',
        'focus-visible:rounded-(--radius-md) focus-visible:bg-spot-500 focus-visible:px-5 focus-visible:py-3',
        'focus-visible:font-body focus-visible:text-body-md focus-visible:font-semibold focus-visible:text-stage-950',
        'focus-visible:shadow-elev-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage-950',
        className,
      )}
    >
      {label}
    </a>
  )
}
