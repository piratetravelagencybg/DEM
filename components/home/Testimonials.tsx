'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import testimonials from '@/data/testimonials.json'

const items = testimonials.slice(0, 3)

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-py" style={{ background: 'var(--color-cream)' }}>
      <div className="container-main">

        {/* ── Header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6"
        >
          <div>
            <span className="eyebrow-pill">Отзиви</span>
            <h2
              className="font-display font-bold heading-gradient leading-tight mt-1"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)' }}
            >
              Какво казват клиентите
            </h2>
          </div>

          {/* Google rating badge */}
          <div
            className="inline-flex items-center gap-2 flex-shrink-0"
            style={{
              background: 'white',
              border: '1px solid #EAE0D4',
              borderRadius: 100,
              padding: '8px 16px',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ color: '#C4A882', fontSize: '0.78rem', letterSpacing: 2 }}>★★★★★</span>
            <span className="font-body font-semibold" style={{ fontSize: '0.78rem', color: '#3C3530' }}>5.0</span>
            <span style={{ width: 1, height: 14, background: '#EAE0D4' }} />
            <span className="font-body" style={{ fontSize: '0.72rem', color: '#9B9490' }}>500+ отзива</span>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.08 }}
              className="flex flex-col"
              style={{
                background: i === 0 ? 'linear-gradient(150deg, #2C2318 0%, #1A1208 100%)' : 'white',
                border: i === 0 ? '1px solid rgba(196,168,130,0.18)' : '1px solid #EAE0D4',
                borderRadius: 18,
                padding: '22px 22px 20px',
                boxShadow: i === 0 ? '0 8px 32px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[0,1,2,3,4].map(s => (
                  <span key={s} style={{ color: '#C4A882', fontSize: '0.78rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-body italic flex-1"
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: i === 0 ? 'rgba(255,255,255,0.82)' : '#4A4540',
                  marginBottom: 16,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-2.5"
                style={{
                  paddingTop: 14,
                  borderTop: `1px solid ${i === 0 ? 'rgba(255,255,255,0.1)' : '#F0E8DC'}`,
                }}
              >
                {/* Avatar */}
                <div
                  className="flex-shrink-0 flex items-center justify-center font-display font-bold text-white rounded-full"
                  style={{
                    width: 34, height: 34,
                    background: i === 0
                      ? 'rgba(196,168,130,0.25)'
                      : 'linear-gradient(135deg, #8B6F47, #6B5235)',
                    fontSize: '0.82rem',
                    color: i === 0 ? 'rgba(255,255,255,0.9)' : 'white',
                    border: i === 0 ? '1px solid rgba(196,168,130,0.3)' : 'none',
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div style={{ lineHeight: 1.3 }}>
                  <div
                    className="font-body font-semibold"
                    style={{ fontSize: '0.82rem', color: i === 0 ? 'white' : '#2C2520' }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="font-body"
                    style={{ fontSize: '0.68rem', color: i === 0 ? 'rgba(255,255,255,0.42)' : '#A09890' }}
                  >
                    {t.city}&nbsp;·&nbsp;✓ Верифициран
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
