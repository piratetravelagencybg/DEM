'use client'

import { Star, ExternalLink } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { getReviews, formatReviewDate, type Review } from '@/lib/reviews'
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/business'

const WRITE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJH4FTnIX3qhQRrsTtIxIayao'

interface GoogleReviewsProps {
  /** Hides the intro sentence under the heading. */
  compact?: boolean
}

function GoogleMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const rounded = Math.round(value)
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rounded} от 5 звезди`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          aria-hidden="true"
          className={star <= rounded ? 'text-amber-500' : 'text-gray-300'}
          fill={star <= rounded ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const textId = useId()
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)

  // Show „Прочети още“ only when the 5-line clamp actually hides text.
  useEffect(() => {
    const element = textRef.current
    if (!element) return
    const measure = () => {
      if (!expanded) setClamped(element.scrollHeight > element.clientHeight + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-white p-6"
      style={{ border: '1px solid #E7DDCF', boxShadow: '0 2px 12px rgba(81,66,60,0.06)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{ background: '#EFE6D8' }}
          aria-hidden="true"
        >
          <span className="font-body text-base font-semibold" style={{ color: '#6B5235' }}>
            {review.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-body font-semibold text-charcoal break-words" style={{ fontSize: '1rem' }}>
            {review.name}
          </p>
          <p className="font-body text-sm text-warm-gray">{formatReviewDate(review.date)}</p>
        </div>
      </div>

      <div className="mt-4">
        <Stars value={review.rating} />
      </div>

      {review.text && (
        <p
          id={textId}
          ref={textRef}
          className={`mt-3 font-body text-charcoal ${expanded ? '' : 'line-clamp-5'}`}
          style={{ fontSize: '1.0625rem', lineHeight: 1.6 }}
        >
          {review.text}
        </p>
      )}

      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={textId}
          aria-label={expanded ? `Скрий отзива на ${review.name}` : `Прочети целия отзив на ${review.name}`}
          className="mt-3 self-start font-body text-sm font-semibold underline underline-offset-2 hover:no-underline"
          style={{ color: '#6B5235' }}
        >
          {expanded ? 'Скрий' : 'Прочети още'}
        </button>
      )}
    </article>
  )
}

export default function GoogleReviews({ compact = false }: GoogleReviewsProps) {
  const data = getReviews()
  if (!data) return null

  const { rating, totalReviews, reviews } = data

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }} aria-labelledby="otzivi-title">
      <div className="container-main">
        <div className="text-center mb-8">
          <span className="eyebrow-pill">Отзиви от клиенти</span>
          <h2
            id="otzivi-title"
            className="font-display font-bold heading-gradient mt-2"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
          >
            Мнения в Google
          </h2>
          {!compact && (
            <p className="font-body text-warm-gray mt-3 max-w-2xl mx-auto">
              Реални отзиви от клиенти, публикувани в Google.
            </p>
          )}
        </div>

        {/* Summary */}
        <div
          className="mx-auto mb-8 flex max-w-5xl flex-col items-center gap-4 rounded-2xl bg-white px-5 py-4 md:flex-row md:justify-between"
          style={{ border: '1px solid #E7DDCF' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <GoogleMark size={22} />
            <span className="font-display font-bold text-charcoal" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
              {rating.toFixed(1)}
            </span>
            <Stars value={rating} size={18} />
            <span className="font-body text-warm-gray" style={{ fontSize: '0.95rem' }}>
              {totalReviews} {totalReviews === 1 ? 'отзив' : 'отзива'} в Google
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Виж всички отзиви в Google (отваря се в нов прозорец)"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-body text-sm font-semibold whitespace-nowrap transition-colors hover:bg-cream"
              style={{ border: '1px solid #B9A88F', color: '#4A3824' }}
            >
              Виж всички в Google
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Остави отзив в Google (отваря се в нов прозорец)"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-body text-sm font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ background: '#6B5235' }}
            >
              Остави отзив
              <Star size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Mobile: swipe with scroll-snap. From md up: grid, 2 then 3 per row. */}
        <ul
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          aria-label="Отзиви от Google — плъзнете хоризонтално за още"
          tabIndex={0}
        >
          {reviews.map((review) => (
            <li key={review.name + review.date} className="w-[85%] flex-shrink-0 snap-start md:w-auto">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
