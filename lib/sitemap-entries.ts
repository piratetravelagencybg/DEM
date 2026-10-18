import { blogPosts } from '@/data/blog-posts'
import contentLastmod from '@/data/content-lastmod.json'
import projects from '@/data/projects.json'
import services from '@/data/services.json'
import { CATALOG_LANDINGS } from '@/lib/catalog-landings'
import { CANONICAL_SITE_ORIGIN } from '@/lib/canonical-routing'

export type SitemapEntry = {
  /** Percent-encoded absolute URL, identical to the page canonical. */
  loc: string
  lastmod?: string
  changefreq: string
  priority: number
  images?: string[]
}

const lastmodByFile = contentLastmod as Record<string, string>

/** Latest content change date among the given source files (YYYY-MM-DD). */
function lastmodOf(sources: string[]) {
  const dates = sources
    .flatMap((source) => (
      source.endsWith('/')
        ? Object.keys(lastmodByFile).filter((file) => file.startsWith(source))
        : [source]
    ))
    .map((file) => lastmodByFile[file])
    .filter(Boolean)
    .sort()
  return dates.at(-1)
}

function absoluteUrl(pathname: string) {
  return new URL(pathname, CANONICAL_SITE_ORIGIN).href
}

function entry(
  pathname: string,
  priority: number,
  changefreq: string,
  sources: string[],
  images?: string[],
): SitemapEntry {
  return {
    loc: absoluteUrl(pathname),
    lastmod: lastmodOf(sources),
    changefreq,
    priority,
    ...(images ? { images: images.map(absoluteUrl) } : {}),
  }
}

const page = (route: string) => `app${route}page.tsx`

export function getCoreSitemapEntries(): SitemapEntry[] {
  const staticPages = [
    entry('/', 1.0, 'weekly', [page('/'), 'components/home/']),
    entry('/за-нас/', 0.7, 'monthly', [page('/за-нас/')]),
    entry('/услуги/', 0.9, 'monthly', [page('/услуги/'), 'data/services.json']),
    entry('/проекти/', 0.8, 'monthly', [page('/проекти/'), 'data/projects.json']),
    entry('/3d-проекти/', 0.8, 'monthly', [page('/3d-проекти/')]),
    entry('/3d-проекти/kuhnya-domexpert-v17/', 0.7, 'monthly', [page('/3d-проекти/kuhnya-domexpert-v17/')], [
      '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp',
      '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-frontalen-2.webp',
      '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-vrata-3.webp',
    ]),
    entry('/блог/', 0.7, 'weekly', [page('/блог/'), 'data/blog-posts.ts']),
    entry('/контакти/', 0.8, 'monthly', [page('/контакти/')]),
    entry('/благоевград/', 0.9, 'monthly', [page('/благоевград/')]),
    entry('/софия/', 0.9, 'monthly', [page('/софия/')]),
    entry('/софия/кухни-по-поръчка/', 0.9, 'monthly', [page('/софия/кухни-по-поръчка/'), 'data/projects.json']),
    entry('/дупница/', 0.9, 'monthly', [page('/дупница/')]),
    entry('/сандански/', 0.9, 'monthly', [page('/сандански/')]),
    entry('/петрич/', 0.9, 'monthly', [page('/петрич/')]),
  ]

  const servicePages = services.map((service) => entry(
    `/услуги/${service.slug}/`,
    0.85,
    'monthly',
    [page(`/услуги/${service.slug}/`), 'data/services.json', 'components/ui/ServicePageTemplate.tsx'],
  ))

  const projectPages = projects.map((project) => entry(
    `/проекти/${project.slug}/`,
    0.7,
    'monthly',
    ['data/projects.json', 'app/проекти/[slug]/page.tsx'],
  ))

  // Blog posts carry their own editorial dates; use them as the source of truth.
  const blogPages = blogPosts.map((post) => ({
    ...entry(`/блог/${post.slug}/`, 0.65, 'monthly', []),
    lastmod: post.dateModified || post.date,
  }))

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages]
}

export function getCatalogSitemapEntries(): SitemapEntry[] {
  return CATALOG_LANDINGS.map((landing) => entry(
    landing.path,
    landing.priority,
    landing.changeFrequency,
    ['lib/catalog-landings.ts', 'data/mbx-catalog.json'],
  ))
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function renderUrlset(entries: SitemapEntry[]) {
  const hasImages = entries.some((item) => item.images?.length)
  const body = entries.map((item) => [
    '  <url>',
    `    <loc>${escapeXml(item.loc)}</loc>`,
    ...(item.lastmod ? [`    <lastmod>${item.lastmod}</lastmod>`] : []),
    `    <changefreq>${item.changefreq}</changefreq>`,
    `    <priority>${item.priority.toFixed(2)}</priority>`,
    ...(item.images ?? []).map((image) => `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`),
    '  </url>',
  ].join('\n')).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${hasImages ? '\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ''}>
${body}
</urlset>
`
}

export function sitemapResponse(entries: SitemapEntry[]) {
  return new Response(renderUrlset(entries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
