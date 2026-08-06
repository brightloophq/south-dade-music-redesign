import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { neutral, spot, stage, velvet, functional, bannedCombinations } from '@/tokens/colors'
import { fontSize, type FontSizeToken } from '@/tokens/typography'
import { spacing, radius, sectionPadding, breakpoints, container } from '@/tokens/layout'
import { shadow, zIndex, opacity } from '@/tokens/elevation'
import { duration, easing, stagger } from '@/tokens/motion'
import { Text } from '@/components/ui/Typography'

const meta: Meta = {
  title: 'Foundations/Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'The token layer, rendered from the same TypeScript exports the app consumes. Canonical spec: `docs/redesign/04-design-system.md`.',
      },
    },
  },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Contrast — computed live, not copied from the spec table
// ---------------------------------------------------------------------------

function relativeLuminance(hex: string): number {
  const channels = hex
    .replace('#', '')
    .match(/../g)!
    .map((pair) => {
      const value = parseInt(pair, 16) / 255
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    })

  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!
}

function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground)
  const b = relativeLuminance(background)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

function Grade({ ratio, large = false }: { ratio: number; large?: boolean }) {
  const aa = large ? 3 : 4.5
  const aaa = large ? 4.5 : 7
  const label = ratio >= aaa ? 'AAA' : ratio >= aa ? 'AA' : 'FAIL'
  const tone = label === 'FAIL' ? 'text-error' : label === 'AAA' ? 'text-success' : 'text-info'

  return (
    <span className={`font-body text-body-sm font-semibold tabular-nums ${tone}`}>
      {ratio.toFixed(2)}:1 · {label}
    </span>
  )
}

function Swatch({ name, value, on = neutral[50] }: { name: string; value: string; on?: string }) {
  return (
    <div className="flex items-center gap-4 rounded-(--radius-md) border border-(--color-border-default) p-3">
      <span
        className="size-12 shrink-0 rounded-(--radius-sm) border border-(--color-border-default)"
        style={{ backgroundColor: value }}
      />
      <span className="flex flex-col">
        <span className="font-body text-body-sm font-semibold">{name}</span>
        <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{value.toUpperCase()}</span>
        <Grade ratio={contrastRatio(value, on)} />
      </span>
    </div>
  )
}

function Family({ title, note, colors, on }: { title: string; note: string; colors: Record<string, string>; on: string }) {
  return (
    <section className="mb-10">
      <Text token="heading-md" as="h3" className="mb-1">
        {title}
      </Text>
      <Text token="body-sm" className="mb-4 text-(--color-text-muted)">
        {note} · ratios measured against <code>{on.toUpperCase()}</code>
      </Text>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(colors).map(([key, value]) => (
          <Swatch key={key} name={`${title.split(' ')[0]!.toLowerCase()}-${key}`} value={value} on={on} />
        ))}
      </div>
    </section>
  )
}

