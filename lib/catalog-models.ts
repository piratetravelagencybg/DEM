import type { MbxCatalogProduct } from '@/lib/mbx-catalog'
import {
  getCatalogCategoryId,
  getCatalogProductTypeId,
  type ProductTypeId,
} from '@/lib/product-display'

export type CatalogRoomTag =
  | 'bedroom'
  | 'children'
  | 'living'
  | 'office'
  | 'hallway'
  | 'collections'
  | 'bathroom'
  | 'other'

export const CATALOG_SUBTYPE_TAGS = [
  'tv-cabinet',
  'living-wall-unit',
  'bed-with-drawers',
  'bed-with-storage',
  'bed-with-lifting-mechanism',
  'upholstered-bed',
  'wall-bed',
  'bunk-bed',
  'bed-size-90x200',
  'bed-size-120x200',
  'bed-size-140x70',
  'bed-size-140x200',
  'bed-size-160x80',
  'bed-size-160x200',
  'bed-size-180x200',
  'coffee-table',
  'dining-table',
  'office-desk',
  'shoe-cabinet',
  'coat-rack',
  'sliding-wardrobe',
  'hinged-wardrobe',
  'corner-wardrobe',
  'mirrored-wardrobe',
] as const

export type CatalogSubtypeTag = (typeof CATALOG_SUBTYPE_TAGS)[number]

export type CatalogProductTags = {
  rooms: readonly CatalogRoomTag[]
  types: readonly ProductTypeId[]
  subtypes: readonly CatalogSubtypeTag[]
  collections: readonly string[]
}

export type CatalogAvailabilitySummary = {
  values: readonly string[]
  hasInStock: boolean
  hasOnOrder: boolean
}

export type CatalogModel = {
  key: string
  representative: MbxCatalogProduct
  variants: readonly MbxCatalogProduct[]
  variantCount: number
  minPrice: number | null
  maxPrice: number | null
  images: readonly string[]
  availability: CatalogAvailabilitySummary
  tags: CatalogProductTags
}

export type CatalogModelIndex = {
  models: readonly CatalogModel[]
  variants: readonly MbxCatalogProduct[]
  byKey: ReadonlyMap<string, CatalogModel>
  byItemId: ReadonlyMap<string, CatalogModel>
  bySlug: ReadonlyMap<string, CatalogModel>
  tagsByItemId: ReadonlyMap<string, CatalogProductTags>
}

type OneOrMany<T> = T | readonly T[]

/**
 * Values inside one dimension are OR-ed; separate dimensions are AND-ed.
 * A model matches when at least one of its variants satisfies the complete
 * predicate, which prevents false cross-variant room/type combinations.
 */
export type CatalogTagPredicate = {
  rooms?: OneOrMany<CatalogRoomTag>
  types?: OneOrMany<ProductTypeId>
  subtypes?: OneOrMany<CatalogSubtypeTag>
  collections?: OneOrMany<string>
}

const COLLECTION_FAMILY_NAMES = ['brooklyn', 'integra', 'modern', 'zanardi'] as const

function uniqueSorted<T extends string>(values: Iterable<T>) {
  return Object.freeze(Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'bg', { numeric: true })))
}

