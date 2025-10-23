"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 neu-flat transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Accord Medical Home">
          <div className="w-10 h-10 rounded-xl neu-card flex items-center justify-center transition-neu group-hover:neu-hover group-hover:scale-105">
            <img src="/accord_transparent_logo.png" alt="Accord Medical Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline transition-neu group-hover:text-primary">
            Accord Medical
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/feedback" 
            className={cn(
              "text-muted-foreground hover:text-primary transition-neu text-sm font-medium px-3 py-2 rounded-lg hover:neu-card",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            )}
            aria-label="Provide Feedback"
          >
            Feedback
          </Link>
          <Button 
            asChild
            size="sm" 
            className="bg-gradient-to-r from-accent to-primary text-white font-medium neu-card hover:neu-hover transition-neu hover:scale-105"
          >
            <a 
              href="https://accordmedical.co.ke" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Accord Medical Website"
            >
              Visit Website
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:neu-card focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div 
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "opacity-100 max-h-64" : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/feedback" 
              className="text-muted-foreground hover:text-primary transition-neu text-sm font-medium px-3 py-2 rounded-lg hover:neu-card"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Provide Feedback"
            >
              Feedback
            </Link>
            <Button 
              asChild
              size="sm" 
              className="bg-gradient-to-r from-accent to-primary text-white font-medium neu-card hover:neu-hover transition-neu hover:scale-105 w-full"
            >
              <a 
                href="https://accordmedical.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Visit Accord Medical Website"
              >
                Visit Website
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}