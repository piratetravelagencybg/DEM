import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const args = Object.fromEntries(
  process.argv.slice(2).flatMap((value, index, values) => (
    value.startsWith('--') ? [[value.slice(2), values[index + 1]]] : []
  )),
)

const sitemapUrl = new URL(args.sitemap || 'https://domexpertmebel.com/sitemap.xml')
const crawlBase = new URL(args.base || 'http://127.0.0.1:3045/')
const outputPath = path.resolve(args.output || 'URL_INVENTORY.csv')
const baselineDirectory = path.resolve(args.baseline || 'seo-baseline')
const concurrency = Math.max(1, Math.min(32, Number(args.concurrency || 12)))
const timeoutMs = Math.max(1_000, Number(args.timeout || 20_000))
const parser = new XMLParser({ ignoreAttributes: false })

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function asArray(value) {
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
}

function decodeHtml(value = '') {
  return value
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
      .slice(1)
      .map((match) => [
        match[1].toLowerCase(),
        decodeHtml(match[2] ?? match[3] ?? match[4] ?? ''),
      ]),
  )
}

function textContent(value = '') {
  return decodeHtml(
    value
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim()
}

function normalizePublicUrl(value, sourceUrl) {
  try {
    const url = new URL(value, sourceUrl)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    url.hash = ''
    return url.toString()
  } catch {
    return null
  }
}

function urlKey(value) {
  try {
    const url = new URL(value)
    url.hash = ''
    return `${url.origin.toLowerCase()}${url.pathname}${url.search}`
  } catch {
    return value
  }
}

function routeType(value) {
  const pathname = decodeURIComponent(new URL(value).pathname)
  if (pathname === '/') return 'home'
  if (pathname === '/услуги/' || pathname === '/услуги') return 'service-index'
  if (pathname.startsWith('/услуги/')) return 'service'
  if (pathname === '/проекти/' || pathname === '/проекти') return 'project-index'
  if (pathname.startsWith('/проекти/')) return 'project'
  if (pathname === '/блог/' || pathname === '/блог') return 'blog-index'
  if (pathname.startsWith('/блог/')) return 'blog'
  if (pathname === '/готови-мебели/' || pathname === '/готови-мебели') return 'catalog-index'
  if (pathname.startsWith('/готови-мебели/')) return 'catalog-landing'
  if (pathname.startsWith('/каталог/')) return 'product'
  if (['/благоевград/', '/софия/', '/дупница/', '/сандански/'].includes(pathname)) return 'location'
  if (pathname === '/контакти/' || pathname === '/контакти') return 'contact'
  if (pathname === '/за-нас/' || pathname === '/за-нас') return 'about'
  if (pathname.includes('политика-за-поверителност')) return 'legal'
  return 'other'
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  const startedAt = performance.now()
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      ...options,
      headers: {
        'user-agent': 'DomExpertSEOInventory/1.0',
        accept: 'text/html,application/xhtml+xml',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    })
    return { response, elapsedMs: Math.round(performance.now() - startedAt) }
  } finally {
    clearTimeout(timer)
  }
}

async function readSitemap(url, seen = new Set()) {
  const key = url.toString()
  if (seen.has(key)) return { entries: [], documents: [] }
  seen.add(key)

  const { response } = await request(url, { headers: { accept: 'application/xml,text/xml' } })
  const xml = await response.text()
  if (!response.ok) throw new Error(`Sitemap ${url} returned HTTP ${response.status}`)

  const parsed = parser.parse(xml)
  if (parsed.sitemapindex) {
    const children = await Promise.all(
      asArray(parsed.sitemapindex.sitemap).map((entry) => readSitemap(new URL(String(entry.loc)), seen)),
    )
    return {
      entries: children.flatMap((child) => child.entries),
      documents: [{ url: key, xml, status: response.status }, ...children.flatMap((child) => child.documents)],
    }
  }

  const entries = asArray(parsed.urlset?.url).map((entry) => ({
    url: new URL(String(entry.loc)).toString(),
    lastmod: entry.lastmod ? String(entry.lastmod) : '',
    changefreq: entry.changefreq ? String(entry.changefreq) : '',
    priority: entry.priority !== undefined ? String(entry.priority) : '',
  }))

  return {
    entries,
    documents: [{ url: key, xml, status: response.status }],
  }
}

