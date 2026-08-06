import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Grid } from '@/components/ui/Grid'
import { Eyebrow, Text } from '@/components/ui/Typography'

import { Card, CardBody, CardFacts, CardFooter, CardMedia } from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/04-design-system.md` §8.',
          '',
          '**Elevation is expressed through surface value first, shadow second.** Switch the Register toolbar control to House: the shadows fall away and elevation is carried by tone plus a hairline, because shadows read badly on dark grounds.',
          '',
          'Rules:',
          '',
          '- **Equal height within a row.** Facts pin to the bottom via `CardFacts`.',
          '- **The whole card is the click target** when `href` is passed — a stretched overlay link. The nested CTA stays a visual affordance and is *not* a second tab stop.',
          '- **Never truncate mid-sentence.** Phase 2 found three programme cards cut off mid-word. Copy is authored to length; `line-clamp` is a safety net with a proper ellipsis, not a layout strategy.',
          '- Media scales 1.03 on hover, **pointer devices only** — sticky hover on touch is a known bug class.',
        ].join('\n'),
      },
    },
  },
  // Satisfies the required `children` prop for stories that supply their own render.
  args: { children: null },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** A neutral stand-in. No real photography — every asset is consent-blocked (gate I-1). */
function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video items-center justify-center bg-(--color-surface-sunken)">
      <span className="font-body text-body-sm text-(--color-text-muted)">{label}</span>
    </div>
  )
}

export const Playground: Story = {
  args: { elevation: 1, padding: 'base' },
  render: (args) => (
    <div className="max-w-sm">
      <Card {...args}>
        <CardBody>
          <Eyebrow>Ages 6–18</Eyebrow>
          <Text token="heading-md" as="h3">
            The 90-Day Stage Program
          </Text>
          <Text token="body-md" className="text-(--color-text-secondary)">
            Two classes a week — one for skill, one for the band.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
}

export const Elevations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Never more than two elevation levels visible in one viewport region.
      </Text>
      <Grid cols={1} colsMd={3} gap="base">
        {([0, 1, 2] as const).map((level) => (
          <Card key={level} elevation={level}>
            <CardBody>
              <Text token="heading-md" as="h3">
                elev-{level}
              </Text>
              <Text token="body-sm" className="text-(--color-text-secondary)">
                {level === 0 ? 'Page ground' : level === 1 ? 'Cards' : 'Hover, dropdowns'}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </div>
  ),
}

export const ProgrammeCard: Story = {
  name: 'Programme card',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-sm">
      <Card elevation={1}>
        <CardMedia>
          <MediaPlaceholder label="16:9 media slot" />
        </CardMedia>
        <CardBody>
          <Eyebrow>Ages 6–18</Eyebrow>
          <Text token="heading-md" as="h3">
            The 90-Day Stage Program
          </Text>
          <Text token="body-md" className="text-(--color-text-secondary)">
            Weeks 1–10 build the skill. Week 11 they play for the class. Week 12 they play for you.
          </Text>
          <CardFacts>
            <li>12 weeks</li>
            <li>2×/week</li>
            <li>Ages 6–18</li>
          </CardFacts>
        </CardBody>
        <CardFooter>
          <Button variant="outline" size="sm">
            See the 12 weeks
          </Button>
        </CardFooter>
      </Card>
      <Text token="body-sm" className="mt-4 measure text-(--color-text-muted)">
        The three facts are the differentiator. Phase 2&rsquo;s programme cards carried prose truncated mid-sentence
        and no structured facts at all.
      </Text>
    </div>
  ),
}

export const EqualHeight: Story = {
  name: 'Equal height in a row',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Cards fill their row height and the facts pin to the bottom, so they align across a row regardless of how much
        copy each carries.
      </Text>
      <Grid cols={1} colsMd={2} colsLg={3} gap="base" equalHeight>
        {[
          { title: 'Private Lessons', copy: 'One student, one teacher.', facts: ['Ages 3+', '1×/week'] },
          {
            title: 'Band Builders',
            copy: 'Real room, real amps. Critical for the teen journey — it must read as a band, not a class.',
            facts: ['Ages 10–18', '1×/week'],
          },
          { title: 'Early Childhood', copy: 'Movement and hand percussion.', facts: ['Ages 3–6', '1×/week'] },
        ].map((card) => (
          <Card key={card.title} elevation={1}>
            <CardBody>
              <Text token="heading-md" as="h3">
                {card.title}
              </Text>
              <Text token="body-md" className="text-(--color-text-secondary)">
                {card.copy}
              </Text>
              <CardFacts>
                {card.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </CardFacts>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </div>
  ),
}

export const Interactive: Story = {
  name: 'Whole-card click target',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="max-w-sm">
        <Card elevation={1} href="/programs/band-builders" linkLabel="Band Builders programme">
          <CardBody>
            <Eyebrow>Ages 10–18</Eyebrow>
            <Text token="heading-md" as="h3">
              Band Builders
            </Text>
            <Text token="body-md" className="text-(--color-text-secondary)">
              Four or five students mid-rehearsal. A real room.
            </Text>
            <CardFacts>
              <li>1×/week</li>
              <li>Ensemble</li>
            </CardFacts>
          </CardBody>
        </Card>
      </div>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        <strong>Tab through this story.</strong> The card produces exactly one tab stop, not two — the stretched link
        carries the accessible name from <code>linkLabel</code>. Focus draws a ring around the whole card via{' '}
        <code>focus-within</code>.
      </Text>
    </div>
  ),
}

export const WithStatus: Story = {
  name: 'With capacity badge',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="max-w-sm">
        <Card elevation={1}>
          <CardBody>
            <div className="flex items-start justify-between gap-3">
              <Text token="heading-md" as="h3">
                Summer Jam — Session 1
              </Text>
              <Badge tone="warn" variant="soft">
                Placeholder
              </Badge>
            </div>
            <Text token="body-md" className="text-(--color-text-secondary)">
              Dates, price, capacity and the deposit amount all render here.
            </Text>
          </CardBody>
        </Card>
      </div>
      <div className="rounded-(--radius-md) border border-warn p-4">
        <Text token="body-sm" className="measure">
          ⚠️ A capacity badge is a <strong>factual claim</strong> and requires a real figure — never fabricate scarcity
          (05 §7). The camp deposit amount is unpublished (gate B-8), so no real camp card can ship yet.
        </Text>
      </div>
    </div>
  ),
}
