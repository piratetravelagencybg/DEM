import type { Metadata } from 'next'
import { getAllMbxProducts } from '@/lib/mbx'
import CatalogClient, { CATEGORIES, SORT_OPTIONS } from './CatalogClient'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: { absolute: 'Каталог мебели | Dom Expert Мебел' },
  description: 'Каталог с мебели от MBX, включващ реални продукти, варианти, цени и наличност. Поръчайте от Dom Expert Мебел.',
  alternates: { canonical: 'https://domexpertmebel.com/каталог/' },
}

type CatalogQuery = {
  category?: string
  sort?: string
  page?: string
}

function normalizeCategory(category?: string) {
  if (!category) return 'all'
  const normalized = category.toLowerCase()
  return CATEGORIES.some((item) => item.id === normalized) ? normalized : 'all'
}

function normalizeSort(sort?: string) {
  if (!sort) return 'default'
  const normalized = sort.toLowerCase()
  return SORT_OPTIONS.some((item) => item.id === normalized) ? normalized : 'default'
}

function filterProducts(products: ReturnType<typeof getAllMbxProducts>, category: string) {
  if (category === 'all') return products
  return products.filter((product) => (product.categoryHierarchy[0] || product.categoryText).toLowerCase().includes(category))
}

function sortProducts(products: ReturnType<typeof getAllMbxProducts>, sort: string) {
  const list = [...products]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => (a.priceVat ?? 0) - (b.priceVat ?? 0))
    case 'price-desc':
      return list.sort((a, b) => (b.priceVat ?? 0) - (a.priceVat ?? 0))
    case 'name':
      return list.sort((a, b) => a.productName.localeCompare(b.productName, 'bg'))
    default:
      return list
  }
}

function paginateProducts(products: ReturnType<typeof getAllMbxProducts>, page: number, pageSize: number) {
  const totalProducts = products.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  const end = start + pageSize
  return {
    totalProducts,
    totalPages,
    page: safePage,
    products: products.slice(start, end),
  }
}

function buildCategoryCounts(products: ReturnType<typeof getAllMbxProducts>) {
  const counts: Record<string, number> = { all: products.length }
  CATEGORIES.slice(1).forEach((category) => {
    counts[category.id] = products.filter((p) => (p.categoryHierarchy[0] || p.categoryText).toLowerCase().includes(category.id)).length
  })
  return counts
}

export default function CatalogPage({ searchParams }: { searchParams: CatalogQuery }) {
  const activeCategory = normalizeCategory(searchParams.category)
  const sortBy = normalizeSort(searchParams.sort)
  const page = Number(searchParams.page ?? '1')
  const pageSize = 36

  const allProducts = getAllMbxProducts()
  const categoryCounts = buildCategoryCounts(allProducts)
  const filtered = filterProducts(allProducts, activeCategory)
  const sorted = sortProducts(filtered, sortBy)
  const pagination = paginateProducts(sorted, page, pageSize)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Каталог', url: 'https://domexpertmebel.com/каталог/' },
      ]} />
      <CatalogClient
        products={pagination.products}
        activeCategory={activeCategory}
        sortBy={sortBy}
        categoryCounts={categoryCounts}
        totalProducts={pagination.totalProducts}
        page={pagination.page}
        totalPages={pagination.totalPages}
      />
      <CTABar />
    </>
  )
}
