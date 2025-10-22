"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-heading font-bold text-primary mb-4">404</h1>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
