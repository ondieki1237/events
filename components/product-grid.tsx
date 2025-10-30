"use client"

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Product = {
  id: number
  name: string
  description?: string
  image_url?: string
  category?: string
  price?: string | number
  views?: number
}

type ViewMode = 'grid' | 'list' | 'compact'

interface ProductGridProps {
  products: Product[]
  selectedProducts: number[]
  onToggle: (id: number) => void
  viewMode?: ViewMode
  showCategory?: boolean
}

// Utility to strip HTML and convert lists to bullet points
function formatDescription(html?: string, maxLength?: number): string {
  if (!html) return ''
  
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
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
  
  text = text
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+/gm, '')
  
  if (maxLength && text.length > maxLength) {
    text = text.substring(0, maxLength) + '...'
  }
  
  return text
}

// Grid View Component
function GridViewProduct({ product, selected, onToggle, showCategory }: { 
  product: Product; 
  selected: boolean; 
  onToggle: (id: number) => void;
  showCategory?: boolean;
}) {
  const src = product.image_url || ''
  const cleanDescription = formatDescription(product.description, 180)

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <Card className={`
        overflow-hidden transition-neu group cursor-pointer h-full flex flex-col
        ${selected ? 'neu-pressed border-2 border-primary/40 ring-2 ring-primary/20' : 'neu-card hover:neu-hover hover:scale-[1.02]'}
      `}>
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-muted/30 to-muted/50 overflow-hidden">
        {src ? (
          <Image 
            src={src} 
            alt={product.name}
            fill
            className="object-cover transition-smooth group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/80 to-muted/60">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
              <rect width="24" height="24" rx="4" fill="currentColor" className="text-muted-foreground" />
              <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="currentColor" className="text-background" />
            </svg>
          </div>
        )}
        
        {/* Selected Badge */}
        {selected && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Selected
          </div>
        )}

        {/* Category Badge */}
        {showCategory && product.category && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-semibold">
              {product.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-neu line-clamp-2 leading-snug">
            {product.name}
          </h4>
          {cleanDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {cleanDescription}
            </p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            size="sm" 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(product.id) }}
            className={`
              w-full transition-neu font-semibold
              ${selected 
                ? 'neu-pressed bg-primary/20 text-primary hover:bg-primary/30' 
                : 'neu-card hover:neu-hover hover:scale-105 bg-gradient-to-r from-accent to-primary text-white'
              }
            `}
          >
            {selected ? (
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Selected
              </span>
            ) : (
              'Select Product'
            )}
          </Button>
        </div>
      </div>
    </Card>
    </Link>
  )
}

// List View Component
function ListViewProduct({ product, selected, onToggle, showCategory }: { 
  product: Product; 
  selected: boolean; 
  onToggle: (id: number) => void;
  showCategory?: boolean;
}) {
  const src = product.image_url || ''
  const cleanDescription = formatDescription(product.description, 250)

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className={`
        p-5 cursor-pointer overflow-hidden transition-neu
        ${selected ? 'neu-pressed border-2 border-primary/30' : 'neu-card hover:neu-hover hover:scale-[1.01]'}
        group
      `}>
      <div className="flex gap-5">
        {/* Image */}
        <div className="w-36 h-36 rounded-xl overflow-hidden flex items-center justify-center neu-card group-hover:neu-hover transition-neu flex-shrink-0 relative">
          {src ? (
            <Image 
              src={src} 
              alt={product.name}
              fill
              className="object-cover transition-smooth group-hover:scale-110"
              sizes="144px"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/80 to-muted/60">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                <rect width="24" height="24" rx="4" fill="currentColor" className="text-muted-foreground" />
                <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="currentColor" className="text-background" />
              </svg>
            </div>
          )}
          
          {selected && (
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-neu line-clamp-2 flex-1">
                {product.name}
              </h4>
              {showCategory && product.category && (
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {product.category}
                </Badge>
              )}
            </div>
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
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(product.id) }}
              className={`
                transition-neu font-semibold
                ${selected 
                  ? 'neu-pressed bg-primary/20 text-primary hover:bg-primary/30' 
                  : 'neu-card hover:neu-hover hover:scale-105 bg-gradient-to-r from-accent to-primary text-white'
                }
              `}
            >
              {selected ? '✓ Selected' : 'Select Product'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  )
}

// Compact View Component
function CompactViewProduct({ product, selected, onToggle, showCategory }: { 
  product: Product; 
  selected: boolean; 
  onToggle: (id: number) => void;
  showCategory?: boolean;
}) {
  const src = product.image_url || ''
  const cleanDescription = formatDescription(product.description, 120)

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className={`
        p-4 cursor-pointer overflow-hidden transition-neu
        ${selected ? 'neu-pressed border-2 border-primary/30 bg-primary/5' : 'neu-card hover:neu-hover hover:scale-[1.01]'}
        group
      `}>
      <div className="flex gap-4 items-center">
        {/* Compact Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 relative bg-gradient-to-br from-muted/30 to-muted/50">
          {src ? (
            <Image 
              src={src} 
              alt={product.name}
              fill
              className="object-cover transition-smooth group-hover:scale-110"
              sizes="80px"
              loading="lazy"
            />
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-40">
              <rect width="24" height="24" rx="4" fill="currentColor" className="text-muted-foreground" />
              <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="currentColor" className="text-background" />
            </svg>
          )}
          
          {selected && (
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          )}
        </div>

        {typeof product.views === 'number' && (
          <div className="absolute top-3 left-3 bg-white/90 text-sm px-3 py-1 rounded-full text-foreground font-semibold shadow-sm">
            👁️ {product.views}
          </div>
        )}
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-neu line-clamp-1 mb-1">
            {product.name}
          </h4>
          {cleanDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {cleanDescription}
            </p>
          )}
          {showCategory && product.category && (
            <Badge variant="outline" className="text-[10px] mt-2 px-2 py-0">
              {product.category}
            </Badge>
          )}
        </div>

        {/* Action */}
        <Button 
          size="sm" 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(product.id) }}
          className={`
            transition-neu font-semibold flex-shrink-0 text-xs px-4
            ${selected 
              ? 'neu-pressed bg-primary/20 text-primary hover:bg-primary/30' 
              : 'neu-card hover:neu-hover bg-gradient-to-r from-accent to-primary text-white'
            }
          `}
        >
          {selected ? '✓' : 'Select'}
        </Button>
      </div>
    </Card>
    </Link>
  )
}

// Main ProductGrid Component
export default function ProductGrid({ 
  products, 
  selectedProducts, 
  onToggle, 
  viewMode = 'grid',
  showCategory = false 
}: ProductGridProps) {
  
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ListViewProduct
            key={product.id}
            product={product}
            selected={selectedProducts.includes(product.id)}
            onToggle={onToggle}
            showCategory={showCategory}
          />
        ))}
      </div>
    )
  }

  if (viewMode === 'compact') {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <CompactViewProduct
            key={product.id}
            product={product}
            selected={selectedProducts.includes(product.id)}
            onToggle={onToggle}
            showCategory={showCategory}
          />
        ))}
      </div>
    )
  }

  // Default: Grid View
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <GridViewProduct
          key={product.id}
          product={product}
          selected={selectedProducts.includes(product.id)}
          onToggle={onToggle}
          showCategory={showCategory}
        />
      ))}
    </div>
  )
}
