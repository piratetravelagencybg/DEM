'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '10+', label: 'Години опит' },
  { value: '500+', label: 'Реализирани проекта' },
  { value: '100%', label: 'Доволни клиенти' },
]

const qualities = [
  'Висококачествени материали от доказани доставчици',
  'Индивидуален дизайн за всеки клиент',
  'Прецизна изработка и точни срокове',
  'Гаранция на всички изработени мебели',
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-cream)', overflow: 'hidden' }}>

      {/* ─── MOBILE ─── */}
      <div className="md:hidden px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow-pill">За нас</span>
          <h2 className="font-display font-bold heading-gradient leading-[1.05] mb-4" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)' }}>
            Семейна мебелна работилница
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mb-6" style={{ fontSize: '0.95rem' }}>
            Проектираме и изработваме мебели по поръчка от над 10 години. Всеки проект е уникален — създаден специално за вашия дом и начин на живот.
          </p>
        </motion.div>

        {/* Stats — 3 in a row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-7"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-4 px-2 rounded-[14px] bg-white"
              style={{ border: '1px solid #EDE5DA' }}
            >
              <span className="font-display font-bold text-charcoal" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
                {s.value}
              </span>
              <span className="font-body text-warm-gray mt-1" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative rounded-[20px] overflow-hidden mb-6"
          style={{ height: 250 }}
        >
          <Image
            src="/images/services/kuhnya.png"
            alt="Изработка на мебели по поръчка"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-3 mb-7"
        >
          {qualities.map((q, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 font-body font-bold text-white"
                style={{ background: '#8B6F47', fontSize: '0.6rem' }}
              >
                ✓
              </span>
              <span className="font-body text-charcoal" style={{ fontSize: '0.9rem' }}>{q}</span>
            </li>
          ))}
        </motion.ul>

        <Link href="/за-нас/" className="btn-outline inline-flex">
          Научи повече <ArrowRight size={15} />
        </Link>
      </div>

      {/* ─── DESKTOP: image left, text right ─── */}
      <div className="hidden md:flex" style={{ minHeight: 600 }}>

        {/* Image — flush left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative flex-shrink-0"
          style={{ width: '45%' }}
        >
          <Image
            src="/images/services/kuhnya.png"
            alt="Изработка на мебели по поръчка"
            fill
            className="object-cover"
            sizes="45vw"
          />
          {/* Right edge fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--color-cream) 0%, transparent 20%)' }}
          />

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-10 right-0 translate-x-1/2 bg-walnut text-white rounded-[18px] px-6 py-5 text-center"
            style={{ boxShadow: '0 8px 32px rgba(139,111,71,0.4)', minWidth: 130 }}
          >
            <div className="font-display font-bold text-white" style={{ fontSize: '2.2rem', lineHeight: 1 }}>10+</div>
            <div className="font-body text-white/75 mt-1" style={{ fontSize: '0.75rem' }}>години<br />традиция</div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="flex-1 flex flex-col justify-center py-20"
          style={{
            paddingLeft: '5rem',
            paddingRight: 'max(2rem, calc((100vw - 1280px) / 2 + 2rem))',
          }}
        >
          <span className="eyebrow-pill">За нас</span>

          <h2 className="font-display font-bold heading-gradient leading-[1.05] mb-5" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
            Семейна<br />мебелна<br />работилница
          </h2>

          <p className="font-body text-warm-gray leading-relaxed mb-8" style={{ fontSize: '1rem', maxWidth: '40ch' }}>
            Проектираме и изработваме мебели по поръчка от над 10 години. Всеки проект е уникален — създаден специално за вашия дом, пространство и начин на живот.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid #E8DDD0' }}>
            {stats.slice(1).map((s, i) => (
              <div key={i}>
                <div className="font-display font-bold text-charcoal" style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="font-body text-warm-gray mt-1" style={{ fontSize: '0.78rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Qualities */}
          <ul className="space-y-3 mb-8">
            {qualities.map((q, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-body font-bold text-white"
                  style={{ background: '#8B6F47', fontSize: '0.6rem' }}
                >
                  ✓
                </span>
                <span className="font-body text-charcoal" style={{ fontSize: '0.9rem' }}>{q}</span>
              </motion.li>
            ))}
          </ul>

          <Link href="/за-нас/" className="btn-outline self-start">
            Научи повече <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

    </section>
  )
}
