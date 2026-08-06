import type { Metadata, Viewport } from 'next'

import { siteConfig } from '@/config/site'
import { buildRootMetadata } from '@/lib/seo/metadata'
import { AppProviders } from '@/providers/AppProviders'
import { fontVariables } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = buildRootMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /**
   * `maximumScale` and `userScalable: false` are deliberately omitted —
   * blocking zoom is a WCAG failure and this audience includes Unique Abilities
   * scholarship families.
   */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F7' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1220' },
  ],
  colorScheme: 'light',
}

/**
 * Root layout.
 *
 * Stays a Server Component: only `AppProviders` crosses into the client, so
 * page content is server-rendered and the LCP element never waits on
 * JavaScript.
 *
 * `data-motion="full"` is the pre-hydration default. MotionProvider corrects it
 * on mount from the OS preference and the stored override — and because the
 * reduced-motion CSS is also driven by the `prefers-reduced-motion` media
 * query, a user who prefers reduced motion is respected even before hydration.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale.default} className={`${fontVariables} h-full`} data-motion="full">
      <body className="flex min-h-full flex-col bg-(--color-surface-page) text-(--color-text-primary) antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
