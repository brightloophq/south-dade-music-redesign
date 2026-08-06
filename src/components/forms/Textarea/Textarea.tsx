'use client'

import { forwardRef, type TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'
import { controlClass } from '../Input/Input'
import { useField } from '../FormField/FormField'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'aria-invalid'> {
  /** Visible rows. Defaults to 4 — enough to signal "a few sentences". */
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...rest },
  ref,
) {
  const { controlProps } = useField()

  return (
    <textarea
      ref={ref}
      rows={rows}
      {...controlProps}
      {...rest}
      className={cn(controlClass, 'min-h-24 resize-y py-3 leading-relaxed', className)}
    />
  )
})
