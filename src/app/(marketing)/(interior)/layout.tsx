/**
 * Interior route layout — the desk register.
 *
 * The header used to be mounted here because the homepage deliberately had
 * none. It now lives in the parent marketing layout and is rendered for every
 * route in the group, homepage included, so this layout keeps only what is
 * genuinely specific to interior routes.
 */
export default function InteriorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
