"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Header */}
      <section className="relative bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 text-white py-16 sm:py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
          >
            Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions about our medical equipment? We're here to help!
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0096d9]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">Mon-Fri 8:00 AM - 6:00 PM</p>
              <div className="space-y-2">
                <a href="tel:+254700672600" className="block text-[#0096d9] hover:underline font-semibold">
                  0700 672 600
                </a>
                <a href="tel:+254729115000" className="block text-[#0096d9] hover:underline font-semibold">
                  0729 115 000
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0096d9]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">We'll respond within 24 hours</p>
              <a href="mailto:sales@accordmedical.co.ke" className="text-[#0096d9] hover:underline font-semibold">
                sales@accordmedical.co.ke
              </a>
            </Card>
          </motion.div>

          {/* Visit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0096d9]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-3">3 Locations across Kenya</p>
              <p className="text-[#0096d9] font-semibold">Nairobi • Eldoret • Syokimau</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Locations */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 sm:p-8">
              <h2 className="text-2xl font-black mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
                      placeholder="0700 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quotation">Request Quotation</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096d9] focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0096d9] to-blue-700 text-white font-bold py-3 text-lg hover:shadow-xl transition-all"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 sm:p-8 h-full">
              <h2 className="text-2xl font-black mb-2">Our Offices</h2>
              <p className="text-gray-600 mb-6">Visit us at any of our locations across Kenya</p>

              <div className="space-y-6">
                {/* Nairobi Office */}
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Nairobi Office</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">
                        Commerce House, 3rd Floor, Room 308<br />
                        Moi Avenue<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eldoret Office */}
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Eldoret Office</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">
                        Aico Plaza, 2nd Floor, Room 8<br />
                        Opposite Eldoret Hospital<br />
                        Makasembo Road, Eldoret
                      </p>
                    </div>
                  </div>
                </div>

                {/* Syokimau Warehouse */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0096d9] to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Main Warehouse</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">
                        Silver Business Centre<br />
                        Warehouse No. 16, Carepack Road<br />
                        Syokimau, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <Clock className="text-[#0096d9]" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
