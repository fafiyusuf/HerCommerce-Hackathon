"use client"

import { useAuth } from "@/lib/auth-context"
import { getUserFavorites, toggleFavorite } from "@/lib/data"
import { ExternalLink, Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function FavoritesPage() {
  const { user, isLoading } = useAuth()
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && user) {
      setFavorites(getUserFavorites(user.id))
    }
  }, [user, isLoading])

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  if (!user) return null

  const handleRemove = (vendorId: number, vendorName: string) => {
    toggleFavorite(user.id, vendorId, vendorName)
    setFavorites(getUserFavorites(user.id))
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border">
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            My Favorites
          </h1>
          <p className="text-muted-foreground mt-2">Vendors you've favorited</p>
        </div>

        <div className="p-8">
          {favorites.length === 0 ? (
            <div className="text-muted-foreground">No favorites yet</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {favorites.map((f) => (
                <div key={f.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{f.vendorName}</div>
                    <div className="text-sm text-muted-foreground">Saved on {new Date(f.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/vendors/${f.vendorId}`} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Link>
                    <button onClick={() => handleRemove(f.vendorId, f.vendorName)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
