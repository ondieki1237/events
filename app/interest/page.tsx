"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

function InterestFormContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store in localStorage for demo
    const interests = JSON.parse(localStorage.getItem("interests") || "[]")
    interests.push({
      ...formData,
      dept: searchParams.get("dept"),
      products: searchParams.get("products"),
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("interests", JSON.stringify(interests))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-green-900 mb-4">Thank You!</h1>
              <p className="text-green-800 mb-6">
                Your interest has been recorded. We'll follow up with you after the expo with more information about the
                products you selected.
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Home</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Express Your Interest</h1>
          <p className="text-muted-foreground mb-8">Tell us more about your interest in our products</p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+254 (0) 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organization *</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tell us more about your needs..."
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit Interest
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function InterestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterestFormContent />
    </Suspense>
  )
}
