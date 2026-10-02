'use client'

import { Star, ExternalLink, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { getReviews, formatReviewDate } from '@/lib/reviews'
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/business'

interface GoogleReviewsProps {
  compact?: boolean
}

export default function GoogleReviews({ compact = false }: GoogleReviewsProps) {
  // State hooks must be called before any conditional returns
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const data = getReviews()

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Auto-carousel every 3 seconds
  useEffect(() => {
    if (!data || prefersReducedMotion || isPaused || data.reviews.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.reviews.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [data, isPaused, prefersReducedMotion])

  // Hide component if no data
  if (!data) {
    return null
  }

  const { rating, totalReviews, reviews } = data

  // URLs
  const googleMapsUri = GOOGLE_BUSINESS_PROFILE_URL
  const writeReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJH4FTnIX3qhQRrsTtIxlayao'

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const threshold = 50

    if (distance > threshold) {
      // Swipe left - next
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    } else if (distance < -threshold) {
      // Swipe right - previous
      setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section
      className="section-py relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      {/* Architectural Blueprint Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2351423C' stroke-width='1' fill='none'%3E%3C!-- Roof --%3E%3Cpath d='M200,150 L400,50 L600,150'/%3E%3Cline x1='400' y1='50' x2='400' y2='80'/%3E%3C!-- House outline --%3E%3Crect x='200' y='150' width='400' height='300'/%3E%3C!-- Windows --%3E%3Crect x='250' y='200' width='80' height='100'/%3E%3Cline x1='290' y1='200' x2='290' y2='300'/%3E%3Cline x1='250' y1='250' x2='330' y2='250'/%3E%3Crect x='370' y='200' width='80' height='100'/%3E%3Cline x1='410' y1='200' x2='410' y2='300'/%3E%3Cline x1='370' y1='250' x2='450' y2='250'/%3E%3Crect x='490' y='200' width='80' height='100'/%3E%3Cline x1='530' y1='200' x2='530' y2='300'/%3E%3Cline x1='490' y1='250' x2='570' y2='250'/%3E%3C!-- Door --%3E%3Crect x='360' y='330' width='80' height='120'/%3E%3Ccircle cx='420' cy='390' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      />

      <div className="container-main relative z-10">
        <div className="text-center mb-10">
          <span className="eyebrow-pill">Отзиви от клиенти</span>
          <h2
            className="font-display font-bold heading-gradient mt-2"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
          >
            Мнения в Google
          </h2>
          {!compact && (
            <p className="font-body text-warm-gray mt-3 max-w-2xl mx-auto">
              Реални отзиви от клиенти, публикувани директно в Google Business Profile.
            </p>
          )}
        </div>

        {/* Rating Summary */}
        <div
          className="flex flex-col items-center gap-3 mb-10 p-6 rounded-2xl mx-auto max-w-md"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(231, 221, 207, 0.5)',
            boxShadow: '0 8px 32px rgba(81, 66, 60, 0.08)',
          }}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-charcoal" style={{ fontSize: '2.5rem' }}>
              {rating.toFixed(1)}
            </span>
            <span className="font-body text-warm-gray">от 5</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={star <= Math.round(rating) ? 'text-amber-500' : 'text-gray-300'}
                fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="font-body text-warm-gray text-sm">
            {totalReviews} {totalReviews === 1 ? 'отзив' : 'отзива'}
          </p>
        </div>

        {/* Carousel */}
        {reviews && reviews.length > 0 && (
          <div
            ref={carouselRef}
            className="relative max-w-6xl mx-auto mb-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Container */}
            <div className="relative h-[400px] md:h-[380px] flex items-center justify-center">
              {reviews.map((review, index) => {
                const isActive = index === activeIndex
                const isPrev = index === (activeIndex - 1 + reviews.length) % reviews.length
                const isNext = index === (activeIndex + 1) % reviews.length
                const isVisible = isActive || isPrev || isNext

                // Calculate position
                let position = 'translate-x-0'
                let scale = 'scale-100'
                let opacity = 'opacity-100'
                let zIndex = 'z-10'

                if (!isVisible) {
                  opacity = 'opacity-0'
                  position = 'translate-x-full'
                } else if (isPrev) {
                  position = compact ? '-translate-x-[105%]' : 'md:-translate-x-[105%] -translate-x-full'
                  scale = compact ? 'scale-90' : 'md:scale-90 scale-75'
                  opacity = compact ? 'opacity-50' : 'md:opacity-50 opacity-0'
                  zIndex = 'z-0'
                } else if (isNext) {
                  position = compact ? 'translate-x-[105%]' : 'md:translate-x-[105%] translate-x-full'
                  scale = compact ? 'scale-90' : 'md:scale-90 scale-75'
                  opacity = compact ? 'opacity-50' : 'md:opacity-50 opacity-0'
                  zIndex = 'z-0'
                } else if (isActive) {
                  position = 'translate-x-0'
                  scale = 'scale-100'
                  opacity = 'opacity-100'
                  zIndex = 'z-20'
                }

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${position} ${scale} ${opacity} ${zIndex}`}
                    style={{
                      transitionProperty: prefersReducedMotion ? 'opacity' : 'transform, opacity',
                    }}
                  >
                    <div
                      className={`mx-auto h-full flex flex-col justify-center ${
                        compact ? 'max-w-md' : 'max-w-2xl'
                      }`}
                    >
                      {/* Glassmorphism Card */}
                      <div
                        className={`rounded-3xl ${compact ? 'p-6' : 'p-8 md:p-10'} flex flex-col relative overflow-hidden group`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.65)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          boxShadow: '0 8px 32px rgba(81, 66, 60, 0.12), 0 2px 8px rgba(81, 66, 60, 0.08)',
                        }}
                      >
                        {/* Quote Icon */}
                        <div className="mb-4">
                          <Quote
                            size={compact ? 32 : 40}
                            className="text-walnut/20"
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={compact ? 16 : 18}
                              className={star <= review.rating ? 'text-amber-500' : 'text-gray-300'}
                              fill={star <= review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>

                        {/* Review Text */}
                        {review.text && (
                          <p
                            className={`font-body text-charcoal leading-relaxed flex-1 mb-6 ${
                              compact ? 'text-sm' : 'text-base md:text-lg'
                            }`}
                            style={{ fontStyle: 'italic' }}
                          >
                            &ldquo;{review.text}&rdquo;
                          </p>
                        )}

                        {/* Author & Date */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`${
                              compact ? 'w-10 h-10' : 'w-12 h-12'
                            } rounded-full flex items-center justify-center`}
                            style={{
                              background: 'rgba(139, 96, 68, 0.1)',
                              border: '1px solid rgba(139, 96, 68, 0.2)',
                            }}
                          >
                            <span
                              className={`font-body font-semibold text-walnut ${
                                compact ? 'text-sm' : 'text-base'
                              }`}
                            >
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-body font-semibold text-charcoal truncate ${
                                compact ? 'text-sm' : 'text-base'
                              }`}
                            >
                              {review.name}
                            </p>
                            <p
                              className={`font-body text-warm-gray ${
                                compact ? 'text-xs' : 'text-sm'
                              }`}
                            >
                              {formatReviewDate(review.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Arrows - Desktop Only */}
            {!compact && reviews.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(231, 221, 207, 0.5)',
                    boxShadow: '0 4px 16px rgba(81, 66, 60, 0.1)',
                  }}
                  aria-label="Предишен отзив"
                >
                  <ChevronLeft size={24} className="text-charcoal" />
                </button>
                <button
                  onClick={goToNext}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(231, 221, 207, 0.5)',
                    boxShadow: '0 4px 16px rgba(81, 66, 60, 0.1)',
                  }}
                  aria-label="Следващ отзив"
                >
                  <ChevronRight size={24} className="text-charcoal" />
                </button>
              </>
            )}

            {/* Dots Navigation */}
            {reviews.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all ${
                      index === activeIndex
                        ? 'w-8 h-2 bg-walnut'
                        : 'w-2 h-2 bg-warm-gray/30 hover:bg-warm-gray/50'
                    }`}
                    style={{
                      borderRadius: '4px',
                    }}
                    aria-label={`Отзив ${index + 1}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Google Attribution & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-body text-warm-gray text-xs">Отзиви от Google</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {googleMapsUri && (
              <a
                href={googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                Виж всички в Google
                <ExternalLink size={14} />
              </a>
            )}
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Остави отзив
              <Star size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
