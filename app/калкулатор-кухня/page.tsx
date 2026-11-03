import type { Metadata } from 'next'
import Link from 'next/link'
import KitchenCalculator from '@/components/ui/KitchenCalculator'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { calculatorReady } from '@/lib/kitchen-calculator'
import { completePageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

const PAGE_URL = 'https://domexpertmebel.com/калкулатор-кухня/'
const TITLE = 'Калкулатор за кухня по поръчка – цена на метър | Дом Експерт'
const DESCRIPTION = 'Калкулатор за кухня по поръчка: въведете дължината, формата и материала на фронтовете и вижте ориентировъчна цена. Точна оферта след 3D проект.'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // Indexed only once real prices are filled in data/kitchen-calculator.json.
  robots: { index: calculatorReady, follow: true },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Дом Експерт Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/kitchens.webp', width: 1200, height: 630, alt: 'Калкулатор за кухня по поръчка' }],
  },
})

const { kitchen } = SITE_CONFIG.pricing.visualization

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калкулатор за кухня по поръчка',
  url: PAGE_URL,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  inLanguage: 'bg-BG',
  isAccessibleForFree: true,
  provider: { '@id': 'https://domexpertmebel.com/#business' },
}

export default function KitchenCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Кухни по поръчка', url: 'https://domexpertmebel.com/услуги/кухни-по-поръчка/' },
        { name: 'Калкулатор за кухня', url: PAGE_URL },
      ]} />
      {calculatorReady && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema).replace(/</g, '\\u003c') }}
        />
      )}

      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div className="container-main relative">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/услуги/кухни-по-поръчка/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Кухни по поръчка</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Калкулатор</span>
          </nav>
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">Калкулатор</span>
            <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-2" style={{ fontSize: 'var(--text-h1)' }}>
              Калкулатор за кухня по поръчка
            </h1>
            <p className="font-body text-warm-gray leading-relaxed mt-5" style={{ fontSize: '1.05rem' }}>
              Изберете дължината, формата и фронтовете, за да видите ориентировъчна цена. Точната оферта идва след 3D проекта — той е от {kitchen.from} {kitchen.currency} и се приспада при поръчка.
            </p>
          </div>
          <KitchenCalculator />
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl space-y-4 font-body text-warm-gray leading-relaxed" style={{ fontSize: '1rem' }}>
          <h2 className="section-title text-left">Защо калкулаторът дава диапазон</h2>
          <p>
            Две кухни с еднаква дължина могат да се различават значително по цена — според броя на модулите, механизмите, плота, уредите и осветлението. Затова калкулаторът показва ориентир, а точната цена получавате по 3D проекта.
          </p>
          <p>
            Повече за факторите вижте в статията{' '}
            <Link href="/блог/ot-kakvo-zavisi-tsenata-na-kuhnya-po-poruchka/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
              от какво зависи цената на кухня по поръчка
            </Link>
            {' '}или на страницата{' '}
            <Link href="/услуги/кухни-по-поръчка/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
              кухни по поръчка
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
