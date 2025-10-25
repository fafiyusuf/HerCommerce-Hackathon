"use client"

import { useAuth } from "@/lib/auth-context"
import {
  Box,
  Briefcase,
  Calendar,
  ChevronDown,
  Heart,
  Home,
  LogOut,
  Menu,
  User,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/bookings", icon: Calendar, label: "Bookings" },
    { href: "/dashboard/profile", icon: User, label: "Profile & Settings" },
    { href: "/categories", icon: Heart, label: "Browse Vendors" },
  ]

  if (user.userType === "vendor") {
    navItems.splice(3, 0, { href: "/dashboard/services", icon: Briefcase, label: "My Services" })
  }

  if (user.userType === "couple") {
    // Insert Favorites and Collection for couples/organizers
    navItems.splice(3, 0, { href: "/dashboard/favorites", icon: Heart, label: "Favorites" })
    navItems.splice(4, 0, { href: "/dashboard/collection", icon: Box, label: "Collection" })
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/10">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Unified Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-card/95 backdrop-blur-lg border-r border-border shadow-xl z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <Link href="/" className="p-6 border-b border-border bg-linear-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-primary-foreground font-heading font-bold text-xl">S</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-foreground block">SergHub</span>
                <span className="text-xs text-muted-foreground">Wedding Platform</span>
              </div>
            </div>
          </Link>

          {/* User Profile Card */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="px-3 py-2 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-border">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                {user.userType === "couple" ? "Event Organizer" : "Vendor"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                      active
                        ? "bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-secondary/50 hover:translate-x-1"
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${active ? "" : "group-hover:scale-110 transition-transform"}`} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border bg-linear-to-r from-secondary/20 to-primary/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition-colors shadow-sm"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Top Header Bar */}
        <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1 lg:ml-0 ml-12">
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground">
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {user.userType === "couple"
                  ? "Plan your perfect wedding"
                  : "Manage your business"}
              </p>
            </div>

            {/* Quick User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors border border-border"
              >
                <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform hidden sm:block ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-40 overflow-hidden">
                    <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          handleLogout()
                        }}
                        className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
