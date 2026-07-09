import type { Metadata } from 'next'
import CatalogClient from './CatalogClient'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: { absolute: 'Онлайн магазин | Готови мебели на склад — Dom Expert Мебел' },
  description: 'Готови мебели на склад с бърза доставка. Дивани, маси, столове, ТВ шкафове. Гаранция 2 год. Поръчай онлайн от Dom Expert Мебел. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/каталог/' },
}

export default function CatalogPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.bg/' },
        { name: 'Онлайн магазин', url: 'https://domexpertmebel.bg/каталог/' },
      ]} />
      <CatalogClient />
      <CTABar />
    </>
  )
}
