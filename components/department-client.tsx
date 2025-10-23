"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'

const departmentData: Record<
  number,
  { name: string; description: string; products: Array<{ id: number; name: string; description: string }> }
> = {
  1: {
    name: 'Laboratory Equipment',
    description: 'Advanced diagnostic and testing equipment for modern laboratories',
    products: [
      { id: 1, name: 'Automated Analyzer', description: 'High-throughput automated analysis system' },
      { id: 2, name: 'Centrifuge System', description: 'Precision centrifugation for sample preparation' },
      { id: 3, name: 'Microscope Station', description: 'Advanced digital microscopy solution' },
      { id: 4, name: 'Sample Processor', description: 'Automated sample handling and processing' },
    ],
  },
  2: {
    name: 'Surgical Instruments',
    description: 'Precision surgical tools and equipment for operating rooms',
    products: [
      { id: 1, name: 'Surgical Kit Set', description: 'Complete sterile surgical instrument set' },
      { id: 2, name: 'Electrosurgical Unit', description: 'Advanced electrosurgical cutting and coagulation' },
      { id: 3, name: 'Surgical Lights', description: 'High-intensity LED surgical lighting' },
      { id: 4, name: 'Instrument Sterilizer', description: 'Rapid steam sterilization system' },
    ],
  },
  3: {
    name: 'Imaging Systems',
    description: 'Modern imaging and diagnostic technology',
    products: [
      { id: 1, name: 'Digital X-Ray', description: 'High-resolution digital radiography system' },
      { id: 2, name: 'Ultrasound Machine', description: 'Portable ultrasound imaging system' },
      { id: 3, name: 'CT Scanner', description: 'Advanced computed tomography imaging' },
      { id: 4, name: 'PACS System', description: 'Picture archiving and communication system' },
    ],
  },
  4: {
    name: 'Dental Equipment',
    description: 'Complete dental care solutions',
    products: [
      { id: 1, name: 'Dental Chair', description: 'Ergonomic patient dental chair' },
      { id: 2, name: 'Intraoral Camera', description: 'High-definition intraoral imaging' },
      { id: 3, name: 'Dental Compressor', description: 'Oil-free dental air compressor' },
      { id: 4, name: 'Suction System', description: 'Powerful dental suction unit' },
    ],
  },
  5: {
    name: 'Patient Monitoring',
    description: 'Real-time patient monitoring systems',
    products: [
      { id: 1, name: 'Vital Signs Monitor', description: 'Multi-parameter patient monitor' },
      { id: 2, name: 'ECG Machine', description: '12-lead electrocardiograph system' },
      { id: 3, name: 'Pulse Oximeter', description: 'Non-invasive oxygen saturation monitor' },
      { id: 4, name: 'Blood Pressure Monitor', description: 'Automated blood pressure measurement' },
    ],
  },
  6: {
    name: 'Sterilization',
    description: 'Sterilization and infection control solutions',
    products: [
      { id: 1, name: 'Autoclave Sterilizer', description: 'High-pressure steam sterilization' },
      { id: 2, name: 'Dry Heat Sterilizer', description: 'Dry heat sterilization system' },
      { id: 3, name: 'Disinfection Cabinet', description: 'UV disinfection cabinet' },
      { id: 4, name: 'Waste Management', description: 'Medical waste disposal system' },
    ],
  },
}

export default function DepartmentClient({ deptId }: { deptId: number }) {
  const dept = departmentData[deptId]
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [categories, setCategories] = useState<Array<{ id?: number; name: string; products: any[] }>>([])
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)

      const apiBase = (process.env.NEXT_PUBLIC_PRODUCTS_API as string) || 'http://localhost:5000/api/products'

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
        if (preferredIndex > 0) {
          const [pref] = groups.splice(preferredIndex, 1)
          groups.unshift(pref)
        }

        setCategories(groups)
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

      <section className="bg-primary text-primary-foreground py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground mb-4 inline-block">
            ← Back to Departments
          </Link>
          <h1 className="text-4xl font-bold mb-2">{dept.name}</h1>
          <p className="text-lg opacity-90">{dept.description}</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Our Products</h2>

          {loading && <div>Loading products...</div>}
          {error && <div className="text-red-600">{error}</div>}

          <div className="mb-6">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full max-w-md px-3 py-2 rounded-md border border-border bg-background" />
          </div>

          {categories.map((group) => {
              const filtered = group.products.filter((p: any) => {
              const name = (p.name ?? p.product_name ?? p.post_title ?? '').toString().toLowerCase()
              const desc = (p.description ?? p.short_description ?? '').toString().toLowerCase()
              const q = query.trim().toLowerCase()
              if (!q) return true
              return name.includes(q) || desc.includes(q)
            })

            if (filtered.length === 0) return null

              const showAll = !!expandedGroups[group.name]
              const visible = showAll ? filtered : filtered.slice(0, 20)

              return (
                <section key={group.name} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">{group.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visible.map((p: any) => (
                      <div key={p.id ?? p.ID} onClick={() => handleProductSelect(Number(p.id ?? p.ID))}>
                        <ProductCard product={{ id: Number(p.id ?? p.ID), name: p.name ?? p.product_name ?? p.post_title, description: p.description ?? p.short_description ?? p.description, image_url: p.image_url ?? p.image ?? p.guid ?? null, price: p.price }} selected={selectedProducts.includes(Number(p.id ?? p.ID))} onToggle={(id) => handleProductSelect(id)} />
                      </div>
                    ))}
                  </div>

                  {!showAll && filtered.length > 20 && (
                    <div className="mt-4 text-center">
                      <button className="text-sm text-primary underline" onClick={() => setExpandedGroups((s) => ({ ...s, [group.name]: true }))}>
                        View more ({filtered.length - 20} more)
                      </button>
                    </div>
                  )}
                </section>
              )
          })}

            {/* Suggestions: pick up to 6 items from other groups */}
            {categories.length > 0 && (
              <section className="mt-12">
                <h3 className="text-2xl font-semibold mb-4">You might also be interested in</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(() => {
                    const suggestions: any[] = []
                    for (const g of categories) {
                      if (g.products && g.products.length) {
                        for (const p of g.products) {
                          // skip products already shown in the first group's main listing
                          if (suggestions.length >= 6) break
                          suggestions.push(p)
                        }
                      }
                      if (suggestions.length >= 6) break
                    }
                    return suggestions.slice(0, 6).map((p: any) => (
                      <div key={p.id ?? p.ID} onClick={() => handleProductSelect(Number(p.id ?? p.ID))}>
                        <ProductCard product={{ id: Number(p.id ?? p.ID), name: p.name ?? p.product_name ?? p.post_title, description: p.description ?? p.short_description ?? p.description, image_url: p.image_url ?? p.image ?? p.guid ?? null, price: p.price }} selected={selectedProducts.includes(Number(p.id ?? p.ID))} onToggle={(id) => handleProductSelect(id)} />
                      </div>
                    ))
                  })()}
                </div>
              </section>
            )}

            {selectedProducts.length > 0 && (
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p className="text-foreground mb-4">
                <strong>{selectedProducts.length}</strong> product{selectedProducts.length !== 1 ? 's' : ''} selected
              </p>
              <Link href={`/interest?dept=${deptId}&products=${selectedProducts.join(',')}`}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Express Interest in Selected Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
