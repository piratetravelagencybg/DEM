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
      subtitle="Доставяме и монтираме с нашия екип мебелите, които изработваме в работилницата си в Благоевград — кухни, гардероби, спални, дневни и офис мебели. Монтажът следва изработката (4–6 седмици след одобрение на 3D проекта, който е от 50 €, а за кухня от 100 €; огледът е 50 € и също се приспада), а денят за доставка и монтаж се уговаря за всеки проект."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
    />
  )
}
