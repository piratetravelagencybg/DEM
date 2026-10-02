import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Eye } from 'lucide-react'

const projects3D = [
  {
    slug: 'kuhnya-domexpert-v17',
    title: '3D проект на кухня – Кашмир монохромна',
    description: 'Модерна монохромна кухня с кашмир фронтове, тъмен мраморен гръб Laminam и остров с канали.',
    image: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp',
    category: 'Кухня',
  },
]

export default function Projects3DShowcase() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow-pill">Портфолио</span>
          <h2 className="font-display font-bold heading-gradient mb-4" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)' }}>
            Наши 3D проекти
          </h2>
          <p className="font-body text-warm-gray max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.05rem' }}>
            Разгледайте професионални 3D визуализации на мебели по поръчка — кухни, гардероби и спални
            с внимание към детайла и функционалност.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {projects3D.map((project) => (
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
                </div>
                <h3 className="font-display font-semibold text-charcoal mb-3 leading-tight" style={{ fontSize: '1.15rem' }}>
                  {project.title}
                </h3>
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

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/3d-проекти/"
            className="inline-flex items-center gap-2 font-body font-semibold hover:gap-3 transition-all"
            style={{ color: '#8B6F47', fontSize: '1rem' }}
          >
            Виж всички 3D проекти
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
