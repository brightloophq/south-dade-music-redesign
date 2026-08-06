import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Eyebrow, Prose, Text } from './Typography'

const meta = {
  title: 'UI/Typography',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/04-design-system.md` §2.',
          '',
          'The central rule: **visual size is a token choice, decoupled from semantic level.** Phase 2 found `<h2>` used as body lead-ins ("We offer", "Key benefits include") and `<h1>` rendered two or three times per page. Choose `as` by document structure and `token` by visual weight, independently.',
          '',
          'Sentence case for headings — not Title Case, not ALL CAPS except the `label` token.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'In 90 days, your child takes a stage' },
  argTypes: {
    token: {
      control: 'select',
      options: [
        'display-xl',
        'display-lg',
        'display-md',
        'heading-lg',
        'heading-md',
        'heading-sm',
        'body-lg',
        'body-md',
        'body-sm',
        'label',
        'stat',
      ],
    },
    width: { control: 'inline-radio', options: ['condensed', 'normal', 'wide', 'expanded'] },
    measure: { control: 'inline-radio', options: [false, true, 'tight'] },
    numeric: { control: 'boolean' },
    balance: { control: 'boolean' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { token: 'display-md' },
}

export const SemanticVsVisual: Story = {
  name: 'Semantic level vs visual size',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        These three lines are visually identical and semantically different. Inspect the DOM: the first is an{' '}
        <code>h2</code>, the second an <code>h3</code>, the third a <code>p</code>. The heading outline stays correct
        while the page looks the way the design requires.
      </Text>
      <div className="flex flex-col gap-3 border-l-2 border-(--color-border-default) pl-5">
        <Text token="display-md" as="h2">
          Rendered as h2
        </Text>
        <Text token="display-md" as="h3">
          Rendered as h3
        </Text>
        <Text token="display-md" as="p">
          Rendered as p
        </Text>
      </div>
      <div className="rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-sm" className="measure text-(--color-text-secondary)">
          Enforced separately: exactly one <code>h1</code> per page, levels never skipped, audited in CI. The
          constraints live in <code>typographyRules</code> in <code>src/tokens/typography.ts</code> so a check can read
          them rather than re-deriving them from prose.
        </Text>
      </div>
    </div>
  ),
}

export const AllTokens: Story = {
  name: 'All tokens',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {(
        [
          'display-xl',
          'display-lg',
          'display-md',
          'heading-lg',
          'heading-md',
          'heading-sm',
          'body-lg',
          'body-md',
          'body-sm',
          'label',
        ] as const
      ).map((token) => (
        <div key={token} className="border-b border-(--color-border-default) pb-4">
          <code className="mb-1 block font-body text-body-sm text-(--color-text-muted)">{token}</code>
          <Text token={token} as="p">
            In 90 days, your child takes a stage
          </Text>
        </div>
      ))}
      <div>
        <code className="mb-1 block font-body text-body-sm text-(--color-text-muted)">stat — tabular numerals</code>
        <Text token="stat" as="p" numeric>
          90
        </Text>
      </div>
    </div>
  ),
}

export const WidthAxis: Story = {
  name: 'Width axis',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-5">
      <Text token="body-md" className="measure">
        Expanded is permitted at <code>display-md</code> and above only — the component logs a development warning
        otherwise. Maximum two expanded-width statements per page: wide type at scale is the most expensive-looking
        thing in the system and dies instantly from repetition.
      </Text>
      {(['expanded', 'wide', 'normal', 'condensed'] as const).map((width) => (
        <div key={width}>
          <code className="mb-1 block font-body text-body-sm text-(--color-text-muted)">{width}</code>
          <Text token="display-md" as="p" width={width}>
            Ready for the stage
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Measure: Story = {
  name: 'Measure',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          measure — 68ch, the 60–75 character line
        </code>
        <Text token="body-md" measure>
          Because once they realize they can get through something that feels scary, it changes how they approach
          everything else. This line wraps at roughly seventy characters, which is the range the eye tracks
          comfortably without losing its place on the return sweep.
        </Text>
      </div>
      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          measure=&quot;tight&quot; — 45ch, for in-frame copy read at a glance
        </code>
        <Text token="body-lg" measure="tight">
          That&rsquo;s not shyness. That&rsquo;s a skill she hasn&rsquo;t been taught yet.
        </Text>
      </div>
      <div>
        <code className="mb-2 block font-body text-body-sm text-error">no measure — avoid for body copy</code>
        <Text token="body-md">
          Without a constrained measure a paragraph runs the full width of its container, which on a wide desktop
          viewport produces lines far beyond the comfortable range and makes the return sweep unreliable. Prose is
          always constrained.
        </Text>
      </div>
    </div>
  ),
}

export const Numerals: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        Tabular numerals are mandatory anywhere a figure animates or updates — prices, dates, week counters, capacity.
        Proportional digits change width as they change value, which shifts the layout mid-animation.
      </Text>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <code className="mb-2 block font-body text-body-sm text-success">tabular — layout stable</code>
          <Text token="stat" as="p" numeric>
            1111
          </Text>
          <Text token="stat" as="p" numeric>
            9000
          </Text>
        </div>
        <div>
          <code className="mb-2 block font-body text-body-sm text-error">proportional — width shifts</code>
          <p className="font-display text-stat font-bold" style={{ fontVariantNumeric: 'proportional-nums' }}>
            1111
          </p>
          <p className="font-display text-stat font-bold" style={{ fontVariantNumeric: 'proportional-nums' }}>
            9000
          </p>
        </div>
      </div>
    </div>
  ),
}

export const EyebrowAndProse: Story = {
  name: 'Eyebrow & Prose',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <Eyebrow>The 90-Day Stage Program</Eyebrow>
        <Text token="display-md" as="h2" className="mt-2">
          Eyebrow above a heading
        </Text>
        <Text token="body-sm" className="mt-2 measure text-(--color-text-muted)">
          The <code>label</code> token is the only uppercase treatment in the system — 13px, 600 weight, 0.08em
          tracking.
        </Text>
      </div>

      <div>
        <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">
          Prose — for authored long-form content
        </code>
        <Prose>
          <h2>Weeks 1–10</h2>
          <p>
            Students build the skill in parallel tracks: one class for technique, one for band application. The
            structure is published rather than described.
          </p>
          <p>
            A parent can put this in a calendar, which is the point. Vagueness is the failure mode the redesign is
            correcting.
          </p>
          <h3>Week 11</h3>
          <ul>
            <li>They play for the class</li>
            <li>Peer exposure, not performance</li>
          </ul>
          <p>
            Read more in the <a href="#">programme detail</a>.
          </p>
        </Prose>
      </div>
    </div>
  ),
}

export const SpanishExpansion: Story = {
  name: 'Spanish expansion',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Text token="body-md" className="measure">
        Every component must tolerate <strong>+35% text expansion</strong> in Spanish without breaking, and Spanish
        body copy gets 1.7 line-height — accented ascenders need room. The <code>:lang(es)</code> rule in{' '}
        <code>globals.css</code> applies it automatically.
      </Text>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">en — 21 characters</code>
          <Text token="display-lg" as="p" width="expanded">
            Ready for the stage
          </Text>
        </div>
        <div lang="es">
          <code className="mb-2 block font-body text-body-sm text-(--color-text-muted)">es — 27 characters</code>
          <Text token="display-lg" as="p" width="expanded">
            Listos para el escenario
          </Text>
        </div>
      </div>
      <div className="rounded-(--radius-md) border border-warn p-4">
        <Text token="body-sm" className="measure">
          ⚠️ At <code>display-xl</code> and expanded width this is the worst case in the project. The width axis
          narrows to ~100 on the Spanish tree rather than reducing the size. <strong>Prove it at design review, not
          at build.</strong>
        </Text>
      </div>
    </div>
  ),
}
