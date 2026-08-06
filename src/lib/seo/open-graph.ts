/**
 * OpenGraph and Twitter card helpers.
 *
 * Image rules: docs/redesign/image-style-guide.md §3. A generated decorative
 * asset must never be used where it would imply documentary content — an OG
 * card is a representation of the page, so an atmospheric texture is acceptable
 * but a fabricated scene is not.
 */

import type { Metadata } from 'next'

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import type { PageSeo } from '@/types/seo'

type OpenGraphMetadata = NonNullable<Metadata['openGraph']>
type TwitterMetadata = NonNullable<Metadata['twitter']>

function resolveImage(seo: Pick<PageSeo, 'image' | 'imageAlt'>) {
  const url = seo.image ?? siteConfig.ogImage
  if (!url) return undefined

  return [
    {
      url,
      width: seoConfig.ogImageWidth,
      height: seoConfig.ogImageHeight,
      ...(seo.imageAlt ? { alt: seo.imageAlt } : {}),
    },
  ]
}

export function buildOpenGraph(seo: PageSeo): OpenGraphMetadata {
  const images = resolveImage(seo)

  return {
    type: seo.ogType ?? seoConfig.defaultOgType,
    url: seo.path,
    siteName: siteConfig.shortName,
    title: seo.title,
    description: seo.description,
    locale: siteConfig.locale.default.replace('-', '_'),
    ...(images ? { images } : {}),
    ...(seo.publishedTime ? { publishedTime: seo.publishedTime } : {}),
    ...(seo.modifiedTime ? { modifiedTime: seo.modifiedTime } : {}),
  }
}

export function buildTwitter(seo: PageSeo): TwitterMetadata {
  const images = resolveImage(seo)

  return {
    card: seoConfig.twitterCard,
    title: seo.title,
    description: seo.description,
    ...(images ? { images: images.map((image) => image.url) } : {}),
  }
}
