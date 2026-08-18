'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import projects from '@/data/projects.json'

const TICK_MS = 2600

export default function ProjectsGallery() {
  const items = projects
  const N = items.length

  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView || !N) return

    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!desktopQuery.matches || reducedMotionQuery.matches) return

    const timer = setInterval(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      const cards = Array.from(carousel.children) as HTMLElement[]
      if (!cards.length) return

      const current = cards.reduce((closest, card, index) => {
        const currentDistance = Math.abs(card.offsetLeft - carousel.scrollLeft)
        const closestDistance = Math.abs(cards[closest].offsetLeft - carousel.scrollLeft)
        return currentDistance < closestDistance ? index : closest
      }, 0)
      const next = (current + 1) % cards.length

      carousel.scrollTo({
        left: cards[next].offsetLeft,
        behavior: next === 0 ? 'auto' : 'smooth',
      })
    }, TICK_MS)

    return () => clearInterval(timer)
  }, [inView, N])

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
              Проектни казуси
            </h2>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-warm-gray">
              Данните са от реализирани проекти, а изображенията са примерни визуализации.
            </p>
          </div>
          <Link
            href="/проекти/"
            className="inline-flex items-center gap-2 font-body font-semibold text-walnut hover:text-walnut-dark transition-colors flex-shrink-0"
            style={{ fontSize: '0.9rem' }}
          >
            Виж всички проекти <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* One responsive carousel: each project image exists only once in the DOM. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          ref={carouselRef}
          className="relative -mx-5 flex gap-3 overflow-x-auto px-5 pb-4 md:mx-0 md:gap-5 md:px-0 md:pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          aria-label="Проектни казуси"
        >
          {items.map((project) => (
            <Link
              key={project.id}
              href={`/проекти/${project.slug}/`}
              className="group relative h-[340px] w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-[18px] md:h-[480px] md:w-[370px] md:rounded-[20px]"
            >
              <Image
                src={project.images[0]}
                alt={`${project.title} — примерна визуализация към реализиран проект`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 767px) 260px, 370px"
              />
              <span className="absolute left-3 top-3 z-10 rounded-full bg-charcoal/80 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm md:left-4 md:top-4 md:py-1.5 md:text-[0.68rem]">
                Примерна визуализация
              </span>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.15) 55%, transparent 80%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="mb-1 flex items-center gap-1 md:mb-2 md:gap-3">
                  <span className="flex items-center gap-1.5 font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>
                    <MapPin size={11} style={{ color: '#C4A882' }} /> {project.city}
                  </span>
                  <span className="hidden items-center gap-1.5 font-body md:flex" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                    <Clock size={11} style={{ color: '#C4A882' }} /> {project.duration}
                  </span>
                </div>
                <h3 className="font-display text-[1.1rem] font-bold leading-tight text-white md:mb-1 md:text-[1.25rem]">
                  {project.title}
                </h3>
                <p className="mb-3 hidden font-body text-[0.82rem] text-white/50 md:line-clamp-2">
                  {project.description}
                </p>
                <div className="hidden items-center gap-1.5 font-body text-[0.82rem] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline-flex">
                  Виж проекта <ArrowRight size={12} style={{ color: '#C4A882' }} />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
