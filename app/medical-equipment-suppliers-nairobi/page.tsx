import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Medical Equipment Suppliers in Nairobi | Accord Medical Supplies Ltd',
  description: 'Leading medical equipment suppliers in Nairobi, Kenya. Accord Medical Supplies Ltd offers hospital equipment, laboratory supplies, diagnostic tools & medical furniture in Nairobi CBD. ISO certified supplier with bulk orders available.',
  keywords: [
    'medical equipment suppliers in nairobi',
    'medical supplies nairobi',
    'medical supplies nairobi cbd',
    'hospital equipment in nairobi',
    'medical equipment nairobi',
    'laboratory equipment nairobi',
    'accord medical supplies nairobi',
    'medical suppliers nairobi',
  ],
  openGraph: {
    title: 'Medical Equipment Suppliers in Nairobi - Accord Medical Supplies',
    description: 'Premium medical equipment and supplies in Nairobi. ISO certified supplier serving hospitals and clinics across Kenya.',
  },
}

const WHATSAPP_NUMBER = "254729115000"

export default function NairobiSuppliersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-bold text-primary">📍 Nairobi, Kenya</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Medical Equipment Suppliers in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nairobi</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Accord Medical Supplies Ltd - Your trusted ISO certified medical equipment supplier in Nairobi. 
              We serve hospitals, clinics, laboratories, and healthcare facilities across Nairobi and Kenya with premium quality equipment and supplies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6"
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello! I'm looking for medical equipment supplies in Nairobi. Please send me your catalog and pricing."
                  )
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
                }}
              >
                Contact Us on WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold px-8 py-6"
                asChild
              >
                <Link href="/">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Accord Medical Supplies in Nairobi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Convenient Nairobi Location</h3>
              <p className="text-muted-foreground">Easily accessible location in Nairobi with fast delivery across the city and nationwide</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">ISO Certified Quality</h3>
              <p className="text-muted-foreground">All products meet international quality standards with full certification and warranty</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Competitive Pricing</h3>
              <p className="text-muted-foreground">Best prices in Nairobi with flexible payment options and bulk order discounts</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Medical Equipment & Supplies We Offer in Nairobi
            </h2>
            <p className="text-lg text-muted-foreground">Comprehensive range of medical equipment for all healthcare needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Laboratory Equipment', items: ['Chemistry Analyzers', 'Hematology Analyzers', 'Microscopes', 'Centrifuges'] },
              { title: 'Hospital Furniture', items: ['Patient Beds', 'Examination Tables', 'Wheelchairs', 'Medical Trolleys'] },
              { title: 'Diagnostic Equipment', items: ['Patient Monitors', 'ECG Machines', 'Ultrasound', 'X-Ray Machines'] },
              { title: 'Imaging Equipment', items: ['C-Arm Machines', 'Digital X-Ray', 'Portable Ultrasound', 'PACS Systems'] },
              { title: 'ICU & Theatre Equipment', items: ['Anesthesia Machines', 'Ventilators', 'Operating Tables', 'Surgical Lights'] },
              { title: 'Maternity Equipment', items: ['Delivery Beds', 'Infant Warmers', 'Fetal Monitors', 'Incubators'] },
            ].map((category, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white font-bold">
              <Link href="/">View Complete Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving Healthcare Facilities Across Nairobi
            </h2>
            <p className="text-lg text-muted-foreground">Fast delivery to all areas in Nairobi and beyond</p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {['Westlands', 'Kilimani', 'Parklands', 'Karen', 'Lavington', 'Upper Hill', 'Nairobi CBD', 'Kileleshwa', 'Kasarani', 'Embakasi', 'South B & C', 'Ruaka'].map((area, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-sm font-medium text-foreground">{area}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">And many more areas across Nairobi, Kiambu, and Machakos counties</p>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Get Medical Supplies in Nairobi Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Contact Accord Medical Supplies Ltd for same-day quotes and fast delivery across Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 text-lg"
              onClick={() => {
                const message = encodeURIComponent(
                  "Hello! I need medical equipment supplies in Nairobi. Please send me information about your products and pricing."
                )
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
              }}
            >
              WhatsApp: +254 729 115 000
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 font-bold px-10 py-7 text-lg"
              asChild
            >
              <Link href="/interest">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
