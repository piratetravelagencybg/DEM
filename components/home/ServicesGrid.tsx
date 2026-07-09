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
    image: '/images/real/kuhnya-02.png',
    tag: 'Най-търсено',
  },
  {
    title: 'Гардероби',
    href: '/услуги/гардероби-по-поръчка/',
    desc: 'Вградени гардероби за всяко пространство',
    image: '/images/real/garderob-01.png',
  },
  {
    title: 'Спални',
    href: '/услуги/спални-по-поръчка/',
    desc: 'Легла и спални комплекти по дизайн',
    image: '/images/real/spalna-08.png',
  },
  {
    title: 'Дневни',
    href: '/услуги/дневни-по-поръчка/',
    desc: 'ТВ секции, стелажи и холни мебели',
    image: '/images/real/dnevna-01.png',
  },
  {
    title: 'Офис мебели',
    href: '/услуги/офис-мебели/',
    desc: 'Бюра и офис обзавеждане за бизнеса',
    image: '/images/real/office-corner.png',
  },
  {
    title: 'Монтаж',
    href: '/услуги/монтаж/',
    desc: 'Прецизен монтаж с гаранция',
    image: '/images/real/kuhnya-05.png',
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
        alt={s.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 66vw"
        priority
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

/* ── Small card (image + text below) ───────────────────────── */
function SmallCard({ s, imgHeight = 160 }: { s: (typeof services)[0]; imgHeight?: number }) {
  return (
    <Link
      href={s.href}
      className="group flex flex-col overflow-hidden h-full"
      style={{
        borderRadius: 16,
        background: 'white',
        border: '1px solid #EDE5DA',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
    >
      {/* Image */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: imgHeight }}>
        <Image
          src={s.image}
          alt={s.title}
          fill
          className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Text */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div>
          <h3
            className="font-display font-semibold text-charcoal leading-tight"
            style={{ fontSize: '0.95rem' }}
          >
            {s.title}
          </h3>
          <p
            className="font-body text-warm-gray mt-0.5 leading-snug"
            style={{ fontSize: '0.75rem' }}
          >
            {s.desc}
          </p>
        </div>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-250 group-hover:bg-walnut"
          style={{ background: 'rgba(139,111,71,0.12)' }}
        >
          <ArrowRight size={13} style={{ color: '#8B6F47' }} className="group-hover:text-white transition-colors" />
        </div>
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

        {/* ─── MOBILE layout ─── */}
        <div className="md:hidden space-y-3">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            style={{ height: 280 }}
          >
            <FeaturedCard s={services[0]} />
          </motion.div>

          {/* 2-col grid for the rest */}
          <div className="grid grid-cols-2 gap-3">
            {services.slice(1).map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
              >
                <SmallCard s={s} imgHeight={130} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── DESKTOP bento grid ─── */}
        {/*
          [ Кухни (2cols × 2rows) ] [ Гардероби ]
          [                       ] [ Спални    ]
          [ Дневни ] [ Офис ] [ Монтаж ]
        */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '280px 280px 240px',
          }}
        >
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
          >
            <FeaturedCard s={services[0]} />
          </motion.div>

          {/* Гардероби + Спални */}
          {services.slice(1, 3).map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, x: 18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.1 }}
            >
              <SmallCard s={s} imgHeight={200} />
            </motion.div>
          ))}

          {/* Bottom row */}
          {services.slice(3).map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
            >
              <SmallCard s={s} imgHeight={165} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
