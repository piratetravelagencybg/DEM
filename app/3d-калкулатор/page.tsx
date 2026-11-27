import type { Metadata } from 'next'
import { completePageMetadata } from '@/lib/seo'

// 3D калкулаторът е статично приложение (public/konfigurator), вградено под горната лента на сайта,
// за да има страницата същото лого, меню и долна част като останалия сайт.
const PAGE_URL = 'https://domexpertmebel.com/3d-калкулатор/'
const TITLE = '3D калкулатор за мебели по поръчка | Дом Експерт Мебел'
const DESCRIPTION = '3D калкулатор за мебели по поръчка: изберете модел, стил и цветове на кухня, гардероб, спалня, ТВ стена, антре или офис, вижте ги в 3D с ориентировъчна цена и изпратете проекта.'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Дом Експерт Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/konfigurator/3d-kalkulator-desktop.webp', width: 1800, height: 1125, alt: '3D калкулатор за мебели по поръчка' }],
  },
})

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '3D калкулатор за мебели по поръчка',
  url: PAGE_URL,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  inLanguage: 'bg-BG',
  isAccessibleForFree: true,
  provider: { '@type': 'Organization', name: 'Дом Експерт Мебел', url: 'https://domexpertmebel.com/' },
}

export default function Kalkulator3DPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <h1 className="sr-only">3D калкулатор за мебели по поръчка</h1>
      <p className="sr-only">{DESCRIPTION}</p>
      {/* Калкулаторът запълва екрана под лентата на сайта; страницата не се превърта (иначе на телефон
          се получават два скрола и 3D изгледът се скрива под лентата). */}
      <style>{'html:has(#kalkulator-3d),body:has(#kalkulator-3d){overflow:hidden;height:100%;overscroll-behavior:none}body:has(#kalkulator-3d) footer{display:none}'}</style>
      <div id="kalkulator-3d" className="pt-16 lg:pt-20" style={{ background: '#1F1914' }}>
        <iframe
          src="/konfigurator/index.html"
          title="3D калкулатор за мебели по поръчка"
          className="block h-[calc(100vh-4rem)] w-full border-0 supports-[height:100dvh]:h-[calc(100dvh-4rem)] lg:h-[calc(100vh-5rem)] lg:supports-[height:100dvh]:h-[calc(100dvh-5rem)]"
          allow="clipboard-write; fullscreen"
        />
      </div>
    </>
  )
}
