"use client"

import { VendorCard } from "@/components/vendor-card"
import {
    Box,
    Building2,
    Camera,
    Car,
    DollarSign,
    Hand,
    Headphones,
    Mail,
    MapPin,
    Menu,
    Music,
    Palette,
    Scissors,
    Search,
    Shirt,
    Sparkles,
    Utensils,
    X,
} from "lucide-react"
import * as React from "react"

type Category = {
  id: string
  name: string
  description?: string
  icon?: string
  count?: number
}

type VendorsByCategory = Record<string, any[]>

export default function CategoriesSidebar({
  categories,
  vendors,
}: {
  categories: Category[]
  vendors: VendorsByCategory
}) {
  const [active, setActive] = React.useState<string>(categories?.[0]?.id ?? "")
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [priceRange, setPriceRange] = React.useState("all")
  const [location, setLocation] = React.useState("all")

  // Map category IDs to Lucide icons
  const categoryIconMap: Record<string, React.ReactNode> = React.useMemo(
    () => ({
      makeup: <Palette className="w-6 h-6 text-primary" />,
      "dress-renters": <Shirt className="w-6 h-6 text-primary" />,
      catering: <Utensils className="w-6 h-6 text-primary" />,
      decoration: <Sparkles className="w-6 h-6 text-primary" />,
      dj: <Headphones className="w-6 h-6 text-primary" />,
      henna: <Hand className="w-6 h-6 text-primary" />,
      photography: <Camera className="w-6 h-6 text-primary" />,
      invitation: <Mail className="w-6 h-6 text-primary" />,
      venue: <Building2 className="w-6 h-6 text-primary" />,
      music: <Music className="w-6 h-6 text-primary" />,
      "hair-salons": <Scissors className="w-6 h-6 text-primary" />,
      "car-rental": <Car className="w-6 h-6 text-primary" />,
    }),
    [],
  )

  const activeCategory = React.useMemo(
    () => categories.find((c) => c.id === active) || categories[0],
    [categories, active],
  )
  
  // Get unique locations from all vendors in the active category
  const availableLocations = React.useMemo(() => {
    const vendorsInCategory = vendors[activeCategory?.id] || []
    const locations = new Set(vendorsInCategory.map((v) => v.location).filter(Boolean))
    return Array.from(locations).sort()
  }, [vendors, activeCategory?.id])

  // Filter vendors based on search, price, and location
  const filteredVendors = React.useMemo(() => {
    let results = vendors[activeCategory?.id] || []

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.description?.toLowerCase().includes(query) ||
          vendor.location?.toLowerCase().includes(query)
      )
    }

    // Location filter
    if (location !== "all") {
      results = results.filter((vendor) => vendor.location === location)
    }

    // Price filter
    if (priceRange !== "all") {
      results = results.filter((vendor) => {
        const price = vendor.price?.toLowerCase() || ""
        switch (priceRange) {
          case "budget":
            return price.includes("$") && !price.includes("$100") && !price.includes("$200")
          case "mid":
            return price.includes("$50") || price.includes("$100") || price.includes("$150")
          case "premium":
            return price.includes("$150") || price.includes("$200") || price.includes("$300")
          default:
            return true
        }
      })
    }

    return results
  }, [vendors, activeCategory?.id, searchQuery, location, priceRange])

  const handleCategoryClick = (categoryId: string) => {
    setActive(categoryId)
    setIsOpen(false)
    // Reset filters when changing category
    setSearchQuery("")
    setPriceRange("all")
    setLocation("all")
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange("all")
    setLocation("all")
  }

  const hasActiveFilters = searchQuery || priceRange !== "all" || location !== "all"

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-6 relative">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-opacity-90 transition-all"
          aria-label="Toggle categories"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky lg:top-16 top-0 left-0 h-screen lg:h-[calc(100vh-5rem)]
            w-80 lg:w-96 bg-card border border-border rounded-lg shadow-sm
            transition-transform duration-300 ease-in-out z-40
            overflow-y-auto
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Categories</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 hover:bg-secondary rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {categories.map((cat) => {
                const count = vendors[cat.id]?.length ?? cat.count ?? 0
                const isActive = active === cat.id
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`
                      w-full flex items-center gap-4 px-5 py-4 rounded-xl
                      transition-all duration-200 text-left group
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                          : "hover:bg-secondary text-foreground hover:scale-[1.01]"
                      }
                    `}
                  >
                    <span className="shrink-0">
                      {categoryIconMap[cat.id] ?? <Box className="w-6 h-6 text-primary" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base truncate">{cat.name}</div>
                    </div>
                    {count > 0 && (
                      <span
                        className={`
                          text-sm px-3 py-1.5 rounded-full font-bold
                          ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }
                        `}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-3">
              <span>
                {categoryIconMap[activeCategory?.id as string] ?? <Box className="w-7 h-7 text-primary" />}
              </span>
              <div>
                <h2 className="font-heading text-4xl font-bold text-foreground">
                  {activeCategory?.name || "Vendors"}
                </h2>
                {activeCategory?.description && (
                  <p className="text-muted-foreground text-base mt-1">
                    {activeCategory.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Filter Vendors
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Search Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2.5">
                  <Search className="inline w-4 h-4 mr-1.5" />
                  Search Vendors
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5">
                  <DollarSign className="inline w-4 h-4 mr-1.5" />
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer font-medium"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem"
                  }}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">💰 Budget (Under $50)</option>
                  <option value="mid">💵 Mid Range ($50-$150)</option>
                  <option value="premium">💎 Premium ($150+)</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5">
                  <MapPin className="inline w-4 h-4 mr-1.5" />
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer font-medium"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem"
                  }}
                >
                  <option value="all">All Locations</option>
                  {availableLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      📍 {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-5 pt-5 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-bold text-foreground text-base">{filteredVendors.length}</span> of{" "}
                  <span className="font-bold text-foreground text-base">
                    {vendors[activeCategory?.id]?.length || 0}
                  </span>{" "}
                  {filteredVendors.length === 1 ? "vendor" : "vendors"}
                </p>
                {hasActiveFilters && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Filters Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Vendors Grid */}
          {filteredVendors.length === 0 ? (
            <div className="bg-card border-2 border-dashed border-border rounded-xl p-16 text-center">
              <Search className="w-16 h-16 mb-4 text-primary" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                {hasActiveFilters ? "No matches found" : "No vendors yet"}
              </h3>
              <p className="text-muted-foreground text-base mb-6 max-w-md mx-auto">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more results."
                  : "We couldn't find vendors for this category. Try a different category or check back later."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  id={vendor.id}
                  name={vendor.name}
                  rating={vendor.rating}
                  reviews={vendor.reviews}
                  price={vendor.price}
                  image={vendor.image}
                  description={vendor.description}
                  location={vendor.location}
                  category={vendor.category}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
