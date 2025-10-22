"use client"

import { useAuth } from "@/lib/auth-context"
import { addVendorService, getUserBookings, getUserCollection, getUserFavorites, getVendorServices, removeCollectionItem, removeVendorService, vendors } from "@/lib/data"
import { Box, Calendar, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [tab, setTab] = useState<"bookings" | "favorites" | "collection" | "vendor-services">("bookings")
  const [bookings, setBookings] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [collection, setCollection] = useState<any[]>([])
  const [vendorServices, setVendorServices] = useState<any[]>([])
  const [newServiceTitle, setNewServiceTitle] = useState("")
  const [newServicePrice, setNewServicePrice] = useState("")
  const [newServiceImages, setNewServiceImages] = useState("")

  useEffect(() => {
    if (!isLoading && user) {
      setBookings(getUserBookings(user.id))
      setFavorites(getUserFavorites(user.id))
      setCollection(getUserCollection(user.id))

      if (user.userType === "vendor") {
        // Try to find vendor entry by business name or email
        const all = Object.values(vendors).flat()
        const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email)
        const vendorId = found ? found.id : 0
        setVendorServices(getVendorServices(vendorId))
      }
    }
  }, [user, isLoading])

  if (isLoading) return <div className="p-12">Loading...</div>
  if (!user) return null

  const handleRemoveCollection = (itemId: string) => {
    removeCollectionItem(user.id, itemId)
    setCollection(getUserCollection(user.id))
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">SergHub</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">{user.name}'s Profile</h1>
          <p className="text-muted-foreground">Manage your bookings, favorites, and collections</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setTab("bookings")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${tab === "bookings" ? "bg-secondary" : "hover:bg-secondary"}`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Bookings
                  </div>
                </button>
                <button
                  onClick={() => setTab("favorites")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${tab === "favorites" ? "bg-secondary" : "hover:bg-secondary"}`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </div>
                </button>
                <button
                  onClick={() => setTab("collection")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${tab === "collection" ? "bg-secondary" : "hover:bg-secondary"}`}
                >
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    Collection
                  </div>
                </button>
                {user?.userType === "vendor" && (
                  <button
                    onClick={() => setTab("vendor-services")}
                    className={`w-full text-left px-4 py-2 rounded-lg ${tab === "vendor-services" ? "bg-secondary" : "hover:bg-secondary"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4" />
                      My Services
                    </div>
                  </button>
                )}
              </div>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="bg-card rounded-xl p-6 border border-border">
              {tab === "bookings" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                  {bookings.length === 0 ? (
                    <div className="text-muted-foreground">No bookings yet</div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((b) => (
                        <div key={b.id} className="p-4 bg-secondary rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{b.vendorName}</h3>
                              <div className="text-sm text-muted-foreground">{new Date(b.eventDate).toLocaleDateString()}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{b.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "favorites" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Favorites</h2>
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
                          <div>
                            <Link href={`/vendors/${f.vendorId}`} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
                              View
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "collection" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Collection</h2>
                  {collection.length === 0 ? (
                    <div className="text-muted-foreground">No items in collection</div>
                  ) : (
                    <div className="space-y-4">
                      {collection.map((c) => (
                        <div key={c.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{c.vendorName}</div>
                            <div className="text-sm text-muted-foreground">{c.category}</div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/vendors/${c.vendorId}`} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
                              View
                            </Link>
                            <button onClick={() => handleRemoveCollection(c.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {tab === "vendor-services" && user?.userType === "vendor" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Services</h2>

                  <div className="mb-4">
                    <label className="block text-sm text-muted-foreground mb-2">Add Service</label>
                    <div className="flex gap-2">
                      <input
                        value={newServiceTitle}
                        onChange={(e) => setNewServiceTitle(e.target.value)}
                        placeholder="Service title"
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                      <input
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        placeholder="Price"
                        className="w-40 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                      <input
                        value={newServiceImages}
                        onChange={(e) => setNewServiceImages(e.target.value)}
                        placeholder="Image URLs (comma separated)"
                        className="w-96 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                      <button
                        onClick={() => {
                          // locate vendor id
                          const all = Object.values(vendors).flat()
                          const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email)
                          const vendorId = found ? found.id : 0
                          if (!newServiceTitle) return
                          const images = newServiceImages ? newServiceImages.split(",").map((s) => s.trim()) : []
                          addVendorService(vendorId, newServiceTitle, undefined, newServicePrice || undefined, images)
                          setVendorServices(getVendorServices(vendorId))
                          setNewServiceTitle("")
                          setNewServicePrice("")
                          setNewServiceImages("")
                        }}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {vendorServices.length === 0 ? (
                    <div className="text-muted-foreground">No services added yet</div>
                  ) : (
                    <div className="space-y-4">
                      {vendorServices.map((s) => (
                        <div key={s.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{s.title}</div>
                            <div className="text-sm text-muted-foreground">{s.price}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const all = Object.values(vendors).flat()
                                const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email)
                                const vendorId = found ? found.id : 0
                                removeVendorService(vendorId, s.id)
                                setVendorServices(getVendorServices(vendorId))
                              }}
                              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