export const Colour: Story = {
  name: 'Colour',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Colour
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Three families — Stage (the darkened house), Spotlight (the light), Velvet (the curtain) — plus a warm
        neutral ramp and a functional set. Every ratio below is computed at render time from the token values, not
        copied from the specification table.
      </Text>

      <Family title="Stage — the house" note="Blue-black, never a true black" colors={stage} on={neutral[0]} />
      <Family title="Spotlight — the light" note="Fill and highlight" colors={spot} on={stage[900]} />
      <Family title="Velvet — the curtain" note="Secondary accent" colors={velvet} on={neutral[0]} />
      <Family
        title="Neutral ramp"
        note="Warm-tinted; cool greys fight the amber"
        colors={neutral as unknown as Record<string, string>}
        on={neutral[50]}
      />
      <Family title="Functional" note="Status and validation" colors={functional} on={neutral[50]} />

      <section className="rounded-(--radius-md) border-2 border-error p-5">
        <Text token="heading-md" as="h3" className="mb-2 text-error">
          Banned combinations
        </Text>
        <Text token="body-md" className="measure mb-4">
          Hard rule from <code>04-design-system.md §1</code>: Spotlight is never body text on a light background. It
          is a fill, a highlight, or text on dark. These are shown so the failure is visible rather than theoretical.
        </Text>
        <div className="flex flex-col gap-3">
          {bannedCombinations.map((combo) => (
            <div key={`${combo.fg}-${combo.bg}`} className="flex flex-wrap items-center gap-4">
              <span
                className="rounded-(--radius-sm) border border-(--color-border-default) px-4 py-2 font-body text-body-md"
                style={{ color: combo.fg, backgroundColor: combo.bg }}
              >
                Unreadable sample text
              </span>
              <Grade ratio={contrastRatio(combo.fg, combo.bg)} />
              <span className="font-body text-body-sm text-(--color-text-muted)">{combo.reason}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Typography scale
// ---------------------------------------------------------------------------

export const TypographyScale: Story = {
  name: 'Typography Scale',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Typography scale
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Eleven fluid steps, each a <code>clamp()</code> computed across a 375→1440px viewport.{' '}
        <strong>Resize the preview pane</strong> to watch them interpolate. Body never goes below 16px on any device.
      </Text>

      <div className="flex flex-col gap-8">
        {(Object.keys(fontSize) as FontSizeToken[]).map((token) => {
          const spec = fontSize[token]

          return (
            <div key={token} className="border-b border-(--color-border-default) pb-6">
              <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <code className="font-body text-body-sm font-semibold">{token}</code>
                <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">
                  {spec.min}px → {spec.max}px · {spec.family} · {spec.weight}
                </span>
                <span className="font-body text-body-sm text-(--color-text-muted)">{spec.use}</span>
              </div>
              <p
                className={token === 'label' ? 'uppercase' : undefined}
                style={{
                  fontSize: spec.clamp,
                  fontFamily: spec.family === 'display' ? 'var(--font-display)' : 'var(--font-body)',
                  fontWeight: spec.weight,
                  letterSpacing: spec.tracking,
                  lineHeight: spec.leading,
                  fontVariantNumeric: token === 'stat' ? 'tabular-nums' : undefined,
                }}
              >
                {token === 'stat' ? '90 · 12 · $450' : 'In 90 days, your child takes a stage'}
              </p>
              <code className="mt-2 block font-body text-body-sm text-(--color-text-muted)">{spec.clamp}</code>
            </div>
          )
        })}
      </div>
    </div>
  ),
}

export const WidthAxis: Story = {
  name: 'Typography — width axis',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        The Archivo width axis
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        The brand&rsquo;s typographic signature — expanded for poster statements, condensed for dated ledger lines.
        It costs nothing extra: Archivo is already a variable font in the system.
      </Text>

      <div className="flex flex-col gap-6">
        {(
          [
            ['expanded', '112%', 'Poster statements — display-md and above only'],
            ['wide', '106%', 'Section heads in the House register'],
            ['normal', '100%', 'Default'],
            ['condensed', '87.5%', 'Dated ledger lines — the "bill line" treatment'],
          ] as const
        ).map(([name, value, use]) => (
          <div key={name} className="border-b border-(--color-border-default) pb-4">
            <div className="mb-1 flex flex-wrap items-baseline gap-4">
              <code className="font-body text-body-sm font-semibold">font-{name}</code>
              <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}</span>
              <span className="font-body text-body-sm text-(--color-text-muted)">{use}</span>
            </div>
            <p className="font-display text-display-md font-bold" style={{ fontStretch: value }}>
              Ready for the stage
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-(--radius-md) border border-warn p-5">
        <Text token="heading-sm" as="h3" className="mb-2">
          ⚠️ Spanish stress test
        </Text>
        <Text token="body-md" className="measure mb-4">
          <em>&ldquo;Listos para el escenario&rdquo;</em> is 27 characters against 21 — roughly the +35% expansion every
          heading component must tolerate. At expanded width and <code>display-xl</code> this is the worst case in the
          whole project.
        </Text>
        <p className="font-display text-display-lg font-bold font-expanded" lang="es">
          Listos para el escenario
        </p>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Spacing scale
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        4px base unit. An 8px rhythm for layout, 4px for component internals. Generous vertical space is what
        separates a premium feel from a template — the current site&rsquo;s builder output has near-uniform padding,
        which is why every section reads with the same importance.
      </Text>

      <div className="mb-10 flex flex-col gap-2">
        {Object.entries(spacing).map(([token, value]) => (
          <div key={token} className="flex items-center gap-4">
            <code className="w-24 shrink-0 font-body text-body-sm font-semibold">space-{token}</code>
            <span className="w-16 shrink-0 font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}</span>
            <span className="h-6 rounded-(--radius-sm) bg-spot-500" style={{ width: value }} />
          </div>
        ))}
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Section rhythm
      </Text>
      <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
        Four densities, each responsive. Feature is reserved for hero, showcase and the 90-day timeline.
      </Text>
      <div className="mb-10 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Section padding by density and breakpoint</caption>
          <thead>
            <tr className="border-b border-(--color-border-default)">
              {['Density', 'Mobile', 'Tablet', 'Desktop'].map((h) => (
                <th key={h} scope="col" className="py-2 pr-6 font-body text-label font-semibold uppercase tracking-[0.08em]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(sectionPadding).map(([name, values]) => (
              <tr key={name} className="border-b border-(--color-border-default)">
                <td className="py-2 pr-6 font-body text-body-md font-semibold">{name}</td>
                <td className="py-2 pr-6 font-body text-body-md tabular-nums">{values.mobile}</td>
                <td className="py-2 pr-6 font-body text-body-md tabular-nums">{values.tablet}</td>
                <td className="py-2 pr-6 font-body text-body-md tabular-nums">{values.desktop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Radius
      </Text>
      <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
        Moderate and consistent. Heavy rounding reads as a children&rsquo;s product and breaks the teen constraint;
        zero radius reads corporate.
      </Text>
      <div className="flex flex-wrap gap-4">
        {Object.entries(radius).map(([token, value]) => (
          <div key={token} className="flex flex-col items-center gap-2">
            <span
              className="size-20 border-2 border-spot-500 bg-spot-500/15"
              style={{ borderRadius: value }}
            />
            <code className="font-body text-body-sm font-semibold">{token}</code>
            <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Elevation, z-index, opacity, motion tokens
// ---------------------------------------------------------------------------

export const ElevationAndDepth: Story = {
  name: 'Elevation & Depth',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Elevation
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Dark-first surfaces mean shadows work differently. Elevation is expressed through{' '}
        <strong>surface value first, shadow second</strong> — switch the Register toolbar control to House and the
        shadows fall away, replaced by tone. Shadows are always warm-tinted, never pure black on light.
      </Text>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(['none', 1, 2, 3, 4, 'spotlight'] as const).map((level) => (
          <div
            key={String(level)}
            className="rounded-(--radius-lg) bg-(--color-surface-raised) p-5"
            style={{ boxShadow: shadow[level as keyof typeof shadow] }}
          >
            <code className="font-body text-body-sm font-semibold">
              {level === 'spotlight' ? 'spotlight glow' : `elev-${level}`}
            </code>
            {level === 'spotlight' ? (
              <p className="mt-2 font-body text-body-sm text-(--color-text-muted)">
                The visual signature of the brand. Reserved for the primary CTA and the active showcase image — it
                loses meaning if applied broadly.
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Z-index
      </Text>
      <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
        Eleven named layers. The skip link sits at 900, above the header (200) and the drawer (300) — a skip link
        occluded by a sticky header is a skip link that does not exist.
      </Text>
      <div className="mb-10 flex flex-col gap-1">
        {Object.entries(zIndex)
          .sort((a, b) => a[1] - b[1])
          .map(([name, value]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-32 font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}</span>
              <code className="font-body text-body-sm font-semibold">{name}</code>
            </div>
          ))}
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Opacity
      </Text>
      <Text token="body-md" className="measure mb-4 text-(--color-text-secondary)">
        Named by intent so usage stays consistent.
      </Text>
      <div className="flex flex-wrap gap-4">
        {Object.entries(opacity).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <span className="size-16 rounded-(--radius-sm) bg-stage-900" style={{ opacity: value }} />
            <code className="font-body text-body-sm font-semibold">{name}</code>
            <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const MotionTokens: Story = {
  name: 'Motion Tokens',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Motion tokens
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Duration is chosen by distance travelled and importance, never by taste. Four easing curves; no component
        invents its own. Hover a bar to run it.
      </Text>

      <Text token="heading-md" as="h3" className="mb-3">
        Durations
      </Text>
      <div className="mb-10 flex flex-col gap-3">
        {Object.entries(duration).map(([name, ms]) => (
          <div key={name} className="flex items-center gap-4">
            <code className="w-36 shrink-0 font-body text-body-sm font-semibold">{name}</code>
            <span className="w-16 shrink-0 font-body text-body-sm tabular-nums text-(--color-text-muted)">{ms}ms</span>
            <span className="group h-8 flex-1 overflow-clip rounded-(--radius-sm) bg-(--color-surface-sunken)">
              <span
                className="block h-full w-8 rounded-(--radius-sm) bg-spot-500 transition-transform ease-(--ease-stage) group-hover:translate-x-[calc(100%*8)] motion-reduce:transition-none"
                style={{ transitionDuration: `${ms}ms` }}
              />
            </span>
          </div>
        ))}
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Easing
      </Text>
      <div className="mb-10 flex flex-col gap-3">
        {Object.entries(easing).map(([name, curve]) => (
          <div key={name} className="flex items-center gap-4">
            <code className="w-24 shrink-0 font-body text-body-sm font-semibold">{name}</code>
            <span className="w-64 shrink-0 font-body text-body-sm text-(--color-text-muted)">{curve}</span>
            <span className="group h-8 flex-1 overflow-clip rounded-(--radius-sm) bg-(--color-surface-sunken)">
              <span
                className="block h-full w-8 rounded-(--radius-sm) bg-velvet-600 transition-transform duration-(--duration-slower) group-hover:translate-x-[calc(100%*8)] motion-reduce:transition-none"
                style={{ transitionTimingFunction: curve }}
              />
            </span>
          </div>
        ))}
      </div>

      <Text token="heading-md" as="h3" className="mb-3">
        Stagger
      </Text>
      <Text token="body-md" className="measure text-(--color-text-secondary)">
        Total stagger is capped at <strong>600ms</strong>. Beyond 8 items the interval tightens automatically — a
        12-card grid at 80ms would take 960ms to finish, so the last card would arrive after the user had already
        scrolled past it.
      </Text>
      <div className="mt-4 flex flex-col gap-1">
        {Object.entries(stagger).map(([name, ms]) => (
          <div key={name} className="flex items-center gap-4">
            <code className="w-28 font-body text-body-sm font-semibold">{name}</code>
            <span className="font-body text-body-sm tabular-nums text-(--color-text-muted)">{ms}ms</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const BreakpointsAndContainers: Story = {
  name: 'Breakpoints & Containers',
  render: () => (
    <div>
      <Text token="display-md" as="h2" className="mb-2">
        Breakpoints &amp; containers
      </Text>
      <Text token="body-lg" className="measure mb-8 text-(--color-text-secondary)">
        Content max-width is 1440px. Prose is 68ch — the 60–75 character measure. Full-bleed is permitted for
        photography, hero and showcase galleries only.
      </Text>

      <div className="mb-10 flex flex-col gap-1">
        {Object.entries(breakpoints).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <code className="w-20 font-body text-body-sm font-semibold">{name}</code>
            <span className="w-24 font-body text-body-sm tabular-nums text-(--color-text-muted)">{value}px</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(container).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <code className="w-24 shrink-0 font-body text-body-sm font-semibold">{name}</code>
            <span className="w-24 shrink-0 font-body text-body-sm text-(--color-text-muted)">{value}</span>
            <span className="h-4 rounded-(--radius-sm) bg-velvet-600/40" style={{ width: value, maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  ),
}
