import TOP_PRODUCTS from '@/data/top-products'

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'https://example.com'

  const pages = [
    '',
    'products',
    'blog'
  ]

  // product pages
  const productUrls = TOP_PRODUCTS.map((p: any) => `products/${p.slug}`)

  // blog pages (hard-coded for now)
  const blogUrls = [
    'blog/fully-automated-chemistry-analyzer-price-kenya-2025',
    'blog/biochemistry-analyzer-price-2025',
    'blog/patient-monitor-price-and-features-2025'
  ]

  const allUrls = [...pages, ...productUrls, ...blogUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls
    .map((u) => {
      const loc = `${baseUrl}/${u}`.replace(/([^:])\/\//g, '$1/')
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`
    })
    .join('\n')}\n</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
