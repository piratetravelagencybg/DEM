import { getCatalogSitemapEntries, sitemapResponse } from '@/lib/sitemap-entries'

// Kept for URLs already submitted in Search Console. /sitemap.xml is the
// primary sitemap and contains these entries too.
export const dynamic = 'force-static'

export function GET() {
  return sitemapResponse(getCatalogSitemapEntries())
}
