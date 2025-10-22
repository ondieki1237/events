"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Interest {
  name: string
  email: string
  phone: string
  organization: string
  message: string
  dept: string
  products: string
  timestamp: string
}

interface Feedback {
  name: string
  email: string
  rating: string
  feedback: string
  timestamp: string
}

export default function AdminPage() {
  const [interests, setInterests] = useState<Interest[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [activeTab, setActiveTab] = useState<"interests" | "feedbacks">("interests")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const authorized = sessionStorage.getItem("adminAuthorized") === "true"
    setIsAuthorized(authorized)
    if (authorized) {
      loadData()
    }
  }, [])

  const loadData = () => {
    const storedInterests = JSON.parse(localStorage.getItem("interests") || "[]")
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]")
    setInterests(storedInterests)
    setFeedbacks(storedFeedbacks)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      sessionStorage.setItem("adminAuthorized", "true")
      setIsAuthorized(true)
      setError("")
      loadData()
    } else {
      setError("Invalid password")
    }
  }

  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + Number.parseInt(f.rating), 0) / feedbacks.length).toFixed(1)
      : "N/A"

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg text-foreground">Accord Medical Admin</h1>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem("adminAuthorized")
              setIsAuthorized(false)
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mb-8">Manage expo submissions and feedback</p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Interests</h3>
              <p className="text-3xl font-bold text-foreground">{interests.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Feedback</h3>
              <p className="text-3xl font-bold text-foreground">{feedbacks.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Rating</h3>
              <p className="text-3xl font-bold text-foreground">{avgRating}</p>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("interests")}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === "interests" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Interests ({interests.length})
            </button>
            <button
              onClick={() => setActiveTab("feedbacks")}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === "feedbacks" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Feedback ({feedbacks.length})
            </button>
          </div>

          {/* Interests Tab */}
          {activeTab === "interests" && (
            <div className="space-y-4">
              {interests.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No interests recorded yet</p>
                </Card>
              ) : (
                interests.map((interest, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-foreground">{interest.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{interest.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold text-foreground">{interest.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-semibold text-foreground">{interest.organization}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Message</p>
                        <p className="text-foreground">{interest.message || "No message"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="text-foreground">{new Date(interest.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedbacks" && (
            <div className="space-y-4">
              {feedbacks.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No feedback recorded yet</p>
                </Card>
              ) : (
                feedbacks.map((feedback, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-foreground">{feedback.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{feedback.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-semibold text-foreground">{feedback.rating} / 5</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="text-foreground">{new Date(feedback.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Feedback</p>
                        <p className="text-foreground">{feedback.feedback}</p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
