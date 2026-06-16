'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, SlidersHorizontal, ChevronDown, Package, ShoppingBag } from 'lucide-react'
import WishlistButton from '@/components/ui/WishlistButton'
import products from '@/data/products.json'

// ── Config ─────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'Всички' },
  { id: 'divani', label: 'Дивани' },
  { id: 'masi', label: 'Маси' },
  { id: 'stolove', label: 'Столове' },
  { id: 'tv-shkafove', label: 'ТВ шкафове' },
]

const CATEGORY_LABELS: Record<string, string> = {
  divani: 'Диван',
  masi: 'Маса',
  stolove: 'Стол',
  'tv-shkafove': 'ТВ шкаф',
  garderob: 'Гардероб',
}

const SORT_OPTIONS = [
  { id: 'default', label: 'По подразбиране' },
  { id: 'price-asc', label: 'Цена ↑ ниска' },
  { id: 'price-desc', label: 'Цена ↓ висока' },
  { id: 'name', label: 'По азбучен ред' },
  { id: 'new', label: 'Нови първо' },
]

// ── Product Card ───────────────────────────────────────
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  return (
    <Link
      href={`/каталог/${product.slug}/`}
      className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ borderRadius: 16, border: '1px solid #EDE5DA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '1', background: 'var(--color-cream)' }}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.65) 0%, transparent 55%)' }}
        >
          <span
            className="font-body font-semibold text-white flex items-center gap-1"
            style={{ fontSize: '0.76rem' }}
          >
            Виж <ArrowRight size={12} />
          </span>
        </div>

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discount && (
            <span
              className="font-body font-bold text-white"
              style={{ fontSize: '0.62rem', background: '#C44B4B', padding: '2px 8px', borderRadius: 100 }}
            >
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span
              className="font-body font-bold text-white"
              style={{ fontSize: '0.62rem', background: '#8B6F47', padding: '2px 8px', borderRadius: 100 }}
            >
              Ново
            </span>
          )}
        </div>

        {/* Wishlist */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton productId={product.id} />
        </div>

        {/* Stock */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span
            className="font-body font-semibold"
            style={{
              fontSize: '0.6rem',
              padding: '2px 8px',
              borderRadius: 100,
              background: product.inStock ? 'rgba(74,124,89,0.9)' : 'rgba(90,84,80,0.65)',
              color: 'white',
            }}
          >
            {product.inStock ? '● В наличност' : '○ По заявка'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <p
          className="font-body font-semibold text-walnut uppercase mb-1"
          style={{ fontSize: '0.58rem', letterSpacing: '0.09em' }}
        >
          {CATEGORY_LABELS[product.category] || product.category}
        </p>
        <h2
          className="font-display font-semibold text-charcoal mb-2 leading-tight group-hover:text-walnut transition-colors"
          style={{ fontSize: '0.92rem', flex: 1 }}
        >
          {product.title}
        </h2>
        <div className="flex items-end gap-1.5">
          <span
            className="font-display font-bold text-charcoal"
            style={{ fontSize: '1.15rem', lineHeight: 1 }}
          >
            {product.price} лв.
          </span>
          {product.comparePrice && (
            <span
              className="font-body text-warm-gray line-through"
              style={{ fontSize: '0.78rem', paddingBottom: 1 }}
            >
              {product.comparePrice} лв.
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Main component ─────────────────────────────────────
export default function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [sortOpen, setSortOpen] = useState(false)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat.id] = products.filter((p) => p.category === cat.id).length
    })
    return counts
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory)
    switch (sortBy) {
      case 'price-asc':  return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'name':       return result.sort((a, b) => a.title.localeCompare(b.title, 'bg'))
      case 'new':        return result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default:           return result
    }
  }, [activeCategory, sortBy])

  return (
    <div>

      {/* ── Compact Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '5.5rem',
          paddingBottom: '2.5rem',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-60px', right: '-40px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.09)', filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            {/* Left: title */}
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: 10 }}>
                <ShoppingBag size={10} style={{ marginRight: 2 }} />
                Онлайн магазин
              </span>
              <h1
                className="font-display font-bold heading-gradient leading-tight"
                style={{ fontSize: 'clamp(1.7rem, 5vw, 2.8rem)', marginBottom: 8 }}
              >
                Готови мебели на склад
              </h1>
              <p className="font-body text-warm-gray" style={{ fontSize: '0.95rem' }}>
                Бърза доставка · Гаранция 2 години · {products.length}+ продукта
              </p>
            </div>

            {/* Right: stats (desktop only) */}
            <div
              className="hidden md:flex items-center gap-6 flex-shrink-0"
              style={{ paddingLeft: 32, borderLeft: '1px solid rgba(139,111,71,0.2)' }}
            >
              {[
                { n: `${products.length}+`, l: 'Продукта' },
                { n: '3–5', l: 'Дни доставка' },
                { n: '2 г.', l: 'Гаранция' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display font-bold" style={{ fontSize: '1.6rem', color: '#8B6F47', lineHeight: 1 }}>
                    {s.n}
                  </div>
                  <div className="font-body mt-0.5" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9490' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky filter bar — single row with horizontal scroll ── */}
      <div
        className="sticky top-16 lg:top-20 z-30"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid #EDE5DA',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div className="container-main">
          <div className="flex items-center py-2.5 gap-0">

            {/* Horizontally scrolling category pills — NO wrapping */}
            <div
              className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar"
              style={{ paddingRight: 12, minWidth: 0 }}
            >
              {CATEGORIES.filter((c) => c.id === 'all' || (categoryCounts[c.id] ?? 0) > 0).map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="font-body font-medium transition-all duration-200 flex-shrink-0"
                    style={{
                      padding: '5px 13px',
                      borderRadius: 100,
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                      background: isActive ? '#8B6F47' : 'transparent',
                      color: isActive ? 'white' : '#5A5450',
                      border: `1px solid ${isActive ? '#8B6F47' : '#DDD4C8'}`,
                      boxShadow: isActive ? '0 3px 10px rgba(139,111,71,0.28)' : 'none',
                    }}
                  >
                    {cat.label}
                    {cat.id !== 'all' && (
                      <span style={{ opacity: 0.65, marginLeft: 4, fontSize: '0.7rem' }}>
                        {categoryCounts[cat.id] ?? 0}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Sort — fixed right, never scrolls away */}
            <div
              className="flex-shrink-0 relative"
              style={{ paddingLeft: 10, borderLeft: '1px solid #EDE5DA' }}
            >
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 font-body font-medium"
                style={{
                  padding: '5px 12px',
                  borderRadius: 100,
                  fontSize: '0.8rem',
                  border: '1px solid #DDD4C8',
                  color: '#5A5450',
                  background: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                <SlidersHorizontal size={12} />
                <span className="hidden sm:inline">
                  {SORT_OPTIONS.find((o) => o.id === sortBy)?.label ?? 'Сортиране'}
                </span>
                <ChevronDown size={12} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
                    style={{ minWidth: 210, border: '1px solid #EDE5DA' }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setSortBy(opt.id); setSortOpen(false) }}
                        className="w-full text-left font-body transition-colors hover:bg-cream"
                        style={{
                          padding: '11px 16px',
                          fontSize: '0.85rem',
                          color: sortBy === opt.id ? '#8B6F47' : '#3C2A18',
                          fontWeight: sortBy === opt.id ? 600 : 400,
                          background: sortBy === opt.id ? 'rgba(139,111,71,0.06)' : 'transparent',
                        }}
                      >
                        {opt.label}
                        {sortBy === opt.id && (
                          <span style={{ float: 'right', color: '#8B6F47' }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results count — compact single line */}
          <p
            className="font-body text-warm-gray pb-2"
            style={{ fontSize: '0.72rem' }}
          >
            {filtered.length === 0
              ? 'Няма намерени продукти'
              : `${filtered.length} ${filtered.length === 1 ? 'продукт' : 'продукта'}`}
          </p>
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(139,111,71,0.08)' }}
              >
                <Package size={28} style={{ color: '#C4A882' }} />
              </div>
              <h3 className="font-display font-semibold text-charcoal text-lg mb-2">
                Няма продукти в тази категория
              </h3>
              <p className="font-body text-warm-gray mb-5 text-sm">
                Скоро добавяме нови продукти.
              </p>
              <button onClick={() => setActiveCategory('all')} className="btn-primary">
                Виж всички
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
