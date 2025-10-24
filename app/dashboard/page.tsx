"use client"

import { useAuth } from "@/lib/auth-context"
import { useVendorStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { LogOut, Settings, Home, Heart, Trash2, Star, MapPin, ExternalLink, User, ChevronDown } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const { savedVendors, removeVendor, favorites, clearAll } = useVendorStore()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Compact Left Sidebar - Positioned with margin from top */}
      <aside className="w-20 lg:w-64 bg-card border border-border rounded-xl shadow-lg flex flex-col fixed left-6 top-6 z-30">
        {/* Logo */}
        <Link href="/" className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-heading font-bold text-lg">B</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground hidden lg:inline">BrideHub</span>
          </div>
        </Link>

        {/* Navigation - Compact */}
        <nav className="p-3 lg:p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 lg:px-4 py-3 bg-secondary text-foreground rounded-lg font-medium transition-colors group"
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-3 lg:px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="hidden lg:inline">Profile Settings</span>
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-3 px-3 lg:px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <Heart className="w-5 h-5 shrink-0" />
            <span className="hidden lg:inline">Browse Vendors</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-28 lg:pl-80 pr-6">
        {/* Top Header Bar */}
        <header className="bg-card border border-border rounded-xl shadow-sm sticky top-6 z-20 mt-6 mb-6">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">Welcome, {user.name}!</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {user.userType === "couple"
                  ? "Find and book your perfect wedding vendors"
                  : "Manage your vendor profile and bookings"}
              </p>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border border-border"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground hidden md:inline">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-40 overflow-hidden">
                    {/* User Info Header */}
                    <div className="bg-linear-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <User className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-lg text-foreground truncate">{user.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Account Information */}
                    <div className="p-4 space-y-3">
                      <div className="bg-background rounded-lg p-4 border border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Account Type</p>
                        <p className="text-sm font-medium text-foreground capitalize">
                          {user.userType === "couple" ? "Couple / Event Organizer" : "Vendor / Service Provider"}
                        </p>
                      </div>

                      {/* Vendor Info */}
                      {user.userType === "vendor" && user.vendorInfo && (
                        <div className="bg-background rounded-lg p-4 border border-border space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Business Name</p>
                            <p className="text-sm font-medium text-foreground">{user.vendorInfo.businessName || "Not set"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Category</p>
                            <p className="text-sm font-medium text-foreground capitalize">
                              {user.vendorInfo.category || "Not set"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:bg-opacity-90 transition-colors text-sm"
                        >
                          Edit Profile
                        </Link>
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            handleLogout()
                          }}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pb-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Vendor-Specific Content */}
            {user.userType === "vendor" && user.vendorInfo && (
              <div className="bg-linear-to-r from-secondary/20 to-primary/10 rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Vendor Dashboard</h2>
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>
                <Link
                  href="/dashboard/profile"
                  className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Manage Profile
                </Link>
              </div>
            )}

            {/* Couple-Specific Content */}
            {user.userType === "couple" && (
              <>
                {/* Quick Actions - Compact */}
                <div className="bg-linear-to-r from-primary/10 to-secondary rounded-xl p-6 border border-border">
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

                {/* Saved Vendors Section - Organized by Category */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                        <Heart className="w-8 h-8 text-primary fill-primary" />
                        My Saved Vendors
                      </h2>
                      <p className="text-base text-muted-foreground mt-2">
                        {savedVendors.length} {savedVendors.length === 1 ? "vendor" : "vendors"} saved across {
                          Object.keys(savedVendors.reduce((acc: any, v: any) => ({ ...acc, [v.category]: true }), {})).length
                        } {Object.keys(savedVendors.reduce((acc: any, v: any) => ({ ...acc, [v.category]: true }), {})).length === 1 ? "category" : "categories"}
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
                      {/* Group vendors by category */}
                      {Object.entries(
                        savedVendors.reduce((acc: any, vendor: any) => {
                          const category = vendor.category || 'Other'
                          if (!acc[category]) {
                            acc[category] = []
                          }
                          acc[category].push(vendor)
                          return acc
                        }, {})
                      ).map(([category, vendors]: [string, any]) => (
                        <div key={category} className="bg-card rounded-xl border border-border overflow-hidden">
                          {/* Category Header */}
                          <div className="bg-linear-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-border">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-heading font-bold text-foreground capitalize flex items-center gap-2">
                                <span className="text-2xl">
                                  {category === 'makeup' && '💄'}
                                  {category === 'dress-renters' && '👗'}
                                  {category === 'catering' && '🍽️'}
                                  {category === 'decoration' && '🎀'}
                                  {category === 'dj' && '🎧'}
                                  {category === 'henna' && '✋🏽'}
                                  {category === 'photography' && '📸'}
                                  {category === 'invitation' && '✉️'}
                                  {category === 'venue' && '🏛️'}
                                  {category === 'music' && '🎵'}
                                  {!['makeup', 'dress-renters', 'catering', 'decoration', 'dj', 'henna', 'photography', 'invitation', 'venue', 'music'].includes(category) && '📋'}
                                </span>
                                {category.replace('-', ' ')}
                              </h3>
                              <span className="text-sm font-semibold text-muted-foreground bg-background px-3 py-1 rounded-full">
                                {vendors.length} {vendors.length === 1 ? 'vendor' : 'vendors'}
                              </span>
                            </div>
                          </div>

                          {/* Vendors Grid */}
                          <div className="p-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {vendors.map((vendor: any) => (
                                <div
                                  key={vendor.id}
                                  className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                                >
                                  <div className="relative h-40 bg-muted">
                                    <img
                                      src={vendor.image}
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
                                        {vendor.price}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        Added {new Date(vendor.savedAt).toLocaleDateString('en-US', { 
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
