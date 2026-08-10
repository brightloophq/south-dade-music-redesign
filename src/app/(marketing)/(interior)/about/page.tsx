import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { FilmMargin, Movement } from '@/components/film'
import { MediaReview, hasMedia } from '@/components/dev/MediaReview'
import { DeskLabel, DeskSection, PageIntro } from '@/components/page'
import { about, aboutTestimonials } from '@/content/about'
import { trialOffer } from '@/content/pages'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'South Dade Music was created to make music education accessible and meaningful for every student. Community driven, performance focused, in Florida City.',
  path: '/about',
})

/**
 * /about — Tier 3.
 *
 * ## ⚠️ The mission statement does not ship
 *
 * The source page's mission sentence is heavily keyword-stuffed — "high quality
 * instruction through Kids Piano Lessons South Dade, vocal training, and Group
 * Music Lessons South Dade". It is verbatim and therefore technically
 * publishable, but it is search-engine copy, and this is the page a parent
 * reads to decide whether to trust the business.
 *
 * The vision sentence beside it carries no keyword stuffing and ships in full.
 * The mission is withheld pending an owner rewrite — recorded in the audit
 * rather than quietly reworded, because rewriting it here would be authoring
 * brand copy rather than migrating it.
 *
 * ## ⚠️ No teachers
 *
 * Gate B-7. Not one instructor is named or introduced anywhere in the estate;
 * the only names that exist appear inside customer reviews. `/teachers` is not
 * built and no teacher content appears here.
 *
 * ## ⚠️ No history figures
 *
 * No founding year, no student count, no years-in-business number is published
 * anywhere. "Over the years" is the only temporal claim in the source and it
 * ships exactly as written.
 */
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow={about.eyebrow} heading={about.heading} lead={about.story[0]} />

      <DeskSection label="Our story" id="story" ruled={false}>
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-secondary)">
          {about.story[1]}
        </p>
        <p className="mt-8 max-w-[52ch] font-display text-display-md leading-[1.25] text-(--color-text-primary)">
          {about.vision}
        </p>
      </DeskSection>

      <DeskSection label="Why families choose us" id="why-choose">
        <ol>
          {about.whyChoose.map((point, index) => (
            <li
              key={point}
              className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-t border-(--color-border-default) py-5 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-display text-label uppercase tabular-nums text-(--color-text-muted)"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-body text-body-lg text-(--color-text-primary)">{point}</span>
            </li>
          ))}
        </ol>
      </DeskSection>

      {/*
        The Gradual Exposure Ladder. Named because it is verified; its rungs are
        absent because they are enumerated nowhere in the estate (gate B-3).
      */}
      <DeskSection label="If your child is shy" id="exposure-ladder">
        <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
          {about.exposureLadder.claim}
        </p>
        <p className="mt-6">
          <Link
            href="/programs/90-day-stage-program"
            className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
          >
            How the 90 days work
          </Link>
        </p>
      </DeskSection>

      <DeskSection label="In the community" id="community">
        {/*
          MI1 — the academy's own words, photographed in its own room.

          `banner` is audit #68: the pull-up banner that stands in the teaching
          room, reading *build community. make music.* Tier A — no people in the
          frame.

          This is an INLINE PROOF, not atmosphere, and it earns that placement:
          this section's entire claim is that the academy is a community
          fixture, and the banner is the one piece of first-party material in
          the whole estate where the academy states that itself, physically, in
          the room. It is set small and beside the prose — the size of a thing
          on a wall — rather than as a plate, because it is evidence for a
          sentence, not a scene.

          ⚠️ PREVIEW ONLY. I-7 unconfirmed.
        */}
        {/*
          ⚠️ THE ONE PLACEMENT WITH NO PRODUCTION FALLBACK.

          Every other MediaReview on the site names an approved generated plate
          to ship in production. This one deliberately does not, and the reason
          is the whole point of the tiering: the banner is evidence that *this
          business* said "build community. make music." in its own room. No
          generated image can stand in for that without implying the academy
          made a statement it did not make — an abstract light study here would
          be decoration pretending to be a quotation.

          So in production the image does not render, and `hasMedia()` collapses
          the flex wrapper with it: the prose simply runs full width and there is
          no empty box, no dark rectangle and no orphaned gap. That is the
          correct production layout, not a degraded one.
        */}
        <div className={hasMedia() ? 'gap-9 sm:flex sm:items-start' : undefined}>
          {hasMedia() ? (
            <div className="relative mb-7 aspect-[441/759] w-[132px] shrink-0 overflow-hidden bg-(--color-ground-pitch) sm:mb-0 sm:w-[168px]">
              <MediaReview
                asset="banner"
                job="About — the academy's own banner, in its own room"
                alt="A South Dade Music pull-up banner standing in the teaching room, reading “build community. make music.”"
                sizes="168px"
              />
            </div>
          ) : null}
          <div>
            {about.community.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-[62ch] font-body text-body-lg text-(--color-text-secondary) first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-8">
          <Link
            href="/performances"
            className="inline-flex min-h-6 items-center font-display text-label uppercase text-(--color-text-primary) underline underline-offset-[6px]"
          >
            Performances
          </Link>
        </p>
      </DeskSection>

      {aboutTestimonials.length ? (
        <DeskSection label="What families say" id="testimonials">
          <div className="flex flex-col gap-10">
            {aboutTestimonials.map((quote) => (
              <figure key={quote.id}>
                <blockquote className="max-w-[62ch] font-body text-heading-lg italic leading-[1.5] text-(--color-text-primary)">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-display text-label uppercase text-(--color-text-muted)">
                  {quote.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </DeskSection>
      ) : null}

      <Movement name="about-cta" ground="house" className="pb-(--section-feature)">
        <FilmMargin wide>
          <hr className="border-0 border-t border-(--color-border-default)" />
          <div className="grid gap-10 pt-(--section-comfortable) lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <DeskLabel>Where we teach</DeskLabel>
            <div className="max-w-[840px]">
              <p className="max-w-[62ch] font-body text-body-lg text-(--color-text-primary)">
                {about.serviceLine}
              </p>
              <div className="mt-9">
                <Button href="/contact/book-a-trial" size="lg" price={trialOffer.price}>
                  Book a Trial
                </Button>
              </div>
              <p className="mt-6 max-w-[62ch] font-body text-body-md text-(--color-text-muted)">
                {trialOffer.terms}
              </p>
            </div>
          </div>
        </FilmMargin>
      </Movement>
    </>
  )
}
