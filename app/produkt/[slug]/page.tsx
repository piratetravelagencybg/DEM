import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, CheckCircle2, Package, Truck, ArrowLeft } from 'lucide-react'
import { buildProductContent, buildProductMetadata, buildProductStructuredData, formatPrice, getAvailabilityLabel, getCategoryLabel, getMbxGroupById, getMbxProductBySlug, getRelatedMbxProducts } from '@/lib/mbx'
import ProductGallery from '@/components/product/ProductGallery'
import SafeProductImage from '@/components/product/SafeProductImage'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

interface Props { params: { slug: string } }

export const dynamicParams = true
export const revalidate = 86400

export function generateStaticParams() {
  return []
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getMbxProductBySlug(params.slug)
  if (!product) return {}
  return buildProductMetadata(product)
}

export default function ProductPage({ params }: Props) {
  const product = getMbxProductBySlug(params.slug)
  if (!product) notFound()

  const group = getMbxGroupById(product.itemGroupId)
  const variants = group?.variants.filter((variant) => variant.active) || [product]
  const orderedVariants = [product, ...variants.filter((variant) => variant.slug !== product.slug)]
  const visibleVariants = orderedVariants.slice(0, 12)
  const hiddenVariantCount = Math.max(0, orderedVariants.length - visibleVariants.length)
  const content = buildProductContent(product)
  const related = getRelatedMbxProducts(product)

  const productSchema = buildProductStructuredData(product, visibleVariants)

  return (
    <div style={{ background: 'var(--color-cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Готови мебели', url: 'https://domexpertmebel.com/готови-мебели/' },
        { name: product.productName, url: 'https://domexpertmebel.com/каталог/' + product.slug + '/' },
      ]} />
      <section style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="container-main">
          <nav className="flex items-center gap-2 font-body mb-6" style={{ fontSize: '0.75rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/готови-мебели/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Готови мебели</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{product.productName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-24">
              <ProductGallery
                productName={product.productName}
                primaryImage={product.imageUrl}
                images={product.imageAlternatives}
              />
            </div>

            <div>
              <span className="eyebrow-pill">{getCategoryLabel(product.categoryHierarchy[0] || product.categoryText)}</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-2" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>{product.productName}</h1>
              <p className="font-body mt-3 text-warm-gray" style={{ lineHeight: 1.75 }}>{content.summary}</p>

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
                    {visibleVariants.map((variant) => (
                      <Link
                        key={variant.itemId}
                        href={'/каталог/' + variant.slug + '/'}
                        aria-current={variant.slug === product.slug ? 'page' : undefined}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:border-walnut/40"
                        style={{ background: variant.slug === product.slug ? '#EFE4D5' : 'var(--color-cream)', border: '1px solid #EDE5DA' }}
                      >
                        <div>
                          <div className="font-body font-semibold" style={{ fontSize: '0.86rem', color: '#2C2520' }}>{variant.productName}</div>
                          <div className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>SKU: {variant.productNo || variant.itemId}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-body font-semibold" style={{ fontSize: '0.88rem', color: '#2C2520' }}>{formatPrice(variant.priceVat)}</div>
                          <div className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>{getAvailabilityLabel(variant.availability)}</div>
                        </div>
                      </Link>
                    ))}
                    {hiddenVariantCount > 0 && (
                      <p className="rounded-xl bg-[#F8F3EB] px-3 py-2.5 font-body text-xs leading-relaxed text-warm-gray">
                        Още {hiddenVariantCount} варианта са налични. Свържете се с нас и ще ви помогнем да изберете точния размер, декор и конфигурация.
                      </p>
                    )}
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

              <Link href="/готови-мебели/" className="inline-flex items-center gap-2 font-body transition-colors hover:text-walnut" style={{ color: '#9B9490', fontSize: '0.82rem' }}>
                <ArrowLeft size={13} /> Назад към готовите мебели
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EDE5DA] bg-white py-10 md:py-14" aria-labelledby="product-details-heading">
        <div className="container-main grid gap-7 lg:grid-cols-[1.6fr_0.8fr] lg:gap-12">
          <div>
            <span className="eyebrow-pill">Информация за продукта</span>
            <h2 id="product-details-heading" className="mt-3 font-display text-2xl font-bold text-charcoal md:text-3xl">
              Подробности и поръчка
            </h2>
            <div className="mt-4 space-y-4 font-body text-[0.94rem] leading-7 text-warm-gray">
              {content.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-[#E5DACE] bg-[#F8F3EB] p-5" aria-label="Основни данни">
            <h3 className="font-display text-lg font-bold text-charcoal">Основни данни</h3>
            <dl className="mt-4 space-y-3 font-body text-sm">
              {[
                ['Вид', content.typeLabel],
                ['Производител', content.manufacturer],
                ['Колекция', content.collection || '—'],
                ['Каталожен номер', content.sku],
                ['Статус', getAvailabilityLabel(product.availability)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-[#E5DACE] pb-2 last:border-0 last:pb-0">
                  <dt className="text-warm-gray">{label}</dt>
                  <dd className="text-right font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: 'white', padding: '56px 0', borderTop: '1px solid #EDE5DA' }}>
          <div className="container-main">
            <h2 className="font-display font-bold heading-gradient mb-6" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>Подобни продукти</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((entry) => (
                <Link key={entry.slug} href={`/каталог/${entry.slug}/`} className="group block bg-white rounded-xl overflow-hidden transition-all hover:-translate-y-1" style={{ border: '1px solid #EDE5DA' }}>
                  <div className="relative overflow-hidden p-2" style={{ aspectRatio: '4 / 3', background: '#F5F0E8' }}>
                    <SafeProductImage src={entry.imageUrl} alt={entry.productName} fill className="object-contain transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width:768px) 50vw, 300px" />
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
