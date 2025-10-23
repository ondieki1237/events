"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, MessageCircle, FileText, ExternalLink } from "lucide-react"

type Product = {
  id: number
  name: string
  description?: string
  image_url?: string
  category?: string
  price?: string | number
  specifications?: string
  features?: string[]
}

// WhatsApp number
const WHATSAPP_NUMBER = "254729115000"

// Utility to strip HTML and format description
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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all products from the API
        const apiBase = (process.env.NEXT_PUBLIC_PRODUCTS_API as string) || 'https://events.codewithseth.co.ke/api/products'
        const response = await fetch(apiBase)
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const json = await response.json()
        const items = (json?.data ?? json) as any

        // Find the product by ID from all categories
        let foundProduct = null
        if (Array.isArray(items) && items.length > 0 && items[0]?.products) {
          // Products are grouped by category
          for (const category of items) {
            if (category.products && Array.isArray(category.products)) {
              const product = category.products.find((p: any) => 
                (p.id?.toString() === productId || p.ID?.toString() === productId)
              )
              if (product) {
                foundProduct = {
                  id: Number(product.id ?? product.ID),
                  name: product.name ?? product.product_name ?? product.post_title,
                  description: product.description ?? product.short_description ?? product.product_description,
                  image_url: product.image_url ?? product.image ?? product.guid,
                  category: category.name,
                  price: product.price ?? product.product_price,
                  specifications: product.specifications,
                  features: product.features
                }
                break
              }
            }
          }
        } else if (Array.isArray(items)) {
          // Flat list of products
          const product = items.find((p: any) => 
            (p.id?.toString() === productId || p.ID?.toString() === productId)
          )
          if (product) {
            foundProduct = {
              id: Number(product.id ?? product.ID),
              name: product.name ?? product.product_name ?? product.post_title,
              description: product.description ?? product.short_description ?? product.product_description,
              image_url: product.image_url ?? product.image ?? product.guid,
              category: product.category,
              price: product.price ?? product.product_price,
              specifications: product.specifications,
              features: product.features
            }
          }
        }
        
        if (!foundProduct) {
          throw new Error('Product not found')
        }
        
        setProduct(foundProduct)
        
        // Find related products from the same category
        const related: Product[] = []
        if (Array.isArray(items) && items.length > 0 && items[0]?.products) {
          for (const category of items) {
            if (category.name === foundProduct.category && category.products) {
              const otherProducts = category.products
                .filter((p: any) => (p.id?.toString() !== productId && p.ID?.toString() !== productId))
                .slice(0, 4)
                .map((p: any) => ({
                  id: Number(p.id ?? p.ID),
                  name: p.name ?? p.product_name ?? p.post_title,
                  description: p.description ?? p.short_description ?? p.product_description,
                  image_url: p.image_url ?? p.image ?? p.guid,
                  category: category.name,
                  price: p.price ?? p.product_price,
                }))
              related.push(...otherProducts)
              break
            }
          }
        }
        setRelatedProducts(related)
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleRequestQuotation = () => {
    if (!product) return
    
    const message = encodeURIComponent(
      `Hello! I would like to request a quotation for:\n\n${product.name}\n\nPlease send me the details and pricing information.`
    )
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleContactInquiry = () => {
    if (!product) return
    
    const message = encodeURIComponent(
      `Hello! I have an inquiry about:\n\n${product.name}\n\nI would like more information about this product.`
    )
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading product details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
              <p className="text-muted-foreground">
                {error || "The product you're looking for doesn't exist or has been removed."}
              </p>
              <Button
                onClick={() => router.back()}
                className="mt-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const cleanDescription = formatDescription(product.description)
  const src = product.image_url || ''

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 hover:bg-muted/50 transition-all hover:scale-105 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="space-y-4 sticky top-32">
              <div className="rounded-2xl overflow-hidden bg-white shadow-2xl border border-border/50">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  {src ? (
                    <Image
                      src={src}
                      alt={product.name}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50">
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                        <rect width="24" height="24" rx="4" fill="currentColor" className="text-muted-foreground" />
                        <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="currentColor" className="text-background" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Info Badge */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 2v6h6M21.5 22v-6h-6" />
                    <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
                  </svg>
                  <span>High Quality</span>
                </div>
                <div className="w-px h-4 bg-border/50" />
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Verified Supplier</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {product.category && (
                <Badge variant="secondary" className="text-sm px-4 py-1.5 font-semibold">
                  {product.category}
                </Badge>
              )}
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                  {product.name}
                </h1>
              </div>

              {cleanDescription && (
                <Card className="p-6 bg-muted/30 border-0 neu-card">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Product Overview
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                      {cleanDescription}
                    </p>
                  </div>
                </Card>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  size="lg"
                  onClick={handleRequestQuotation}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-7 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Request Quotation
                  <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleContactInquiry}
                  className="w-full font-bold py-7 text-lg border-2 hover:bg-muted/50 transition-all hover:scale-[1.02] group"
                >
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Contact Us for Inquiry
                  <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-200/50 dark:border-green-800/50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="font-semibold text-green-700 dark:text-green-300">+254 729 115 000</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">Premium Quality</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 border border-green-200/50 dark:border-green-800/50">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-xs font-semibold text-green-900 dark:text-green-200">Certified</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 border border-purple-200/50 dark:border-purple-800/50">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-200">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Details Section */}
      {(product.specifications || product.features) && (
        <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-muted/20 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Technical Details
                </span>
              </h2>
              <p className="text-muted-foreground">Everything you need to know about this product</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specifications && (
                <Card className="p-8 neu-card border-0 hover:neu-hover transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Specifications</h3>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {formatDescription(product.specifications)}
                    </p>
                  </div>
                </Card>
              )}

              {product.features && product.features.length > 0 && (
                <Card className="p-8 neu-card border-0 hover:neu-hover transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Key Features</h3>
                  </div>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground group">
                        <div className="mt-0.5 p-1 bg-primary/10 rounded-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="flex-1 leading-relaxed group-hover:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  More from {product?.category}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore other products in this category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedSrc = relatedProduct.image_url || ''
                const relatedDescription = formatDescription(relatedProduct.description, 100)
                
                return (
                  <Card
                    key={relatedProduct.id}
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                    className="overflow-hidden cursor-pointer border-0 neu-card hover:neu-hover hover:scale-[1.02] transition-all group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-white">
                      {relatedSrc ? (
                        <Image
                          src={relatedSrc}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/30 to-muted/50">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="opacity-30">
                            <rect width="24" height="24" rx="4" fill="currentColor" className="text-muted-foreground" />
                            <path d="M7 14l3-4 2 3 3-4 3 5H7z" fill="currentColor" className="text-background" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 bg-background">
                      <h4 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {relatedProduct.name}
                      </h4>
                      {relatedDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {relatedDescription}
                        </p>
                      )}
                      <div className="mt-3 flex items-center text-sm font-semibold text-primary group-hover:gap-2 gap-1 transition-all">
                        View Details
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary via-accent to-primary gradient-animate text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-4">
            <MessageCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Get This Product?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Contact us via WhatsApp for pricing, availability, and delivery information. Our team is ready to assist you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              onClick={handleRequestQuotation}
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 text-lg shadow-2xl hover:shadow-xl transition-all hover:scale-105 group"
            >
              <FileText className="w-5 h-5 mr-2" />
              Request Quotation
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
            <Button
              size="lg"
              onClick={handleContactInquiry}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 font-bold px-10 py-7 text-lg backdrop-blur transition-all hover:scale-105 group"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </div>
          <div className="pt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-sm opacity-90">Available 24/7 on WhatsApp: <strong>+254 729 115 000</strong></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
