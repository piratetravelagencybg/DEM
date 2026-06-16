import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Layers } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import projects from '@/data/projects.json'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — ${project.city}`,
    description: project.description,
    alternates: { canonical: `https://domexpertmebel.bg/проекти/${project.slug}/` },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.bg/' },
        { name: 'Проекти', url: 'https://domexpertmebel.bg/проекти/' },
        { name: project.title, url: `https://domexpertmebel.bg/проекти/${project.slug}/` },
      ]} />

      <div className="pt-24">
        {/* Hero image */}
        <div className="relative h-96 lg:h-[540px]">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-main pb-10">
            <Link href="/проекти/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors font-body">
              <ArrowLeft size={16} /> Назад към проекти
            </Link>
            <h1 className="font-display font-semibold text-white" style={{ fontSize: 'var(--text-h1)' }}>
              {project.title}
            </h1>
          </div>
        </div>

        {/* Details */}
        <section className="section-py bg-cream">
          <div className="container-main">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <p className="font-body text-warm-gray text-base leading-relaxed">{project.description}</p>
              </div>
              <div className="space-y-4">
                <div className="bg-warm-white rounded-card p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-semibold text-charcoal text-lg">Детайли</h3>
                  {[
                    { icon: MapPin, label: 'Град', value: project.city },
                    { icon: Layers, label: 'Материали', value: project.materials },
                    { icon: Clock, label: 'Срок', value: project.duration },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon size={16} className="text-walnut mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-body text-xs text-warm-gray">{label}</div>
                        <div className="font-body text-charcoal text-sm font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/контакти/" className="btn-primary w-full justify-center">
                  Подобен проект →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="section-py bg-warm-white">
            <div className="container-main">
              <h2 className="section-title mb-8">Подобни проекти</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/проекти/${p.slug}/`} className="group card overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-charcoal text-lg group-hover:text-walnut transition-colors">{p.title}</h3>
                      <p className="font-body text-warm-gray text-sm">{p.city}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quote form */}
        <section className="section-py bg-cream">
          <div className="container-main max-w-2xl">
            <h2 className="section-title text-center mb-10">Искате подобен проект?</h2>
            <div className="bg-warm-white rounded-card p-8 shadow-sm">
              <QuoteForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
