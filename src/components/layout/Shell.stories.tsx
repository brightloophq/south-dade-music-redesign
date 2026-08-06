import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Typography'
import { MAIN_CONTENT_ID } from '@/config/navigation'

import { Footer } from './Footer'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { SkipLink } from './SkipLink'

const meta: Meta = {
  title: 'Layout Shell/Navigation & Footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/02-information-architecture.md` §2–4 and `04-design-system.md` §11.',
          '',
          '⚠️ **Routes are placeholders.** Phase 4 built the navigation *mechanism*; the target pages do not exist. Every item carries a `status` — `live`, `planned` or `gated` — and non-live items render as **plain text rather than links**, so the foundation never ships a link to a 404.',
          '',
          'That is why every item here appears muted: nothing is `live` yet. Inspect an item to see `data-route-status` and, where relevant, `data-gate`.',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj

export const HeaderStory: Story = {
  name: 'Header',
  render: () => (
    <div className="min-h-[150vh]">
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Section density="comfortable">
          <Text token="display-md" as="h1" className="mb-4">
            Header behaviour
          </Text>
          <Text token="body-lg" className="measure mb-6 text-(--color-text-secondary)">
            <strong>Scroll this story.</strong> The header condenses from 80px to 64px and its ground fills in. Only
            background, shadow and height transition — never transform, so the header cannot contribute layout shift.
          </Text>
          <ul className="flex flex-col gap-3">
            {[
              'The 90-Day Program keeps a permanent, unhidden top-level slot — the single most important IA change. It is set in Archivo where its siblings are Inter, with a spot-400 hairline beneath, so it reads as "the current production".',
              'The primary CTA is a persistent button, not a nav item, and never scrolls away. It is disabled here because gate B-8 has not published a price, and its label must not invent one.',
              'The search control is disabled: a search box that returns nothing is worse than no search box.',
              'EN | ES is a static indicator rather than a control. ⚠️ Gate B-6 — the bilingual claim is made sitewide and delivered nowhere, so it must not imply a Spanish path that does not exist.',
              '--header-height is published as a custom property so scroll-padding-top and the sticky sidebar rail stay in sync with the real height.',
            ].map((line) => (
              <li key={line} className="border-l-2 border-(--color-border-default) pl-4">
                <Text token="body-md" className="measure">
                  {line}
                </Text>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  ),
}

export const NavigationStory: Story = {
  name: 'Navigation — desktop',
  render: () => (
    <Container width="wide" className="py-8">
      <Text token="display-md" as="h2" className="mb-4">
        Desktop navigation
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Hidden below <code>lg</code> — <strong>widen the preview pane</strong> if you see nothing.
      </Text>

      <div className="rounded-(--radius-lg) border border-(--color-border-default) p-4">
        <Navigation />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Text token="heading-md" as="h3">
          Try these
        </Text>
        {[
          ['Hover a parent item', 'The panel opens after a 150ms intent delay, so a cursor crossing the nav does not fire every menu.'],
          ['Tab into the nav', 'The panel opens on focus too. Keyboard users get the same affordance as pointer users.'],
          ['Press Escape', 'Closes the open panel. Clicking outside closes it as well.'],
          ['Tab past the last item', 'Focus leaves the menu normally. The mega-menu never traps focus — a menu is not a dialog. The mobile drawer does trap, and that is the correct distinction.'],
          ['Hover an item on a fine pointer', 'The underline draws from the centre outward. Gated behind @media (pointer:fine) and (hover:hover), so it never sticks on touch.'],
        ].map(([action, note]) => (
          <div key={action} className="border-l-2 border-spot-500 pl-4">
            <Text token="body-md" className="font-semibold">
              {action}
            </Text>
            <Text token="body-sm" className="measure text-(--color-text-secondary)">
              {note}
            </Text>
          </div>
        ))}
      </div>
    </Container>
  ),
}

export const MobileNavigation: Story = {
  name: 'Navigation — mobile drawer',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Section density="compact">
          <Text token="heading-lg" as="h2" className="mb-4">
            Mobile drawer
          </Text>
          <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
            <strong>Narrow the preview pane below 1024px</strong> and open the menu.
          </Text>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {[
              'Full-screen stage-900, accordion sections — never nested screens, so a parent cannot lose their place in a hierarchy.',
              'Focus is trapped while open and restored to the toggle on close.',
              'Escape closes it.',
              'Body scroll locks with the scrollbar width compensated, so opening it cannot shift the layout.',
              'The drawer stays mounted and uses the hidden attribute, so aria-controls always resolves to a real element.',
            ].map((line) => (
              <li key={line}>
                <Text token="body-sm" className="measure">
                  {line}
                </Text>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  ),
}

export const SkipLinkStory: Story = {
  name: 'Skip link',
  render: () => (
    <div>
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Section density="comfortable">
          <Text token="display-md" as="h1" className="mb-4">
            Skip to content
          </Text>
          <Text token="body-lg" className="measure text-(--color-text-secondary)">
            <strong>Click here, then press Tab.</strong> The skip link is the first tab stop on every page and appears
            top-left at full strength.
          </Text>
          <ul className="mt-6 flex list-disc flex-col gap-2 pl-5">
            <li>
              <Text token="body-md" className="measure">
                It sits at <code>--z-skip-link</code> (900), above the header (200) and the drawer (300). A skip link
                occluded by a sticky header is a skip link that does not exist.
              </Text>
            </li>
            <li>
              <Text token="body-md" className="measure">
                It is <strong>never animated</strong> — it appears instantly, including under reduced motion.
              </Text>
            </li>
          </ul>
        </Section>
      </main>
    </div>
  ),
}

export const FooterStory: Story = {
  name: 'Footer',
  render: () => (
    <div className="flex min-h-screen flex-col">
      <Section density="compact" className="flex-1">
        <Text token="display-md" as="h2" className="mb-4">
          Footer
        </Text>
        <Text token="body-lg" className="measure text-(--color-text-secondary)">
          &ldquo;The footer carries the address, hours and phone — it is load-bearing and must be treated as content,
          not chrome.&rdquo;
        </Text>
        <div className="mt-6 rounded-(--radius-md) border-2 border-warn p-5">
          <Text token="heading-sm" as="h3" className="mb-2">
            ⚠️ The contact block is deliberately empty
          </Text>
          <Text token="body-md" className="measure">
            Phase 2 found <strong>two phone numbers</strong> (the sitewide footer and a completely different number on
            the subdomain), <strong>two email addresses</strong> (<code>info@</code> in the footer and{' '}
            <code>contact@</code> in the contact page body directly above it) and <strong>three unit numbers</strong>{' '}
            (117 / 1157 / 115). Publishing the wrong one sends a parent to the wrong door, so the slot is marked and
            gated rather than filled with a guess.
          </Text>
        </div>
        <div className="mt-4 rounded-(--radius-md) border border-(--color-border-default) p-5">
          <Text token="body-md" className="measure">
            The footer also carries the <strong>manual reduce-motion toggle</strong>. Many users don&rsquo;t know the
            OS setting exists, so it ships alongside it and persists in local storage. Click it and watch the{' '}
            <strong>Motion</strong> state change — it writes to the same store the toolbar control reads.
          </Text>
        </div>
      </Section>
      <Footer />
    </div>
  ),
}
