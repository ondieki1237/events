"use client"

import { useState, lazy, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { FEATURED_PRODUCT_IDS } from "@/data/featured-products"
import { 
  Microscope, 
  Baby, 
  Stethoscope, 
  ScanLine, 
  Activity, 
  Armchair, 
  Droplets, 
  Smile, 
  Refrigerator, 
  TestTube, 
  Home as HomeIcon, 
  "use client"

  import { useState, lazy, Suspense } from "react"
  import Link from "next/link"
  import Image from "next/image"
  import { Button } from "@/components/ui/button"
  import { Card } from "@/components/ui/card"
  import Navbar from "@/components/navbar"
  import Footer from "@/components/footer"
  import { FEATURED_PRODUCT_IDS } from "@/data/featured-products"
  import { 
    Microscope, 
    Baby, 
    Stethoscope, 
    ScanLine, 
    Activity, 
    Armchair, 
    Droplets, 
    Smile, 
    Refrigerator, 
    TestTube, 
    Home as HomeIcon, 
    BookOpen,
    ChevronLeft,
    ChevronRight
  } from "lucide-react"

  // Lazy load components that are below the fold
  const OfficeMap = lazy(() => import("@/components/office-map"))
  const TopRatedProducts = lazy(() => import('./components/top-rated-products'))

  const departments = [
    { id: 1, name: "Laboratory Equipment", description: "Advanced diagnostic and testing equipment", icon: Microscope, color: "from-blue-50 to-blue-100" },
    { id: 2, name: "Maternity Equipment", description: "Comprehensive maternal and neonatal care solutions", icon: Baby, color: "from-pink-50 to-pink-100" },
    { id: 3, name: "Diagnostic Products", description: "Essential diagnostic tools and supplies", icon: Stethoscope, color: "from-purple-50 to-purple-100" },
    { id: 4, name: "Imaging Equipment", description: "Modern imaging and diagnostic technology", icon: ScanLine, color: "from-cyan-50 to-cyan-100" },
    { id: 5, name: "Theatre & ICU Equipment", description: "Critical care and surgical equipment", icon: Activity, color: "from-red-50 to-red-100" },
    { id: 6, name: "Hospital Furniture", description: "Quality healthcare furniture solutions", icon: Armchair, color: "from-green-50 to-green-100" },
    { id: 7, name: "Renal Equipment", description: "Dialysis and kidney care equipment", icon: Droplets, color: "from-teal-50 to-teal-100" },
    { id: 8, name: "Dental Equipment", description: "Complete dental care solutions", icon: Smile, color: "from-emerald-50 to-emerald-100" },
    { id: 9, name: "Cold Chain", description: "Temperature-controlled storage solutions", icon: Refrigerator, color: "from-sky-50 to-sky-100" },
    { id: 10, name: "CSSD", description: "Central Sterile Services Department equipment", icon: TestTube, color: "from-violet-50 to-violet-100" },
    { id: 11, name: "Homecare Equipment", description: "Home healthcare and medical equipment", icon: HomeIcon, color: "from-amber-50 to-amber-100" },
    { id: 12, name: "Medical Training Materials", description: "Educational tools and training equipment", icon: BookOpen, color: "from-orange-50 to-orange-100" },
  ]

  // Sample product data for carousel (replace with real images/IDs)
  const carouselProducts = [
    { id: 1, name: "Ultrasound Machine Pro", price: "KSh 1,200,000", discount: "25% OFF", image: "/api/placeholder/400/500" },
    { id: 2, name: "Digital X-Ray System", price: "KSh 3,500,000", discount: "30% OFF", image: "/api/placeholder/400/500" },
    { id: 3, name: "ICU Ventilator Elite", price: "KSh 2,800,000", discount: "20% OFF", image: "/api/placeholder/400/500" },
    { id: 4, name: "Anesthesia Workstation", price: "KSh 1,900,000", discount: "35% OFF", image: "/api/placeholder/400/500" },
  ]

  export default function Home() {
    const [scrolled, setScrolled] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % carouselProducts.length)
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length)
    }

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* BLACK NOVEMBER HERO SECTION - INLINE STYLED */}
        <section style={{
          position: 'relative',
          padding: '120px 1rem 80px',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
          overflow: 'hidden',
          color: '#ffffff',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, #00aeef 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0.15,
            animation: 'pulse 4s infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, #ff0000 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0.15,
            animation: 'pulse 5s infinite reverse'
          }} />

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.15; }
              50% { transform: scale(1.2); opacity: 0.25; }
            }
          `}</style>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Left Side - Text Content */}
            <div style={{ padding: '2rem 0' }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 24px',
                background: 'linear-gradient(45deg, #ff0000, #cc0000)',
                borderRadius: '50px',
                marginBottom: '1.5rem',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Black November Sale
              </div>

              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: '900',
                lineHeight: '1.1',
                margin: '0 0 1.5rem',
                background: 'linear-gradient(to right, #ffffff, #00aeef, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                UP TO<br />
                <span style={{
                  background: 'linear-gradient(to right, #ff0000, #ff3333)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>70% OFF</span><br />
                MEDICAL EQUIPMENT
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: '#cccccc',
                marginBottom: '2rem',
                maxWidth: '500px',
                lineHeight: '1.6'
              }}>
                Exclusive Black November deals on premium medical, laboratory, and hospital equipment. Limited time only!
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '16px 32px',
                  background: '#ff0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => document.getElementById("departments")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Shop Now
                </button>

                <button style={{
                  padding: '16px 32px',
                  background: 'transparent',
                  color: '#00aeef',
                  border: '2px solid #00aeef',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#00aeef'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#00aeef'
                }}
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/interest"
                  link.click()
                }}
                >
                  Express Interest
                </button>
              </div>

              {/* Countdown Timer */}
              <div style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-block'
              }}>
                <p style={{ fontSize: '14px', color: '#00aeef', marginBottom: '8px', fontWeight: 'bold' }}>Sale Ends In</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['23', '15', '42', '18'].map((time, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        background: '#ff0000',
                        color: 'white',
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        {time}
                      </div>
                      <p style={{ fontSize: '12px', marginTop: '4px', color: '#888' }}>
                        {['Hours', 'Minutes', 'Seconds', ''][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Product Carousel */}
            <div style={{
              position: 'relative',
              height: '500px',
              overflow: 'hidden',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease',
                transform: `translateX(-${currentSlide * 100}%)`,
                height: '100%'
              }}>
                {carouselProducts.map((product) => (
                  <div key={product.id} style={{
                    minWidth: '100%',
                    height: '100%',
                    position: 'relative',
                    background: '#111'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#ff0000',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '50px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      zIndex: 10,
                      transform: 'rotate(12deg)'
                    }}>
                      {product.discount}
                    </div>

                    <div style={{
                      width: '100%',
                      height: '60%',
                      background: '#222',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `url(${product.image}) center/cover no-repeat`,
                        backgroundColor: '#333'
                      }} />
                    </div>

                    <div style={{
                      padding: '1.5rem',
                      background: '#111',
                      height: '40%'
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.5rem',
                        color: '#ffffff'
                      }}>
                        {product.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          fontSize: '1.8rem',
                          fontWeight: 'bold',
                          color: '#00aeef'
                        }}>
                          {product.price}
                        </span>
                        <span style={{
                          fontSize: '1.2rem',
                          color: '#888',
                          textDecoration: 'line-through'
                        }}>
                          KSh {(parseInt(product.price.replace(/[^0-9]/g, '')) * 1.4).toLocaleString()}
                        </span>
                      </div>
                      <button style={{
                        width: '100%',
                        padding: '12px',
                        background: '#00aeef',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
              }}>
                {carouselProducts.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === currentSlide ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === currentSlide ? '#00aeef' : '#666',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Grid - 6 per row, 2 rows */}
        <div className="pt-12 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 fade-in-up stagger-2">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Explore by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {departments.map((dept) => {
              const IconComponent = dept.icon
              return (
                <Link 
                  key={dept.id} 
                  href={`/department/${dept.id}`}
                  className="group"
                >
                  <div className="flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-background/80 backdrop-blur-sm border border-transparent transition-all duration-300 hover:border-[#008cf7] hover:shadow-lg cursor-pointer group-hover:scale-105">
                    <div className="mb-3 text-foreground/70 group-hover:text-[#008cf7] transition-colors duration-300">
                      <IconComponent size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground text-center leading-tight transition-colors duration-300">
                      {dept.name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Top Rated Products (most viewed/searched) */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading top products...</div>}>
          <TopRatedProducts productIds={FEATURED_PRODUCT_IDS.length > 0 ? FEATURED_PRODUCT_IDS : undefined} />
        </Suspense>

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary via-accent to-primary gradient-animate text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-5xl font-bold fade-in-up">Interested in Our Products?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-1">
              Let us know what catches your interest and we'll follow up with you after the expo
            </p>
            <div className="fade-in-up stagger-2">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg neu-card hover:neu-hover transition-neu hover:scale-105"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/interest"
                  link.click()
                }}
              >
                Express Your Interest →
              </Button>
            </div>
          </div>
        </section>

        {/* Office locations — shown only on the Home page */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading map...</div>}>
          <OfficeMap />
        </Suspense>

        <Footer />
      </div>
    )
  }