'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'Кухни по поръчка',
    href: '/услуги/кухни-по-поръчка/',
    desc: 'Модерни и класически кухни, изработени по ваш проект и вкус.',
    image: '/images/services/kuhnya.png',
    tag: 'Най-търсено',
  },
  {
    title: 'Гардероби',
    href: '/услуги/гардероби-по-поръчка/',
    desc: 'Вградени гардероби за всяко пространство',
    image: '/images/services/garderob.png',
  },
  {
    title: 'Спални',
    href: '/услуги/спални-по-поръчка/',
    desc: 'Легла и спални комплекти по дизайн',
    image: '/images/services/spalna.png',
  },
  {
    title: 'Дневни',
    href: '/услуги/дневни-по-поръчка/',
    desc: 'ТВ секции, стелажи и холни мебели',
    image: '/images/services/spalna2.png',
  },
  {
    title: 'Офис мебели',
    href: '/услуги/офис-мебели/',
    desc: 'Бюра и офис обзавеждане за бизнеса',
    image: '/images/projects/project3.png',
  },
  {
    title: 'Монтаж',
    href: '/услуги/монтаж/',
    desc: 'Прецизен монтаж с гаранция',
    image: '/images/projects/project1.png',
  },
]

function ServiceCard({
  s,
  featured = false,
  sizes = '33vw',
}: {
  s: (typeof services)[0]
  featured?: boolean
  sizes?: string
}) {
  return (
    <Link
      href={s.href}
      className="group relative block overflow-hidden h-full"
      style={{ borderRadius: 20 }}
    >
      <Image
        src={s.image}
        alt={s.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={sizes}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: featured
            ? 'linear-gradient(145deg, rgba(12,8,4,0.65) 0%, rgba(12,8,4,0.05) 55%, rgba(12,8,4,0.55) 100%)'
            : 'linear-gradient(to top, rgba(12,8,4,0.92) 0%, rgba(12,8,4,0.35) 55%, rgba(12,8,4,0.0) 85%)',
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
              padding: '4px 11px',
              borderRadius: 100,
            }}
          >
            {s.tag}
          </span>
        </div>
      )}

      {/* Hover arrow */}
      <div
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
        style={{
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.28)',
        }}
      >
        <ArrowUpRight size={15} className="text-white" />
      </div>

      {/* Text */}
      <div className={`absolute bottom-0 left-0 right-0 ${featured ? 'p-6 md:p-8' : 'p-4 md:p-5'}`}>
        {featured && (
          <p
            className="font-body text-white/60 mb-2 leading-relaxed"
            style={{ fontSize: '0.85rem' }}
          >
            {s.desc}
          </p>
        )}
        <div className="flex items-end justify-between gap-3">
          <h3
            className="font-display font-bold text-white leading-tight"
            style={{
              fontSize: featured
                ? 'clamp(1.5rem, 3.5vw, 2.1rem)'
                : 'clamp(0.92rem, 2.2vw, 1.08rem)',
            }}
          >
            {s.title}
          </h3>
          {!featured && (
            <span
              className="flex-shrink-0 text-white/40 font-body text-sm leading-none group-hover:text-white/70 transition-colors"
            >
              →
            </span>
          )}
        </div>
        {!featured && (
          <p className="font-body text-white/50 mt-1 hidden lg:block" style={{ fontSize: '0.75rem' }}>
            {s.desc}
          </p>
        )}
      </div>
    </Link>
  )
}

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

        {/* ─── MOBILE: featured + 2-col grid ─── */}
        <div className="md:hidden space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            style={{ height: 290 }}
          >
            <ServiceCard s={services[0]} featured sizes="100vw" />
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            {services.slice(1).map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
                style={{ height: 190 }}
              >
                <ServiceCard s={s} sizes="50vw" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── DESKTOP: Bento grid ─── */}
        {/*
          Layout (3 cols):
          [ Кухни (col 1-2, row 1-2) ] [ Гардероби (col 3, row 1) ]
          [                           ] [ Спални    (col 3, row 2) ]
          [ Дневни ] [ Офис мебели ] [ Монтаж ]
        */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '300px 300px 270px',
          }}
        >
          {/* Featured: Кухни — spans 2 cols × 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
          >
            <ServiceCard s={services[0]} featured sizes="66vw" />
          </motion.div>

          {/* Гардероби & Спални — right column, stacked */}
          {services.slice(1, 3).map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, x: 18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.1 }}
            >
              <ServiceCard s={s} sizes="33vw" />
            </motion.div>
          ))}

          {/* Дневни, Офис, Монтаж — bottom row */}
          {services.slice(3).map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
            >
              <ServiceCard s={s} sizes="33vw" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
