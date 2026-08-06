'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'

import { primaryCta } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils/cn'

import { MobileNav } from '../MobileNav'
import { Navigation } from '../Navigation'

export interface HeaderProps {
  /**
   * Whether the header floats transparently over a dark hero.
   * Defaults to the route table below rather than being detected — a header
   * cannot know what is beneath it, but the site does.
   */
  overHero?: boolean
  className?: string
}

/**
 * Routes that open with a House-register hero, over which the header floats
 * transparently until the first scroll. Kept here rather than in the layout
 * because the marketing layout is a Server Component and cannot read the
 * pathname without becoming a client boundary.
 */
const ROUTES_WITH_DARK_HERO = new Set(['/'])

/**
 * Site header.
 * Canonical spec: docs/redesign/04-design-system.md §11 · final-art-direction.md §5
 *
 * Behaviour:
 *  - 80px, condensing to 64px on scroll.
 *  - Transparent over a dark hero; solid `n-0` with a hairline thereafter.
 *  - The primary CTA is a persistent button, never a nav item, and never
 *    scrolls away.
 *  - `--header-height` is published as a custom property so `scroll-padding-top`
 *    and the sticky sidebar rail stay in sync with the real height.
 *
 * Only `background-color`, `box-shadow` and `height` transition — no transform,
 * so the header never contributes layout shift.
 */
export function Header({ overHero, className }: HeaderProps) {
  const pathname = usePathname()
  const { isScrolled } = useScrollDirection({ threshold: 24 })

  const floatsOverHero = overHero ?? ROUTES_WITH_DARK_HERO.has(pathname)
  const solid = isScrolled || !floatsOverHero

  return (
    <header
      /*
        While floating over the House hero the header adopts that register, so
        its type and controls read as `n-0` against the dark ground. Once solid
        it returns to the Desk. The header is the one component that crosses
        rooms, and it must always be legible against what it sits on.
      */
      data-register={!solid ? 'house' : undefined}
      className={cn(
        'sticky top-0 z-(--z-header) w-full',
        'transition-[background-color,box-shadow,height] duration-(--duration-base) ease-(--ease-stage)',
        'motion-reduce:transition-none',
        solid
          ? 'h-16 border-b border-(--color-border-default) bg-(--color-surface-raised)'
          : 'h-20 border-b border-transparent bg-transparent',
        className,
      )}
      style={{ ['--header-height' as string]: solid ? '64px' : '80px' }}
    >
      <Container width="wide" className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center font-display text-heading-sm font-bold tracking-tight text-(--color-text-primary)"
        >
          {/*
            ⚠️ Gate B-5 / D-1 — the estate runs four brand names and the logo has
            not been reviewed, so the wordmark is set in type rather than an
            image. Replacing this with the real mark is blocked on both gates.
          */}
          {siteConfig.shortName}
        </Link>

        <Navigation className="flex-1 justify-center" />

        <div className="flex shrink-0 items-center gap-2">
          {/*
            Search placeholder. Disabled until a search index exists — a search
            box that returns nothing is worse than no search box.
          */}
          <button
            type="button"
            disabled
            aria-label="Search (not yet available)"
            title="Search is not yet available"
            className="hidden size-11 items-center justify-center rounded-(--radius-md) text-(--color-text-muted) opacity-(--opacity-disabled) lg:inline-flex"
          >
            <Icon icon={Search} size="inline" />
          </button>

          {/*
            Language switch placeholder. ⚠️ Gate B-6 — the bilingual claim is
            currently made sitewide and delivered nowhere. Rendered as a static
            indicator, not a control, so it promises nothing.
          */}
          <span
            data-gate="B-6"
            className="hidden items-center gap-1 rounded-(--radius-sm) border border-(--color-border-default) px-2 py-1 font-body text-label font-semibold tracking-[0.08em] text-(--color-text-muted) lg:inline-flex"
          >
            <span aria-current="true" className="text-(--color-text-primary)">
              EN
            </span>
            <span aria-hidden="true">|</span>
            <span title="Spanish is not yet available">ES</span>
          </span>

          {primaryCta.status === 'live' ? (
            <Button href={primaryCta.href} variant="primary" size="md" className="hidden sm:inline-flex">
              {primaryCta.label}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              disabled
              aria-disabled
              data-gate={primaryCta.gate}
              title="Booking is not yet available"
              className="hidden sm:inline-flex"
            >
              {primaryCta.label}
            </Button>
          )}

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
