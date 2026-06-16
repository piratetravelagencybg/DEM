import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABar from '@/components/home/CTABar'
import projects from '@/data/projects.json'

export const metadata: Metadata = {
  title: 'Реализирани проекти — Мебели по поръчка',
  description: 'Разгледайте нашето портфолио от реализирани проекти на мебели по поръчка в Благоевград, София и региона. Кухни, гардероби, спални.',
  alternates: { canonical: 'https://domexpertmebel.bg/проекти/' },
}

const categories = [
  { id: 'all', label: 'Всички' },
  { id: 'kuhni', label: 'Кухни' },
  { id: 'garderob', label: 'Гардероби' },
  { id: 'spalni', label: 'Спални' },
  { id: 'dnevni', label: 'Дневни' },
  { id: 'ofis', label: 'Офис' },
]

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-24 section-py bg-cream">
        <div className="container-main">
          <SectionHeader
            eyebrow="Портфолио"
            title="Реализирани проекти"
            subtitle="Всеки проект е уникален — вижте резултатите от нашата работа."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/проекти/${project.slug}/`}
                className="group card overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — ${project.city}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h2 className="font-display font-semibold text-charcoal text-xl mb-1 group-hover:text-walnut transition-colors">
                    {project.title}
                  </h2>
                  <p className="font-body text-warm-gray text-sm">{project.city} · {project.duration}</p>
                  <p className="font-body text-warm-gray text-sm mt-2 line-clamp-2">{project.description}</p>
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
