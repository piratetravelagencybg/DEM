import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ProjectCards from '@/components/ui/ProjectCards'
import { projectHref, projects } from '@/lib/projects'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Проектни казуси за мебели по поръчка | Dom Expert Мебел',
  description: 'Реализирани обекти и 3D проекти на кухни, гардероби, спални, дневни, офиси и салони с град, материали и ясно обозначени визуализации.',
  path: '/проекти/',
  image: '/images/og/home.webp',
  imageAlt: 'Примерна визуализация към проектен казус на Dom Expert Мебел',
})

const realizedCount = projects.filter((project) => project.status === 'realized').length
const designCount = projects.filter((project) => project.status === '3d').length

const serviceLinks = [
  { href: '/услуги/кухни-по-поръчка/', label: 'Кухни по поръчка' },
  { href: '/услуги/гардероби-по-поръчка/', label: 'Гардероби по поръчка' },
  { href: '/услуги/спални-по-поръчка/', label: 'Спални по поръчка' },
  { href: '/услуги/дневни-по-поръчка/', label: 'Дневни по поръчка' },
  { href: '/услуги/офис-мебели/', label: 'Офис мебели' },
]

const projectListSchema = {
  '@type': 'ItemList',
  name: 'Проекти на Dom Expert Мебел',
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => {
    const url = new URL(projectHref(project), 'https://domexpertmebel.com').href
    return {
      '@type': 'ListItem',
      position: index + 1,
      url,
      item: {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: project.title + (project.city ? ' — ' + project.city : ''),
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
  description: `${realizedCount} реализирани проекта и ${designCount} 3D проекта на Dom Expert Мебел с информация за град и материали. Изображенията са визуализации, а не снимки от обектите.`,
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
            title="Проекти: реализирани обекти и 3D проекти"
            subtitle={`${realizedCount} реализирани проекта с данни за град, материали и срок и ${designCount} 3D проекта, подготвени преди изработка. Всеки проект е обозначен; изображенията са визуализации, а не снимки от обектите.`}
          />

          <ProjectCards items={projects} headingLevel="h2" />

          <section className="mt-16 rounded-2xl bg-warm-white p-6 md:p-10" style={{ border: '1px solid #E7DDCF' }}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
              <div>
                <span className="eyebrow-pill">Как четем проектите</span>
                <h2 className="font-display font-bold text-charcoal mt-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                  От конкретната задача до готовото обзавеждане
                </h2>
                <p className="font-body text-warm-gray leading-relaxed mt-4">
                  Реализираните проекти показват какъв тип обзавеждане е изработен, къде е обектът,
                  кои материали са използвани и колко време е отнело изпълнението. 3D проектите показват
                  мебели, проектирани и одобрени преди изработка — така изглежда и проектът, който ще
                  получите преди своята поръчка.
                </p>
                <ul className="space-y-3 mt-6">
                  {[
                    'Етикет „Реализиран проект“ или „3D проект“ на всяка карта',
                    'Визуализациите са ясно обозначени и не са снимки от обекти',
                    'Град, материали и срок, когато са потвърдени',
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
