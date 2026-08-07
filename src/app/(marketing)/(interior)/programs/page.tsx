import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { DeskLabel, PageIntro } from '@/components/page'
import { programEntries, programsHub } from '@/content/programs'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Programs',
  description:
    'The 90-Day Stage Program, private lessons, group lessons, Band Builders, early childhood classes and the Summer Jam Music Camp.',
  path: '/programs',
})

/**
 * /programs — Tier 2 hub.
 *
 * The playbill, at full size. The homepage runs a compressed version of this
 * index; here each entry gets its summary and the facts the source actually
 * states.
 *
 * ## The flagship is the entire hierarchy
 *
 * No badges, no "most popular" flag, no card. The 90-Day Stage Program is set
 * at display size in Newsreader italic and the rest sit at heading size —
 * that difference is the whole hierarchy, exactly as the playbill on the
 * homepage does it.
 *
 * ## Three entries do not link
 *
 * Band Builders, Early Childhood and the Summer Jam Music Camp are genuinely
 * offered, so omitting them would misrepresent the business — but their pages
 * are Tier 3. They render unlinked with a plain note. A link to a 404 is worse
 * than no link, and the brief is explicit about not creating them.
 */
export default function ProgramsPage() {
  const flagship = programEntries.find((p) => p.flagship)
  const rest = programEntries.filter((p) => !p.flagship)

  return (
    <>
      <PageIntro
        eyebrow={programsHub.eyebrow}
        heading={programsHub.heading}
        lead={programsHub.lead}
      />

      {/* The flagship, at twice the size of everything below it. */}
      {flagship ? (
        <Movement name="flagship" ground="house" className="pb-(--section-spacious)">
          <FilmMargin wide>
            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <div className="lg:pt-3">
                <DeskLabel>{programsHub.flagshipLabel}</DeskLabel>
              </div>
              <div className="max-w-[840px] border-t border-(--color-border-default) pt-8">
                <h2>
                  <Link
                    href={flagship.route ?? '#'}
                    className="font-body text-display-md italic leading-[1.15] text-(--color-text-primary) underline-offset-[8px] hover:underline"
                  >
                    {flagship.name}
                  </Link>
                </h2>
                <p className="mt-5 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
                  {flagship.summary}
                </p>
                <p className="mt-5 font-display text-label uppercase text-(--color-text-muted)">
                  {flagship.facts.join(' · ')}
                </p>
              </div>
            </div>
          </FilmMargin>
        </Movement>
      ) : null}

      <Movement name="programs-index" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <div className="lg:pt-3">
              <DeskLabel>{programsHub.moreLabel}</DeskLabel>
            </div>
            <ol className="max-w-[840px]">
              {rest.map((program, index) => (
                <li
                  key={program.id}
                  className="border-t border-(--color-border-default) py-8"
                >
                  <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                    <span
                      aria-hidden="true"
                      className="w-11 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
                    >
                      No.&nbsp;{index + 2}
                    </span>
                    <h2 className="font-body text-heading-lg italic text-(--color-text-primary)">
                      {program.route ? (
                        <Link
                          href={program.route}
                          className="underline-offset-[6px] hover:underline"
                        >
                          {program.name}
                        </Link>
                      ) : (
                        program.name
                      )}
                    </h2>
                    {program.pendingNote ? (
                      <span className="font-display text-label uppercase text-(--color-text-muted)">
                        {program.pendingNote}
                      </span>
                    ) : null}
                  </div>
                  <p className="ml-0 mt-4 max-w-[62ch] font-body text-body-md text-(--color-text-secondary) lg:ml-[76px]">
                    {program.summary}
                  </p>
                  <p className="ml-0 mt-3 font-display text-label uppercase text-(--color-text-muted) lg:ml-[76px]">
                    {program.facts.join(' · ')}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </FilmMargin>
      </Movement>

      {/* Tuition is unpublished. Say so, rather than leaving a silence. */}
      <Movement name="programs-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Tuition</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {programsHub.pricingNote}
              </p>
              <div className="mt-9">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
