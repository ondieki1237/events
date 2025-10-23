"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OfficeMap from "@/components/office-map"
import TopRatedProducts from './components/top-rated-products'

const departments = [
  {
    id: 1,
    name: "Laboratory Equipment",
    description: "Advanced diagnostic and testing equipment",
    icon: "🔬",
    image: "/productlist/laboratory.png",
    color: "from-blue-50 to-blue-100",
  },
  {
    id: 2,
    name: "Maternity Equipment",
    description: "Comprehensive maternal and neonatal care solutions",
    icon: "👶",
    image: "/productlist/maternity.jpeg",
    color: "from-pink-50 to-pink-100",
  },
  {
    id: 3,
    name: "Diagnostic Products",
    description: "Essential diagnostic tools and supplies",
    icon: "🩺",
    image: "/productlist/diagnostic.png",
    color: "from-purple-50 to-purple-100",
  },
  {
    id: 4,
    name: "Imaging Equipment",
    description: "Modern imaging and diagnostic technology",
    icon: "📊",
    image: "/productlist/imaging.png",
    color: "from-cyan-50 to-cyan-100",
  },
  {
    id: 5,
    name: "Theatre & Intensive Care Unit (ICU) Equipment",
    description: "Critical care and surgical equipment",
    icon: "🏥",
    image: "/productlist/theatre.png",
    color: "from-red-50 to-red-100",
  },
  {
    id: 6,
    name: "Hospital Furniture",
    description: "Quality healthcare furniture solutions",
    icon: "🛏️",
    image: "/productlist/furniture.jpeg",
    color: "from-green-50 to-green-100",
  },
  {
    id: 7,
    name: "Renal Equipment",
    description: "Dialysis and kidney care equipment",
    icon: "💧",
    image: "/productlist/renal.jpeg",
    color: "from-teal-50 to-teal-100",
  },
  {
    id: 8,
    name: "Dental Equipment",
    description: "Complete dental care solutions",
    icon: "🦷",
    image: "/productlist/dental.jpeg",
    color: "from-emerald-50 to-emerald-100",
  },
  {
    id: 9,
    name: "Cold Chain",
    description: "Temperature-controlled storage solutions",
    icon: "❄️",
    image: "/productlist/cold_chain.png",
    color: "from-sky-50 to-sky-100",
  },
  {
    id: 10,
    name: "CSSD",
    description: "Central Sterile Services Department equipment",
    icon: "🧪",
    image: "/productlist/cssd.jpeg",
    color: "from-violet-50 to-violet-100",
  },
  {
    id: 11,
    name: "Homecare Equipment",
    description: "Home healthcare and medical equipment",
    icon: "🏠",
    image: "/productlist/furniture.jpeg",
    color: "from-amber-50 to-amber-100",
  },
  {
    id: 12,
    name: "Medical Training Materials",
    description: "Educational tools and training equipment",
    icon: "📚",
    image: "/productlist/training.png",
    color: "from-orange-50 to-orange-100",
  },
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
                  Welcome to Accord Medical Expo
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                Premium Medical Equipment{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate">
                  Solutions
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance fade-in-up stagger-1">
              We are delighted to have you visit our booth at the Expo! Accord Medical is an accredited supplier of
              quality medical, laboratory, and hospital equipment serving healthcare facilities across East Africa.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-2">
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

      {/* Departments Grid */}
      <section id="departments" className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold mb-4 text-foreground">Our Departments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our range of innovative products across multiple departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, idx) => (
              <Link key={dept.id} href={`/department/${dept.id}`} className={`fade-in-up stagger-${(idx % 6) + 1}`}>
                <Card className="h-full transition-neu cursor-pointer border-0 overflow-hidden neu-card hover:neu-hover hover:scale-105 group">
                  <div className="h-56 bg-gradient-to-br from-muted/30 to-muted/50 relative overflow-hidden">
                    <Image 
                      src={dept.image} 
                      alt={dept.name}
                      fill
                      className="object-cover transition-smooth group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${dept.color} opacity-20 group-hover:opacity-10 transition-neu`} />
                    
                    {/* Icon badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg neu-card group-hover:scale-110 transition-smooth">
                      <span className="text-2xl">{dept.icon}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-neu">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{dept.description}</p>
                    <div className="flex items-center text-primary font-bold text-sm group-hover:gap-3 gap-2 transition-neu">
                      View Products
                      <span className="transition-smooth group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

  {/* Top Rated Products (most viewed/searched) */}
  <TopRatedProducts />

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
  <OfficeMap />

  <Footer />
    </div>
  )
}
