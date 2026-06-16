import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'kuhni')!

export const metadata: Metadata = {
  title: 'Кухни по поръчка Благоевград | Dom Expert Мебел',
  description: 'Изработка на кухни по поръчка в Благоевград и София. МДФ, ПДЧ, гланц. 3D проект безплатно. Монтаж included. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/кухни-по-поръчка/' },
}

export default function KuhniPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Изработваме кухни по поръчка, съобразени с вашия стил и пространство. Безплатен 3D проект, монтаж и гаранция."
      heroImage={service.image}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
