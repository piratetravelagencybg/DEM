import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import ProjectHighlight from '@/components/ui/ProjectHighlight'
import services from '@/data/services.json'
import projects from '@/data/projects.json'
import { completePageMetadata } from '@/lib/seo'

const service = services.find((s) => s.id === 'ofis')!
const featuredProject = projects.find((project) => project.slug === 'ofis-blagoevgrad')!

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Офис мебели по поръчка | Dom Expert Мебел' },
  description: 'Офис обзавеждане по поръчка в Благоевград и София. Бюра, шкафове, конферентни маси, рецепции. Корпоративен дизайн. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/офис-мебели/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/услуги/офис-мебели/',
    title: 'Офис мебели по поръчка | Dom Expert Мебел',
    description: 'Офис обзавеждане по поръчка в Благоевград и София. Бюра, шкафове, конферентни маси. Корпоративен дизайн.',
    images: [{ url: '/images/og/office.webp', width: 1200, height: 630, alt: 'Примерна визуализация на офис мебели по поръчка' }],
  },
})

export default function OfisMebeliPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Офис обзавеждане по поръчка за вашия бизнес. Бюра, шкафове, конферентни маси и рецепции с корпоративен дизайн."
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
