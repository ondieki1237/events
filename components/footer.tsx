"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-950 to-gray-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/logoaccord.png" 
                alt="Accord Medical Equipment" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Leading provider of medical equipment and healthcare solutions across Kenya.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-400">
                <Globe size={16} className="text-[#0096d9] mt-1 flex-shrink-0" />
                <a href="https://accordmedical.co.ke" target="_blank" rel="noopener noreferrer" className="hover:text-[#0096d9] transition">
                  accordmedical.co.ke
                </a>
              </div>
              <div className="flex items-start gap-2 text-gray-400">
                <Mail size={16} className="text-[#0096d9] mt-1 flex-shrink-0" />
                <a href="mailto:sales@accordmedical.co.ke" className="hover:text-[#0096d9] transition">
                  sales@accordmedical.co.ke
                </a>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-[#0096d9] transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#0096d9] transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#0096d9] transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#0096d9] transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#0096d9] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#0096d9] transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#0096d9] transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#0096d9] transition">
                  Black November Offers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0096d9] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Locations */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4">Our Locations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              {/* Nairobi Office */}
              <div>
                <h5 className="font-semibold text-[#0096d9] mb-2">Nairobi</h5>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin size={16} className="text-[#0096d9] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    Commerce House, 3rd floor, Room 308, Moi Avenue, Nairobi
                  </p>
                </div>
              </div>

              {/* Eldoret Office */}
              <div>
                <h5 className="font-semibold text-[#0096d9] mb-2">Eldoret</h5>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin size={16} className="text-[#0096d9] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    Aico Plaza, 2nd Floor, Room 8, Opposite Eldoret Hospital, Makasembo Road
                  </p>
                </div>
              </div>

              {/* Syokimau Warehouse */}
              <div>
                <h5 className="font-semibold text-[#0096d9] mb-2">Warehouse</h5>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin size={16} className="text-[#0096d9] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    Silver Business Centre, Warehouse No.16, Carepack Road, Syokimau
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Numbers */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h5 className="font-semibold mb-3">Call Us</h5>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="tel:+254700672600" className="flex items-center gap-2 text-gray-400 hover:text-[#0096d9] transition">
                  <Phone size={16} className="text-[#0096d9]" />
                  <span>0700 672 600</span>
                </a>
                <a href="tel:+254729115000" className="flex items-center gap-2 text-gray-400 hover:text-[#0096d9] transition">
                  <Phone size={16} className="text-[#0096d9]" />
                  <span>0729 115 000</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Accord Medical Equipment Ltd. All rights reserved. | Black November Sale</p>
        </div>
      </div>
    </footer>
  )
}
