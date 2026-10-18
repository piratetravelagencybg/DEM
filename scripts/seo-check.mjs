// SEO check for every URL in the sitemap.
//
//   node scripts/seo-check.mjs [baseUrl] [--out report.md] [--no-links] [--sitemap url]
//
// baseUrl defaults to http://localhost:3000 (run `npm run build && npm start`).
// URLs from the sitemap are fetched from baseUrl, but canonicals and links
// are compared against the production origin.
import { writeFileSync } from 'node:fs'

const PRODUCTION_ORIGIN = 'https://domexpertmebel.com'
const TITLE_MAX = 60
const DESCRIPTION_MIN = 70
const DESCRIPTION_MAX = 160
const CITY_PATHS = ['/благоевград/', '/софия/', '/дупница/', '/сандански/', '/петрич/']

const args = process.argv.slice(2)
const base = (args.find((arg, index) => /^https?:\/\//.test(arg) && args[index - 1] !== '--sitemap') || 'http://localhost:3000').replace(/\/$/, '')
const outIndex = args.indexOf('--out')
const outFile = outIndex >= 0 ? args[outIndex + 1] : null
const checkLinks = !args.includes('--no-links')
const sitemapIndex = args.indexOf('--sitemap')
const sitemapUrl = sitemapIndex >= 0 ? args[sitemapIndex + 1] : base + '/sitemap.xml'

const chars = (value) => [...value].length

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))
  return match ? decodeEntities(match[1] ?? match[2]) : null
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0])
}

function toLocal(url) {
  return url.replace(PRODUCTION_ORIGIN, base)
}

/** Normalizes a URL to the encoded production form used by canonicals. */
function normalize(url) {
  const parsed = new URL(url, PRODUCTION_ORIGIN)
  parsed.hash = ''
  return parsed.href
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'manual' })
  return { status: response.status, location: response.headers.get('location'), text: await response.text() }
}

async function pool(items, size, worker) {
  const results = new Array(items.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      results[index] = await worker(items[index], index)
    }
  }))
  return results
}

function findEmptyValues(node, path = '$', found = []) {
  if (node === null || node === '' || (Array.isArray(node) && node.length === 0)) {
    found.push(path)
  } else if (Array.isArray(node)) {
    node.forEach((child, index) => findEmptyValues(child, `${path}[${index}]`, found))
  } else if (typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) findEmptyValues(value, `${path}.${key}`, found)
  }
  return found
}

function collectTypes(node, found = []) {
  if (Array.isArray(node)) node.forEach((child) => collectTypes(child, found))
  else if (node && typeof node === 'object') {
    if (node['@type']) found.push(...[].concat(node['@type']))
    for (const value of Object.values(node)) collectTypes(value, found)
  }
  return found
}

