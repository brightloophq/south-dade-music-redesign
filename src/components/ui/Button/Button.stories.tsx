import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight, Phone, Play, X } from 'lucide-react'

import { Icon } from '@/components/ui/Icon'
import { Text } from '@/components/ui/Typography'

import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/04-design-system.md` §7.',
          '',
          'Content rules this component enforces structurally:',
          '',
          '- **Price in the label** where a price exists — `price` renders as `Label — $25`. This prevents the Phase 2 failure where the $25 trial charge was disclosed on 2 pages out of 26.',
          '- **Every button is a real link or a real control.** Passing `href` renders an anchor (a `next/link` for internal routes, a plain `<a>` for external); otherwise a `<button>`. The twenty text-only prompts Phase 2 found become real controls or are deleted.',
          '- **Minimum 44×44px touch target** at `md` and above.',
          '- Icons are decorative and `aria-hidden`; the label carries the meaning.',
          '- Loading keeps the label and **locks the width**, so the layout never shifts. CLS target is 0.00.',
          '',
          'Rules enforced in review, not in code: verb + object ("Book a trial", never "Submit"), and never two primaries in one viewport.',
        ].join('\n'),
      },
    },
  },
  args: {
    children: 'Book a trial',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'text', 'icon', 'cta', 'on-dark-secondary', 'destructive'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    price: { control: 'text' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <Text token="heading-md" as="h3" className="mb-1">
          Variants
        </Text>
        <Text token="body-sm" className="measure mb-4 text-(--color-text-muted)">
          Switch the <strong>Register</strong> toolbar control to House to see every variant on the dark ground.
          <code> on-dark-secondary</code> is intended for that register only.
        </Text>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Book a trial</Button>
          <Button variant="secondary">Watch a showcase</Button>
          <Button variant="outline">See details</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="text">Read the FAQ</Button>
          <Button variant="on-dark-secondary">Hero secondary</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="icon" aria-label="Close">
            <Icon icon={X} size="inline" />
          </Button>
        </div>
      </div>

      <div>
        <Text token="heading-md" as="h3" className="mb-1">
          The spotlight glow
        </Text>
        <Text token="body-sm" className="measure mb-4 text-(--color-text-muted)">
          <code>variant=&quot;cta&quot;</code> carries <code>--shadow-spotlight</code>, the visual signature of the
          brand. Reserved for the single most important conversion action on a page — used broadly it loses all
          meaning (04 §5).
        </Text>
        <Button variant="cta" size="lg" price="$25">
          Book a trial
        </Button>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        <code>md</code> (44px), <code>lg</code> (52px) and <code>xl</code> (60px) all meet the minimum touch target.
        <code> sm</code> (36px) is for inline use inside cards, where 36px plus 8px separation is acceptable.
      </Text>
      <div className="flex flex-wrap items-end gap-4">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Button size={size}>Book a trial</Button>
            <code className="font-body text-body-sm text-(--color-text-muted)">{size}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const PriceDisclosure: Story = {
  name: 'Price disclosure',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        Phase 2 found <strong>no price for any lesson product</strong> and the $25 trial charge disclosed on two pages
        out of twenty-six. The <code>price</code> prop puts the figure in the label, in tabular numerals, so a CTA
        cannot ship without it once the price is known.
      </Text>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="lg" price="$25">
          Book a trial
        </Button>
        <Button variant="secondary" size="lg" price="$450">
          Reserve a seat
        </Button>
      </div>
      <div className="rounded-(--radius-md) border border-warn p-4">
        <Text token="body-sm">
          ⚠️ <strong>Gate B-8.</strong> No price is published yet, so{' '}
          <code>primaryCta.priceSuffix</code> is <code>null</code> and the real header CTA renders without one. The
          label must never invent a figure.
        </Text>
      </div>
    </div>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Submitting</Button>
      </div>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        The loading state keeps the label in the DOM and hides it visually, so the button&rsquo;s width is locked and
        the layout cannot shift. <code>aria-busy</code> is set. The spinner respects reduced motion — switch the
        <strong> Motion</strong> toolbar control to see it stop.
      </Text>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        <strong>Keyboard:</strong> tab to any button to see the focus ring — 2px <code>spot-500</code> at 2px offset.
        Focus indicators are never reduced and never animated (05 §16 rule 9).
      </Text>
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With icons',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button iconEnd={<Icon icon={ArrowRight} size="inline" />}>Continue</Button>
        <Button variant="secondary" iconStart={<Icon icon={Play} size="inline" />}>
          Watch a showcase
        </Button>
        <Button variant="outline" iconStart={<Icon icon={Phone} size="inline" />}>
          Call us
        </Button>
      </div>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Icons are wrapped in <code>aria-hidden</code> spans. An icon never replaces a label on a primary action; an
        icon-only button requires <code>aria-label</code> on the button itself.
      </Text>
    </div>
  ),
}

export const AsLink: Story = {
  name: 'Links vs buttons',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button href="/programs">Internal — next/link</Button>
        <Button href="https://example.com" variant="outline">
          External — plain anchor
        </Button>
        <Button href="tel:+17867539509" variant="ghost">
          tel: — plain anchor
        </Button>
        <Button onClick={() => {}}>Real button</Button>
      </div>
      <Text token="body-sm" className="measure text-(--color-text-muted)">
        Internal hrefs render a <code>next/link</code> for client navigation; external, <code>mailto:</code> and{' '}
        <code>tel:</code> hrefs render a plain anchor. Without an href it is a real <code>&lt;button&gt;</code>. There
        is no third state — a div that looks clickable is not reachable by keyboard.
      </Text>
    </div>
  ),
}
