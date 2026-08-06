import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card, CardBody } from '@/components/ui/Card'
import { Grid } from '@/components/ui/Grid'
import { Stack } from '@/components/ui/Stack'
import { Text } from '@/components/ui/Typography'
import { useMotionCapability, useReducedMotion } from '@/hooks/useReducedMotion'

import { FadeIn } from './FadeIn'
import { Parallax } from './Parallax'
import { Reveal } from './Reveal'
import { Stagger } from './Stagger'

const meta: Meta = {
  title: 'Motion/Primitives',
  parameters: {
    docs: {
      description: {
        component: [
          'Canonical spec: `docs/redesign/05-motion-system.md`.',
          '',
          '> **Motion here is stagecraft, not decoration.**',
          '',
          'Every animation answers one of: *where did this come from?*, *what changed?*, *what should I look at?*, *did that work?* If it answers none, it is deleted.',
          '',
          '**Content is present at first paint and enhanced afterwards.** Reveal targets are never `opacity: 0` in base CSS — they are hidden only once the motion layer confirms GSAP can run, so a JavaScript failure leaves everything readable.',
          '',
          'Switch the **Motion** toolbar control to `reduced` on any story here: the content renders at its final state immediately, which is a first-class alternative presentation, not a degraded one.',
          '',
          '⚠️ These primitives ship **unapplied**. No UI in the product animates yet.',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj

function ScrollPrompt() {
  return (
    <div className="mb-6 rounded-(--radius-md) border border-spot-500 bg-spot-500/10 p-4">
      <Text token="body-md" className="measure">
        ↓ <strong>Scroll down inside this frame.</strong> Reveals trigger at 80% of the viewport, so the animation
        completes as the element reaches comfortable reading position — and each element animates{' '}
        <strong>once</strong>, never again on scroll-back.
      </Text>
    </div>
  )
}

function Spacer() {
  return <div className="h-[70vh]" aria-hidden="true" />
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-raised) p-8">
      <Text token="heading-md" as="p">
        {children}
      </Text>
    </div>
  )
}

export const Capability: Story = {
  name: 'Capability report',
  render: function CapabilityStory() {
    const capability = useMotionCapability()
    const reduced = useReducedMotion()

    return (
      <Stack gap="5">
        <Text token="display-md" as="h2">
          What this device may run
        </Text>
        <Text token="body-lg" className="measure text-(--color-text-secondary)">
          Resolved live from the OS preference, the <code>Save-Data</code> header, the manual toggle and the device
          profile. Below the CPU or memory thresholds, scrub, pinning and parallax switch off while simple reveals
          continue — which matters commercially, because much of this market is on mid-range Android.
        </Text>

        <div className="rounded-(--radius-lg) border border-(--color-border-default) p-5">
          <dl className="grid grid-cols-2 gap-3">
            <dt className="font-body text-body-md font-semibold">Reduced motion</dt>
            <dd className={`font-body text-body-md ${reduced ? 'text-warn' : 'text-success'}`}>
              {reduced ? 'yes — motion suppressed' : 'no'}
            </dd>
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

        <Text token="body-sm" className="measure text-(--color-text-muted)">
          Toggle the <strong>Motion</strong> control in the toolbar and watch every value change.
        </Text>
      </Stack>
    )
  },
}

export const FadeInStory: Story = {
  name: 'FadeIn — fade-rise',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        fade-rise
      </Text>
      <Text token="body-lg" className="measure mb-6 text-(--color-text-secondary)">
        The workhorse. Opacity 0→1, translateY 24px→0, 420ms, <code>ease-stage</code>. The distance is deliberately
        small — long travel reads as cheap.
      </Text>
      <ScrollPrompt />
      <Spacer />
      <Stack gap="6">
        <FadeIn>
          <Block>First</Block>
        </FadeIn>
        <Spacer />
        <FadeIn delay={100}>
          <Block>Second — 100ms delay</Block>
        </FadeIn>
        <Spacer />
        <FadeIn distance={8}>
          <Block>Third — 8px travel</Block>
        </FadeIn>
      </Stack>
      <Spacer />
    </div>
  ),
}

export const RevealStory: Story = {
  name: 'Reveal — curtain-up',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        curtain-up
      </Text>
      <Text token="body-lg" className="measure mb-6 text-(--color-text-secondary)">
        Text masked by its own line box, revealed bottom-to-top. 640ms, <code>ease-curtain</code>. The mask uses{' '}
        <code>overflow: clip</code> so it never creates a scroll container, and only the inner element moves — keeping
        the animation to <code>transform</code> alone.
      </Text>
      <div className="mb-6 rounded-(--radius-md) border-2 border-warn p-4">
        <Text token="body-md" className="measure">
          ⚠️ <strong>H1 and major section headings only. Maximum two per page.</strong> This is the most
          expensive-looking pattern in the system and it loses its effect entirely when repeated.
        </Text>
      </div>
      <ScrollPrompt />
      <Spacer />
      <Text token="display-lg" as="h3" width="expanded">
        <Reveal>In 90 days,</Reveal>
        <Reveal delay={80}>your child</Reveal>
        <Reveal delay={160}>takes a stage.</Reveal>
      </Text>
      <Spacer />
    </div>
  ),
}

export const StaggerStory: Story = {
  name: 'Stagger',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Stagger
      </Text>
      <Text token="body-lg" className="measure mb-6 text-(--color-text-secondary)">
        One ScrollTrigger manages the whole group — batching beats twelve individual triggers.
      </Text>
      <div className="mb-6 rounded-(--radius-md) border border-(--color-border-default) p-4">
        <Text token="body-md" className="measure">
          Total stagger is capped at <strong>600ms</strong> and tightens automatically beyond 8 items. A 12-card grid
          at 80ms would take 960ms to finish, so the last card would arrive after the user had already scrolled past
          it. The 12-card group below has had its interval reduced for exactly that reason.
        </Text>
      </div>
      <ScrollPrompt />
      <Spacer />

      <Text token="heading-md" as="h3" className="mb-3">
        6 items — 80ms interval
      </Text>
      <Stagger>
        <Grid cols={2} colsMd={3} gap="base">
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i} elevation={1}>
              <CardBody>
                <Text token="heading-md" as="p">
                  {i + 1}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Stagger>

      <Spacer />

      <Text token="heading-md" as="h3" className="mb-3">
        12 items — interval auto-reduced
      </Text>
      <Stagger>
        <Grid cols={3} colsMd={4} gap="base">
          {Array.from({ length: 12 }, (_, i) => (
            <Card key={i} elevation={1}>
              <CardBody>
                <Text token="heading-md" as="p">
                  {i + 1}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Stagger>
      <Spacer />
    </div>
  ),
}

export const ParallaxStory: Story = {
  name: 'Parallax',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Parallax
      </Text>
      <Text token="body-lg" className="measure mb-6 text-(--color-text-secondary)">
        Permitted, tightly bounded. <strong>Maximum 12% differential</strong> — values above the cap are clamped, not
        honoured. Background imagery and single decorative layers only.
      </Text>
      <div className="mb-6 rounded-(--radius-md) border-2 border-error p-4">
        <Text token="body-md" className="measure">
          ❌ <strong>Never on text.</strong> Parallaxed type is unreadable while moving and is a known accessibility
          problem. Passing text as children logs a development warning — check the browser console on this story.
          Parallax is also disabled entirely below <code>md</code> and under reduced motion, and the wrapper is{' '}
          <code>aria-hidden</code> because a decorative layer has nothing to announce.
        </Text>
      </div>
      <ScrollPrompt />
      <Spacer />
      <div className="relative h-96 overflow-clip rounded-(--radius-xl) border border-(--color-border-default)">
        <Parallax speed={0.12} className="absolute inset-0">
          <div className="h-[130%] bg-gradient-to-b from-stage-800 via-stage-900 to-stage-950" />
        </Parallax>
        <div className="relative flex h-full items-center justify-center">
          <Text token="heading-lg" as="p" className="text-n-0">
            Type sits on a static layer above
          </Text>
        </div>
      </div>
      <Spacer />
    </div>
  ),
}

export const ProhibitedList: Story = {
  name: 'What is never animated',
  render: () => (
    <Stack gap="6">
      <Text token="display-md" as="h2">
        Hard prohibitions
      </Text>
      <Text token="body-lg" className="measure text-(--color-text-secondary)">
        From <code>05-motion-system.md</code> §16. These are not stylistic preferences, and they are held as data in{' '}
        <code>motionConfig</code> so components can assert them.
      </Text>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-(--radius-lg) border-2 border-warn p-5">
          <Text token="heading-md" as="h3" className="mb-3">
            Never animated
          </Text>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {[
              'Prices at the point of decision — a number the user is about to pay must be static and instantly readable',
              'The deposit amount, refund terms, or any policy text',
              'Camp dates, times, ages and capacity limits in the booking context',
              'The Stage-Ready Guarantee — it is the primary risk-reversal and must be legible instantly',
              'Contact details — a parent may be reading these while driving to the studio',
              'Error messages and validation feedback',
              'Focus indicators and skip links',
              'Anything that would move a target between intent and click',
            ].map((item) => (
              <li key={item}>
                <Text token="body-sm" className="measure">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-(--radius-lg) border-2 border-error p-5">
          <Text token="heading-md" as="h3" className="mb-3">
            Never done at all
          </Text>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {[
              'Auto-advancing carousels',
              'Scroll-jacking, forced snapping, wheel hijacking',
              'Cursor-following elements or custom cursors',
              'Preloader animations — if the site needs a preloader, the site is too heavy',
              'Text scrambles or typewriter effects on headings',
              'Background video autoplay on mobile',
              'Animated photographs of students — the imagery is documentary evidence, and treating it as motion graphics undermines its credibility',
              'Confetti, sparkles, musical-note particles',
            ].map((item) => (
              <li key={item}>
                <Text token="body-sm" className="measure">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stack>
  ),
}
