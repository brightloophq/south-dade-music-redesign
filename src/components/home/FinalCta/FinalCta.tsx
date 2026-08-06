import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { Emerge } from '@/components/motion/Emerge'
import { finalCta } from '@/content/home'

/**
 * §12 — The guarantee, and how to start.
 *
 * The page ends in the light, at a decision.
 *
 * The Stage-Ready Guarantee is the **strongest conversion trigger available**
 * (03-user-journey.md §3, ranked #1) and currently appears on 2 pages of 26 and
 * none of the 6 programme pages.
 *
 * Motion rules that bite here (05-motion-system.md §16):
 *  · **The guarantee text never animates.** It is the primary risk-reversal and
 *    must be legible instantly. Only the surrounding block reveals.
 *  · **The $25 never animates.** Money in a transactional context is static.
 *  · Terms are disclosed **above** the CTA, never inside or after a form.
 *
 * ⚠️ "We'll call within one business day" is **withheld** — a response-time
 * promise must not ship until the business confirms it can meet it
 * (04-copy-framework.md §12).
 */
export function FinalCta() {
  return (
    <Section register="desk" density="spacious" id="start" data-film="close" aria-labelledby="final-cta-heading" contained={false}>
      <Container width="narrow">
        <Emerge>
          <Text token="heading-lg" as="h2" id="final-cta-heading" balance>
            {finalCta.heading}
          </Text>
        </Emerge>

        {/*
          Deliberately outside FadeIn. The guarantee is present at paint and
          never waits on an animation to become readable.

          Refinement: the bordered, shadowed, rounded panel was removed. Putting
          the strongest sentence the business owns inside a card made it look
          like a feature callout — one more box among forty-seven. It now sits
          on the open page under a single hairline, at heading scale, with air
          around it. Nothing frames it because nothing needs to.
        */}
        <div className="mt-10 border-t border-(--color-text-primary)/15 pt-8">
          <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-(--color-link-default)">
            {finalCta.guaranteeLabel}
          </p>
          <blockquote className="mt-5">
            <p className="max-w-[34ch] font-display text-heading-lg leading-[1.24] font-semibold text-(--color-text-primary)">
              {finalCta.guarantee}
            </p>
          </blockquote>
        </div>

        {/* Terms above the CTA, never inside or after it. */}
        <p className="measure mt-12 font-body text-body-md text-(--color-text-secondary)">
          {finalCta.trialNote}
        </p>

        <div className="mt-8">
          <Button href={finalCta.cta.href} variant="cta" size="xl" price={finalCta.cta.price}>
            {finalCta.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
