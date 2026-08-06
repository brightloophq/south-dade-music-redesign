/**
 * Class-name composition.
 *
 * Deliberately dependency-free: `clsx` + `tailwind-merge` are the usual choice,
 * but Tailwind v4's cascade layers make late-declared utilities win, so a merge
 * step is not required for the conflict cases this codebase has. Adding two
 * runtime dependencies to the client bundle for that is not justified against
 * the 05-motion-system.md §15 budgets.
 *
 * If genuine class-conflict bugs appear, swap the implementation here rather
 * than changing every call site.
 */

export type ClassValue = string | number | null | undefined | false | ClassValue[] | Record<string, boolean | null | undefined>

function push(out: string[], value: ClassValue): void {
  if (!value && value !== 0) return

  if (typeof value === 'string' || typeof value === 'number') {
    out.push(String(value))
    return
  }

  if (Array.isArray(value)) {
    for (const item of value) push(out, item)
    return
  }

  if (typeof value === 'object') {
    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) out.push(key)
    }
  }
}

export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  for (const value of values) push(out, value)
  return out.join(' ')
}
