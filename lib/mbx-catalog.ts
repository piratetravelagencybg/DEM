import catalogImport from '@/data/mbx-catalog.json'

export type MbxCatalogProduct = {
  itemId: string
  itemGroupId: string
  productName: string
  categoryText: string
  categoryHierarchy: string[]
  priceVat: number | null
  imageUrl: string
  productNo: string
  availability: string
  active: boolean
  slug: string
}

type MbxCatalogData = {
  importedAt: string
  totalRecords: number
  products: MbxCatalogProduct[]
}

const catalogData = catalogImport as MbxCatalogData
const activeProducts = catalogData.products.filter((product) => product.active)

export function getAllMbxCatalogProducts() {
  return activeProducts
}

export function getMbxCatalogProductBySlug(slug: string) {
  return activeProducts.find((product) => product.slug === slug)
}
