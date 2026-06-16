import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'dnevni')!

export const metadata: Metadata = {
  title: 'Дневни по поръчка Благоевград | Dom Expert Мебел',
  description: 'Мебели за дневна по поръчка — ТВ секции, стелажи, холни маси в Благоевград и София. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/дневни-по-поръчка/' },
}

export default function DnevniPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="ТВ секции, стелажи и мебели за дневната стая по ваш проект. Функционален дизайн и прецизна изработка."
      heroImage={service.image}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
