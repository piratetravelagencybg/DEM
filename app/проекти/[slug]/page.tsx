import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Expand, Hammer, Images, Layers, MapPin, PencilRuler, Ruler } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ProjectGallery, { ProjectGalleryTrigger } from '@/components/ui/ProjectGallery'
import { categoryLabels } from '@/components/ui/ProjectCards'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import {
  caseStudyProjects,
  projectHref,
  projectImageAlt,
  projectImageBadge,
  projectPlace,
  projectStatusLabel,
  projects,
} from '@/lib/projects'
import { createPageMetadata, prepareSeoDescription } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

const SITE_URL = 'https://domexpertmebel.com'

const serviceByCategory = {
  kuhni: { title: 'Кухни по поръчка', href: '/услуги/кухни-по-поръчка/' },
  garderob: { title: 'Гардероби по поръчка', href: '/услуги/гардероби-по-поръчка/' },
  spalni: { title: 'Спални по поръчка', href: '/услуги/спални-по-поръчка/' },
  dnevni: { title: 'Дневни по поръчка', href: '/услуги/дневни-по-поръчка/' },
  ofis: { title: 'Офис мебели по поръчка', href: '/услуги/офис-мебели/' },
  saloni: { title: 'Мебели за салони за красота', href: '/услуги/обзавеждане-на-обекти/салони-за-красота/' },
  detska: { title: 'Детски мебели по поръчка', href: '/услуги/спални-по-поръчка/' },
} as const

const cityPageByName = {
  Благоевград: '/благоевград/',
  София: '/софия/',
  Дупница: '/дупница/',
  Сандански: '/сандански/',
  Петрич: '/петрич/',
} as const

const seoDescriptionBySlug: Record<string, string> = {
  'kuhnya-s-ostrov-sofia': 'Реализирана кухня с остров в София от бял МДФ гланц и дъб натурал, с техника Bosch, гранитен плот и осветление. Срок: 5 седмици.',
  'garderob-sistema-blagoevgrad': 'Реализирана гардеробна система в Благоевград с плъзгащи огледални врати, LED осветление и отделения за съхранение. Срок: 2 седмици.',
  'dnevna-po-poruchka-dupnitsa': 'Реализирана дневна по поръчка в Дупница с ТВ секция, библиотека, вградено осветление, дъбов фурнир и метален акцент. Срок: 4 седмици.',
  'spalna-tapicirano-leglo-blagoevgrad': 'Реализирана спалня по поръчка в Благоевград с тапицирано легло, нощни шкафчета и вграден гардероб от МДФ и ПДЧ. Срок: 5 седмици.',
  'ofis-blagoevgrad': 'Реализирано офис обзавеждане в Благоевград за счетоводна кантора: бюра, архивни шкафове и рецепция от ПДЧ и МДФ. Срок: 3 седмици.',
  'kuhnya-klasicheska-sandanski': 'Реализирана класическа кухня в Сандански в крем и злато, с фрезовани врати, кварцов плот Silestone и вграден абсорбатор. Срок: 6 седмици.',
}

function getService(category: string) {
  return serviceByCategory[category as keyof typeof serviceByCategory] || {
    title: 'Мебели по поръчка',
    href: '/услуги/',
  }
}

function getCityPage(city: string) {
  return cityPageByName[city as keyof typeof cityPageByName] || '/контакти/'
}

const PROJECT_SOCIAL_IMAGES: Record<string, string> = {
  kuhni: '/images/og/kitchens.webp',
  garderob: '/images/og/wardrobes.webp',
  spalni: '/images/og/bedrooms.webp',
  dnevni: '/images/og/living.webp',
  ofis: '/images/og/office.webp',
  saloni: '/portfolio/3d-proekt-salon-za-krasota/3d-vizualizatsiya-salon-za-krasota-obsht-izgled-1.webp',
}

