"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

const locations = [
  {
    id: 1,
    name: "Nairobi Office",
    address: "Commerce House, 3rd Floor, Room 308, Moi Avenue, Nairobi",
    phone: "0729 115 000",
    email: "info@accordmedical.co.ke",
    hours: "Mon - Fri: 8:00 AM - 6:00 PM",
  },
  {
    id: 2,
    name: "Eldoret Office",
    address: "Aico Plaza, 2nd Floor, Room 8, Opposite Eldoret Hospital, Makasembo Road, Eldoret",
    phone: "0700 672 600",
    email: "eldoret@accordmedical.co.ke",
    hours: "Mon - Fri: 8:00 AM - 6:00 PM",
  },
  {
    id: 3,
    name: "Main Warehouse",
    address: "Silver Business Centre, Warehouse No. 16, Carepack Road, Syokimau",
    phone: "0729 115 000",
    email: "sales@accordmedical.co.ke",
    hours: "Mon - Fri: 8:00 AM - 6:00 PM",
  },
]

export default function OfficeMap() {
  return (
    <section className="py-16 sm:py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Visit Our <span className="text-[#0096d9]">Office Locations</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Find us across Kenya to discuss your medical equipment needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent hover:border-[#0096d9]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center text-[#0096d9]">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-[#0096d9] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-semibold text-gray-900 text-sm leading-relaxed">{location.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={18} className="text-[#0096d9] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={`tel:+254${location.phone.split('/')[0].trim().replace(/\s/g, '')}`} className="font-semibold text-gray-900 hover:text-[#0096d9] transition text-sm">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={18} className="text-[#0096d9] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={`mailto:${location.email}`} className="font-semibold text-gray-900 hover:text-[#0096d9] transition text-sm break-all">
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock size={18} className="text-[#0096d9] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Hours</p>
                      <p className="font-semibold text-gray-900 text-sm">{location.hours}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Website Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-3">Visit our main website for more information</p>
          <a 
            href="https://accordmedical.co.ke" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0096d9] hover:text-blue-700 font-bold text-lg underline"
          >
            accordmedical.co.ke
          </a>
        </motion.div>
      </div>
    </section>
  )
}
