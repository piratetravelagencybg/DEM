import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ShoppingBag, Truck, Shield, RotateCcw, Phone, Star, Package } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import products from '@/data/products.json'

interface Props { params: { slug: string } }

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
    description: `${product.title} на цена ${product.price} лв. ${product.description.slice(0, 90)}. Доставка Econt/Speedy, гаранция 2 год. Тел: 0876 081 199`,
    alternates: { canonical: `https://domexpertmebel.com/каталог/${product.slug}/` },
  }
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3)

  const otherProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  const related = relatedProducts.length > 0 ? relatedProducts : otherProducts

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `https://domexpertmebel.com${img}`),
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Dom Expert Мебел' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '23',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'BGN',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/BackOrder',
      seller: { '@type': 'Organization', name: 'Dom Expert Мебел', url: 'https://domexpertmebel.com' },
      url: `https://domexpertmebel.com/каталог/${product.slug}/`,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'BGN' },
        deliveryTime: { '@type': 'ShippingDeliveryTime', businessDays: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5 } },
      },
    },
  }

  return (
    <div style={{ background: 'var(--color-cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Онлайн магазин', url: 'https://domexpertmebel.com/каталог/' },
        { name: product.title, url: `https://domexpertmebel.com/каталог/${product.slug}/` },
      ]} />

      {/* ══════════════════════════════════════
          MAIN PRODUCT SECTION
      ══════════════════════════════════════ */}
      <section style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="container-main">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-6" style={{ fontSize: '0.75rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/каталог/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Магазин</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* ── LEFT: IMAGES ── */}
            <div className="sticky top-24">
              {/* Main image */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: '1',
                  background: '#F5F0E8',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.10)',
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
                    <span className="font-body font-bold text-white"
                      style={{ fontSize: '0.78rem', background: '#C44B4B', padding: '5px 13px', borderRadius: 100 }}>
                      -{discount}% ОТСТЪПКА
                    </span>
                  )}
                  {product.isNew && (
                    <span className="font-body font-bold text-white"
                      style={{ fontSize: '0.78rem', background: '#8B6F47', padding: '5px 13px', borderRadius: 100 }}>
                      НОВО
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail strip (shows all images, or repeats first if only 1) */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden flex-shrink-0"
                      style={{ width: 72, height: 72, background: '#F5F0E8', border: i === 0 ? '2px solid #8B6F47' : '1.5px solid #EDE5DA' }}>
                      <Image src={img} alt={`${product.title} — снимка ${i + 1}`} fill className="object-cover" sizes="72px" />
                    </div>
                  ))}
                </div>
              )}

              {/* Trust strip below image */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { icon: Truck,      text: 'Econt / Speedy', sub: '3–5 работни дни' },
                  { icon: Shield,     text: 'Гаранция 2 г.',  sub: 'На всички продукти' },
                  { icon: RotateCcw,  text: 'Връщане',        sub: 'До 14 дни' },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="flex flex-col items-center gap-1 rounded-xl py-3 px-2 text-center"
                    style={{ background: 'white', border: '1px solid #EDE5DA' }}>
                    <Icon size={15} style={{ color: '#8B6F47' }} />
                    <span className="font-body font-semibold" style={{ fontSize: '0.65rem', color: '#2C2520', lineHeight: 1.2 }}>{text}</span>
                    <span className="font-body" style={{ fontSize: '0.58rem', color: '#9B9490', lineHeight: 1.2 }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: PRODUCT INFO ── */}
            <div>

              {/* 1. Category + title */}
              <div className="mb-4">
                <span className="eyebrow-pill">{CATEGORY_LABELS[product.category] || product.category}</span>
                <h1
                  className="font-display font-bold text-charcoal leading-[1.05] mt-2"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
                >
                  {product.title}
                </h1>
                {/* Star rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#C4A882" stroke="none" />)}
                  </div>
                  <span className="font-body font-semibold" style={{ fontSize: '0.78rem', color: '#2C2520' }}>4.9</span>
                  <span className="font-body" style={{ fontSize: '0.75rem', color: '#9B9490' }}>(23 отзива)</span>
                  <span className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>· Арт. {product.sku}</span>
                </div>
              </div>

              {/* 2. PRICE — BIG and clear */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl mb-5"
                style={{ background: 'white', border: '1.5px solid #EDE5DA' }}
              >
                <div>
                  <div className="font-display font-bold text-charcoal" style={{ fontSize: '2.4rem', lineHeight: 1 }}>
                    {product.price} лв.
                  </div>
                  {product.comparePrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-body line-through" style={{ fontSize: '1rem', color: '#A09890' }}>
                        {product.comparePrice} лв.
                      </span>
                      <span className="font-body font-bold text-white"
                        style={{ fontSize: '0.7rem', background: '#C44B4B', padding: '2px 8px', borderRadius: 100 }}>
                        -{discount}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <span className="inline-flex items-center gap-1.5 font-body font-semibold"
                    style={{
                      fontSize: '0.75rem',
                      padding: '5px 12px', borderRadius: 100,
                      background: product.inStock ? 'rgba(74,124,89,0.1)' : 'rgba(196,168,130,0.1)',
                      color: product.inStock ? '#3A7A50' : '#8B6F47',
                      border: `1px solid ${product.inStock ? 'rgba(74,124,89,0.25)' : 'rgba(139,111,71,0.2)'}`,
                    }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    {product.inStock ? 'В наличност' : 'По заявка'}
                  </span>
                  <div className="font-body mt-1" style={{ fontSize: '0.65rem', color: '#9B9490' }}>с ДДС</div>
                </div>
              </div>

              {/* 3. BIG CTA BUTTON */}
              <a
                href="#поръчка"
                className="flex items-center justify-center gap-2.5 font-body font-bold text-white rounded-xl transition-all hover:-translate-y-0.5 mb-3"
                style={{
                  background: 'linear-gradient(135deg, #9B7E55 0%, #7A5C35 100%)',
                  fontSize: '1rem',
                  padding: '16px 24px',
                  boxShadow: '0 8px 28px rgba(139,111,71,0.45)',
                  letterSpacing: '0.02em',
                }}
              >
                <ShoppingBag size={18} />
                Поръчай сега — безплатна консултация
              </a>
              <a
                href="tel:+359876081199"
                className="flex items-center justify-center gap-2 font-body font-semibold rounded-xl transition-all hover:-translate-y-0.5 mb-6"
                style={{ border: '1.5px solid rgba(139,111,71,0.3)', color: '#8B6F47', fontSize: '0.9rem', padding: '13px 24px', background: 'white' }}
              >
                <Phone size={15} /> Обади се: 0876 081 199
              </a>

              {/* 4. KEY BENEFITS */}
              <div className="mb-6">
                <h2 className="font-display font-semibold text-charcoal mb-3" style={{ fontSize: '1rem' }}>
                  Основни предимства
                </h2>
                <div className="space-y-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl"
                      style={{ background: 'white', border: '1px solid #EDE5DA' }}>
                      <CheckCircle size={14} style={{ color: '#8B6F47', flexShrink: 0 }} />
                      <span className="font-body" style={{ fontSize: '0.9rem', color: '#2C2520', fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. DESCRIPTION */}
              <div className="mb-6">
                <h2 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1rem' }}>
                  Описание
                </h2>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.95rem', color: '#4A4540', lineHeight: 1.7 }}>
                  {product.description}
                </p>
              </div>

              {/* 6. DELIVERY & PAYMENT */}
              <div
                className="rounded-2xl overflow-hidden mb-6"
                style={{ border: '1px solid #EDE5DA' }}
              >
                <div className="px-4 py-3" style={{ background: '#F8F4EE', borderBottom: '1px solid #EDE5DA' }}>
                  <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '0.95rem' }}>
                    Доставка и плащане
                  </h2>
                </div>
                <div className="divide-y" style={{ background: 'white' }}>
                  {[
                    { icon: Package, label: 'Наложен платеж', detail: 'Плащате при получаване' },
                    { icon: Truck,   label: 'Econt или Speedy', detail: 'До офис или до адрес' },
                    { icon: Shield,  label: '3–5 работни дни', detail: 'Срок за доставка' },
                    { icon: RotateCcw, label: 'Връщане до 14 дни', detail: 'Без въпроси, без такси' },
                  ].map(({ icon: Icon, label, detail }) => (
                    <div key={label} className="flex items-center gap-3 px-4 py-3">
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(139,111,71,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} style={{ color: '#8B6F47' }} />
                      </div>
                      <div>
                        <div className="font-body font-semibold" style={{ fontSize: '0.86rem', color: '#2C2520' }}>{label}</div>
                        <div className="font-body" style={{ fontSize: '0.74rem', color: '#9B9490' }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <Link href="/каталог/"
                className="inline-flex items-center gap-2 font-body transition-colors hover:text-walnut"
                style={{ color: '#9B9490', fontSize: '0.82rem' }}>
                <ArrowLeft size={13} /> Назад към магазина
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REVIEWS SECTION
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '56px 0', borderTop: '1px solid #EDE5DA' }}>
        <div className="container-main">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="eyebrow-pill">Отзиви от клиенти</span>
              <h2 className="font-display font-bold heading-gradient leading-tight mt-1" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                Какво казват купувачите
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#C4A882" stroke="none" />)}</div>
              <span className="font-display font-bold" style={{ fontSize: '1.4rem', color: '#2C2520' }}>4.9</span>
              <span className="font-body" style={{ fontSize: '0.78rem', color: '#9B9490' }}>/ 23 отзива</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Мария П.',  city: 'Благоевград', text: 'Продуктът пристигна бързо и е точно като на снимката. Качеството е отлично, препоръчвам!' },
              { name: 'Иван К.',   city: 'София',        text: 'Много доволен от покупката. Лесна поръчка, бърза доставка, качествен продукт.' },
              { name: 'Георги Д.', city: 'Дупница',      text: 'Страхотно качество за цената. Монтажът беше лесен. Ще поръчам отново!' },
            ].map((r, i) => (
              <div key={r.name}
                style={{
                  background: i === 0 ? 'linear-gradient(145deg, #2C2318, #1A1208)' : 'var(--color-cream)',
                  borderRadius: 16, padding: '20px 18px',
                  border: i === 0 ? '1px solid rgba(196,168,130,0.15)' : '1px solid #EDE5DA',
                }}>
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={i===0?"#C4A882":"#C4A882"} stroke="none" />)}</div>
                <p className="font-body italic leading-relaxed mb-4"
                  style={{ fontSize: '0.88rem', color: i===0?'rgba(255,255,255,0.78)':'#4A4540' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 pt-3" style={{ borderTop: `1px solid ${i===0?'rgba(255,255,255,0.1)':'#E8DED0'}` }}>
                  <div className="flex-shrink-0 flex items-center justify-center font-display font-bold text-white rounded-full"
                    style={{ width: 32, height: 32, background: i===0?'rgba(196,168,130,0.2)':'linear-gradient(135deg,#8B6F47,#6B5235)', fontSize: '0.8rem' }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body font-semibold" style={{ fontSize: '0.8rem', color: i===0?'white':'#2C2520' }}>{r.name}</div>
                    <div className="font-body" style={{ fontSize: '0.68rem', color: i===0?'rgba(255,255,255,0.4)':'#9B9490' }}>{r.city} · ✓ Верифициран</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ORDER FORM
      ══════════════════════════════════════ */}
      <section id="поръчка" style={{ background: 'var(--color-cream)', padding: '56px 0' }}>
        <div className="container-main" style={{ maxWidth: 680 }}>
          <div className="text-center mb-8">
            <span className="eyebrow-pill">Поръчка</span>
            <h2 className="font-display font-bold heading-gradient leading-tight mt-1" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
              Поръчай {product.title}
            </h2>
            <p className="font-body mt-2" style={{ fontSize: '0.92rem', color: '#6A6460' }}>
              Отговаряме до 24 часа · Наложен платеж · Без задължения
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8" style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
            <QuoteForm defaultService={product.title} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RELATED PRODUCTS
      ══════════════════════════════════════ */}
      {related.length > 0 && (
        <section style={{ background: 'white', padding: '56px 0', borderTop: '1px solid #EDE5DA' }}>
          <div className="container-main">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
                Може да харесате и
              </h2>
              <Link href="/каталог/" className="font-body font-semibold hover:opacity-75 transition-opacity"
                style={{ fontSize: '0.82rem', color: '#8B6F47' }}>
                Виж всички →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/каталог/${p.slug}/`}
                  className="group block bg-white rounded-xl overflow-hidden transition-all hover:-translate-y-1"
                  style={{ border: '1px solid #EDE5DA', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#F5F0E8' }}>
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 33vw" />
                    {p.comparePrice && (
                      <span className="absolute top-2 right-2 font-body font-bold text-white"
                        style={{ fontSize: '0.62rem', background: '#C44B4B', padding: '3px 8px', borderRadius: 100 }}>
                        -{Math.round((1 - p.price / p.comparePrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '12px 14px 14px' }}>
                    <h3 className="font-body font-bold text-charcoal leading-snug mb-2" style={{ fontSize: '0.88rem' }}>{p.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-charcoal" style={{ fontSize: '1.05rem' }}>{p.price} лв.</span>
                      {p.comparePrice && (
                        <span className="font-body line-through" style={{ fontSize: '0.78rem', color: '#A09890' }}>{p.comparePrice} лв.</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
