import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'garderob')!

export const metadata: Metadata = {
  title: 'Гардероби по поръчка Благоевград | Dom Expert Мебел',
  description: 'Вградени гардероби по поръчка в Благоевград и София. Плъзгащи врати, LED осветление. 3D проект безплатно. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/гардероби-по-поръчка/' },
}

export default function GarderobPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Вградени гардероби и гардеробни системи по поръчка за всяко пространство. Плъзгащи врати, LED осветление и множество опции."
      heroImage={service.image}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
