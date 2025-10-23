import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'product-views.json')

function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    return {}
  }
}

function writeData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = String(body?.id ?? body?.productId)
    if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 })

    const data = readData()
    const current = Number(data[id] ?? 0)
    data[id] = current + 1
    writeData(data)

    return NextResponse.json({ id, views: data[id] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to increment view' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  // Return the raw views map
  try {
    const data = readData()
    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read views' }, { status: 500 })
  }
}
