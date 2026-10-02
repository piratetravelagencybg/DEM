'use client'

import { Phone, MessageSquare } from 'lucide-react'
import { useEffect } from 'react'

export default function MobileStickyBar() {
  useEffect(() => {
    // Add padding-bottom to body to prevent content overlap
    document.body.style.paddingBottom = 'calc(76px + env(safe-area-inset-bottom))'

    return () => {
      document.body.style.paddingBottom = '0'
    }
  }, [])

  const handleCallClick = () => {
    // GTM event tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'click_to_call',
        call_source: 'mobile_sticky_bar',
      })
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(139,111,71,0.15)',
        padding: '12px 16px calc(12px + env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex gap-3">
        {/* Call Button */}
        <a
          href="tel:+359876081199"
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center gap-2 font-body font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: '#8B6F47',
            color: 'white',
            padding: '14px 16px',
            borderRadius: 12,
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(139,111,71,0.3)',
          }}
        >
          <Phone size={18} />
          Обади се
        </a>

        {/* Contact Form Button */}
        <a
          href="#zapitvanе"
          className="flex-1 flex items-center justify-center gap-2 font-body font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: 'white',
            color: '#8B6F47',
            padding: '14px 16px',
            borderRadius: 12,
            fontSize: '0.9rem',
            border: '2px solid #8B6F47',
          }}
        >
          <MessageSquare size={18} />
          Безплатна консултация
        </a>
      </div>
    </div>
  )
}
