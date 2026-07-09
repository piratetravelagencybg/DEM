import type { MetadataRoute } from 'next'
import projects from '@/data/projects.json'
import products from '@/data/products.json'
import services from '@/data/services.json'

const BASE = 'https://domexpertmebel.com'

const SITE_LAUNCH = new Date('2026-07-09')
const BLOG_DATES: Record<string, string> = {
  'kak-da-izberem-kuhnya-po-poruchka': '2025-06-01',
  'garderob-po-poruchka-ili-gotov': '2025-05-15',
  'tseni-mebeli-po-poruchka-balgariya': '2025-04-20',
  'mebeli-malak-apartament': '2025-03-10',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/за-нас/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/услуги/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/проекти/`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/каталог/`, priority: 0.8, changeFrequency: 'weekly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/блог/`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/контакти/`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/благоевград/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/софия/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/дупница/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/сандански/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
  ]

  const servicePages = services.map((s) => ({
    url: `${BASE}/услуги/${s.slug}/`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: SITE_LAUNCH,
  }))

  const projectPages = projects.map((p) => ({
    url: `${BASE}/проекти/${p.slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: SITE_LAUNCH,
  }))

  const productPages = products.map((p) => ({
    url: `${BASE}/каталог/${p.slug}/`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: SITE_LAUNCH,
  }))

  const blogSlugs = Object.keys(BLOG_DATES)
  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE}/блог/${slug}/`,
    priority: 0.65,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(BLOG_DATES[slug]),
  }))

  return [...staticPages, ...servicePages, ...projectPages, ...productPages, ...blogPages].map((page) => ({
    url: page.url,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
