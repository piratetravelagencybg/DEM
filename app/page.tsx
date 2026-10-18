import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import AboutSection from '@/components/home/AboutSection'
import Visualization3D from '@/components/home/Visualization3D'
import ProcessSteps from '@/components/home/ProcessSteps'
import ProjectsGallery from '@/components/home/ProjectsGallery'
import CatalogPreview from '@/components/home/CatalogPreview'
import GoogleReviews from '@/components/home/GoogleReviews'
import GoogleBusinessProfile from '@/components/home/GoogleBusinessProfile'
import CTABar from '@/components/home/CTABar'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import SiteSchema from '@/components/seo/SiteSchema'
import ServiceLinks from '@/components/ui/ServiceLinks'
import CityLinks from '@/components/ui/CityLinks'
import { getAllMbxProducts } from '@/lib/mbx'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Мебели по поръчка | 3D проект и монтаж | Dom Expert Мебел',
  description: 'Кухни, гардероби и спални по поръчка с 3D проект преди изработка. 100+ проекта от 2012 г., 2 г. гаранция, 5★ в Google. Оглед 50 € – приспада се.',
  path: '/',
  imageAlt: 'Мебели по поръчка от Dom Expert Мебел',
})

export default function HomePage() {
  const catalogPreview = getAllMbxProducts().slice(0, 6)

  return (
    <>
      <SiteSchema />
      <LocalBusinessSchema />
      <Hero />
      <ServicesGrid />
      <GoogleReviews />
      <ProcessSteps />
      <Visualization3D />
      <ProjectsGallery />
      <AboutSection />
      <CatalogPreview products={catalogPreview} />
      <ServiceLinks title="Услуги по поръчка" background="var(--color-warm-white)" />
      <CityLinks title="Мебели по поръчка в градовете, които обслужваме" background="var(--color-cream)" />
      <GoogleBusinessProfile />
      <CTABar />
    </>
  )
}
