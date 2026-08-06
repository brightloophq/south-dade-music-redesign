import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type TypeToken =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label'
  | 'stat'

export type TypeWidth = 'condensed' | 'normal' | 'wide' | 'expanded'

export interface TextProps {
  children: ReactNode
  className?: string
  /**
   * Visual size. **Decoupled from semantic level** — a `<h2>` may render at
   * `display-md` without changing the heading hierarchy (04-design-system.md §2).
   */
  token?: TypeToken
  /** The semantic element. Choose by document structure, never by size. */
  as?: ElementType
  /** Archivo width axis. Expanded is permitted at `display-md` and above only. */
  width?: TypeWidth
  /** Constrain to the 68ch measure. */
  measure?: boolean | 'tight'
  /** Tabular numerals — mandatory anywhere a figure animates or updates. */
  numeric?: boolean
  balance?: boolean
  id?: string
}

const tokenClass: Record<TypeToken, string> = {
  'display-xl': 'font-display font-bold text-display-xl',
  'display-lg': 'font-display font-bold text-display-lg',
  'display-md': 'font-display font-semibold text-display-md',
  'heading-lg': 'font-display font-semibold text-heading-lg',
  'heading-md': 'font-display font-semibold text-heading-md',
  'heading-sm': 'font-body font-semibold text-heading-sm',
  'body-lg': 'font-body text-body-lg',
  'body-md': 'font-body text-body-md',
  'body-sm': 'font-body text-body-sm',
  /** The only uppercase token in the system. */
  label: 'font-body font-semibold text-label uppercase',
  stat: 'font-display font-bold text-stat tabular-nums',
}

const widthClass: Record<TypeWidth, string> = {
  condensed: 'font-condensed',
  normal: '',
  wide: 'font-wide',
  expanded: 'font-expanded',
}

/** Tokens at which the expanded width axis is permitted (final-art-direction.md §14). */
const EXPANDED_ALLOWED: readonly TypeToken[] = ['display-xl', 'display-lg', 'display-md', 'stat']

const defaultElement: Record<TypeToken, ElementType> = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h2',
  'heading-lg': 'h2',
  'heading-md': 'h3',
  'heading-sm': 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  label: 'span',
  stat: 'span',
}

/**
 * Typography primitive.
 * Canonical spec: docs/redesign/04-design-system.md §2
 *
 * The central rule: **visual size is a token choice, decoupled from semantic
 * level.** Phase 2 found H2 used as body lead-ins ("We offer", "Key benefits
 * include") and H1 rendered two or three times per page. Choose `as` by
 * document structure and `token` by visual weight, independently.
 *
 * Sentence case for headings. Not Title Case, not ALL CAPS except `label`.
 */
export function Text({
  children,
  className,
  token = 'body-md',
  as,
  width = 'normal',
  measure = false,
  numeric = false,
  balance,
  id,
}: TextProps) {
  const Component = as ?? defaultElement[token]

  if (process.env.NODE_ENV !== 'production' && width === 'expanded' && !EXPANDED_ALLOWED.includes(token)) {
    console.warn(
      `[typography] Expanded width is permitted at display-md and above only; got "${token}". See docs/redesign/final-art-direction.md §7.`,
    )
  }

  return (
    <Component
      id={id}
      className={cn(
        tokenClass[token],
        widthClass[width],
        measure === true && 'measure',
        measure === 'tight' && 'measure-tight',
        numeric && 'tabular-nums',
        balance && 'text-balance',
        className,
      )}
      {...(numeric ? { 'data-numeric': '' } : {})}
    >
      {children}
    </Component>
  )
}

/** Eyebrow / kicker — the `label` token, the system's only uppercase treatment. */
export function Eyebrow({ children, className, as = 'span', id }: Omit<TextProps, 'token' | 'width'>) {
  return (
    <Text token="label" as={as} id={id} className={cn('text-(--color-text-secondary)', className)}>
      {children}
    </Text>
  )
}

/**
 * Prose wrapper for authored long-form content.
 * Constrained to the 68ch measure; never centred beyond three lines.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'measure font-body text-body-md text-(--color-text-primary)',
        '[&_p+p]:mt-4 [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:mt-8 [&_h3]:mb-2',
        '[&_a]:text-(--color-link-default) [&_a]:underline [&_a]:underline-offset-4',
        '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li+li]:mt-2',
        className,
      )}
    >
      {children}
    </div>
  )
}
