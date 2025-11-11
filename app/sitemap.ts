import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://events.codewithseth.co.ke'
  
  // Static pages
  const routes = [
    '',
    '/interest',
    '/feedback',
    '/admin',
    '/jobs',
    '/blog',
    '/products/top-rated',
    '/fully-automated-chemistry-analyzer',
    '/medical-equipment-suppliers-nairobi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.includes('chemistry-analyzer') || route.includes('nairobi') ? 0.9 : 0.8,
  }))

  // Department pages
  const departments = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/department/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...departments]
}
