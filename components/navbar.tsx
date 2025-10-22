"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/accord_transparent_logo.png" alt="Accord Medical" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg text-foreground hidden sm:inline">Accord Medical</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/feedback" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Feedback
          </Link>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Visit Website
          </Button>
        </div>
      </div>
    </nav>
  )
}
