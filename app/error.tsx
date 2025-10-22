"use client"

import Link from "next/link"
import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Something Went Wrong</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            Go Home
          </Link>
        </div>

        {error.digest && <p className="text-xs text-muted-foreground mt-6">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
