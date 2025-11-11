import { Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-background py-16 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 mt-6">
          <div className="fade-in-up">
            <h3 className="font-bold mb-4 text-xl">Accord Medical Supplies Ltd</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Leading ISO certified medical equipment supplier in Kenya. Quality laboratory, hospital, and diagnostic equipment serving healthcare facilities across East Africa.
            </p>
            <div className="space-y-2 text-sm opacity-80">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Nairobi, Kenya
              </p>
            </div>
          </div>
          
          <div className="fade-in-up stagger-1">
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <a href="/" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Home
                </a>
              </li>
              <li>
                <a href="/#departments" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Products & Categories
                </a>
              </li>
              <li>
                <a href="/fully-automated-chemistry-analyzer" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Chemistry Analyzers
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Blog & Resources
                </a>
              </li>
              <li>
                <a href="/interest" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Request Quote
                </a>
              </li>
              <li>
                <a href="https://accordmedical.co.ke" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Main Website
                </a>
              </li>
            </ul>
          </div>

          <div className="fade-in-up stagger-2">
            <h4 className="font-bold mb-4 text-lg">Product Categories</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <a href="/department/1" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Laboratory Equipment
                </a>
              </li>
              <li>
                <a href="/department/4" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Imaging Equipment
                </a>
              </li>
              <li>
                <a href="/department/5" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Theatre & ICU Equipment
                </a>
              </li>
              <li>
                <a href="/department/6" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Hospital Furniture
                </a>
              </li>
              <li>
                <a href="/department/2" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Maternity Equipment
                </a>
              </li>
              <li>
                <a href="/department/3" className="hover:opacity-100 hover:text-accent transition-neu inline-block hover:translate-x-1">
                  Diagnostic Products
                </a>
              </li>
            </ul>
          </div>
          <div className="fade-in-up stagger-3">
            <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-80">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@accordmedical.co.ke" className="hover:opacity-100 hover:text-accent transition-neu">
                  info@accordmedical.co.ke
                </a>
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+254729115000" className="hover:opacity-100 hover:text-accent transition-neu">
                  +254 729 115 000
                </a>
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <a href="https://accordmedical.co.ke" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-accent transition-neu">
                  accordmedical.co.ke
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-sm">Follow Us</h5>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/AccordMedKe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-neu hover:scale-110"
                  aria-label="Facebook - Accord Medical Kenya"
                  title="Follow us on Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://x.com/AccordMedKe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-neu hover:scale-110"
                  aria-label="Twitter/X - Accord Medical Kenya"
                  title="Follow us on X"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@accordmedicalke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-neu hover:scale-110"
                  aria-label="TikTok - Accord Medical Kenya"
                  title="Follow us on TikTok"
                >
                  <svg className="h-6 w-6" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M170.7 40.3c-2.6-.4-5.1-.6-7.8-.6-6.1 0-11.9 1.2-17.3 3.4v68.5c0 27.8-22.6 50.4-50.4 50.4-27.8 0-50.4-22.6-50.4-50.4S67.4 61.2 95.2 61.2c6 0 11.8 1 17.2 2.8V41.6c-10.4-4.4-22.1-6.9-34.2-6.9C42 34.7 21 55.7 21 81.9c0 26.2 21 47.2 47.2 47.2 26.2 0 47.2-21 47.2-47.2V43.1c6.5-1.8 13.3-2.8 20.3-2.8 6.3 0 12.4 1 18.2 2.8v79.8c0 37.6-30.6 68.2-68.2 68.2S26 160.5 26 122.9 56.6 54.7 94.2 54.7c12.8 0 24.8 3.4 35.1 9.4V40.3h41.4v0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 text-sm opacity-80">
              <h5 className="font-semibold mb-2">Business Hours</h5>
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-xs mt-2 opacity-60">24/7 WhatsApp Support Available</p>
            </div>
          </div>
        </div>
        
        {/* SEO Footer Links */}
        <div className="border-t border-background/20 pt-8 pb-4">
          <div className="text-xs opacity-60 text-center mb-4">
            <p className="mb-2">
              <strong>Medical Equipment Suppliers in Kenya:</strong> Laboratory Equipment | Hospital Furniture | Diagnostic Tools | 
              Imaging Equipment | ICU & Theatre Equipment | Chemistry Analyzers | Patient Monitors | Surgical Equipment
            </p>
            <p>
              Serving: Nairobi | Mombasa | Kisumu | Nakuru | Eldoret | Thika | Machakos | Kiambu | Nyeri | Meru | 
              Nairobi CBD | Westlands | Upper Hill | Karen | Lavington | Parklands
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm opacity-60">
          <p>&copy; 2025 Accord Medical Supplies Ltd. All rights reserved. | ISO Certified Medical Equipment Supplier in Kenya</p>
        </div>
      </div>
    </footer>
  )
}
