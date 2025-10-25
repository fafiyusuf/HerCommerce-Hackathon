"use client"

import { useAuth } from "@/lib/auth-context"
import { addToCollection, createBooking, getVendorById } from "@/lib/data"
import { X } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface BookingModalProps {
  vendorId: number
  vendorName: string
  onClose: () => void
  onSuccess: () => void
}

export function BookingModal({ vendorId, vendorName, onClose, onSuccess }: BookingModalProps) {
  const { user } = useAuth()
  const [eventDate, setEventDate] = useState("")
  const [eventType, setEventType] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [budget, setBudget] = useState("")
  const [notes, setNotes] = useState("")
  const [service, setService] = useState("")
  const [addToMyCollection, setAddToMyCollection] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const vendor = getVendorById(vendorId)

  if (!user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      createBooking(
        vendorId,
        vendorName,
        user.id,
        user.name,
        eventDate,
        eventType,
        parseInt(guestCount),
        budget,
        notes,
      )
      if (addToMyCollection && vendor) {
        addToCollection(user.id, vendorId, vendor.name, vendor.category || "unknown", service || undefined)
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="rounded-xl max-w-md w-full border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-heading font-bold text-foreground">Book {vendorName}</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="reception">Reception</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Guest Count</label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="Expected number of guests"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., $1000-2000"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {vendor && vendor.services && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Choose Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                <option value="">Default / General</option>
                {vendor.services.map((s: string) => (
                  <option value={s} key={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={addToMyCollection} onChange={(e) => setAddToMyCollection(e.target.checked)} />
              <span className="text-sm">Add this vendor/service to my collection</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or details..."
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
