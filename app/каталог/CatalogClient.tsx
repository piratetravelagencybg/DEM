import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package, ShoppingBag } from 'lucide-react'
import type { MbxVariant } from '@/lib/mbx'
import { formatPrice, getAvailabilityLabel, getCategoryLabel } from '@/lib/mbx'

export const CATEGORIES = [
  { id: 'all', label: 'Всички' },
  { id: 'спалня', label: 'Спални' },
  { id: 'гардероб', label: 'Гардероби' },
  { id: 'маса', label: 'Маси' },
  { id: 'стол', label: 'Столове' },
  { id: 'тв', label: 'ТВ шкафове' },
]

export const SORT_OPTIONS = [
  { id: 'default', label: 'По подразбиране' },
  { id: 'price-asc', label: 'Цена ↑ ниска' },
  { id: 'price-desc', label: 'Цена ↓ висока' },
  { id: 'name', label: 'По азбучен ред' },
]

function buildCatalogHref({ category, sort, page }: { category: string; sort: string; page: number }) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (sort && sort !== 'default') params.set('sort', sort)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/каталог/?${query}` : '/каталог/'
}

type ProductCardProps = {
  product: MbxVariant
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produkt/${product.slug}/`} className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ borderRadius: 16, border: '1px solid #EDE5DA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '1', background: 'var(--color-cream)' }}>
        <Image src={product.imageUrl || '/images/hero/hero.png'} alt={product.productName} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        <div className="absolute inset-0 flex items-end justify-center pb-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.65) 0%, transparent 55%)' }}>
          <span className="font-body font-semibold text-white flex items-center gap-1" style={{ fontSize: '0.76rem' }}>Виж <ArrowRight size={12} /></span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="font-body font-semibold" style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: 100, background: product.availability === 'on_order' ? 'rgba(90,84,80,0.65)' : 'rgba(74,124,89,0.9)', color: 'white' }}>
            {getAvailabilityLabel(product.availability)}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <p className="font-body font-semibold text-walnut uppercase mb-1" style={{ fontSize: '0.58rem', letterSpacing: '0.09em' }}>{getCategoryLabel(product.categoryHierarchy[0] || product.categoryText)}</p>
        <h2 className="font-display font-semibold text-charcoal mb-2 leading-tight group-hover:text-walnut transition-colors" style={{ fontSize: '0.92rem', flex: 1 }}>{product.productName}</h2>
        <div className="flex items-end gap-1.5">
          <span className="font-display font-bold text-charcoal" style={{ fontSize: '1.15rem', lineHeight: 1 }}>{formatPrice(product.priceVat)}</span>
        </div>
      </div>
    </Link>
  )
}

type CatalogClientProps = {
  products: MbxVariant[]
  activeCategory: string
  sortBy: string
  categoryCounts: Record<string, number>
  totalProducts: number
  page: number
  totalPages: number
}

export default function CatalogClient({ products, activeCategory, sortBy, categoryCounts, totalProducts, page, totalPages }: CatalogClientProps) {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)', paddingTop: '5.5rem', paddingBottom: '2.5rem' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-60px', right: '-40px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(139,111,71,0.09)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container-main relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: 10 }}>
                <ShoppingBag size={10} style={{ marginRight: 2 }} />
                Каталог от MBX
              </span>
              <h1 className="font-display font-bold heading-gradient leading-tight" style={{ fontSize: 'clamp(1.7rem, 5vw, 2.8rem)', marginBottom: 8 }}>Мебели по поръчка и каталожни модели</h1>
              <p className="font-body text-warm-gray" style={{ fontSize: '0.95rem' }}>Реални продукти от MBX · Варианти, цени и наличност · Показани {Math.min(products.length, totalProducts)} от {totalProducts}</p>
            </div>
            <div className="hidden md:flex items-center gap-6 flex-shrink-0" style={{ paddingLeft: 32, borderLeft: '1px solid rgba(139,111,71,0.2)' }}>
              {[{ n: `${totalProducts}+`, l: 'Продукта' }, { n: 'Синхр.', l: 'От MBX' }, { n: 'EUR', l: 'Цена' }].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display font-bold" style={{ fontSize: '1.6rem', color: '#8B6F47', lineHeight: 1 }}>{s.n}</div>
                  <div className="font-body mt-0.5" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9490' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 lg:top-20 z-30" style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid #EDE5DA', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.filter((c) => c.id === 'all' || (categoryCounts[c.id] ?? 0) > 0).map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <Link key={cat.id} href={buildCatalogHref({ category: cat.id, sort: sortBy, page: 1 })} className="font-body font-medium transition-all duration-200 flex-shrink-0" style={{ padding: '5px 13px', borderRadius: 100, fontSize: '0.8rem', whiteSpace: 'nowrap', background: isActive ? '#8B6F47' : 'transparent', color: isActive ? 'white' : '#5A5450', border: `1px solid ${isActive ? '#8B6F47' : '#DDD4C8'}`, boxShadow: isActive ? '0 3px 10px rgba(139,111,71,0.28)' : 'none' }}>
                    {cat.label}
                    {cat.id !== 'all' && <span style={{ opacity: 0.65, marginLeft: 4, fontSize: '0.7rem' }}>{categoryCounts[cat.id] ?? 0}</span>}
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sortBy === opt.id
                return (
                  <Link key={opt.id} href={buildCatalogHref({ category: activeCategory, sort: opt.id, page: 1 })} className="font-body font-medium transition-all duration-200" style={{ padding: '5px 12px', borderRadius: 100, fontSize: '0.8rem', whiteSpace: 'nowrap', background: isSelected ? '#F8F3EB' : 'white', color: isSelected ? '#8B6F47' : '#5A5450', border: `1px solid ${isSelected ? '#8B6F47' : '#DDD4C8'}` }}>
                    {opt.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="container-main py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <div className="container-main pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#EDE5DA] bg-white p-4">
          <div className="font-body text-sm text-slate-600">Страница {page} от {totalPages} — общо {totalProducts} продукта</div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link href={buildCatalogHref({ category: activeCategory, sort: sortBy, page: page - 1 })} className="font-body font-semibold px-4 py-2 rounded-full border border-[#EDE5DA] bg-white text-[#5A5450] hover:bg-[#F8F3EB]">Назад</Link>
            )}
            {page < totalPages && (
              <Link href={buildCatalogHref({ category: activeCategory, sort: sortBy, page: page + 1 })} className="font-body font-semibold px-4 py-2 rounded-full border border-[#EDE5DA] bg-white text-[#5A5450] hover:bg-[#F8F3EB]">Напред</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
