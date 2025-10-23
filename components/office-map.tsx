// Lazy-loading OfficeMap to avoid loading Google iframe on every page load
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Building, MapIcon } from 'lucide-react'

const InnerMap = () => {
  const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.093985264338!2d36.82331331526088!3d-1.2867137999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11281105b595%3A0x388dcb0775342eb4!2sCommerce%20House%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske";

  const offices = [
    { id: 'nai', title: 'Commerce House (Nairobi)', address: 'Commerce House, 3rd floor, Room 308, Moi Avenue', icon: <Building className="h-5 w-5 text-primary" /> },
    { id: 'syok', title: 'Silver Business Centre (Syokimau)', address: 'Silver Business Centre Warehouse No.16, Carepack road, Syokimau', icon: <MapPin className="h-5 w-5 text-primary" /> },
    { id: 'eld', title: 'Aico Plaza (Eldoret)', address: 'Aico Plaza, 2nd Floor, Room 8 Opposite Eldoret Hospital, Eldoret', icon: <MapIcon className="h-5 w-5 text-primary" /> },
  ]

  return (
    <div className="w-full bg-background/80 py-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col">
            <h4 className="text-2xl font-bold mb-3 text-black">Our Offices</h4>
            <p className="text-sm text-muted-foreground mb-4">Visit any of our offices — we're happy to discuss your equipment needs.</p>

            <div className="w-full rounded-lg overflow-hidden shadow-md flex-1">
              <div className="w-full h-full min-h-[300px]">
                <iframe src={src} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0 w-full h-full" title="Accord Medical Offices - Commerce House, Nairobi" />
              </div>
            </div>
          </div>

          <aside className="flex items-center">
            <div className="w-full bg-white rounded-xl p-6 shadow-xl">
              <h5 className="text-lg font-bold mb-4 text-black">Office Locations</h5>
              <ul className="space-y-6 text-sm">
                {offices.map((o) => (
                  <li key={o.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">{o.icon}</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{o.title}</div>
                      <div className="text-muted-foreground text-xs mt-1">{o.address}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-xs text-muted-foreground"><strong>Note:</strong> For appointments or demonstrations, contact our sales team via WhatsApp: <a className="text-primary" href="https://wa.me/254729115000">+254 729 115000</a></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function OfficeMap() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      })
    }, { rootMargin: '200px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return <div ref={ref}>{visible ? <InnerMap /> : <div className="w-full py-8"><div className="max-w-6xl mx-auto px-4"><div className="h-64 rounded-lg bg-muted/20" /></div></div>}</div>
}
