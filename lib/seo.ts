import type { Metadata } from 'next'

const SITE_URL = 'https://domexpertmebel.com'
const DEFAULT_IMAGE = '/images/og/home.webp'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  index?: boolean
  keywords?: string[]
}

type SocialImageObject = {
  url: string | URL
  secureUrl?: string | URL
  alt?: string
  type?: string
  width?: number | string
  height?: number | string
}

type SocialImage = string | URL | SocialImageObject

function getImageMimeType(value: string | URL) {
  const source = value.toString().split('?')[0].toLowerCase()
  if (source.endsWith('.webp')) return 'image/webp'
  if (source.endsWith('.png')) return 'image/png'
  if (source.endsWith('.jpg') || source.endsWith('.jpeg')) return 'image/jpeg'
  return undefined
}

function isKnownSocialCrop(value: string | URL) {
  try {
    const pathname = new URL(value.toString(), SITE_URL).pathname
    return pathname.startsWith('/images/og/')
  } catch {
    return false
  }
}

function buildSocialImage(
  url: string | URL,
  alt?: string,
  source: Partial<SocialImageObject> = {},
): SocialImageObject {
  const knownCrop = isKnownSocialCrop(url)
  return {
    url,
    ...(source.secureUrl ? { secureUrl: source.secureUrl } : {}),
    ...(alt ? { alt } : {}),
    ...(source.type || getImageMimeType(url)
      ? { type: source.type || getImageMimeType(url) }
      : {}),
    ...(source.width !== undefined
      ? { width: source.width }
      : knownCrop ? { width: 1200 } : {}),
    ...(source.height !== undefined
      ? { height: source.height }
      : knownCrop ? { height: 630 } : {}),
  }
}

export function shortenSeoTitle(value: string, maxLength = 55) {
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
      images: [buildSocialImage(image, imageAlt)],
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDescription,
      images: [image],
    },
  }
}

export function completePageMetadata(metadata: Metadata): Metadata {
  const openGraph = metadata.openGraph
  if (!openGraph) return metadata

  const social = openGraph as unknown as Record<string, unknown>
  const rawImages = Array.isArray(social.images) ? social.images : []
  const cleanImages = rawImages.flatMap<SocialImage>((image) => {
    if (typeof image === 'string' || image instanceof URL) return [image]
    if (!image || typeof image !== 'object' || !('url' in image)) return []
    const candidate = image as Record<string, unknown>
    if (typeof candidate.url !== 'string' && !(candidate.url instanceof URL)) return []
    return [buildSocialImage(
      candidate.url,
      typeof candidate.alt === 'string' ? candidate.alt : undefined,
      {
        ...(typeof candidate.secureUrl === 'string' || candidate.secureUrl instanceof URL
          ? { secureUrl: candidate.secureUrl }
          : {}),
        ...(typeof candidate.type === 'string' ? { type: candidate.type } : {}),
        ...(typeof candidate.width === 'number' || typeof candidate.width === 'string'
          ? { width: candidate.width }
          : {}),
        ...(typeof candidate.height === 'number' || typeof candidate.height === 'string'
          ? { height: candidate.height }
          : {}),
      },
    )]
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
