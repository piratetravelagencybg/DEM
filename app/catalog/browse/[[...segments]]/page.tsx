import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { parseCatalogSegments } from '@/lib/catalog-routing'
import { buildCatalogMetadata, CatalogView } from '@/app/каталог/page'

type Props = {
  params: { segments?: string[] }
}

export const dynamicParams = true
export const revalidate = 86400

export function generateStaticParams() {
  return []
}

export function generateMetadata({ params }: Props): Metadata {
  const state = parseCatalogSegments(params.segments)
  if (!state) return {}
  return buildCatalogMetadata(state)
}

export default function CatalogBrowsePage({ params }: Props) {
  const state = parseCatalogSegments(params.segments)
  if (!state) notFound()
  return <CatalogView {...state} />
}
