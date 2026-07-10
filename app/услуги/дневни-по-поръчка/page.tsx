import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'dnevni')!

export const metadata: Metadata = {
  title: { absolute: 'Дневни по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Мебели за дневна по поръчка в Благоевград и София. ТВ секции, стелажи, холни маси. Индивидуален дизайн и безплатен 3D проект. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/дневни-по-поръчка/' },
  openGraph: {
    url: 'https://domexpertmebel.com/услуги/дневни-по-поръчка/',
    title: 'Дневни по поръчка Благоевград и София | Dom Expert Мебел',
    description: 'Мебели за дневна по поръчка в Благоевград и София. ТВ секции, стелажи, холни маси. Безплатен 3D проект.',
    images: [{ url: '/images/real/dnevna-01.png', width: 1200, height: 630, alt: 'Дневни по поръчка — Dom Expert Мебел' }],
  },
}

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
    />
  )
}
