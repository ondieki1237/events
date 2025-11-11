import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Fully Automated Chemistry Analyzer Price in Kenya | Accord Medical Supplies',
  description: 'Buy fully automated chemistry analyzers in Kenya. Get the best prices on automatic biochemistry analyzers, clinical chemistry analyzers & laboratory equipment. Contact Accord Medical Supplies Ltd, Nairobi for quotations.',
  keywords: [
    'fully automated chemistry analyzer',
    'fully automated chemistry analyzer price',
    'fully automatic biochemistry analyzer price',
    'automated clinical chemistry analyzer',
    'automatic biochemistry analyzer',
    'biochemistry analyzer',
    'clinical chemistry analyzer',
    'chemistry analyzer kenya',
    'laboratory equipment kenya',
    'accord medical supplies',
  ],
  openGraph: {
    title: 'Fully Automated Chemistry Analyzer - Best Prices in Kenya',
    description: 'Premium automated chemistry analyzers from leading manufacturers. ISO certified supplier in Nairobi, Kenya.',
  },
}

const WHATSAPP_NUMBER = "254729115000"

export default function ChemistryAnalyzerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-bold text-primary">Laboratory Equipment</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Fully Automated Chemistry Analyzer in Kenya
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get the best prices on fully automatic biochemistry analyzers from Accord Medical Supplies Ltd. 
                We supply premium automated clinical chemistry analyzers for hospitals, laboratories, and diagnostic centers across Kenya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6 text-base hover:scale-105 transition-all"
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hello! I'm interested in getting a quotation for Fully Automated Chemistry Analyzers. Please send me pricing and specifications."
                    )
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
                  }}
                >
                  Request Price Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold px-8 py-6 text-base"
                  asChild
                >
                  <Link href="/department/1">View All Lab Equipment</Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">Warranty Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">Installation Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-white shadow-2xl rounded-2xl">
                <div className="aspect-square relative bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-32 h-32 text-muted-foreground opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">Contact for Latest Pricing</h3>
                  <p className="text-sm text-muted-foreground">Multiple brands and models available</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Automated Chemistry Analyzers?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Premium quality analyzers from leading global manufacturers with comprehensive support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">High Throughput</h3>
              <p className="text-muted-foreground">Process up to 400+ tests per hour with our fully automated systems</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Accurate Results</h3>
              <p className="text-muted-foreground">Precision testing with minimal human error and quality control</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Cost Effective</h3>
              <p className="text-muted-foreground">Competitive pricing with flexible payment options available</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Full Support</h3>
              <p className="text-muted-foreground">Installation, training, maintenance, and technical support included</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Wide Test Menu</h3>
              <p className="text-muted-foreground">Comprehensive test panels including liver, kidney, lipid, and electrolyte profiles</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Data Management</h3>
              <p className="text-muted-foreground">Advanced software with LIS integration and cloud connectivity</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced features for modern laboratory requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Performance</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Throughput: 200-800 tests/hour</p>
                    <p className="text-sm text-muted-foreground">Depending on model and configuration</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Sample Volume: 2-20 μL</p>
                    <p className="text-sm text-muted-foreground">Minimal sample requirements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Reagent Positions: 40-120</p>
                    <p className="text-sm text-muted-foreground">With refrigeration system</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Sample Capacity: 50-200 positions</p>
                    <p className="text-sm text-muted-foreground">STAT and routine samples</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">ISE Module</p>
                    <p className="text-sm text-muted-foreground">Na, K, Cl electrolyte testing</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Auto Calibration</p>
                    <p className="text-sm text-muted-foreground">Automated calibration and QC</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Barcode Reader</p>
                    <p className="text-sm text-muted-foreground">Sample tracking and identification</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">LIS Integration</p>
                    <p className="text-sm text-muted-foreground">Seamless connectivity with hospital systems</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary via-accent to-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Get Your Price Quote Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Contact Accord Medical Supplies Ltd for competitive pricing on fully automated chemistry analyzers. 
            Available in Nairobi, Kenya with installation and training support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 text-lg shadow-xl"
              onClick={() => {
                const message = encodeURIComponent(
                  "Hello! I'm interested in getting a detailed quotation for Fully Automated Chemistry Analyzers including pricing, specifications, and installation details."
                )
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
              }}
            >
              Request Detailed Quote via WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 font-bold px-10 py-7 text-lg"
              asChild
            >
              <Link href="/interest">Submit Inquiry Form</Link>
            </Button>
          </div>
          <div className="pt-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-sm opacity-90">Available 24/7 on WhatsApp</p>
            </div>
            <p className="text-2xl font-bold">+254 729 115 000</p>
            <p className="text-sm opacity-75">Accord Medical Supplies Ltd, Nairobi, Kenya</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
