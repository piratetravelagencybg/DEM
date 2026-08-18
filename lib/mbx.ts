import type { Metadata } from 'next'
import mbxImport from '@/data/mbx-import.json'
import {
  formatPrice,
  getAvailabilityLabel,
  getAvailabilitySchema as getAvailabilitySchemaValue,
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
const productsByItemId = new Map(activeProducts.map((product) => [product.itemId, product]))
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

export function getMbxProductByItemId(itemId: string) {
  return productsByItemId.get(itemId)
}

export function getMbxImageCandidates(product: Pick<MbxVariant, 'imageUrl' | 'imageAlternatives'>) {
  return Array.from(new Set(
    [product.imageUrl, ...product.imageAlternatives].filter(Boolean),
  ))
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

function normalizeImageUrl(value: string) {
  const candidate = value.trim()
  if (!candidate) return ''

  try {
    const url = new URL(candidate)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return ''
    return url.toString()
  } catch {
    return ''
  }
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

const SITE_URL = 'https://domexpertmebel.com'
const MAX_STRUCTURED_VARIANTS = 12

function getProductUrl(product: MbxVariant) {
  return `${SITE_URL}/каталог/${product.slug}/`
}

function getValidGtin(value: string) {
  const gtin = normalizeCopy(value).replace(/[\s-]/g, '')
  if (!/^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(gtin)) return undefined

  let sum = 0
  let multiplier = 3
  for (let index = gtin.length - 2; index >= 0; index -= 1) {
    sum += Number(gtin[index]) * multiplier
    multiplier = multiplier === 3 ? 1 : 3
  }

  const checkDigit = (10 - (sum % 10)) % 10
  if (checkDigit !== Number(gtin[gtin.length - 1])) return undefined

  return {
    property: `gtin${gtin.length}`,
    value: gtin,
  }
}

function buildOfferStructuredData(product: MbxVariant) {
  if (typeof product.priceVat !== 'number' || !Number.isFinite(product.priceVat) || product.priceVat <= 0) {
    return undefined
  }

  return {
    '@type': 'Offer',
    price: product.priceVat,
    priceCurrency: 'EUR',
    availability: getAvailabilitySchemaValue(product.availability),
    itemCondition: 'https://schema.org/NewCondition',
    url: getProductUrl(product),
    seller: { '@type': 'Organization', name: 'Dom Expert Мебел' },
  }
}

function buildProductStructuredDataNode(product: MbxVariant) {
  const content = buildProductContent(product)
  const images = Array.from(new Set(
    [product.imageUrl, ...product.imageAlternatives]
      // Image URLs must not pass through normalizeCopy(): underscores are
      // meaningful in MBX endpoints such as /image_1920.
      .map((image) => normalizeImageUrl(image))
      .filter(Boolean),
  ))
  const gtin = getValidGtin(product.ean)
  const offer = buildOfferStructuredData(product)

  return {
    '@type': 'Product',
    '@id': `${getProductUrl(product)}#product`,
    name: product.productName,
    description: content.paragraphs.join(' '),
    url: getProductUrl(product),
    sku: product.productNo || product.itemId,
    brand: { '@type': 'Brand', name: content.manufacturer },
    ...(images.length > 0 ? { image: images } : {}),
    ...(gtin ? { [gtin.property]: gtin.value } : {}),
    ...(offer ? { offers: offer } : {}),
  }
}

/**
 * Builds multi-page ProductGroup markup without embedding the full MBX catalogue.
 * The current variant is complete; sibling pages are represented by URL-only
 * references, as recommended by Google for variants split across URLs.
 */
export function buildProductStructuredData(product: MbxVariant, variants: readonly MbxVariant[]) {
  const productNode = buildProductStructuredDataNode(product)
  const seenSlugs = new Set<string>()
  const activeGroupVariants = variants.filter((variant) => {
    if (!variant.active || !variant.slug || seenSlugs.has(variant.slug)) return false
    seenSlugs.add(variant.slug)
    return true
  })
  const groupId = normalizeCopy(product.itemGroupId)

  if (!groupId || activeGroupVariants.length < 2) {
    return {
      '@context': 'https://schema.org',
      ...productNode,
    }
  }

  const currentIndex = activeGroupVariants.findIndex((variant) => variant.slug === product.slug)
  const orderedSiblings = Array.from(
    { length: activeGroupVariants.length - 1 },
    (_, offset) => activeGroupVariants[(Math.max(0, currentIndex) + offset + 1) % activeGroupVariants.length],
  ).filter((variant) => variant.slug !== product.slug)
  const siblingReferences = orderedSiblings
    .slice(0, MAX_STRUCTURED_VARIANTS - 1)
    .map((variant) => ({ url: getProductUrl(variant) }))
  const groupName = getShortProductName(activeGroupVariants[0]) || getShortProductName(product)
  const groupBrands = Array.from(new Set(
    activeGroupVariants.map((variant) => normalizeCopy(variant.manufacturer)).filter(Boolean),
  ))

  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: groupName,
    productGroupID: groupId,
    ...(groupBrands.length === 1
      ? { brand: { '@type': 'Brand', name: groupBrands[0] } }
      : {}),
    hasVariant: [productNode, ...siblingReferences],
  }
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
  const priceCopy = typeof product.priceVat === 'number' && product.priceVat > 0
    ? 'Показаната цена е крайна клиентска цена'
    : 'Цената за този вариант се потвърждава при запитване'
  const productDetails = 'Каталожният номер на модела е ' + sku + '. ' + priceCopy + ', а текущият статус е „' + availability + '“. Снимките представят конкретния вариант; при избор сравнете наименованието, конфигурацията и посочените в него декор или размер.'
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
  const availableNameLength = Math.max(18, 55 - skuSuffix.length - brandSuffix.length)
  return truncateAtWord(shortName, availableNameLength) + skuSuffix + brandSuffix
}

function buildProductMetaDescription(product: MbxVariant) {
  const content = buildProductContent(product)
  const shortName = truncateAtWord(getShortProductName(product), 56)
  const price = typeof product.priceVat !== 'number' || product.priceVat <= 0
    ? 'цена по запитване'
    : 'цена ' + formatPrice(product.priceVat)
  const description = shortName + ' (' + content.sku + ') – ' + content.typeLabel.toLowerCase() + ' от ' + content.manufacturer + ', ' + price + '. Вижте снимки, варианти и актуална наличност. Поръчка с консултация от Dom Expert Мебел.'
  return truncateAtWord(description, 155)
}

export function buildProductMetadata(product: MbxVariant): Metadata {
  const title = buildProductTitle(product)
  const description = buildProductMetaDescription(product)
  const canonical = `https://domexpertmebel.com/каталог/${product.slug}/`
  // Use a stable local 1200x630 social card. Product photography remains in
  // Product schema and on the page, while crawlers never depend on MBX or the
  // disabled Vercel image transformer for Open Graph previews.
  const image = '/images/og/home.webp'
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
      images: [{
        url: image,
        width: 1200,
        height: 630,
        type: 'image/webp',
        alt: 'Примерна интериорна визуализация – Dom Expert Мебел',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