function normalizeMatchText(value: string) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('bg-BG')
    .replace(/×/g, 'x')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeCollectionTag(value: string) {
  const normalized = normalizeMatchText(value)
  if (normalized.startsWith('brooklyn')) return 'brooklyn'
  if (normalized.startsWith('integra')) return 'integra'
  if (normalized.startsWith('modern')) return 'modern'
  if (normalized.startsWith('zanardi')) return 'zanardi'
  return normalized
    .replace(/[^а-яa-z0-9]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function containsFamilyName(value: string, family: string) {
  return new RegExp(`(^|[^a-z0-9])${family}([^a-z0-9]|$)`, 'i').test(value)
}

function getCollectionTags(product: MbxCatalogProduct) {
  const values = new Set<string>()

  for (const entry of product.categoryHierarchy) {
    const match = entry.match(/^(?:колекция|система)\s+(.+)$/i)
    if (!match) continue
    const tag = normalizeCollectionTag(match[1])
    if (tag) values.add(tag)
  }

  const normalizedName = normalizeMatchText(product.productName)
  for (const family of COLLECTION_FAMILY_NAMES) {
    if (containsFamilyName(normalizedName, family)) values.add(family)
  }

  return uniqueSorted(values)
}

function hasDimension(value: string, first: number, second: number) {
  const separator = '(?:x|х|/)'
  const forward = new RegExp(`(^|\\D)${first}\\s*${separator}\\s*${second}(\\D|$)`)
  const reverse = new RegExp(`(^|\\D)${second}\\s*${separator}\\s*${first}(\\D|$)`)
  return forward.test(value) || reverse.test(value)
}

function getSubtypeTags(product: MbxCatalogProduct, type: ProductTypeId) {
  const value = normalizeMatchText(product.productName)
  const tags = new Set<CatalogSubtypeTag>()

  if (type === 'tv-units') {
    if (value.includes('секци')) tags.add('living-wall-unit')
    else tags.add('tv-cabinet')
  }

  if (type === 'beds') {
    if (value.includes('чекмедж')) tags.add('bed-with-drawers')
    if (/чекмедж|ракла\s+за\s+легло/.test(value)) tags.add('bed-with-storage')
    if (/повдигащ|повдигане|газов механизъм/.test(value)) tags.add('bed-with-lifting-mechanism')
    if (value.includes('тапицир')) tags.add('upholstered-bed')
    if (/падащо легло|стенно легло|легло за стена/.test(value)) tags.add('wall-bed')
    if (/двуетаж|двойно легло/.test(value)) tags.add('bunk-bed')

    const dimensions: Array<[number, number, CatalogSubtypeTag]> = [
      [90, 200, 'bed-size-90x200'],
      [120, 200, 'bed-size-120x200'],
      [140, 70, 'bed-size-140x70'],
      [140, 200, 'bed-size-140x200'],
      [160, 80, 'bed-size-160x80'],
      [160, 200, 'bed-size-160x200'],
      [180, 200, 'bed-size-180x200'],
    ]
    for (const [first, second, tag] of dimensions) {
      if (hasDimension(value, first, second)) tags.add(tag)
    }
  }

  if (type === 'tables') {
    if (value.includes('холн')) tags.add('coffee-table')
    if (value.includes('трапез')) tags.add('dining-table')
  }

  if (type === 'desks' && value.includes('бюро')) tags.add('office-desk')

  if (type === 'hallway-furniture') {
    if (/шкаф\s+за\s+обув/.test(value)) tags.add('shoe-cabinet')
    if (/портмант|закачалк/.test(value)) tags.add('coat-rack')
  }

  if (type === 'wardrobes') {
    if (/плъзгащ|плъзгащи|слайд/.test(value)) tags.add('sliding-wardrobe')
    if (/шарнир|с отваряеми врати/.test(value)) tags.add('hinged-wardrobe')
    if (value.includes('ъглов')) tags.add('corner-wardrobe')
    if (/огледал|огледало/.test(value)) tags.add('mirrored-wardrobe')
  }

  return uniqueSorted(tags)
}

export function getCatalogProductTags(product: MbxCatalogProduct): CatalogProductTags {
  const room = getCatalogCategoryId(product.categoryHierarchy, product.categoryText) as CatalogRoomTag
  const type = getCatalogProductTypeId(product.productName, product.categoryHierarchy, product.categoryText)
  return Object.freeze({
    rooms: Object.freeze([room]),
    types: Object.freeze([type]),
    subtypes: getSubtypeTags(product, type),
    collections: getCollectionTags(product),
  })
}

export function getCatalogModelKey(product: Pick<MbxCatalogProduct, 'itemGroupId' | 'itemId'>) {
  const groupId = product.itemGroupId.trim()
  return groupId ? `group:${groupId}` : `item:${product.itemId.trim()}`
}

function compareIdentityValues(first: string, second: string) {
  const firstIsInteger = /^\d+$/.test(first)
  const secondIsInteger = /^\d+$/.test(second)

  if (firstIsInteger && secondIsInteger) {
    const firstNumber = BigInt(first)
    const secondNumber = BigInt(second)
    if (firstNumber < secondNumber) return -1
    if (firstNumber > secondNumber) return 1
    return 0
  }

  if (firstIsInteger !== secondIsInteger) return firstIsInteger ? -1 : 1
  return first.localeCompare(second, 'en', { numeric: true, sensitivity: 'base' })
}

export function compareCatalogProductIdentity(first: MbxCatalogProduct, second: MbxCatalogProduct) {
  return compareIdentityValues(first.itemId, second.itemId)
    || first.slug.localeCompare(second.slug, 'en', { numeric: true, sensitivity: 'base' })
}

function buildModel(key: string, sourceVariants: MbxCatalogProduct[], tagsByItemId: Map<string, CatalogProductTags>): CatalogModel {
  const variants = Object.freeze([...sourceVariants].sort(compareCatalogProductIdentity))
  const representative = variants[0]
  const prices = variants
    .map((variant) => variant.priceVat)
    .filter((price): price is number => price !== null && Number.isFinite(price))
  const availabilityValues = uniqueSorted(variants.map((variant) => variant.availability).filter(Boolean))
  const rooms = new Set<CatalogRoomTag>()
  const types = new Set<ProductTypeId>()
  const subtypes = new Set<CatalogSubtypeTag>()
  const collections = new Set<string>()

  for (const variant of variants) {
    const tags = getCatalogProductTags(variant)
    tagsByItemId.set(variant.itemId, tags)
    tags.rooms.forEach((value) => rooms.add(value))
    tags.types.forEach((value) => types.add(value))
    tags.subtypes.forEach((value) => subtypes.add(value))
    tags.collections.forEach((value) => collections.add(value))
  }

  return Object.freeze({
    key,
    representative,
    variants,
    variantCount: variants.length,
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    images: uniqueSorted(variants.map((variant) => variant.imageUrl).filter(Boolean)),
    availability: Object.freeze({
      values: availabilityValues,
      hasInStock: availabilityValues.includes('in_stock'),
      hasOnOrder: availabilityValues.includes('on_order'),
    }),
    tags: Object.freeze({
      rooms: uniqueSorted(rooms),
      types: uniqueSorted(types),
      subtypes: uniqueSorted(subtypes),
      collections: uniqueSorted(collections),
    }),
  })
}

/**
 * Build this index once from the complete active catalog, at module scope in a
 * server-only consumer. Landing predicates must operate on this global index;
 * filtering SKUs before grouping can select unstable representatives.
 */
export function buildCatalogModelIndex(products: readonly MbxCatalogProduct[]): CatalogModelIndex {
  const buckets = new Map<string, MbxCatalogProduct[]>()
  const seenItemIds = new Set<string>()

  for (const product of products) {
    if (!product.active) continue
    if (!product.itemId.trim()) throw new Error('Active catalog product is missing itemId')
    if (seenItemIds.has(product.itemId)) throw new Error(`Duplicate active itemId: ${product.itemId}`)
    seenItemIds.add(product.itemId)

    const key = getCatalogModelKey(product)
    const bucket = buckets.get(key)
    if (bucket) bucket.push(product)
    else buckets.set(key, [product])
  }

  const tagsByItemId = new Map<string, CatalogProductTags>()
  const models = Array.from(buckets, ([key, variants]) => buildModel(key, variants, tagsByItemId))
    .sort((first, second) => compareCatalogProductIdentity(first.representative, second.representative))
  const byKey = new Map<string, CatalogModel>()
  const byItemId = new Map<string, CatalogModel>()
  const bySlug = new Map<string, CatalogModel>()
  const activeVariants: MbxCatalogProduct[] = []

  for (const model of models) {
    byKey.set(model.key, model)
    for (const variant of model.variants) {
      if (bySlug.has(variant.slug)) throw new Error(`Duplicate active product slug: ${variant.slug}`)
      byItemId.set(variant.itemId, model)
      bySlug.set(variant.slug, model)
      activeVariants.push(variant)
    }
  }

  return Object.freeze({
    models: Object.freeze(models),
    variants: Object.freeze(activeVariants),
    byKey,
    byItemId,
    bySlug,
    tagsByItemId,
  })
}

function asArray<T>(value: OneOrMany<T> | undefined): readonly T[] | undefined {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value as readonly T[] : [value as T]
}

function intersects<T>(actual: readonly T[], expected: readonly T[] | undefined) {
  return expected === undefined || expected.some((value) => actual.includes(value))
}

export function matchesCatalogTags(tags: CatalogProductTags, predicate: CatalogTagPredicate) {
  const collections = asArray<string>(predicate.collections)?.map(normalizeCollectionTag)
  return intersects(tags.rooms, asArray<CatalogRoomTag>(predicate.rooms))
    && intersects(tags.types, asArray<ProductTypeId>(predicate.types))
    && intersects(tags.subtypes, asArray<CatalogSubtypeTag>(predicate.subtypes))
    && intersects(tags.collections, collections)
}

export function getCatalogVariantsForLanding(index: CatalogModelIndex, predicate: CatalogTagPredicate) {
  return index.variants.filter((variant) => {
    const tags = index.tagsByItemId.get(variant.itemId)
    return tags !== undefined && matchesCatalogTags(tags, predicate)
  })
}

export function getCatalogModelsForLanding(index: CatalogModelIndex, predicate: CatalogTagPredicate) {
  return index.models.filter((model) => model.variants.some((variant) => {
    const tags = index.tagsByItemId.get(variant.itemId)
    return tags !== undefined && matchesCatalogTags(tags, predicate)
  }))
}

export function getCatalogLandingCounts(index: CatalogModelIndex, predicate: CatalogTagPredicate) {
  return {
    skuCount: getCatalogVariantsForLanding(index, predicate).length,
    modelCount: getCatalogModelsForLanding(index, predicate).length,
  }
}
