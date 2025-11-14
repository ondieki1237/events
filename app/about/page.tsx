"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  Building2, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "Authorized Distributor",
      description: "Leading medical equipment brands"
    },
    {
      icon: TrendingUp,
      title: "Competitive Prices",
      description: "All medical equipment and supplies"
    },
    {
      icon: CheckCircle,
      title: "Fast Delivery",
      description: "Across Nairobi and Kenya"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Experienced technical team"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-950 via-red-950 to-gray-950 text-white py-20 sm:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-red-400/10 to-red-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full border-2 border-red-400 shadow-lg mb-6"
          >
            <span className="text-sm font-bold text-white">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            Your Trusted Medical Equipment{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Supplier in Kenya
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Leading the way in providing high-quality medical equipment and supplies to healthcare facilities across Nairobi and Kenya
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About Accord Medical Supplies Ltd
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Accord Medical Supplies Ltd is a leading medical equipment supplier in Nairobi, Kenya, specializing in providing high-quality hospital equipment, laboratory equipment, dental equipment, and medical supplies to healthcare facilities across the country. With years of experience in the medical equipment industry, we have established ourselves as a reliable partner for hospitals, clinics, diagnostic centers, and healthcare practitioners.
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-12">
              Comprehensive Medical Equipment Solutions
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We offer a wide range of medical equipment including x-ray machines, digital x-ray systems, portable DR x-ray machines, C-arm x-ray machines, blood gas analyzers, biochemistry analyzers, fully automated chemistry analyzers, dental chairs, dental x-ray units, hospital beds, operating tables, laboratory equipment, and much more. All our products meet international quality standards and come with comprehensive warranty and after-sales support.
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-12">
              Medical Supplies in Bulk - Competitive Prices
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Looking for medical supplies in bulk? We offer competitive prices on bulk orders of medical equipment and supplies. Whether you're setting up a new hospital, upgrading your clinic, or expanding your diagnostic center, our team can provide customized solutions that fit your budget and requirements. Contact us for special pricing on bulk orders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Why Choose <span className="text-red-600">Accord Medical?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-red-600" size={32} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Our Commitment to Excellence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Authorized distributor of leading medical equipment brands",
                "Competitive prices on all medical equipment and supplies",
                "Fast delivery across Nairobi and Kenya",
                "Professional installation and training services",
                "Comprehensive after-sales support and maintenance",
                "Genuine spare parts and accessories available",
                "Experienced technical support team",
                "Quality assurance and warranty on all products"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 px-4 md:px-8 bg-gradient-to-r from-gray-950 via-red-950 to-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Visit our showroom in Nairobi or contact us for inquiries, quotes, or to schedule a product demonstration. We're here to help you find the right medical equipment solutions for your healthcare facility.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <a
                href="https://wa.me/254729115000"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                <Phone size={20} />
                +254 729 115 000
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <Mail size={20} />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
