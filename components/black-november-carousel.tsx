"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import { fetchProducts } from "@/lib/api"
import { BLACK_NOVEMBER_PRODUCT_IDS } from "@/data/featured-products"

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

export default function BlackNovemberCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)

  // Fetch specific Black November products
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
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || products.length === 0) return

    const totalPages = Math.ceil(products.length / 12)
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Change page every 5 seconds

    return () => clearInterval(interval)
  }, [autoPlay, products.length])

  const totalPages = Math.ceil(products.length / 12)

  const next = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setAutoPlay(false)
  }

  const savingsPercentage = (original: string, reduced: string | null) => {
    if (!reduced) return 0
    const savings = ((Number.parseFloat(original) - Number.parseFloat(reduced)) / Number.parseFloat(original)) * 100
    return Math.round(savings)
  }

  if (loading) {
    return (
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-cyan-400 mb-3"></div>
          <p className="text-white font-semibold">Loading Black November Deals...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <Zap size={48} className="mx-auto mb-3 text-cyan-400" />
          <p className="text-xl font-bold">No Deals Available</p>
        </div>
      </div>
    )
  }

  // Get current page products (show 12 products per page in 4x3 grid)
  const startIdx = currentPage * 12
  const currentProducts = products.slice(startIdx, startIdx + 12)

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Main Carousel Container */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-6"
          >
            {/* 4x3 Product Grid */}
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">
              {currentProducts.map((product, index) => {
                return (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-cyan-400 transition-all duration-300 cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="absolute inset-0">
                        {product.images[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* 35% Off Badge for all Black November products */}
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-[#0096d9] to-cyan-500 text-white px-2 py-1 rounded-full font-black text-xs shadow-lg flex items-center gap-1 border border-cyan-300">
                        <Zap size={10} className="fill-white" />
                        -35%
                      </div>

                      {/* Product Info - Visible on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-white font-bold text-xs leading-tight line-clamp-2 mb-1">
                          {product.name}
                        </h4>
                        {/* Hide price for non-Homecare products */}
                        {product.category?.toLowerCase().includes('homecare') && (
                          <div className="flex items-center gap-2">
                            {product.reduced_price && Number.parseFloat(product.reduced_price) < Number.parseFloat(product.price) ? (
                              <>
                                <span className="text-cyan-400 font-black text-sm">
                                  KES {Number.parseFloat(product.reduced_price).toLocaleString()}
                                </span>
                                <span className="text-gray-400 line-through text-xs">
                                  {Number.parseFloat(product.price).toLocaleString()}
                                </span>
                              </>
                            ) : (
                              <span className="text-cyan-400 font-black text-sm">
                                KES {Number.parseFloat(product.price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Hover Icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <ExternalLink className="text-white" size={20} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Top Banner */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-center z-20">
          <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-cyan-400/50">
            <span className="font-bold text-sm flex items-center gap-2">
              <Zap className="text-cyan-400 fill-cyan-400" size={16} />
              Black November Deals
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 backdrop-blur-sm hover:bg-black/80 p-3 rounded-full transition border border-cyan-400/50 hover:border-cyan-400"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 backdrop-blur-sm hover:bg-black/80 p-3 rounded-full transition border border-cyan-400/50 hover:border-cyan-400"
            aria-label="Next page"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index)
                setAutoPlay(false)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? "bg-cyan-400 w-8 shadow-lg shadow-cyan-400/50" 
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom Info Banner */}
      <div className="absolute bottom-12 left-4 right-4 text-center z-20">
        <p className="text-white/80 text-xs font-medium">
          🔥 {products.length} Exclusive Black November Deals • Limited Time Only
        </p>
      </div>
    </div>
  )
}
