import React from 'react'

type TopItem = {
  id: string
  views: number
  name?: string | null
  image_url?: string | null
  category?: string | null
}

let cache: { ts: number; data: TopItem[] } | null = null
const CACHE_TTL = 1000 * 60 * 2 // 2 minutes

async function fetchTopRated() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products/top-rated`)
    if (!res.ok) throw new Error('failed')
    const json = await res.json()
    const data = json?.data ?? []
    cache = { ts: Date.now(), data }
    return data as TopItem[]
  } catch (e) {
    return []
  }
}

export default async function Page() {
  const items = await fetchTopRated()

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Top Rated Products</h1>
        <p className="text-muted-foreground mb-8">Most viewed products on the site (updated every 2 minutes)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">No data available</div>
          )}
          {items.map((it) => (
            <a key={it.id} href={`/product/${it.id}`} className="block p-4 neu-card hover:neu-hover transition-all">
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 relative">
                  {it.image_url ? (
                    // Using plain img to avoid client-side Image restrictions in server component
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image_url} alt={it.name ?? ''} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{it.name ?? `Product ${it.id}`}</h3>
                  <p className="text-sm text-muted-foreground">{it.category ?? '—'}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Views</div>
                  <div className="text-xl font-bold">{it.views}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
