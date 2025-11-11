import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-geist',
})
const _geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-geist-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Accord Medical Supplies Ltd - Medical Equipment Suppliers in Kenya | Nairobi",
  description: "Leading medical equipment suppliers in Kenya. Accord Medical Supplies Ltd offers laboratory equipment, fully automated chemistry analyzers, hospital furniture, diagnostic equipment & medical supplies in Nairobi. ISO certified supplier with bulk medical supplies available.",
  keywords: [
    // High-intent branded searches
    'accord medical supplies ltd', 
    'accord medical supplies', 
    'accord medical',
    'accord healthcare kenya',
    'accord healthcare kenya ltd',
    // Location-based high-volume searches
    'medical equipment suppliers in kenya',
    'medical equipment suppliers in nairobi',
    'medical supplies nairobi',
    'medical supplies kenya',
    'hospital equipment in nairobi',
    'medical supplies nairobi cbd',
    // Product-specific searches
    'fully automated chemistry analyzer',
    'fully automated chemistry analyzer price',
    'biochemistry analyzer',
    'automatic biochemistry analyzer',
    'patient monitor',
    'laboratory equipment kenya',
    // Bulk & wholesale
    'bulk medical supplies',
    'bulk medical supplies near me',
    'wholesale medical supplies kenya',
    'medical supplies in bulk',
    // General medical supplies
    'medical equipment nairobi',
    'medical equipment kenya',
    'medical supplies',
    'hospital equipment',
    'laboratory equipment',
    'diagnostic equipment'
  ],
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Accord Medical Supplies Ltd - Top Medical Equipment Suppliers in Kenya',
    description: 'ISO certified medical equipment supplier in Nairobi, Kenya. Fully automated chemistry analyzers, laboratory equipment, hospital furniture & diagnostic supplies. Bulk orders available. Contact: +254 729 115 000',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Accord Medical Supplies Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accord Medical Supplies Ltd - Medical Equipment Suppliers Kenya',
    description: 'Leading supplier of medical equipment and laboratory supplies in Kenya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  verification: {
    google: 'google78ebecd1320c8fbf',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://events.codewithseth.co.ke" />
        <link rel="preconnect" href="https://events.codewithseth.co.ke" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased`}>
        {/* Organization + WebSite JSON-LD for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Accord Medical Supplies Ltd",
          "url": process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          "logo": process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/accord_transparent_logo.png` : '/accord_transparent_logo.png',
          "contactPoint": [{ "@type": "ContactPoint", "telephone": "+254729115000", "contactType": "customer service" }]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          "name": "Accord Medical Supplies Ltd",
          "potentialAction": { "@type": "SearchAction", "target": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/search?q={search_term_string}`, "query-input": "required name=search_term_string" }
        }) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
