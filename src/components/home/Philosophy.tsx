import { FilmMargin } from '@/components/film'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Caption, DISPLAY_SECTION, Eyebrow, TextLink } from '@/components/ui/Editorial'
import { philosophy, scholarship } from '@/content/home'

/**
 * ABOUT / PHILOSOPHY — human and credible.
 *
 * The Reframe used to open the film as a dark diagonal: a parent's observation
 * upper-left, the hinge lower-right, 88svh for twenty-nine words. The argument
 * was right and it was in the wrong place — a visitor who has not yet seen the
 * academy is being asked to accept a philosophy about it.
 *
 * Here, after the programmes, the weeks and the evidence, the same sentences
 * are earned. The hinge is the heading, the owner's own protected sentence is
 * the pull quote, the vision is the close, and the photograph is the families
 * after a show — the community the tagline names.
 *
 * The scholarship follows as a formal notice under a heavier rule: statement,
 * the verbatim terms, and the mandatory disclaimer adjacent to the claim.
 */
export function Philosophy() {
  return (
    <section
      data-film="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative bg-(--color-ground-house) pb-(--section-compact) pt-(--section-comfortable)"
    >
      <FilmMargin wide>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>{philosophy.label}</Eyebrow>
            <h2 id="philosophy-heading" data-reveal-lines className={`mt-7 max-w-[16ch] text-(--color-text-primary) ${DISPLAY_SECTION}`}>
              {philosophy.heading}
            </h2>
            <blockquote
              data-philosophy-quote
              className="mt-10 max-w-[38ch] border-l border-(--color-text-primary) pl-6 font-body text-heading-lg italic leading-[1.4] text-(--color-text-primary)"
            >
              &ldquo;{philosophy.turn}&rdquo;
            </blockquote>
            <p className="mt-8 max-w-[48ch] font-body text-body-lg text-(--color-text-secondary)">{philosophy.vision}</p>
            <TextLink href={philosophy.link.href} className="mt-5">
              {philosophy.link.label}
            </TextLink>
          </div>

          <figure className="lg:col-span-5 lg:col-start-8">
            <MediaFrame
              photo={philosophy.photo}
              alt={philosophy.alt}
              reveal="open-up"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full lg:aspect-[4/5]"
              position="center 40%"
            />
            <Caption>{philosophy.caption}</Caption>
          </figure>
        </div>

        <div
          id="scholarships"
          aria-labelledby="scholarship-heading"
          role="region"
          className="mt-(--section-comfortable) grid gap-6 border-t-2 border-(--color-text-primary) pt-9 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-4">
            <Eyebrow>Scholarships</Eyebrow>
            <h3 id="scholarship-heading" className="mt-5 font-display text-heading-lg font-semibold text-(--color-text-primary)">
              {scholarship.heading}
            </h3>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-[60ch] font-body text-body-lg text-(--color-text-primary)">{scholarship.lead}</p>
            <p className="mt-3 font-body text-body-md italic text-(--color-text-secondary)">{scholarship.inclusion}</p>
            <p className="mt-5 max-w-[60ch] font-body text-body-sm text-(--color-text-muted)">{scholarship.disclaimer}</p>
            <TextLink href="/scholarships" className="mt-4">
              Scholarship details
            </TextLink>
          </div>
        </div>
      </FilmMargin>
    </section>
  )
}
