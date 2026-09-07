import assert from 'node:assert/strict'
import { XMLParser } from 'fast-xml-parser'

const rawArgs = process.argv.slice(2)
const options = Object.fromEntries(rawArgs.flatMap((argument) => {
  if (!argument.startsWith('--')) return []
  const [key, ...valueParts] = argument.slice(2).split('=')
  return [[key, valueParts.length ? valueParts.join('=') : 'true']]
}))

const baseUrl = new URL(options.base || 'https://domexpertmebel.com/')
const publicOrigin = new URL(options.origin || 'https://domexpertmebel.com/')
const auditAll = options.all === 'true'
const productLimit = auditAll ? Number.POSITIVE_INFINITY : Math.max(0, Number(options.limit || 24))
const concurrency = Math.min(8, Math.max(1, Number(options.concurrency || 4)))
const timeoutMs = Math.max(2_000, Number(options.timeout || 20_000))
const strictHttp = options['strict-http'] !== 'false'
const isCanonicalProductionBase = (
  baseUrl.hostname === publicOrigin.hostname
  && baseUrl.protocol === 'https:'
)
// Next's Windows development/production server cannot reliably resolve App Router
// folders whose names contain Cyrillic. Redirect headers and ASCII metadata routes
// are still testable locally; full page assertions stay mandatory in production.
const skipLocalWindowsUnicodePages = process.platform === 'win32' && !isCanonicalProductionBase
const failures = []
const warnings = []
let assertions = 0

function decodeHtml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)=(?:"([^"]*)"|'([^']*)')/g)]
      .map((match) => [match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? '')]),
  )
}

function pageUrl(pathname, search = '') {
  const url = new URL(pathname + search, baseUrl)
  return url
}

function expectedPublicUrl(pathname, search = '') {
  return new URL(pathname + search, publicOrigin)
}

function comparableUrl(value) {
  const parsed = new URL(value)
  parsed.hash = ''
  return parsed.toString()
}

async function request(url, init = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      redirect: 'manual',
      ...init,
      signal: controller.signal,
      headers: {
        'user-agent': 'DomExpertSeoVerification/1.0',
        ...(init.headers || {}),
      },
    })
  } finally {
    clearTimeout(timer)
  }
}

async function check(label, verifier) {
  assertions += 1
  try {
    const detail = await verifier()
    console.log(`PASS  ${label}${detail ? `: ${detail}` : ''}`)
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    failures.push({ label, detail })
    console.error(`FAIL  ${label}: ${detail}`)
  }
}

