import { blogPosts } from '@/data/blog-posts'
import projects from '@/data/projects.json'
import services from '@/data/services.json'

const BASE = 'https://domexpertmebel.com'

export async function GET() {
  const staticPages = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/за-нас/`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/услуги/`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/проекти/`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/блог/`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/контакти/`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/благоевград/`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/софия/`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/дупница/`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/сандански/`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/петрич/`, priority: 0.9, changeFrequency: 'monthly' },
  ]

  const servicePages = services.map((service) => ({
    url: `${BASE}/услуги/${service.slug}/`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }))

  const projectPages = projects.map((project) => ({
    url: `${BASE}/проекти/${project.slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE}/блог/${post.slug}/`,
    priority: 0.65,
    changeFrequency: 'monthly',
  }))

  const allPages = [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...blogPages,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
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
