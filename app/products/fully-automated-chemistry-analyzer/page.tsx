import React from "react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Fully Automated Chemistry Analyzer — Accord Medical",
  description:
    "Discover our fully automated chemistry analyzer — high-throughput, reliable clinical chemistry testing for hospitals and labs. Request a quote or inquire via WhatsApp.",
  keywords: [
    "chemistry analyzer",
    "fully automated chemistry analyzer",
    "clinical chemistry",
    "laboratory equipment",
    "Accord Medical",
  ],
}

const whatsappNumber = "254729115000"
const whatsappMessage = encodeURIComponent(
  "Hello, I'm interested in the Fully Automated Chemistry Analyzer. Please provide a quotation and specifications."
)

const ProductLandingPage: React.FC = () => {
  const product = {
    name: "Fully Automated Chemistry Analyzer",
    description:
      "High-throughput, precision clinical chemistry analyzer for hospitals and diagnostic labs. Supports sample batching, advanced QC, and wide test menus for metabolic panels, enzymes, electrolytes and more.",
    image: "/productlist/chemistry-analyzer.jpg",
    brand: "Accord Medical",
    sku: "AM-FA-CA-1000",
    availability: "InStock",
    url: "https://accordmedical.co.ke/products/fully-automated-chemistry-analyzer",
    priceRange: "Contact us for pricing",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: product.url,
      price: undefined,
      priceCurrency: "KES",
      availability: `https://schema.org/${product.availability}`,
      seller: {
        "@type": "Organization",
        name: "Accord Medical",
      },
    },
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={600}
            className="rounded-lg object-contain w-full h-auto"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>

          <ul className="mb-6 list-disc pl-5 text-sm text-foreground">
            <li>High throughput — up to 200 tests/hour</li>
            <li>Automated QC and calibration routines</li>
            <li>Wide test menu: metabolic panels, enzymes, electrolytes</li>
            <li>Compact footprint with easy maintenance</li>
            <li>Optional middleware and LIS integration</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-primary text-white font-semibold shadow-md hover:scale-105 transition-transform"
              aria-label="Request Quotation via WhatsApp"
            >
              Request Quotation (WhatsApp)
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border text-foreground bg-transparent hover:bg-muted/50 transition-colors"
              aria-label="Contact Us for Inquiry"
            >
              Contact Us for Inquiry
            </Link>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            For demonstration and pricing, please contact our sales team. Technical datasheets are available on request.
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Why choose this analyzer?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/30">Reliable clinical accuracy with validated reagents</div>
              <div className="p-3 rounded-lg bg-muted/30">Minimal hands-on time and automated workflows</div>
              <div className="p-3 rounded-lg bg-muted/30">Robust after-sales support and spare parts</div>
              <div className="p-3 rounded-lg bg-muted/30">Connectivity: LIS/HIS integration options</div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/products/hematology-analyzer" className="rounded-lg p-4 neu-card hover:neu-hover">
            <div className="font-semibold">Automated Hematology Analyzer</div>
            <div className="text-xs text-muted-foreground">Reliable CBC testing for hospitals</div>
          </Link>
          <Link href="/products/benchtop-centrifuge" className="rounded-lg p-4 neu-card hover:neu-hover">
            <div className="font-semibold">Benchtop Centrifuge</div>
            <div className="text-xs text-muted-foreground">Essential sample preparation</div>
          </Link>
          <Link href="/products/coagulation-analyzer" className="rounded-lg p-4 neu-card hover:neu-hover">
            <div className="font-semibold">Coagulation Analyzer</div>
            <div className="text-xs text-muted-foreground">PT/INR and APTT testing</div>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductLandingPage
