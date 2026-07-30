'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { ZoomIn, X } from 'lucide-react'

const FALLBACK_IMAGE = '/images/hero/hero.webp'

type ProductGalleryProps = {
  productName: string
  primaryImage: string
  images: string[]
}

export default function ProductGallery({ productName, primaryImage, images }: ProductGalleryProps) {
  const galleryImages = useMemo(
    () => Array.from(new Set([primaryImage, ...images].filter(Boolean))),
    [primaryImage, images],
  )
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] || FALLBACK_IMAGE)
  const [failedImages, setFailedImages] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const visibleImages = galleryImages.filter((image) => !failedImages.includes(image))
  const activeImage = visibleImages.includes(selectedImage)
    ? selectedImage
    : visibleImages[0] || FALLBACK_IMAGE

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  function markImageAsFailed(image: string) {
    if (image === FALLBACK_IMAGE) return
    setFailedImages((current) => current.includes(image) ? current : [...current, image])
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl text-left"
        style={{ aspectRatio: '1', background: '#F5F0E8', boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}
        aria-label={`Отвори голяма снимка на ${productName}`}
      >
        <Image
          key={activeImage}
          src={activeImage}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          priority
          quality={85}
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => markImageAsFailed(activeImage)}
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-2 font-body text-xs font-semibold text-white backdrop-blur-md">
          <ZoomIn size={14} /> Увеличи
        </span>
      </button>

      {visibleImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Снимки на продукта">
          {visibleImages.map((image, index) => {
            const isActive = image === activeImage
            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-200"
                style={{
                  width: 74,
                  height: 74,
                  background: '#F5F0E8',
                  border: isActive ? '2px solid #8B6F47' : '1px solid #D9CEC0',
                  boxShadow: isActive ? '0 4px 14px rgba(139,111,71,0.28)' : 'none',
                  opacity: isActive ? 1 : 0.78,
                }}
                aria-label={`Покажи снимка ${index + 1} от ${visibleImages.length}`}
                aria-pressed={isActive}
                role="listitem"
              >
                <Image
                  src={image}
                  alt={`${productName} — снимка ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="74px"
                  onError={() => markImageAsFailed(image)}
                />
              </button>
            )
          })}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Голяма снимка на ${productName}`}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            aria-label="Затвори снимката"
          >
            <X size={22} />
          </button>
          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              className="object-contain"
              quality={90}
              sizes="95vw"
              onError={() => markImageAsFailed(activeImage)}
            />
          </div>
        </div>
      )}
    </>
  )
}
