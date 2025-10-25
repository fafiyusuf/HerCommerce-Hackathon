import { Navigation } from "@/components/navigation"
import { TestimonialCard } from "@/components/testimonial-card"
import { testimonials } from "@/lib/testimonials"
import Link from "next/link"

export default function TestimonialsPage() {
  const couples = testimonials.filter(
    (t) => t.role.includes("Bride") || t.role.includes("Groom") || t.role.includes("Organizer"),
  )
  const vendors = testimonials.filter(
    (t) => !t.role.includes("Bride") && !t.role.includes("Groom") && !t.role.includes("Organizer"),
  )

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Success Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hear from couples and vendors who have made their wedding dreams come true with SergHub
          </p>
        </div>
      </section>

      {/* Couples Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">From Our Couples</h2>
            <p className="text-lg text-muted-foreground">
              Discover how couples have used SergHub to plan their perfect weddings
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {couples.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Testimonials */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">From Our Vendors</h2>
            <p className="text-lg text-muted-foreground">
              Learn how vendors are growing their businesses through SergHub
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our community of couples and vendors creating beautiful weddings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/search"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Browse Vendors
            </Link>
          </div>
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
