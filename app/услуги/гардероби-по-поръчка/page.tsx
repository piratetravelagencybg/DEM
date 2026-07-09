import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'garderob')!

export const metadata: Metadata = {
  title: { absolute: 'Гардероби по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Вградени гардероби по поръчка в Благоевград и София. Плъзгащи врати, LED осветление. Точни размери. Безплатен 3D проект. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/гардероби-по-поръчка/' },
}

export default function GarderobPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Вградени гардероби и гардеробни системи по поръчка за всяко пространство. Плъзгащи врати, LED осветление и множество опции."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
