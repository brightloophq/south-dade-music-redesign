import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MotionToggle } from '@/components/layout/Footer/MotionToggle'
import { FadeIn } from '@/components/motion/FadeIn'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'
import { Grid } from '@/components/ui/Grid'
import { Stack } from '@/components/ui/Stack'
import { Text } from '@/components/ui/Typography'
import { useMotionCapability, useReducedMotion } from '@/hooks/useReducedMotion'

const meta: Meta = {
  title: 'Foundations/Reduced Motion',
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/05-motion-system.md` §14.',
          '',
          '> `prefers-reduced-motion: reduce` is honoured globally and is **not** a degraded experience — it is a first-class alternative presentation.',
          '',
          'Three principles:',
          '',
          '1. **Opacity is generally safe; transform generally is not.** Vestibular triggers come from movement, not from fading.',
          '2. **Never remove information.** Reduced motion must show *more* at once, not less.',
          '3. **Ship a manual toggle** alongside the OS preference. Many users don\'t know the OS setting exists.',
          '',
          'Use the **Motion** control in the toolbar to switch every story here.',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj

export const State: Story = {
  name: 'Current state',
  render: function StateStory() {
    const reduced = useReducedMotion()
    const capability = useMotionCapability()

    return (
      <Stack gap="6">
        <Text token="display-md" as="h2">
          Reduced motion
        </Text>

        <div
          className={`rounded-(--radius-lg) border-2 p-6 ${
            reduced ? 'border-warn bg-warn/10' : 'border-success bg-success/10'
          }`}
        >
          <Text token="heading-md" as="p" className="mb-2">
            {reduced ? 'Motion is reduced' : 'Motion is full'}
          </Text>
          <Text token="body-md" className="measure">
            {reduced
              ? 'Reveals render at their final state immediately. Scrub, pinning and parallax are off. Focus indicators are unaffected — they are never reduced.'
              : 'Entrance reveals, scrub and parallax are available, subject to the device capability check.'}
          </Text>
        </div>

        <div>
          <Text token="heading-md" as="h3" className="mb-3">
            The manual toggle
          </Text>
          <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
            This is the real control from the site footer. It writes to the same store the toolbar reads, and persists
            in local storage. Click it and watch the panel above change.
          </Text>
          <div data-register="house" className="rounded-(--radius-md) bg-stage-950 p-4">
            <MotionToggle />
          </div>
        </div>

        <div>
          <Text token="heading-md" as="h3" className="mb-3">
            Resolved capability
          </Text>
          <dl className="grid grid-cols-2 gap-2">
            {Object.entries(capability).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="font-body text-body-md">{key}</dt>
                <dd className={`font-body text-body-md ${value ? 'text-success' : 'text-(--color-text-muted)'}`}>
                  {value ? 'available' : 'disabled'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Stack>
    )
  },
}

export const Policy: Story = {
  name: 'Global policy',
  render: () => (
    <Stack gap="5">
      <Text token="display-md" as="h2">
        Global policy
      </Text>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Reduced-motion behaviour by category</caption>
          <thead>
            <tr className="border-b border-(--color-border-default)">
              {['Category', 'Reduced-motion behaviour'].map((header) => (
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
            {[
              ['Entrance reveals', 'Opacity only, 200ms. No translation, no scale.'],
              ['Parallax', 'Disabled'],
              ['Scrub / pinned sequences', 'Static, fully expanded, all steps visible and labelled'],
              ['Counters', 'Final value rendered immediately'],
              ['Hero light sweep', 'Static final state'],
              ['Page transitions', 'None — instant'],
              ['Hover scale / lift', 'Colour and shadow only, no transform'],
              ['Gallery FLIP', 'Simple fade'],
              ['Loading spinners', 'Retained — they convey system status, which is not decorative'],
              ['Focus indicators', 'Never reduced. Always full strength.'],
            ].map(([category, behaviour]) => (
              <tr key={category} className="border-b border-(--color-border-default)">
                <td className="py-2 pr-6 font-body text-body-md font-semibold">{category}</td>
                <td className="py-2 pr-6 font-body text-body-md text-(--color-text-secondary)">{behaviour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stack>
  ),
}

export const SideBySideComparison: Story = {
  name: 'Primitives under both settings',
  render: () => (
    <Stack gap="6">
      <Text token="display-md" as="h2">
        Every primitive, both ways
      </Text>
      <Text token="body-lg" className="measure text-(--color-text-secondary)">
        <strong>Toggle the Motion control and reload the story.</strong> Under reduced motion the content below is
        present and readable immediately — nothing is hidden waiting for an animation that will never run.
      </Text>

      <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-md" className="measure">
          This is the property that matters most: reveal targets are <strong>never</strong> <code>opacity: 0</code> in
          base CSS. They are hidden only after the motion layer confirms GSAP can run. A JavaScript failure, a slow
          device or a reduced-motion preference all leave the content visible.
        </Text>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-3">
          FadeIn
        </Text>
        <FadeIn>
          <Card elevation={1}>
            <CardBody>
              <Text token="body-md">Content that must be readable either way.</Text>
            </CardBody>
          </Card>
        </FadeIn>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-3">
          Reveal
        </Text>
        <Text token="display-md" as="p">
          <Reveal>Ready for the stage</Reveal>
        </Text>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-3">
          Stagger
        </Text>
        <Stagger>
          <Grid cols={2} colsMd={4} gap="tight">
            {Array.from({ length: 4 }, (_, i) => (
              <Card key={i} elevation={1}>
                <CardBody>
                  <Text token="body-md">{i + 1}</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Stagger>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-3">
          Button loading spinner
        </Text>
        <Button loading>Submitting</Button>
        <Text token="body-sm" className="measure mt-3 text-(--color-text-muted)">
          The spinner is <em>retained</em> under reduced motion in the specification, because it conveys system
          status rather than decoration — but its rotation stops via <code>motion-reduce:animate-none</code>, so it
          communicates without moving.
        </Text>
      </div>
    </Stack>
  ),
}