async function mapConcurrent(values, mapper) {
  const results = new Array(values.length)
  let cursor = 0
  async function worker() {
    while (cursor < values.length) {
      const index = cursor++
      try {
        results[index] = await mapper(values[index], index)
      } catch (error) {
        results[index] = { error: error instanceof Error ? error.message : String(error) }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker))
  return results
}

async function expectSingleRedirect(start, expected, label, { verifyDestination = true } = {}) {
  const response = await request(start)
  assert.ok([301, 308].includes(response.status), `${label}: received HTTP ${response.status}`)
  const location = response.headers.get('location')
  assert.ok(location, `${label}: redirect has no Location header`)
  const destination = new URL(location, start)
  if (isCanonicalProductionBase) {
    assert.equal(comparableUrl(destination), comparableUrl(expected), `${label}: wrong destination`)
  } else {
    assert.equal(
      `${destination.pathname}${destination.search}`,
      `${expected.pathname}${expected.search}`,
      `${label}: wrong destination path/query`,
    )
  }

  if (verifyDestination) {
    const finalRequestUrl = new URL(destination.pathname + destination.search, baseUrl)
    const finalResponse = await request(finalRequestUrl)
    assert.equal(finalResponse.status, 200, `${label}: destination returned ${finalResponse.status}`)
    assert.equal(finalResponse.headers.has('location'), false, `${label}: destination redirects again`)
  }
}

async function followRedirects(start, maxHops = 6) {
  const hops = []
  let current = new URL(start)
  for (let index = 0; index <= maxHops; index += 1) {
    const response = await request(current)
    if (![301, 302, 307, 308].includes(response.status)) {
      return { hops, response, finalUrl: current }
    }
    const location = response.headers.get('location')
    assert.ok(location, `redirect from ${current} has no Location header`)
    const next = new URL(location, current)
    assert.equal(hops.some((hop) => comparableUrl(hop.to) === comparableUrl(next)), false, 'redirect loop detected')
    hops.push({ status: response.status, from: current, to: next })
    current = next
  }
  throw new Error(`more than ${maxHops} redirect hops from ${start}`)
}

function inspectHtml(html) {
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const canonicals = linkTags.filter((tag) => (
    (tag.rel || '').toLowerCase().split(/\s+/).includes('canonical')
  )).map((tag) => tag.href).filter(Boolean)
  const robots = metaTags.filter((tag) => tag.name?.toLowerCase() === 'robots')
    .map((tag) => tag.content || '')
  const productLinks = anchorTags
    .map((tag) => tag.href || '')
    .filter((href) => {
      try {
        return decodeURIComponent(new URL(href, publicOrigin).pathname).startsWith('/каталог/')
      } catch {
        return false
      }
    })
    .map((href) => comparableUrl(new URL(href, publicOrigin)))
  const hrefs = anchorTags.map((tag) => tag.href || '').filter(Boolean)

  return { canonicals, robots, productLinks, hrefs }
}

await check('robots.txt is crawlable and points to the canonical sitemap', async () => {
  const response = await request(pageUrl('/robots.txt'))
  assert.equal(response.status, 200)
  const body = await response.text()
  assert.match(body, /User-agent:\s*\*/i)
  assert.match(body, new RegExp(`Sitemap:\\s*${publicOrigin.origin.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&')}/sitemap\\.xml`, 'i'))
  assert.doesNotMatch(body, /^\s*Noindex:/im)
  assert.doesNotMatch(body, /^\s*Disallow:\s*\/$/im)
})

let sitemapUrls = []
await check('sitemap contains only unique canonical-style public URLs', async () => {
  const response = await request(pageUrl('/sitemap.xml'))
  assert.equal(response.status, 200)
  const xml = await response.text()
  const parsed = new XMLParser().parse(xml)
  const entries = parsed.urlset?.url
  sitemapUrls = (Array.isArray(entries) ? entries : entries ? [entries] : [])
    .map((entry) => new URL(String(entry.loc)))
  assert.ok(sitemapUrls.length > 0, 'sitemap is empty')
  assert.equal(new Set(sitemapUrls.map(comparableUrl)).size, sitemapUrls.length, 'duplicate URLs')

  for (const url of sitemapUrls) {
    assert.equal(url.protocol, 'https:', url.toString())
    assert.equal(url.hostname, publicOrigin.hostname, url.toString())
    assert.doesNotMatch(decodeURIComponent(url.pathname), /^\/(?:product|produkt)(?:\/|$)/)
    assert.notEqual(decodeURIComponent(url.pathname), '/политика-за-поверителност/')
    const lastSegment = url.pathname.split('/').filter(Boolean).at(-1) || ''
    if (lastSegment && !lastSegment.includes('.')) assert.ok(url.pathname.endsWith('/'), url.toString())
  }
  return `${sitemapUrls.length} URLs`
})

await check('public file URLs with a slash redirect once to the filename URL', async () => {
  for (const pathname of [
    '/robots.txt',
    '/sitemap.xml',
    '/google4e6bf48fad37f2f3.html',
    '/favicon.png',
  ]) {
    await expectSingleRedirect(
      pageUrl(pathname + '/', '?utm_source=seo-test'),
      expectedPublicUrl(pathname, '?utm_source=seo-test'),
      pathname,
    )
  }
})

await check('generic URL without slash redirects once to its slash URL', async () => {
  await expectSingleRedirect(
    pageUrl('/блог/mebeli-malak-apartament'),
    expectedPublicUrl('/блог/mebeli-malak-apartament/'),
    'trailing slash',
    { verifyDestination: !skipLocalWindowsUnicodePages },
  )
})

await check('legacy product URLs redirect directly to the canonical product URL', async () => {
  const productUrl = sitemapUrls.find((url) => decodeURIComponent(url.pathname).startsWith('/каталог/'))
  assert.ok(productUrl, 'sitemap has no product URL')
  const slug = decodeURIComponent(productUrl.pathname).split('/').filter(Boolean).at(-1)
  assert.ok(slug)
  const expected = expectedPublicUrl(`/каталог/${slug}/`)
  const redirectOptions = { verifyDestination: !skipLocalWindowsUnicodePages }
  await expectSingleRedirect(pageUrl(`/product/${slug}`), expected, 'product without slash', redirectOptions)
  await expectSingleRedirect(
    pageUrl(`/product/${slug}/`, '?utm_source=seo-test'),
    expectedPublicUrl(`/каталог/${slug}/`, '?utm_source=seo-test'),
    'product with slash and query',
    redirectOptions,
  )
})

await check('legacy catalog redirects retain marketing query parameters', async () => {
  const redirectOptions = { verifyDestination: !skipLocalWindowsUnicodePages }
  const trackingSearch = '?utm_source=seo-test&gclid=verification'
  const legacySearch = '?category=bedroom&type=wardrobes&utm_source=seo-test&gclid=verification'

  await expectSingleRedirect(
    pageUrl('/catalog', legacySearch),
    expectedPublicUrl('/готови-мебели/гардероби/', trackingSearch),
    'English catalog filters',
    redirectOptions,
  )
  await expectSingleRedirect(
    pageUrl('/каталог/', legacySearch),
    expectedPublicUrl('/готови-мебели/гардероби/', trackingSearch),
    'Bulgarian catalog filters',
    redirectOptions,
  )
  await expectSingleRedirect(
    pageUrl('/catalog/browse', trackingSearch),
    expectedPublicUrl('/готови-мебели/', trackingSearch),
    'catalog browse root',
    redirectOptions,
  )
})

await check('removed placeholder product slugs reach the catalog hub in one redirect', async () => {
  const redirectOptions = { verifyDestination: !skipLocalWindowsUnicodePages }
  const expected = expectedPublicUrl('/готови-мебели/', '?utm_source=seo-test')
  for (const prefix of ['/product/', '/produkt/', '/catalog/', '/каталог/']) {
    await expectSingleRedirect(
      pageUrl(prefix + 'trapezen-stol-natural', '?utm_source=seo-test'),
      expected,
      prefix + 'removed placeholder',
      redirectOptions,
    )
  }
})

if (isCanonicalProductionBase) {
  await check('www host and missing slash normalize in one permanent redirect', async () => {
    const start = new URL('/блог/mebeli-malak-apartament?utm_source=seo-test', publicOrigin)
    start.hostname = 'www.' + publicOrigin.hostname
    const expected = expectedPublicUrl('/блог/mebeli-malak-apartament/', '?utm_source=seo-test')
    await expectSingleRedirect(start, expected, 'www + slash')
  })

  await check('HTTP variants preserve path/query and reach the canonical URL without a chain', async () => {
    for (const hostname of [publicOrigin.hostname, 'www.' + publicOrigin.hostname]) {
      const start = new URL('/блог/mebeli-malak-apartament?utm_source=seo-test', publicOrigin)
      start.protocol = 'http:'
      start.hostname = hostname
      const result = await followRedirects(start)
      assert.equal(result.response.status, 200)
      assert.equal(
        comparableUrl(result.finalUrl),
        comparableUrl(expectedPublicUrl('/блог/mebeli-malak-apartament/', '?utm_source=seo-test')),
      )
      if (result.hops.length > 1) {
        const message = `hosting used ${result.hops.length} redirects for HTTP ${hostname}`
        if (strictHttp) throw new Error(message)
        warnings.push(message)
      }
    }
    return 'one redirect hop per HTTP hostname'
  })
} else {
  console.log('SKIP  www/HTTP edge checks require the canonical production base URL')
}

if (skipLocalWindowsUnicodePages) {
  console.log('SKIP  Cyrillic page rendering checks run against production (Next.js Windows routing limitation)')
} else {
await check('privacy page is crawlable, noindex/follow and excluded from sitemap', async () => {
  const publicPrivacy = expectedPublicUrl('/политика-за-поверителност/')
  assert.equal(sitemapUrls.some((url) => comparableUrl(url) === comparableUrl(publicPrivacy)), false)
  const response = await request(pageUrl('/политика-за-поверителност/'))
  assert.equal(response.status, 200)
  const page = inspectHtml(await response.text())
  assert.equal(page.robots.length, 1, `received ${page.robots.length} robots tags`)
  assert.match(page.robots[0], /noindex/i)
  assert.match(page.robots[0], /follow/i)
})

await check('pagination page 2 is unique, indexable and self-canonical', async () => {
  const firstPath = '/готови-мебели/колекции/line/'
  const secondPath = '/готови-мебели/колекции/line/страница/2/'
  const [firstResponse, secondResponse, sortedResponse] = await Promise.all([
    request(pageUrl(firstPath)),
    request(pageUrl(secondPath)),
    request(pageUrl(secondPath, '?sort=price-asc')),
  ])
  assert.equal(firstResponse.status, 200)
  assert.equal(secondResponse.status, 200)
  assert.equal(sortedResponse.status, 200)

  const first = inspectHtml(await firstResponse.text())
  const second = inspectHtml(await secondResponse.text())
  const sorted = inspectHtml(await sortedResponse.text())
  assert.equal(second.canonicals.length, 1)
  assert.equal(
    comparableUrl(second.canonicals[0]),
    comparableUrl(expectedPublicUrl(secondPath)),
  )
  assert.equal(second.robots.some((value) => /noindex/i.test(value)), false)
  assert.ok(first.productLinks.length > 0 && second.productLinks.length > 0)
  assert.notDeepEqual(
    [...new Set(first.productLinks)].sort(),
    [...new Set(second.productLinks)].sort(),
    'page 1 and page 2 expose the same product links',
  )
  assert.equal(sorted.canonicals.length, 1)
  assert.equal(
    comparableUrl(sorted.canonicals[0]),
    comparableUrl(expectedPublicUrl(secondPath)),
  )
  assert.ok(sorted.robots.some((value) => /noindex/i.test(value)))

  assert.ok(first.hrefs.some((href) => decodeURIComponent(new URL(href, publicOrigin).pathname) === secondPath))
  assert.ok(second.hrefs.some((href) => decodeURIComponent(new URL(href, publicOrigin).pathname) === firstPath))
})

await check('sampled sitemap pages return 200, indexable, self-canonical HTML', async () => {
  const productUrls = sitemapUrls.filter((url) => decodeURIComponent(url.pathname).startsWith('/каталог/'))
  const nonProductUrls = sitemapUrls.filter((url) => !productUrls.includes(url))
  const sampledProducts = auditAll
    ? productUrls
    : Array.from({ length: Math.min(productLimit, productUrls.length) }, (_, index) => {
      const offset = Math.floor(index * productUrls.length / Math.max(1, productLimit))
      return productUrls[Math.min(offset, productUrls.length - 1)]
    })
  const selected = [...new Map(
    [...nonProductUrls, ...sampledProducts].map((url) => [comparableUrl(url), url]),
  ).values()]

  const results = await mapConcurrent(selected, async (listedUrl) => {
    const localUrl = pageUrl(listedUrl.pathname, listedUrl.search)
    const response = await request(localUrl)
    if (response.status !== 200 || response.headers.has('location')) {
      return { url: listedUrl.toString(), issue: `HTTP ${response.status} or redirect` }
    }
    const page = inspectHtml(await response.text())
    if (page.robots.some((value) => /noindex/i.test(value))) {
      return { url: listedUrl.toString(), issue: 'noindex' }
    }
    if (page.canonicals.length !== 1) {
      return { url: listedUrl.toString(), issue: `${page.canonicals.length} canonical tags` }
    }
    if (new URL(page.canonicals[0]).hostname === 'www.domexpertmebel.com') {
      return { url: listedUrl.toString(), issue: 'www canonical' }
    }
    if (comparableUrl(page.canonicals[0]) !== comparableUrl(listedUrl)) {
      return {
        url: listedUrl.toString(),
        issue: `canonical differs: ${page.canonicals[0]}`,
      }
    }
    return { url: listedUrl.toString() }
  })

  const broken = results.filter((result) => result.error || result.issue)
  assert.deepEqual(broken, [])
  return `${selected.length} of ${sitemapUrls.length} URLs (concurrency ${concurrency})`
})
}

for (const warning of warnings) console.warn(`WARN  ${warning}`)

if (failures.length > 0) {
  console.error(`\nSEO live verification failed: ${failures.length} of ${assertions} checks failed.`)
  process.exitCode = 1
} else {
  console.log(`\nSEO live verification passed: ${assertions} checks.`)
}
