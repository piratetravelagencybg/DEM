import type { MetadataRoute } from 'next'
import projects from '@/data/projects.json'
import products from '@/data/products.json'
import services from '@/data/services.json'

const BASE = 'https://domexpertmebel.bg'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/за-нас/`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/услуги/`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/проекти/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE}/каталог/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/блог/`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/контакти/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/благоевград/`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/софия/`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/дупница/`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/сандански/`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  const servicePages = services.map((s) => ({
    url: `${BASE}/услуги/${s.slug}/`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  const projectPages = projects.map((p) => ({
    url: `${BASE}/проекти/${p.slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const productPages = products.map((p) => ({
    url: `${BASE}/каталог/${p.slug}/`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...servicePages, ...projectPages, ...productPages].map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