function checkBreadcrumbs(node, errors) {
  if (Array.isArray(node)) return node.forEach((child) => checkBreadcrumbs(child, errors))
  if (!node || typeof node !== 'object') return
  if ([].concat(node['@type']).includes('BreadcrumbList')) {
    const items = node.itemListElement || []
    if (items.length === 0) errors.push('BreadcrumbList is empty')
    items.forEach((item, index) => {
      if (!item.name) errors.push(`BreadcrumbList item ${index + 1} has no name`)
      if (item.position !== index + 1) errors.push(`BreadcrumbList item ${index + 1} has position ${item.position}`)
      const target = typeof item.item === 'string' ? item.item : item.item?.['@id']
      if (index < items.length - 1 && !target) errors.push(`BreadcrumbList item ${index + 1} has no item URL`)
      if (target && !/^https:\/\/domexpertmebel\.com\//.test(target)) errors.push(`BreadcrumbList item ${index + 1} URL is not absolute canonical: ${target}`)
    })
  }
  for (const value of Object.values(node)) checkBreadcrumbs(value, errors)
}

function visibleText(html) {
  // Page content only: from the first <main> to the last </main>, so the
  // site-wide header and footer do not count as duplicated text.
  const start = html.search(/<main\b[^>]*>/i)
  const end = html.lastIndexOf('</main>')
  const main = start >= 0 && end > start ? html.slice(start, end) : html
  return decodeEntities(main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .toLowerCase()
}

function analyzePage(url, html) {
  const errors = []
  const warnings = []

  const robots = attr(tags(html, 'meta').find((tag) => attr(tag, 'name') === 'robots') || '', 'content') || ''
  if (/noindex/i.test(robots)) errors.push(`page in sitemap is ${robots}`)

  const canonicals = tags(html, 'link').filter((tag) => (attr(tag, 'rel') || '').toLowerCase() === 'canonical').map((tag) => attr(tag, 'href'))
  if (canonicals.length !== 1) errors.push(`${canonicals.length} canonical tags`)
  const canonical = canonicals[0]
  if (canonical) {
    if (!canonical.startsWith(PRODUCTION_ORIGIN + '/')) errors.push(`canonical is not absolute https non-www: ${canonical}`)
    else if (normalize(canonical) !== normalize(url)) errors.push(`canonical ${decodeURI(canonical)} != ${decodeURI(url)}`)
    if (canonical !== url) warnings.push('canonical string differs from sitemap <loc> encoding')
  }

  const ogUrl = attr(tags(html, 'meta').find((tag) => attr(tag, 'property') === 'og:url') || '', 'content')
  if (!ogUrl) warnings.push('missing og:url')
  else if (canonical && normalize(ogUrl) !== normalize(canonical)) errors.push(`og:url ${decodeURI(ogUrl)} != canonical`)

  const h1Count = (html.match(/<h1\b/gi) || []).length
  if (h1Count !== 1) errors.push(`${h1Count} H1 tags`)

  const title = decodeEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '')
  if (!title) errors.push('missing title')
  else if (chars(title) > TITLE_MAX) errors.push(`title ${chars(title)} chars`)

  const description = attr(tags(html, 'meta').find((tag) => attr(tag, 'name') === 'description') || '', 'content') || ''
  if (!description) errors.push('missing meta description')
  else if (chars(description) < DESCRIPTION_MIN || chars(description) > DESCRIPTION_MAX) errors.push(`description ${chars(description)} chars`)

  const types = []
  for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data
    try {
      data = JSON.parse(match[1])
    } catch (error) {
      errors.push(`JSON-LD parse error: ${error.message}`)
      continue
    }
    types.push(...collectTypes(data))
    checkBreadcrumbs(data, errors)
    const empty = findEmptyValues(data)
    if (empty.length) errors.push(`JSON-LD empty values: ${empty.slice(0, 3).join(', ')}`)
  }
  const isHome = new URL(url).pathname === '/'
  if (!isHome && !types.includes('BreadcrumbList')) errors.push('no BreadcrumbList')
  if (types.includes('AggregateRating') || types.includes('Review')) errors.push('self-serving Review/AggregateRating schema')

  const links = []
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href')
    if (!href || /^(mailto:|tel:|#|javascript:)/i.test(href)) continue
    if (/^http:\/\/(www\.)?domexpertmebel\.com/i.test(href) || /^https?:\/\/www\.domexpertmebel\.com/i.test(href)) {
      errors.push(`www/http internal link: ${href}`)
    }
    if (href.startsWith('/') && !href.startsWith('//')) links.push(normalize(href))
    else if (href.startsWith(PRODUCTION_ORIGIN)) links.push(normalize(href))
  }

  const images = tags(html, 'img')
  const missingAlt = images.filter((tag) => attr(tag, 'alt') === null).length
  const emptyAlt = images.filter((tag) => attr(tag, 'alt') === '').length
  if (missingAlt) errors.push(`${missingAlt} <img> without alt`)
  if (emptyAlt) warnings.push(`${emptyAlt} <img> with empty alt`)

  return { url, title, description, canonical, types: [...new Set(types)], links: [...new Set(links)], errors, warnings, text: visibleText(html) }
}

function shingles(text, cityPattern) {
  const words = text.replace(cityPattern, 'CITY').split(/[^0-9a-zа-яёCITY]+/i).filter(Boolean)
  const result = new Set()
  for (let i = 0; i + 5 <= words.length; i++) result.add(words.slice(i, i + 5).join(' '))
  return { words: words.length, set: result }
}

function cityUniqueness(pages) {
  const cityPages = pages.filter((page) => CITY_PATHS.includes(decodeURI(new URL(page.url).pathname)))
  const cityPattern = /благоевград\S*|софи\S*|дупни\S*|сандан\S*|петри\S*/g
  const data = cityPages.map((page) => ({ page, ...shingles(page.text, cityPattern) }))
  return data.map((entry) => {
    const others = new Set()
    for (const other of data) if (other !== entry) for (const item of other.set) others.add(item)
    let shared = 0
    for (const item of entry.set) if (others.has(item)) shared++
    return {
      path: decodeURI(new URL(entry.page.url).pathname),
      words: entry.words,
      unique: entry.set.size ? Math.round(100 * (1 - shared / entry.set.size)) : 0,
    }
  })
}

const sitemap = await fetchText(sitemapUrl)
if (sitemap.status !== 200) {
  console.error(`sitemap.xml returned ${sitemap.status}`)
  process.exit(1)
}
const sitemapErrors = []
if (!sitemap.text.includes('<urlset')) sitemapErrors.push('sitemap.xml is not a <urlset>')
const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeEntities(match[1]))
  .filter((loc) => !/\.(webp|png|jpe?g|avif)$/i.test(loc))
const urlBlocks = sitemap.text.split('<url>').slice(1)
const missingLastmod = urlBlocks.filter((block) => !block.includes('<lastmod>')).length
if (missingLastmod) sitemapErrors.push(`${missingLastmod} URLs without <lastmod>`)
const duplicates = locs.filter((loc, index) => locs.indexOf(loc) !== index)
if (duplicates.length) sitemapErrors.push(`duplicate <loc>: ${duplicates.join(', ')}`)
for (const loc of locs) {
  if (!loc.startsWith(PRODUCTION_ORIGIN + '/')) sitemapErrors.push(`non-canonical <loc>: ${loc}`)
  if (/[^\x00-\x7F]/.test(loc)) sitemapErrors.push(`<loc> is not percent-encoded: ${loc}`)
}

