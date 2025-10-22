"use client"

import { useAuth } from "@/lib/auth-context"
import { Menu, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground hidden sm:inline">SergHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="#vendors" className="text-foreground hover:text-primary transition-colors">
              Vendors
            </Link>
            <Link href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <User className="w-4 h-4" />
                Go to Profile
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-primary hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="#categories"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="#vendors"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Vendors
            </Link>
            <Link
              href="#testimonials"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#about"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="flex gap-2 pt-2">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex-1 px-4 py-2 text-center bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Go to Profile
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex-1 px-4 py-2 text-center text-primary hover:bg-secondary rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 px-4 py-2 text-center bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
