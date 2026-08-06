'use client'

import { useReducedMotion, useSetReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils/cn'

/**
 * Manual reduced-motion toggle.
 *
 * "Ship a manual toggle in the footer alongside the OS preference, persisted in
 * local storage. Many users don't know the OS setting exists."
 * — docs/redesign/05-motion-system.md §14 principle 3
 *
 * It sets an explicit override; clearing it returns the user to OS detection.
 * The control itself never animates.
 */
export function MotionToggle({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()
  const setOverride = useSetReducedMotion()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reducedMotion}
      onClick={() => setOverride(!reducedMotion)}
      className={cn(
        'inline-flex min-h-11 items-center gap-3 rounded-(--radius-sm) px-2',
        'font-body text-body-sm text-n-300 transition-colors duration-(--duration-fast)',
        'hover:text-spot-400',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-(--radius-full) border',
          reducedMotion ? 'border-spot-500 bg-spot-500' : 'border-stage-600 bg-stage-800',
        )}
      >
        <span
          className={cn(
            'absolute size-4 rounded-(--radius-full) transition-[left] duration-(--duration-fast) motion-reduce:transition-none',
            reducedMotion ? 'left-6 bg-stage-950' : 'left-1 bg-n-300',
          )}
        />
      </span>
      Reduce motion
    </button>
  )
}
