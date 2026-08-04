import type { Metadata } from 'next'
import mbxImport from '@/data/mbx-import.json'
import {
  formatPrice,
  getAvailabilityLabel,
  getCatalogCategoryId,
  getCatalogProductTypeId,
  getProductTypeLabel,
  getPrimaryCategory as getPrimaryCategoryFromValues,
  getRoomLabel,
} from '@/lib/product-display'

export {
  formatPrice,
  formatPriceBgn,
  getAvailabilityLabel,
  getAvailabilitySchema,
  getCatalogCategoryId,
  getCatalogProductTypeId,
  getCategoryLabel,
  getCategorySlug,
  getProductTypeLabel,
  PRODUCT_TYPES,
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
const productsByPrimaryCategory = new Map<string, MbxVariant[]>()
const productsByCategoryAndType = new Map<string, MbxVariant[]>()
const primaryCategoryIndexBySlug = new Map<string, number>()
const categoryAndTypeIndexBySlug = new Map<string, number>()

for (const product of activeProducts) {
  const primaryCategory = product.categoryHierarchy[0] || product.categoryText || 'all'
  const productType = getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText)
  const typeKey = `${primaryCategory}\u0000${productType}`
  const categoryBucket = productsByPrimaryCategory.get(primaryCategory) || []
  const typeBucket = productsByCategoryAndType.get(typeKey) || []

  primaryCategoryIndexBySlug.set(product.slug, categoryBucket.length)
  categoryAndTypeIndexBySlug.set(product.slug, typeBucket.length)
  categoryBucket.push(product)
  typeBucket.push(product)
  productsByPrimaryCategory.set(primaryCategory, categoryBucket)
  productsByCategoryAndType.set(typeKey, typeBucket)
}

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

export function getRelatedMbxProducts(product: MbxVariant, limit = 4) {
  const primaryCategory = product.categoryHierarchy[0] || product.categoryText || 'all'
  const productType = getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText)
  const typeKey = `${primaryCategory}\u0000${productType}`
  const typeBucket = productsByCategoryAndType.get(typeKey) || []
  const categoryBucket = productsByPrimaryCategory.get(primaryCategory) || []
  const typeIndex = categoryAndTypeIndexBySlug.get(product.slug) ?? -1
  const categoryIndex = primaryCategoryIndexBySlug.get(product.slug) ?? -1

  const atOffset = (bucket: MbxVariant[], index: number, offset: number) => {
    if (index < 0 || bucket.length < 2) return undefined
    return bucket[(index + offset + bucket.length) % bucket.length]
  }

  const candidates = [
    atOffset(typeBucket, typeIndex, 1),
    atOffset(typeBucket, typeIndex, -1),
    atOffset(categoryBucket, categoryIndex, 1),
    atOffset(categoryBucket, categoryIndex, -1),
    atOffset(typeBucket, typeIndex, 2),
    atOffset(typeBucket, typeIndex, -2),
    atOffset(categoryBucket, categoryIndex, 2),
    atOffset(categoryBucket, categoryIndex, -2),
  ]

  return candidates
    .filter((entry, index, list): entry is MbxVariant => (
      entry !== undefined
      && entry.slug !== product.slug
      && list.findIndex((item) => item?.slug === entry.slug) === index
    ))
    .slice(0, limit)
}

export function getPrimaryCategory(product: MbxVariant) {
  return getPrimaryCategoryFromValues(product.categoryHierarchy, product.categoryText)
}

function normalizeCopy(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[*_~`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateAtWord(value: string, maxLength: number) {
  const normalized = normalizeCopy(value)
  if (normalized.length <= maxLength) return normalized
  const candidate = normalized.slice(0, Math.max(1, maxLength - 1))
  const lastSpace = candidate.lastIndexOf(' ')
  const shortened = lastSpace > maxLength * 0.65 ? candidate.slice(0, lastSpace) : candidate
  return shortened.replace(/[.,;:–—-]+$/, '') + '…'
}

function getCollectionName(product: MbxVariant) {
  const collection = [...product.categoryHierarchy]
    .reverse()
    .find((entry) => /^(колекция|система)\s+/i.test(entry))
  return collection?.replace(/^(колекция|система)\s+/i, '').trim() || ''
}

function getShortProductName(product: MbxVariant) {
  return normalizeCopy(product.productName.replace(/\s*\([^)]*\)\s*$/, ''))
}

export function buildProductContent(product: MbxVariant) {
  const categoryId = getCatalogCategoryId(product.categoryHierarchy, product.categoryText)
  const typeId = getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText)
  const typeLabel = getProductTypeLabel(typeId)
  const roomLabel = getRoomLabel(categoryId)
  const collection = getCollectionName(product)
  const manufacturer = normalizeCopy(product.manufacturer) || 'MBX'
  const sku = normalizeCopy(product.productNo || product.itemId)
  const sourceDescription = normalizeCopy(product.description)
  const availability = getAvailabilityLabel(product.availability)

  const collectionCopy = collection
    ? ' Част е от колекция ' + collection + ', което улеснява комбинирането му с останалите елементи от същата серия.'
    : ''
  const generatedIntro = '„' + product.productName + '“ е модел в категория „' + typeLabel + '“ от каталога на ' + manufacturer + ', подходящ за обзавеждане на ' + roomLabel + '.' + collectionCopy
  const productDetails = 'Каталожният номер на модела е ' + sku + '. Показаната цена е крайна клиентска цена, а текущият статус е „' + availability + '“. Снимките представят конкретния вариант; при избор сравнете наименованието, конфигурацията и посочените в него декор или размер.'
  const orderingHelp = 'Преди поръчка препоръчваме да потвърдите подходящия вариант и размерите за вашето пространство. Екипът на Dom Expert Мебел може да помогне с проверка на актуалната наличност, съвместимите елементи от серията и организацията на поръчката.'

  return {
    summary: sourceDescription || generatedIntro,
    paragraphs: [sourceDescription || generatedIntro, productDetails, orderingHelp],
    typeId,
    typeLabel,
    categoryId,
    roomLabel,
    collection,
    manufacturer,
    sku,
  }
}

function buildProductTitle(product: MbxVariant) {
  const shortName = getShortProductName(product)
  const sku = normalizeCopy(product.productNo || '')
  const skuSuffix = sku ? ' – ' + sku : ''
  const brandSuffix = ' | Dom Expert'
  const availableNameLength = Math.max(18, 60 - skuSuffix.length - brandSuffix.length)
  return truncateAtWord(shortName, availableNameLength) + skuSuffix + brandSuffix
}

function buildProductMetaDescription(product: MbxVariant) {
  const content = buildProductContent(product)
  const shortName = truncateAtWord(getShortProductName(product), 56)
  const price = product.priceVat === null ? 'цена по запитване' : 'цена ' + formatPrice(product.priceVat)
  const description = shortName + ' (' + content.sku + ') – ' + content.typeLabel.toLowerCase() + ' от ' + content.manufacturer + ', ' + price + '. Вижте снимки, варианти и актуална наличност. Поръчка с консултация от Dom Expert Мебел.'
  return truncateAtWord(description, 155)
}

export function buildProductMetadata(product: MbxVariant): Metadata {
  const title = buildProductTitle(product)
  const description = buildProductMetaDescription(product)
  const canonical = `https://domexpertmebel.com/каталог/${product.slug}/`
  const image = product.imageUrl || '/images/hero/hero.webp'
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'bg_BG',
      siteName: 'Dom Expert Мебел',
      title,
      description,
      url: canonical,
      images: [{ url: image, alt: product.productName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
