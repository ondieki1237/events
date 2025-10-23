"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const departments = [
  {
    id: 1,
    name: "Laboratory Equipment",
    description: "Advanced diagnostic and testing equipment",
    icon: "🔬",
  },
  {
    id: 2,
    name: "Maternity Equipment",
    description: "Comprehensive maternal and neonatal care",
    icon: "👶",
  },
  {
    id: 3,
    name: "Diagnostic Products",
    description: "Essential diagnostic tools and supplies",
    icon: "🩺",
  },
  {
    id: 4,
    name: "Imaging Equipment",
    description: "Modern imaging and diagnostic technology",
    icon: "📊",
  },
  {
    id: 5,
    name: "Theatre & ICU Equipment",
    description: "Critical care and surgical equipment",
    icon: "🏥",
  },
  {
    id: 6,
    name: "Hospital Furniture",
    description: "Quality healthcare furniture solutions",
    icon: "🛏️",
  },
  {
    id: 7,
    name: "Renal Equipment",
    description: "Dialysis and kidney care equipment",
    icon: "💧",
  },
  {
    id: 8,
    name: "Dental Equipment",
    description: "Complete dental care solutions",
    icon: "🦷",
  },
  {
    id: 9,
    name: "Cold Chain",
    description: "Temperature-controlled storage",
    icon: "❄️",
  },
  {
    id: 10,
    name: "CSSD",
    description: "Central Sterile Services Department",
    icon: "🧪",
  },
  {
    id: 11,
    name: "Homecare Equipment",
    description: "Home healthcare and medical equipment",
    icon: "🏠",
  },
  {
    id: 12,
    name: "Medical Training Materials",
    description: "Educational tools and training equipment",
    icon: "📚",
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className={cn(
                "flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                isCategoriesOpen && "text-primary bg-muted/50"
              )}
              aria-label="Product Categories"
              aria-expanded={isCategoriesOpen}
            >
              <span>Categories</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isCategoriesOpen && "rotate-180"
                )} 
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-[720px] bg-background/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-6">
                  <div className="mb-4 pb-4 border-b border-border/30">
                    <h3 className="text-sm font-bold text-foreground mb-1">Product Categories</h3>
                    <p className="text-xs text-muted-foreground">Explore our range of medical equipment</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1">
                    {departments.map((dept) => (
                      <Link
                        key={dept.id}
                        href={`/department/${dept.id}`}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                          {dept.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 line-clamp-1">
                            {dept.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {dept.description}
                          </p>
                        </div>
                        <ChevronDown className="flex-shrink-0 w-4 h-4 text-muted-foreground -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/30">
                    <Link
                      href="/"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                    >
                      View all departments
                      <ChevronDown className="w-3 h-3 -rotate-90" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chemistry Analyzer link removed per request */}

          <Link 
            href="/blog" 
            className={cn(
              "text-muted-foreground hover:text-primary transition-all text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Blog"
          >
            Blog
          </Link>

          <Link 
            href="/jobs" 
            className={cn(
              "text-muted-foreground hover:text-primary transition-all text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Jobs"
          >
            Jobs
          </Link>

          <Link 
            href="/feedback" 
            className={cn(
              "text-muted-foreground hover:text-primary transition-all text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Provide Feedback"
          >
            Feedback
          </Link>
          <Button 
            asChild
            size="sm" 
            className="bg-gradient-to-r from-accent to-primary text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
              href="/blog" 
              className="text-muted-foreground hover:text-primary transition-neu text-sm font-medium px-3 py-2 rounded-lg hover:neu-card"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Blog"
            >
              Blog
            </Link>
              <Link 
              href="/jobs" 
              className="text-muted-foreground hover:text-primary transition-neu text-sm font-medium px-3 py-2 rounded-lg hover:neu-card"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Jobs"
            >
              Jobs
            </Link>
              {/* Chemistry Analyzer link removed from mobile menu */}
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