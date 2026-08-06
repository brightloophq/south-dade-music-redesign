'use client'

import { createContext, useContext, useId, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface FieldContextValue {
  id: string
  descriptionId: string
  errorId: string
  hasError: boolean
  required: boolean
  disabled: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

/**
 * Wiring for the control inside a FormField. Returns the ids and ARIA
 * attributes a control must spread onto itself so label, helper text and error
 * are programmatically associated (04-design-system.md §9 rule 4/5).
 */
export function useField() {
  const context = useContext(FieldContext)
  if (!context) {
    throw new Error('Form controls must be rendered inside <FormField>.')
  }

  const describedBy = [context.hasError ? context.errorId : null, context.descriptionId].filter(Boolean).join(' ')

  return {
    ...context,
    controlProps: {
      id: context.id,
      required: context.required || undefined,
      disabled: context.disabled || undefined,
      'aria-invalid': context.hasError || undefined,
      'aria-describedby': describedBy || undefined,
    },
  }
}

export interface FormFieldProps {
  children: ReactNode
  label: ReactNode
  /** Helper text. Always visible — never a placeholder standing in for a label. */
  description?: ReactNode
  /** Validation message. Appears instantly, in place, with no entrance animation. */
  error?: string
  /** Marked explicitly. We mark required, not optional (04 §9 rule 6). */
  required?: boolean
  disabled?: boolean
  className?: string
  /** Override the generated id, e.g. to match a server-rendered form. */
  id?: string
}

/**
 * Field wrapper — label, control, helper text and validation in one unit.
 * Canonical spec: docs/redesign/04-design-system.md §9
 *
 * The current site has **zero native forms**. Everything here is new and must be
 * built to a high standard, because it is now the entire conversion mechanism.
 *
 * Rules enforced structurally:
 *  1. **Visible labels always.** Placeholder-as-label fails accessibility and
 *     memory. There is no `hideLabel` prop, deliberately.
 *  2. One column — the wrapper never lays out side-by-side fields.
 *  3. Errors are programmatically linked via `aria-describedby` and announced.
 *  4. Required is explicit and conveyed in text, not by colour alone.
 *
 * ⚠️ Phase 4 ships primitives only. No business forms — the trial booking and
 * camp reservation flows are blocked on gate B-8 (the deposit amount and trial
 * price are unpublished).
 */
export function FormField({
  children,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className,
  id: providedId,
}: FormFieldProps) {
  const generatedId = useId()
  const id = providedId ?? generatedId

  const context: FieldContextValue = {
    id,
    descriptionId: `${id}-description`,
    errorId: `${id}-error`,
    hasError: Boolean(error),
    required,
    disabled,
  }

  return (
    <FieldContext.Provider value={context}>
      <div className={cn('flex w-full flex-col gap-2', className)} data-field>
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>

        {children}

        {description ? <HelperText id={context.descriptionId}>{description}</HelperText> : null}
        {error ? <ValidationMessage id={context.errorId}>{error}</ValidationMessage> : null}
      </div>
    </FieldContext.Provider>
  )
}

export interface LabelProps {
  children: ReactNode
  htmlFor: string
  required?: boolean
  disabled?: boolean
  className?: string
}

/** Always visible. `body-sm` 600, `n-800`. */
export function Label({ children, htmlFor, required = false, disabled = false, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'font-body text-body-sm font-semibold text-(--color-text-primary)',
        disabled && 'opacity-(--opacity-disabled)',
        className,
      )}
    >
      {children}
      {required ? (
        <>
          {' '}
          <span className="font-normal text-(--color-text-muted)">(required)</span>
        </>
      ) : null}
    </label>
  )
}

/** Helper text. Never carries information required to complete the field. */
export function HelperText({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <p id={id} className={cn('font-body text-body-sm text-(--color-text-muted)', className)}>
      {children}
    </p>
  )
}

/**
 * Validation message.
 *
 * `role="alert"` announces it immediately. No entrance animation — error
 * messages appear instantly, in place (05-motion-system.md §16 rule 6). The
 * icon is decorative; the text carries the meaning, and colour is never the
 * only signal.
 */
export function ValidationMessage({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <p id={id} role="alert" className={cn('font-body text-body-sm font-medium text-error', className)}>
      {children}
    </p>
  )
}
