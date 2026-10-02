import { Star } from 'lucide-react'
import { getReviews } from '@/lib/reviews'

/**
 * Component that displays Google rating in Hero
 * Hidden if no review data available
 */
export default function HeroRatingBadge() {
  const data = getReviews()

  // Hide if no rating data
  if (!data) {
    return null
  }

  const { rating, totalReviews } = data

  return (
    <div
      className="inline-flex items-center gap-2 font-body text-sm text-white/85 mt-4"
      style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: '100px',
        padding: '8px 16px',
        width: 'fit-content',
      }}
    >
      <Star size={14} className="text-amber-400" fill="currentColor" />
      <span className="font-medium">
        {rating.toFixed(1)} от {totalReviews} отзива в Google
      </span>
    </div>
  )
}
