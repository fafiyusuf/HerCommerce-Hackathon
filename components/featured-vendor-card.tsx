"use client"
import { useAuth } from "@/lib/auth-context"
import { addToCollection, isFavorite, toggleFavorite } from "@/lib/data"
import { Heart, Plus, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface FeaturedVendorCardProps {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  price: string
  image: string
  description: string
}

export function FeaturedVendorCard({
  id,
  name,
  category,
  rating,
  reviews,
  price,
  image,
  description,
}: FeaturedVendorCardProps) {
  const { user } = useAuth()
  const [fav, setFav] = useState(false)

  useEffect(() => {
    if (user) setFav(isFavorite(user.id, id))
  }, [user, id])

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) return
    toggleFavorite(user.id, id, name)
    setFav((s) => !s)
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) return
    // Only couples/organizers can add to collection
    if (user.userType !== "couple") {
      // simple feedback for now
      alert("Only couples/event organizers can add items to a collection")
      return
    }
    addToCollection(user.id, id, name, category)
  }

  return (
    <Link href={`/vendors/${id}`}>
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-shadow cursor-pointer group">
        <div className="relative h-64 bg-muted overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-primary font-semibold mb-2 capitalize">{category}</div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{name}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={handleToggleFav} className={`p-2 rounded-full ${fav ? "bg-red-50 text-red-600" : "bg-muted"}`} aria-label="Favorite">
                <Heart className="w-4 h-4" />
              </button>
              <button onClick={handleAdd} className="p-2 rounded-full bg-secondary text-foreground" aria-label="Add">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">{price}</span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
