"use client"

import { useAuth } from "@/lib/auth-context"
import { useVendorStore } from "@/lib/store"
import { Heart, Plus, Star, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface VendorCardProps {
  id: number
  name: string
  rating: number
  reviews: number
  price: string
  image: string
  description: string
  location: string
  category?: string
}

export function VendorCard({ id, name, rating, reviews, price, image, description, location, category }: VendorCardProps) {
  const { user } = useAuth()
  const { addVendor, toggleFavorite, isFavorite, savedVendors } = useVendorStore()
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  const isVendorFavorited = isFavorite(id)
  const isVendorSaved = savedVendors.some((v: any) => v.id === id)

  const handleToggleFav = () => {
    if (!user) {
      alert("Please log in to add favorites")
      return
    }
    toggleFavorite(id)
  }

  const handleAddToCollection = () => {
    if (!user) {
      alert("Please log in to save vendors")
      return
    }
    if (user.userType !== "couple") {
      alert("Only couples/event organizers can save vendors to their dashboard")
      return
    }
    
    addVendor({
      id,
      name,
      category: category || "unknown",
      image,
      rating,
      reviews,
      price,
      description,
      location,
    })
    
    // Show success message
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow relative">
      {showAddedMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          Added to Dashboard!
        </div>
      )}
      
      <div className="relative h-48 bg-muted overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{name}</h3>
          <button 
            onClick={handleToggleFav} 
            className={`p-2 rounded-full transition-all ${
              isVendorFavorited 
                ? "bg-red-50 text-red-600 scale-110" 
                : "bg-muted hover:bg-red-50 hover:text-red-600"
            }`} 
            aria-label="Favorite"
          >
            <Heart className={`w-4 h-4 ${isVendorFavorited ? "fill-current" : ""}`} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{location}</span>
          <span className="font-semibold text-primary">{price}</span>
        </div>

        <div className="flex gap-3">
          <Link href={`/vendors/${id}`} className="flex-1">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              View Details
            </button>
          </Link>
          <button
            onClick={handleAddToCollection}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
              isVendorSaved
                ? "bg-green-100 text-green-700 border-2 border-green-500"
                : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
            aria-label="Add to collection"
            title={isVendorSaved ? "Already in dashboard" : "Add to dashboard"}
          >
            {isVendorSaved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
