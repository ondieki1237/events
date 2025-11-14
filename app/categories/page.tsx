"use client"

import { useState, useEffect } from "react"
import { fetchCategories } from "@/lib/api"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Category {
  name: string
  slug: string
  count: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data.data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const colors = [
    "from-blue-500 to-blue-600",
    "from-pink-500 to-pink-600",
    "from-purple-500 to-purple-600",
    "from-cyan-500 to-cyan-600",
    "from-red-500 to-red-600",
    "from-green-500 to-green-600",
    "from-teal-500 to-teal-600",
    "from-emerald-500 to-emerald-600",
    "from-sky-500 to-sky-600",
    "from-violet-500 to-violet-600",
    "from-amber-500 to-amber-600",
    "from-orange-500 to-orange-600",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-4"
          >
            Shop by <span className="text-red-500">Category</span>
          </motion.h1>
          <p className="text-xl text-gray-300">Browse our complete range of medical departments</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                    <div className={`h-32 bg-gradient-to-br ${colors[index % colors.length]} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{category.count} products</p>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white group-hover:shadow-lg transition-all">
                        Browse <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
