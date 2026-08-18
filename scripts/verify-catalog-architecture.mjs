import { readFile } from 'node:fs/promises'
import { registerHooks } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, '..')

// The application uses the @/ alias. Node 24 can execute erasable TypeScript
// directly; this small resolver lets the verifier exercise the real model code
// without adding tsx/ts-node or changing package.json.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === '@/lib/product-display') {
      return {
        url: pathToFileURL(path.join(repositoryRoot, 'lib', 'product-display.ts')).href,
        shortCircuit: true,
      }
    }
    if (specifier === '@/lib/mbx-catalog') {
      return {
        url: pathToFileURL(path.join(repositoryRoot, 'lib', 'mbx-catalog.ts')).href,
        shortCircuit: true,
      }
    }
    return nextResolve(specifier, context)
  },
})

const {
  buildCatalogModelIndex,
  compareCatalogProductIdentity,
  getCatalogLandingCounts,
} = await import(pathToFileURL(path.join(repositoryRoot, 'lib', 'catalog-models.ts')).href)
const {
  selectCrawlableVariants,
} = await import(pathToFileURL(path.join(repositoryRoot, 'lib', 'product-variants.ts')).href)

const rawCatalog = await readFile(path.join(repositoryRoot, 'data', 'mbx-catalog.json'), 'utf8')
const catalog = JSON.parse(rawCatalog)
const activeProducts = catalog.products.filter((product) => product.active)
const index = buildCatalogModelIndex(catalog.products)

const checks = []

function check(label, actual, expected) {
  const passed = Object.is(actual, expected)
  checks.push({ label, passed, detail: passed ? String(actual) : `expected ${expected}, received ${actual}` })
}

function checkCondition(label, condition, detail) {
  checks.push({ label, passed: Boolean(condition), detail: condition ? 'ok' : detail })
}

check('active MBX SKU count', activeProducts.length, 3449)
check('logical model count', index.models.length, 555)
check('group-backed model count', index.models.filter((model) => model.key.startsWith('group:')).length, 272)
check('single-item model count', index.models.filter((model) => model.key.startsWith('item:')).length, 283)
check('indexed active variant count', index.variants.length, 3449)
check('itemId index size', index.byItemId.size, 3449)
check('slug index size', index.bySlug.size, 3449)
check('model key index size', index.byKey.size, 555)

const assignmentCounts = new Map()
for (const model of index.models) {
  for (const variant of model.variants) {
    assignmentCounts.set(variant.itemId, (assignmentCounts.get(variant.itemId) || 0) + 1)
  }
}

const activeIds = new Set(activeProducts.map((product) => product.itemId))
const missingAssignments = [...activeIds].filter((itemId) => !assignmentCounts.has(itemId))
const duplicateAssignments = [...assignmentCounts].filter(([, count]) => count !== 1)
const unexpectedAssignments = [...assignmentCounts.keys()].filter((itemId) => !activeIds.has(itemId))

checkCondition(
  'every active SKU is assigned exactly once',
  missingAssignments.length === 0 && duplicateAssignments.length === 0 && unexpectedAssignments.length === 0,
  JSON.stringify({ missingAssignments, duplicateAssignments, unexpectedAssignments }),
)

const representativeSlugs = index.models.map((model) => model.representative.slug)
checkCondition(
  'representative slugs are present and unique',
  representativeSlugs.every(Boolean) && new Set(representativeSlugs).size === index.models.length,
  `received ${new Set(representativeSlugs).size} unique non-empty slugs for ${index.models.length} models`,
)

const unstableRepresentatives = index.models.filter((model) => (
  model.variants[0] !== model.representative
  || model.variants.some((variant, indexInModel, variants) => (
    indexInModel > 0 && compareCatalogProductIdentity(variants[indexInModel - 1], variant) > 0
  ))
))
checkCondition(
  'representatives are deterministic lowest-identity variants',
  unstableRepresentatives.length === 0,
  `unstable model keys: ${unstableRepresentatives.slice(0, 10).map((model) => model.key).join(', ')}`,
)

