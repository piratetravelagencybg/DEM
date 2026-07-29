import fs from 'node:fs/promises'
import path from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const feedPath = path.resolve(process.cwd(), 'mbx-feed.xml')
const outputPath = path.resolve(process.cwd(), 'data', 'mbx-import.json')

function cleanText(value) {
  return (value ?? '').toString().replace(/\s+/g, ' ').trim()
}

function parsePrice(value) {
  if (!value) return null
  const normalized = cleanText(value)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, '')
    .replace(/€/, '')
    .replace(/,/g, '.')
    .replace(/[^0-9.\-]/g, '')
  if (!normalized) return null
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeCategoryText(value) {
  return cleanText(value)
    .split('>')
    .map((part) => part.trim())
    .filter(Boolean)
}

function buildSlug(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9а-я\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function mapAvailability(value) {
  const normalized = cleanText(value).toLowerCase()
  if (normalized.includes('order') || normalized.includes('поръч')) return 'on_order'
  return 'in_stock'
}

function extractParams(item) {
  const params = []
  const rawParams = item.PARAM || []
  if (Array.isArray(rawParams)) {
    for (const param of rawParams) {
      if (param && param.NAME && param.TEXT) {
        params.push({ name: cleanText(param.NAME), value: cleanText(param.TEXT) })
      }
    }
  } else if (rawParams && rawParams.NAME && rawParams.TEXT) {
    params.push({ name: cleanText(rawParams.NAME), value: cleanText(rawParams.TEXT) })
  }
  return params
}

function extractImages(item) {
  const images = []
  const primary = cleanText(item.IMGURL)
  if (primary) images.push(primary)
  const alternatives = Array.isArray(item.IMGURL_ALTERNATIVE) ? item.IMGURL_ALTERNATIVE : [item.IMGURL_ALTERNATIVE]
  for (const alt of alternatives || []) {
    const value = cleanText(alt)
    if (value && !images.includes(value)) images.push(value)
  }
  return images
}

async function importFeed() {
  const xml = await fs.readFile(feedPath, 'utf8')
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' })
  const parsed = parser.parse(xml)
  const shopItems = parsed?.SHOP?.SHOPITEM || []
  const items = Array.isArray(shopItems) ? shopItems : [shopItems]

  const products = []
  const groups = new Map()

  for (const item of items) {
    const record = {
      itemId: cleanText(item.ITEM_ID),
      itemGroupId: cleanText(item.ITEMGROUP_ID),
      productName: cleanText(item.PRODUCTNAME),
      categoryText: cleanText(item.CATEGORYTEXT),
      priceVat: parsePrice(item.PRICE_VAT),
      url: cleanText(item.URL),
      imageUrl: cleanText(item.IMGURL),
      imageAlternatives: extractImages(item),
      productNo: cleanText(item.PRODUCTNO),
      manufacturer: cleanText(item.MANUFACTURER),
      deliveryDate: cleanText(item.DELIVERY_DATE),
      availability: mapAvailability(item.AVAILABILITY),
      stockQuantity: cleanText(item.STOCK_QUANTITY),
      params: extractParams(item),
      description: cleanText(item.DESCRIPTION),
      documentUrl: cleanText(item.DOCUMENT_URL),
      ean: cleanText(item.EAN),
      active: cleanText(item.ACTIVE).toLowerCase() !== 'false',
      lastUpdate: cleanText(item.LAST_UPDATE),
      categoryHierarchy: normalizeCategoryText(item.CATEGORYTEXT),
    }

    if (!record.itemId) continue
    if (record.itemGroupId) {
      if (!groups.has(record.itemGroupId)) groups.set(record.itemGroupId, [])
      groups.get(record.itemGroupId).push(record)
    }
    products.push(record)
  }

  const exportData = {
    importedAt: new Date().toISOString(),
    totalRecords: products.length,
    groups: Array.from(groups.entries()).map(([groupId, variants]) => ({
      groupId,
      variants: variants.map((variant) => ({
        ...variant,
        slug: buildSlug(`${variant.productName}-${variant.productNo || variant.itemId}`),
      })),
    })),
    products: products.map((product) => ({
      ...product,
      slug: buildSlug(`${product.productName}-${product.productNo || product.itemId}`),
    })),
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, JSON.stringify(exportData, null, 2))
  console.log(JSON.stringify({
    totalRecords: exportData.totalRecords,
    groupCount: exportData.groups.length,
    singleProducts: exportData.products.filter((product) => !product.itemGroupId).length,
  }, null, 2))
}

await importFeed()
