'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '10+', label: 'Години опит' },
  { value: '500+', label: 'Проекта' },
  { value: '100%', label: 'Доволни клиенти' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ backgroundColor: 'var(--color-warm-white)' }}
    >
      <div className="container-main">

        {/* ── Main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
          style={{
            borderRadius: 24,
            background: '#1C1410',
            minHeight: 420,
          }}
        >
          {/* Background image */}
          <Image
            src="/images/real/spalna-08.png"
            alt="Спалня по поръчка Dom Expert Мебел"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* Gradient overlay — dark bottom, lighter top */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(170deg, rgba(12,8,4,0.18) 0%, rgba(12,8,4,0.55) 55%, rgba(12,8,4,0.88) 100%)',
            }}
          />

          {/* Content inside card */}
          <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10" style={{ minHeight: 'inherit' }}>

            {/* Tag */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-body font-semibold uppercase self-start mb-4"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '5px 13px',
                borderRadius: 100,
              }}
            >
              За нас
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="font-display font-bold text-white leading-[1.08] mb-4"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}
            >
              Семейна мебелна<br />работилница
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.38, duration: 0.45 }}
              className="font-body leading-relaxed mb-6 md:max-w-[48ch]"
              style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)' }}
            >
              Проектираме и изработваме мебели по поръчка от над 10 години.
              Всеки проект е уникален — създаден специално за вашия дом и начин на живот.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="flex gap-4 md:gap-8 mb-7 pb-7"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    className="font-display font-bold text-white"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-body mt-1"
                    style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.52, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/за-нас/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: '#8B6F47',
                  borderRadius: 12,
                  padding: '11px 22px',
                  fontSize: '0.88rem',
                  boxShadow: '0 4px 18px rgba(139,111,71,0.55)',
                }}
              >
                Научи повече <ArrowRight size={14} />
              </Link>
              <Link
                href="/контакти/"
                className="inline-flex items-center gap-2 font-body font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 12,
                  padding: '11px 22px',
                  fontSize: '0.88rem',
                  color: 'white',
                }}
              >
                Свържи се с нас
              </Link>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Four qualities below the card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"
        >
          {[
            { icon: '🪵', title: 'Качествени материали', desc: 'Egger, Blum, Hafele' },
            { icon: '📐', title: 'Безплатен 3D проект', desc: 'За всеки клиент' },
            { icon: '⏱', title: 'Точни срокове', desc: '4–6 седмици' },
            { icon: '✅', title: 'Гаранция', desc: '2 години' },
          ].map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 p-4 md:p-5 rounded-[16px] bg-white"
              style={{ border: '1px solid #EDE5DA' }}
            >
              <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{q.icon}</span>
              <span className="font-body font-semibold text-charcoal" style={{ fontSize: '0.82rem', marginTop: 6 }}>
                {q.title}
              </span>
              <span className="font-body text-warm-gray" style={{ fontSize: '0.75rem' }}>
                {q.desc}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
