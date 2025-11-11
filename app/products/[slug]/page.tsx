import React from 'react'
import TOP_PRODUCTS from '@/data/top-products'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const product = TOP_PRODUCTS.find((p) => p.slug === params.slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.title} — Accord Medical Supplies Ltd`,
    description: product.excerpt || `${product.title} available in Kenya. Contact us for pricing and brochures.`,
    openGraph: {
      title: `${product.title} — Accord Medical Supplies Ltd`,
      description: product.excerpt,
      images: product.image ? [product.image] : undefined,
    },
  }
}

export default function Page({ params }: Props) {
  const product = TOP_PRODUCTS.find((p) => p.slug === params.slug)
  if (!product) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.excerpt,
    image: product.image ? `${process.env.NEXT_PUBLIC_BASE_URL || ''}${product.image}` : undefined,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/products/${product.slug}`,
    brand: { '@type': 'Brand', name: 'Accord Medical' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: 'Contact for price',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/products/${product.slug}`,
    },
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-muted-foreground mb-6">{product.excerpt}</p>

          {product.image && (
            <div className="rounded-lg overflow-hidden mb-6">
              <Image src={product.image} alt={product.title} width={1200} height={600} className="w-full h-auto object-cover" />
            </div>
          )}

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-base text-muted-foreground">{product.excerpt}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Key Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="font-medium">{String(v)}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Brochure & Pricing</h2>
            <p className="text-base text-muted-foreground">Price Range: <strong>{product.priceRange || 'Contact for pricing'}</strong></p>
            {product.brochure ? (
              <a href={product.brochure} className="inline-block mt-4 text-primary underline">Download brochure</a>
            ) : (
              <p className="mt-4 text-muted-foreground">Brochure available on request.</p>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <div className="p-4 rounded-lg border bg-background">
            <h3 className="font-semibold">Get a Quote</h3>
            <p className="text-sm text-muted-foreground mb-4">Contact our sales team for pricing, installation and shipping.</p>
            <a href="/interest" className="inline-block w-full text-center rounded-md bg-primary text-white px-4 py-3">Request Quote</a>
          </div>

          <div className="p-4 rounded-lg border bg-background">
            <h4 className="font-semibold">Category</h4>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
