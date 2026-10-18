// Generates data/indexable-products.json: the catalog models whose product
// pages are indexed. A model qualifies when it has a supplier description
// that no other model shares, or at least MIN_IMPRESSIONS Search Console
// impressions in the snapshot taken before products were set to noindex.
//
// Each qualifying model gets one stable representative URL (lowest itemId,
// the same order as lib/catalog-models.ts); its other variants canonicalize
// to it. Every other model stays noindex, follow.
//
// Run after importing the MBX feed:  npm run catalog:indexable
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MIN_DESCRIPTION_LENGTH = 40
const MIN_IMPRESSIONS = 10

const { products } = JSON.parse(readFileSync(path.join(root, 'data', 'mbx-import.json'), 'utf8'))
const gsc = JSON.parse(readFileSync(path.join(root, 'data', 'catalog-gsc-impressions.json'), 'utf8'))

function modelKey(product) {
  const groupId = (product.itemGroupId || '').trim()
  return groupId ? `group:${groupId}` : `item:${product.itemId.trim()}`
}

function compareIdentity(first, second) {
  const a = first.itemId
  const b = second.itemId
  if (/^\d+$/.test(a) && /^\d+$/.test(b)) {
    const diff = BigInt(a) - BigInt(b)
    if (diff !== 0n) return diff < 0n ? -1 : 1
  } else if (/^\d+$/.test(a) !== /^\d+$/.test(b)) {
    return /^\d+$/.test(a) ? -1 : 1
  } else {
    const byId = a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' })
    if (byId) return byId
  }
  return first.slug.localeCompare(second.slug, 'en', { numeric: true, sensitivity: 'base' })
}

const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim()

const models = new Map()
for (const product of products) {
  if (!product.active) continue
  const key = modelKey(product)
  if (!models.has(key)) models.set(key, [])
  models.get(key).push(product)
}

// How many models use each description text.
const descriptionModels = new Map()
for (const [key, variants] of models) {
  for (const text of new Set(variants.map((variant) => normalize(variant.description)))) {
    if (text.length <= MIN_DESCRIPTION_LENGTH) continue
    descriptionModels.set(text, (descriptionModels.get(text) || new Set()).add(key))
  }
}

const indexable = []
for (const [key, variants] of models) {
  const uniqueDescription = variants.some((variant) => {
    const text = normalize(variant.description)
    return text.length > MIN_DESCRIPTION_LENGTH && descriptionModels.get(text)?.size === 1
  })
  const impressions = gsc.impressionsByModel[key] || 0
  if (!uniqueDescription && impressions < MIN_IMPRESSIONS) continue
  const representative = [...variants].sort(compareIdentity)[0]
  indexable.push({
    key,
    slug: representative.slug,
    name: representative.productName,
    variants: variants.length,
    reason: [uniqueDescription && 'unique-description', impressions >= MIN_IMPRESSIONS && `gsc-${impressions}`].filter(Boolean).join(','),
  })
}
indexable.sort((first, second) => first.key.localeCompare(second.key, 'en', { numeric: true }))

writeFileSync(path.join(root, 'data', 'indexable-products.json'), JSON.stringify({
  rule: `unique supplier description (> ${MIN_DESCRIPTION_LENGTH} chars, not shared with another model) OR >= ${MIN_IMPRESSIONS} GSC impressions ${gsc.startDate}..${gsc.endDate}`,
  models: indexable,
}, null, 2) + '\n')

console.log(`indexable-products: ${indexable.length} of ${models.size} models (${indexable.reduce((sum, model) => sum + model.variants, 0)} variant pages canonicalize to them)`)
