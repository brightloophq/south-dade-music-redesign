import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { cn } from '@/lib/utils/cn'

/**
 * Interior-page primitives — the desk register.
 *
 * Canonical spec: `docs/approved-design/Visual Specification.md` §D and §I.
 *
 *   > "The desk (shots 08–12) does not move. No grain, no letterbox, no amber
 *   > except CTA fills. Sound direction: room air."
 *
 * Interior routes are the desk, always. The film is the homepage's argument;
 * these pages are where someone who has already been persuaded goes to check
 * the details, so they are flat, light and honest. That is not a lesser
 * treatment — a page carrying a compliance disclaimer and a price should look
 * like it can be trusted, not like it is selling.
 *
 * What carries over from the film: the 150px margin, the hairline instead of a
 * card edge, radius 0, no shadows, Bricolage for structure and Newsreader for
 * voice, and amber reserved for the primary action.
 */

/** The label that hangs in the left margin of every desk row. */
export function DeskLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-label uppercase text-(--color-text-muted)">{children}</p>
}

/**
 * The desk's two-column shape: a label in the wide left margin, content in a
 * measure to the right. Below `lg` it collapses to one column with the label
 * above its content — still left-aligned, never centred.
 */
export function DeskRow({
  label,
  children,
  className,
  id,
}: {
  label?: string
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <FilmMargin wide>
      <div className={cn('grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16', className)}>
        <div className="lg:pt-2">{label ? <DeskLabel>{label}</DeskLabel> : null}</div>
        <div id={id} className="max-w-[840px]">
          {children}
        </div>
      </div>
    </FilmMargin>
  )
}

/**
 * The page opening.
 *
 * Interior pages have a header bar above them, so they do not need — and must
 * not have — the homepage's full-viewport dark opening. This is a quiet
 * statement of what the page is, hung on the same margin.
 */
export function PageIntro({
  eyebrow,
  heading,
  lead,
  children,
}: {
  eyebrow: string
  heading: string
  lead?: string
  children?: React.ReactNode
}) {
  return (
    <Movement name="page-intro" ground="house" className="pb-(--section-comfortable) pt-(--section-spacious)">
      {/*
        EE2 — the desk has a surface on interior routes too.

        The same uncoated stock the homepage House movement is set on, so the
        register is continuous: the film ends, and every page after it is the
        printed programme. Decorative, `aria-hidden`, lazy-loaded, and the only
        image on most of these routes.

        ⚠️ It is atmosphere, never evidence. No interior page implies a
        photograph of this business exists — the academy's own images remain
        blocked under I-1.
      */}
      <Atmosphere
        asset="atmos-paper-tooth"
        job="Interior desk — uncoated paper stock, continuing the programme register from the homepage"
        opacity={0.24}
        blend="multiply"
        sizes="100vw"
        quality={40}
      />
      <FilmMargin wide className="relative z-[2]">
        <DeskLabel>{eyebrow}</DeskLabel>
        <h1 className="mt-6 max-w-[18ch] font-display text-display-md text-(--color-text-primary)">
          {heading}
        </h1>
        {lead ? (
          <p className="mt-7 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
            {lead}
          </p>
        ) : null}
        {children}
      </FilmMargin>
    </Movement>
  )
}

/** A desk section. Separated from its neighbour by a hairline, never a card. */
export function DeskSection({
  label,
  children,
  id,
  ruled = true,
  className,
}: {
  label?: string
  children: React.ReactNode
  id?: string
  /** The first section after the intro does not need a second rule. */
  ruled?: boolean
  className?: string
}) {
  /*
   * ⚠️ EE2 — `--section-spacious` → `--section-comfortable`.
   *
   * Measured: interior routes were rendering 110–600 words across
   * 2,600–8,000px. `/contact` carried 110 words in 2,610px; `/private-lessons`
   * 209 words in 5,042px. That is not restraint, it is dilution — every
   * relationship between two facts was separated by a third of a screen, so
   * nothing on the page read as belonging to anything else.
   *
   * At `spacious` each section contributed 320px of vertical padding alone
   * (160 top + 160 bottom at desktop). `comfortable` halves that to 256px per
   * pair and the pages get materially denser without a word being added,
   * removed or invented. The hairline still separates sections; it no longer
   * needs half a viewport to do it.
   *
   * The film is untouched — it uses these tokens directly and keeps `spacious`
   * and `feature` where the direction asks for them.
   */
  return (
    <Movement
      name={id ?? 'desk-section'}
      ground="house"
      className={cn('py-(--section-comfortable)', className)}
    >
      {ruled ? (
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
        </FilmMargin>
      ) : null}
      <div className={ruled ? 'pt-(--section-comfortable)' : undefined}>
        <DeskRow label={label} id={id}>
          {children}
        </DeskRow>
      </div>
    </Movement>
  )
}

/**
 * A plain list of verified points.
 *
 * Hairline-separated rows rather than bulleted `<li>` markers or — worse —
 * an icon grid. Icon rows are the most template-coded element on the web and
 * are banned outright.
 */
export function PointList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('mt-2', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="border-t border-(--color-border-default) py-4 font-body text-body-lg text-(--color-text-primary) first:border-t-0 first:pt-0"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
