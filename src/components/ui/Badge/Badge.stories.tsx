import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from '@/components/ui/Typography'

import { Badge } from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [
          'Type is the `label` token — 13px, 600 weight, 0.08em tracking, uppercase. The only uppercase treatment in the system.',
          '',
          '⚠️ **A capacity badge is a factual claim.** Never fabricate scarcity (`05-motion-system.md` §7). "3 seats left" requires a real figure from a real system.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Seats remaining' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'accent', 'success', 'warn', 'error', 'info'] },
    variant: { control: 'inline-radio', options: ['solid', 'soft', 'outline'] },
    live: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { tone: 'neutral', variant: 'soft' },
}

export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant}>
          <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">{variant}</code>
          <div className="flex flex-wrap gap-3">
            {(['neutral', 'accent', 'success', 'warn', 'error', 'info'] as const).map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-sm" className="measure text-(--color-text-secondary)">
          Note <code>tone=&quot;accent&quot;</code> in the <strong>solid</strong> variant: amber is a <em>fill</em>{' '}
          with <code>stage-950</code> text on it (9.70:1). It is never amber text on a light ground, which computes to
          2.04:1 and is banned outright.
        </Text>
      </div>
    </div>
  ),
}

export const LiveRegion: Story = {
  name: 'Live status',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Badge tone="warn" variant="soft" live>
        Placeholder capacity
      </Badge>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        <code>live</code> adds <code>role=&quot;status&quot;</code> and <code>aria-live=&quot;polite&quot;</code>, so a
        change is announced. Use it for capacity and deadline updates — <strong>not</strong> for static labels, which
        would make a screen reader re-announce decoration.
      </Text>
    </div>
  ),
}
