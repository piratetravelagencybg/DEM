import Image from 'next/image'
import Link from 'next/link'
import {
  projectHref,
  projectImageAlt,
  projectImageBadge,
  projectStatusLabel,
  type Project,
} from '@/lib/projects'

const categoryLabels: Record<string, string> = {
  kuhni: 'Кухня',
  garderob: 'Гардероб',
  spalni: 'Спалня',
  dnevni: 'Дневна',
  ofis: 'Офис',
  saloni: 'Салон за красота',
}

/** Card grid of projects; labels follow each project's status. */
export default function ProjectCards({
  items,
  headingLevel = 'h3',
}: {
  items: Project[]
  headingLevel?: 'h2' | 'h3'
}) {
  const Heading = headingLevel
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((project) => (
        <Link
          key={project.id}
          href={projectHref(project)}
          className="group card overflow-hidden"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.images[0]}
              alt={projectImageAlt(project)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute left-3 top-3 z-10 rounded-full bg-charcoal/80 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              {projectImageBadge(project)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-5">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-walnut">
              {categoryLabels[project.category] ?? 'Мебели по поръчка'} · {projectStatusLabel(project)}
            </span>
            <Heading className="font-display font-semibold text-charcoal text-xl mb-1 group-hover:text-walnut transition-colors">
              {project.title}
            </Heading>
            {(project.city || project.duration) && (
              <p className="font-body text-warm-gray text-sm">
                {[project.city, project.duration].filter(Boolean).join(' · ')}
              </p>
            )}
            <p className="font-body text-warm-gray text-sm mt-2 line-clamp-2">{project.description}</p>
            <p className="mt-3 border-t border-walnut/10 pt-3 font-body text-xs leading-relaxed text-warm-gray">
              {project.imageCaption}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
