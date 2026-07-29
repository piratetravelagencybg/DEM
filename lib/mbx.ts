import type { Metadata } from 'next'
import mbxImport from '@/data/mbx-import.json'

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

const DEFAULT_CATEGORY = 'other'

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/[^а-яa-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getAllMbxProducts() {
  return importData.products.filter((product) => product.active)
}

export function getMbxProductBySlug(slug: string) {
  return getAllMbxProducts().find((product) => product.slug === slug)
}

export function getMbxGroups() {
  return importData.groups.filter((group) => group.variants.some((variant) => variant.active))
}

export function getMbxGroupById(groupId: string) {
  return getMbxGroups().find((group) => group.groupId === groupId)
}

export function getPrimaryCategory(product: MbxVariant) {
  const category = product.categoryHierarchy[0] || product.categoryText.split('>')[0] || ''
  return category || DEFAULT_CATEGORY
}

export function getCategorySlug(category: string) {
  return normalizeCategory(category)
}

export function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    спалня: 'Спални',
    легло: 'Легла',
    гардероб: 'Гардероби',
    нощно: 'Нощни шкафчета',
    детски: 'Детски мебели',
    дневна: 'Дневни',
    тв: 'ТВ шкафове',
    хол: 'Холни маси',
    офис: 'Офис мебели',
    антре: 'Антре',
    колекция: 'Колекции',
    кухня: 'Кухни',
  }
  return labels[normalizeCategory(category)] || category || 'Продукти'
}

export function formatPrice(value: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(2).replace('.', ',')} €`
}

export function formatPriceBgn(value: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(2).replace('.', ',')} €`
}

export function getAvailabilityLabel(availability: string) {
  return availability === 'on_order' ? 'По поръчка' : 'В наличност'
}

export function getAvailabilitySchema(availability: string) {
  return availability === 'on_order' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock'
}

export function buildProductMetadata(product: MbxVariant): Metadata {
  const title = `${product.productName} | Dom Expert Мебел`
  const description = `${product.productName} — реални варианти, цена ${formatPrice(product.priceVat)} и наличност. Поръчайте от Dom Expert Мебел.`
  const canonical = `https://domexpertmebel.com/produkt/${product.slug}/`
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
