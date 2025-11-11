"use client"

import React, { useEffect, useState } from 'react'
import ProductGrid from '@/components/product-grid'

type Product = {
  id: number
  name: string
  description?: string
  image_url?: string
  category?: string
  views?: number
}

export default function TopRatedProducts({ count = 6, productIds }: { count?: number; productIds?: number[] }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const apiBase = process.env.NEXT_PUBLIC_PRODUCTS_API || 'https://events.codewithseth.co.ke/api/products'

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      console.log('TopRatedProducts: Starting to load products')
      console.log('TopRatedProducts: productIds =', productIds)
      console.log('TopRatedProducts: apiBase =', apiBase)
      
      try {
        // Fetch all products from API
        const res = await fetch(`${apiBase}`)
        console.log('TopRatedProducts: API response status =', res.status)
        
        if (!res.ok) throw new Error('products api failed')
        const json = await res.json()
        console.log('TopRatedProducts: API data received, categories count =', json?.data?.length)
        
        // Extract all products from nested structure
        let allProducts: any[] = []
        if (json?.data && Array.isArray(json.data)) {
          // API returns categories with nested products
          json.data.forEach((category: any) => {
            if (category.products && Array.isArray(category.products)) {
              allProducts = allProducts.concat(category.products)
            }
          })
        }
        
        console.log('TopRatedProducts: Total products extracted =', allProducts.length)
        
        if (!mounted) return

        // If specific product IDs are provided, filter for those
        if (productIds && productIds.length > 0) {
          console.log('TopRatedProducts: Filtering for specific IDs:', productIds)
          
          const filteredProducts = allProducts
            .filter(p => productIds.includes(Number(p.id)))
            .map((p: any) => ({
              id: Number(p.id || 0),
              name: p.name || 'Untitled',
              description: p.description || '',
              image_url: p.image_url || p.images?.[0]?.product_image || '',
              category: p.category || '',
              views: Number(p.views || 0),
            }))
          
          console.log('TopRatedProducts: Filtered products found =', filteredProducts.length)
          console.log('TopRatedProducts: Filtered products =', filteredProducts.map(p => ({ id: p.id, name: p.name })))
          
          // Sort by the order of productIds
          const sorted = productIds
            .map(id => filteredProducts.find(p => p.id === id))
            .filter(p => p !== undefined) as Product[]
          
          console.log('TopRatedProducts: Final sorted products =', sorted.length)
          setProducts(sorted)
          setLoading(false)
          return
        }

        // Otherwise, sort by popularity
        function viewScore(p: any) {
          const views = Number(p.views ?? p.viewCount ?? p.view_count ?? p.hits ?? p.popularity ?? 0) || 0
          const rating = Number(p.rating ?? p.avgRating ?? 0) || 0
          return views + rating * 10
        }

        const mapped = allProducts.map((p) => ({
          id: Number(p.id || 0),
          name: p.name || 'Untitled',
          description: p.description || '',
          image_url: p.image_url || p.images?.[0]?.product_image || '',
          category: p.category || '',
          views: Number(p.views || 0),
          _raw: p,
          _score: viewScore(p),
        }))

        // Sort by score desc
        mapped.sort((a, b) => {
          if (b._score !== a._score) return b._score - a._score
          return b.id - a.id
        })

        const top = mapped.slice(0, count).map((m) => ({ 
          id: m.id, 
          name: m.name, 
          description: m.description, 
          image_url: m.image_url, 
          category: m.category,
          views: m.views 
        }))
        
        console.log('TopRatedProducts: Final products to display =', top.length)
        setProducts(top)
      } catch (e) {
        console.error('TopRatedProducts: Error loading products', e)
        setProducts([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [apiBase, count, productIds])

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
