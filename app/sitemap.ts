import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'
import projects from '@/data/projects.json'
import services from '@/data/services.json'
import { CATALOG_LANDINGS } from '@/lib/catalog-landings'
import { getAllMbxProducts } from '@/lib/mbx'

const BASE = 'https://domexpertmebel.com'
const SITE_LAUNCH = new Date('2026-07-09')
const BLOG_LAST_MODIFIED = new Date(
  blogPosts.reduce((latest, post) => {
    const timestamp = Date.parse(post.dateModified ?? post.date)
    return Number.isNaN(timestamp) ? latest : Math.max(latest, timestamp)
  }, SITE_LAUNCH.getTime()),
)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/за-нас/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/услуги/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/проекти/`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/блог/`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: BLOG_LAST_MODIFIED },
    { url: `${BASE}/контакти/`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/политика-за-поверителност/`, priority: 0.2, changeFrequency: 'yearly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/благоевград/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/софия/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/дупница/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
    { url: `${BASE}/сандански/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: SITE_LAUNCH },
  ]

  const servicePages = services.map((service) => ({
    url: `${BASE}/услуги/${service.slug}/`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: SITE_LAUNCH,
  }))

  const projectPages = projects.map((project) => ({
    url: `${BASE}/проекти/${project.slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: SITE_LAUNCH,
  }))

  const productPages = getAllMbxProducts().map((product) => ({
    url: `${BASE}/каталог/${product.slug}/`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: Number.isNaN(Date.parse(product.lastUpdate))
      ? SITE_LAUNCH
      : new Date(product.lastUpdate),
  }))

  const readyFurniturePages = CATALOG_LANDINGS.map((landing) => ({
    url: BASE + landing.path,
    priority: landing.priority,
    changeFrequency: landing.changeFrequency,
    lastModified: SITE_LAUNCH,
  }))

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE}/блог/${post.slug}/`,
    priority: 0.65,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(post.dateModified ?? post.date),
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...readyFurniturePages,
    ...productPages,
    ...blogPages,
  ].map((page) => ({
    url: page.url,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
