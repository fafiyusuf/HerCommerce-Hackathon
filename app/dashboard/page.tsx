"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { LogOut, Settings, Home } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

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
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">SergHub</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
          <p className="text-lg text-muted-foreground">
            {user.userType === "couple"
              ? "Find and book your perfect wedding vendors"
              : "Manage your vendor profile and bookings"}
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Menu</h2>
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Profile Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* User Info Card */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-lg text-foreground font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Type</p>
                  <p className="text-lg text-foreground font-medium capitalize">
                    {user.userType === "couple" ? "Couple / Event Organizer" : "Vendor / Service Provider"}
                  </p>
                </div>
              </div>
            </div>

            {/* Vendor-Specific Content */}
            {user.userType === "vendor" && user.vendorInfo && (
              <div className="bg-secondary rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Vendor Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                    <p className="text-lg text-foreground font-medium">{user.vendorInfo.businessName || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="text-lg text-foreground font-medium capitalize">
                      {user.vendorInfo.category || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg text-foreground font-medium">{user.vendorInfo.phone || "Not set"}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="inline-block mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            )}

            {/* Couple-Specific Content */}
            {user.userType === "couple" && (
              <div className="bg-secondary rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/categories"
                    className="block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
                  >
                    Browse Vendors
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="block px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors text-center"
                  >
                    My Bookings
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
