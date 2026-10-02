import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyBar from '@/components/layout/MobileStickyBar'
import TelephoneTracker from '@/components/layout/TelephoneTracker'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://domexpertmebel.com'),
  applicationName: 'Dom Expert Мебел',
  title: {
    default: 'Мебели по поръчка Благоевград и София | Dom Expert Мебел',
    template: '%s | Dom Expert Мебел',
  },
  description: 'Семейна фирма за мебели по поръчка. Кухни, гардероби, спални и офис мебели с безплатен оглед, монтаж и 2 години гаранция.',
  keywords: ['мебели по поръчка', 'кухни по поръчка', 'гардероби по поръчка', 'Благоевград', 'София'],
  authors: [{ name: 'Dom Expert Мебел' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    title: 'Мебели по поръчка Благоевград и София | Dom Expert Мебел',
    description: 'Семейна фирма за мебели по поръчка. Безплатен оглед, платен 3D проект с приспадане при поръчка и 2 години гаранция.',
    url: 'https://domexpertmebel.com/',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, type: 'image/webp', alt: 'Примерна интериорна визуализация – Dom Expert Мебел' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мебели по поръчка | Dom Expert Мебел',
    description: 'Мебели по поръчка в Благоевград, София и региона.',
    images: ['/images/og/home.webp'],
  },
  verification: {
    google: 'x5xQdqBdODlXpaSyVftbqIMvjO0yuPo_D31lm-JCS4U',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#241D17',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-warm-white text-charcoal">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-walnut focus:text-white focus:rounded">
          Прескочи към съдържанието
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileStickyBar />
        <TelephoneTracker />
      </body>
    </html>
  )
}
