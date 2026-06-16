'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const points = [
  'Реалистичен 3D модел с точни размери, цветове и материали',
  'Корекции докато сте напълно доволни с резултата',
  'Изработката започва само след вашето одобрение',
]

export default function Visualization3D() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-warm-white)', overflow: 'hidden' }}>

      {/* ─── MOBILE ─── */}
      <div className="md:hidden px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow-pill">Проектиране</span>

          <h2
            className="font-display font-bold heading-gradient leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 10vw, 3.2rem)' }}
          >
            Проект и<br />3D визуализация
          </h2>

          <p
            className="font-body leading-relaxed mb-6"
            style={{ fontSize: '0.95rem', color: '#6B6560' }}
          >
            Преди изработка получавате пълна 3D визуализация — виждате всеки детайл и одобрявате резултата предварително.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[20px] overflow-hidden mb-7"
          style={{ height: 250 }}
        >
          <Image
            src="/images/services/kuhnya.png"
            alt="3D визуализация на кухня"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Points */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-white font-body font-bold"
                style={{ background: '#8B6F47', fontSize: '0.6rem' }}
              >
                ✓
              </span>
              <span className="font-body text-charcoal leading-snug" style={{ fontSize: '0.9rem' }}>
                {p}
              </span>
            </li>
          ))}
        </motion.ul>

        <p
          className="font-body italic mb-6"
          style={{ fontSize: '0.82rem', color: '#A09890' }}
        >
          * Цена на визуализацията по договаряне спрямо обема на проекта.
        </p>

        <Link href="/контакти/" className="btn-primary w-full justify-center">
          Поискай проект →
        </Link>
      </div>

      {/* ─── DESKTOP: text left, image bleeds to right edge ─── */}
      <div className="hidden md:flex items-stretch" style={{ minHeight: 560 }}>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-center py-20"
          style={{
            flex: '0 0 50%',
            paddingLeft: 'max(2rem, calc((100vw - 1280px) / 2 + 2rem))',
            paddingRight: '4rem',
          }}
        >
          <span className="eyebrow-pill">Проектиране</span>

          <h2
            className="font-display font-bold heading-gradient leading-[1.04] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 4vw, 3.8rem)' }}
          >
            Проект<br />и 3D<br />визуализация
          </h2>

          <p
            className="font-body leading-relaxed mb-8"
            style={{ fontSize: '1rem', color: '#6B6560', maxWidth: '40ch' }}
          >
            Преди изработка получавате пълна 3D визуализация на вашите мебели. Виждате всеки детайл, материал и размер предварително.
          </p>

          <ul className="space-y-4 mb-8">
            {points.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex gap-3 items-start"
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-white font-body font-bold"
                  style={{ background: '#8B6F47', fontSize: '0.6rem' }}
                >
                  ✓
                </span>
                <span className="font-body text-charcoal leading-snug" style={{ fontSize: '0.95rem' }}>
                  {p}
                </span>
              </motion.li>
            ))}
          </ul>

          <p
            className="font-body italic mb-8"
            style={{ fontSize: '0.83rem', color: '#A09890' }}
          >
            * Цена по договаряне спрямо обема на проекта.
          </p>

          <div>
            <Link href="/контакти/" className="btn-primary">
              Поискай проект →
            </Link>
          </div>
        </motion.div>

        {/* Image — bleeds fully to the right edge */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex-1"
          style={{ minHeight: 480 }}
        >
          <Image
            src="/images/services/kuhnya.png"
            alt="3D визуализация на кухня по поръчка"
            fill
            className="object-cover"
            sizes="50vw"
            priority={false}
          />
          {/* Fade on left edge to blend with white */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--color-warm-white) 0%, transparent 18%)',
            }}
          />
        </motion.div>
      </div>

    </section>
  )
}
