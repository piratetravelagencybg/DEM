import reviewsData from '@/data/reviews.json'

export interface Review {
  name: string
  rating: number
  text: string
  date: string
}

export interface ReviewsData {
  rating: number
  totalReviews: number
  reviews: Review[]
}

/**
 * Get reviews from local JSON file
 * Returns null if no reviews available
 */
export function getReviews(): ReviewsData | null {
  if (!reviewsData.reviews || reviewsData.reviews.length === 0) {
    return null
  }

  return reviewsData as ReviewsData
}

/**
 * Format ISO date to Bulgarian month + year
 * Example: "2026-09-25" → "септември 2026"
 */
export function formatReviewDate(isoDate: string): string {
  const months = [
    'януари', 'февруари', 'март', 'април', 'май', 'юни',
    'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'
  ]

  const date = new Date(isoDate)
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${month} ${year}`
}
