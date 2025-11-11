"use client"
import Link from 'next/link'

export default function BlackHero() {
  return (
    <section className="relative pt-24 pb-28 px-4 md:px-8 lg:px-12 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
          <span className="text-sm font-bold text-black">Black November Specials</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Black November — Exclusive Expo Offers</h1>
        <p className="text-lg md:text-xl text-yellow-200 max-w-3xl mx-auto mb-8">
          Limited-time discounts on selected medical equipment. Contact us to claim showroom-only prices and extended warranties during Black November.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/products/fully-automated-chemistry-analyzer" className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:opacity-95">Shop Deals</Link>
          <Link href="/interest" className="inline-block border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg">Express Interest</Link>
        </div>

        <div className="mt-8 text-sm text-yellow-100 opacity-90">Offers valid while stocks last. Financing options available for qualifying institutions.</div>
      </div>
    </section>
  )
}
