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

export default function ProductCard({ product, selected, onToggle }: { product: Product; selected: boolean; onToggle: (id: number) => void }) {
  const src = product.image_url || (product as any).image || (product as any).guid || ''

  return (
    <Card className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200">
      <div className="flex gap-4">
        <div className="w-28 h-28 bg-muted rounded-md overflow-hidden flex items-center justify-center">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/80 to-muted/60">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#E5E7EB" />
                <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="#9CA3AF" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-foreground">{product.name}</h4>
            {product.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{product.description}</p>}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium text-foreground">{product.price ? `Ksh ${product.price}` : ''}</div>
            <Button size="sm" variant={selected ? 'secondary' : 'default'} onClick={(e) => { e.stopPropagation(); onToggle(product.id) }}>
              {selected ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
