import { Facebook, Twitter, Video } from 'lucide-react'

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
                    <Video className="h-5 w-5" />
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
