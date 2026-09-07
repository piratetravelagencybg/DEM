import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, '..')
const sourceRoots = ['app', 'components', 'data', 'lib']
const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'])
const failures = []
let assertions = 0

async function check(label, verifier) {
  assertions += 1
  try {
    await verifier()
    console.log(`PASS  ${label}`)
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    failures.push({ label, detail })
    console.error(`FAIL  ${label}: ${detail}`)
  }
}

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(absolutePath)
    return sourceExtensions.has(path.extname(entry.name)) ? [absolutePath] : []
  }))
  return nested.flat()
}

function getLineNumber(source, index) {
  return source.slice(0, index).split('\n').length
}

function isPagePath(value) {
  if (!value.startsWith('/') || value.startsWith('//')) return false
  const pathname = value.split(/[?#]/, 1)[0]
  if (
    pathname === '/'
    || pathname.startsWith('/api/')
    || pathname.startsWith('/_next/')
    || pathname.startsWith('/images/')
  ) {
    return false
  }
  const lastSegment = pathname.split('/').filter(Boolean).at(-1) || ''
  return !lastSegment.includes('.')
}

function validatePublicReference(value, location, violations) {
  if (value.includes('www.domexpertmebel.com')) {
    violations.push(`${location}: public reference uses www: ${value}`)
  }

  let pathnameValue = value
  if (/^https?:\/\//.test(value)) {
    if (!value.includes('domexpertmebel.com')) return
    if (value.includes('${')) return
    const parsed = new URL(value)
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'domexpertmebel.com') {
      violations.push(`${location}: non-canonical site origin: ${value}`)
    }
    pathnameValue = parsed.pathname + parsed.search + parsed.hash
  }

  const pathname = pathnameValue.split(/[?#]/, 1)[0]
  if (/^\/(?:product|produkt)(?:\/|$)/.test(pathname)) {
    violations.push(`${location}: legacy product link: ${value}`)
  }
  if (isPagePath(pathnameValue) && !pathname.endsWith('/')) {
    violations.push(`${location}: page link is missing trailing slash: ${value}`)
  }
}

const referencePatterns = [
  /\bhref\s*=\s*["']([^"']+)["']/g,
  /\bhref\s*=\s*\{\s*["']([^"']+)["']\s*\}/g,
  /\bhref\s*=\s*\{\s*`([^`]+)`\s*\}/g,
  /\bhref\s*:\s*["']([^"']+)["']/g,
  /\bhref\s*:\s*`([^`]+)`/g,
  /\burl\s*:\s*["']([^"']+)["']/g,
  /\burl\s*:\s*`([^`]+)`/g,
]

await check('canonical URL helper normalizes host and trailing slash in one target', async () => {
  const helperUrl = pathToFileURL(path.join(repositoryRoot, 'lib', 'canonical-routing.ts')).href
  const {
    buildCanonicalPublicUrl,
    getCanonicalRequestRedirectUrl,
    normalizePublicPathname,
  } = await import(helperUrl)

  assert.equal(normalizePublicPathname('/блог/статия'), '/блог/статия/')
  assert.equal(normalizePublicPathname('/блог/статия/'), '/блог/статия/')
  assert.equal(normalizePublicPathname('/sitemap.xml'), '/sitemap.xml')
  assert.equal(normalizePublicPathname('/sitemap.xml/'), '/sitemap.xml')
  assert.equal(normalizePublicPathname('/robots.txt/'), '/robots.txt')
  assert.equal(normalizePublicPathname('/google4e6bf48fad37f2f3.html/'), '/google4e6bf48fad37f2f3.html')
  assert.equal(normalizePublicPathname('/version-2.0'), '/version-2.0/')
  assert.equal(
    getCanonicalRequestRedirectUrl(
      'https://www.domexpertmebel.com/блог/статия?utm_source=test',
      '/блог/статия',
    )?.toString(),
    'https://domexpertmebel.com/%D0%B1%D0%BB%D0%BE%D0%B3/%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%8F/?utm_source=test',
  )
  assert.equal(
    getCanonicalRequestRedirectUrl(
      'https://domexpertmebel.com/блог/статия/',
      '/блог/статия/',
    ),
    null,
  )
  assert.equal(
    buildCanonicalPublicUrl(
      'https://www.domexpertmebel.com/product/example/?ref=test',
      '/каталог/example/',
      { clearSearch: true },
    ).toString(),
    'https://domexpertmebel.com/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3/example/',
  )
  assert.equal(
    buildCanonicalPublicUrl('http://localhost:3000/блог', '/блог').toString(),
    'http://localhost:3000/%D0%B1%D0%BB%D0%BE%D0%B3/',
  )
})

await check('Next config keeps slash URLs but delegates normalization to middleware', async () => {
  const config = (await import(pathToFileURL(path.join(repositoryRoot, 'next.config.mjs')).href)).default
  assert.equal(config.trailingSlash, true)
  assert.equal(config.skipTrailingSlashRedirect, true)
  assert.equal(config.redirects, undefined)
})

await check('curated landing and pagination builders always emit trailing slashes', async () => {
  const moduleUrl = pathToFileURL(path.join(repositoryRoot, 'lib', 'catalog-landings.ts')).href
  const {
    CATALOG_LANDINGS,
    buildCatalogLandingPagePath,
  } = await import(moduleUrl)
  assert.ok(CATALOG_LANDINGS.length > 0)
  for (const landing of CATALOG_LANDINGS) {
    assert.ok(landing.path.startsWith('/') && landing.path.endsWith('/'), landing.path)
    assert.ok(buildCatalogLandingPagePath(landing, 2).endsWith('/'), landing.slug)
  }
})

await check('sitemap source excludes redirects, aliases and the noindex privacy page', async () => {
  const sitemapSource = await readFile(path.join(repositoryRoot, 'app', 'sitemap.ts'), 'utf8')
  assert.equal(sitemapSource.includes('www.domexpertmebel.com'), false)
  assert.equal(sitemapSource.includes('/product/'), false)
  assert.equal(sitemapSource.includes('/produkt/'), false)
  assert.equal(sitemapSource.includes('/политика-за-поверителност/'), false)
})

await check('literal internal links use canonical paths directly', async () => {
  const files = (await Promise.all(
    sourceRoots.map((root) => collectSourceFiles(path.join(repositoryRoot, root))),
  )).flat()
  const violations = []
  let references = 0

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const relativePath = path.relative(repositoryRoot, file).replaceAll(path.sep, '/')
    for (const pattern of referencePatterns) {
      for (const match of source.matchAll(pattern)) {
        references += 1
        validatePublicReference(
          match[1],
          `${relativePath}:${getLineNumber(source, match.index || 0)}`,
          violations,
        )
      }
    }
  }

  assert.ok(references >= 150, `only ${references} references were inspected`)
  assert.deepEqual(violations, [])
  console.log(`      inspected ${references} href/url literals`)
})

if (failures.length > 0) {
  console.error(`\nSEO source verification failed: ${failures.length} of ${assertions} checks failed.`)
  process.exitCode = 1
} else {
  console.log(`\nSEO source verification passed: ${assertions} checks.`)
}
