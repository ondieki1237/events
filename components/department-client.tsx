"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'

// Map department IDs to category names from the API
const departmentMapping: Record<number, { name: string; description: string }> = {
  1: {
    name: 'Laboratory Equipment',
    description: 'Advanced diagnostic and testing equipment for modern laboratories',
  },
  2: {
    name: 'Maternity Equipment',
    description: 'Comprehensive maternal and neonatal care solutions',
  },
  3: {
    name: 'Diagnostic Products',
    description: 'Essential diagnostic tools and supplies',
  },
  4: {
    name: 'Imaging Equipment',
    description: 'Modern imaging and diagnostic technology',
  },
  5: {
    name: 'Theatre & Intensive Care Unit (ICU) Equipment',
    description: 'Critical care and surgical equipment',
  },
  6: {
    name: 'Hospital Furniture',
    description: 'Quality healthcare furniture solutions',
  },
  7: {
    name: 'Renal Equipment',
    description: 'Dialysis and kidney care equipment',
  },
  8: {
    name: 'Dental Equipment',
    description: 'Complete dental care solutions',
  },
  9: {
    name: 'Cold Chain',
    description: 'Temperature-controlled storage solutions',
  },
  10: {
    name: 'CSSD',
    description: 'Central Sterile Services Department equipment',
  },
  11: {
    name: 'Homecare Equipment',
    description: 'Home healthcare and medical equipment',
  },
  12: {
    name: 'Medical Training Materials',
    description: 'Educational tools and training equipment',
  },
}

