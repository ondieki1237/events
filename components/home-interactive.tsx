"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import TopRatedProducts from '@/app/components/top-rated-products'
import OfficeMap from '@/components/office-map'

export default function HomeInteractive() {
  return (
    <>
      <section className="relative pt-32 pb-40 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-background via-muted/20 to-background gradient-animate overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4 fade-in-up">
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 neu-card">
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome to Accord Medical Expo
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                Premium Medical Equipment{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate">
                  Solutions
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance fade-in-up stagger-1">
              We are delighted to have you visit our booth at the Expo! Accord Medical is an accredited supplier of
              quality medical, laboratory, and hospital equipment serving healthcare facilities across East Africa.
            </p>

            {/* Top Rated Products - fixed curated list */}
            <div className="pt-12 max-w-7xl mx-auto fade-in-up stagger-2">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Top Products</h2>
              <div>
                <TopRatedProducts count={6} />
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6 text-base neu-card hover:neu-hover transition-neu hover:scale-105"
                onClick={() => document.getElementById("departments")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Our Departments →
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold px-8 py-6 text-base neu-card hover:neu-hover transition-neu hover:scale-105 bg-background/50 backdrop-blur"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/interest"
                  link.click()
                }}
              >
                Express Interest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Products (most viewed/searched) */}
      <TopRatedProducts />

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-primary via-accent to-primary gradient-animate text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-5xl font-bold fade-in-up">Interested in Our Products?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-1">
            Let us know what catches your interest and we'll follow up with you after the expo
          </p>
          <div className="fade-in-up stagger-2">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg neu-card hover:neu-hover transition-neu hover:scale-105"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/interest"
                link.click()
              }}
            >
              Express Your Interest →
            </Button>
          </div>
        </div>
      </section>

      {/* Office locations — shown only on the Home page */}
      <OfficeMap />
    </>
  )
}
