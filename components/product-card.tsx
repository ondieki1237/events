import * as React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Product = {
  id: number
  name: string
  description?: string
  image_url?: string
  price?: string | number
}

// Utility to strip HTML and convert lists to bullet points
function formatDescription(html?: string): string {
  if (!html) return ''
  
  // Remove HTML tags and convert to plain text
  let text = html
    .replace(/<h[1-6][^>]*>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<ul[^>]*>|<\/ul>/gi, '')
    .replace(/<ol[^>]*>|<\/ol>/gi, '')
    .replace(/<[^>]+>/g, '') // Remove remaining tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
  
  // Clean up excessive whitespace and newlines
  text = text
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+/gm, '')
  
  return text
}

export default function ProductCard({ product, selected, onToggle }: { product: Product; selected: boolean; onToggle: (id: number) => void }) {
  const src = product.image_url || (product as any).image || (product as any).guid || ''
  const cleanDescription = formatDescription(product.description)

  return (
    <Card className={`
      p-5 cursor-pointer overflow-hidden
      transition-neu
      ${selected ? 'neu-pressed border-2 border-primary/30' : 'neu-card hover:neu-hover hover:scale-[1.02]'}
      group
    `}>
      <div className="flex gap-5">
        <div className="w-32 h-32 rounded-xl overflow-hidden flex items-center justify-center neu-card group-hover:neu-hover transition-neu flex-shrink-0">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={product.name} className="w-full h-full object-cover transition-smooth group-hover:scale-110" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/80 to-muted/60">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                <rect width="24" height="24" rx="4" fill="#E5E7EB" />
                <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="#9CA3AF" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-neu line-clamp-2">
              {product.name}
            </h4>
            {cleanDescription && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-4 leading-relaxed whitespace-pre-line">
                {cleanDescription}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button 
              size="sm" 
              variant={selected ? 'secondary' : 'default'} 
              onClick={(e) => { e.stopPropagation(); onToggle(product.id) }}
              className={`
                transition-neu font-semibold
                ${selected 
                  ? 'neu-pressed bg-primary/20 text-primary hover:bg-primary/30' 
                  : 'neu-card hover:neu-hover hover:scale-105 bg-gradient-to-r from-accent to-primary text-white'
                }
              `}
            >
              {selected ? '✓ Selected' : 'Select'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