export default function DepartmentClient({ deptId }: { deptId: number }) {
  const dept = departmentMapping[deptId]
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [currentCategory, setCurrentCategory] = useState<{ id?: number; name: string; products: any[] } | null>(null)
  const [allCategories, setAllCategories] = useState<Array<{ id?: number; name: string; products: any[] }>>([])
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)

      const apiBase = (process.env.NEXT_PUBLIC_PRODUCTS_API as string) || 'https://events.codewithseth.co.ke/api/products'

      try {
        const res = await fetch(apiBase)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const items = (json?.data ?? json) as any

        if (!mounted) return

        let groups: Array<{ id?: number; name: string; products: any[] }> = []

        if (Array.isArray(items) && items.length > 0 && items[0] && items[0].products) {
          groups = items.map((g: any) => ({ id: g.id, name: g.name, products: g.products || [] }))
        } else if (Array.isArray(items)) {
          groups = [{ id: undefined, name: 'All Products', products: items }]
        } else {
          groups = [{ id: undefined, name: 'All Products', products: [] }]
        }

        const preferredIndex = groups.findIndex((g) => dept && g.name && g.name.toString().toLowerCase().includes(dept.name.toLowerCase()))
        
        // Store all categories for carousel
        setAllCategories(groups)
        
        // Set only the current department's category for main display
        if (preferredIndex >= 0) {
          setCurrentCategory(groups[preferredIndex])
        } else {
          setCurrentCategory(groups[0] || null)
        }
      } catch (err) {
        console.warn('Failed to fetch products, falling back to static list', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [deptId])

  if (!dept) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Department not found</h1>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleProductSelect = (productId: number) => {
    setSelectedProducts((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-gradient-to-r from-primary via-accent to-primary gradient-animate text-white py-16 px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/" className="text-white/90 hover:text-white mb-6 inline-flex items-center gap-2 transition-neu font-medium">
            <span>←</span> Back to Departments
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-3 fade-in-up">{dept.name}</h1>
          <p className="text-xl opacity-90 fade-in-up stagger-1">{dept.description}</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12 fade-in-up">
            <h2 className="text-4xl font-bold text-foreground">Our Products</h2>
            {selectedProducts.length > 0 && (
              <div className="px-4 py-2 bg-primary/10 rounded-full neu-card">
                <span className="text-sm font-bold text-primary">
                  {selectedProducts.length} selected
                </span>
              </div>
            )}
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="mt-4 text-muted-foreground">Loading products...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12 px-6 bg-destructive/10 rounded-xl neu-card">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}

          <div className="mb-8 fade-in-up stagger-1">
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search products..." 
              className="w-full max-w-md px-5 py-3 rounded-xl border-0 bg-background neu-card focus:neu-hover transition-neu text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>

          {currentCategory && (() => {
              const filtered = currentCategory.products.filter((p: any) => {
              const name = (p.name ?? p.product_name ?? p.post_title ?? '').toString().toLowerCase()
              const desc = (p.description ?? p.short_description ?? '').toString().toLowerCase()
              const q = query.trim().toLowerCase()
              if (!q) return true
              return name.includes(q) || desc.includes(q)
            })

            if (filtered.length === 0) return null

              const currentVisible = visibleCounts[currentCategory.name] || 10
              const visible = filtered.slice(0, currentVisible)
              const hasMore = filtered.length > currentVisible

              return (
                <section className="mb-12 fade-in-up">
                  <h3 className="text-3xl font-bold mb-6 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentCategory.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visible.map((p: any) => (
                      <div key={p.id ?? p.ID} onClick={() => handleProductSelect(Number(p.id ?? p.ID))}>
                        <ProductCard product={{ id: Number(p.id ?? p.ID), name: p.name ?? p.product_name ?? p.post_title, description: p.description ?? p.short_description ?? p.description, image_url: p.image_url ?? p.image ?? p.guid ?? null, price: p.price }} selected={selectedProducts.includes(Number(p.id ?? p.ID))} onToggle={(id) => handleProductSelect(id)} />
                      </div>
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-8 text-center">
                      <button 
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-bold neu-card hover:neu-hover transition-neu hover:scale-105"
                        onClick={() => setVisibleCounts((prev) => ({ ...prev, [currentCategory.name]: currentVisible + 6 }))}
                      >
                        View {Math.min(6, filtered.length - currentVisible)} more products →
                      </button>
                    </div>
                  )}
                </section>
              )
          })()}

          {/* Horizontal Carousel: Products from 3 random other departments */}
          {allCategories.length > 1 && (
            <section className="mt-16 pt-16 border-t border-border">
              <h3 className="text-3xl font-bold mb-8 text-center fade-in-up">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Explore Other Departments
                </span>
              </h3>
              <div className="overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-6 min-w-min">
                  {(() => {
                    // Get 3 random other departments
                    const otherDepartments = allCategories.filter((g: any) => g.name !== dept?.name)
                    const shuffled = otherDepartments.sort(() => 0.5 - Math.random())
                    const selectedDepts = shuffled.slice(0, 3)
                    
                    return selectedDepts.map((category: any, deptIdx: number) => {
                      // Get 4 random products from each department
                      const deptProducts = category.products.sort(() => 0.5 - Math.random()).slice(0, 4)
                      
                      return (
                        <div key={category.name} className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] fade-in-up">
                          <div className="neu-card rounded-2xl p-6 bg-background h-full">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-xl font-bold text-foreground">{category.name}</h4>
                              <Link href={`/department/${category.id}`}>
                                <Button size="sm" variant="outline" className="text-xs neu-card hover:neu-hover">
                                  View All →
                                </Button>
                              </Link>
                            </div>
                            <div className="space-y-4">
                              {deptProducts.map((p: any) => (
                                <div 
                                  key={p.id ?? p.ID} 
                                  className="flex gap-3 p-3 rounded-xl neu-card hover:neu-hover transition-neu cursor-pointer group"
                                  onClick={() => handleProductSelect(Number(p.id ?? p.ID))}
                                >
                                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                    {(p.image_url || p.image) ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img 
                                        src={p.image_url ?? p.image} 
                                        alt={p.name ?? p.product_name} 
                                        className="w-full h-full object-cover transition-smooth group-hover:scale-110" 
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-muted/80 to-muted/60 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
                                          <rect width="24" height="24" rx="4" fill="#E5E7EB" />
                                          <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="#9CA3AF" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-neu line-clamp-2 mb-1">
                                      {p.name ?? p.product_name ?? p.post_title}
                                    </h5>
                                    {(p.type ?? p.product_type) && (
                                      <p className="text-xs text-muted-foreground line-clamp-1">
                                        {p.type ?? p.product_type}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </section>
          )}            {selectedProducts.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl border border-primary/20 neu-card fade-in-up">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-foreground mb-2 text-lg">
                    <strong className="text-2xl text-primary">{selectedProducts.length}</strong> product{selectedProducts.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-muted-foreground">Ready to express interest in your selections</p>
                </div>
                <Link href={`/interest?dept=${deptId}&products=${selectedProducts.join(',')}`}>
                  <Button className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6 text-base neu-card hover:neu-hover transition-neu hover:scale-105">
                    Express Interest in Selected Products →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
