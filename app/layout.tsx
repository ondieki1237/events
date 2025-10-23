import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Accord Medical Supplies Ltd - Medical Equipment & Supplies",
  description: "Accord Medical Supplies Ltd — leading supplier of medical equipment, laboratory and hospital supplies in Kenya. Explore imaging, diagnostic, ICU, and surgical equipment.",
  keywords: [
    'accord medical supplies ltd', 'accord medical supplies', 'medical equipment nairobi', 'medical supplies kenya', 'laboratory equipment', 'biochemistry analyzer', 'automated chemistry analyzer', 'medical equipment suppliers'
  ],
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Accord Medical Supplies Ltd',
    description: 'Quality medical equipment and supplies for hospitals, labs, and clinics in Kenya. Contact us for quotations and inquiries.',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {/* Organization + WebSite JSON-LD for SEO */}
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Accord Medical Supplies Ltd",
          "url": process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          "logo": process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/accord_transparent_logo.png` : '/accord_transparent_logo.png',
          "contactPoint": [{ "@type": "ContactPoint", "telephone": "+254729115000", "contactType": "customer service" }]
        }) }} />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
