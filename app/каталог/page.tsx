import type { Metadata } from 'next'
import CatalogClient from './CatalogClient'
import CTABar from '@/components/home/CTABar'

export const metadata: Metadata = {
  title: 'Онлайн магазин | Готови мебели на склад — Dom Expert Мебел',
  description: 'Разгледайте нашия онлайн магазин с готови мебели на склад. Дивани, маси, столове, ТВ шкафове. Бърза доставка. Гаранция 2 години.',
  alternates: { canonical: 'https://domexpertmebel.bg/каталог/' },
}

export default function CatalogPage() {
  return (
    <>
      <CatalogClient />
      <CTABar />
    </>
  )
}