function collectSchemaTypes(value, output = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectSchemaTypes(entry, output))
    return output
  }
  if (!value || typeof value !== 'object') return output
  asArray(value['@type']).forEach((type) => {
    if (typeof type === 'string') output.add(type)
  })
  Object.values(value).forEach((entry) => collectSchemaTypes(entry, output))
  return output
}

function parsePage(html, publicUrl, response, elapsedMs) {
  const title = textContent(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const h1Values = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => textContent(match[1]))
    .filter(Boolean)
  const metaByName = Object.fromEntries(metaTags.flatMap((tag) => {
    const key = tag.name || tag.property
    return key ? [[key.toLowerCase(), tag.content || '']] : []
  }))
  const canonical = linkTags.find((tag) => (
    (tag.rel || '').toLowerCase().split(/\s+/).includes('canonical')
  ))?.href || ''
  const internalLinks = [...new Set(anchorTags.flatMap((tag) => {
    if (!tag.href || /^(?:mailto|tel|javascript|data):/i.test(tag.href)) return []
    const absolute = normalizePublicUrl(tag.href, publicUrl)
    return absolute && new URL(absolute).origin === new URL(publicUrl).origin ? [absolute] : []
  }))]

  const schemaBlocks = [...html.matchAll(
    /<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi,
  )]
  const schemaTypes = new Set()
  const schemaErrors = []
  const normalizedSchema = []
  schemaBlocks.forEach((match, index) => {
    const raw = decodeHtml(match[1]).trim()
    normalizedSchema.push(raw)
    try {
      collectSchemaTypes(JSON.parse(raw), schemaTypes)
    } catch (error) {
      schemaErrors.push(`schema ${index + 1}: ${error instanceof Error ? error.message : String(error)}`)
    }
  })

  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html
  const visibleText = textContent(body)
  const robots = [
    metaByName.robots || '',
    response.headers.get('x-robots-tag') || '',
  ].filter(Boolean).join('; ')

  return {
    url: publicUrl,
    type: routeType(publicUrl),
    status: response.status,
    redirectLocation: response.headers.get('location') || '',
    elapsedMs,
    bytes: Buffer.byteLength(html),
    title,
    metaDescription: metaByName.description || '',
    h1: h1Values.join(' | '),
    h1Count: h1Values.length,
    canonical: normalizePublicUrl(canonical, publicUrl) || canonical,
    robots,
    wordCount: visibleText.match(/[\p{L}\p{N}]+/gu)?.length || 0,
    imageCount: imageTags.length,
    imagesWithoutAlt: imageTags.filter((image) => !('alt' in image) || !image.alt.trim()).length,
    internalLinks,
    schemaCount: schemaBlocks.length,
    schemaTypes: [...schemaTypes].sort(),
    schemaValid: schemaErrors.length === 0,
    schemaErrors,
    schemaHash: normalizedSchema.length ? sha256(normalizedSchema.join('\n')) : '',
  }
}

