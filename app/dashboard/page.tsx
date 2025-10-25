"use client"

import { useAuth } from "@/lib/auth-context"
import { SavedVendor, useVendorStore } from "@/lib/store"
import { Box, Building2, Camera, ExternalLink, Hand, Headphones, Heart, Mail, MapPin, Music, Palette, Shirt, Sparkles, Star, Trash2, Utensils } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { savedVendors, removeVendor, favorites, clearAll } = useVendorStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // Helper function to group vendors by category
  const vendorsByCategory = savedVendors.reduce((acc, vendor) => {
    const category = vendor.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(vendor)
    return acc
  }, {} as Record<string, SavedVendor[]>)

  return (
    <main className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
      {/* Vendor-Specific Content */}
      {user.userType === "vendor" && user.vendorInfo && (
        <div className="bg-linear-to-r from-secondary/20 to-primary/10 rounded-xl p-8 border border-border shadow-sm">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Vendor Dashboard</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Business Name</p>
              <p className="text-xl font-semibold text-foreground">{user.vendorInfo.businessName || "Not set"}</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <p className="text-xl font-semibold text-foreground capitalize">
                {user.vendorInfo.category || "Not set"}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Profile Status</p>
                <p className="text-xl font-semibold text-green-600">Active</p>
              </div>
              <Link
                href="/dashboard/profile" // Assuming a profile management page
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm"
              >
                Manage Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Couple-Specific Quick Actions */}
      {user.userType === "couple" && (
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/categories"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Browse Vendors
            </Link>
            <Link
              href="/dashboard/bookings"
              className="px-6 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              My Bookings
            </Link>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saved Vendors Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">{savedVendors.length}</span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">Saved Vendors</h3>
          <p className="text-xs text-muted-foreground mt-2">Total vendors in your collection</p>
        </div>

        {/* Favorites Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <Star className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">{favorites.length}</span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">Favorites</h3>
          <p className="text-xs text-muted-foreground mt-2">Your favorite selections</p>
        </div>

        {/* Dynamic Status Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Box className="w-6 h-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">
              {user.userType === "couple" ? Object.keys(vendorsByCategory).length : "Active"}
            </span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">
            {user.userType === "couple" ? "Categories Saved" : "Account Status"}
          </h3>
          <p className="text-xs text-muted-foreground mt-2">Current engagement</p>
        </div>
      </div>

      {/* Saved Vendors Section */}
      {user.userType === "couple" ? (
        // Couple View: Organized by Category
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary fill-primary" />
                My Saved Vendors
              </h2>
              <p className="text-base text-muted-foreground mt-2">
                {savedVendors.length} {savedVendors.length === 1 ? "vendor" : "vendors"} saved across {Object.keys(vendorsByCategory).length} {Object.keys(vendorsByCategory).length === 1 ? "category" : "categories"}
              </p>
            </div>
            {savedVendors.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear all saved vendors?")) {
                    clearAll()
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors flex items-center gap-2 border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {savedVendors.length === 0 ? (
            <div className="bg-card rounded-xl p-16 border-2 border-dashed border-border text-center">
              <div className="text-7xl mb-6">💐</div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                No vendors saved yet
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Start browsing our verified vendors and add them to your collection to plan your perfect wedding
              </p>
              <Link
                href="/categories"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-lg"
              >
                Browse Vendors
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(vendorsByCategory).map(([category, vendors]) => (
                <div key={category} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  {/* Category Header */}
                  <div className="bg-linear-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-bold text-foreground capitalize flex items-center gap-2">
                        {/* Icons based on category */}
                        {category === 'makeup' && <Palette className="w-5 h-5 text-primary" />}
                        {category === 'dress-renters' && <Shirt className="w-5 h-5 text-primary" />}
                        {category === 'catering' && <Utensils className="w-5 h-5 text-primary" />}
                        {category === 'decoration' && <Sparkles className="w-5 h-5 text-primary" />}
                        {category === 'dj' && <Headphones className="w-5 h-5 text-primary" />}
                        {category === 'henna' && <Hand className="w-5 h-5 text-primary" />}
                        {category === 'photography' && <Camera className="w-5 h-5 text-primary" />}
                        {category === 'invitation' && <Mail className="w-5 h-5 text-primary" />}
                        {category === 'venue' && <Building2 className="w-5 h-5 text-primary" />}
                        {category === 'music' && <Music className="w-5 h-5 text-primary" />}
                        {!['makeup', 'dress-renters', 'catering', 'decoration', 'dj', 'henna', 'photography', 'invitation', 'venue', 'music'].includes(category) && (
                          <Box className="w-5 h-5 text-primary" />
                        )}
                        {category.replace(/-/g, ' ')}
                      </h3>
                      <span className="text-sm font-semibold text-muted-foreground bg-background px-3 py-1 rounded-full">
                        {(vendors as SavedVendor[]).length} {(vendors as SavedVendor[]).length === 1 ? 'vendor' : 'vendors'}
                      </span>
                    </div>
                  </div>

                  {/* Vendors Grid */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(vendors as SavedVendor[]).map((vendor) => (
                        <div
                          key={vendor.id}
                          className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all group"
                        >
                          <div className="relative h-40 bg-muted">
                            {/* Assuming vendor.image exists for couple view, if not, fallback logic is needed here too */}
                            <img
                              src={vendor.image || "/placeholder-image.jpg"} 
                              alt={vendor.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-heading font-semibold text-foreground mb-2 text-base line-clamp-1">
                              {vendor.name}
                            </h4>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                                <span className="text-sm font-semibold">{vendor.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ({vendor.reviews})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                              <MapPin className="w-3.5 h-3.5" />
                              {vendor.location}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-base font-bold text-primary">
                                {vendor.price || 'Price Not Set'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Added {new Date(vendor.savedAt || Date.now()).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                href={`/vendors/${vendor.id}`}
                                className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors text-center flex items-center justify-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View
                              </Link>
                              <button
                                onClick={() => removeVendor(vendor.id)}
                                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                                title="Remove from saved"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Vendor View: Simple Grid (or default view if userType is not couple)
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Saved Vendors</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage your shortlisted vendors</p>
            </div>
            {savedVendors.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {savedVendors.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground mb-2">No saved vendors yet</p>
              <p className="text-muted-foreground mb-6">Start exploring and save your favorite vendors</p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Browse Vendors
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedVendors.map((vendor) => {
                const imageSrc = vendor.image
                return (
                  <div
                    key={vendor.id}
                    className="bg-secondary/30 border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={vendor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/20">
                          <span className="text-4xl font-bold text-muted-foreground opacity-50">
                            {vendor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{vendor.category}</p>
                        </div>
                        <button
                          onClick={() => removeVendor(vendor.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove vendor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {vendor.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          {vendor.location}
                        </div>
                      )}

                      {vendor.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{vendor.rating}</span>
                          {vendor.reviews && <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>}
                        </div>
                      )}

                      <Link
                        href={`/vendors/${vendor.id}`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </main>
  )
}