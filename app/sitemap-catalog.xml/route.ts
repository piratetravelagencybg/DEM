import { CATALOG_LANDINGS } from '@/lib/catalog-landings'

const BASE = 'https://domexpertmebel.com'

export async function GET() {
  const catalogPages = CATALOG_LANDINGS.map((landing) => ({
    url: BASE + landing.path,
    priority: landing.priority,
    changeFrequency: landing.changeFrequency,
  }))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${catalogPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
