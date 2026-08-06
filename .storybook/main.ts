import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/nextjs-vite'

/**
 * Storybook — the component laboratory.
 *
 * Framework: `@storybook/nextjs-vite`. The Vite builder is used rather than
 * webpack because the app itself builds with Turbopack, and Vite reads
 * `postcss.config.mjs` directly so Tailwind v4 works with no extra wiring.
 *
 * Stories live beside the components they document, so a component and its
 * laboratory entry cannot drift apart in a file move.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-docs',
    /**
     * Accessibility is a market requirement on this project, not a checkbox —
     * the academy serves Unique Abilities scholarship students
     * (docs/redesign/04-design-system.md §0 principle 6). Every story is
     * axe-scanned in the a11y panel.
     */
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  staticDirs: ['../public'],

  typescript: {
    // react-docgen reads the JSDoc on each component's props, which is where
    // the design-system rules are written.
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal: async (viteConfig) => {
    /** Mirror the `@/*` → `src/*` alias from tsconfig.json. */
    viteConfig.resolve ??= {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    }

    /**
     * Silence Rollup's `"use client"` directive warnings and the sourcemap
     * resolution notices they trigger. Storybook renders everything on the
     * client, so the directive is correctly stripped — the warnings are noise
     * that buries real ones in CI output.
     */
    viteConfig.build ??= {}
    viteConfig.build.rollupOptions ??= {}
    const previousOnWarn = viteConfig.build.rollupOptions.onwarn
    viteConfig.build.rollupOptions.onwarn = (warning, warn) => {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return
      // The paired notice Rollup emits when it strips that directive.
      if (warning.code === 'SOURCEMAP_ERROR' && warning.message.includes("Can't resolve original location")) return
      if (typeof previousOnWarn === 'function') previousOnWarn(warning, warn)
      else warn(warning)
    }

    return viteConfig
  },
}

export default config
