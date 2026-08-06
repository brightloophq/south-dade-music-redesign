import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardFacts } from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { Grid } from '@/components/ui/Grid'
import { Stack } from '@/components/ui/Stack'
import { Eyebrow, Text } from '@/components/ui/Typography'
import { themeConfig, registerForPath, type Register } from '@/config/theme'

const meta: Meta = {
  title: 'Foundations/Theme Registers',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/final-art-direction.md` §1–3.',
          '',
          '> **The site has two rooms.**',
          '>',
          '> **The House** — dark, lit, composed. Where a parent is persuaded.',
          '> **The Desk** — light, plain, specific. Where a parent decides.',
          '',
          'Registers are set with `data-register`, **not** `prefers-color-scheme`. This is deliberate: the two rooms are an *information architecture*, not a user preference. Using the OS setting would hand the decision to the operating system.',
          '',
          'Setting the attribute re-points the semantic colour aliases, so children need no register-specific classes — the same markup renders correctly in both rooms.',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj

/** The same markup, rendered in whichever room it is placed in. */
function SampleSurface({ register }: { register: Register }) {
  return (
    <div
      data-register={register}
      className="min-h-full bg-(--color-surface-page) p-8 text-(--color-text-primary)"
    >
      <Stack gap="5">
        <Eyebrow>{register === 'house' ? 'The House' : 'The Desk'}</Eyebrow>

        <Text token="display-md" as="h2" width={register === 'house' ? 'expanded' : 'normal'}>
          In 90 days, your child takes a stage
        </Text>

        <Text token="body-lg" className="measure text-(--color-text-secondary)">
          {register === 'house'
            ? 'Persuade, move, make them imagine. Prose is kept short here — no block over 400 words on a dark ground, because light-on-dark at length is measurably harder for astigmatic and dyslexic readers.'
            : 'Inform, reassure, let them act. Long-form belongs here: prices, dates, ages, eligibility, terms and the guarantee, at 17:1 contrast with no length limit.'}
        </Text>

        <Divider />

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Book a trial</Button>
          <Button variant={register === 'house' ? 'on-dark-secondary' : 'outline'}>See details</Button>
          <Badge tone="accent" variant="solid">
            Week 12
          </Badge>
        </div>

        <Card elevation={1}>
          <CardBody>
            <Text token="heading-md" as="h3">
              A card in this room
            </Text>
            <Text token="body-md" className="text-(--color-text-secondary)">
              {register === 'house'
                ? 'Elevation is carried by surface tone plus a hairline — shadows read badly on dark.'
                : 'Elevation is carried by a warm-tinted shadow on a raised white surface.'}
            </Text>
            <CardFacts>
              <li>12 weeks</li>
              <li>2×/week</li>
            </CardFacts>
          </CardBody>
        </Card>

        <Text token="body-sm" className="text-(--color-text-muted)">
          Muted text — {register === 'house' ? 'n-400 at 7.98:1' : 'n-500 at 4.54:1'}
        </Text>
      </Stack>
    </div>
  )
}

export const SideBySide: Story = {
  name: 'House vs Desk',
  render: () => (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <SampleSurface register="desk" />
      <SampleSurface register="house" />
    </div>
  ),
}

export const TheDesk: Story = {
  name: 'The Desk — light register',
  render: () => <SampleSurface register="desk" />,
}

export const TheHouse: Story = {
  name: 'The House — dark register',
  render: () => <SampleSurface register="house" />,
}

export const TheFiveLaws: Story = {
  name: 'The five laws',
  render: () => (
    <div className="p-8">
      <Text token="display-md" as="h2" className="mb-2">
        The five laws
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Held as data in <code>themeConfig.laws</code> so reviews and a future lint rule can cite them by name rather
        than paraphrasing them.
      </Text>

      <ol className="flex flex-col gap-4">
        {themeConfig.laws.map((law, index) => (
          <li key={law} className="flex gap-4 border-l-2 border-spot-500 pl-4">
            <span className="font-display text-heading-lg font-bold tabular-nums text-(--color-text-muted)">
              {index + 1}
            </span>
            <Text token="body-lg" className="measure self-center">
              {law}
            </Text>
          </li>
        ))}
      </ol>

      <Divider spacing="loose" />

      <Text token="heading-lg" as="h3" className="mb-2">
        Register assignment
      </Text>
      <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
        Resolved by <code>registerForPath()</code>, longest matching prefix first. This table is the contract.
      </Text>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Register assignment by route</caption>
          <thead>
            <tr className="border-b border-(--color-border-default)">
              {['Route', 'Register', 'Why'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="py-2 pr-6 font-body text-label font-semibold uppercase tracking-[0.08em]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {themeConfig.routeRegisters.map((entry) => (
              <tr key={entry.prefix} className="border-b border-(--color-border-default)">
                <td className="py-2 pr-6 font-body text-body-md">
                  <code>{entry.prefix}</code>
                </td>
                <td className="py-2 pr-6">
                  <Badge tone={entry.register === 'house' ? 'neutral' : 'info'} variant="soft">
                    {entry.register}
                  </Badge>
                </td>
                <td className="py-2 pr-6 font-body text-body-sm text-(--color-text-secondary)">
                  {'note' in entry ? entry.note : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-(--radius-md) border border-(--color-border-default) p-5">
        <Text token="heading-sm" as="h3" className="mb-2">
          Resolution examples
        </Text>
        <Grid cols={1} colsMd={2} gap="tight">
          {['/', '/scholarships', '/scholarships/pep', '/performances', '/pricing', '/lessons/piano'].map((path) => (
            <div key={path} className="flex items-center gap-3">
              <code className="font-body text-body-sm">{path}</code>
              <span className="font-body text-body-sm text-(--color-text-muted)">→</span>
              <Badge tone={registerForPath(path) === 'house' ? 'neutral' : 'info'} variant="soft">
                {registerForPath(path)}
              </Badge>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  ),
}
