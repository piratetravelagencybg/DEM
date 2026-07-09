import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABar from '@/components/home/CTABar'
import services from '@/data/services.json'

export const metadata: Metadata = {
  title: { absolute: 'Услуги — Мебели по поръчка Благоевград | Dom Expert Мебел' },
  description: 'Кухни, гардероби, спални, дневни, офис мебели и монтаж по поръчка в Благоевград и София. Безплатна консултация и 3D проект. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/' },
}

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24 section-py bg-cream">
        <div className="container-main">
          <SectionHeader
            level={1}
            eyebrow="Какво правим"
            title="Нашите услуги"
            subtitle="От кухни до офис мебели — всичко по поръчка с безплатен 3D проект и монтаж."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/услуги/${s.slug}/`}
                className="group card overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
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
            ))}
          </div>
        </div>
      </div>
      <CTABar />
    </>
  )
}
