'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import projects from '@/data/projects.json'

const CARD_W = 370
const GAP = 20
const STRIDE = CARD_W + GAP
const TICK_MS = 2600
const TRANS = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'

export default function ProjectsGallery() {
  const items = projects
  const N = items.length
  const tripled = [...items, ...items, ...items]

  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [idx, setIdx] = useState(N)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      setIdx(prev => prev + 1)
      setAnimated(true)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [inView])

  useEffect(() => {
    if (idx >= N * 2) {
      const t = setTimeout(() => {
        setAnimated(false)
        setIdx(N)
      }, 580)
      return () => clearTimeout(t)
    }
  }, [idx, N])

  return (
    <section ref={sectionRef} className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10"
        >
          <div>
            <span className="eyebrow-pill">Портфолио</span>
            <h2 className="font-display font-bold heading-gradient leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5.5vw, 3rem)' }}>
              Реализирани проекти
            </h2>
          </div>
          <Link
            href="/проекти/"
            className="inline-flex items-center gap-2 font-body font-semibold text-walnut hover:text-walnut-dark transition-colors flex-shrink-0"
            style={{ fontSize: '0.9rem' }}
          >
            Виж всички проекти <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* ─── MOBILE: horizontal scroll ─── */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {items.map((project) => (
              <Link
                key={project.id}
                href={`/проекти/${project.slug}/`}
                className="flex-shrink-0 relative rounded-[18px] overflow-hidden"
                style={{ width: 260, height: 340, scrollSnapAlign: 'start' }}
              >
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.2) 55%, transparent 80%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={11} style={{ color: '#C4A882' }} />
                    <span className="font-body" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)' }}>{project.city}</span>
                  </div>
                  <h3 className="font-display font-bold text-white leading-tight" style={{ fontSize: '1.1rem' }}>
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* ─── DESKTOP: auto-sliding carousel ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block overflow-hidden"
          style={{ borderRadius: 24 }}
        >
          <div
            className="flex"
            style={{
              gap: GAP,
              willChange: 'transform',
              transform: `translateX(${-(idx * STRIDE)}px)`,
              transition: animated ? TRANS : 'none',
            }}
          >
            {tripled.map((project, i) => (
              <Link
                key={`${project.id}-${i}`}
                href={`/проекти/${project.slug}/`}
                className="group relative flex-shrink-0 overflow-hidden rounded-[20px]"
                style={{ width: CARD_W, height: 480 }}
              >
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="370px"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.15) 55%, transparent 80%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                      <MapPin size={11} style={{ color: '#C4A882' }} /> {project.city}
                    </span>
                    <span className="flex items-center gap-1.5 font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                      <Clock size={11} style={{ color: '#C4A882' }} /> {project.duration}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white leading-tight mb-1" style={{ fontSize: '1.25rem' }}>
                    {project.title}
                  </h3>
                  <p className="font-body line-clamp-2 mb-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                    {project.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontSize: '0.82rem' }}
                  >
                    Виж проекта <ArrowRight size={12} style={{ color: '#C4A882' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