async function mapConcurrent(values, mapper) {
  const output = new Array(values.length)
  let cursor = 0
  let completed = 0
  async function worker() {
    while (cursor < values.length) {
      const index = cursor++
      try {
        output[index] = await mapper(values[index], index)
      } catch (error) {
        output[index] = {
          url: values[index].url,
          type: routeType(values[index].url),
          status: 0,
          error: error instanceof Error ? error.message : String(error),
          internalLinks: [],
          schemaTypes: [],
          schemaValid: false,
          schemaErrors: [],
        }
      }
      completed += 1
      if (completed % 100 === 0 || completed === values.length) {
        console.error(`Crawled ${completed}/${values.length}`)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker))
  return output
}

function duplicateMap(pages, field) {
  const values = new Map()
  for (const page of pages) {
    const value = String(page[field] || '').trim()
    if (!value) continue
    const list = values.get(value) || []
    list.push(page.url)
    values.set(value, list)
  }
  return values
}

function csv(value) {
  const text = String(value ?? '')
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

const sitemap = await readSitemap(sitemapUrl)
const uniqueEntries = [...new Map(sitemap.entries.map((entry) => [urlKey(entry.url), entry])).values()]
const sitemapOrigins = new Set(uniqueEntries.map((entry) => new URL(entry.url).origin))
if (sitemapOrigins.size !== 1) console.error(`Warning: sitemap contains ${sitemapOrigins.size} origins`)

const pageResults = await mapConcurrent(uniqueEntries, async (entry) => {
  const publicUrl = new URL(entry.url)
  const targetUrl = new URL(publicUrl.pathname + publicUrl.search, crawlBase)
  const { response, elapsedMs } = await request(targetUrl)
  const contentType = response.headers.get('content-type') || ''
  const html = /html|xhtml/i.test(contentType) ? await response.text() : ''
  return {
    ...parsePage(html, publicUrl.toString(), response, elapsedMs),
    sitemapLastmod: entry.lastmod,
    sitemapChangefreq: entry.changefreq,
    sitemapPriority: entry.priority,
    contentType,
  }
})

const incoming = new Map(pageResults.map((page) => [urlKey(page.url), new Set()]))
for (const page of pageResults) {
  for (const link of page.internalLinks || []) {
    const targetKey = urlKey(link)
    if (incoming.has(targetKey) && targetKey !== urlKey(page.url)) {
      incoming.get(targetKey).add(page.url)
    }
  }
}

const duplicateTitles = duplicateMap(pageResults, 'title')
const duplicateDescriptions = duplicateMap(pageResults, 'metaDescription')
const duplicateH1s = duplicateMap(pageResults, 'h1')

for (const page of pageResults) {
  page.internalInlinks = incoming.get(urlKey(page.url))?.size || 0
  page.internalOutlinks = new Set(page.internalLinks || []).size
  const notes = []
  if (page.error) notes.push(`crawl_error: ${page.error}`)
  if (page.status >= 300 && page.status < 400) notes.push(`redirect: ${page.redirectLocation || 'unknown'}`)
  if (page.status !== 200) notes.push(`http_${page.status}`)
  if (!page.title) notes.push('missing_title')
  if (!page.metaDescription) notes.push('missing_meta_description')
  if (!page.h1) notes.push('missing_h1')
  if (page.h1Count > 1) notes.push(`multiple_h1:${page.h1Count}`)
  if (!page.canonical) notes.push('missing_canonical')
  if (page.canonical && urlKey(page.canonical) !== urlKey(page.url)) notes.push('canonical_differs')
  if (/noindex/i.test(page.robots)) notes.push('noindex')
  if (!page.schemaValid) notes.push('invalid_schema')
  if ((duplicateTitles.get(page.title)?.length || 0) > 1) notes.push('duplicate_title')
  if ((duplicateDescriptions.get(page.metaDescription)?.length || 0) > 1) notes.push('duplicate_meta_description')
  if ((duplicateH1s.get(page.h1)?.length || 0) > 1) notes.push('duplicate_h1')
  if (page.internalInlinks === 0 && page.type !== 'home') notes.push('zero_inlinks_in_sitemap_crawl')
  if (page.wordCount < 100) notes.push(`low_word_count:${page.wordCount}`)
  if (page.imagesWithoutAlt > 0) notes.push(`images_without_alt:${page.imagesWithoutAlt}`)

  if (page.status !== 200) {
    page.indexationRecommendation = 'exclude_or_fix_status'
  } else if (/noindex/i.test(page.robots)) {
    page.indexationRecommendation = 'exclude_noindex'
  } else if (page.canonical && urlKey(page.canonical) !== urlKey(page.url)) {
    page.indexationRecommendation = 'exclude_or_review_canonical'
  } else if (
    !page.title
    || !page.metaDescription
    || !page.h1
    || page.h1Count !== 1
    || page.internalInlinks === 0
    || (page.type !== 'product' && page.wordCount < 100)
  ) {
    page.indexationRecommendation = 'review'
  } else if (page.type === 'product' && page.wordCount < 160) {
    page.indexationRecommendation = 'review_thin_product'
  } else {
    page.indexationRecommendation = 'keep_indexed'
  }

  page.notes = notes.join('; ')
}

const columns = [
  'url',
  'type',
  'status',
  'title',
  'meta_description',
  'h1',
  'canonical',
  'robots',
  'word_count',
  'image_count',
  'images_without_alt',
  'internal_inlinks',
  'internal_outlinks',
  'indexation_recommendation',
  'notes',
]
const csvRows = [
  columns.join(','),
  ...pageResults.map((page) => [
    page.url,
    page.type,
    page.status,
    page.title || '',
    page.metaDescription || '',
    page.h1 || '',
    page.canonical || '',
    page.robots || '',
    page.wordCount || 0,
    page.imageCount || 0,
    page.imagesWithoutAlt || 0,
    page.internalInlinks || 0,
    page.internalOutlinks || 0,
    page.indexationRecommendation,
    page.notes,
  ].map(csv).join(',')),
]

const robotsUrl = new URL('/robots.txt', sitemapUrl)
const robotsResult = await request(robotsUrl, { headers: { accept: 'text/plain' } })
const robotsText = await robotsResult.response.text()
const sitemapCombinedXml = sitemap.documents.map((document) => document.xml).join('\n')

const byType = Object.fromEntries(
  [...new Set(pageResults.map((page) => page.type))].sort().map((type) => [
    type,
    pageResults.filter((page) => page.type === type).length,
  ]),
)
const byRecommendation = Object.fromEntries(
  [...new Set(pageResults.map((page) => page.indexationRecommendation))].sort().map((recommendation) => [
    recommendation,
    pageResults.filter((page) => page.indexationRecommendation === recommendation).length,
  ]),
)

const baseline = {
  generatedAt: new Date().toISOString(),
  sitemap: {
    source: sitemapUrl.toString(),
    documents: sitemap.documents.map((document) => ({
      url: document.url,
      status: document.status,
      sha256: sha256(document.xml),
    })),
    urlCount: uniqueEntries.length,
    combinedSha256: sha256(sitemapCombinedXml),
  },
  robots: {
    source: robotsUrl.toString(),
    status: robotsResult.response.status,
    sha256: sha256(robotsText),
    content: robotsText,
  },
  crawl: {
    base: crawlBase.toString(),
    concurrency,
    pages: pageResults.length,
    status200: pageResults.filter((page) => page.status === 200).length,
    errors: pageResults.filter((page) => page.status === 0 || page.error).length,
    byType,
    byRecommendation,
  },
  pages: pageResults.map((page) => ({
    url: page.url,
    status: page.status,
    elapsedMs: page.elapsedMs || null,
    bytes: page.bytes || 0,
    title: page.title || '',
    metaDescription: page.metaDescription || '',
    h1: page.h1 || '',
    h1Count: page.h1Count || 0,
    canonical: page.canonical || '',
    robots: page.robots || '',
    schemaCount: page.schemaCount || 0,
    schemaTypes: page.schemaTypes || [],
    schemaValid: page.schemaValid,
    schemaErrors: page.schemaErrors || [],
    schemaHash: page.schemaHash || '',
    sitemapLastmod: page.sitemapLastmod || '',
    sitemapChangefreq: page.sitemapChangefreq || '',
    sitemapPriority: page.sitemapPriority || '',
  })),
}

await mkdir(path.dirname(outputPath), { recursive: true })
await mkdir(baselineDirectory, { recursive: true })
await writeFile(outputPath, `\uFEFF${csvRows.join('\r\n')}\r\n`, 'utf8')
await writeFile(path.join(baselineDirectory, 'sitemap.xml'), sitemapCombinedXml, 'utf8')
await writeFile(path.join(baselineDirectory, 'robots.txt'), robotsText, 'utf8')
await writeFile(
  path.join(baselineDirectory, 'pages.json'),
  `${JSON.stringify(baseline, null, 2)}\n`,
  'utf8',
)

console.log(JSON.stringify({
  sitemapUrls: uniqueEntries.length,
  outputPath,
  baselineDirectory,
  status200: baseline.crawl.status200,
  errors: baseline.crawl.errors,
  byType,
  byRecommendation,
}, null, 2))
