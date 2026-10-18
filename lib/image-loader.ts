import responsiveImages from '../data/responsive-images.json'

type ResponsiveImage = { width: number; variants: Record<string, string> }

const manifest = responsiveImages as Record<string, ResponsiveImage>

/**
 * next/image loader without a server-side optimizer. Local images use the
 * pre-generated WebP variants from scripts/generate-responsive-images.mjs;
 * the original file serves widths above the largest variant. Remote images
 * (MBX, Unsplash) are returned unchanged, as before.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const entry = manifest[src]
  if (!entry) return src
  const match = Object.keys(entry.variants)
    .map(Number)
    .sort((a, b) => a - b)
    .find((variantWidth) => variantWidth >= width)
  return match ? entry.variants[match] : src
}

/** srcSet for plain <img> elements, e.g. the home hero inside <picture>. */
export function responsiveSrcSet(src: string) {
  const entry = manifest[src]
  if (!entry) return undefined
  return [
    ...Object.entries(entry.variants).map(([width, variant]) => `${variant} ${width}w`),
    `${src} ${entry.width}w`,
  ].join(', ')
}
