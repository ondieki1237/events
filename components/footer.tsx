import { Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Accord Medical</h3>
            <p className="text-sm opacity-80">
              Quality medical and laboratory equipment for healthcare facilities across East Africa.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-80">
              Email: info@accordmedical.co.ke
              <br />
              Phone: +254 729 115000
            </p>

            {/* Social Media Icons */}
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://accordmedical.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  accordmedical.co.ke
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/AccordMedKe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/AccordMedKe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter/X"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@accordmedicalke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="TikTok"
                  >
                    {/* Inline TikTok SVG (monochrome) */}
                    <svg className="h-5 w-5" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                      <path d="M170.7 40.3c-2.6-.4-5.1-.6-7.8-.6-6.1 0-11.9 1.2-17.3 3.4v68.5c0 27.8-22.6 50.4-50.4 50.4-27.8 0-50.4-22.6-50.4-50.4S67.4 61.2 95.2 61.2c6 0 11.8 1 17.2 2.8V41.6c-10.4-4.4-22.1-6.9-34.2-6.9C42 34.7 21 55.7 21 81.9c0 26.2 21 47.2 47.2 47.2 26.2 0 47.2-21 47.2-47.2V43.1c6.5-1.8 13.3-2.8 20.3-2.8 6.3 0 12.4 1 18.2 2.8v79.8c0 37.6-30.6 68.2-68.2 68.2S26 160.5 26 122.9 56.6 54.7 94.2 54.7c12.8 0 24.8 3.4 35.1 9.4V40.3h41.4v0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2025 Accord Medical Supplies Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
