import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import projects from '@/data/projects.json'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Проектни казуси за мебели по поръчка | Dom Expert Мебел',
  description: 'Шест реализирани проекта за кухни, гардероби, спални, дневни и офис мебели с потвърдени данни и ясно обозначени примерни визуализации.',
  path: '/проекти/',
  image: '/images/og/home.webp',
  imageAlt: 'Примерна визуализация към проектен казус на Dom Expert Мебел',
})

const categoryLabels: Record<string, string> = {
  kuhni: 'Кухня',
  garderob: 'Гардероб',
  spalni: 'Спалня',
  dnevni: 'Дневна',
  ofis: 'Офис',
}

const serviceLinks = [
  { href: '/услуги/кухни-по-поръчка/', label: 'Кухни по поръчка' },
  { href: '/услуги/гардероби-по-поръчка/', label: 'Гардероби по поръчка' },
  { href: '/услуги/спални-по-поръчка/', label: 'Спални по поръчка' },
  { href: '/услуги/дневни-по-поръчка/', label: 'Дневни по поръчка' },
  { href: '/услуги/офис-мебели/', label: 'Офис мебели' },
]

const projectListSchema = {
  '@type': 'ItemList',
  name: 'Реализирани проекти на Dom Expert Мебел',
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => {
    const url = 'https://domexpertmebel.com/проекти/' + project.slug + '/'
    return {
      '@type': 'ListItem',
      position: index + 1,
      url,
      item: {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: project.title + ' — ' + project.city,
        description: project.description,
      },
    }
  }),
}

const projectCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://domexpertmebel.com/проекти/#collection',
  url: 'https://domexpertmebel.com/проекти/',
  name: 'Проектни казуси за мебели по поръчка',
  description: 'Шест реализирани проекта на Dom Expert Мебел с информация за град, материали и срок. Изображенията на страницата са примерни визуализации, а не снимки от обектите.',
  mainEntity: projectListSchema,
}

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Проекти', url: 'https://domexpertmebel.com/проекти/' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectCollectionSchema).replace(/</g, '\\u003c') }}
      />
      <div className="pt-24 section-py bg-cream">
        <div className="container-main">
          <SectionHeader
            level={1}
            eyebrow="Проектни казуси"
            title="Реализирани мебели и решения"
            subtitle="Фактите за проектите, градовете, материалите и сроковете са от реални реализации. Изображенията са примерни визуализации, а не снимки от обектите."
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
                    alt={`${project.title} — примерна визуализация към реализиран проект в ${project.city}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-charcoal/80 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    Примерна визуализация
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <span className="font-body text-xs font-semibold uppercase tracking-wide text-walnut">
                    {categoryLabels[project.category] ?? 'Мебели по поръчка'}
                  </span>
                  <h2 className="font-display font-semibold text-charcoal text-xl mb-1 group-hover:text-walnut transition-colors">
                    {project.title}
                  </h2>
                  <p className="font-body text-warm-gray text-sm">{project.city} · {project.duration}</p>
                  <p className="font-body text-warm-gray text-sm mt-2 line-clamp-2">{project.description}</p>
                  <p className="mt-3 border-t border-walnut/10 pt-3 font-body text-xs leading-relaxed text-warm-gray">
                    {project.imageCaption}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-16 rounded-2xl bg-warm-white p-6 md:p-10" style={{ border: '1px solid #E7DDCF' }}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
              <div>
                <span className="eyebrow-pill">Реализирани проекти</span>
                <h2 className="font-display font-bold text-charcoal mt-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                  От конкретната задача до готовото обзавеждане
                </h2>
                <p className="font-body text-warm-gray leading-relaxed mt-4">
                  Всяка страница представя изпълнен проект на Dom Expert Мебел. Показваме какъв тип
                  обзавеждане е изработен, къде се намира обектът, кои основни материали са използвани
                  и колко време е отнело изпълнението.
                </p>
                <ul className="space-y-3 mt-6">
                  {[
                    'Данни от действително завършен проект',
                    'Примерна визуализация, ясно обозначена като илюстративна',
                    'Посочени град, материали и реален срок',
                    'Връзка към съответната услуга и запитване за подобен проект',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-charcoal text-sm">
                      <CheckCircle2 size={17} className="text-walnut flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display font-semibold text-charcoal text-xl mb-4">Услуги по вид мебели</h2>
                <div className="grid gap-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 font-body font-medium text-charcoal transition-colors hover:text-walnut"
                      style={{ border: '1px solid #E7DDCF' }}
                    >
                      {service.label}
                      <ArrowRight size={15} className="flex-shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CTABar />
    </>
  )
}
