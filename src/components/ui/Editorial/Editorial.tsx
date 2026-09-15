import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

/**
 * Display type scale above the token ceiling.
 *
 * `--text-display-lg` tops out at 46px, which is the right size for an
 * interior statement and too quiet to hold a full-bleed photograph or open a
 * section of the homepage. These two sizes exist only here, shared by every
 * section, so the homepage has one hero size and one section size rather than
 * a new clamp per component.
 */
export const DISPLAY_HERO =
  'font-display font-semibold text-[clamp(2.625rem,1.35rem+4.6vw,5.5rem)] leading-[0.98] tracking-[-0.03em]'

export const DISPLAY_SECTION =
  'font-display font-semibold text-[clamp(2rem,1.25rem+2.5vw,3.625rem)] leading-[1.04] tracking-[-0.022em]'

/** The programme-note italic — Newsreader, used for names and quoted voices. */
export const VOICE_LG = 'font-body italic text-[clamp(1.5rem,1.15rem+1.2vw,2.25rem)] leading-[1.22] tracking-[-0.01em]'

/**
 * A section's label: small tracked Bricolage capitals with a short rule.
 * The rule is the only ornament the homepage uses, and it is the same one
 * everywhere.
 */
export function Eyebrow({
  children,
  className,
  index,
  as: Tag = 'p',
  id,
}: {
  children: React.ReactNode
  className?: string
  /** Optional folio number, e.g. "02". */
  index?: string
  /** `h2` when the label is the section's only heading. */
  as?: 'p' | 'h2'
  id?: string
}) {
  return (
    <Tag
      id={id}
      data-eyebrow
      className={cn(
        'flex items-center gap-3 font-display text-label uppercase text-(--color-text-muted)',
        className,
      )}
    >
      {index ? <span className="tabular-nums">{index}</span> : null}
      <span aria-hidden="true" className="block h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </Tag>
  )
}

/** An understated text action: label, arrow, underline that thickens on hover. */
export function TextLink({
  href,
  children,
  className,
  arrow = '→',
}: {
  href: string
  children: React.ReactNode
  className?: string
  arrow?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/text inline-flex min-h-11 items-center gap-2 font-display text-body-md font-medium text-(--color-text-primary)',
        'underline decoration-current/30 decoration-1 underline-offset-[7px] transition-[text-decoration-color] duration-(--duration-base) hover:decoration-current',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-(--duration-base) ease-(--ease-stage) group-hover/text:translate-x-1 motion-reduce:transition-none"
      >
        {arrow}
      </span>
    </Link>
  )
}

/** A short documentary caption under a photograph. */
export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <figcaption className={cn('mt-3 font-display text-body-sm text-(--color-text-muted)', className)}>
      {children}
    </figcaption>
  )
}