export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = caseStudyProjects.find((candidate) => candidate.slug === params.slug)
  if (!project) return {}
  const is3d = project.status === '3d'

  const titleCore = `${is3d ? '3D проект: ' : ''}${project.title}${projectPlace(project)}`
  // Full brand when it fits in 60 characters, short brand otherwise.
  const brand = titleCore.length + 20 <= 60 ? 'Дом Експерт Мебел' : 'Дом Експерт'

  return createPageMetadata({
    title: `${titleCore} | ${brand}`,
    description: prepareSeoDescription(seoDescriptionBySlug[project.slug] || project.description),
    path: `/проекти/${project.slug}/`,
    image: is3d ? project.images[0] : PROJECT_SOCIAL_IMAGES[project.category] || '/images/og/home.webp',
    imageAlt: projectImageAlt(project),
  })
}

export default function ProjectPage({ params }: Props) {
  const project = caseStudyProjects.find((candidate) => candidate.slug === params.slug)
  if (!project) notFound()
  const is3d = project.status === '3d'
  const isPhoto = project.imageType === 'photo'
  const statusLabel = projectStatusLabel(project)

  const service = getService(project.category)
  const cityPage = getCityPage(project.city)
  const projectUrl = `${SITE_URL}/проекти/${project.slug}/`
  const related = projects
    .filter((candidate) => candidate.id !== project.id)
    .sort((left, right) => {
      const leftScore = Number(left.category === project.category) * 2 + Number(left.city === project.city)
      const rightScore = Number(right.category === project.category) * 2 + Number(right.city === project.city)
      return rightScore - leftScore
    })
    .slice(0, 3)
  const materials = project.materials.split(',').map((material) => material.trim())

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${projectUrl}#project`,
    url: projectUrl,
    name: `${is3d ? '3D проект: ' : ''}${project.title}${projectPlace(project)}`,
    headline: project.title,
    description: project.description,
    image: project.images.map((src) => `${SITE_URL}${src}`),
    inLanguage: 'bg-BG',
    material: materials,
    creator: { '@id': `${SITE_URL}/#business` },
    ...(project.city ? { contentLocation: { '@type': 'City', name: project.city } } : {}),
    about: {
      '@type': 'Service',
      name: service.title,
      url: `${SITE_URL}${service.href}`,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/проекти/#collection`,
      name: 'Проекти',
      url: `${SITE_URL}/проекти/`,
    },
  }

  const processSteps = [
    {
      icon: Ruler,
      title: 'Разговор и оглед 50 €',
      description: 'Уточняваме задачата и вземаме точни размери на място, преди да предложим конкретно решение.',
    },
    {
      icon: PencilRuler,
      title: 'Проект, материали и оферта',
      description: 'Избираме разпределението и материалите. 3D проектът се заплаща, а сумата се приспада при възлагане на поръчката.',
    },
    {
      icon: Hammer,
      title: 'Изработка и монтаж',
      description: 'След одобрението изработваме и монтираме мебелите. За изделията предоставяме 2 години гаранция.',
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: `${SITE_URL}/` },
        { name: 'Проекти', url: `${SITE_URL}/проекти/` },
        { name: project.title, url: projectUrl },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema).replace(/</g, '\\u003c') }}
      />
      {project.video && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: `Видео: ${project.title}`,
            description: project.description,
            thumbnailUrl: `${SITE_URL}${project.video.poster}`,
            contentUrl: `${SITE_URL}${project.video.src}`,
            uploadDate: project.video.uploadDate,
          }).replace(/</g, '\\u003c') }}
        />
      )}

      <div className="pt-24">
        <article>
          <header className="relative h-[430px] overflow-hidden bg-charcoal sm:h-[500px] lg:h-[600px]">
            {isPhoto ? (
              <>
                {/* Real photos are often portrait: show the whole frame over a blurred copy instead of cropping it. */}
                <Image
                  src={project.images[0]}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="scale-110 object-cover opacity-60 blur-2xl"
                  sizes="640px"
                />
                <Image
                  src={project.images[0]}
                  alt={projectImageAlt(project)}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </>
            ) : (
              <Image
                src={project.images[0]}
                alt={projectImageAlt(project)}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 container-main pb-8 sm:pb-12">
              <Link href="/проекти/" className="mb-5 inline-flex items-center gap-2 font-body text-sm text-white/80 transition-colors hover:text-white">
                <ArrowLeft size={16} aria-hidden="true" /> Всички проекти
              </Link>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {statusLabel}{project.city ? ` · ${project.city}` : ''}
              </p>
              <h1 className="max-w-4xl font-display font-semibold text-white" style={{ fontSize: 'var(--text-h1)' }}>
                {project.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <ProjectGalleryTrigger
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-body text-sm font-semibold text-charcoal shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <Images size={17} aria-hidden="true" /> Разгледай снимките ({project.images.length})
                </ProjectGalleryTrigger>
                {[categoryLabels[project.category], project.city].filter(Boolean).map((label) => (
                  <span key={label} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-md">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <section className="section-py bg-cream" aria-labelledby="project-overview-title">
            <div className="container-main grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
              <div className="space-y-10">
                <div>
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-walnut">{statusLabel}</p>
                  <h2 id="project-overview-title" className="section-title mb-6 text-left">{is3d ? 'Задача и проектно решение' : 'Задача и изпълнено решение'}</h2>
                  <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div className="space-y-6">
                      <p className="font-body text-lg leading-relaxed text-charcoal/85 sm:text-xl sm:leading-relaxed">{project.description}</p>
                      <div className="rounded-card border-l-4 border-walnut bg-warm-white p-5 shadow-sm">
                        <h3 className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-walnut">Задачата</h3>
                        <p className="font-body text-sm leading-relaxed text-warm-gray sm:text-base">
                          {is3d
                            ? `3D проект на ${project.title.toLocaleLowerCase('bg-BG')}${project.city ? ` за обект в ${project.city}` : ''}, подготвен преди изработка. Проектът е част от портфолиото ни за ${service.title.toLocaleLowerCase('bg-BG')}.`
                            : `Реализация на ${project.title.toLocaleLowerCase('bg-BG')}${project.city ? ` за обект в ${project.city}` : ''}. Проектът е част от портфолиото ни за ${service.title.toLocaleLowerCase('bg-BG')}.`}
                        </p>
                      </div>
                    </div>
                    <ProjectGalleryTrigger
                      className="group relative block w-full overflow-hidden rounded-card shadow-md"
                      ariaLabel="Отвори основната снимка на цял екран"
                    >
                      <Image
                        src={project.images[0]}
                        alt={projectImageAlt(project, 'основен изглед')}
                        width={1024}
                        height={1365}
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-body text-xs font-semibold text-white backdrop-blur-md">
                        <Expand size={13} aria-hidden="true" /> Увеличи
                      </span>
                    </ProjectGalleryTrigger>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 font-display text-2xl font-semibold text-charcoal sm:text-3xl">{is3d ? 'Предвидени материали' : 'Потвърдени материали и изпълнение'}</h2>
                  <p className="mb-5 max-w-3xl font-body leading-relaxed text-warm-gray">
                    {is3d
                      ? `Предвидени материали в 3D проекта: ${project.materials}. Материалите и детайлите се потвърждават преди изработка.`
                      : `За тази реализация са използвани ${project.materials}.${project.city ? ` Проектът е изпълнен в ${project.city}${project.duration ? ` за посочения срок от ${project.duration}` : ''}.` : ''}`}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label="Използвани материали">
                    {materials.map((material) => (
                      <li key={material} className="rounded-full border border-walnut/20 bg-warm-white px-4 py-2 font-body text-sm font-medium text-charcoal">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Данни и връзки за проекта">
                <div className="rounded-card bg-warm-white p-6 shadow-sm">
                  <h2 className="mb-5 font-display text-xl font-semibold text-charcoal">Данни за проекта</h2>
                  <dl className="space-y-5">
                    {[
                      { icon: PencilRuler, label: 'Статус', value: statusLabel },
                      { icon: MapPin, label: 'Град', value: project.city },
                      { icon: Layers, label: 'Материали', value: project.materials },
                      { icon: Clock, label: 'Срок на реализация', value: project.duration },
                    ].filter(({ value }) => value).map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon size={18} className="mt-0.5 flex-shrink-0 text-walnut" aria-hidden="true" />
                        <div>
                          <dt className="font-body text-xs text-warm-gray">{label}</dt>
                          <dd className="font-body text-sm font-medium leading-relaxed text-charcoal">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                <nav className="rounded-card border border-walnut/10 bg-warm-white p-5" aria-label="Свързани страници">
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-walnut">Научете повече</p>
                  <div className="divide-y divide-walnut/10">
                    {[
                      { href: service.href, label: service.title },
                      ...(is3d ? [{ href: '/услуги/3d-визуализация/', label: '3D проект преди изработка' }] : []),
                      ...(project.city ? [{ href: cityPage, label: `Мебели по поръчка в ${project.city}` }] : []),
                      { href: '/проекти/', label: 'Всички проекти' },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="group flex items-center justify-between gap-3 py-3 font-body text-sm font-medium text-charcoal hover:text-walnut">
                        {link.label}
                        <ArrowRight size={15} className="flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </nav>
                <Link href="#zapytvane" className="btn-primary w-full justify-center">Запитване за подобен проект</Link>
              </aside>
            </div>
          </section>

          {project.images.length > 0 && (
            <section className="section-py bg-warm-white" aria-labelledby="project-gallery-title">
              <div className="container-main">
                {projectImageBadge(project) && (
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-walnut">{projectImageBadge(project)}</p>
                )}
                <h2 id="project-gallery-title" className="section-title mb-8 text-left">Всички снимки от проекта <span className="text-warm-gray">({project.images.length})</span></h2>
                {project.video && (
                  <div className={`mb-6 ${project.video.height > project.video.width ? 'mx-auto max-w-sm' : 'max-w-4xl'}`}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={project.video.poster}
                      width={project.video.width}
                      height={project.video.height}
                      className="h-auto w-full rounded-card bg-charcoal"
                      aria-label={`Видео: ${project.title}`}
                    >
                      <source src={project.video.src} type="video/mp4" />
                    </video>
                  </div>
                )}
                <ProjectGallery
                  images={project.images}
                  alts={project.images.map((_, index) => projectImageAlt(project, `изглед ${index + 1}`))}
                  title={project.title}
                />
              </div>
            </section>
          )}

          <section className="section-py bg-warm-white" aria-labelledby="project-process-title">
            <div className="container-main">
              <div className="mb-9 max-w-3xl">
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-walnut">При нова поръчка</p>
                <h2 id="project-process-title" className="section-title mb-4 text-left">Как протича подобен проект</h2>
                <p className="font-body leading-relaxed text-warm-gray">
                  Това са стандартните стъпки, по които работим при нов проект за мебели по поръчка. Данните за показания проект са посочени по-горе.
                </p>
              </div>
              <ol className="grid gap-5 md:grid-cols-3">
                {processSteps.map(({ icon: Icon, title, description }, index) => (
                  <li key={title} className="rounded-card border border-walnut/10 bg-cream p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-walnut text-white"><Icon size={20} aria-hidden="true" /></span>
                      <span className="font-display text-3xl font-semibold text-walnut/25">0{index + 1}</span>
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold text-charcoal">{title}</h3>
                    <p className="font-body text-sm leading-relaxed text-warm-gray">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <section className="section-py bg-cream" aria-labelledby="related-projects-title">
            <div className="container-main">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-walnut">Още идеи</p>
                  <h2 id="related-projects-title" className="section-title text-left">Други проектни казуси</h2>
                </div>
                <Link href="/проекти/" className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-walnut">
                  Разгледайте всички проекти <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((candidate) => (
                  <Link key={candidate.id} href={projectHref(candidate)} className="group card overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={candidate.images[0]}
                        alt={projectImageAlt(candidate)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {projectImageBadge(candidate) && (
                        <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                          {projectImageBadge(candidate)}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold text-charcoal transition-colors group-hover:text-walnut">{candidate.title}</h3>
                      <p className="mt-1 font-body text-sm text-warm-gray">{[candidate.city, candidate.duration].filter(Boolean).join(' · ') || projectStatusLabel(candidate)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="zapytvane" className="section-py scroll-mt-28 bg-cream">
          <div className="container-main max-w-2xl">
            <div className="mb-9 text-center">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-walnut">Вашият проект</p>
              <h2 className="section-title mb-4">Искате подобно решение?</h2>
              <p className="mx-auto max-w-xl font-body leading-relaxed text-warm-gray">
                Разкажете ни за помещението и желаните мебели. Ще се свържем с вас, за да уточним следващите стъпки — 3D проект или оглед.
              </p>
            </div>
            <div className="rounded-card bg-warm-white p-6 shadow-sm sm:p-8"><QuoteForm /></div>
          </div>
        </section>
      </div>
    </>
  )
}
