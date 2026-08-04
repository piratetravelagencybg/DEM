import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'

interface ProjectHighlightProps {
  title: string
  description: string
  city: string
  duration: string
  image: string
  href: string
}

export default function ProjectHighlight({
  title,
  description,
  city,
  duration,
  image,
  href,
}: ProjectHighlightProps) {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main">
        <div
          className="grid md:grid-cols-2 items-stretch overflow-hidden rounded-2xl bg-white"
          style={{ border: '1px solid #E7DDCF' }}
        >
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <Image
              src={image}
              alt={title + ' — ' + city}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <span className="eyebrow-pill self-start">Реализиран проект</span>
            <h2 className="font-display font-bold text-charcoal mt-2" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}>
              {title}
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4">{description}</p>
            <div className="flex flex-wrap gap-4 mt-5 font-body text-sm text-warm-gray">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-walnut" aria-hidden="true" />
                {city}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-walnut" aria-hidden="true" />
                {duration}
              </span>
            </div>
            <Link href={href} className="btn-outline inline-flex self-start items-center gap-2 mt-7">
              Вижте проекта
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
