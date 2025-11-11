"use client"

import { useState, lazy, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  Microscope, 
  Baby, 
  Stethoscope, 
  ScanLine, 
  Activity, 
  Armchair, 
  Droplets, 
  Smile, 
  Refrigerator, 
  TestTube, 
  Home as HomeIcon, 
  BookOpen 
} from "lucide-react"

// Lazy load components that are below the fold
const OfficeMap = lazy(() => import("@/components/office-map"))
const TopRatedProducts = lazy(() => import('./components/top-rated-products'))

const departments = [
  { id: 1, name: "Laboratory Equipment", description: "Advanced diagnostic and testing equipment", icon: Microscope, color: "from-blue-50 to-blue-100" },
  { id: 2, name: "Maternity Equipment", description: "Comprehensive maternal and neonatal care solutions", icon: Baby, color: "from-pink-50 to-pink-100" },
  { id: 3, name: "Diagnostic Products", description: "Essential diagnostic tools and supplies", icon: Stethoscope, color: "from-purple-50 to-purple-100" },
  { id: 4, name: "Imaging Equipment", description: "Modern imaging and diagnostic technology", icon: ScanLine, color: "from-cyan-50 to-cyan-100" },
  { id: 5, name: "Theatre & ICU Equipment", description: "Critical care and surgical equipment", icon: Activity, color: "from-red-50 to-red-100" },
  { id: 6, name: "Hospital Furniture", description: "Quality healthcare furniture solutions", icon: Armchair, color: "from-green-50 to-green-100" },
  { id: 7, name: "Renal Equipment", description: "Dialysis and kidney care equipment", icon: Droplets, color: "from-teal-50 to-teal-100" },
  { id: 8, name: "Dental Equipment", description: "Complete dental care solutions", icon: Smile, color: "from-emerald-50 to-emerald-100" },
  { id: 9, name: "Cold Chain", description: "Temperature-controlled storage solutions", icon: Refrigerator, color: "from-sky-50 to-sky-100" },
  { id: 10, name: "CSSD", description: "Central Sterile Services Department equipment", icon: TestTube, color: "from-violet-50 to-violet-100" },
  { id: 11, name: "Homecare Equipment", description: "Home healthcare and medical equipment", icon: HomeIcon, color: "from-amber-50 to-amber-100" },
  { id: 12, name: "Medical Training Materials", description: "Educational tools and training equipment", icon: BookOpen, color: "from-orange-50 to-orange-100" },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-40 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-background via-muted/20 to-background gradient-animate overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4 fade-in-up">
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 neu-card">
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Leading Medical Equipment Suppliers in Kenya
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                Medical Equipment & Laboratory Supplies in{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate">
                  Nairobi, Kenya
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance fade-in-up stagger-1">
              Accord Medical Supplies Ltd - ISO certified supplier of medical equipment, fully automated chemistry analyzers, 
              hospital furniture, diagnostic equipment & bulk medical supplies. Serving hospitals, laboratories, and clinics across Kenya and East Africa.
            </p>
            
            {/* SEO-optimized trust badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground fade-in-up stagger-2">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-semibold">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span className="font-semibold">Bulk Orders Available</span>
              </div>
            </div>

            {/* Product Categories Grid - 6 per row, 2 rows */}
            <div className="pt-12 max-w-7xl mx-auto fade-in-up stagger-2">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Explore by category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {departments.map((dept) => {
                  const IconComponent = dept.icon
                  return (
                    <Link 
                      key={dept.id} 
                      href={`/department/${dept.id}`}
                      className="group"
                    >
                      <div className="flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-background/80 backdrop-blur-sm border border-transparent transition-all duration-300 hover:border-[#008cf7] hover:shadow-lg cursor-pointer group-hover:scale-105">
                        <div className="mb-3 text-foreground/70 group-hover:text-[#008cf7] transition-colors duration-300">
                          <IconComponent size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground text-center leading-tight transition-colors duration-300">
                          {dept.name}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6 text-base neu-card hover:neu-hover transition-neu hover:scale-105"
                onClick={() => document.getElementById("departments")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Our Departments →
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold px-8 py-6 text-base neu-card hover:neu-hover transition-neu hover:scale-105 bg-background/50 backdrop-blur"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/interest"
                  link.click()
                }}
              >
                Express Interest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Products (most viewed/searched) */}
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading top products...</div>}>
        <TopRatedProducts />
      </Suspense>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary via-accent to-primary gradient-animate text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-5xl font-bold fade-in-up">Interested in Our Products?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-1">
            Let us know what catches your interest and we'll follow up with you after the expo
          </p>
          <div className="fade-in-up stagger-2">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg neu-card hover:neu-hover transition-neu hover:scale-105"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/interest"
                link.click()
              }}
            >
              Express Your Interest →
            </Button>
          </div>
        </div>
      </section>

      {/* Office locations — shown only on the Home page */}
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading map...</div>}>
        <OfficeMap />
      </Suspense>

      <Footer />
    </div>
  )
}