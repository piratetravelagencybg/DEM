import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'spalni')!

export const metadata: Metadata = {
  title: 'Спални по поръчка Благоевград | Dom Expert Мебел',
  description: 'Спални по поръчка в Благоевград и София. Легла, нощни шкафчета, тапицерия. 3D проект безплатно. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/спални-по-поръчка/' },
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
