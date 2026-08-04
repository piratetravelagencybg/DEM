'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

const DEFAULT_FALLBACK = '/images/product-placeholder.svg'

type SafeProductImageProps = Omit<ImageProps, 'src' | 'onError'> & {
  src?: string | null
  fallbackSrc?: string
}

export default function SafeProductImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: SafeProductImageProps) {
  const requestedSource = src || fallbackSrc
  const [activeSource, setActiveSource] = useState(requestedSource)

  useEffect(() => {
    setActiveSource(requestedSource)
  }, [requestedSource])

  return (
    <Image
      {...props}
      key={activeSource}
      src={activeSource}
      alt={alt}
      onError={() => {
        if (activeSource !== fallbackSrc) setActiveSource(fallbackSrc)
      }}
    />
  )
}
