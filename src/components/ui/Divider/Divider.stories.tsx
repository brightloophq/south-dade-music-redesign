import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from '@/components/ui/Typography'

import { Divider } from './Divider'

const meta = {
  title: 'UI/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: [
          '"The bill is ruled" — rules are a primary structural device in the House register.',
          '',
          'The border colour follows `--color-border-default`, so it becomes `stage-700` on dark grounds and `n-200` on light automatically. Switch the Register toolbar control to see it.',
          '',
          'A plain divider is decorative and hidden from assistive technology; a labelled one is a real separator with its label announced.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    spacing: { control: 'inline-radio', options: ['none', 'tight', 'base', 'loose'] },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { spacing: 'base' },
  render: (args) => (
    <div>
      <Text token="body-md">Content above</Text>
      <Divider {...args} />
      <Text token="body-md">Content below</Text>
    </div>
  ),
}

export const Spacing: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['tight', 'base', 'loose'] as const).map((spacing) => (
        <div key={spacing}>
          <code className="font-body text-body-sm text-(--color-text-muted)">spacing=&quot;{spacing}&quot;</code>
          <Divider spacing={spacing} />
        </div>
      ))}
    </div>
  ),
}

export const Labelled: Story = {
  name: 'Labelled — the bill line',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8">
      <Divider>Week 12 · Showcase</Divider>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        The label uses 0.12em tracking — the &ldquo;bill line&rdquo; treatment, set the way a printed programme sets a
        dated entry. A labelled divider carries <code>role=&quot;separator&quot;</code> with its text announced; a
        plain one is <code>aria-hidden</code>.
      </Text>
      <Divider>Interval</Divider>
    </div>
  ),
}

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex h-16 items-center gap-4">
      <Text token="body-md">Florida City</Text>
      <Divider orientation="vertical" />
      <Text token="body-md">Homestead</Text>
      <Divider orientation="vertical" />
      <Text token="body-md">Cutler Bay</Text>
    </div>
  ),
}
