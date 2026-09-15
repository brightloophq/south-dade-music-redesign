import { FilmMargin } from '@/components/film'
import { DISPLAY_SECTION, Eyebrow, TextLink } from '@/components/ui/Editorial'
import { homeFaq, shyQuestion } from '@/content/home'
import { faqPage, siteFaqs } from '@/content/faq'

/**
 * QUESTIONS — the four answers the estate publishes without contradiction.
 *
 * Native `<details>`: keyboard, screen reader and no-JS behaviour for free, and
 * no script on the page for it. The three withheld answers (`withheldFaqs`)
 * stay withheld; the tuition note says plainly what is not published.
 */
export function HomeFaq() {
  return (
    <section
      data-film="faq"
      aria-labelledby="faq-heading"
      className="relative bg-(--color-ground-house) pb-(--section-comfortable)"
    >
      <FilmMargin wide>
        <div className="grid gap-10 border-t border-(--color-border-default) pt-(--section-compact) lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>{homeFaq.label}</Eyebrow>
            <h2 id="faq-heading" className={`mt-7 max-w-[12ch] text-(--color-text-primary) ${DISPLAY_SECTION}`}>
              {homeFaq.heading}
            </h2>
            <p className="mt-6 max-w-[40ch] font-body text-body-md text-(--color-text-secondary)">{faqPage.pricingNote}</p>
            <TextLink href={homeFaq.link.href} className="mt-4">
              {homeFaq.link.label}
            </TextLink>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {siteFaqs.filter((faq) => faq.q !== shyQuestion.question).map((faq) => (
              <details key={faq.q} className="group border-b border-(--color-border-default) first:border-t">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-body text-heading-md italic text-(--color-text-primary) [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="relative block size-3.5 shrink-0">
                    <span className="absolute left-0 top-1/2 block h-px w-full bg-current" />
                    <span className="absolute left-0 top-1/2 block h-px w-full rotate-90 bg-current transition-transform duration-(--duration-base) ease-(--ease-stage) group-open:rotate-0 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 font-body text-body-lg text-(--color-text-secondary)">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </FilmMargin>
    </section>
  )
}
