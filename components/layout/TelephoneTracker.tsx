'use client'

import { useEffect } from 'react'

/**
 * Adds GTM click_to_call event tracking to all tel: links on the page
 */
export default function TelephoneTracker() {
  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement

      if (link && typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'click_to_call',
          phone_number: link.href.replace('tel:', ''),
          link_text: link.textContent?.trim() || '',
          page_path: window.location.pathname,
        })
      }
    }

    // Add click listener to document
    document.addEventListener('click', handleTelClick)

    return () => {
      document.removeEventListener('click', handleTelClick)
    }
  }, [])

  return null
}
