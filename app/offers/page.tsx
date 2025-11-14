"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search, ShoppingCart, Zap, Flame, Check } from "lucide-react"
import Link from "next/link"
import { fetchProducts } from "@/lib/api"
import { BLACK_NOVEMBER_PRODUCT_IDS } from "@/data/featured-products"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: string
  name: string
  price: string
  reduced_price: string | null
  category: string
  brand: string
  description: string
  featured: boolean
  images: { url: string; thumbnail: string }[]
}

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ limit: 500 })
        // Filter to only the specific Black November products
        // Convert both to numbers for comparison since API returns numeric IDs
        const blackNovemberProducts = (data.data || []).filter(
          (p: Product) => BLACK_NOVEMBER_PRODUCT_IDS.includes(Number(p.id))
        )
        
        // Sort by the order in BLACK_NOVEMBER_PRODUCT_IDS
        const sortedProducts = BLACK_NOVEMBER_PRODUCT_IDS
          .map(id => blackNovemberProducts.find((p: Product) => Number(p.id) === id))
          .filter((p): p is Product => p !== undefined)
        
        setProducts(sortedProducts)
        setFilteredProducts(sortedProducts)
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
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    if (sortBy === "featured") {
      // Keep the original order from BLACK_NOVEMBER_PRODUCT_IDS
      result = BLACK_NOVEMBER_PRODUCT_IDS
        .map(id => result.find(p => Number(p.id) === id))
        .filter((p): p is Product => p !== undefined)
    } else if (sortBy === "discount") {
      result.sort((a, b) => {
        const discountA = savingsPercentage(a.price, a.reduced_price)
        const discountB = savingsPercentage(b.price, b.reduced_price)
        return discountB - discountA // Highest discount first
      })
    } else if (sortBy === "price") {
      result.sort((a, b) => Number.parseFloat(a.reduced_price || a.price) - Number.parseFloat(b.reduced_price || b.price))
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number.parseFloat(b.reduced_price || b.price) - Number.parseFloat(a.reduced_price || a.price))
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(result)
  }, [products, searchTerm, sortBy])

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
      <section className="relative bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 text-white py-16 sm:py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#0096d9] to-cyan-500 rounded-full border-2 border-cyan-400 shadow-lg mb-6"
          >
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="animate-pulse" size={20} />
              Black November • Exclusive Deals
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
          >
            Black November <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Offers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl"
          >
            Exclusive deals on selected medical equipment. Premium quality at unbeatable prices!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center gap-4 text-cyan-300"
          >
            <Zap size={24} className="animate-pulse" />
            <span className="text-lg font-semibold">{filteredProducts.length} Exclusive Products Available</span>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Search */}
            <div className="sm:col-span-2 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9]"
            >
              <option value="featured">Featured Order</option>
              <option value="discount">Highest Discount</option>
              <option value="name">Name (A-Z)</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#0096d9]"></div>
            <p className="mt-4 text-gray-500 font-semibold">Loading amazing deals...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Flame size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 font-semibold">No deals found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => {
                const discount = savingsPercentage(product.price, product.reduced_price)
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Link href={`/products/${product.id}`}>
                      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-[#0096d9]">
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

                          {/* 35% Off Badge for all Black November products */}
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0096d9] to-cyan-500 text-white px-3 py-1.5 rounded-full font-black text-sm shadow-lg flex items-center gap-1 border-2 border-cyan-300">
                            <Zap size={14} className="fill-white" />
                            -35%
                          </div>

                          {/* Featured Badge */}
                          {product.featured && (
                            <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-xs">
                              ⭐ Featured
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-3 sm:p-4">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0096d9] transition-colors text-sm sm:text-base min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.brand}</p>

                          {/* Description */}
                          {product.description && (
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                              {stripHtml(product.description)}
                            </p>
                          )}

                          {/* Price - Hidden as requested */}

                          {/* Category Badge */}
                          <div className="mb-3">
                            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                              {product.category}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <Button
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                reduced_price: product.reduced_price,
                                image: product.images[0]?.url || "",
                                brand: product.brand,
                              })
                              setAddedToCart(product.id)
                              setTimeout(() => setAddedToCart(null), 2000)
                            }}
                            className={`w-full transition-all text-sm font-bold ${
                              addedToCart === product.id
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gradient-to-r from-[#0096d9] to-blue-700 hover:shadow-xl hover:scale-105"
                            }`}
                          >
                            {addedToCart === product.id ? (
                              <>
                                <Check size={16} className="mr-2" /> Added to Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={16} className="mr-2" /> Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Results Summary */}
            <div className="mt-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-white rounded-lg shadow-lg p-6 border-2 border-[#0096d9]"
              >
                <Flame className="mx-auto mb-3 text-[#0096d9]" size={40} />
                <p className="text-xl font-bold text-gray-900 mb-2">
                  {filteredProducts.length} Exclusive Deals
                </p>
                <p className="text-gray-600">Don't miss out on these limited-time offers!</p>
              </motion.div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}
