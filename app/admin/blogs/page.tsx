"use client"

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AdminBlogs() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Saving...')
    try {
      const res = await fetch('/api/admin/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, title, excerpt, content }) })
      const json = await res.json()
      if (json.ok) {
        setStatus('Saved: ' + json.slug)
        setSlug('')
        setTitle('')
        setExcerpt('')
        setContent('')
      } else {
        setStatus('Error: ' + (json.error || 'unknown'))
      }
    } catch (e) {
      setStatus('Save failed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold mb-4">Admin - Create Blog Post</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full px-3 py-2 rounded-lg border border-border/30" />
          </div>

          <div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">Save</button>
            {status && <span className="ml-4 text-sm text-muted-foreground">{status}</span>}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
