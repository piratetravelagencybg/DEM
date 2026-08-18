import { XMLParser } from 'fast-xml-parser'

const baseUrl = new URL(process.argv[2] || 'https://domexpertmebel.com/')
const productSampleSize = Math.max(0, Number(process.argv[3] || 120))
const maxImageChecks = Math.max(1, Number(process.argv[4] || 180))
const timeoutMs = 20_000

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

function absolute(value, pageUrl) {
  try {
    return new URL(value, pageUrl).toString()
  } catch {
    return null
  }
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  const started = performance.now()
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      ...options,
      signal: controller.signal,
      headers: {
        'user-agent': 'DomExpertSiteAudit/1.0',
        ...(options.headers || {}),
      },
    })
    return { response, elapsedMs: Math.round(performance.now() - started) }
  } finally {
    clearTimeout(timer)
  }
}

async function mapConcurrent(values, concurrency, mapper) {
  const results = new Array(values.length)
  let nextIndex = 0
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++
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

const sitemapResponse = await request(new URL('/sitemap.xml', baseUrl))
const sitemapXml = await sitemapResponse.response.text()
const parsedSitemap = new XMLParser().parse(sitemapXml)
const sitemapUrls = (parsedSitemap.urlset?.url || []).map((entry) => {
  const listedUrl = new URL(String(entry.loc))
  return new URL(listedUrl.pathname + listedUrl.search, baseUrl).toString()
})
const productUrls = sitemapUrls.filter((url) => new URL(url).pathname.startsWith('/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3/') || decodeURI(new URL(url).pathname).startsWith('/каталог/'))
const nonProductUrls = sitemapUrls.filter((url) => !productUrls.includes(url))
const sampledProducts = Array.from({ length: Math.min(productSampleSize, productUrls.length) }, (_, index) => {
  const offset = Math.floor(index * productUrls.length / Math.max(1, productSampleSize))
  return productUrls[Math.min(offset, productUrls.length - 1)]
})
const pageUrls = [...new Set([...nonProductUrls, ...sampledProducts])]

const pageResults = await mapConcurrent(pageUrls, 10, async (url) => {
  const { response, elapsedMs } = await request(url)
  const html = await response.text()
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim()
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
  const meta = Object.fromEntries(metaTags.flatMap((tag) => {
    const key = tag.property || tag.name
    return key ? [[key.toLowerCase(), tag.content || '']] : []
  }))
  const canonical = linkTags.find((tag) => tag.rel?.toLowerCase() === 'canonical')?.href || ''
  // Audit the fallback src exactly as a crawler sees it. Fetching every
  // responsive srcset width would multiply requests without finding new
  // upstream assets.
  const images = imageTags
    .map((tag) => absolute(tag.src, url))
    .filter(Boolean)
  const links = anchorTags
    .filter((tag) => !/nofollow/i.test(tag.rel || ''))
    .map((tag) => absolute(tag.href, url))
    .filter((value) => value?.startsWith(baseUrl.origin))
    .map((value) => new URL(value).origin + new URL(value).pathname)
  const schemaBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
  const invalidSchemas = schemaBlocks.flatMap((match, index) => {
    try {
      JSON.parse(decodeHtml(match[1]))
      return []
    } catch (error) {
      return [`schema ${index + 1}: ${error instanceof Error ? error.message : String(error)}`]
    }
  })

  return {
    url,
    status: response.status,
    elapsedMs,
    bytes: Buffer.byteLength(html),
    title,
    description: meta.description || '',
    robots: meta.robots || '',
    canonical,
    og: Object.fromEntries(Object.entries(meta).filter(([key]) => key.startsWith('og:'))),
    images,
    links,
    schemaCount: schemaBlocks.length,
    invalidSchemas,
  }
})

const successfulPages = pageResults.filter((page) => page && !page.error)
const uniqueImages = [...new Set(successfulPages.flatMap((page) => page.images))]
const imageSampleSize = Math.min(maxImageChecks, uniqueImages.length)
const sampledImages = Array.from({ length: imageSampleSize }, (_, index) => {
  const offset = Math.floor(index * uniqueImages.length / Math.max(1, imageSampleSize))
  return uniqueImages[Math.min(offset, uniqueImages.length - 1)]
})
const imageResults = await mapConcurrent([...new Set(sampledImages)], 6, async (url) => {
  const started = performance.now()
  const result = await request(url)
  const body = await result.response.arrayBuffer()
  const elapsedMs = Math.round(performance.now() - started)
  const contentLength = body.byteLength
  const contentType = result.response.headers.get('content-type') || ''
  const contentDisposition = result.response.headers.get('content-disposition') || ''
  let upstream = null
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/_next/image')) upstream = parsed.searchParams.get('url')
  } catch {}
  return {
    url,
    status: result.response.status,
    elapsedMs,
    contentLength,
    contentType,
    upstream,
    suspiciousPlaceholder: result.response.status === 200
      && contentType.startsWith('image/')
      && /mbx\.bg/.test(upstream || url)
      && contentLength > 0
      && (
        /placeholder\.png/i.test(contentDisposition)
        || (contentType.includes('png') && contentLength <= 7_000)
      ),
  }
})

