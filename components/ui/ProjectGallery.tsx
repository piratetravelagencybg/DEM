'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

const OPEN_EVENT = 'project-gallery:open'

/** Opens the project gallery from anywhere on the page (hero, main photo). */
export function openProjectGallery(index = 0) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: index }))
}

/** Button that opens the full-screen gallery at the given photo. */
export function ProjectGalleryTrigger({
  index = 0,
  className,
  ariaLabel,
  children,
}: {
  index?: number
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  return (
    <button type="button" onClick={() => openProjectGallery(index)} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

type ProjectGalleryProps = {
  images: string[]
  alts: string[]
  title: string
}

/** Uncropped photo grid of a project with a full-screen viewer (arrows, keys, swipe, thumbnails). */
export default function ProjectGallery({ images, alts, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const isOpen = openIndex !== null
  const count = images.length

  const show = useCallback((index: number) => setOpenIndex(((index % count) + count) % count), [count])
  const next = useCallback(() => setOpenIndex((current) => current === null ? null : (current + 1) % count), [count])
  const previous = useCallback(() => setOpenIndex((current) => current === null ? null : (current - 1 + count) % count), [count])

  useEffect(() => {
    const onOpen = (event: Event) => show(Number((event as CustomEvent<number>).detail) || 0)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [show])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, next, previous])

  useEffect(() => {
    if (openIndex === null) return
    thumbsRef.current?.children[openIndex]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [openIndex])

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => show(index)}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-card bg-cream shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-walnut"
            aria-label={`Отвори снимка ${index + 1} от ${count}`}
          >
            <Image
              src={src}
              alt={alts[index]}
              width={1024}
              height={1365}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <span className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-body text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
              <Expand size={13} aria-hidden="true" /> Разгледай
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Снимки: ${title}`}
          onClick={() => setOpenIndex(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6" onClick={(event) => event.stopPropagation()}>
            <p className="font-body text-sm">
              <span className="font-semibold">{openIndex + 1}</span>
              <span className="text-white/60"> / {count} · {title}</span>
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
              aria-label="Затвори"
            >
              <X size={22} />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return
              const delta = event.changedTouches[0].clientX - touchStartX.current
              touchStartX.current = null
              if (Math.abs(delta) > 50) (delta < 0 ? next : previous)()
            }}
          >
            <Image
              key={images[openIndex]}
              src={images[openIndex]}
              alt={alts[openIndex]}
              fill
              className="object-contain px-2 sm:px-20"
              sizes="100vw"
              onClick={(event) => event.stopPropagation()}
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); previous() }}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:left-5"
                  aria-label="Предишна снимка"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); next() }}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:right-5"
                  aria-label="Следваща снимка"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div
              ref={thumbsRef}
              className="flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => show(index)}
                  className={`relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-lg transition-all ${index === openIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-90'}`}
                  aria-label={`Покажи снимка ${index + 1}`}
                  aria-current={index === openIndex}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="320px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
