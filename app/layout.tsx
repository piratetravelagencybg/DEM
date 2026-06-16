import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
  metadataBase: new URL('https://domexpertmebel.bg'),
  title: {
    default: 'Мебели по поръчка Благоевград и София | Dom Expert Мебел',
    template: '%s | Dom Expert Мебел',
  },
  description: 'Семейна фирма за мебели по поръчка. Кухни, гардероби, спални, офис мебели. Безплатна консултация и 3D проект. Работим в Благоевград, София и региона.',
  keywords: ['мебели по поръчка', 'кухни по поръчка', 'гардероби по поръчка', 'Благоевград', 'София'],
  authors: [{ name: 'Dom Expert Мебел' }],
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://domexpertmebel.bg',
    siteName: 'Dom Expert Мебел',
    images: [{ url: '/images/hero/hero.png', width: 1200, height: 630, alt: 'Dom Expert Мебел' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
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
      </body>
    </html>
  )
}
