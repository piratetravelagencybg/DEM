import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import ProjectHighlight from '@/components/ui/ProjectHighlight'
import services from '@/data/services.json'
import projects from '@/data/projects.json'
import { completePageMetadata } from '@/lib/seo'

const service = services.find((s) => s.id === 'dnevni')!
const featuredProject = projects.find((project) => project.slug === 'dnevna-po-poruchka-dupnitsa')!

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Дневни по поръчка Благоевград | Dom Expert Мебел' },
  description: 'Мебели за дневна по поръчка в Благоевград, София и региона. ТВ секции, стелажи и холни маси с безплатен оглед и 2 г. гаранция.',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/дневни-по-поръчка/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/услуги/дневни-по-поръчка/',
    title: 'Дневни по поръчка Благоевград | Dom Expert Мебел',
    description: 'Мебели за дневна по поръчка в Благоевград, София и региона. ТВ секции, стелажи и холни маси с безплатен оглед.',
    images: [{ url: '/images/og/living.webp', width: 1200, height: 630, alt: 'Примерна визуализация на мебели за дневна' }],
  },
})

export default function DnevniPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="ТВ секции, стелажи и мебели за дневната стая по ваш проект. Функционален дизайн и прецизна изработка."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    >
      <ProjectHighlight
        title={featuredProject.title}
        description={featuredProject.description}
        city={featuredProject.city}
        duration={featuredProject.duration}
        image={featuredProject.images[0]}
        href={'/проекти/' + featuredProject.slug + '/'}
      />
    </ServicePageTemplate>
  )
}
