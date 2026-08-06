import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { Emerge } from '@/components/motion/Emerge'
import { scholarship } from '@/content/home'

/**
 * §10 — The door in.
 *
 * ## What changed in refinement
 *
 * The three points were a checklist with green Lucide ticks — the visual
 * language of a SaaS feature comparison, on the one section that must feel
 * civic rather than commercial. Ticks also imply a specification sheet, which
 * is exactly the "separate, lesser track" impression `09-image-strategy.md` §6
 * warns against.
 *
 * They are now a hairline-ruled list at body scale, and the section's heading
 * has been demoted to the `label` token. **Dignity is quietness.** A family
 * arriving here on a scholarship should find something that looks like a public
 * form done well, not a pricing page.
 *
 * ⚠️ The compliance disclaimer is unchanged and remains mandatory — it is the
 * line `/step-up-accessibility/` currently drops.
 *
 * ⚠️ Gate B-6: the bilingual claim stays removed, not softened.
 *
 * Motion: one reveal. This section must feel plain, procedural and trustworthy
 * (05-motion-system.md §17), and it is the surface Unique Abilities families
 * land on.
 */
export function Scholarship() {
  return (
    <Section register="desk" density="comfortable" id="scholarships" aria-labelledby="scholarships-heading" contained={false}>
      <Container width="wide">
        <Emerge>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-(--grid-gutter)">
            <div className="lg:col-span-5">
              <h2
                id="scholarships-heading"
                className="font-body text-label font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)"
              >
                Step Up for Students
              </h2>
              <Text token="heading-md" as="p" className="mt-4 max-w-[20ch]">
                {scholarship.heading}
              </Text>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Text token="body-lg" className="max-w-[52ch] text-(--color-text-secondary)">
                {scholarship.lead}
              </Text>

              <ul className="mt-8 border-t border-(--color-border-default)">
                {scholarship.points.map((point) => (
                  <li
                    key={point}
                    className="border-b border-(--color-border-default) py-3 font-body text-body-md text-(--color-text-primary)"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {/*
                Mandatory compliance disclaimer — who awards the public funds.
                Set quietly, but never omitted, paraphrased, or hidden behind an
                interaction.
              */}
              <p className="mt-6 max-w-[56ch] font-body text-body-sm text-(--color-text-muted)">
                {scholarship.disclaimer}
              </p>
            </div>
          </div>
        </Emerge>
      </Container>
    </Section>
  )
}
