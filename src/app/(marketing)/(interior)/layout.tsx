import { InteriorReveals } from '@/components/motion/InteriorReveals'

/**
 * Interior route layout — the desk register.
 *
 * The header lives in the parent marketing layout and is rendered for every
 * route in the group, homepage included, so this layout keeps only what is
 * genuinely specific to interior routes: the photograph reveals, which the
 * homepage gets from its own director instead.
 */
export default function InteriorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InteriorReveals />
      {children}
    </>
  )
}
