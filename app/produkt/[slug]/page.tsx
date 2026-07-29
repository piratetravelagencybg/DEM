import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ShoppingBag, CheckCircle2, Package, Truck, ArrowLeft } from 'lucide-react'
import { buildProductMetadata, formatPrice, getAllMbxProducts, getAvailabilityLabel, getAvailabilitySchema, getCategoryLabel, getMbxGroupById } from '@/lib/mbx'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllMbxProducts().map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getAllMbxProducts().find((entry) => entry.slug === params.slug)
  if (!product) return {}
  return buildProductMetadata(product)
}

export default function ProductPage({ params }: Props) {
  const product = getAllMbxProducts().find((entry) => entry.slug === params.slug)
  if (!product) notFound()

  const group = getMbxGroupById(product.itemGroupId)
  const variants = group?.variants.filter((variant) => variant.active) || [product]
  const related = getAllMbxProducts()
    .filter((entry) => entry.slug !== product.slug && entry.categoryHierarchy[0] === product.categoryHierarchy[0])
    .slice(0, 4)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.productName,
    description: product.description || `${product.productName} от Dom Expert Мебел.`,
    image: product.imageAlternatives.filter(Boolean),
    sku: product.productNo || product.itemId,
    brand: { '@type': 'Brand', name: 'Dom Expert Мебел' },
    offers: {
      '@type': 'Offer',
      price: product.priceVat ?? 0,
      priceCurrency: 'EUR',
      availability: getAvailabilitySchema(product.availability),
      url: `https://domexpertmebel.com/produkt/${product.slug}/`,
      seller: { '@type': 'Organization', name: 'Dom Expert Мебел' },
    },
  }

  return (
    <div style={{ background: 'var(--color-cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="container-main">
          <nav className="flex items-center gap-2 font-body mb-6" style={{ fontSize: '0.75rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/каталог/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Каталог</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{product.productName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '1', background: '#F5F0E8', boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}>
                <Image
                  src={product.imageUrl || '/images/hero/hero.png'}
                  alt={product.productName}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {product.imageAlternatives.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {product.imageAlternatives.map((img, index) => (
                    <div key={`${img}-${index}`} className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: 74, height: 74, background: '#F5F0E8', border: '1px solid #EDE5DA' }}>
                      <Image src={img} alt={`${product.productName} — снимка ${index + 1}`} fill className="object-cover" sizes="74px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="eyebrow-pill">{getCategoryLabel(product.categoryHierarchy[0] || product.categoryText)}</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-2" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>{product.productName}</h1>
              <p className="font-body mt-3 text-warm-gray" style={{ lineHeight: 1.7 }}>{product.description || 'Продуктът е наличен в каталога на Dom Expert Мебел и може да бъде поръчан.'}</p>

              <div className="flex items-center gap-3 p-4 rounded-2xl my-5" style={{ background: 'white', border: '1.5px solid #EDE5DA' }}>
                <div>
                  <div className="font-display font-bold text-charcoal" style={{ fontSize: '2rem', lineHeight: 1 }}>{formatPrice(product.priceVat)}</div>
                  <div className="font-body mt-1" style={{ fontSize: '0.72rem', color: '#9B9490' }}>Крайна клиентска цена</div>
                </div>
                <div className="ml-auto text-right">
                  <span className="inline-flex items-center gap-1.5 font-body font-semibold" style={{ fontSize: '0.75rem', padding: '5px 12px', borderRadius: 100, background: product.availability === 'on_order' ? 'rgba(196,168,130,0.1)' : 'rgba(74,124,89,0.1)', color: product.availability === 'on_order' ? '#8B6F47' : '#3A7A50', border: `1px solid ${product.availability === 'on_order' ? 'rgba(139,111,71,0.2)' : 'rgba(74,124,89,0.25)'}` }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    {getAvailabilityLabel(product.availability)}
                  </span>
                </div>
              </div>

              {variants.length > 1 && (
                <div className="mb-6 rounded-2xl p-4" style={{ background: 'white', border: '1px solid #EDE5DA' }}>
                  <h2 className="font-display font-semibold text-charcoal mb-3" style={{ fontSize: '1rem' }}>Варианти</h2>
                  <div className="space-y-2">
                    {variants.map((variant) => (
                      <div key={variant.itemId} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'var(--color-cream)', border: '1px solid #EDE5DA' }}>
                        <div>
                          <div className="font-body font-semibold" style={{ fontSize: '0.86rem', color: '#2C2520' }}>{variant.productName}</div>
                          <div className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>SKU: {variant.productNo || variant.itemId}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-body font-semibold" style={{ fontSize: '0.88rem', color: '#2C2520' }}>{formatPrice(variant.priceVat)}</div>
                          <div className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>{getAvailabilityLabel(variant.availability)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <a href="tel:+359876081199" className="flex items-center justify-center gap-2 font-body font-semibold rounded-xl transition-all hover:-translate-y-0.5 mb-6" style={{ border: '1.5px solid rgba(139,111,71,0.3)', color: '#8B6F47', fontSize: '0.9rem', padding: '13px 24px', background: 'white' }}>
                <Phone size={15} /> Обади се: 0876 081 199
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                {[{ icon: Package, label: 'SKU', value: product.productNo || product.itemId }, { icon: Truck, label: 'Срок', value: product.deliveryDate ? `Около ${product.deliveryDate} дни` : 'По заявка' }, { icon: CheckCircle2, label: 'Наличност', value: getAvailabilityLabel(product.availability) }].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl px-3 py-3" style={{ background: 'white', border: '1px solid #EDE5DA' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} style={{ color: '#8B6F47' }} />
                      <span className="font-body font-semibold" style={{ fontSize: '0.72rem', color: '#2C2520' }}>{label}</span>
                    </div>
                    <div className="font-body" style={{ fontSize: '0.74rem', color: '#9B9490' }}>{value}</div>
                  </div>
                ))}
              </div>

              <Link href="/каталог/" className="inline-flex items-center gap-2 font-body transition-colors hover:text-walnut" style={{ color: '#9B9490', fontSize: '0.82rem' }}>
                <ArrowLeft size={13} /> Назад към каталога
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: 'white', padding: '56px 0', borderTop: '1px solid #EDE5DA' }}>
          <div className="container-main">
            <h2 className="font-display font-bold heading-gradient mb-6" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>Подобни продукти</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((entry) => (
                <Link key={entry.slug} href={`/produkt/${entry.slug}/`} className="group block bg-white rounded-xl overflow-hidden transition-all hover:-translate-y-1" style={{ border: '1px solid #EDE5DA' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#F5F0E8' }}>
                    <Image src={entry.imageUrl || '/images/hero/hero.png'} alt={entry.productName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
                  </div>
                  <div style={{ padding: '12px 14px 14px' }}>
                    <h3 className="font-body font-bold text-charcoal leading-snug mb-2" style={{ fontSize: '0.84rem' }}>{entry.productName}</h3>
                    <div className="font-display font-bold text-charcoal" style={{ fontSize: '1rem' }}>{formatPrice(entry.priceVat)}</div>
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
