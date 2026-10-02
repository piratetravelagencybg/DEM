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
import { getAllMbxProducts } from '@/lib/mbx'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Мебели по поръчка | Dom Expert Мебел',
  description: 'Мебели по поръчка за кухня, спалня, дневна и офис. Безплатен оглед, платен 3D проект с приспадане при поръчка, монтаж и 2 г. гаранция.',
  path: '/',
  imageAlt: 'Мебели по поръчка от Dom Expert Мебел',
})

export default function HomePage() {
  const catalogPreview = getAllMbxProducts().slice(0, 6)

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <ServicesGrid />
      <GoogleReviews />
      <ProcessSteps />
      <Visualization3D />
      <ProjectsGallery />
      <AboutSection />
      <CatalogPreview products={catalogPreview} />
      <GoogleBusinessProfile />
      <CTABar />
    </>
  )
}
