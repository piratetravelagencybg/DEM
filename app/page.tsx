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
import { getAllMbxCatalogProducts } from '@/lib/mbx-catalog'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Мебели по поръчка Благоевград и София | Dom Expert Мебел',
  description: 'Семейна фирма за мебели по поръчка в Благоевград и София. Кухни, гардероби, спални, офис мебели. Безплатна консултация и 3D проект. Тел: 0876 081 199',
  path: '/',
  imageAlt: 'Мебели по поръчка от Dom Expert Мебел',
})

export default function HomePage() {
  const catalogPreview = getAllMbxCatalogProducts().slice(0, 6)

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <ServicesGrid />
      <AboutSection />
      <Visualization3D />
      <ProcessSteps />
      <ProjectsGallery />
      <CatalogPreview products={catalogPreview} />
      <Testimonials />
      <CTABar />
    </>
  )
}
