import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VIEWS_PATH = path.join(process.cwd(), 'data', 'product-views.json')

function readViews() {
  try {
    const raw = fs.readFileSync(VIEWS_PATH, 'utf-8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    return {}
  }
}

export async function GET(req: Request) {
  try {
    const views = readViews()
    // Convert to array and sort
    const list = Object.keys(views).map((id) => ({ id, views: Number(views[id] ?? 0) }))
    list.sort((a, b) => b.views - a.views)
    const top = list.slice(0, 6)

    // Optionally, attempt to enrich with the external products API (best-effort)
    const apiBase = process.env.NEXT_PUBLIC_PRODUCTS_API || 'https://events.codewithseth.co.ke/api/products'
    let enriched: any[] = []
    try {
      const res = await fetch(apiBase)
      if (res.ok) {
        const json = await res.json()
        const items = json?.data ?? json
        const flat: any[] = []
        if (Array.isArray(items) && items.length > 0 && items[0]?.products) {
          for (const cat of items) {
            if (Array.isArray(cat.products)) {
              for (const p of cat.products) flat.push({ ...p, _category: cat.name })
            }
          }
        } else if (Array.isArray(items)) {
          enriched = items
        }

        if (flat.length) enriched = flat
      }
    } catch (e) {
      // ignore enrichment failure
    }

    const result = top.map((t) => {
      const meta = (enriched || []).find((p: any) => String(p.id ?? p.ID) === String(t.id))
      return {
        id: t.id,
        views: t.views,
        name: meta?.name ?? meta?.product_name ?? null,
        image_url: meta?.image_url ?? meta?.image ?? meta?.guid ?? null,
        category: meta?._category ?? meta?.category ?? null
      }
    })

    return NextResponse.json({ data: result })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to compute top rated' }, { status: 500 })
  }
}
