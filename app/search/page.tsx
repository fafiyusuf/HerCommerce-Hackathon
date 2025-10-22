"use client"

import { Navigation } from "@/components/navigation"
import { VendorCard } from "@/components/vendor-card"
import { categories, vendors } from "@/lib/data"
import { Filter, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const allVendors = Object.values(vendors).flat()

  const filteredVendors = useMemo(() => {
    let results = allVendors

    // Apply search
    if (searchQuery) {
      results = results.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((vendor) => vendor.category === selectedCategory)
    }

    // Apply rating filter
    if (minRating > 0) {
      results = results.filter((vendor) => vendor.rating >= minRating)
    }

    return results
  }, [searchQuery, selectedCategory, minRating])

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const total = filteredVendors.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredVendors.slice(start, start + pageSize)
  }, [filteredVendors, page, pageSize])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Search Header */}
      <section className="bg-secondary py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Search Vendors</h1>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, location, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <section className="bg-card border-b border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Minimum Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number.parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setMinRating(0)
                  }}
                  className="w-full px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg text-muted-foreground">
              Found {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {filteredVendors.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((vendor) => (
                  <VendorCard key={vendor.id} {...vendor} />
                ))}
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Page size</label>
                  <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="px-2 py-1 border border-border rounded-lg bg-background">
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded-lg">Prev</button>
                  <div className="text-sm text-muted-foreground">Page {page} of {totalPages}</div>
                  <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded-lg">Next</button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No vendors found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                  setMinRating(0)
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Clear Filters
              </button>
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
