import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'

const service = services.find((s) => s.id === 'montaj')!

export const metadata: Metadata = {
  title: { absolute: 'Монтаж на мебели Благоевград и София | Dom Expert Мебел' },
  description: 'Професионален монтаж на мебели в Благоевград и София. Бърза реакция до 24-48 часа, гаранция, почистване след работа. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/монтаж/' },
  openGraph: {
    url: 'https://domexpertmebel.com/услуги/монтаж/',
    title: 'Монтаж на мебели Благоевград и София | Dom Expert Мебел',
    description: 'Професионален монтаж на мебели в Благоевград и София. Бърза реакция до 24-48 часа, гаранция.',
    images: [{ url: '/images/real/kuhnya-06.png', width: 1200, height: 630, alt: 'Монтаж на мебели — Dom Expert Мебел' }],
  },
}

export default function MontajPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Прецизен монтаж на всички видове мебели с гаранция. Работим бързо, чисто и отговорно."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