const invalidAggregates = index.models.filter((model) => {
  const prices = model.variants
    .map((variant) => variant.priceVat)
    .filter((price) => typeof price === 'number' && Number.isFinite(price) && price > 0)
  const expectedImages = new Set(model.variants.map((variant) => variant.imageUrl).filter(Boolean))
  const expectedAvailability = new Set(model.variants.map((variant) => variant.availability).filter(Boolean))
  return model.variantCount !== model.variants.length
    || new Set(model.images).size !== model.images.length
    || model.images.length !== expectedImages.size
    || model.availability.values.length !== expectedAvailability.size
    || (prices.length > 0 && (model.minPrice !== Math.min(...prices) || model.maxPrice !== Math.max(...prices)))
    || (prices.length === 0 && (model.minPrice !== null || model.maxPrice !== null))
    || model.tags.rooms.length === 0
    || model.tags.types.length === 0
})
checkCondition(
  'model aggregates are complete and internally consistent',
  invalidAggregates.length === 0,
  `invalid model keys: ${invalidAggregates.slice(0, 10).map((model) => model.key).join(', ')}`,
)

const graph = new Map(activeProducts.map((product) => [product.slug, new Set()]))
const incomingVariantLinks = new Map(activeProducts.map((product) => [product.slug, 0]))
for (const model of index.models) {
  for (const current of model.variants) {
    const targets = selectCrawlableVariants(model.variants, current)
    for (const target of targets) {
      if (target.slug === current.slug) continue
      graph.get(current.slug)?.add(target.slug)
      incomingVariantLinks.set(target.slug, (incomingVariantLinks.get(target.slug) || 0) + 1)
    }
  }
}

const depthBySlug = new Map(index.models.map((model) => [model.representative.slug, 0]))
const queue = [...depthBySlug.keys()]
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const source = queue[cursor]
  const nextDepth = (depthBySlug.get(source) || 0) + 1
  for (const target of graph.get(source) || []) {
    if (depthBySlug.has(target)) continue
    depthBySlug.set(target, nextDepth)
    queue.push(target)
  }
}

const maxVariantDepth = Math.max(...depthBySlug.values())
const unreachableVariants = activeProducts.filter((product) => !depthBySlug.has(product.slug))
const variantsWithoutIncomingLinks = index.models.flatMap((model) => (
  model.variantCount > 1
    ? model.variants.filter((variant) => (incomingVariantLinks.get(variant.slug) || 0) === 0)
    : []
))
checkCondition(
  'every SKU is reachable through compact product-variant links',
  unreachableVariants.length === 0,
  `unreachable slugs: ${unreachableVariants.slice(0, 10).map((product) => product.slug).join(', ')}`,
)
checkCondition(
  'variant link depth stays within the crawler budget',
  maxVariantDepth <= 8,
  `maximum depth: ${maxVariantDepth}`,
)
checkCondition(
  'every grouped SKU has a non-self incoming variant link',
  variantsWithoutIncomingLinks.length === 0,
  `missing incoming links: ${variantsWithoutIncomingLinks.slice(0, 10).map((product) => product.slug).join(', ')}`,
)

