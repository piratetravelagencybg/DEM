import type { MetadataRoute } from 'next'

const BASE = 'https://domexpertmebel.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/sitemap-core.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/sitemap-catalog.xml`,
      lastModified: new Date(),
    },
  ]
}
