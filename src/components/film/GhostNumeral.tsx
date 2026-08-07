import { cn } from '@/lib/utils/cn'

/**
 * The ghost numeral.
 *
 * Architecture, not text. Spec: Visual Specification.md §A —
 * *"set 3–5% above ground colour, architecture not text"* — and HANDOFF §3.2,
 * which requires it to be `aria-hidden`.
 *
 * It is the week number standing *behind* the frame, the way a set number is
 * painted on a flat. It is never announced, never selectable, never a heading,
 * and it must never be the only place a number appears — every ghost has a
 * legible counterpart in the copy beside it.
 *
 * ## Why the colour is passed in rather than derived
 *
 * The numeral sits a few percent above whichever ground it is on, so its value
 * changes per movement — `#131824` on wing, `#141A2C` on stage, `#0C1018` on
 * pitch. Deriving that with `opacity` instead would let the grain and the
 * amber spill show through it, which reads as a translucent overlay rather
 * than as something painted on the back wall.
 */

interface GhostNumeralProps {
  /** The digits. Presentational — always duplicated in real copy nearby. */
  value: string
  /** Exact ground-plus-3-to-5% colour for the movement this sits in. */
  color: string
  /** Positioning, per shot. */
  className?: string
}

export function GhostNumeral({ value, color, className }: GhostNumeralProps) {
  return (
    <span
      aria-hidden="true"
      data-ghost-numeral
      className={cn(
        'pointer-events-none absolute select-none font-display tabular-nums',
        'text-ghost',
        className,
      )}
      style={{
        color,
        fontWeight: 200,
        fontVariationSettings: "'opsz' 96, 'wght' 200",
      }}
    >
      {value}
    </span>
  )
}
