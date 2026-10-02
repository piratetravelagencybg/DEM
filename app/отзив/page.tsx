import type { Metadata } from 'next'
import { Star, ExternalLink } from 'lucide-react'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Остави отзив | Dom Expert Мебел' },
  description: 'Благодарим ви! Споделете вашето мнение в Google.',
  robots: { index: false, follow: false }, // noindex per requirements
})

export default function ReviewPage() {
  const writeReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJH4FTnIX3qhQRrsTtIxlayao'

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
        padding: '2rem 1rem',
      }}
    >
      <div className="text-center max-w-2xl">
        {/* Thank You Icon */}
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(139,111,71,0.13)',
          }}
        >
          <Star size={40} className="text-walnut" fill="currentColor" />
        </div>

        {/* Heading */}
        <h1
          className="font-display font-bold text-charcoal leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Благодарим ви!
        </h1>

        {/* Message */}
        <p className="font-body text-warm-gray text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Вашето мнение е важно за нас и помага на бъдещи клиенти да вземат информирано решение.
          Споделете вашия опит с Dom Expert Мебел в Google.
        </p>

        {/* Google Review Button */}
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-3 text-lg"
          style={{
            padding: '1.25rem 2.5rem',
            fontSize: '1.1rem',
            boxShadow: '0 8px 24px rgba(139,111,71,0.25)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Остави отзив в Google
          <ExternalLink size={20} />
        </a>

        {/* Secondary Info */}
        <p className="font-body text-warm-gray text-sm mt-6">
          Отзивът се публикува директно в Google Business Profile
        </p>

        {/* Small Contact Link */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(139,111,71,0.15)' }}>
          <p className="font-body text-warm-gray text-sm">
            Имате въпрос? Свържете се с нас на{' '}
            <a href="tel:+359876081199" className="text-walnut hover:underline font-medium">
              0876 081 199
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
