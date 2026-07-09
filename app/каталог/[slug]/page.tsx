import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ShoppingBag, Truck, Shield } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import products from '@/data/products.json'

interface Props {
  params: { slug: string }
}

const CATEGORY_LABELS: Record<string, string> = {
  divani: 'Дивани',
  masi: 'Маси',
  stolove: 'Столове',
  'tv-shkafove': 'ТВ шкафове',
  garderob: 'Гардероби',
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return {}
  return {
    title: { absolute: `${product.title} — ${product.price} лв. | Dom Expert Мебел` },
    description: `${product.title} на цена ${product.price} лв. ${product.description.slice(0, 90)}. Доставка 3-5 дни, гаранция 2 год. Тел: 0876 081 199`,
    alternates: { canonical: `https://domexpertmebel.com/каталог/${product.slug}/` },
  }
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: [`https://domexpertmebel.com${product.images[0]}`],
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Dom Expert Мебел',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'BGN',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/BackOrder',
      seller: {
        '@type': 'Organization',
        name: 'Dom Expert Мебел',
        url: 'https://domexpertmebel.com',
      },
      url: `https://domexpertmebel.com/каталог/${product.slug}/`,
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Онлайн магазин', url: 'https://domexpertmebel.com/каталог/' },
        { name: product.title, url: `https://domexpertmebel.com/каталог/${product.slug}/` },
      ]} />

      {/* ── Hero / Product section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: '5rem',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.09)', filter: 'blur(65px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-10" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/каталог/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Онлайн магазин</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ── Image ── */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  aspectRatio: '1',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.08)',
                  background: 'var(--color-cream)',
                }}
              >
                <Image
                  src={product.images[0]}
                  alt={`${product.title} — ${CATEGORY_LABELS[product.category] || product.category} от Dom Expert Мебел`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {discount && (
                    <span
                      className="font-body font-bold text-white"
                      style={{ fontSize: '0.75rem', background: '#C44B4B', padding: '4px 12px', borderRadius: 100 }}
                    >
                      -{discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span
                      className="font-body font-bold text-white"
                      style={{ fontSize: '0.75rem', background: '#8B6F47', padding: '4px 12px', borderRadius: 100 }}
                    >
                      Ново
                    </span>
                  )}
                </div>
              </div>

              {/* Trust badges below image */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Truck, text: 'Доставка 3–5 дни' },
                  { icon: Shield, text: 'Гаранция 2 год.' },
                  { icon: ShoppingBag, text: 'Лесна поръчка' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 text-center"
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(139,111,71,0.12)' }}
                  >
                    <Icon size={16} style={{ color: '#8B6F47' }} />
                    <span className="font-body" style={{ fontSize: '0.7rem', color: '#5A5450', lineHeight: 1.3 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="space-y-6">

              {/* Category + title */}
              <div>
                <span className="eyebrow-pill">
                  {CATEGORY_LABELS[product.category] || product.category}
                </span>
                <h1
                  className="font-display font-bold text-charcoal leading-[1.05]"
                  style={{ fontSize: 'var(--text-h1)' }}
                >
                  {product.title}
                </h1>
                <p className="font-body text-warm-gray mt-1" style={{ fontSize: '0.8rem' }}>
                  Арт. {product.sku}
                </p>
              </div>

              {/* Price */}
              <div
                className="flex items-end gap-3 py-4 px-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(139,111,71,0.12)' }}
              >
                <span className="font-display font-bold text-charcoal" style={{ fontSize: '2.2rem', lineHeight: 1 }}>
                  {product.price} лв.
                </span>
                {product.comparePrice && (
                  <span className="font-body text-warm-gray line-through pb-1" style={{ fontSize: '1.2rem' }}>
                    {product.comparePrice} лв.
                  </span>
                )}
                <span
                  className="font-body font-semibold ml-auto"
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: product.inStock ? 'rgba(74,124,89,0.1)' : 'rgba(139,111,71,0.1)',
                    color: product.inStock ? '#4A7C59' : '#8B6F47',
                    border: `1px solid ${product.inStock ? 'rgba(74,124,89,0.25)' : 'rgba(139,111,71,0.2)'}`,
                  }}
                >
                  {product.inStock ? '● В наличност' : '○ По заявка'}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1rem' }}>
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {product.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.13)',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 7,
                      background: 'rgba(139,111,71,0.13)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <CheckCircle size={13} style={{ color: '#8B6F47' }} />
                    </div>
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href="#zapitване"
                  className="w-full flex items-center justify-center gap-2 font-body font-bold text-white rounded-full py-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: '#8B6F47', fontSize: '0.95rem', boxShadow: '0 8px 28px rgba(139,111,71,0.45)' }}
                >
                  <ShoppingBag size={17} />
                  Поръчай / Запитване
                </a>
                <Link
                  href="/каталог/"
                  className="flex items-center justify-center gap-2 font-body font-medium mt-3 transition-colors hover:text-walnut"
                  style={{ color: '#9B9490', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={14} /> Назад към магазина
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote / Order form ── */}
      <section
        id="zapitване"
        className="section-py"
        style={{ background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 100%)' }}
      >
        <div className="container-main max-w-2xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Поръчка</span>
            <h2 className="section-title">Искам оферта за този продукт</h2>
            <p className="font-body text-warm-gray mt-3">Отговаряме до 24 часа. Без задължения.</p>
          </div>
          <div
            className="bg-white rounded-2xl p-8"
            style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
          >
            <QuoteForm defaultService={product.title} />
          </div>
        </div>
      </section>

    </div>
  )
}
