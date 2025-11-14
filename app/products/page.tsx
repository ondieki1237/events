"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: string
  reduced_price: string | null
  category: string
  brand: string
  description?: string
  featured: boolean
  images: { url: string; thumbnail: string }[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ limit: 100 })
        setProducts(data.data || [])

        // Extract unique categories
        const uniqueCategories = [...new Set((data.data || []).map((p: Product) => p.category))]
        setCategories(uniqueCategories as string[])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "price") {
        return Number.parseFloat(a.price) - Number.parseFloat(b.price)
      } else if (sortBy === "price-desc") {
        return Number.parseFloat(b.price) - Number.parseFloat(a.price)
      }
      return a.name.localeCompare(b.name)
    })

    setFilteredProducts(result)
  }, [products, searchTerm, selectedCategory, sortBy])

  const savingsPercentage = (original: string, reduced: string | null) => {
    if (!reduced) return 0
    const savings = ((Number.parseFloat(original) - Number.parseFloat(reduced)) / Number.parseFloat(original)) * 100
    return Math.round(savings)
  }

  // Helper to strip HTML tags for preview
  const stripHtml = (html: string) => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black mb-4"
          >
            Black November <span className="text-[#0096d9]">Products</span>
          </motion.h1>
          <p className="text-base sm:text-xl text-gray-300">Explore our complete range of medical equipment</p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="sm:col-span-2 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9]"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/products/${product.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
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

                      {/* Discount Badge */}
                      {product.reduced_price && product.price && Number.parseFloat(product.price) > 0 && Number.parseFloat(product.reduced_price) > 0 && savingsPercentage(product.price, product.reduced_price) > 0 && (
                        <div className="absolute top-3 right-3 bg-[#0096d9] text-white px-3 py-1 rounded-full font-bold text-sm">
                          -{savingsPercentage(product.price, product.reduced_price)}%
                        </div>
                      )}

                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-cyan-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0096d9] transition-colors text-sm sm:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">{product.brand}</p>

                      {/* Price - Hidden as requested */}

                      {/* Add to Cart Button */}
                      <Button className="w-full bg-gradient-to-r from-[#0096d9] to-blue-700 text-white hover:shadow-lg transition-all text-sm">
                        <ShoppingCart size={16} className="mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Showing {filteredProducts.length} products</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
