"use client"

import React, { useEffect, useState } from 'react'
import ProductGrid from '@/components/product-grid'

type Product = {
  id: number
  name: string
  description?: string
  image_url?: string
  category?: string
}

export default function TopRatedProducts({ count = 6 }: { count?: number }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const apiBase = process.env.NEXT_PUBLIC_PRODUCTS_API || ''

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        // Try the products API and assume it supports ?sort=views or returns a list we can slice
        const res = await fetch(apiBase + '?limit=500')
        if (!res.ok) throw new Error('products api failed')
        const json = await res.json()
        const items = (json?.data ?? json) as any[]
        if (!mounted) return

        // Small popularity algorithm: look for common view-like fields and compute a score
        function viewScore(p: any) {
          const views = Number(p.views ?? p.viewCount ?? p.view_count ?? p.hits ?? p.popularity ?? p.searches ?? 0) || 0
          const rating = Number(p.rating ?? p.avgRating ?? 0) || 0
          // rating scaled to be comparable
          return views + rating * 10
        }

        const mapped = items
          .map((p) => ({
            id: Number((p.id ?? p._id ?? p.productId) || 0),
            name: p.name || p.title || 'Untitled',
            description: p.description || p.excerpt || '',
            image_url: p.image_url || p.image || p.imageUrl || p.thumbnail || '',
            category: p.category || p.categoryName || '',
            _raw: p,
            _score: viewScore(p),
          }))

        // Sort by score desc, fallback to createdAt or id if equal
        mapped.sort((a, b) => {
          if (b._score !== a._score) return b._score - a._score
          const da = Number(a._raw?.createdAt ? new Date(a._raw.createdAt).getTime() : a.id)
          const db = Number(b._raw?.createdAt ? new Date(b._raw.createdAt).getTime() : b.id)
          return db - da
        })

        const top = mapped.slice(0, count).map((m) => ({ id: m.id, name: m.name, description: m.description, image_url: m.image_url, category: m.category }))
        setProducts(top)
      } catch (e) {
        console.warn('TopRatedProducts: failed to load products', e)
        setProducts([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (apiBase) load()
    return () => { mounted = false }
  }, [apiBase, count])

  if (!apiBase) return null

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Top Rated Products</h2>
          <p className="text-muted-foreground mt-2">Products most viewed or searched by our visitors</p>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <ProductGrid products={products} selectedProducts={[]} onToggle={() => {}} viewMode="grid" />
        )}
      </div>
    </section>
  )
}
