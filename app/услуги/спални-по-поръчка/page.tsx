import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'spalni')!

export const metadata: Metadata = {
  title: { absolute: 'Спални по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Спални по поръчка в Благоевград и София. Тапицирани легла, нощни шкафчета, цялостни комплекти. Безплатен 3D проект. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/спални-по-поръчка/' },
}

export default function SpalniPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Спални комплекти по поръчка — тапицирани легла, нощни шкафчета и гардероби, проектирани за вашето пространство."
      heroImage={service.image}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
