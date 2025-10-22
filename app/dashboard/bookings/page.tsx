"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { LogOut, Home, Calendar, MapPin } from "lucide-react"
import { getUserBookings, type Booking } from "@/lib/data"

export default function BookingsPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user) {
      const userBookings = getUserBookings(user.id)
      setBookings(userBookings)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
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
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-lg text-muted-foreground">Manage your vendor bookings and requests</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Menu</h2>
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className="flex items-center gap-3 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium"
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </Link>
              </nav>
            </div>
          </div>

          {/* Bookings List */}
          <div className="md:col-span-2">
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                          {booking.vendorName}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {booking.eventType} • {booking.guestCount} guests
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>

                    <div className="mb-4 p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Budget</p>
                      <p className="font-semibold text-foreground">{booking.budget}</p>
                    </div>

                    {booking.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Notes</p>
                        <p className="text-foreground">{booking.notes}</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-xl p-12 border border-border text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Start exploring vendors and make your first booking!</p>
                <Link
                  href="/search"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Browse Vendors
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
