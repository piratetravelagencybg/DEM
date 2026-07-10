import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'kuhni')!

export const metadata: Metadata = {
  title: { absolute: 'Кухни по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Изработваме кухни по поръчка в Благоевград и София. МДФ, гланц, ПДЧ. Безплатен 3D проект, монтаж и гаранция 2 год. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/кухни-по-поръчка/' },
  openGraph: {
    url: 'https://domexpertmebel.com/услуги/кухни-по-поръчка/',
    title: 'Кухни по поръчка Благоевград и София | Dom Expert Мебел',
    description: 'Изработваме кухни по поръчка в Благоевград и София. МДФ, гланц, ПДЧ. Безплатен 3D проект, монтаж и гаранция 2 год.',
    images: [{ url: '/images/real/kuhnya-01.png', width: 1200, height: 630, alt: 'Кухни по поръчка — Dom Expert Мебел' }],
  },
}

export default function KuhniPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Изработваме кухни по поръчка, съобразени с вашия стил и пространство. Безплатен 3D проект, монтаж и гаранция."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
