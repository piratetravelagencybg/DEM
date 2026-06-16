'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
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
  const preview = products.slice(0, 4)
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
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10"
        >
          <div>
            <span className="eyebrow-pill">Каталог</span>
            <h2 className="font-display font-bold heading-gradient leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5.5vw, 3rem)' }}>
              Готови решения
            </h2>
          </div>
          <Link
            href="/каталог/"
            className="inline-flex items-center gap-2 font-body font-semibold text-walnut hover:text-walnut-dark transition-colors flex-shrink-0"
            style={{ fontSize: '0.9rem' }}
          >
            Виж целия каталог <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {preview.map((product, i) => {
            const discount = product.comparePrice
              ? Math.round((1 - product.price / product.comparePrice) * 100)
              : null
            const catLabel = categoryLabels[product.category] ?? product.category

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.09 }}
              >
                <Link
                  href={`/каталог/${product.slug}/`}
                  className="group flex flex-col bg-white overflow-hidden"
                  style={{
                    borderRadius: 18,
                    border: '1px solid #EDE5DA',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    height: '100%',
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ aspectRatio: '4 / 5', background: '#F5F0E8' }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />

                    {/* Category badge */}
                    <span
                      className="absolute top-3 left-3 font-body font-semibold"
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.06em',
                        background: 'rgba(255,255,255,0.92)',
                        color: '#5C5652',
                        padding: '4px 10px',
                        borderRadius: 100,
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {catLabel}
                    </span>

                    {/* Sale badge */}
                    {discount && (
                      <span
                        className="absolute top-3 right-3 font-body font-bold text-white"
                        style={{
                          fontSize: '0.62rem',
                          background: '#C0512A',
                          padding: '4px 8px',
                          borderRadius: 100,
                        }}
                      >
                        -{discount}%
                      </span>
                    )}

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(12,8,4,0.35)', backdropFilter: 'blur(2px)' }}
                    >
                      <span
                        className="font-body font-semibold text-white"
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,255,255,0.35)',
                          borderRadius: 100,
                          padding: '8px 20px',
                          fontSize: '0.82rem',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        Виж детайли →
                      </span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={11} style={{ color: '#C4A882', fill: '#C4A882' }} />
                      ))}
                      <span className="font-body ml-1" style={{ fontSize: '0.68rem', color: '#8B7E76' }}>5.0</span>
                    </div>

                    <h3
                      className="font-body font-bold text-charcoal leading-snug mb-1"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {product.title}
                    </h3>

                    <p
                      className="font-body line-clamp-2 mb-3"
                      style={{ fontSize: '0.78rem', color: '#7A7068', lineHeight: 1.4, flex: 1 }}
                    >
                      {product.description}
                    </p>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span
                          className="font-display font-bold text-charcoal"
                          style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}
                        >
                          {product.price} лв.
                        </span>
                        {product.comparePrice && (
                          <span
                            className="font-body line-through ml-1.5"
                            style={{ fontSize: '0.8rem', color: '#A09890' }}
                          >
                            {product.comparePrice} лв.
                          </span>
                        )}
                      </div>
                      <span
                        className="font-body font-semibold text-white flex-shrink-0"
                        style={{
                          background: '#8B6F47',
                          borderRadius: 10,
                          padding: '6px 13px',
                          fontSize: '0.78rem',
                        }}
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

        {/* Bottom link row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
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
