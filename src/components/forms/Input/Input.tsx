'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import { useField } from '../FormField/FormField'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'aria-invalid' | 'prefix'> {
  /**
   * Decorative adornment, e.g. a currency symbol or a search glyph.
   * Named `startAdornment` rather than `prefix` because `prefix` is a real HTML
   * attribute with a different meaning and a conflicting type.
   */
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

/**
 * Shared control styling. 44px minimum height, 1px `n-300` border, `radius-sm`.
 * Focus: border → `spot-500` plus a 2px ring (05-motion-system.md §13).
 */
export const controlClass = cn(
  'w-full min-h-11 rounded-(--radius-sm) px-3 py-2',
  'bg-(--color-surface-raised) text-(--color-text-primary)',
  'border border-n-300',
  'font-body text-body-md',
  'placeholder:text-(--color-text-muted)',
  'transition-[border-color,box-shadow] duration-(--duration-fast) ease-(--ease-stage)',
  'hover:border-n-400',
  'focus-visible:border-spot-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-spot-500',
  'disabled:cursor-not-allowed disabled:bg-(--color-surface-sunken) disabled:opacity-(--opacity-disabled)',
  'aria-invalid:border-error aria-invalid:focus-visible:outline-error',
)

/**
 * Text input.
 *
 * Must be rendered inside `<FormField>`, which supplies the id and the ARIA
 * wiring. That is deliberate: it makes an unlabelled input impossible to build
 * by accident.
 *
 * Callers are responsible for correct `type` and `autocomplete` — `tel`,
 * `email`, `autocomplete="tel"` (04-design-system.md §9 rule 7).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, startAdornment, endAdornment, ...rest },
  ref,
) {
  const { controlProps } = useField()

  const hasStart = Boolean(startAdornment)
  const hasEnd = Boolean(endAdornment)

  const input = (
    <input
      ref={ref}
      {...controlProps}
      {...rest}
      className={cn(controlClass, hasStart && 'pl-9', hasEnd && 'pr-9', className)}
    />
  )

  if (!hasStart && !hasEnd) return input

  return (
    <div className="relative flex w-full items-center">
      {hasStart ? (
        <span aria-hidden="true" className="pointer-events-none absolute left-3 text-(--color-text-muted)">
          {startAdornment}
        </span>
      ) : null}
      {input}
      {hasEnd ? (
        <span aria-hidden="true" className="pointer-events-none absolute right-3 text-(--color-text-muted)">
          {endAdornment}
        </span>
      ) : null}
    </div>
  )
})
