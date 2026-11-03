import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import { completePageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

const PAGE_URL = 'https://domexpertmebel.com/цени/'
const TITLE = 'Цени – оглед, 3D проект и интериорен дизайн | Dom Expert'
const DESCRIPTION = 'Цени на Dom Expert Мебел: оглед 50 €, 3D проект на кухня от 100 €, на друга мебел от 50 € – приспадат се. Интериорен дизайн от 25 €/кв.м.'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Цени на Dom Expert Мебел' }],
  },
})

const { inspection, visualization, interiorDesign } = SITE_CONFIG.pricing

const priceRows = [
  {
    service: 'Оглед на адрес',
    price: `${inspection.price} ${inspection.currency}`,
    note: 'Приспада се при поръчка',
    href: '/контакти/',
  },
  {
    service: '3D проект на кухня',
    price: `от ${visualization.kitchen.from} ${visualization.kitchen.currency}`,
    note: 'Приспада се при поръчка; цената зависи от размера',
    href: '/услуги/3d-визуализация/',
  },
  {
    service: '3D проект на гардероб, спалня или дневна',
    price: `от ${visualization.other.from} ${visualization.other.currency}`,
    note: 'Приспада се при поръчка',
    href: '/услуги/3d-визуализация/',
  },
  {
    service: '3D проект на няколко помещения',
    price: visualization.multipleRooms,
    note: '',
    href: '/услуги/3d-визуализация/',
  },
  {
    service: 'Интериорен дизайн',
    price: `от ${interiorDesign.pricePerSqm} ${interiorDesign.currency}/кв.м`,
    note: `Минимум ${interiorDesign.minimumSqm} кв.м; точна оферта след оглед`,
    href: '/услуги/интериорен-дизайн/',
  },
  {
    service: 'Мебели по поръчка',
    price: 'По оферта',
    note: 'След 3D проекта или огледа',
    href: '/услуги/',
  },
]

const faq = [
  {
    question: 'Колко струва оглед?',
    answer: `Огледът на адрес е ${inspection.price} ${inspection.currency}. Сумата се приспада от цената, ако поръчате мебелите при нас.`,
  },
  {
    question: 'Колко струва 3D проект?',
    answer: `3D проектът на кухня е от ${visualization.kitchen.from} ${visualization.kitchen.currency}, а на гардероб, спалня или дневна — от ${visualization.other.from} ${visualization.other.currency}. И двете суми се приспадат изцяло при поръчка.`,
  },
  {
    question: 'Защо няма цени на мебелите „от“?',
    answer: 'Цената на мебелите по поръчка зависи от размерите, материалите, механизмите и сложността. Две кухни с еднаква дължина могат да струват много различно, затова даваме конкретна оферта след 3D проекта или огледа.',
  },
  {
    question: 'Колко струва интериорен дизайн?',
    answer: `От ${interiorDesign.pricePerSqm} ${interiorDesign.currency}/кв.м при минимум ${interiorDesign.minimumSqm} кв.м. Точната оферта зависи от обхвата и я даваме след оглед.`,
  },
]

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${PAGE_URL}#prices`,
  name: 'Цени на Dom Expert Мебел',
  url: PAGE_URL,
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Оглед на адрес',
      price: inspection.price,
      priceCurrency: 'EUR',
      seller: { '@id': 'https://domexpertmebel.com/#business' },
    },
    {
      '@type': 'Offer',
      name: '3D проект на кухня',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: visualization.kitchen.from, priceCurrency: 'EUR' },
      seller: { '@id': 'https://domexpertmebel.com/#business' },
    },
    {
      '@type': 'Offer',
      name: '3D проект на гардероб, спалня или дневна',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: visualization.other.from, priceCurrency: 'EUR' },
      seller: { '@id': 'https://domexpertmebel.com/#business' },
    },
    {
      '@type': 'Offer',
      name: 'Интериорен дизайн',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: interiorDesign.pricePerSqm,
        priceCurrency: 'EUR',
        unitText: 'кв.м',
      },
      seller: { '@id': 'https://domexpertmebel.com/#business' },
    },
  ],
}

export default function PricesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Цени', url: PAGE_URL },
      ]} />
      <FAQSchema items={faq} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema).replace(/</g, '\\u003c') }}
      />

      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div className="container-main relative max-w-4xl">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Цени</span>
          </nav>
          <span className="eyebrow-pill">Цени</span>
          <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-2" style={{ fontSize: 'var(--text-h1)' }}>
            Цени
          </h1>
          <p className="font-body text-warm-gray leading-relaxed mt-5" style={{ fontSize: '1.05rem', maxWidth: '44rem' }}>
            Огледът и 3D проектът са с фиксирани цени и се приспадат при поръчка. Мебелите по поръчка получават конкретна оферта след 3D проекта, защото цената им зависи от размерите, материалите и механизмите.
          </p>

          <div className="overflow-hidden rounded-2xl bg-white mt-10" style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
            <table className="w-full text-left font-body" style={{ fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#F7F3ED' }}>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Услуга</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Цена</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.service} style={{ borderTop: '1px solid #EDE5DA' }}>
                    <td className="px-4 py-3 align-top">
                      <Link href={row.href} className="font-medium text-charcoal hover:text-walnut underline-offset-2 hover:underline">
                        {row.service}
                      </Link>
                      {row.note && <span className="block text-xs text-warm-gray mt-1">{row.note}</span>}
                    </td>
                    <td className="px-4 py-3 align-top font-semibold text-walnut whitespace-nowrap">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 mt-8">
            {[
              `Изработка ${SITE_CONFIG.stats.deliveryTime} след одобрение на проекта`,
              `${SITE_CONFIG.stats.warranty} гаранция`,
              SITE_CONFIG.services.assemblyIncluded,
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-body text-charcoal" style={{ fontSize: '0.93rem' }}>
                <CheckCircle size={15} className="text-walnut flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`tel:${SITE_CONFIG.phoneInternational}`} className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> {SITE_CONFIG.phone}
            </a>
            <Link href="/контакти/" className="btn-outline inline-flex items-center gap-2">
              Изпратете запитване <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <h2 className="font-display font-bold heading-gradient text-center mb-8" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Въпроси за цените
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl bg-white" style={{ border: '1px solid #EDE5DA', padding: '18px 22px' }}>
                <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1rem' }}>{item.question}</h3>
                <p className="font-body text-warm-gray leading-relaxed mt-2" style={{ fontSize: '0.9rem' }}>{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-warm-gray leading-relaxed mt-8" style={{ fontSize: '0.95rem' }}>
            Какво определя цената на кухнята, вижте в статията{' '}
            <Link href="/блог/ot-kakvo-zavisi-tsenata-na-kuhnya-po-poruchka/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
              от какво зависи цената на кухня по поръчка
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
