import { Atmosphere, FilmMargin, Movement } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { DISPLAY_SECTION, Eyebrow } from '@/components/ui/Editorial'
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
  return <p
      data-desk-label
      className="font-display text-label uppercase text-(--color-text-muted)">{children}</p>
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
  media,
}: {
  eyebrow: string
  heading: string
  lead?: string
  children?: React.ReactNode
  /**
   * An approved photograph beside the opening. Optional: routes with a
   * photograph of their own subject carry it here, so the first viewport shows
   * the thing the page is about rather than a field of cream.
   */
  media?: { photo: string; alt: string; caption?: string; position?: string }
}) {
  /*
    CLIENT-REVIEW REFINEMENT — the interior opening speaks at section size.

    The heading was `display-md` (36px at its largest) under a 12px label:
    a quiet statement is right for the desk, but at that size every interior
    page opened as a small line of type in a wide field of cream, and the jump
    from the homepage's headings to a route's own title read as a drop in
    confidence rather than a change of register.

    It now uses the same section display size and labelled rule as the
    homepage, so the whole site shares one voice. Nothing else changes: same
    paper ground, same margin, same lead, same children slot.
  */
  return (
    <Movement name="page-intro" ground="house" className="pb-(--section-compact) pt-(--section-comfortable)">
      {/*
        The same uncoated stock as the desk: decorative, `aria-hidden`,
        lazy-loaded. Atmosphere, never evidence.
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
        <div className={cn(media && 'grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10')}>
          <div className={cn(media && 'lg:col-span-6')}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className={cn('mt-7 max-w-[20ch] text-(--color-text-primary)', DISPLAY_SECTION)}>{heading}</h1>
            {lead ? (
              <p className="mt-7 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                {lead}
              </p>
            ) : null}
            {children}
          </div>
          {media ? (
            <figure className="lg:col-span-5 lg:col-start-8">
              <MediaFrame
                photo={media.photo}
                alt={media.alt}
                priority
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
                position={media.position}
                className="aspect-[4/3] w-full lg:aspect-[4/5]"
              />
              {media.caption ? (
                <figcaption className="mt-3 font-display text-body-sm text-(--color-text-muted)">{media.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
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
