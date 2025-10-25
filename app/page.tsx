"use client"

import { FeaturedVendorCard } from "@/components/featured-vendor-card"
import { Navigation } from "@/components/navigation"
import { TestimonialCard } from "@/components/testimonial-card"
import { getFeaturedVendors } from "@/lib/data"
import { testimonials } from "@/lib/testimonials"
import { ArrowRight, Languages, MapPin, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { useState } from "react"

export default function Home() {
  const featuredVendors = getFeaturedVendors()
  const displayTestimonials = testimonials.slice(0, 3)
  const [language, setLanguage] = useState<"en" | "am">("en")


  const heroContent = {
    en: {
      title: "Your Perfect Event Starts Here",
      description: "From ሰርግ (Wedding) • ብሪዳል (Bridal) • ሽመግልና (Engagement) • ቁስላ • የገነንየ • ቸግ (Henna Night) • Baby Shower • Gender Reveal • መልስ • ቅልቅል  • እደር  and more — find everything you need in one place!"
    },
    am: {
      title: "የእርስዎ ምርጥ ዝግጅት እዚህ ይጀምራል",
      description: "ለሰርግ • ለብሪዳል • ለሽመግልና • ለቁስላ የገነንየ ጨጊ • ለቤቢሻወር • ለጀንደር ሪቬል • ለመልስ ቀልቀል • ለእደር እና ሌሎችም — የሚፈልጉትን ሁሉ በአንድ ቦታ ያግኙ!"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/heroo.png)',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-pink-600/70 via-pink-400/40 to-transparent dark:from-black/80 dark:via-black/50 dark:to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "am" : "en")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors shadow-lg"
              >
                <Languages className="w-5 h-5" />
                {language === "en" ? "አማርኛ" : "English"}
              </button>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-black dark:text-white leading-tight text-balance drop-shadow-lg">
                {heroContent[language].title}
              </h1>
              <p className="text-lg text-black/90 dark:text-white/95 leading-relaxed drop-shadow-md font-medium">
                {heroContent[language].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/search"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center shadow-lg"
                >
                  Explore Vendors
                </Link>
                <Link
                  href="/signup?type=vendor"
                  className="px-8 py-3 bg-white/90 text-foreground border-2 border-white rounded-lg font-semibold hover:bg-white transition-colors text-center shadow-lg"
                >
                  For Vendors
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-full hidden md:block">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 dark:bg-black/20 dark:border-white/10 overflow-hidden">
                {/* Overlay - Pink for light mode, Dark pink for dark mode */}
                
                <Image
                  src="/logoo2.png"
                  alt="SergHub"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Why Choose SergHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make wedding planning simple, transparent, and stress-free
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Verified Vendors",
                description: "All vendors are carefully vetted and verified to ensure quality and reliability",
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                description: "Connect with vendors who know Ethiopia and understand your vision",
              },
              {
                icon: Sparkles,
                title: "Easy Booking",
                description: "Simple, transparent booking process with clear pricing and reviews",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Featured Vendors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our top-rated vendors who consistently deliver exceptional service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <FeaturedVendorCard key={vendor.id} {...vendor} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              View All Vendors
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Loved by Couples & Vendors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about their SergHub experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Read More Stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Are You a Vendor?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of vendors earning more through SergHub. Reach couples actively planning their weddings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?type=vendor"
              className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Become a Vendor
            </Link>
            <a
              href="mailto:vendors@serghub.et"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have found their perfect vendors on SergHub
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">SergHub</h3>
              <p className="text-muted-foreground text-sm">
                Making wedding planning easy and accessible for everyone in Ethiopia
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Couples</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/search" className="hover:text-primary transition-colors">
                    Browse Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="hover:text-primary transition-colors">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Vendors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/signup?type=vendor" className="hover:text-primary transition-colors">
                    Join Us
                  </Link>
                </li>
                <li>
                  <a href="mailto:vendors@serghub.et" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SergHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
