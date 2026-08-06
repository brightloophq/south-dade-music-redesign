import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Text } from '@/components/ui/Typography'
import { hero } from '@/content/home'
import { cn } from '@/lib/utils/cn'

import { HeroCounter } from './HeroCounter'

/**
 * §1 — The Bill.
 *
 * Concept A, chosen in docs/homepage/01-homepage-blueprint.md §2.
 * Full specification: docs/homepage/02-section-specifications.md §1.
 *
 * ## Hero state 1 — launch
 *
 * Gate I-1 is open: all 18 genuine photographs depict identifiable minors and
 * none has a photo release on file, so **this page carries no photography**.
 * The right two-thirds is the generated stage-light ground at full presence.
 *
 * This is a shippable permanent state, not a placeholder. When I-1 closes, the
 * photograph enters the same layout and the texture recedes behind the type —
 * no redesign (blueprint §2, "the two-state hero").
 *
 * ## LCP
 *
 * The H1 and the ground are present at first paint. Nothing is hidden waiting
 * for script: GSAP only hides the lines *after* confirming it can run, so a
 * script failure leaves a fully readable hero.
 */
export function Hero() {
  return (
    <section data-film="hero" data-register="house" aria-labelledby="hero-heading" className="relative isolate">
      {/* ---------------------------------------------------------------
        The ground.

        A CSS gradient base is always present, so the hero is never blank if
        the generated texture is withdrawn at review. The texture layers on
        top as an enhancement.
      --------------------------------------------------------------- */}
      <div data-hero-plate aria-hidden="true" className="absolute inset-0 -z-10 bg-stage-950">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_calc(var(--light-x)*1%)_calc(var(--light-y)*1%),rgba(245,165,36,0.28),transparent_62%)]" />

        {/*
          Two grounds, art-directed. Next's Image has no `<picture>` support, so
          both elements are in the DOM and the browser would normally fetch both.
          The `sizes` hints below collapse the *unused* one to the smallest
          candidate in its srcSet, so the wasted fetch is a thumbnail rather than
          a full-width image.

          `loading="eager"` without `priority`: the hero ground is decorative and
          must not be lazy, but preloading BOTH variants would put two competing
          image preloads in the head and slow the real LCP element — which is the
          H1, a text node present at first paint.
        */}

        {/* Desktop / tablet ground — 16:9, clear zone on the left third. */}
        <Image
          src="/images/generated/homepage-hero-stage-light.jpg"
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden object-cover object-right will-change-transform md:block motion-safe:animate-[lens-breathe_26s_ease-in-out_infinite]"
        />

        {/*
          Mobile ground — generated separately at 3:4 with a clear upper zone.
          Never a centre-crop of the 16:9: that composition puts its uncluttered
          area on the left third, which a centre-crop destroys
          (05-image-placement.md §8).
        */}
        <Image
          src="/images/generated/homepage-hero-stage-light-mobile.jpg"
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 768px) 1px, 100vw"
          className="object-cover object-bottom will-change-transform md:hidden motion-safe:animate-[lens-breathe_26s_ease-in-out_infinite]"
        />

        {/* Legibility scrim. Contrast for the H1 is a property of this, not of
            whatever pixel the texture happens to put behind a glyph. */}
        <div className="absolute inset-0 bg-gradient-to-r from-stage-950 via-stage-950/85 to-stage-950/35 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stage-950 via-transparent to-stage-950/60" />

        {/*
          The melt. A gradient bleed at the base so the hero dissolves into the
          section beneath rather than ending at a line. No section on this page
          has a hard bottom edge.
        */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-stage-950" />

        {/* The light sweep travels here, over the ground, never under the type. */}
        <div
          data-hero-sweep
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-0 bg-[linear-gradient(100deg,transparent,rgba(255,193,92,0.22),transparent)]"
        />
      </div>

      <Container width="wide" className="flex min-h-[88svh] flex-col justify-end pt-32 pb-10 md:min-h-[86svh] lg:pt-40">
        <div data-hero-copy className="max-w-[62ch] lg:max-w-none lg:w-7/12">
          <Text token="label" as="p" className="text-spot-400">
            {hero.eyebrow}
          </Text>

          {/*
            The H1 is present at paint and never opacity:0 in CSS.
            Each line is masked by its own line box for the curtain-up reveal.
          */}
          <h1
            id="hero-heading"
            className="mt-5 font-display text-display-xl font-bold text-n-0 md:font-expanded"
          >
            {hero.headingLines.map((line) => (
              <span key={line} className="block overflow-clip">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <hr aria-hidden="true" className="mt-7 h-px w-full max-w-md border-0 bg-stage-700" />

          <p data-hero-supporting className="mt-5 font-body text-body-lg text-n-300">
            {hero.supporting}
          </p>

          <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={hero.primaryCta.href} variant="cta" size="lg" price={hero.primaryCta.price}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="on-dark-secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div
          data-hero-affordance
          aria-hidden="true"
          className={cn(
            'mt-14 hidden items-center gap-3 font-body text-body-sm text-n-400 lg:flex',
            'motion-safe:animate-[hero-drift_2s_ease-in-out_infinite]',
          )}
        >
          <span className="inline-block h-8 w-px bg-n-400/50" />
          Scroll
        </div>
      </Container>

      {/* -----------------------------------------------------------------
        The fact bar — the Desk, welded to the hero's base.

        The parent meets both rooms in the first screen and learns the
        language immediately: dark is the promise, light is what you can act
        on (blueprint §2).
      ----------------------------------------------------------------- */}
      <div data-register="desk" className="border-t border-(--color-border-default) bg-(--color-surface-page)">
        <Container width="wide" className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8">
          {hero.facts.map((fact) => (
            <div key={fact.unit} className="flex flex-col">
              <HeroCounter value={fact.value} countFrom={fact.countFrom} />
              <span className="mt-1 font-body text-label font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                {fact.unit}
              </span>
            </div>
          ))}

          {/* The guarantee is static forever — never animated, never a counter. */}
          <div className="col-span-2 flex flex-col md:col-span-1">
            <span className="font-display text-heading-md font-semibold text-(--color-text-primary)">
              {hero.guarantee.title}
            </span>
            <span className="mt-1 font-body text-body-sm text-(--color-text-secondary)">
              {hero.guarantee.precis}
            </span>
          </div>
        </Container>
      </div>
    </section>
  )
}
