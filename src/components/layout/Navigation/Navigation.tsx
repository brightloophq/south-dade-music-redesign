'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { primaryNavigation } from '@/config/navigation'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/types/navigation'

/** 150ms hover-intent delay before a mega-menu opens (04-design-system.md §11). */
const HOVER_INTENT_MS = 150

/** Grace period before a pointer leaving the trigger closes the panel. */
const CLOSE_INTENT_MS = 180

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === '/') return pathname === '/'
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true
  return item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)) ?? false
}

/**
 * A nav destination. Routes that are not `live` render as plain text rather
 * than links — the foundation never ships a link to a page that does not exist
 * (02-information-architecture.md §10 rule 3).
 */
function NavDestination({
  item,
  className,
  children,
  ...rest
}: { item: NavItem; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  if (item.status !== 'live') {
    /*
     * `item.gate` is not emitted. Gate IDs are internal decision-register
     * vocabulary and belong in the typed config, comments and docs — not in
     * markup a visitor can read. Nothing selected on them at runtime.
     */
    return (
      <span
        className={cn(className, 'cursor-default opacity-(--opacity-muted)')}
        data-route-status={item.status}
        {...rest}
      >
        {children}
      </span>
    )
  }

  return (
    <Link href={item.href} className={className} {...rest}>
      {children}
    </Link>
  )
}

/**
 * Desktop navigation.
 * Canonical spec: docs/redesign/02-information-architecture.md §2 · 04 §11
 *
 * Behaviour:
 *  - Opens on hover **with** a 150ms intent delay, and on focus or click for
 *    keyboard users.
 *  - Closes on Escape, outside click, or focus leaving the panel.
 *  - **Never traps focus** — a menu is not a dialog. (The mobile drawer does
 *    trap; that is the correct distinction.)
 *  - The flagship item is typographically distinguished and never hidden behind
 *    a hover.
 *  - Underline draws from the centre outward on hover, pointer devices only.
 */
export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname()
  const [openId, setOpenId] = useState<string | null>(null)
  const [lastPathname, setLastPathname] = useState(pathname)
  const timerRef = useRef<number | undefined>(undefined)
  const navRef = useRef<HTMLElement>(null)

  /**
   * Close on route change by adjusting state during render rather than in an
   * effect — an effect would leave the panel open for one frame on the new page.
   * https://react.dev/learn/you-might-not-need-an-effect
   */
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (openId !== null) setOpenId(null)
  }

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
    timerRef.current = undefined
  }, [])

  const openWithIntent = useCallback(
    (id: string) => {
      clearTimer()
      timerRef.current = window.setTimeout(() => setOpenId(id), HOVER_INTENT_MS)
    },
    [clearTimer],
  )

  const close = useCallback(() => {
    clearTimer()
    setOpenId(null)
  }, [clearTimer])

  /*
    Closing needs its own delay, and for a different reason than opening.

    Opening is debounced to defeat accidental brushes. Closing is debounced to
    defeat *intentional* ones: the pointer path from a trigger to the item it
    wants inside the panel is a diagonal, and a diagonal briefly leaves both
    elements. With an immediate close the menu vanished mid-gesture. 180ms is
    longer than that traverse and shorter than a deliberate exit.
  */
  const closeWithIntent = useCallback(() => {
    clearTimer()
    timerRef.current = window.setTimeout(() => setOpenId(null), CLOSE_INTENT_MS)
  }, [clearTimer])

  // Escape and outside click.
  useEffect(() => {
    if (!openId) return

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close()
    }
    const onPointerDown = (event: PointerEvent): void => {
      if (!navRef.current?.contains(event.target as Node)) close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openId, close])

  useEffect(() => clearTimer, [clearTimer])

  return (
    <nav ref={navRef} aria-label="Main" className={cn('hidden lg:block', className)}>
      <ul className="flex items-center gap-1">
        {primaryNavigation.map((item) => {
          const active = isActive(pathname, item)
          const hasChildren = Boolean(item.children?.length)
          const isOpen = openId === item.id

          return (
            <li
              key={item.id}
              className="relative"
              onPointerEnter={hasChildren ? () => (openId === item.id ? clearTimer() : openWithIntent(item.id)) : undefined}
              onPointerLeave={hasChildren ? closeWithIntent : undefined}
              onFocus={hasChildren ? () => setOpenId(item.id) : undefined}
              onBlur={
                hasChildren
                  ? (event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) close()
                    }
                  : undefined
              }
            >
              <div className="flex items-center">
                <NavDestination
                  item={item}
                  aria-current={active && item.status === 'live' ? 'page' : undefined}
                  className={cn(
                    'group relative inline-flex min-h-11 items-center gap-1 rounded-(--radius-sm) px-3',
                    'font-body text-body-md transition-colors duration-(--duration-fast)',
                    item.emphasis === 'flagship'
                      ? 'font-display font-semibold text-(--color-text-primary)'
                      : 'text-(--color-text-secondary)',
                    item.status === 'live' && 'hover:text-(--color-text-primary)',
                    active && 'text-(--color-text-primary)',
                  )}
                >
                  {item.label}
                  {hasChildren ? (
                    <Icon
                      icon={ChevronDown}
                      size="inline"
                      className={cn(
                        'size-4 transition-transform duration-(--duration-fast) motion-reduce:transition-none',
                        isOpen && 'rotate-180',
                      )}
                    />
                  ) : null}

                  {/* Underline draws from the centre outward. Pointer devices only. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center scale-x-0',
                      'bg-current transition-transform duration-(--duration-fast) ease-(--ease-stage)',
                      'pointer-fine:group-hover:scale-x-100 motion-reduce:transition-none',
                      item.emphasis === 'flagship' && 'scale-x-100 bg-spot-500',
                      active && 'scale-x-100',
                    )}
                  />
                </NavDestination>

                {hasChildren ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`nav-panel-${item.id}`}
                    className="sr-only"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {isOpen ? `Close ${item.label} menu` : `Open ${item.label} menu`}
                  </button>
                ) : null}
              </div>

              {hasChildren ? (
                <div
                  id={`nav-panel-${item.id}`}
                  hidden={!isOpen}
                  /*
                    NO GAP between trigger and panel.

                    This was `mt-2`: an 8px dead band that the pointer had to
                    cross to reach the menu, and crossing it fired mouseleave and
                    closed the thing being reached for. The panel now meets the
                    trigger at `top-full` and carries its own top padding, so the
                    gesture never leaves an interactive surface.

                    The panel also follows the header's register. Over the film
                    it is pitch with a hairline seam; at the desk it is the raised
                    surface. No shadow in either — a drop shadow here is the
                    floating-card cliché the direction bans, and the seam does the
                    same separation work.
                  */
                  className={cn(
                    'absolute top-full left-0 z-(--z-popover) min-w-64 pt-2',
                    'border border-(--color-border-default) bg-(--color-surface-raised) p-2',
                    'in-data-[register=house]:border-white/12 in-data-[register=house]:bg-(--color-ground-pitch)',
                  )}
                >
                  <ul className="flex flex-col">
                    {item.children!.map((child) => (
                      <li key={child.id}>
                        <NavDestination
                          item={child}
                          className={cn(
                            'flex min-h-11 flex-col justify-center rounded-(--radius-sm) px-3 py-2',
                            'font-body text-body-md text-(--color-text-primary)',
                            child.status === 'live' && 'hover:bg-(--color-text-primary)/8',
                          )}
                        >
                          <span>{child.label}</span>
                          {child.facts?.length ? (
                            <span className="text-body-sm text-(--color-text-muted)">{child.facts.join(' · ')}</span>
                          ) : null}
                        </NavDestination>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
