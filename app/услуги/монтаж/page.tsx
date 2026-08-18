import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import services from '@/data/services.json'
import { completePageMetadata } from '@/lib/seo'

const service = services.find((s) => s.id === 'montaj')!

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Монтаж на мебели Благоевград и София | Dom Expert Мебел' },
  description: 'Професионален монтаж на мебели в Благоевград и София с предварително уточнен срок, гаранция и почистване след работа. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/услуги/монтаж/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/услуги/монтаж/',
    title: 'Монтаж на мебели Благоевград и София | Dom Expert Мебел',
    description: 'Професионален монтаж на мебели в Благоевград и София с предварително уточнен срок и гаранция.',
    images: [{ url: '/images/og/assembly.webp', width: 1200, height: 630, alt: 'Илюстративна снимка на инструменти за монтаж на мебели' }],
  },
})

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