const pageByPath = new Map(successfulPages.map((page) => [new URL(page.url).pathname, page]))
const incoming = new Map([...pageByPath.keys()].map((path) => [path, new Set()]))
for (const page of successfulPages) {
  for (const link of page.links) {
    const path = new URL(link).pathname
    if (incoming.has(path) && path !== new URL(page.url).pathname) incoming.get(path).add(page.url)
  }
}

const requiredOg = [
  'og:title',
  'og:description',
  'og:url',
  'og:type',
  'og:image',
  'og:image:alt',
  'og:image:width',
  'og:image:height',
  'og:image:type',
]
const summarize = (values, limit = 60) => ({ count: values.length, examples: values.slice(0, limit) })
const report = {
  sitemap: {
    status: sitemapResponse.response.status,
    urls: sitemapUrls.length,
    nonProductUrls: nonProductUrls.length,
    productUrls: productUrls.length,
  },
  pages: {
    audited: successfulPages.length,
    failed: summarize(pageResults.filter((page) => page?.error || page?.status >= 400)),
    slow: summarize(successfulPages.filter((page) => page.elapsedMs > 2_000).map((page) => ({ url: page.url, elapsedMs: page.elapsedMs, bytes: page.bytes }))),
    titlesTooLong: summarize(successfulPages.filter((page) => page.title.length > 60).map((page) => ({ url: page.url, length: page.title.length, title: page.title }))),
    descriptionsTooShort: summarize(successfulPages.filter((page) => page.description.length < 120).map((page) => ({ url: page.url, length: page.description.length }))),
    descriptionsTooLong: summarize(successfulPages.filter((page) => page.description.length > 160).map((page) => ({ url: page.url, length: page.description.length }))),
    incompleteOpenGraph: summarize(successfulPages.flatMap((page) => {
      const missing = requiredOg.filter((name) => !page.og[name])
      return missing.length ? [{ url: page.url, missing }] : []
    })),
    noindex: summarize(successfulPages.filter((page) => /noindex/i.test(page.robots)).map((page) => page.url)),
    invalidSchemas: summarize(successfulPages.filter((page) => page.invalidSchemas.length).map((page) => ({ url: page.url, errors: page.invalidSchemas }))),
    zeroIncomingWithinAudit: summarize([...incoming].filter(([, sources]) => sources.size === 0).map(([path]) => new URL(path, baseUrl).toString())),
  },
  images: {
    discovered: uniqueImages.length,
    audited: imageResults.length,
    nextOptimizerUrls: summarize(uniqueImages.filter((url) => new URL(url).pathname.startsWith('/_next/image'))),
    failed: summarize(imageResults.filter((image) => image?.error || image?.status >= 400 || !image?.contentType?.startsWith('image/'))),
    large: summarize(imageResults.filter((image) => image?.contentLength > 100_000).map((image) => ({ url: image.url, bytes: image.contentLength, elapsedMs: image.elapsedMs }))),
    slow: summarize(imageResults.filter((image) => image?.elapsedMs > 2_000).map((image) => ({ url: image.url, elapsedMs: image.elapsedMs, bytes: image.contentLength }))),
    suspiciousPlaceholders: summarize(imageResults.filter((image) => image?.suspiciousPlaceholder)),
  },
}

console.log(JSON.stringify(report, null, 2))
