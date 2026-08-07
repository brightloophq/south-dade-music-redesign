import { Header } from '@/components/layout/Header'

/**
 * Interior route layout — the desk register.
 *
 * HANDOFF.md §3.6: *"No header component on the homepage — vertical wordmark +
 * one CTA live inside the hero. Interior pages keep the existing header in the
 * desk register."*
 *
 * The homepage sits directly in `(marketing)` and gets no header, because the
 * hero *is* the header. Every other route sits inside this group and gets the
 * real one back. `(interior)` is a route group, so it adds nothing to the URL.
 *
 * The Header component is unchanged from the foundation — it restyles entirely
 * through the token layer, which is what the token swap was designed for.
 */
export default function InteriorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
