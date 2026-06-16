import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'ofis')!

export const metadata: Metadata = {
  title: 'Офис мебели по поръчка Благоевград | Dom Expert Мебел',
  description: 'Офис обзавеждане по поръчка в Благоевград и София. Бюра, шкафове, конферентни маси. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/услуги/офис-мебели/' },
}

export default function OfisMebeliPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Офис обзавеждане по поръчка за вашия бизнес. Бюра, шкафове, конферентни маси и рецепции с корпоративен дизайн."
      heroImage={service.image}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
