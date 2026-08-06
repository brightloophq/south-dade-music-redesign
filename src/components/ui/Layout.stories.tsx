import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from '@/components/ui/Typography'

import { Cluster } from './Cluster'
import { Container } from './Container'
import { Grid } from './Grid'
import { Section } from './Section'
import { Sidebar } from './Sidebar'
import { Split } from './Split'
import { Stack } from './Stack'

const meta: Meta = {
  title: 'Layout/Primitives',
  parameters: {
    docs: {
      description: {
        component:
          'Layout archetypes from `docs/redesign/04-design-system.md` §4. Resize the preview pane to see each respond.',
      },
    },
  },
}

export default meta
type Story = StoryObj

/** A visible block so the layout itself is what you are looking at. */
function Box({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-(--radius-md) border border-dashed border-(--color-border-default) bg-(--color-surface-sunken) p-4 font-body text-body-sm text-(--color-text-secondary) ${
        tall ? 'min-h-32' : 'min-h-16'
      }`}
    >
      {children}
    </div>
  )
}

export const ContainerWidths: Story = {
  name: 'Container',
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        Content max-width is 1440px, prose is 68ch. Side margins follow the responsive grid — 20 / 24 / 32 / 48 / 64px
        — driven by the <code>--grid-margin</code> custom property, so every container agrees at every breakpoint
        without repeating the media queries.
      </Text>
      {(['prose', 'narrow', 'content', 'wide', 'full'] as const).map((width) => (
        <Container key={width} width={width} flush>
          <div className="rounded-(--radius-md) bg-spot-500/15 p-3 text-center font-body text-body-sm">
            width=&quot;{width}&quot;
          </div>
        </Container>
      ))}
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        <code>full</code> is edge-to-edge and permitted for photography, hero and showcase galleries only.
      </Text>
    </div>
  ),
}

export const SectionDensity: Story = {
  name: 'Section',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div>
      <Container width="content" className="pb-6">
        <Text token="body-md" className="measure">
          Four densities, each responsive. <strong>Feature</strong> is reserved for hero, showcase and the 90-day
          timeline. Generous vertical space is what separates a premium feel from a template — the current site has
          near-uniform section padding, which is why every section reads with the same importance.
        </Text>
      </Container>

      {(['compact', 'comfortable', 'spacious', 'feature'] as const).map((density, index) => (
        <Section
          key={density}
          density={density}
          className={index % 2 === 0 ? 'bg-(--color-surface-sunken)' : undefined}
        >
          <div className="rounded-(--radius-md) border border-dashed border-(--color-border-default) p-4 text-center">
            <code className="font-body text-body-md font-semibold">density=&quot;{density}&quot;</code>
          </div>
        </Section>
      ))}
    </div>
  ),
}

export const SectionRegisters: Story = {
  name: 'Section — registers',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div>
      <Section register="desk" density="comfortable">
        <Text token="display-md" as="h2">
          The Desk
        </Text>
        <Text token="body-lg" className="measure mt-2 text-(--color-text-secondary)">
          Light, plain, specific. Where a parent decides. Prices, dates, ages, deposits, eligibility, terms, the
          guarantee, contact details and forms all live here.
        </Text>
      </Section>

      <Section register="house" density="comfortable">
        <Text token="display-md" as="h2">
          The House
        </Text>
        <Text token="body-lg" className="measure mt-2 text-(--color-text-secondary)">
          Dark, lit, composed. Where a parent is persuaded. Setting <code>register</code> applies{' '}
          <code>data-register</code>, which re-points the semantic colour aliases — so nothing inside needs
          register-specific classes.
        </Text>
      </Section>

      <Section register="desk" density="compact">
        <Text token="body-sm" className="measure text-(--color-text-muted)">
          Both blocks above use the same markup and the same class names. Only the <code>register</code> prop differs.
        </Text>
      </Section>
    </div>
  ),
}

export const GridColumns: Story = {
  name: 'Grid',
  render: () => (
    <div className="flex flex-col gap-8">
      <Text token="body-md" className="measure">
        Card grids run 1 / 2 / 3 at xs / md / lg — layout archetype 3. Gutters follow <code>--grid-gutter</code>:
        16 / 24 / 32px across breakpoints. <strong>Resize the preview pane.</strong>
      </Text>

      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          cols=1 colsMd=2 colsLg=3 — the card-grid default
        </code>
        <Grid cols={1} colsMd={2} colsLg={3} gap="base">
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i}>{i + 1}</Box>
          ))}
        </Grid>
      </div>

      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          cols=2 colsLg=4 · gap=&quot;loose&quot;
        </code>
        <Grid cols={2} colsLg={4} gap="loose">
          {Array.from({ length: 8 }, (_, i) => (
            <Box key={i}>{i + 1}</Box>
          ))}
        </Grid>
      </div>
    </div>
  ),
}

export const StackAndCluster: Story = {
  name: 'Stack & Cluster',
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <Text token="heading-md" as="h3" className="mb-1">
          Stack — one axis, one spacing decision
        </Text>
        <Text token="body-sm" className="measure mb-4 text-(--color-text-muted)">
          A component declares its density; it does not invent spacing.
        </Text>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(['2', '4', '6'] as const).map((gap) => (
            <div key={gap}>
              <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">gap=&quot;{gap}&quot;</code>
              <Stack gap={gap}>
                <Box>One</Box>
                <Box>Two</Box>
                <Box>Three</Box>
              </Stack>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-1">
          Cluster — horizontal grouping that wraps
        </Text>
        <Text token="body-sm" className="measure mb-4 text-(--color-text-muted)">
          Wraps by default, because every component must tolerate +35% text expansion in Spanish without breaking.
          <code> nowrap</code> opts out and should be justified. <strong>Narrow the preview pane</strong> to see the
          wrap.
        </Text>
        <Cluster gap="3">
          {['Piano', 'Guitar', 'Drums', 'Bass', 'Violin', 'Ukulele', 'Voice'].map((instrument) => (
            <span
              key={instrument}
              className="rounded-(--radius-full) border border-(--color-border-default) px-4 py-2 font-body text-body-sm"
            >
              {instrument}
            </span>
          ))}
        </Cluster>
      </div>
    </div>
  ),
}

export const SplitLayout: Story = {
  name: 'Split',
  render: () => (
    <div className="flex flex-col gap-8">
      <Text token="body-md" className="measure">
        Archetype 2 — <strong>7/5 asymmetric at lg+, never 50/50.</strong> Symmetry reads static. DOM order is always
        start then end, so reading and tab order stay correct regardless of <code>reverse</code>.
      </Text>

      {(['7/5', '5/7', '8/4'] as const).map((ratio) => (
        <div key={ratio}>
          <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">ratio=&quot;{ratio}&quot;</code>
          <Split ratio={ratio} start={<Box tall>start</Box>} end={<Box tall>end</Box>} />
        </div>
      ))}

      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          reverse — visual order flips at lg, DOM order does not
        </code>
        <Split ratio="7/5" reverse start={<Box tall>start (first in DOM)</Box>} end={<Box tall>end</Box>} />
      </div>
    </div>
  ),
}

export const SidebarLayout: Story = {
  name: 'Sidebar',
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        Archetype 6 — a sticky summary rail beside scrolling detail.{' '}
        <strong>This is the pattern that fixes the &ldquo;no CTA at the bottom&rdquo; failure</strong> Phase 2 found,
        where twenty text-only prompts sat at the point of highest intent. Stacks below <code>lg</code>, with the rail
        moving above the content so a mobile user meets the summary first.
      </Text>
      <Sidebar
        side={
          <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-raised) p-5">
            <Text token="heading-sm" as="h3">
              Summary rail
            </Text>
            <Text token="body-sm" className="mt-2 text-(--color-text-secondary)">
              Price, dates and the CTA live here, visible at every scroll position.
            </Text>
          </div>
        }
      >
        <Stack gap="4">
          {Array.from({ length: 8 }, (_, i) => (
            <Box key={i} tall>
              Detail block {i + 1}
            </Box>
          ))}
        </Stack>
      </Sidebar>
    </div>
  ),
}
