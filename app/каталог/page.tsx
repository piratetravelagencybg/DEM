import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMbxCatalogProducts } from '@/lib/mbx-catalog'
import { getCatalogCategoryId, getCatalogProductTypeId, PRODUCT_TYPES } from '@/lib/product-display'
import {
  buildCatalogHref,
  CATEGORIES,
  normalizeCatalogCategory,
  normalizeCatalogSort,
  normalizeCatalogType,
  type CatalogRouteState,
} from '@/lib/catalog-routing'
import CatalogClient from './CatalogClient'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const BASE_URL = 'https://domexpertmebel.com'
const CATALOG_IMAGE = '/images/og/home.webp'
const DEFAULT_DESCRIPTION = 'Разгледайте мебели от MBX с актуални цени, снимки и наличности. Филтрирайте по стая и вид мебел и поръчайте с консултация от Dom Expert Мебел.'

export const revalidate = 86400

export function buildCatalogMetadata(state: CatalogRouteState): Metadata {
  const category = normalizeCatalogCategory(state.category)
  const type = normalizeCatalogType(state.type)
  const sort = normalizeCatalogSort(state.sort)
  const categoryLabel = CATEGORIES.find((item) => item.id === category)?.label || 'Всички стаи'
  const typeLabel = PRODUCT_TYPES.find((item) => item.id === type)?.label || 'Всички видове'
  const titleBase = type !== 'all'
    ? typeLabel + (category !== 'all' ? ' за ' + categoryLabel.toLowerCase() : '')
    : category !== 'all'
      ? 'Мебели за ' + categoryLabel.toLowerCase()
      : 'Каталог мебели'
  const title = titleBase + (state.page > 1 ? ' – стр. ' + state.page : '') + ' | Dom Expert'
  const descriptionCopy = type !== 'all' || category !== 'all'
    ? 'Разгледайте ' + typeLabel.toLowerCase() + (category !== 'all' ? ' за ' + categoryLabel.toLowerCase() : '') + ' от MBX с актуални цени, снимки и наличности. Сравнете модели и варианти и поръчайте с консултация от Dom Expert Мебел.'
    : DEFAULT_DESCRIPTION
  const description = descriptionCopy.length > 155
    ? descriptionCopy.slice(0, 154).replace(/\s+\S*$/, '').replace(/[.,;:–—-]+$/, '') + '…'
    : descriptionCopy
  const canonicalPath = buildCatalogHref({ category, type, sort: 'default', page: state.page })
  const canonical = BASE_URL + canonicalPath
  const noIndex = sort !== 'default'

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'bg_BG',
      siteName: 'Dom Expert Мебел',
      title,
      description,
      url: canonical,
      images: [{ url: CATALOG_IMAGE, width: 1200, height: 630, type: 'image/webp', alt: 'Каталог мебели от Dom Expert Мебел' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [CATALOG_IMAGE],
    },
  }
}

export const metadata: Metadata = buildCatalogMetadata({
  category: 'all',
  type: 'all',
  sort: 'default',
  page: 1,
})

function filterByCategory(products: ReturnType<typeof getAllMbxCatalogProducts>, category: string) {
  if (category === 'all') return products
  return products.filter((product) => getCatalogCategoryId(product.categoryHierarchy, product.categoryText) === category)
}

function filterByType(products: ReturnType<typeof getAllMbxCatalogProducts>, type: string) {
  if (type === 'all') return products
  return products.filter((product) => getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText) === type)
}

function sortProducts(products: ReturnType<typeof getAllMbxCatalogProducts>, sort: string) {
  const list = [...products]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => (a.priceVat ?? Number.MAX_VALUE) - (b.priceVat ?? Number.MAX_VALUE))
    case 'price-desc':
      return list.sort((a, b) => (b.priceVat ?? 0) - (a.priceVat ?? 0))
    case 'name':
      return list.sort((a, b) => a.productName.localeCompare(b.productName, 'bg'))
    default:
      return list
  }
}

function buildCategoryCounts(products: ReturnType<typeof getAllMbxCatalogProducts>, activeType: string) {
  const typeFiltered = filterByType(products, activeType)
  const counts: Record<string, number> = { all: typeFiltered.length }
  CATEGORIES.slice(1).forEach((category) => {
    counts[category.id] = typeFiltered.filter((product) => getCatalogCategoryId(product.categoryHierarchy, product.categoryText) === category.id).length
  })
  return counts
}

function buildTypeCounts(products: ReturnType<typeof getAllMbxCatalogProducts>, activeCategory: string) {
  const categoryFiltered = filterByCategory(products, activeCategory)
  const counts: Record<string, number> = { all: categoryFiltered.length }
  PRODUCT_TYPES.slice(1).forEach((type) => {
    counts[type.id] = categoryFiltered.filter((product) => getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText) === type.id).length
  })
  return counts
}

export function CatalogView({ category, type, sort, page }: CatalogRouteState) {
  const activeCategory = normalizeCatalogCategory(category)
  const activeType = normalizeCatalogType(type)
  const sortBy = normalizeCatalogSort(sort)
  const safeRequestedPage = Number.isInteger(page) && page > 0 ? page : 1
  const pageSize = 36

  const allProducts = getAllMbxCatalogProducts()
  const categoryCounts = buildCategoryCounts(allProducts, activeType)
  const typeCounts = buildTypeCounts(allProducts, activeCategory)
  const categoryFiltered = filterByCategory(allProducts, activeCategory)
  const filtered = filterByType(categoryFiltered, activeType)
  const sorted = sortProducts(filtered, sortBy)
  const totalProducts = sorted.length
  if (totalProducts === 0) notFound()
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize))
  if (safeRequestedPage > totalPages) notFound()
  const start = (safeRequestedPage - 1) * pageSize
  const products = sorted.slice(start, start + pageSize)
  const currentPath = buildCatalogHref({ category: activeCategory, type: activeType, sort: 'default', page: safeRequestedPage })

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: BASE_URL + '/' },
        { name: 'Каталог', url: BASE_URL + currentPath },
      ]} />
      <CatalogClient
        products={products}
        activeCategory={activeCategory}
        activeType={activeType}
        sortBy={sortBy}
        categoryCounts={categoryCounts}
        typeCounts={typeCounts}
        totalProducts={totalProducts}
        page={safeRequestedPage}
        totalPages={totalPages}
      />
      <CTABar />
    </>
  )
}

export default function CatalogPage() {
  return <CatalogView category="all" type="all" sort="default" page={1} />
}
