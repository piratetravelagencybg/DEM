import { Star, ExternalLink } from 'lucide-react'
import { getReviews, formatReviewDate } from '@/lib/reviews'
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/business'

interface GoogleReviewsProps {
  compact?: boolean
}

export default function GoogleReviews({ compact = false }: GoogleReviewsProps) {
  const data = getReviews()

  // Hide component if no data
  if (!data) {
    return null
  }

  const { rating, totalReviews, reviews } = data

  // URLs
  const googleMapsUri = GOOGLE_BUSINESS_PROFILE_URL
  const writeReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJH4FTnIX3qhQRrsTtIxlayao'

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container-main">
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
          className="flex flex-col items-center gap-3 mb-8 p-6 rounded-2xl bg-white mx-auto max-w-md"
          style={{ border: '1px solid #E7DDCF' }}
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

        {/* Reviews Grid */}
        {reviews && reviews.length > 0 && (
          <div className={`grid gap-5 mb-8 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'} max-w-6xl mx-auto`}>
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 flex flex-col"
                style={{ border: '1px solid #E7DDCF' }}
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full bg-walnut/10 flex items-center justify-center"
                  >
                    <span className="font-body font-semibold text-walnut text-sm">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-charcoal text-sm truncate">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.rating ? 'text-amber-500' : 'text-gray-300'}
                          fill={star <= review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                {review.text && (
                  <p className="font-body text-warm-gray text-sm leading-relaxed flex-1 mb-3">
                    {review.text}
                  </p>
                )}

                {/* Time */}
                <p className="font-body text-warm-gray text-xs">
                  {formatReviewDate(review.date)}
                </p>
              </div>
            ))}
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
