import { Navigation } from "@/components/navigation"
import { CheckCircle2, Shield, Sparkles, Target, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-linear-to-b from-secondary/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              About SergHub
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              SergHub is Ethiopia's leading wedding planning marketplace, connecting couples with 
              trusted vendors to create unforgettable celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Making Wedding Planning Simple & Stress-Free
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand that planning a wedding can be overwhelming. That's why we created SergHub 
                — a comprehensive platform where you can discover, compare, and connect with verified 
                wedding vendors all in one place.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to simplify the wedding planning process for Ethiopian couples by providing 
                easy access to quality vendors, transparent pricing, and a seamless booking experience.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
              <Image 
                src="/logoo2.png" 
                alt="SergHub - Seamless Event Planning" 
                width={400} 
                height={200}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20 bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan your perfect wedding, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">
                Verified Vendors
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse through our curated collection of trusted wedding vendors including makeup artists, 
                photographers, caterers, decorators, and more.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm border border-border space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">
                Easy Management
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Save your favorite vendors, compare options, and manage all your wedding service bookings 
                from your personalized dashboard.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm border border-border space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">
                Transparent Pricing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                View detailed pricing information, compare packages, and make informed decisions with 
                complete transparency on costs and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Why Choose SergHub?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to making your wedding planning journey smooth and enjoyable
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Local Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We focus exclusively on Ethiopian vendors who understand local traditions, customs, 
                  and what makes Ethiopian weddings special.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Verified Reviews
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Read authentic reviews from real couples to make confident decisions about your vendors.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  All-in-One Platform
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  From venues to photographers, caterers to decorators — find all your wedding needs 
                  without juggling multiple websites or apps.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Premium Features for Vendors
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vendors can showcase their work with featured listings, badges, and premium visibility 
                  to reach more couples planning their perfect day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Ready to Start Planning?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of couples who have found their perfect wedding vendors through SergHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/search"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Browse Vendors
            </a>
            <a
              href="/signup?type=vendor"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Join as Vendor
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