const intendedIndexedLandings = [
  { key: 'ready-furniture', predicate: {}, skuCount: 3449, modelCount: 555 },
  { key: 'bedroom-furniture', predicate: { rooms: 'bedroom' }, skuCount: 2742, modelCount: 313 },
  { key: 'wardrobes', predicate: { types: 'wardrobes' }, skuCount: 2229, modelCount: 95 },
  { key: 'beds', predicate: { types: 'beds' }, skuCount: 457, modelCount: 93 },
  { key: 'children-beds', predicate: { rooms: 'children', types: 'beds' }, skuCount: 310, modelCount: 48 },
  { key: 'bedroom-sets', predicate: { types: 'bedroom-sets' }, skuCount: 95, modelCount: 55 },
  { key: 'dressers', predicate: { types: 'dressers' }, skuCount: 131, modelCount: 55 },
  { key: 'nightstands', predicate: { types: 'nightstands' }, skuCount: 102, modelCount: 34 },
  { key: 'tv-cabinets', predicate: { types: 'tv-units', subtypes: 'tv-cabinet' }, skuCount: 47, modelCount: 15 },
  { key: 'living-wall-units', predicate: { types: 'tv-units', subtypes: 'living-wall-unit' }, skuCount: 40, modelCount: 23 },
  { key: 'children-furniture', predicate: { rooms: 'children' }, skuCount: 379, modelCount: 87 },
  { key: 'living-furniture', predicate: { rooms: 'living' }, skuCount: 178, modelCount: 78 },
  { key: 'shelving', predicate: { types: 'shelving' }, skuCount: 87, modelCount: 45 },
  { key: 'beds-with-storage', predicate: { types: 'beds', subtypes: 'bed-with-storage' }, skuCount: 107, modelCount: 21 },
  { key: 'children-beds-160x80', predicate: { rooms: 'children', types: 'beds', subtypes: 'bed-size-160x80' }, skuCount: 165, modelCount: 36 },
  { key: 'children-beds-140x70', predicate: { rooms: 'children', types: 'beds', subtypes: 'bed-size-140x70' }, skuCount: 123, modelCount: 29 },
  { key: 'beds-160x200', predicate: { types: 'beds', subtypes: 'bed-size-160x200' }, skuCount: 50, modelCount: 27 },
  { key: 'coffee-tables', predicate: { types: 'tables', subtypes: 'coffee-table' }, skuCount: 22, modelCount: 14 },
  { key: 'hallway-furniture', predicate: { rooms: 'hallway' }, skuCount: 40, modelCount: 29 },
  { key: 'collection-line', predicate: { collections: 'line' }, skuCount: 2153, modelCount: 44 },
  { key: 'collection-sentinel', predicate: { collections: 'sentinel' }, skuCount: 66, modelCount: 21 },
  { key: 'collection-modern', predicate: { collections: 'modern' }, skuCount: 50, modelCount: 26 },
  { key: 'collection-linero', predicate: { collections: 'linero' }, skuCount: 43, modelCount: 38 },
  { key: 'collection-kiara', predicate: { collections: 'kiara' }, skuCount: 42, modelCount: 21 },
  { key: 'collection-zanardi', predicate: { collections: 'zanardi' }, skuCount: 43, modelCount: 33 },
  { key: 'collection-brooklyn', predicate: { collections: 'brooklyn' }, skuCount: 55, modelCount: 55 },
  { key: 'collection-integra', predicate: { collections: 'integra' }, skuCount: 42, modelCount: 37 },
  { key: 'collection-bronx', predicate: { collections: 'bronx' }, skuCount: 34, modelCount: 17 },
  { key: 'collection-arson', predicate: { collections: 'arson' }, skuCount: 21, modelCount: 21 },
]

for (const landing of intendedIndexedLandings) {
  const counts = getCatalogLandingCounts(index, landing.predicate)
  check(`${landing.key} SKU golden count`, counts.skuCount, landing.skuCount)
  check(`${landing.key} model golden count`, counts.modelCount, landing.modelCount)
  checkCondition(
    `${landing.key} is not empty`,
    counts.skuCount > 0 && counts.modelCount > 0,
    `received ${counts.skuCount} SKUs and ${counts.modelCount} models`,
  )
}

const failed = checks.filter((entry) => !entry.passed)
for (const entry of checks) {
  const marker = entry.passed ? 'PASS' : 'FAIL'
  console.log(`${marker}  ${entry.label}: ${entry.detail}`)
}

console.log('')
if (failed.length > 0) {
  console.error(`Catalog architecture verification failed: ${failed.length} of ${checks.length} checks failed.`)
  process.exitCode = 1
} else {
  console.log(`Catalog architecture verification passed: ${checks.length} checks, ${activeProducts.length} SKUs, ${index.models.length} models.`)
}
