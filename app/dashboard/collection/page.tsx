"use client"

import { useAuth } from "@/lib/auth-context"
import { getUserCollection, removeCollectionItem } from "@/lib/data"
import { Box, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CollectionPage() {
  const { user, isLoading } = useAuth()
  const [collection, setCollection] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && user) {
      setCollection(getUserCollection(user.id))
    }
  }, [user, isLoading])

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  if (!user) return null

  const handleRemove = (itemId: string) => {
    removeCollectionItem(user.id, itemId)
    setCollection(getUserCollection(user.id))
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border">
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            My Collection
          </h1>
          <p className="text-muted-foreground mt-2">Vendors saved to your collection</p>
        </div>

        <div className="p-8">
          {collection.length === 0 ? (
            <div className="text-muted-foreground">No items in collection</div>
          ) : (
            <div className="space-y-4">
              {collection.map((c) => (
                <div key={c.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{c.vendorName}</div>
                    <div className="text-sm text-muted-foreground">{c.category}</div>
                    {c.notes && <div className="text-sm text-muted-foreground mt-1">{c.notes}</div>}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/vendors/${c.vendorId}`} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Link>
                    <button onClick={() => handleRemove(c.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
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
