"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const departmentData: Record<
  number,
  { name: string; description: string; products: Array<{ id: number; name: string; description: string }> }
> = {
  1: {
    name: "Laboratory Equipment",
    description: "Advanced diagnostic and testing equipment for modern laboratories",
    products: [
      { id: 1, name: "Automated Analyzer", description: "High-throughput automated analysis system" },
      { id: 2, name: "Centrifuge System", description: "Precision centrifugation for sample preparation" },
      { id: 3, name: "Microscope Station", description: "Advanced digital microscopy solution" },
      { id: 4, name: "Sample Processor", description: "Automated sample handling and processing" },
    ],
  },
  2: {
    name: "Surgical Instruments",
    description: "Precision surgical tools and equipment for operating rooms",
    products: [
      { id: 1, name: "Surgical Kit Set", description: "Complete sterile surgical instrument set" },
      { id: 2, name: "Electrosurgical Unit", description: "Advanced electrosurgical cutting and coagulation" },
      { id: 3, name: "Surgical Lights", description: "High-intensity LED surgical lighting" },
      { id: 4, name: "Instrument Sterilizer", description: "Rapid steam sterilization system" },
    ],
  },
  3: {
    name: "Imaging Systems",
    description: "Modern imaging and diagnostic technology",
    products: [
      { id: 1, name: "Digital X-Ray", description: "High-resolution digital radiography system" },
      { id: 2, name: "Ultrasound Machine", description: "Portable ultrasound imaging system" },
      { id: 3, name: "CT Scanner", description: "Advanced computed tomography imaging" },
      { id: 4, name: "PACS System", description: "Picture archiving and communication system" },
    ],
  },
  4: {
    name: "Dental Equipment",
    description: "Complete dental care solutions",
    products: [
      { id: 1, name: "Dental Chair", description: "Ergonomic patient dental chair" },
      { id: 2, name: "Intraoral Camera", description: "High-definition intraoral imaging" },
      { id: 3, name: "Dental Compressor", description: "Oil-free dental air compressor" },
      { id: 4, name: "Suction System", description: "Powerful dental suction unit" },
    ],
  },
  5: {
    name: "Patient Monitoring",
    description: "Real-time patient monitoring systems",
    products: [
      { id: 1, name: "Vital Signs Monitor", description: "Multi-parameter patient monitor" },
      { id: 2, name: "ECG Machine", description: "12-lead electrocardiograph system" },
      { id: 3, name: "Pulse Oximeter", description: "Non-invasive oxygen saturation monitor" },
      { id: 4, name: "Blood Pressure Monitor", description: "Automated blood pressure measurement" },
    ],
  },
  6: {
    name: "Sterilization",
    description: "Sterilization and infection control solutions",
    products: [
      { id: 1, name: "Autoclave Sterilizer", description: "High-pressure steam sterilization" },
      { id: 2, name: "Dry Heat Sterilizer", description: "Dry heat sterilization system" },
      { id: 3, name: "Disinfection Cabinet", description: "UV disinfection cabinet" },
      { id: 4, name: "Waste Management", description: "Medical waste disposal system" },
    ],
  },
}

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const deptId = Number.parseInt(params.id)
  const dept = departmentData[deptId]
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [products, setProducts] = useState<Array<{ id: number; name: string; description?: string; image_url?: string }>>(dept?.products ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        // server returns { data: rows }
        const items = (json?.data ?? json) as any[]

        if (!mounted) return

        const mapped = items.map((r) => ({ id: Number(r.ID ?? r.id ?? r.ID), name: r.product_name ?? r.product_name ?? r.post_title ?? r.name, description: r.description ?? '', image_url: r.image_url ?? r.guid ?? r.image_url }))
        setProducts(mapped)
      } catch (err: any) {
        console.warn('Failed to fetch products, falling back to static list', err)
        setError('Failed to load products')
        // keep existing dept products as fallback
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
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground mb-4 inline-block">
            ← Back to Departments
          </Link>
          <h1 className="text-4xl font-bold mb-2">{dept.name}</h1>
          <p className="text-lg opacity-90">{dept.description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {loading && <div>Loading products...</div>}
            {error && <div className="text-red-600">{error}</div>}
            {!loading && products.length === 0 && <div>No products found</div>}
            {products.map((product) => (
              <Card
                key={product.id}
                className="p-6 cursor-pointer transition-all duration-300 border-2"
                onClick={() => handleProductSelect(product.id)}
                style={{
                  borderColor: selectedProducts.includes(product.id) ? "var(--accent)" : "var(--border)",
                  backgroundColor: selectedProducts.includes(product.id) ? "var(--accent)" : "transparent",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{
                        color: selectedProducts.includes(product.id) ? "var(--accent-foreground)" : "var(--foreground)",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        color: selectedProducts.includes(product.id)
                          ? "var(--accent-foreground)"
                          : "var(--muted-foreground)",
                      }}
                      className="text-sm"
                    >
                      {product.description}
                    </p>
                  </div>
                  <div
                    className="w-6 h-6 rounded border-2 ml-4 flex-shrink-0 flex items-center justify-center"
                    style={{
                      borderColor: selectedProducts.includes(product.id) ? "var(--accent-foreground)" : "var(--border)",
                      backgroundColor: selectedProducts.includes(product.id)
                        ? "var(--accent-foreground)"
                        : "transparent",
                    }}
                  >
                    {selectedProducts.includes(product.id) && <span style={{ color: "var(--accent)" }}>✓</span>}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p className="text-foreground mb-4">
                <strong>{selectedProducts.length}</strong> product{selectedProducts.length !== 1 ? "s" : ""} selected
              </p>
              <Link href={`/interest?dept=${deptId}&products=${selectedProducts.join(",")}`}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Express Interest in Selected Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
