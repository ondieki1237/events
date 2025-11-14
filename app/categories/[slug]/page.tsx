"use client"

import { useState, useEffect } from "react"
import { fetchCategoryProducts } from "@/lib/api"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ShoppingCart, Filter } from "lucide-react"

interface Product {
  id: string
  name: string
  price: string
  reduced_price: string | null
  category: string
  brand: string
  featured: boolean
  images: { url: string; thumbnail: string }[]
}

export default function CategoryProductsPage() {
  const params = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const slug = params.slug as string
        const data = await fetchCategoryProducts(slug)
        setProducts(data.data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      loadProducts()
    }
  }, [params.slug])

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") {
      return Number.parseFloat(a.price) - Number.parseFloat(b.price)
    } else if (sortBy === "price-desc") {
      return Number.parseFloat(b.price) - Number.parseFloat(a.price)
    }
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-2"
          >
            {params.slug
              ?.toString()
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </motion.h1>
          <p className="text-lg text-gray-300">{products.length} products available</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter size={20} />
            <span className="font-semibold">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 flex items-center gap-2"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products in this category</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}

                    {product.reduced_price && product.price && Number.parseFloat(product.price) > 0 && Number.parseFloat(product.reduced_price) > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                        -
                        {Math.round(
                          ((Number.parseFloat(product.price) - Number.parseFloat(product.reduced_price)) /
                            Number.parseFloat(product.price)) *
                            100,
                        )}
                        %
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

                    <div className="mb-4">
                      {product.reduced_price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-red-600">
                            KES {Number.parseFloat(product.reduced_price).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            KES {Number.parseFloat(product.price).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          KES {Number.parseFloat(product.price).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg transition-all">
                      <ShoppingCart size={16} className="mr-2" /> Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
