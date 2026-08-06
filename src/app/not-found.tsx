import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Stack } from '@/components/ui/Stack'
import { Text } from '@/components/ui/Typography'
import { SkipLink } from '@/components/layout/SkipLink'
import { MAIN_CONTENT_ID } from '@/config/navigation'

/**
 * 404.
 *
 * Lives at the app root rather than inside `(marketing)` so it also catches
 * unmatched routes outside that group. It renders its own landmarks because it
 * is outside the marketing shell.
 *
 * ⚠️ Phase 2 note: the current site's 404 template loads its hero from an
 * agency staging domain. This page has no external dependency of any kind.
 */
export default function NotFound() {
  return (
    <>
      <SkipLink />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex flex-1 items-center focus:outline-none">
        <Section density="spacious" as="div" className="w-full">
          <Container width="prose">
            <Stack gap="5">
              <Text token="label" as="p" className="text-(--color-text-muted)">
                404
              </Text>
              <Text token="display-md" as="h1" balance>
                We couldn&rsquo;t find that page.
              </Text>
              <Text token="body-lg" className="text-(--color-text-secondary)">
                The link may be out of date, or the page may have moved.
              </Text>
              <div>
                <Button href="/" variant="primary" size="lg">
                  Go to the home page
                </Button>
              </div>
              <Text token="body-sm" className="text-(--color-text-muted)">
                Still stuck?{' '}
                <Link href="/" className="text-(--color-link-default) underline underline-offset-4">
                  Start from the beginning
                </Link>
                .
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
    </>
  )
}
