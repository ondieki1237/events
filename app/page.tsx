"use client"

import { useEffect } from "react"

export default function HomeRedirect() {
  useEffect(() => {
    // Replace current entry with the offers page on the new vercel app
    window.location.replace("https://black-phi-tawny.vercel.app/offers")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center">Redirecting to offers… If you are not redirected automatically, <a href="https://black-phi-tawny.vercel.app/offers" className="text-blue-600 underline">click here</a>.</p>
    </div>
  )
}
