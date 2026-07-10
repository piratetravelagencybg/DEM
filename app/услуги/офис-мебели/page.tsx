import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'ofis')!

export const metadata: Metadata = {
  title: { absolute: 'Офис мебели по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Офис обзавеждане по поръчка в Благоевград и София. Бюра, шкафове, конферентни маси, рецепции. Корпоративен дизайн. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/офис-мебели/' },
  openGraph: {
    url: 'https://domexpertmebel.com/услуги/офис-мебели/',
    title: 'Офис мебели по поръчка Благоевград и София | Dom Expert Мебел',
    description: 'Офис обзавеждане по поръчка в Благоевград и София. Бюра, шкафове, конферентни маси. Корпоративен дизайн.',
    images: [{ url: '/images/real/office-corner.png', width: 1200, height: 630, alt: 'Офис мебели по поръчка — Dom Expert Мебел' }],
  },
}

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
    />
  )
}
