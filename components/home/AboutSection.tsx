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

const qualities = [
  'Висококачествени материали Egger, Blum, Hafele',
  'Безплатен 3D проект за всеки клиент',
  'Прецизна изработка и точни срокове',
  'Гаранция 2 години на всички изделия',
]

/* Four different real photos — none repeated from ServicesGrid */
const photos = [
  { src: '/images/real/kuhnya-04.png', label: 'Кухни' },
  { src: '/images/real/garderob-02.png', label: 'Гардероби' },
  { src: '/images/real/spalna-07.png', label: 'Спални' },
  { src: '/images/real/dnevna-03.png', label: 'Дневни' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-cream)', overflow: 'hidden' }}>

      {/* ─── MOBILE ─── */}
      <div className="md:hidden px-5 pt-14 pb-12">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <span className="eyebrow-pill">За нас</span>
          <h2
            className="font-display font-bold heading-gradient leading-[1.05] mt-2 mb-3"
            style={{ fontSize: 'clamp(1.9rem, 8vw, 2.6rem)' }}
          >
            Семейна мебелна работилница
          </h2>
          <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.93rem' }}>
            Проектираме и изработваме мебели по поръчка от над 10 години. Всеки проект е уникален — създаден специално за вашия дом.
          </p>
        </motion.div>

        {/* Photo strip — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="-mx-5 mb-7"
        >
          <div
            className="flex gap-2.5 overflow-x-auto px-5 pb-1"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {photos.map((p, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 160, height: 200, borderRadius: 14, scrollSnapAlign: 'start' }}
              >
                <Image
                  src={p.src}
                  alt={p.label}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,6,2,0.7) 0%, transparent 50%)' }}
                />
                <span
                  className="absolute bottom-3 left-3 font-body font-semibold text-white"
                  style={{ fontSize: '0.75rem' }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-2.5 mb-7"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-4 px-1 rounded-[14px] bg-white"
              style={{ border: '1px solid #EDE5DA' }}
            >
              <span
                className="font-display font-bold text-charcoal"
                style={{ fontSize: '1.55rem', lineHeight: 1 }}
              >
                {s.value}
              </span>
              <span
                className="font-body text-warm-gray mt-1"
                style={{ fontSize: '0.65rem', lineHeight: 1.3 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Qualities */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="space-y-2.5 mb-7"
        >
          {qualities.map((q, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-white font-bold"
                style={{ background: '#8B6F47', fontSize: '0.58rem' }}
              >
                ✓
              </span>
              <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                {q}
              </span>
            </li>
          ))}
        </motion.ul>

        <Link href="/за-нас/" className="btn-outline inline-flex">
          Научи повече <ArrowRight size={15} />
        </Link>
      </div>

      {/* ─── DESKTOP: photo collage left, text right ─── */}
      <div className="hidden md:flex" style={{ minHeight: 580 }}>

        {/* 2-col photo collage */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="relative flex-shrink-0"
          style={{ width: '46%' }}
        >
          <div className="grid grid-cols-2 h-full" style={{ gap: 6, padding: 6 }}>
            {/* Tall left photo */}
            <div className="relative overflow-hidden" style={{ borderRadius: 16 }}>
              <Image
                src="/images/real/kuhnya-04.png"
                alt="Кухни по поръчка"
                fill
                className="object-cover"
                sizes="23vw"
              />
            </div>
            {/* Two stacked right photos */}
            <div className="flex flex-col gap-1.5 h-full">
              <div className="relative overflow-hidden flex-1" style={{ borderRadius: 16 }}>
                <Image
                  src="/images/real/garderob-02.png"
                  alt="Гардероби по поръчка"
                  fill
                  className="object-cover"
                  sizes="23vw"
                />
              </div>
              <div className="relative overflow-hidden flex-1" style={{ borderRadius: 16 }}>
                <Image
                  src="/images/real/spalna-07.png"
                  alt="Спални по поръчка"
                  fill
                  className="object-cover"
                  sizes="23vw"
                />
              </div>
            </div>
          </div>

          {/* Right edge fade to cream */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--color-cream) 0%, transparent 18%)' }}
          />

          {/* Years badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="absolute bottom-8 right-0 translate-x-1/2 bg-walnut text-white rounded-[18px] px-6 py-5 text-center"
            style={{ boxShadow: '0 8px 32px rgba(139,111,71,0.45)', minWidth: 120, zIndex: 10 }}
          >
            <div className="font-display font-bold text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>10+</div>
            <div className="font-body text-white/75 mt-1" style={{ fontSize: '0.72rem' }}>
              години<br />традиция
            </div>
          </motion.div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex-1 flex flex-col justify-center py-20"
          style={{
            paddingLeft: '5rem',
            paddingRight: 'max(2rem, calc((100vw - 1280px) / 2 + 2rem))',
          }}
        >
          <span className="eyebrow-pill">За нас</span>
          <h2
            className="font-display font-bold heading-gradient leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
          >
            Семейна<br />мебелна<br />работилница
          </h2>
          <p
            className="font-body text-warm-gray leading-relaxed mb-8"
            style={{ fontSize: '1rem', maxWidth: '40ch' }}
          >
            Проектираме и изработваме мебели по поръчка от над 10 години. Всеки проект е уникален — създаден специално за вашия дом, пространство и начин на живот.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid #E8DDD0' }}>
            {stats.slice(1).map((s, i) => (
              <div key={i}>
                <div
                  className="font-display font-bold text-charcoal"
                  style={{ fontSize: '1.9rem', lineHeight: 1 }}
                >
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
                transition={{ duration: 0.35, delay: 0.32 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: '#8B6F47', fontSize: '0.58rem' }}
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
