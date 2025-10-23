import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Post = {
  slug: string
  title: string
  date?: string
  excerpt?: string
}

async function getPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const posts: Post[] = files.map((file) => {
    const full = path.join(dir, file)
    const raw = fs.readFileSync(full, 'utf8')
    const data = matter(raw).data as any
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || file.replace(/\.md$/, ''),
      date: data.date,
      excerpt: data.excerpt,
    }
  })
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  return posts
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Insights & Articles</h1>
          <p className="text-muted-foreground mt-2">Latest news, guides and industry insights from Accord Medical</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 bg-muted/10 rounded-2xl border border-border/30 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary">Read article →</Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
