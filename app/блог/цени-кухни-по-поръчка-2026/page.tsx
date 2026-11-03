import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import data from '@/data/kitchen-prices-2026.json'
import { completePageMetadata } from '@/lib/seo'

const PAGE_URL = 'https://domexpertmebel.com/блог/цени-кухни-по-поръчка-2026/'
const TITLE = 'Цени на кухни по поръчка 2026 – данни | Дом Експерт Мебел'
const DESCRIPTION = 'Колко струва кухня по поръчка през 2026 г.: средни цени на линеен метър по материал на фронтовете, изчислени от реалните оферти на Дом Експерт Мебел.'

type PriceRow = { material: string; avgPerMeter: number | null }

const rows = data.rows as PriceRow[]
const findings = data.findings as string[]
/** Published only when the flag is set and every number is filled in. */
const ready = data.published && data.offersCount !== null && data.datePublished !== null
  && rows.every((row) => row.avgPerMeter !== null)

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: ready, follow: true },
  openGraph: {
    type: 'article',
    locale: 'bg_BG',
    siteName: 'Дом Експерт Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/kitchens.webp', width: 1200, height: 630, alt: 'Цени на кухни по поръчка 2026' }],
  },
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Цени на кухни по поръчка през 2026 г.',
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: data.datePublished,
  inLanguage: 'bg-BG',
  author: { '@id': 'https://domexpertmebel.com/#business' },
  publisher: { '@id': 'https://domexpertmebel.com/#business' },
}

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Средни цени на кухни по поръчка по материал, 2026',
  description: `Средна цена на линеен метър кухня по поръчка по материал на фронтовете, изчислена от ${data.offersCount} оферти на Дом Експерт Мебел през 2026 г.`,
  url: PAGE_URL,
  creator: { '@id': 'https://domexpertmebel.com/#business' },
  temporalCoverage: '2026',
  spatialCoverage: 'България',
  isAccessibleForFree: true,
  variableMeasured: rows.map((row) => `Средна цена на линеен метър — ${row.material} (${data.currency})`),
}

export default function KitchenPrices2026Page() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Блог', url: 'https://domexpertmebel.com/блог/' },
        { name: 'Цени на кухни по поръчка 2026', url: PAGE_URL },
      ]} />
      {ready && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema).replace(/</g, '\\u003c') }} />
        </>
      )}

      <article className="section-py" style={{ backgroundColor: 'var(--color-warm-white)', paddingTop: '7rem' }}>
        <div className="container-main max-w-3xl">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/блог/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Блог</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Цени 2026</span>
          </nav>

          <span className="eyebrow-pill">Данни</span>
          <h1 className="font-display font-bold text-charcoal leading-[1.08] mt-2" style={{ fontSize: 'var(--text-h1)' }}>
            Колко струва кухня по поръчка през 2026 г.
          </h1>

          <div className="space-y-4 font-body text-warm-gray leading-relaxed mt-6" style={{ fontSize: '1.02rem' }}>
            <p>
              {ready
                ? `Данните са изчислени от ${data.offersCount} оферти за кухни по поръчка, които Дом Експерт Мебел е изготвил през 2026 г. Цените са средни за линеен метър според материала на фронтовете.`
                : 'Данните за тази статия се обработват.'}
            </p>
          </div>

          <h2 className="section-title text-left mt-10">Средна цена на линеен метър по материал</h2>
          <div className="overflow-hidden rounded-2xl bg-white mt-4" style={{ border: '1px solid #EDE5DA' }}>
            <table className="w-full text-left font-body" style={{ fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#F7F3ED' }}>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Материал на фронтовете</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Средна цена / л.м</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.material} style={{ borderTop: '1px solid #EDE5DA' }}>
                    <td className="px-4 py-3 text-charcoal">{row.material}</td>
                    <td className="px-4 py-3 text-charcoal">
                      {row.avgPerMeter !== null ? `${row.avgPerMeter.toLocaleString('bg-BG')} ${data.currency}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {findings.length > 0 && (
            <>
              <h2 className="section-title text-left mt-10">Какво показват офертите</h2>
              <ul className="space-y-2 font-body text-warm-gray leading-relaxed mt-4 list-disc pl-5">
                {findings.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </>
          )}

          <div className="space-y-4 font-body text-warm-gray leading-relaxed mt-10" style={{ fontSize: '1rem' }}>
            <h2 className="section-title text-left">Цитиране</h2>
            <p>
              Данните могат да се цитират свободно с позоваване на Дом Експерт Мебел и линк към тази страница. Вижте също{' '}
              <Link href="/блог/ot-kakvo-zavisi-tsenata-na-kuhnya-po-poruchka/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
                от какво зависи цената на кухня по поръчка
              </Link>
              {' '}и{' '}
              <Link href="/калкулатор-кухня/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
                калкулатора за кухня
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
