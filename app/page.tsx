import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import AboutSection from '@/components/home/AboutSection'
import Visualization3D from '@/components/home/Visualization3D'
import ProcessSteps from '@/components/home/ProcessSteps'
import ProjectsGallery from '@/components/home/ProjectsGallery'
import CatalogPreview from '@/components/home/CatalogPreview'
import Testimonials from '@/components/home/Testimonials'
import CTABar from '@/components/home/CTABar'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'

export const metadata: Metadata = {
  title: { absolute: 'Мебели по поръчка Благоевград и София | Dom Expert Мебел' },
  description: 'Семейна фирма за мебели по поръчка в Благоевград и София. Кухни, гардероби, спални, офис мебели. Безплатна консултация и 3D проект. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/' },
  openGraph: {
    title: 'Мебели по поръчка | Dom Expert Мебел — Благоевград & София',
    description: 'Семейна фирма за мебели по поръчка. Безплатна консултация и 3D проект.',
    url: 'https://domexpertmebel.bg/',
  },
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <ServicesGrid />
      <AboutSection />
      <Visualization3D />
      <ProcessSteps />
      <ProjectsGallery />
      <CatalogPreview />
      <Testimonials />
      <CTABar />
    </>
  )
}
