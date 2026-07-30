import fs from 'node:fs/promises'
import path from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const feedPath = path.resolve(process.cwd(), 'mbx-feed.xml')
const outputPath = path.resolve(process.cwd(), 'data', 'mbx-import.json')
const catalogOutputPath = path.resolve(process.cwd(), 'data', 'mbx-catalog.json')

const CYRILLIC_TO_LATIN = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
  т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht',
  ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
}

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
  const transliterated = [...cleanText(value).toLowerCase()]
    .map((character) => CYRILLIC_TO_LATIN[character] ?? character)
    .join('')

  return transliterated
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function addUniqueSlugs(products) {
  const usedSlugs = new Set()

  return products.map((product) => {
    const identifier = product.productNo || product.itemId
    const baseSlug = buildSlug(`${product.productName}-${identifier}`) || `produkt-${product.itemId}`
    const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${product.itemId}` : baseSlug
    usedSlugs.add(slug)
    return { ...product, slug }
  })
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

function getCatalogImageUrl(value) {
  return value.replace('/image_1920', '/image_1024')
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

  const productsWithSlugs = addUniqueSlugs(products)
  const slugsByItemId = new Map(productsWithSlugs.map((product) => [product.itemId, product.slug]))

  const exportData = {
    importedAt: new Date().toISOString(),
    totalRecords: products.length,
    groups: Array.from(groups.entries()).map(([groupId, variants]) => ({
      groupId,
      variants: variants.map((variant) => ({
        ...variant,
        slug: slugsByItemId.get(variant.itemId),
      })),
    })),
    products: productsWithSlugs,
  }

  const catalogData = {
    importedAt: exportData.importedAt,
    totalRecords: exportData.totalRecords,
    products: productsWithSlugs.map((product) => ({
      itemId: product.itemId,
      itemGroupId: product.itemGroupId,
      productName: product.productName,
      categoryText: product.categoryText,
      categoryHierarchy: product.categoryHierarchy,
      priceVat: product.priceVat,
      imageUrl: getCatalogImageUrl(product.imageUrl),
      productNo: product.productNo,
      availability: product.availability,
      active: product.active,
      slug: product.slug,
    })),
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, JSON.stringify(exportData, null, 2))
  await fs.writeFile(catalogOutputPath, JSON.stringify(catalogData))
  console.log(JSON.stringify({
    totalRecords: exportData.totalRecords,
    groupCount: exportData.groups.length,
    singleProducts: exportData.products.filter((product) => !product.itemGroupId).length,
    catalogIndex: path.relative(process.cwd(), catalogOutputPath),
  }, null, 2))
}

await importFeed()
