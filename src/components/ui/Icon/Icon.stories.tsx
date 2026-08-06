import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Info,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Typography'

import { Icon } from './Icon'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/04-design-system.md` §12.',
          '',
          'Style: stroke-based, **1.75px at 24px**, rounded caps and joins, single `currentColor` — never multi-colour.',
          '',
          '**No emoji as UI.** The current site renders 🎹 🎸 🥁 📞 📍 as remote images from `s.w.org` — an external request per page for a decorative glyph. Removed entirely; external font and image CDNs are not reintroduced.',
          '',
          '⚠️ The seven bespoke instrument marks (piano, guitar, drums, bass, violin, ukulele, voice) are brand assets drawn on the design grid, and are **not** part of the foundation. Lucide covers UI affordances only.',
        ].join('\n'),
      },
    },
  },
  args: { icon: Star },
  argTypes: {
    size: { control: 'inline-radio', options: ['inline', 'base', 'feature', 'empty-state'] },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { size: 'base' },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-end gap-8">
      {(
        [
          ['inline', 20, 'Inline with text'],
          ['base', 24, 'Default UI grid'],
          ['feature', 32, 'Feature callouts'],
          ['empty-state', 48, 'Empty and error states'],
        ] as const
      ).map(([size, px, use]) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={Star} size={size} />
          <code className="font-body text-body-sm font-semibold">{size}</code>
          <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{px}px</span>
          <span className="max-w-28 text-center font-body text-body-sm text-(--color-text-muted)">{use}</span>
        </div>
      ))}
    </div>
  ),
}

export const Set: Story = {
  name: 'UI set',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Lucide (ISC) covers UI affordances. Icons inherit <code>currentColor</code>, so they follow the register —
        switch the toolbar control to House.
      </Text>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-7">
        {[
          ['ArrowRight', ArrowRight],
          ['Calendar', Calendar],
          ['Check', Check],
          ['ChevronDown', ChevronDown],
          ['Clock', Clock],
          ['Info', Info],
          ['Mail', Mail],
          ['MapPin', MapPin],
          ['Menu', Menu],
          ['Phone', Phone],
          ['Search', Search],
          ['Star', Star],
          ['Users', Users],
          ['X', X],
        ].map(([name, glyph]) => (
          <div
            key={name as string}
            className="flex flex-col items-center gap-2 rounded-(--radius-md) border border-(--color-border-default) p-3"
          >
            <Icon icon={glyph as typeof Star} size="base" />
            <span className="text-center font-body text-body-sm text-(--color-text-muted)">{name as string}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Accessibility: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <Text token="heading-sm" as="h3" className="mb-2">
          Decorative — the default
        </Text>
        <Text token="body-sm" className="measure mb-3 text-(--color-text-muted)">
          Without <code>label</code> the icon is <code>aria-hidden</code>. The adjacent text carries the meaning, so a
          screen reader announces &ldquo;Call us&rdquo; once, not twice.
        </Text>
        <Button variant="outline" iconStart={<Icon icon={Phone} size="inline" />}>
          Call us
        </Button>
      </div>

      <div>
        <Text token="heading-sm" as="h3" className="mb-2">
          Icon-only controls
        </Text>
        <Text token="body-sm" className="measure mb-3 text-(--color-text-muted)">
          The <strong>button</strong> is labelled, not the icon — and it keeps a 44px hit area regardless of glyph
          size. Tab to it to confirm the accessible name in the a11y panel.
        </Text>
        <Button variant="icon" aria-label="Close menu">
          <Icon icon={X} size="inline" />
        </Button>
      </div>

      <div>
        <Text token="heading-sm" as="h3" className="mb-2">
          Meaningful icon — rare
        </Text>
        <Text token="body-sm" className="measure mb-3 text-(--color-text-muted)">
          Passing <code>label</code> gives the icon <code>role=&quot;img&quot;</code> and a name. Only correct when the
          icon genuinely carries information no nearby text does — which is almost never.
        </Text>
        <Icon icon={Check} size="feature" label="Included" />
      </div>
    </div>
  ),
}
