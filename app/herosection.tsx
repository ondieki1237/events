import React from 'react';
import { Button } from './ui/button'; // Assuming Button component is imported from a UI library

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-blue-50/50 to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-teal-200/20 to-blue-200/20 rounded-full blur-3xl opacity-40 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-10">
          <div className="space-y-6 fade-in-up">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full border border-blue-200/30 shadow-sm">
              <span className="text-base font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Accord Medical Supplies
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
              Advanced Medical Equipment{' '}
              <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-balance fade-in-up stagger-1">
              Accord Medical Supplies is a trusted provider of high-quality medical, laboratory, and hospital equipment, serving healthcare facilities across East Africa with innovative and reliable solutions.
            </p>
          </div>

          {/* Product Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 fade-in-up stagger-2">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900">Diagnostic Equipment</h3>
              <p className="text-gray-600 mt-2">Ultrasound machines, X-ray systems, ECG monitors, and more for accurate diagnostics.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900">Laboratory Solutions</h3>
              <p className="text-gray-600 mt-2">Analyzers, microscopes, and lab consumables for precise testing and research.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900">Surgical Instruments</h3>
              <p className="text-gray-600 mt-2">High-quality tools and devices for operating rooms and surgical procedures.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900">Hospital Furniture</h3>
              <p className="text-gray-600 mt-2">Beds, stretchers, and ergonomic furniture designed for patient comfort.</p>
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-8 py-6 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Full Product Catalog →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-6 text-base bg-white/50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              onClick={() => window.location.href = "/contact"}
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        .stagger-1 { animation-delay: 0.2s; }
        .stagger-2 { animation-delay: 0.4s; }
        .stagger-3 { animation-delay: 0.6s; }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;