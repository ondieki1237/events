import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const dir = path.join(process.cwd(), 'content', 'blog')
  const file = path.join(dir, `${slug}.md`)
  if (!fs.existsSync(file)) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </main>
        <Footer />
      </div>
    )
  }

  const raw = fs.readFileSync(file, 'utf8')
  const parsed = matter(raw)
  const html = marked(parsed.content)
  const meta = parsed.data as any

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title || slug,
    "datePublished": meta.date || new Date().toISOString(),
    "description": meta.excerpt || '',
    "author": { "@type": "Organization", "name": "Accord Medical Supplies Ltd" },
    "publisher": { "@type": "Organization", "name": "Accord Medical Supplies Ltd" }
  }
  const commentsScript = `
    (function(){
      async function loadComments(){
        try{
          const res = await fetch('/api/blogs/${slug}/comments')
          const comments = await res.json()
          const root = document.getElementById('comments-root')
          if(!root) return
          root.innerHTML = comments.map(function(c){
            return '<div class="p-3 rounded-md bg-muted/10 mb-2"><strong>' + (c.name) + '</strong><p>' + (c.message) + '</p><small class=\"text-muted-foreground\">' + (new Date(c.createdAt).toLocaleString()) + '</small></div>'
          }).join('')
        }catch(e){console.error(e)}
      }
      loadComments();

      document.addEventListener('click', function(e){
        var target = e.target || e.srcElement
        if(target && target.id === 'submit-comment'){
          (async function(){
            var form = document.getElementById('comment-form')
            var name = form.querySelector('input[name="name"]').value
            var message = form.querySelector('textarea[name="message"]').value
            if(!name || !message){ alert('Please fill both'); return }
            await fetch('/api/blogs/${slug}/comments', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: name, message: message}) })
            form.querySelector('input[name="name"]').value=''
            form.querySelector('textarea[name="message"]').value=''
            loadComments()
          })()
        }
      })
    })();
  `

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <h1 className="text-4xl font-bold mb-6">{meta.title || slug}</h1>
        <p className="text-sm text-muted-foreground mb-6">{meta.date}</p>
        <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: html }} />

        {/* Comments UI */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Comments</h3>
          <div id="comments-root" />
          <form id="comment-form" className="mt-4 space-y-3">
            <input name="name" placeholder="Your name" className="w-full px-4 py-2 rounded-lg border border-border/30" />
            <textarea name="message" placeholder="Your comment" className="w-full px-4 py-2 rounded-lg border border-border/30" />
            <button type="button" id="submit-comment" className="px-4 py-2 bg-primary text-white rounded-lg">Post comment</button>
          </form>
          <script dangerouslySetInnerHTML={{ __html: commentsScript }} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
