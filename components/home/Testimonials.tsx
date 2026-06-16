'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import testimonials from '@/data/testimonials.json'

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C4A882', fontSize: '1rem', lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center font-display font-bold text-white rounded-full"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #8B6F47 0%, #6B5235 100%)',
        fontSize: size * 0.38,
      }}
    >
      {name.charAt(0)}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const allCards = testimonials.slice(0, 3)

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ backgroundColor: 'var(--color-warm-white)' }}
    >
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow-pill">Отзиви</span>
              <h2
                className="font-display font-bold heading-gradient leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 3rem)' }}
              >
                Какво казват клиентите
              </h2>
            </div>

            {/* Stats banner */}
            <div
              className="flex items-stretch gap-0 rounded-[18px] overflow-hidden self-start md:self-auto"
              style={{ border: '1px solid #EDE5DA', background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
            >
              <div className="flex flex-col items-center justify-center px-6 py-4">
                <div className="font-display font-bold text-charcoal" style={{ fontSize: '1.8rem', lineHeight: 1 }}>5.0</div>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#C4A882', fontSize: '0.75rem' }}>★</span>)}
                </div>
                <div className="font-body mt-1" style={{ fontSize: '0.65rem', color: '#9B9490' }}>Рейтинг</div>
              </div>
              <div style={{ width: 1, background: '#EDE5DA' }} />
              <div className="flex flex-col items-center justify-center px-6 py-4">
                <div className="font-display font-bold text-charcoal" style={{ fontSize: '1.8rem', lineHeight: 1 }}>500+</div>
                <div className="font-body mt-2" style={{ fontSize: '0.65rem', color: '#9B9490' }}>Клиенти</div>
              </div>
              <div style={{ width: 1, background: '#EDE5DA' }} />
              <div className="flex flex-col items-center justify-center px-6 py-4">
                <div className="font-display font-bold text-charcoal" style={{ fontSize: '1.8rem', lineHeight: 1 }}>10+</div>
                <div className="font-body mt-2" style={{ fontSize: '0.65rem', color: '#9B9490' }}>Години</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MOBILE: stacked cards ─── */}
        <div className="md:hidden space-y-4">
          {allCards.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '24px 22px 22px',
                border: '1px solid #EDE5DA',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative quote */}
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: 16,
                  fontFamily: 'var(--font-display)',
                  fontSize: '6rem',
                  color: 'rgba(196,168,130,0.12)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >&ldquo;</span>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <Stars count={t.rating} />
                <p
                  className="font-body italic leading-relaxed mt-3 mb-4"
                  style={{ fontSize: '0.97rem', color: '#4A4642', lineHeight: 1.65 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 pt-3"
                  style={{ borderTop: '1px solid #F0E8DC' }}
                >
                  <Avatar name={t.name} />
                  <div>
                    <div className="font-body font-bold text-charcoal" style={{ fontSize: '0.9rem' }}>{t.name}</div>
                    <div className="font-body" style={{ fontSize: '0.75rem', color: '#9B9490' }}>{t.city}</div>
                  </div>
                  <div
                    className="ml-auto flex items-center gap-1 font-body"
                    style={{ fontSize: '0.65rem', color: '#8B6F47', background: 'rgba(139,111,71,0.08)', border: '1px solid rgba(139,111,71,0.15)', padding: '3px 9px', borderRadius: 100 }}
                  >
                    ✓ Верифициран
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── DESKTOP: 3 equal cards ─── */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {allCards.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12 }}
              style={{
                background: i === 0 ? 'linear-gradient(145deg, #2C2318 0%, #1A1208 100%)' : 'white',
                borderRadius: 24,
                padding: '36px 32px 30px',
                border: i === 0 ? '1px solid rgba(196,168,130,0.2)' : '1px solid #EDE5DA',
                boxShadow: i === 0 ? '0 12px 48px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative quote */}
              <span
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 20,
                  fontFamily: 'var(--font-display)',
                  fontSize: '8rem',
                  color: i === 0 ? 'rgba(196,168,130,0.1)' : 'rgba(139,111,71,0.07)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >&ldquo;</span>

              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Stars count={t.rating} />

                <p
                  className="font-body italic leading-relaxed mt-4 mb-6"
                  style={{
                    fontSize: '0.97rem',
                    color: i === 0 ? 'rgba(255,255,255,0.82)' : '#4A4642',
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: `1px solid ${i === 0 ? 'rgba(255,255,255,0.1)' : '#F0E8DC'}` }}
                >
                  <Avatar name={t.name} size={46} />
                  <div>
                    <div
                      className="font-body font-bold"
                      style={{ fontSize: '0.92rem', color: i === 0 ? 'white' : '#2C2C2C' }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="font-body"
                      style={{ fontSize: '0.75rem', color: i === 0 ? 'rgba(255,255,255,0.45)' : '#9B9490' }}
                    >
                      {t.city}
                    </div>
                  </div>
                  <div
                    className="ml-auto flex items-center gap-1 font-body"
                    style={{
                      fontSize: '0.65rem',
                      color: i === 0 ? 'rgba(196,168,130,0.8)' : '#8B6F47',
                      background: i === 0 ? 'rgba(196,168,130,0.08)' : 'rgba(139,111,71,0.08)',
                      border: `1px solid ${i === 0 ? 'rgba(196,168,130,0.18)' : 'rgba(139,111,71,0.15)'}`,
                      padding: '4px 10px',
                      borderRadius: 100,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✓ Верифициран
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
