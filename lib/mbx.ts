import type { Metadata } from 'next'
import mbxImport from '@/data/mbx-import.json'
import {
  formatPrice,
  getPrimaryCategory as getPrimaryCategoryFromValues,
} from '@/lib/product-display'

export {
  formatPrice,
  formatPriceBgn,
  getAvailabilityLabel,
  getAvailabilitySchema,
  getCategoryLabel,
  getCategorySlug,
} from '@/lib/product-display'

export type MbxVariant = {
  itemId: string
  itemGroupId: string
  productName: string
  categoryText: string
  priceVat: number | null
  url: string
  imageUrl: string
  imageAlternatives: string[]
  productNo: string
  manufacturer: string
  deliveryDate: string
  availability: string
  stockQuantity: string
  params: Array<{ name: string; value: string }>
  description: string
  documentUrl: string
  ean: string
  active: boolean
  lastUpdate: string
  categoryHierarchy: string[]
  slug: string
}

export type MbxGroup = {
  groupId: string
  variants: MbxVariant[]
}

export type MbxImportData = {
  importedAt: string
  totalRecords: number
  groups: MbxGroup[]
  products: MbxVariant[]
}

const importData = mbxImport as MbxImportData
const activeProducts = importData.products.filter((product) => product.active)
const productsBySlug = new Map(activeProducts.map((product) => [product.slug, product]))
const activeGroups = importData.groups.filter((group) => group.variants.some((variant) => variant.active))
const groupsById = new Map(activeGroups.map((group) => [group.groupId, group]))

export function getAllMbxProducts() {
  return activeProducts
}

export function getMbxProductBySlug(slug: string) {
  return productsBySlug.get(slug)
}

export function getMbxGroups() {
  return activeGroups
}

export function getMbxGroupById(groupId: string) {
  return groupsById.get(groupId)
}

export function getPrimaryCategory(product: MbxVariant) {
  return getPrimaryCategoryFromValues(product.categoryHierarchy, product.categoryText)
}

export function buildProductMetadata(product: MbxVariant): Metadata {
  const title = `${product.productName} | Dom Expert Мебел`
  const description = `${product.productName} — реални варианти, цена ${formatPrice(product.priceVat)} и наличност. Поръчайте от Dom Expert Мебел.`
  const canonical = `https://domexpertmebel.com/каталог/${product.slug}/`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: product.imageUrl || '/images/hero/hero.png', alt: product.productName }],
    },
  }
}
