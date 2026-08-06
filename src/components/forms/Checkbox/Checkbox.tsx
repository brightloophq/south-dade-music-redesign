'use client'

import { Check } from 'lucide-react'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** The visible label. Required — a checkbox without one is unusable. */
  label: ReactNode
  description?: ReactNode
  error?: string
}

/**
 * Checkbox.
 *
 * Standalone rather than inside `<FormField>`: a checkbox's label sits beside
 * the control, not above it, so it owns its own layout and association.
 *
 * The native input stays in the DOM and is only visually replaced — it keeps
 * the platform's keyboard behaviour, focus handling and form participation.
 * The whole label is the hit target, comfortably exceeding 44×44px.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, error, className, disabled, ...rest },
  ref,
) {
  const id = useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : null, description ? descriptionId : null].filter(Boolean).join(' ')

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-3">
        <span className="relative flex size-11 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            className="peer size-5 cursor-pointer appearance-none rounded-(--radius-sm) border border-n-400 bg-(--color-surface-raised) transition-colors duration-(--duration-instant) checked:border-spot-500 checked:bg-spot-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled) aria-invalid:border-error"
            {...rest}
          />
          <span className="pointer-events-none absolute text-stage-950 opacity-0 peer-checked:opacity-100">
            <Icon icon={Check} size="inline" className="size-4" />
          </span>
        </span>

        <label
          htmlFor={id}
          className={cn(
            'cursor-pointer self-center font-body text-body-md text-(--color-text-primary)',
            disabled && 'cursor-not-allowed opacity-(--opacity-disabled)',
          )}
        >
          {label}
        </label>
      </div>

      {description ? (
        <p id={descriptionId} className="pl-11 font-body text-body-sm text-(--color-text-muted)">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="pl-11 font-body text-body-sm font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
})
