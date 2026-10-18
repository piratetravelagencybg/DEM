import { getCatalogSitemapEntries, getCoreSitemapEntries, sitemapResponse } from '@/lib/sitemap-entries'

// Single sitemap with every indexable URL. The site is small enough that a
// sitemap index adds a crawl hop without any benefit.
export const dynamic = 'force-static'

export function GET() {
  return sitemapResponse([...getCoreSitemapEntries(), ...getCatalogSitemapEntries()])
}
