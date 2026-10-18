// Internal link report for the content area (<main>) of every sitemap page.
//
//   node scripts/link-report.mjs [baseUrl] [--out report.md]
//
// Checks the linking rules: every service page links to every city page,
// every city page links to every service page, and anchors are descriptive.
import { writeFileSync } from 'node:fs'

const PRODUCTION_ORIGIN = 'https://domexpertmebel.com'
const args = process.argv.slice(2)
const base = (args.find((arg) => /^https?:\/\//.test(arg)) || 'http://localhost:3000').replace(/\/$/, '')
const outIndex = args.indexOf('--out')
const outFile = outIndex >= 0 ? args[outIndex + 1] : null

const CITIES = ['/благоевград/', '/софия/', '/дупница/', '/сандански/', '/петрич/']
const SERVICES = [
  '/услуги/кухни-по-поръчка/',
  '/услуги/гардероби-по-поръчка/',
  '/услуги/спални-по-поръчка/',
  '/услуги/дневни-по-поръчка/',
  '/услуги/офис-мебели/',
  '/услуги/3d-визуализация/',
  '/услуги/интериорен-дизайн/',
  '/услуги/монтаж/',
  '/услуги/обзавеждане-на-обекти/салони-за-красота/',
]
const GENERIC_ANCHORS = /^(тук|виж(те)? още|научи(те)? повече|още|прочети(те)? още|кликни(те)?( тук)?|линк|детайли|вижте|разгледайте|повече)$/i

const decode = (value) => value
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')

function pathOf(href) {
  try {
    const url = new URL(href, PRODUCTION_ORIGIN)
    if (url.origin !== PRODUCTION_ORIGIN) return null
    return decodeURI(url.pathname)
  } catch {
    return null
  }
}

function mainLinks(html) {
  const start = html.search(/<main\b[^>]*>/i)
  const end = html.lastIndexOf('</main>')
  const main = start >= 0 && end > start ? html.slice(start, end) : html
  return [...main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].flatMap((match) => {
    const target = pathOf(decode(match[1]))
    if (!target) return []
    const ariaLabel = match[0].match(/aria-label="([^"]+)"/)?.[1]
    const text = decode(match[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
    return [{ target, anchor: text || (ariaLabel ? decode(ariaLabel) : '') }]
  })
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text()
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => decodeURI(new URL(match[1]).pathname))
  .filter((path) => !/\.(webp|png|jpe?g)$/.test(path) && !path.startsWith('/каталог/'))

const outgoing = new Map()
for (const path of pages) {
  const html = await (await fetch(base + encodeURI(path))).text()
  outgoing.set(path, mainLinks(html).filter((link) => link.target !== path))
}

const incoming = new Map(pages.map((path) => [path, new Set()]))
for (const [from, links] of outgoing) {
  for (const link of links) incoming.get(link.target)?.add(from)
}

const problems = []
const has = (from, target) => (outgoing.get(from) || []).some((link) => link.target === target)
for (const service of SERVICES) {
  if (!outgoing.has(service)) continue
  const missing = CITIES.filter((city) => !has(service, city))
  if (missing.length) problems.push(`${service} → missing cities: ${missing.join(', ')}`)
}
for (const city of CITIES) {
  const missing = SERVICES.filter((service) => !has(city, service))
  if (missing.length) problems.push(`${city} → missing services: ${missing.join(', ')}`)
}
const generic = []
for (const [from, links] of outgoing) {
  for (const link of links) {
    if (!link.anchor || GENERIC_ANCHORS.test(link.anchor)) generic.push(`${from} → ${link.target} „${link.anchor}“`)
  }
}

const sofiaSources = [...(incoming.get('/софия/') || [])].sort()
const lines = [
  `# Internal links (content area) — ${base}`,
  '',
  `Pages: ${pages.length}`,
  '',
  '## Rules',
  problems.length ? problems.map((problem) => `- ✗ ${problem}`).join('\n') : '- ✓ every service links to every city and every city to every service',
  `- /софия/ is linked from ${sofiaSources.length} pages: ${sofiaSources.join(', ')}`,
  generic.length ? `- ✗ ${generic.length} generic or empty anchors:\n${generic.slice(0, 40).map((item) => `  - ${item}`).join('\n')}` : '- ✓ no generic anchors',
  '',
  '## Page → links',
  '',
  '| Page | Out (unique targets) | In (pages) | Links to cities | Links to services |',
  '|---|---|---|---|---|',
  ...pages.map((path) => {
    const targets = new Set((outgoing.get(path) || []).map((link) => link.target))
    const cities = CITIES.filter((city) => targets.has(city)).length
    const services = SERVICES.filter((service) => targets.has(service)).length
    return `| ${path} | ${targets.size} | ${incoming.get(path)?.size ?? 0} | ${cities}/${CITIES.length} | ${services}/${SERVICES.length} |`
  }),
]
const report = lines.join('\n') + '\n'
console.log(report)
if (outFile) writeFileSync(outFile, report)
