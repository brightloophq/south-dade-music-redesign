'use client'

import { useId, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export interface RadioOption {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  /** Shared form field name. */
  name: string
  /** The question this group answers. Rendered as the group's legend. */
  legend: ReactNode
  options: readonly RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  description?: ReactNode
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  /** Horizontal only for 2–3 short options; wraps in Spanish. */
  orientation?: 'vertical' | 'horizontal'
}

/**
 * Radio group.
 *
 * A single radio in isolation is meaningless, so the primitive is the *group*.
 * `<fieldset>` + `<legend>` is used rather than `role="radiogroup"`: it is the
 * native pattern, and screen readers announce the legend with every option
 * without any ARIA authoring.
 */
export function RadioGroup({
  name,
  legend,
  options,
  value,
  defaultValue,
  onChange,
  description,
  error,
  required = false,
  disabled = false,
  className,
  orientation = 'vertical',
}: RadioGroupProps) {
  const id = useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : null, description ? descriptionId : null].filter(Boolean).join(' ')

  return (
    <fieldset
      className={cn('flex w-full flex-col gap-2 border-0 p-0', className)}
      disabled={disabled}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? true : undefined}
      aria-required={required || undefined}
    >
      <legend className="mb-1 font-body text-body-sm font-semibold text-(--color-text-primary)">
        {legend}
        {required ? <span className="font-normal text-(--color-text-muted)"> (required)</span> : null}
      </legend>

      {description ? (
        <p id={descriptionId} className="font-body text-body-sm text-(--color-text-muted)">
          {description}
        </p>
      ) : null}

      <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-x-6')}>
        {options.map((option) => {
          const optionId = `${id}-${option.value}`

          return (
            <div key={option.value} className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center">
                  <input
                    id={optionId}
                    type="radio"
                    name={name}
                    value={option.value}
                    disabled={option.disabled}
                    {...(value !== undefined
                      ? { checked: value === option.value, onChange: () => onChange?.(option.value) }
                      : { defaultChecked: defaultValue === option.value, onChange: () => onChange?.(option.value) })}
                    className="size-5 cursor-pointer appearance-none rounded-full border border-n-400 bg-(--color-surface-raised) transition-colors duration-(--duration-instant) checked:border-6 checked:border-spot-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
                  />
                </span>
                <label
                  htmlFor={optionId}
                  className={cn(
                    'cursor-pointer self-center font-body text-body-md text-(--color-text-primary)',
                    option.disabled && 'cursor-not-allowed opacity-(--opacity-disabled)',
                  )}
                >
                  {option.label}
                </label>
              </div>
              {option.description ? (
                <p className="pl-11 font-body text-body-sm text-(--color-text-muted)">{option.description}</p>
              ) : null}
            </div>
          )
        })}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="font-body text-body-sm font-medium text-error">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}
