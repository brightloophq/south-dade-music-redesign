import Link from 'next/link'
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import { isExternalHref } from '@/lib/utils/url'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'text'
  | 'icon'
  | 'cta'
  | 'on-dark-secondary'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /**
   * Price shown in the label. Where a price exists it MUST appear here —
   * this structurally prevents the Phase 2 non-disclosure failure, where the
   * $25 trial charge was disclosed on 2 pages out of 26
   * (04-design-system.md §7 rule 2).
   */
  price?: string
  loading?: boolean
  /** Decorative only — `aria-hidden`. The label always carries the meaning. */
  iconStart?: ReactNode
  iconEnd?: ReactNode
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

/**
 * Shared base. Note what is NOT here: no `transition-transform`.
 * Hover never translates — moving the click target between intent and click
 * causes mis-clicks (05-motion-system.md §11 rule 3).
 */
/*
 * Radius is 0 everywhere in this direction. The base carries no radius at all;
 * only `primary` opts into the pill, because the primary action is the single
 * reason the radius exception exists (Visual Specification.md §G).
 */
const base = cn(
  'relative inline-flex items-center justify-center gap-2',
  'rounded-none font-display font-semibold whitespace-nowrap',
  'transition-[background-color,box-shadow,border-color,color]',
  'duration-(--duration-fast) ease-(--ease-stage)',
  'disabled:pointer-events-none disabled:opacity-(--opacity-disabled)',
  'aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled)',
)

const variantClass: Record<ButtonVariant, string> = {
  /**
   * The trial action. Amber pill, stage-blue text — 8.6:1.
   * This is amber use №4 of 4, and the only rounded object on the site.
   */
  primary: cn(
    'rounded-(--radius-full) bg-spot-500 text-(--color-ground-stage)',
    'hover:brightness-105 active:brightness-95',
  ),
  /**
   * No fill, 1px underline on hover, no pill shape. Velvet is retired — a
   * second accent breaks the amber budget.
   */
  secondary: cn(
    'bg-transparent text-(--color-text-primary)',
    'underline-offset-[6px] decoration-1 hover:underline',
  ),
  /** Inline, low emphasis. */
  ghost: cn('bg-transparent text-(--color-link-default)', 'hover:underline hover:underline-offset-4'),
  /** Learn more, See details. A hairline, not a card edge. */
  outline: cn(
    'bg-transparent text-(--color-text-primary) border border-(--color-border-default)',
    'hover:border-(--color-text-primary)',
  ),
  /** Reads as a link but sized as a control. */
  text: cn('bg-transparent text-(--color-link-default) underline underline-offset-4 decoration-1', 'hover:decoration-2'),
  /** Icon-only. Requires `aria-label`. */
  icon: cn('bg-transparent text-(--color-text-primary) rounded-(--radius-full)', 'hover:bg-(--color-surface-sunken)'),
  /**
   * The spotlight glow — the visual signature of the brand. Reserved for the
   * single most important conversion action on the page. Used broadly it loses
   * all meaning (04-design-system.md §5).
   *
   * Refinement: on hover the glow *widens* rather than the fill darkening —
   * light spreading, not a colour swap. It is the one interaction on the page
   * that behaves like the brand's own metaphor, and it costs a box-shadow
   * transition rather than a transform, so the click target never moves.
   */
  cta: cn(
    'bg-spot-500 text-stage-950 shadow-spotlight',
    'transition-[background-color,box-shadow] duration-(--duration-base)',
    'pointer-fine:hover:bg-spot-400',
    'pointer-fine:hover:shadow-[0_0_0_1px_var(--color-spot-500),0_12px_44px_rgba(245,165,36,0.42)]',
    'active:bg-spot-600 active:shadow-spotlight',
  ),
  /** Hero secondary, on dark grounds. */
  'on-dark-secondary': cn(
    'bg-transparent text-n-0 border border-n-0/40',
    'hover:border-n-0/70 hover:bg-n-0/10',
  ),
  /** Admin only. */
  destructive: cn('bg-error text-n-0', 'hover:brightness-90'),
}

/** Every size meets the 44px minimum touch target except `sm`, which is for
 *  inline use inside cards where 36px plus 8px separation is acceptable. */
const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-sm',
  md: 'h-11 px-6 text-body-md',
  lg: 'min-h-13 px-8 py-[17px] text-body-md',
  xl: 'h-15 px-10 text-body-lg',
}

const iconSizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 w-9 p-0',
  md: 'h-11 w-11 p-0',
  lg: 'h-13 w-13 p-0',
  xl: 'h-15 w-15 p-0',
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="absolute inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
    />
  )
}

/**
 * Button.
 * Canonical spec: docs/redesign/04-design-system.md §7
 *
 * Content rules enforced by this component:
 *  1. **Verb + object** — "Book a trial", never "Submit" or "Click here".
 *     Not enforceable in code; enforced in review.
 *  2. **Price in the label** where a price exists — `price` renders as
 *     `Label — $25`.
 *  3. Never two primaries in one viewport — enforced in review.
 *  4. Minimum 44×44px touch target with 8px separation.
 *  5. **Every button is a real link or a real control.** Passing `href` renders
 *     an anchor; otherwise a `<button>`. The twenty text-only prompts Phase 2
 *     found become real controls or are deleted.
 *  6. Icons are decorative and `aria-hidden`; the label carries the meaning.
 *
 * Loading state keeps the label and locks the width so the layout never shifts
 * (05-motion-system.md §13) — CLS target is 0.00.
 */
export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', price, loading = false, iconStart, iconEnd, fullWidth, className, children, ...rest },
  ref,
) {
  const isIconOnly = variant === 'icon'

  const classes = cn(
    base,
    variantClass[variant],
    isIconOnly ? iconSizeClass[size] : sizeClass[size],
    fullWidth && 'w-full',
    className,
  )

  const label = (
    <>
      {iconStart ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {iconStart}
        </span>
      ) : null}
      {children ? <span className={cn(loading && 'invisible')}>{children}</span> : null}
      {price ? (
        <span className={cn('tabular-nums', loading && 'invisible')} data-numeric>
          {' '}
          — {price}
        </span>
      ) : null}
      {iconEnd ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {iconEnd}
        </span>
      ) : null}
      {loading ? <Spinner /> : null}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink
    const external = isExternalHref(href)

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          {...(loading ? { 'aria-busy': true } : {})}
          {...anchorProps}
        >
          {label}
        </a>
      )
    }

    return (
      <Link ref={ref} href={href} className={classes} {...(loading ? { 'aria-busy': true } : {})} {...anchorProps}>
        {label}
      </Link>
    )
  }

  const { type = 'button', disabled, ...buttonProps } = rest as ButtonAsButton

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {label}
    </button>
  )
})
