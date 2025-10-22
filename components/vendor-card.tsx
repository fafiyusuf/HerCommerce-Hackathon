"use client"

import { useAuth } from "@/lib/auth-context"
import { addToCollection, isFavorite, toggleFavorite } from "@/lib/data"
import { Heart, Plus, Star } from "lucide-react"
import { useEffect, useState } from "react"

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
  const [fav, setFav] = useState(false)

  useEffect(() => {
    if (user) {
      setFav(isFavorite(user.id, id))
    }
  }, [user, id])

  const handleToggleFav = () => {
    if (!user) return
    toggleFavorite(user.id, id, name)
    setFav((s) => !s)
  }

  const handleAddToCollection = () => {
    if (!user) return
    if (user.userType !== "couple") {
      alert("Only couples/event organizers can add items to a collection")
      return
    }
    addToCollection(user.id, id, name, category || "unknown")
    console.info("Added to collection")
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{name}</h3>
          <button onClick={handleToggleFav} className={`p-2 rounded-full ${fav ? "bg-red-50 text-red-600" : "bg-muted"}`} aria-label="Favorite">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>

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
          <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            View Details
          </button>
          <button
            onClick={handleAddToCollection}
            className="px-3 py-2 bg-secondary text-foreground rounded-lg flex items-center gap-2"
            aria-label="Add to collection"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
