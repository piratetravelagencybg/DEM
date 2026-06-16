'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

export default function WishlistButton({ productId }: { productId: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        setLiked(!liked)
      }}
      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-cream transition-colors"
      aria-label="Добави в любими"
    >
      <Heart size={16} className={liked ? 'text-walnut fill-walnut' : 'text-warm-gray'} />
    </button>
  )
}
