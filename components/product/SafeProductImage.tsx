'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { getMbxImageAtSize } from '@/lib/mbx-image'

const DEFAULT_FALLBACK = '/images/product-placeholder.svg'

type SafeProductImageProps = Omit<ImageProps, 'src' | 'onError' | 'onLoad'> & {
  src?: string | null
  fallbackSources?: readonly (string | null | undefined)[]
  fallbackSrc?: string
}

export async function isMbxPlaceholder(image: HTMLImageElement, source: string) {
  if (!source.includes('www.mbx.bg')) return false

  // Direct MBX images are cross-origin and cannot be sampled on a canvas.
  // Their missing-image asset is consistently returned as a 256x256 PNG.
  if (image.naturalWidth === 256 && image.naturalHeight === 256) return true

  try {
    const loadedUrl = new URL(image.currentSrc || source, window.location.href)
    if (loadedUrl.origin !== window.location.origin) return false
  } catch {
    return false
  }

  // MBX returns its transparent camera icon with HTTP 200, so onError never
  // fires. Next/Image can resize that 256x256 source, which makes checking
  // naturalWidth alone unreliable. Sampling a tiny same-origin optimizer image
  // identifies the icon by its transparent field and neutral-grey pixels.
  try {
    const canvas = document.createElement('canvas')
    const size = 16
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return false

    context.drawImage(image, 0, 0, size, size)
    const pixels = context.getImageData(0, 0, size, size).data
    let transparent = 0
    let opaque = 0
    let neutralOpaque = 0

    for (let index = 0; index < pixels.length; index += 4) {
      const red = pixels[index]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      const alpha = pixels[index + 3]

      if (alpha < 32) transparent += 1
      if (alpha > 180) {
        opaque += 1
        if (
          Math.max(red, green, blue) - Math.min(red, green, blue) <= 8
          && red >= 175
          && red <= 230
        ) {
          neutralOpaque += 1
        }
      }
    }

    const total = size * size
    const cornersAreTransparent = [0, size - 1, size * (size - 1), total - 1]
      .every((pixelIndex) => pixels[pixelIndex * 4 + 3] < 32)

    return cornersAreTransparent
      && transparent / total > 0.45
      && opaque / total > 0.18
      && neutralOpaque / Math.max(1, opaque) > 0.88
  } catch {
    return false
  }
}

export default function SafeProductImage({
  src,
  fallbackSources = [],
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: SafeProductImageProps) {
  const sources = useMemo(
    () => Array.from(new Set(
      [src, ...fallbackSources, fallbackSrc]
        .filter((source): source is string => Boolean(source))
        .map((source) => getMbxImageAtSize(source, 512)),
    )),
    [src, fallbackSources, fallbackSrc],
  )
  const sourceKey = sources.join('\u0000')
  const [sourceIndex, setSourceIndex] = useState(0)
  const activeSource = sources[sourceIndex] || fallbackSrc

  useEffect(() => {
    setSourceIndex(0)
  }, [sourceKey])

  function showNextSource() {
    setSourceIndex((current) => Math.min(current + 1, sources.length - 1))
  }

  return (
    <Image
      {...props}
      key={`${sourceIndex}:${activeSource}`}
      src={activeSource}
      alt={alt}
      onError={showNextSource}
      onLoad={(event) => {
        void isMbxPlaceholder(event.currentTarget, activeSource).then((isPlaceholder) => {
          if (isPlaceholder) showNextSource()
        })
      }}
    />
  )
}
