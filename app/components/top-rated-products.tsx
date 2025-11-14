"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: string
  reduced_price: string | null
  brand: string
  featured: boolean
  images: { url: string; thumbnail: string }[]
}

interface TopRatedProductsProps {
  productIds?: number[]
}

export default function TopRatedProducts({ productIds }: TopRatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ limit: 6 })
        setProducts(data.data?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching top products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">Loading featured products...</div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-20 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Top <span className="text-[#0096d9]">Rated Products</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Customer favorites with exceptional discounts during Black November
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/products/${product.id}`}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
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

                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                        <Star size={14} fill="currentColor" /> Featured
                      </div>
                    )}

                    {product.reduced_price && product.price && Number.parseFloat(product.price) > 0 && Number.parseFloat(product.reduced_price) > 0 && (
                      <div className="absolute top-3 right-3 bg-[#0096d9] text-white px-3 py-1 rounded-full font-bold text-sm">
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

                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0096d9] transition-colors text-sm sm:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">{product.brand}</p>

                    {/* Price - Hidden as requested */}

                    <Button className="w-full bg-gradient-to-r from-[#0096d9] to-blue-700 text-white hover:shadow-lg transition-all text-sm">
                      <ShoppingCart size={16} className="mr-2" /> Add to Cart
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0096d9] to-blue-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-blue-600/50 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
            >
              View All Products →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
