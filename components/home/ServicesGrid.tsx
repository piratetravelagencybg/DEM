'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'Кухни по поръчка',
    href: '/услуги/кухни-по-поръчка/',
    desc: 'Модерни и класически кухни по ваш проект и вкус.',
    image: '/images/visualizations/05-modern-kitchen-oak-01.webp',
    tag: 'Най-търсено',
  },
  {
    title: 'Гардероби',
    href: '/услуги/гардероби-по-поръчка/',
    desc: 'Вградени гардероби за всяко пространство',
    image: '/images/visualizations/21-modern-wardrobe-bedroom-01.webp',
  },
  {
    title: 'Спални',
    href: '/услуги/спални-по-поръчка/',
    desc: 'Легла и спални комплекти по дизайн',
    image: '/images/visualizations/19-modern-bedroom-neutral-01.webp',
  },
  {
    title: 'Дневни',
    href: '/услуги/дневни-по-поръчка/',
    desc: 'ТВ секции, стелажи и холни мебели',
    image: '/images/visualizations/04-home-hero-open-plan-kitchen-04.webp',
  },
  {
    title: 'Офис мебели',
    href: '/услуги/офис-мебели/',
    desc: 'Бюра и офис обзавеждане за бизнеса',
    image: '/images/visualizations/13-modern-home-office-double-desk-01.webp',
  },
  {
    title: 'Монтаж',
    href: '/услуги/монтаж/',
    desc: 'Прецизен монтаж с гаранция',
    image: '/images/stock/assembly-tools-pexels.webp',
  },
]

/* ── Featured card (Кухни) ─────────────────────────────────── */
function FeaturedCard({ s }: { s: (typeof services)[0] }) {
  return (
    <Link
      href={s.href}
      className="group relative block overflow-hidden"
      style={{ borderRadius: 20, height: '100%' }}
    >
      <Image
        src={s.image}
        alt={`${s.title} – ${s.image.includes('/stock/') ? 'илюстративна снимка' : 'примерна визуализация'}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 66vw"
      />

      {/* Strong bottom gradient only — image stays visible up top */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,6,2,0.88) 0%, rgba(10,6,2,0.45) 35%, rgba(10,6,2,0.0) 65%)',
        }}
      />

      {/* Tag */}
      {s.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className="font-body font-bold text-white uppercase"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              background: '#8B6F47',
              padding: '4px 12px',
              borderRadius: 100,
            }}
          >
            {s.tag}
          </span>
        </div>
      )}

      <span className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-2.5 py-1 font-body text-[0.55rem] font-semibold text-white backdrop-blur-md">
        {s.image.includes('/stock/') ? 'Илюстративна снимка' : 'Примерна визуализация'}
      </span>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <h3
          className="font-display font-bold text-white leading-tight mb-3"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {s.title}
        </h3>
        <div
          className="inline-flex items-center gap-2 font-body font-semibold text-white transition-all duration-300 group-hover:gap-3"
          style={{ fontSize: '0.82rem', opacity: 0.85 }}
        >
          Научи повече <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

/* ── Small card (full image + title overlay) ────────────────── */
function SmallCard({ s }: { s: (typeof services)[0] }) {
  return (
    <Link
      href={s.href}
      className="group relative block overflow-hidden h-full"
      style={{ borderRadius: 16 }}
    >
      <Image
        src={s.image}
        alt={`${s.title} – ${s.image.includes('/stock/') ? 'илюстративна снимка' : 'примерна визуализация'}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-black/55 px-2 py-1 font-body text-[0.5rem] font-semibold text-white backdrop-blur-md">
        {s.image.includes('/stock/') ? 'Илюстративно' : 'Визуализация'}
      </span>
      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(10,6,2,0.82) 0%, rgba(10,6,2,0.18) 45%, rgba(10,6,2,0.0) 70%)' }}
      />
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <h3
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
        >
          {s.title}
        </h3>
      </div>
    </Link>
  )
}

/* ── Main grid ─────────────────────────────────────────────── */
export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <span className="eyebrow-pill">Нашите услуги</span>
              <h2
                className="font-display font-bold heading-gradient leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 3rem)' }}
              >
                Всичко за вашия дом
              </h2>
            </div>
            <p
              className="font-body text-warm-gray md:max-w-[26ch] md:text-right leading-relaxed"
              style={{ fontSize: '0.9rem' }}
            >
              Проектираме и изработваме мебели по поръчка — от идея до монтаж.
            </p>
          </div>
        </motion.div>

        {/* One responsive grid: every service and image is rendered only once. */}
        {/*
          [ Кухни (2cols × 2rows) ] [ Гардероби ]
          [                       ] [ Спални    ]
          [ Дневни ] [ Офис ] [ Монтаж ]
        */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-[280px_280px_240px]">
          {services.map((s, i) => {
            const isFeatured = i === 0

            return (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: isFeatured ? 16 : 14, scale: isFeatured ? 0.98 : 1 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: isFeatured ? 0.6 : 0.45, delay: isFeatured ? 0.05 : 0.12 + (i - 1) * 0.06 }}
              className={isFeatured
                ? 'col-span-2 h-[280px] md:row-span-2 md:h-auto'
                : 'h-[150px] md:h-auto'}
            >
              {isFeatured ? <FeaturedCard s={s} /> : <SmallCard s={s} />}
            </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
