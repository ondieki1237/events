import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://events.accordmedical.co.ke'
  
  // Static pages
  const routes = [
    '',
    '/interest',
    '/feedback',
    '/admin',
    '/jobs',
    '/blog',
    '/products/top-rated',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Department pages
  const departments = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/department/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...departments]
}
