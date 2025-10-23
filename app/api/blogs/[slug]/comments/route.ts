import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json')

function readComments() {
  try {
    if (!fs.existsSync(COMMENTS_FILE)) return {}
    const raw = fs.readFileSync(COMMENTS_FILE, 'utf8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    console.error('readComments error', e)
    return {}
  }
}

function writeComments(obj: any) {
  try {
    fs.mkdirSync(path.dirname(COMMENTS_FILE), { recursive: true })
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(obj, null, 2), 'utf8')
  } catch (e) {
    console.error('writeComments error', e)
  }
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const comments = readComments()
  return NextResponse.json(comments[slug] || [])
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()
    const { name, message } = body
    if (!name || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const comments = readComments()
    comments[slug] = comments[slug] || []
    comments[slug].push({ id: Date.now(), name, message, createdAt: new Date().toISOString() })
    writeComments(comments)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 })
  }
}
