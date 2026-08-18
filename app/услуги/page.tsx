import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABar from '@/components/home/CTABar'
import services from '@/data/services.json'
import { getImageDisclosure } from '@/lib/image-credits'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Услуги — Мебели по поръчка | Dom Expert Мебел',
  description: 'Кухни, гардероби, спални, дневни и офис мебели по поръчка в Благоевград, София и региона. Безплатен оглед, монтаж и 2 г. гаранция.',
  path: '/услуги/',
  image: '/images/og/kitchens.webp',
  imageAlt: 'Примерна визуализация на мебели по поръчка',
})

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24 section-py bg-cream">
        <div className="container-main">
          <SectionHeader
            level={1}
            eyebrow="Какво правим"
            title="Нашите услуги"
            subtitle="От кухни до офис мебели — безплатен оглед, платен 3D проект с приспадане при поръчка и професионален монтаж."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const disclosure = getImageDisclosure(s.image)

              return (
                <Link
                  key={s.id}
                  href={`/услуги/${s.slug}/`}
                  className="group card overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={s.image}
                      alt={`${s.title} — ${disclosure?.toLocaleLowerCase('bg-BG') || 'илюстрация'}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {disclosure && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md">
                        {disclosure}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-display font-semibold text-charcoal text-xl mb-2 group-hover:text-walnut transition-colors">
                      {s.title}
                    </h2>
                    <p className="font-body text-warm-gray text-sm mb-4">{s.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {s.features.map((f) => (
                        <span key={f} className="text-xs bg-cream text-warm-gray px-2 py-1 rounded-full font-body">
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-walnut text-sm font-medium font-body">
                      Научи повече <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <CTABar />
    </>
  )
}
