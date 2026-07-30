import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import type { MbxCatalogProduct } from '@/lib/mbx-catalog'
import { formatPrice, getAvailabilityLabel, getCategoryLabel } from '@/lib/product-display'

export const CATEGORIES = [
  { id: 'all', label: 'Всички' },
  { id: 'bedroom', label: 'Спални' },
  { id: 'children', label: 'Детски' },
  { id: 'living', label: 'Дневни' },
  { id: 'office', label: 'Офис' },
  { id: 'hallway', label: 'Антре' },
  { id: 'collections', label: 'Колекции' },
  { id: 'bathroom', label: 'Баня' },
  { id: 'other', label: 'Други' },
]

export const SORT_OPTIONS = [
  { id: 'default', label: 'По подразбиране' },
  { id: 'price-asc', label: 'Цена: ниска към висока' },
  { id: 'price-desc', label: 'Цена: висока към ниска' },
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
  product: MbxCatalogProduct
  priority?: boolean
}

function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/каталог/${product.slug}/`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#EAE1D6] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7B1]"
      style={{ boxShadow: '0 5px 18px rgba(45,34,25,0.065)' }}
    >
      <div className="relative aspect-[16/9] flex-shrink-0 overflow-hidden bg-[#F7F3ED]">
        <Image
          src={product.imageUrl || '/images/hero/hero.webp'}
          alt={product.productName}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          sizes="(max-width: 519px) calc(100vw - 32px), (max-width: 640px) 46vw, (max-width: 1024px) 32vw, 24vw"
        />
        <span
          className="absolute left-2 top-2 z-10 rounded-full px-2 py-1 font-body text-[0.56rem] font-semibold leading-none text-white shadow-sm sm:left-2.5 sm:top-2.5 sm:text-[0.62rem]"
          style={{ background: product.availability === 'on_order' ? 'rgba(82,73,65,0.82)' : 'rgba(65,117,78,0.92)', backdropFilter: 'blur(8px)' }}
        >
          {getAvailabilityLabel(product.availability)}
        </span>
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 text-walnut shadow-md backdrop-blur-sm transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={14} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="mb-1 truncate font-body text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-walnut sm:text-[0.6rem]">
          {getCategoryLabel(product.categoryHierarchy[0] || product.categoryText)}
        </p>
        <h2
          className="font-body text-[0.9rem] font-semibold leading-[1.35] text-charcoal transition-colors group-hover:text-walnut"
          style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', minHeight: '2.2rem' }}
        >
          {product.productName}
        </h2>
        <div className="mt-2.5 flex items-end justify-between gap-1">
          <span className="font-body text-[1.08rem] font-bold leading-none tracking-[-0.02em] text-charcoal sm:text-[1.12rem]">
            {formatPrice(product.priceVat)}
          </span>
          <span className="hidden font-body text-[0.65rem] font-semibold text-walnut sm:inline">Детайли</span>
        </div>
      </div>
    </Link>
  )
}

type CatalogClientProps = {
  products: MbxCatalogProduct[]
  activeCategory: string
  sortBy: string
  categoryCounts: Record<string, number>
  totalProducts: number
  page: number
  totalPages: number
}

export default function CatalogClient({ products, activeCategory, sortBy, categoryCounts, totalProducts, page, totalPages }: CatalogClientProps) {
  const visibleCategories = CATEGORIES.filter((category) => category.id === 'all' || (categoryCounts[category.id] ?? 0) > 0)
  const activeCategoryLabel = CATEGORIES.find((category) => category.id === activeCategory)?.label ?? 'Всички'
  const selectedSortLabel = SORT_OPTIONS.find((option) => option.id === sortBy)?.label ?? 'По подразбиране'
  const formattedTotal = totalProducts.toLocaleString('bg-BG')

  return (
    <div>
      <section
        className="relative overflow-hidden pb-5 pt-[4.85rem] md:pb-10 md:pt-[7rem]"
        style={{ background: 'linear-gradient(145deg, #F7F3EC 0%, #EEE4D6 58%, #E4D4BD 100%)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#8B6F47]/10 blur-[70px] md:h-[350px] md:w-[350px]" />
        <div className="container-main relative">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[760px]">
              <span className="eyebrow-pill !mb-2.5">
                <ShoppingBag size={10} />
                Каталог от MBX
              </span>
              <h1 className="heading-gradient font-display text-[1.85rem] font-bold leading-[1.08] sm:text-[2.15rem] md:text-[2.8rem]">
                Мебели по поръчка и готови модели
              </h1>
              <p className="mt-2 font-body text-[0.83rem] leading-relaxed text-warm-gray sm:text-[0.95rem]">
                <span className="md:hidden">{categoryCounts.all.toLocaleString('bg-BG')} модела · актуални цени и наличности</span>
                <span className="hidden md:inline">Реални продукти от MBX · Варианти, цени и наличност · Показани {Math.min(products.length, totalProducts)} от {formattedTotal}</span>
              </p>
            </div>
            <div className="hidden flex-shrink-0 items-center gap-6 border-l border-walnut/20 pl-8 md:flex">
              {[{ n: `${categoryCounts.all.toLocaleString('bg-BG')}+`, l: 'Продукта' }, { n: 'Синхр.', l: 'От MBX' }, { n: 'EUR', l: 'Цена' }].map((stat) => (
                <div key={stat.l} className="text-center">
                  <div className="font-display text-[1.6rem] font-bold leading-none text-walnut">{stat.n}</div>
                  <div className="mt-0.5 font-body text-[0.62rem] uppercase tracking-[0.1em] text-[#9B9490]">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-[#E8DED2] bg-white/95 shadow-[0_4px_18px_rgba(44,34,25,0.06)] backdrop-blur-xl lg:top-20">
        <div className="lg:hidden">
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-[#EEE6DC] px-4 py-2.5">
            {visibleCategories.map((category) => {
              const active = activeCategory === category.id
              return (
                <Link
                  key={category.id}
                  href={buildCatalogHref({ category: category.id, sort: sortBy, page: 1 })}
                  className="flex flex-shrink-0 items-center rounded-full px-3.5 py-2 font-body text-[0.76rem] font-semibold leading-none transition-colors"
                  style={{
                    background: active ? '#2C241D' : '#F8F5F0',
                    color: active ? '#FFFFFF' : '#5A5450',
                    border: active ? '1px solid #2C241D' : '1px solid #E5DACE',
                  }}
                >
                  {category.label}
                  {category.id !== 'all' && <span className="ml-1.5 text-[0.62rem] opacity-60">{categoryCounts[category.id] ?? 0}</span>}
                </Link>
              )
            })}
          </div>

          <div className="container-main flex h-12 items-center justify-between gap-3">
            <div className="min-w-0 font-body">
              <span className="block truncate text-[0.73rem] font-semibold text-charcoal">{activeCategoryLabel}</span>
              <span className="block text-[0.59rem] text-warm-gray">{formattedTotal} продукта</span>
            </div>

            <details className="catalog-sort relative flex-shrink-0">
              <summary className="flex h-9 max-w-[190px] cursor-pointer select-none items-center gap-1.5 rounded-xl border border-[#DED2C4] bg-white px-3 font-body text-[0.72rem] font-semibold text-charcoal shadow-sm">
                <SlidersHorizontal size={14} className="flex-shrink-0 text-walnut" />
                <span className="truncate">{selectedSortLabel}</span>
                <ChevronDown size={13} className="catalog-sort-chevron flex-shrink-0 text-warm-gray transition-transform" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[245px] overflow-hidden rounded-2xl border border-[#E4D9CD] bg-white p-1.5 shadow-[0_16px_45px_rgba(39,30,22,0.18)]">
                {SORT_OPTIONS.map((option) => {
                  const selected = sortBy === option.id
                  return (
                    <Link
                      key={option.id}
                      href={buildCatalogHref({ category: activeCategory, sort: option.id, page: 1 })}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 font-body text-[0.78rem] font-medium transition-colors hover:bg-[#F7F2EB]"
                      style={{ color: selected ? '#8B6F47' : '#4E4843', background: selected ? '#F5EFE7' : undefined }}
                    >
                      {option.label}
                      {selected && <Check size={14} />}
                    </Link>
                  )
                })}
              </div>
            </details>
          </div>
        </div>

        <div className="container-main hidden items-center justify-between gap-4 py-3 lg:flex">
          <div className="flex flex-wrap items-center gap-2">
            {visibleCategories.map((category) => {
              const active = activeCategory === category.id
              return (
                <Link
                  key={category.id}
                  href={buildCatalogHref({ category: category.id, sort: sortBy, page: 1 })}
                  className="flex-shrink-0 rounded-full px-3.5 py-1.5 font-body text-[0.8rem] font-medium transition-all duration-200"
                  style={{ background: active ? '#8B6F47' : 'transparent', color: active ? '#FFFFFF' : '#5A5450', border: `1px solid ${active ? '#8B6F47' : '#DDD4C8'}`, boxShadow: active ? '0 3px 10px rgba(139,111,71,0.22)' : 'none' }}
                >
                  {category.label}
                  {category.id !== 'all' && <span className="ml-1 text-[0.7rem] opacity-65">{categoryCounts[category.id] ?? 0}</span>}
                </Link>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {SORT_OPTIONS.map((option) => {
              const selected = sortBy === option.id
              return (
                <Link
                  key={option.id}
                  href={buildCatalogHref({ category: activeCategory, sort: option.id, page: 1 })}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 font-body text-[0.8rem] font-medium transition-all duration-200"
                  style={{ background: selected ? '#F8F3EB' : '#FFFFFF', color: selected ? '#8B6F47' : '#5A5450', border: `1px solid ${selected ? '#8B6F47' : '#DDD4C8'}` }}
                >
                  {option.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <section className="container-main pb-8 pt-4 md:py-10" aria-label="Продукти">
        <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {products.map((product, index) => <ProductCard key={product.slug} product={product} priority={index < 2} />)}
        </div>
      </section>

      <div className="container-main pb-24 md:pb-10">
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#EDE5DA] bg-white p-4 sm:flex-row">
          <div className="font-body text-sm text-slate-600">Страница {page} от {totalPages} — общо {formattedTotal} продукта</div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link href={buildCatalogHref({ category: activeCategory, sort: sortBy, page: page - 1 })} className="rounded-full border border-[#EDE5DA] bg-white px-4 py-2 font-body font-semibold text-[#5A5450] hover:bg-[#F8F3EB]">Назад</Link>
            )}
            {page < totalPages && (
              <Link href={buildCatalogHref({ category: activeCategory, sort: sortBy, page: page + 1 })} className="rounded-full border border-[#EDE5DA] bg-white px-4 py-2 font-body font-semibold text-[#5A5450] hover:bg-[#F8F3EB]">Напред</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
