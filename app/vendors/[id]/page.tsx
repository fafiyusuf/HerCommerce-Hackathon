"use client"

import { BookingModal } from "@/components/booking-modal"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/lib/auth-context"
import { addToCollection, vendors } from "@/lib/data"
import { Check, Mail, MapPin, Phone, Star } from "lucide-react"
import { notFound } from "next/navigation"
import { useState } from "react"

interface VendorPageProps {
  params: {
    id: string
  }
}

export default function VendorPage({ params }: VendorPageProps) {
  const vendorId = Number.parseInt(params.id)
  const allVendors = Object.values(vendors).flat()
  const vendor = allVendors.find((v) => v.id === vendorId)
  const { user } = useAuth()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  if (!vendor) {
    notFound()
  }

  const handleBookingSuccess = () => {
    setBookingSuccess(true)
    setTimeout(() => setBookingSuccess(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative h-96 bg-muted overflow-hidden">
        <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Vendor Info Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-xl p-8 border border-border -mt-24 relative z-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-heading font-bold text-foreground">{vendor.name}</h1>
                {vendor.featured && (
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="text-2xl font-bold text-foreground">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  {vendor.location}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{vendor.bio}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${vendor.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contact
                </a>
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6 md:w-80">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Price Range</p>
                <p className="text-2xl font-bold text-foreground">{vendor.price}</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Availability</p>
                <p className="text-foreground">{vendor.availability}</p>
              </div>
              {user ? (
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Book Now
                </button>
              ) : (
                <a
                  href="/login"
                  className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
                >
                  Sign In to Book
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {bookingSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold">
            Booking request sent successfully! The vendor will contact you soon.
          </div>
        )}

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Services Offered</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(vendor.services as string[]).map((service: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
                <div>
                  {user ? (
                    <button
                      onClick={() => {
                        if (user.userType !== "couple") {
                          alert("Only couples/event organizers can add services to a collection")
                          return
                        }
                        // add vendor + service to collection notes
                        addToCollection(user.id, vendor.id, vendor.name, vendor.category || "unknown", service)
                        alert("Added to your collection")
                      }}
                      className="px-3 py-2 bg-secondary rounded-lg"
                    >
                      Add
                    </button>
                  ) : (
                    <a href="/login" className="px-3 py-2 bg-secondary rounded-lg">
                      Sign in to add
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Portfolio</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(vendor.portfolio as string[]).map((image: string, index: number) => (
              <div key={index} className="relative h-64 bg-muted rounded-lg overflow-hidden border border-border">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-secondary rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Email</p>
              <a href={`mailto:${vendor.email}`} className="text-lg text-primary hover:underline">
                {vendor.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Phone</p>
              <a href={`tel:${vendor.phone}`} className="text-lg text-primary hover:underline">
                {vendor.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          vendorId={vendor.id}
          vendorName={vendor.name}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12 mt-16">
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
