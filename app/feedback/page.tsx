"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    feedback: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store in localStorage for demo
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]")
    feedbacks.push({
      ...formData,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-green-900 mb-4">Thank You for Your Feedback!</h1>
              <p className="text-green-800 mb-6">
                We appreciate your valuable feedback and will use it to improve our services.
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
          <h1 className="text-4xl font-bold mb-2 text-foreground">Share Your Feedback</h1>
          <p className="text-muted-foreground mb-8">
            Help us improve by sharing your experience at the Accord Medical Expo
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  How would you rate your experience? *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="5">Excellent (5 stars)</option>
                  <option value="4">Good (4 stars)</option>
                  <option value="3">Average (3 stars)</option>
                  <option value="2">Poor (2 stars)</option>
                  <option value="1">Very Poor (1 star)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Feedback *</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Please share your thoughts and suggestions..."
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit Feedback
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
