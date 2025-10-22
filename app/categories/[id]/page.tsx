import { Navigation } from "@/components/navigation"
import { VendorCard } from "@/components/vendor-card"
import { categories, vendors } from "@/lib/data"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.id)
  const categoryVendors = vendors[params.id as keyof typeof vendors] || []

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{category.name}</h1>
              <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg text-muted-foreground">
              Showing {categoryVendors.length} verified vendors in {category.name.toLowerCase()}
            </p>
          </div>

          {categoryVendors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryVendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No vendors found in this category yet.</p>
            </div>
          )}
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
                  <a href="#" className="hover:text-primary transition-colors">
                    Browse Vendors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Vendors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Join Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Vendor Dashboard
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
