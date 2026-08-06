'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'

import { primaryCta, primaryNavigation } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

function DrawerDestination({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const className = cn(
    'flex min-h-11 items-center rounded-(--radius-sm) px-2 font-body text-body-lg',
    item.emphasis === 'flagship' && 'font-display font-semibold',
  )

  if (item.status !== 'live') {
    return (
      <span
        className={cn(className, 'cursor-default text-n-400')}
        data-route-status={item.status}
        {...(item.gate ? { 'data-gate': item.gate } : {})}
      >
        {item.label}
      </span>
    )
  }

  return (
    <Link href={item.href} onClick={onNavigate} className={cn(className, 'text-n-0 hover:text-spot-400')}>
      {item.label}
    </Link>
  )
}

/**
 * Mobile navigation drawer.
 * Canonical spec: docs/redesign/04-design-system.md §11 · 02-IA §4
 *
 * Behaviour:
 *  - Full-screen `stage-900`, opens from the right.
 *  - **Accordion sections, never nested screens** — a parent must never lose
 *    their place in a hierarchy.
 *  - Close button 48×48, top-right.
 *  - Body scroll locked without layout shift (CLS target 0.00).
 *  - **Focus trapped while open, restored on close.** This is the one surface
 *    where trapping is correct: it is a modal dialog, unlike the desktop
 *    mega-menu.
 *  - Closes on Escape and on navigation.
 */
export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [lastPathname, setLastPathname] = useState(pathname)
  const panelRef = useRef<HTMLDivElement>(null)
  const drawerId = useId()

  const close = useCallback(() => setOpen(false), [])

  /**
   * Close on route change by adjusting state during render rather than in an
   * effect. An effect would render the drawer open for one frame on the new
   * route before closing it.
   * https://react.dev/learn/you-might-not-need-an-effect
   */
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
  }

  useLockBodyScroll(open)
  useFocusTrap(panelRef, open, { onEscape: close })

  return (
    <div className={cn('lg:hidden', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-(--radius-md) text-(--color-text-primary)"
      >
        <Icon icon={open ? X : Menu} size="base" />
      </button>

      {/*
        The drawer stays mounted and is hidden with the `hidden` attribute rather
        than being conditionally rendered, so `aria-controls` always resolves.
      */}
      <div
        id={drawerId}
        ref={panelRef}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        className={cn(
          'fixed inset-0 z-(--z-drawer) flex flex-col',
          'bg-stage-900 text-n-0',
          'overflow-y-auto overscroll-contain',
        )}
        data-register="house"
      >
        <div className="flex items-center justify-between px-(--grid-margin) py-4">
          <span className="font-display text-heading-sm font-semibold">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex size-12 items-center justify-center rounded-(--radius-md) text-n-0"
          >
            <Icon icon={X} size="base" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-(--grid-margin) pb-8">
          <ul className="flex flex-col gap-1">
            {primaryNavigation.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const isExpanded = expanded === item.id

              return (
                <li key={item.id} className="border-b border-stage-700 py-1">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`${drawerId}-${item.id}`}
                        onClick={() => setExpanded(isExpanded ? null : item.id)}
                        className="flex min-h-11 w-full items-center justify-between px-2 font-body text-body-lg text-n-0"
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-spot-400">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      <ul id={`${drawerId}-${item.id}`} hidden={!isExpanded} className="flex flex-col gap-1 pb-2 pl-4">
                        <li>
                          <DrawerDestination item={{ ...item, children: undefined, label: `All ${item.label}` }} onNavigate={close} />
                        </li>
                        {item.children!.map((child) => (
                          <li key={child.id}>
                            <DrawerDestination item={child} onNavigate={close} />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <DrawerDestination item={item} onNavigate={close} />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            {primaryCta.status === 'live' ? (
              <Button href={primaryCta.href} variant="primary" size="xl" fullWidth onClick={close}>
                {primaryCta.label}
              </Button>
            ) : (
              <Button variant="primary" size="xl" fullWidth disabled aria-disabled data-gate={primaryCta.gate}>
                {primaryCta.label}
              </Button>
            )}

            {/*
              Language switch placeholder. ⚠️ Gate B-6 — bilingual support is
              currently claimed sitewide and delivered nowhere. The control is
              disabled rather than hidden so the shell is complete, but it must
              not imply a Spanish path that does not exist.
            */}
            <div
              className="flex items-center gap-2 px-2 font-body text-body-sm text-n-400"
              data-gate="B-6"
              aria-hidden="true"
            >
              <span className="rounded-(--radius-sm) border border-stage-700 px-2 py-1">EN</span>
              <span className="opacity-(--opacity-muted)">ES — not yet available</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
