/**
 * Google Places API (New) integration for fetching business reviews
 * https://developers.google.com/maps/documentation/places/web-service/place-details
 */

export interface GoogleReview {
  authorName: string
  authorPhotoUrl?: string
  rating: number
  text: string
  relativeTimeDescription: string
  time: string
}

export interface GooglePlaceData {
  rating: number
  userRatingCount: number
  reviews: GoogleReview[]
  googleMapsUri: string
}

interface FallbackReview {
  author: string
  rating: number
  text: string
  date: string
}

interface FallbackData {
  rating?: number
  count?: number
  reviews?: FallbackReview[]
}

/**
 * Fetch Google Place Details using the Places API (New)
 * Caches for 24 hours (86400 seconds)
 */
export async function getGoogleReviews(): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  // If no API credentials, fall back to data/reviews.json
  if (!apiKey || !placeId) {
    console.warn('Google Places API credentials not configured, using fallback data')
    return getFallbackReviews()
  }

  try {
    const fieldMask = [
      'displayName',
      'rating',
      'userRatingCount',
      'reviews',
      'googleMapsUri',
    ].join(',')

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        method: 'GET',
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': fieldMask,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    )

    if (!response.ok) {
      console.error(`Google Places API error: ${response.status} ${response.statusText}`)
      return getFallbackReviews()
    }

    const data = await response.json()

    // Transform API response to our interface
    const reviews: GoogleReview[] = (data.reviews || []).slice(0, 5).map((review: any) => ({
      authorName: review.authorAttribution?.displayName || 'Anonymous',
      authorPhotoUrl: review.authorAttribution?.photoUri,
      rating: review.rating || 0,
      text: review.text?.text || review.originalText?.text || '',
      relativeTimeDescription: review.relativePublishTimeDescription || '',
      time: review.publishTime || new Date().toISOString(),
    }))

    return {
      rating: data.rating || 0,
      userRatingCount: data.userRatingCount || 0,
      reviews,
      googleMapsUri: data.googleMapsUri || '',
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return getFallbackReviews()
  }
}

/**
 * Fallback to local reviews data if Google API is unavailable
 */
async function getFallbackReviews(): Promise<GooglePlaceData | null> {
  try {
    const fallbackData: FallbackData = await import('@/data/reviews.json').then((m) => m.default)

    // If fallback is empty, return null to hide the component
    if (!fallbackData.reviews || fallbackData.reviews.length === 0) {
      return null
    }

    // Transform fallback data to match Google format
    const reviews: GoogleReview[] = fallbackData.reviews.slice(0, 5).map((review) => ({
      authorName: review.author,
      rating: review.rating,
      text: review.text,
      relativeTimeDescription: review.date,
      time: new Date().toISOString(),
    }))

    return {
      rating: fallbackData.rating || 0,
      userRatingCount: fallbackData.count || 0,
      reviews,
      googleMapsUri: '',
    }
  } catch (error) {
    console.error('Error loading fallback reviews:', error)
    return null
  }
}

/**
 * Find Place ID using Text Search API
 * This is a helper function for initial setup
 */
export async function findPlaceId(businessName: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.error('GOOGLE_PLACES_API_KEY not configured')
    return null
  }

  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName',
        },
        body: JSON.stringify({
          textQuery: businessName,
        }),
      }
    )

    if (!response.ok) {
      console.error(`Places Text Search error: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.places && data.places.length > 0) {
      console.log('Found places:', data.places)
      return data.places[0].id
    }

    return null
  } catch (error) {
    console.error('Error finding place ID:', error)
    return null
  }
}
