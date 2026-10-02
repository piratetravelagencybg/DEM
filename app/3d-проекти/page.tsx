import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Eye } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: '3D проекти и интериорен дизайн – портфолио | Dom Expert Мебел' },
  description: '3D визуализации и реализирани проекти на кухни, гардероби и мебели по поръчка. Вдъхновете се от нашите дизайни.',
  alternates: { canonical: 'https://domexpertmebel.com/3d-проекти/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/3d-проекти/',
    title: '3D проекти и интериорен дизайн – портфолио | Dom Expert Мебел',
    description: '3D визуализации и реализирани проекти на кухни, гардероби и мебели по поръчка.',
    images: [{ url: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp', width: 1500, height: 1000, alt: '3D визуализация на модерна кухня' }],
  },
})

const projects = [
  {
    slug: 'kuhnya-domexpert-v17',
    title: '3D проект на кухня – Кашмир монохромна',
    description: 'Модерна монохромна кухня с кашмир фронтове, тъмен мраморен гръб Laminam и остров с канали.',
    image: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp',
    category: 'Кухня',
    style: 'Модерна, монохромна',
  },
]

export default function PortfolioHubPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: '3D проекти', url: 'https://domexpertmebel.com/3d-проекти/' },
      ]} />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.10)', filter: 'blur(65px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>3D проекти</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow-pill">Портфолио</span>
            <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-3 mb-6" style={{ fontSize: 'var(--text-h1)' }}>
              3D проекти и интериорен дизайн
            </h1>
            <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.1rem', maxWidth: '60ch' }}>
              Разгледайте нашите 3D визуализации и реализирани проекти за кухни, гардероби и мебели по поръчка.
              Всеки проект е създаден с внимание към детайла, функционалност и естетика.
            </p>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1.05rem', maxWidth: '60ch' }}>
              3D проектът ви позволява да видите как ще изглеждат мебелите преди изработка — материали, цветове,
              разположение, всички детайли. Правим корекции докато не постигнем желания резултат.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/3d-проекти/${project.slug}/`}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-cream">
                  <Image
                    src={project.image}
                    alt={`3D визуализация – ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 font-body font-medium text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.95)', color: '#8B6F47' }}>
                      <Eye size={13} />
                      3D визуализация
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-body text-xs font-medium uppercase tracking-wider" style={{ color: '#8B6F47' }}>
                      {project.category}
                    </span>
                    <span style={{ color: '#9B9490' }}>•</span>
                    <span className="font-body text-xs" style={{ color: '#9B9490' }}>
                      {project.style}
                    </span>
                  </div>
                  <h2 className="font-display font-semibold text-charcoal mb-3 leading-tight" style={{ fontSize: '1.25rem' }}>
                    {project.title}
                  </h2>
                  <p className="font-body text-warm-gray leading-relaxed mb-4" style={{ fontSize: '0.9rem' }}>
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 font-body font-medium text-sm group-hover:gap-3 transition-all" style={{ color: '#8B6F47' }}>
                    Виж проекта
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl text-center">
          <h2 className="font-display font-bold heading-gradient mb-6" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
            Искате подобен проект?
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mb-8" style={{ fontSize: '1.05rem' }}>
            Започнете с безплатна консултация и 3D визуализация на вашите мебели.
            Огледът е 50 €, приспадат се при поръчка. 3D проектът също се приспада 100%.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/контакти/"
              className="btn-primary inline-flex items-center gap-2"
            >
              Искам подобен проект →
            </Link>
            <Link
              href="/услуги/3d-визуализация/"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Как работи 3D проектът
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
