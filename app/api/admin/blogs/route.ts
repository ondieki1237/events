import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, date, excerpt, content } = body

    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const dir = path.join(process.cwd(), 'content', 'blog')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const filePath = path.join(dir, `${slug}.md`)
    const md = `---\ntitle: "${title}"\ndate: "${date || new Date().toISOString().slice(0,10)}"\nexcerpt: "${(excerpt || '').replace(/\"/g, '\\"')}"\n---\n\n${content}`

    fs.writeFileSync(filePath, md, 'utf8')

    return NextResponse.json({ ok: true, slug })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 })
  }
}
