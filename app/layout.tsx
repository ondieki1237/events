import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://accordmedical.co.ke'),
  title: "Accord Medical Supplies Ltd - Medical Equipment Suppliers in Nairobi Kenya | Hospital Equipment",
  description: "Leading medical equipment suppliers in Kenya. Accord Medical Supplies Ltd offers hospital equipment, laboratory equipment, dental equipment, x-ray machines, medical supplies in Nairobi. Black November deals available.",
  keywords: [
    "accord medical supplies ltd",
    "accord medical supplies",
    "medical equipment suppliers in nairobi",
    "hospital equipment in nairobi",
    "medical supplies in nairobi",
    "accord medical kenya",
    "medical supplies in bulk",
    "laboratory equipment kenya",
    "dental equipment suppliers kenya",
    "x ray machine price",
    "c arm machine",
    "blood gas analyzer",
    "biochemistry analyzer",
    "medical equipment suppliers in kenya",
    "accord healthcare kenya",
  ],
  authors: [{ name: "Accord Medical Supplies Ltd" }],
  creator: "Accord Medical Supplies Ltd",
  publisher: "Accord Medical Supplies Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://accordmedical.co.ke",
    siteName: "Accord Medical Supplies Ltd",
    title: "Accord Medical Supplies Ltd - Medical Equipment Suppliers in Nairobi Kenya",
    description: "Leading medical equipment suppliers in Kenya. Hospital equipment, laboratory equipment, medical supplies in Nairobi. Black November deals.",
    images: [
      {
        url: "/logoaccord.png",
        width: 1200,
        height: 630,
        alt: "Accord Medical Supplies Ltd Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accord Medical Supplies Ltd - Medical Equipment Suppliers Kenya",
    description: "Leading medical equipment suppliers in Nairobi Kenya. Hospital equipment, laboratory equipment, medical supplies.",
    images: ["/logoaccord.png"],
  },
  alternates: {
    canonical: "https://accordmedical.co.ke",
  },
  verification: {
    google: "your-google-verification-code", // Add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