console.log(`Checking ${locs.length} sitemap URLs on ${base}\n`)

const pages = await pool(locs, 6, async (url) => {
  const response = await fetchText(toLocal(url))
  if (response.status !== 200) {
    return { url, title: '', description: '', types: [], links: [], errors: [`HTTP ${response.status}${response.location ? ' → ' + response.location : ''}`], warnings: [], text: '' }
  }
  return analyzePage(url, response.text)
})

const titleOwners = new Map()
const descriptionOwners = new Map()
for (const page of pages) {
  if (page.title) titleOwners.set(page.title, [...(titleOwners.get(page.title) || []), page.url])
  if (page.description) descriptionOwners.set(page.description, [...(descriptionOwners.get(page.description) || []), page.url])
}
for (const page of pages) {
  if ((titleOwners.get(page.title) || []).length > 1) page.errors.push('duplicate title')
  if ((descriptionOwners.get(page.description) || []).length > 1) page.errors.push('duplicate description')
}

const brokenLinks = []
const redirectLinks = []
if (checkLinks) {
  const allLinks = [...new Set(pages.flatMap((page) => page.links))]
  const known = new Set(locs.map(normalize))
  const toCheck = allLinks.filter((link) => !known.has(link) && !/\.(pdf|webp|png|jpe?g|xml|txt)$/i.test(link))
  console.log(`Checking ${toCheck.length} additional internal link targets…\n`)
  const statuses = await pool(toCheck, 8, async (link) => {
    try {
      const response = await fetch(toLocal(link), { redirect: 'manual', method: 'GET' })
      await response.arrayBuffer()
      return { link, status: response.status, location: response.headers.get('location') }
    } catch (error) {
      return { link, status: 0, location: String(error) }
    }
  })
  for (const result of statuses) {
    if (result.status >= 400 || result.status === 0) brokenLinks.push(result)
    else if (result.status >= 300) redirectLinks.push(result)
  }
  for (const page of pages) {
    const broken = brokenLinks.filter((result) => page.links.includes(result.link))
    if (broken.length) page.errors.push(`${broken.length} broken internal link(s): ${broken.slice(0, 3).map((result) => decodeURI(new URL(result.link).pathname)).join(', ')}`)
    const redirected = redirectLinks.filter((result) => page.links.includes(result.link))
    if (redirected.length) page.warnings.push(`${redirected.length} internal link(s) through a redirect`)
  }
}

const uniqueness = cityUniqueness(pages)

const rows = pages.map((page) => {
  const path = decodeURI(new URL(page.url).pathname)
  const status = page.errors.length ? 'FAIL' : page.warnings.length ? 'WARN' : 'OK'
  const notes = [...page.errors, ...page.warnings.map((warning) => '⚠ ' + warning)].join('; ')
  return `| ${status} | ${path} | ${chars(page.title)} | ${chars(page.description)} | ${page.types.filter((type) => !['ListItem', 'PostalAddress', 'GeoCoordinates', 'OpeningHoursSpecification', 'City', 'Country', 'Question', 'Answer', 'ImageObject', 'Offer', 'WebPage'].includes(type)).join(', ')} | ${notes.replace(/\|/g, '\\|')} |`
})

const failed = pages.filter((page) => page.errors.length).length
const lines = [
  `# SEO check — ${base}`,
  '',
  `Run: ${new Date().toISOString()}  ·  URLs: ${pages.length}  ·  failed: ${failed}  ·  broken links: ${brokenLinks.length}  ·  links via redirect: ${redirectLinks.length}`,
  '',
  '## Sitemap',
  sitemapErrors.length ? sitemapErrors.map((error) => `- FAIL ${error}`).join('\n') : '- OK: single <urlset>, percent-encoded, every URL has <lastmod>',
  '',
  '## Pages',
  '',
  '| Status | URL | Title | Desc | Schema | Notes |',
  '|---|---|---|---|---|---|',
  ...rows,
  '',
  '## City page uniqueness (5-word shingles not found on other city pages)',
  '',
  '| Page | Words | Unique |',
  '|---|---|---|',
  ...uniqueness.map((entry) => `| ${entry.path} | ${entry.words} | ${entry.unique}% |`),
]
if (brokenLinks.length) {
  lines.push('', '## Broken internal links', '', ...brokenLinks.map((result) => `- ${result.status} ${decodeURI(result.link)}`))
}
if (redirectLinks.length) {
  lines.push('', '## Internal links through redirects', '', ...redirectLinks.slice(0, 50).map((result) => `- ${result.status} ${decodeURI(result.link)} → ${result.location ? decodeURI(result.location) : ''}`))
}

const report = lines.join('\n') + '\n'
console.log(report)
if (outFile) writeFileSync(outFile, report)
process.exit(failed || sitemapErrors.length || brokenLinks.length ? 1 : 0)
