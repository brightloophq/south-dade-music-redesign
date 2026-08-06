'use client'

import { ChevronDown } from 'lucide-react'
import { forwardRef, type SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { controlClass } from '../Input/Input'
import { useField } from '../FormField/FormField'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'aria-invalid' | 'children'> {
  options: readonly SelectOption[]
  /**
   * Placeholder rendered as a disabled first option. It is NOT a label —
   * `<FormField>` always supplies a visible one.
   */
  placeholder?: string
}

/**
 * Native select.
 *
 * Deliberately native rather than a custom listbox: native selects get the
 * platform's own keyboard handling, screen-reader support and mobile picker for
 * free, and this audience includes Unique Abilities scholarship students where
 * assistive-technology compatibility is a market requirement, not a nicety.
 *
 * A custom combobox should only be introduced if a genuine requirement (search,
 * multi-select, rich options) appears — and then with full ARIA authoring.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, options, placeholder, defaultValue, ...rest },
  ref,
) {
  const { controlProps } = useField()

  return (
    <div className="relative flex w-full items-center">
      <select
        ref={ref}
        defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
        {...controlProps}
        {...rest}
        className={cn(controlClass, 'cursor-pointer appearance-none pr-10', className)}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-(--color-text-muted)">
        <Icon icon={ChevronDown} size="inline" />
      </span>
    </div>
  )
})
