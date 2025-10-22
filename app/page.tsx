"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const departments = [
  {
    id: 1,
    name: "Laboratory Equipment",
    description: "Advanced diagnostic and testing equipment",
    icon: "🔬",
    color: "from-blue-50 to-blue-100",
  },
  {
    id: 2,
    name: "Surgical Instruments",
    description: "Precision surgical tools and equipment",
    icon: "🏥",
    color: "from-red-50 to-red-100",
  },
  {
    id: 3,
    name: "Imaging Systems",
    description: "Modern imaging and diagnostic technology",
    icon: "📊",
    color: "from-cyan-50 to-cyan-100",
  },
  {
    id: 4,
    name: "Dental Equipment",
    description: "Complete dental care solutions",
    icon: "🦷",
    color: "from-green-50 to-green-100",
  },
  {
    id: 5,
    name: "Patient Monitoring",
    description: "Real-time patient monitoring systems",
    icon: "❤️",
    color: "from-pink-50 to-pink-100",
  },
  {
    id: 6,
    name: "Maternity Equipment",
    description: "Comprehensive maternal and neonatal care solutions",
    icon: "👶",
    color: "from-purple-50 to-purple-100",
  },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-40 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-white via-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">Welcome to Accord Medical Expo</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                Premium Medical Equipment Solutions
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              We are delighted to have you visit our booth at the Expo! Accord Medical is an accredited supplier of
              quality medical, laboratory, and hospital equipment serving healthcare facilities across East Africa.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                onClick={() => document.getElementById("departments")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Our Departments
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8 bg-transparent"
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
      <section id="departments" className="py-20 px-4 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Our Departments</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Explore our range of innovative products across multiple departments
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link key={dept.id} href={`/department/${dept.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
                    <span className="text-6xl">{dept.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{dept.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{dept.description}</p>
                    <div className="flex items-center text-accent font-medium text-sm">
                      View Products
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Interested in Our Products?</h2>
          <p className="text-lg opacity-90">
            Let us know what catches your interest and we'll follow up with you after the expo
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => {
              const link = document.createElement("a")
              link.href = "/interest"
              link.click()
            }}
          >
            Express Your Interest
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
