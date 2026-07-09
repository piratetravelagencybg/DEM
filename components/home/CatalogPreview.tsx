'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import products from '@/data/products.json'

const categoryLabels: Record<string, string> = {
  stolove: 'Столове',
  masi: 'Маси',
  divani: 'Дивани',
  'tv-shkafove': 'ТВ шкафове',
}

export default function CatalogPreview() {
  const preview = products.slice(0, 6)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-4 mb-7"
        >
          <div>
            <span className="eyebrow-pill">Каталог</span>
            <h2
              className="font-display font-bold heading-gradient leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
            >
              Готови решения
            </h2>
          </div>
          <Link
            href="/каталог/"
            className="hidden sm:inline-flex items-center gap-1.5 font-body font-semibold text-walnut flex-shrink-0 hover:opacity-75 transition-opacity"
            style={{ fontSize: '0.88rem' }}
          >
            Виж всички <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* ── MOBILE: horizontal scroll ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:hidden -mx-5 px-5"
        >
          <div
            className="flex gap-3 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {preview.map((product, i) => {
              const discount = product.comparePrice
                ? Math.round((1 - product.price / product.comparePrice) * 100)
                : null
              const catLabel = categoryLabels[product.category] ?? product.category

              return (
                <Link
                  key={product.id}
                  href={`/каталог/${product.slug}/`}
                  className="group flex-shrink-0 bg-white overflow-hidden"
                  style={{
                    width: 170,
                    borderRadius: 16,
                    border: '1px solid #EDE5DA',
                    scrollSnapAlign: 'start',
                  }}
                >
                  {/* Square image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#F5F0E8' }}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-105"
                      sizes="170px"
                    />
                    {/* Category */}
                    <span
                      className="absolute top-2.5 left-2.5 font-body font-semibold"
                      style={{
                        fontSize: '0.58rem', letterSpacing: '0.05em',
                        background: 'rgba(255,255,255,0.92)', color: '#5C5652',
                        padding: '3px 8px', borderRadius: 100,
                      }}
                    >
                      {catLabel}
                    </span>
                    {discount && (
                      <span
                        className="absolute top-2.5 right-2.5 font-body font-bold text-white"
                        style={{ fontSize: '0.58rem', background: '#C0512A', padding: '3px 7px', borderRadius: 100 }}
                      >
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '10px 12px 12px' }}>
                    <h3
                      className="font-body font-bold text-charcoal leading-snug mb-2"
                      style={{ fontSize: '0.82rem' }}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-display font-bold text-charcoal" style={{ fontSize: '1rem' }}>
                        {product.price} лв.
                      </span>
                      <span
                        className="font-body font-semibold text-white flex-shrink-0"
                        style={{ background: '#8B6F47', borderRadius: 8, padding: '5px 10px', fontSize: '0.72rem' }}
                      >
                        Заяви →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* ── DESKTOP: 4-col grid ── */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {preview.slice(0, 4).map((product, i) => {
            const discount = product.comparePrice
              ? Math.round((1 - product.price / product.comparePrice) * 100)
              : null
            const catLabel = categoryLabels[product.category] ?? product.category

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  href={`/каталог/${product.slug}/`}
                  className="group block bg-white overflow-hidden"
                  style={{ borderRadius: 18, border: '1px solid #EDE5DA', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                >
                  {/* Square image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#F5F0E8' }}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="25vw"
                    />
                    <span
                      className="absolute top-3 left-3 font-body font-semibold"
                      style={{
                        fontSize: '0.62rem', letterSpacing: '0.06em',
                        background: 'rgba(255,255,255,0.92)', color: '#5C5652',
                        padding: '4px 10px', borderRadius: 100, backdropFilter: 'blur(8px)',
                      }}
                    >
                      {catLabel}
                    </span>
                    {discount && (
                      <span
                        className="absolute top-3 right-3 font-body font-bold text-white"
                        style={{ fontSize: '0.62rem', background: '#C0512A', padding: '4px 8px', borderRadius: 100 }}
                      >
                        -{discount}%
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(12,8,4,0.32)', backdropFilter: 'blur(2px)' }}
                    >
                      <span
                        className="font-body font-semibold text-white"
                        style={{
                          background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.35)',
                          borderRadius: 100, padding: '8px 20px', fontSize: '0.82rem', backdropFilter: 'blur(8px)',
                        }}
                      >
                        Виж детайли →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3
                      className="font-body font-bold text-charcoal leading-snug mb-3"
                      style={{ fontSize: '0.92rem' }}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-display font-bold text-charcoal" style={{ fontSize: '1.1rem' }}>
                          {product.price} лв.
                        </span>
                        {product.comparePrice && (
                          <span className="font-body line-through ml-1.5" style={{ fontSize: '0.8rem', color: '#A09890' }}>
                            {product.comparePrice} лв.
                          </span>
                        )}
                      </div>
                      <span
                        className="font-body font-semibold text-white flex-shrink-0"
                        style={{ background: '#8B6F47', borderRadius: 10, padding: '6px 14px', fontSize: '0.78rem' }}
                      >
                        Заяви →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex justify-center mt-8"
        >
          <Link
            href="/каталог/"
            className="inline-flex items-center gap-2 font-body font-semibold px-7 py-3 rounded-full text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#8B6F47', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(139,111,71,0.35)' }}
          >
            Разгледай всички продукти <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
