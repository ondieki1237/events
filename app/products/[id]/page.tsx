"use client"

import { useState, useEffect } from "react"
import { fetchProduct } from "@/lib/api"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ShoppingCart, Heart, Share2, ChevronRight, Package, Award, Shield, Check } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

interface ProductDetail {
  id: string
  name: string
  price: string
  reduced_price: string | null
  category: string
  brand: string
  description: string
  featured: boolean
  in_stock: boolean
  images: { url: string; thumbnail: string }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(params.id as string)
        setProduct(data.data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <span className="text-muted-foreground">Loading product...</span>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <span className="text-muted-foreground">Product not found</span>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = product.reduced_price && product.price && Number.parseFloat(product.price) > 0 && Number.parseFloat(product.reduced_price) > 0
    ? Math.round(
        ((Number.parseFloat(product.price) - Number.parseFloat(product.reduced_price)) /
          Number.parseFloat(product.price)) *
          100,
      )
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Enhanced Hero Header */}
      <section className="relative bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 text-white py-8 sm:py-12 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 mb-4">
            <a href="/products" className="hover:text-cyan-400 transition">Products</a>
            <ChevronRight size={14} />
            <a href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-cyan-400 transition">
              {product.category}
            </a>
            <ChevronRight size={14} />
            <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>

          {/* Product Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
              >
                {product.name}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 bg-blue-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-500/30">
                  <Package size={14} />
                  {product.brand}
                </span>
                {product.featured && (
                  <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
                    <Award size={14} />
                    Featured
                  </span>
                )}
                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
                  <Shield size={14} />
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0096d9] to-cyan-500 text-white px-6 py-3 rounded-full font-black text-xl shadow-lg border-2 border-cyan-300"
              >
                <span className="text-3xl">-{discount}%</span>
                <span className="text-xs">OFF</span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb - Old (Removing) */}
      {/* <div className="bg-white border-b">...</div> */}

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                {product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage].url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
                        selectedImage === idx ? "border-[#0096d9]" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image.thumbnail || "/placeholder.svg"}
                        alt={`Variant ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 sm:space-y-6">
            {/* Price - Only show for Homecare category */}
            {product.category?.toLowerCase().includes('homecare') && (
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 p-4 sm:p-6">
                <div className="flex items-end gap-4">
                  {product.reduced_price && Number.parseFloat(product.reduced_price) > 0 && Number.parseFloat(product.reduced_price) < Number.parseFloat(product.price) ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sale Price</p>
                        <p className="text-2xl sm:text-4xl font-black text-[#0096d9]">
                          KES {Number.parseFloat(product.reduced_price).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-gray-600 line-through mb-1">
                          KES {Number.parseFloat(product.price).toLocaleString()}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-[#0096d9]">Save {discount}%</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Price</p>
                      <p className="text-2xl sm:text-4xl font-black text-gray-900">
                        KES {Number.parseFloat(product.price).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Price - Hidden as requested */}

            {/* Description */}
            <Card className="p-4 sm:p-6 bg-white">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package className="text-[#0096d9]" size={24} />
                Product Details
              </h3>
              <div 
                className="prose prose-sm sm:prose max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Card>

            {/* Stock Status */}
            <div
              className={`p-3 sm:p-4 rounded-lg ${product.in_stock ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <p
                className={`font-semibold text-sm sm:text-base ${product.in_stock ? "text-green-800" : "text-red-800"}`}
              >
                {product.in_stock ? "✓ In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-12 sm:w-16 text-center border-none focus:ring-0"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      reduced_price: product.reduced_price,
                      image: product.images[0]?.url || "",
                      brand: product.brand,
                    })
                  }
                  setAddedToCart(true)
                  setTimeout(() => setAddedToCart(false), 2000)
                }}
                className={`w-full transition-all py-4 sm:py-6 text-base sm:text-lg font-bold ${
                  addedToCart
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-[#0096d9] to-blue-700 hover:shadow-lg"
                }`}
                disabled={!product.in_stock}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} className="mr-2" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" /> Add {quantity} to Cart
                  </>
                )}
              </Button>

              {addedToCart && (
                <Link href="/cart">
                  <Button variant="outline" className="w-full border-2 border-[#0096d9] text-[#0096d9] hover:bg-blue-50">
                    View Cart <ChevronRight size={16} className="ml-2" />
                  </Button>
                </Link>
              )}

              <div className="flex gap-2 sm:gap-3">
                <Button variant="outline" className="flex-1 bg-transparent text-sm sm:text-base">
                  <Heart size={18} className="mr-2" /> Save
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent text-sm sm:text-base">
                  <Share2 size={18} className="mr-2" /> Share
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-gray-50 p-3 sm:p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SKU:</span>
                <span className="font-semibold text-gray-900">{product.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability:</span>
                <span className="font-semibold text-gray-900">{product.in_stock ? "In Stock" : "Out of Stock"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Brand:</span>
                <span className="font-semibold text-gray-900">{product.brand}</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
