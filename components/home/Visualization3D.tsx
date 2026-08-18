'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getImageDisclosure } from '@/lib/image-credits'

const visualizationImage = '/images/visualizations/08-modern-kitchen-island-02.webp'
const visualizationDisclosure = getImageDisclosure(visualizationImage)

const points = [
  'Реалистичен 3D модел с точни размери, цветове и материали',
  'Корекции до одобряване на уточнения проект',
  'Изработката започва само след вашето одобрение',
]

export default function Visualization3D() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-warm-white)', overflow: 'hidden' }}>
      <div className="grid md:min-h-[560px] md:grid-cols-2 md:grid-rows-[auto_auto]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="px-5 pt-16 md:col-start-1 md:row-start-1 md:self-end md:pb-0 md:pl-8 md:pr-16 md:pt-20 xl:pl-[calc((100vw_-_1280px)_/_2_+_2rem)]"
        >
          <span className="eyebrow-pill">Проектиране</span>

          <h2 className="mb-5 font-display text-[clamp(2.4rem,10vw,3.2rem)] font-bold leading-[1.05] heading-gradient md:mb-6 md:text-[clamp(2.6rem,4vw,3.8rem)] md:leading-[1.04]">
            Проект
            <br className="hidden md:block" /> и
            <br className="md:hidden" /> 3D
            <br className="hidden md:block" /> визуализация
          </h2>

          <p className="mb-6 max-w-[40ch] font-body text-[0.95rem] leading-relaxed text-[#6B6560] md:mb-8 md:text-base">
            Преди изработка получавате пълна 3D визуализация на вашите мебели. Виждате всеки детайл, материал и размер предварително.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-5 mb-7 h-[250px] overflow-hidden rounded-[20px] md:col-start-2 md:row-span-2 md:row-start-1 md:m-0 md:h-auto md:min-h-[560px] md:rounded-none"
        >
          <Image
            src={visualizationImage}
            alt="Примерна 3D визуализация на кухня по поръчка с остров"
            fill
            className="object-cover"
            sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to right, var(--color-warm-white) 0%, transparent 18%)',
            }}
          />
          {visualizationDisclosure && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md md:bottom-4 md:left-auto md:right-4">
              {visualizationDisclosure}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-5 pb-16 md:col-start-1 md:row-start-2 md:self-start md:pl-8 md:pr-16 md:pb-20 xl:pl-[calc((100vw_-_1280px)_/_2_+_2rem)]"
        >
          <ul className="mb-6 space-y-3 md:mb-8 md:space-y-4">
            {points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-body text-[0.6rem] font-bold text-white"
                  style={{ background: '#8B6F47' }}
                >
                  ✓
                </span>
                <span className="font-body text-[0.9rem] leading-snug text-charcoal md:text-[0.95rem]">
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mb-6 font-body text-[0.82rem] italic text-[#A09890] md:mb-8 md:text-[0.83rem]">
            * Проектът се заплаща; при поръчка на мебелите приспадаме платената сума.
          </p>

          <Link href="/контакти/" className="btn-primary w-full justify-center md:w-auto">
            Поискай проект →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
