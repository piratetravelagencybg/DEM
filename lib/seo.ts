import type { Metadata } from 'next'

const SITE_URL = 'https://domexpertmebel.com'
const DEFAULT_IMAGE = '/images/hero/hero.webp'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  index?: boolean
  keywords?: string[]
}

export function shortenSeoTitle(value: string, maxLength = 60) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  const candidate = normalized.slice(0, maxLength - 1)
  const lastSeparator = Math.max(candidate.lastIndexOf(' | '), candidate.lastIndexOf(' — '))
  if (lastSeparator >= Math.floor(maxLength * 0.55)) return candidate.slice(0, lastSeparator)
  const lastSpace = candidate.lastIndexOf(' ')
  return (lastSpace > maxLength * 0.7 ? candidate.slice(0, lastSpace) : candidate).replace(/[.,;:–—|-]+$/, '') + '…'
}

export function prepareSeoDescription(value: string, supplement = '', minLength = 120, maxLength = 155) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  const combined = normalized.length < minLength && supplement
    ? normalized + ' ' + supplement.replace(/\s+/g, ' ').trim()
    : normalized
  if (combined.length <= maxLength) return combined
  const candidate = combined.slice(0, maxLength - 1)
  const lastSpace = candidate.lastIndexOf(' ')
  return (lastSpace > maxLength * 0.72 ? candidate.slice(0, lastSpace) : candidate).replace(/[.,;:–—-]+$/, '') + '…'
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = 'Dom Expert Мебел',
  index = true,
  keywords,
}: PageMetadataOptions): Metadata {
  const canonical = new URL(path, SITE_URL).toString()
  const safeTitle = shortenSeoTitle(title)
  const safeDescription = prepareSeoDescription(description)

  return {
    title: { absolute: safeTitle },
    description: safeDescription,
    keywords,
    alternates: { canonical },
    robots: { index, follow: true },
    openGraph: {
      type: 'website',
      locale: 'bg_BG',
      siteName: 'Dom Expert Мебел',
      title: safeTitle,
      description: safeDescription,
      url: canonical,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDescription,
      images: [image],
    },
  }
}

type SocialImage = string | URL | { url: string | URL; alt?: string }

export function completePageMetadata(metadata: Metadata): Metadata {
  const openGraph = metadata.openGraph
  if (!openGraph) return metadata

  const social = openGraph as unknown as Record<string, unknown>
  const rawImages = Array.isArray(social.images) ? social.images : []
  const cleanImages = rawImages.flatMap<SocialImage>((image) => {
    if (typeof image === 'string' || image instanceof URL) return [image]
    if (!image || typeof image !== 'object' || !('url' in image)) return []
    const candidate = image as { url?: unknown; alt?: unknown }
    if (typeof candidate.url !== 'string' && !(candidate.url instanceof URL)) return []
    return [{
      url: candidate.url,
      ...(typeof candidate.alt === 'string' ? { alt: candidate.alt } : {}),
    }]
  })
  const twitterImages = cleanImages.map((image) => (
    typeof image === 'object' && !(image instanceof URL) ? image.url : image
  ))

  return {
    ...metadata,
    openGraph: { ...openGraph, images: cleanImages },
    twitter: metadata.twitter || {
      card: 'summary_large_image',
      title: typeof social.title === 'string' ? social.title : undefined,
      description: typeof social.description === 'string' ? social.description : metadata.description || undefined,
      images: twitterImages,
    },
  }
}
