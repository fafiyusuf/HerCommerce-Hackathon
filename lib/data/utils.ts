import type {
    Booking,
    CollectionItem,
    Favorite,
    Review,
    Vendor,
    VendorInventoryItem,
    VendorService,
} from "./types"

// Inventory management functions
export function getVendorInventory(vendorId: number): VendorInventoryItem[] {
  const key = `serghub_vendor_inventory_${vendorId}`
  const stored = localStorage.getItem(key)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error("Failed to parse vendor inventory:", e)
    return []
  }
}

export function addInventoryItem(
  vendorId: number,
  item: Omit<VendorInventoryItem, "id" | "vendorId" | "createdAt">,
): VendorInventoryItem {
  const key = `serghub_vendor_inventory_${vendorId}`
  const existing = getVendorInventory(vendorId)
  const newItem: VendorInventoryItem = {
    id: Math.random().toString(36).substr(2, 9),
    vendorId,
    title: item.title,
    description: item.description,
    price: item.price,
    images: item.images || [],
    inStock: item.inStock ?? true,
    attributes: item.attributes || {},
    createdAt: new Date().toISOString(),
  }
  existing.push(newItem)
  localStorage.setItem(key, JSON.stringify(existing))
  return newItem
}

export function removeInventoryItem(vendorId: number, itemId: string) {
  const key = `serghub_vendor_inventory_${vendorId}`
  const existing = getVendorInventory(vendorId)
  const next = existing.filter((i) => i.id !== itemId)
  localStorage.setItem(key, JSON.stringify(next))
  return existing.length !== next.length
}

// Vendor services management
export function getVendorServices(vendorId: number): VendorService[] {
  const key = `serghub_vendor_services_${vendorId}`
  const stored = localStorage.getItem(key)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse vendor services:", error)
    }
  }
  return []
}

export function addVendorService(
  vendorId: number,
  title: string,
  description?: string,
  price?: string,
  images?: string[],
): VendorService {
  const key = `serghub_vendor_services_${vendorId}`
  const stored = localStorage.getItem(key)
  let all: VendorService[] = []
  if (stored) {
    try {
      all = JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse vendor services:", error)
    }
  }

  const svc: VendorService = {
    id: Math.random().toString(36).substr(2, 9),
    vendorId,
    title,
    description,
    price,
    images: images || [],
    createdAt: new Date().toISOString(),
  }
  all.push(svc)
  localStorage.setItem(key, JSON.stringify(all))
  return svc
}

export function removeVendorService(vendorId: number, serviceId: string) {
  const key = `serghub_vendor_services_${vendorId}`
  const stored = localStorage.getItem(key)
  let all: VendorService[] = []
  if (stored) {
    try {
      all = JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse vendor services:", error)
    }
  }
  const idx = all.findIndex((s) => s.id === serviceId)
  if (idx !== -1) {
    all.splice(idx, 1)
    localStorage.setItem(key, JSON.stringify(all))
    return true
  }
  return false
}

// Booking management
export const bookings: Booking[] = []

export function createBooking(
  vendorId: number,
  vendorName: string,
  userId: string,
  userName: string,
  eventDate: string,
  eventType: string,
  guestCount: number,
  budget: string,
  notes: string,
): Booking {
  const booking: Booking = {
    id: Math.random().toString(36).substr(2, 9),
    vendorId,
    vendorName,
    userId,
    userName,
    eventDate,
    eventType,
    guestCount,
    budget,
    notes,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)
  localStorage.setItem("serghub_bookings", JSON.stringify(bookings))
  return booking
}

export function getUserBookings(userId: string): Booking[] {
  const stored = localStorage.getItem("serghub_bookings")
  if (stored) {
    try {
      const allBookings = JSON.parse(stored)
      return allBookings.filter((b: Booking) => b.userId === userId)
    } catch (error) {
      console.error("Failed to parse bookings:", error)
    }
  }
  return []
}

// Favorites management
export function getUserFavorites(userId: string): Favorite[] {
  const stored = localStorage.getItem("serghub_favorites")
  if (stored) {
    try {
      const all: Favorite[] = JSON.parse(stored)
      return all.filter((f) => f.userId === userId)
    } catch (error) {
      console.error("Failed to parse favorites:", error)
    }
  }
  return []
}

export function isFavorite(userId: string, vendorId: number) {
  return getUserFavorites(userId).some((f) => f.vendorId === vendorId)
}

export function toggleFavorite(userId: string, vendorId: number, vendorName: string) {
  const key = "serghub_favorites"
  const stored = localStorage.getItem(key)
  let all: Favorite[] = []
  if (stored) {
    try {
      all = JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse favorites:", error)
    }
  }

  const existsIndex = all.findIndex((f) => f.userId === userId && f.vendorId === vendorId)
  if (existsIndex !== -1) {
    all.splice(existsIndex, 1)
    localStorage.setItem(key, JSON.stringify(all))
    return { removed: true }
  }

  const fav: Favorite = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    vendorId,
    vendorName,
    createdAt: new Date().toISOString(),
  }
  all.push(fav)
  localStorage.setItem(key, JSON.stringify(all))
  return { added: true }
}

// Collection management
export function addToCollection(
  userId: string,
  vendorId: number,
  vendorName: string,
  category: string,
  notes?: string,
): CollectionItem {
  const key = "serghub_collection"
  const stored = localStorage.getItem(key)
  let all: CollectionItem[] = []
  if (stored) {
    try {
      all = JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse collection:", error)
    }
  }

  const item: CollectionItem = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    vendorId,
    vendorName,
    category,
    notes,
    createdAt: new Date().toISOString(),
  }
  all.push(item)
  localStorage.setItem(key, JSON.stringify(all))
  return item
}

export function getUserCollection(userId: string): CollectionItem[] {
  const stored = localStorage.getItem("serghub_collection")
  if (stored) {
    try {
      const all: CollectionItem[] = JSON.parse(stored)
      return all.filter((c) => c.userId === userId)
    } catch (error) {
      console.error("Failed to parse collection:", error)
    }
  }
  return []
}

export function removeCollectionItem(userId: string, itemId: string) {
  const key = "serghub_collection"
  const stored = localStorage.getItem(key)
  let all: CollectionItem[] = []
  if (stored) {
    try {
      all = JSON.parse(stored)
    } catch (error) {
      console.error("Failed to parse collection:", error)
    }
  }
  const idx = all.findIndex((i) => i.userId === userId && i.id === itemId)
  if (idx !== -1) {
    all.splice(idx, 1)
    localStorage.setItem(key, JSON.stringify(all))
    return true
  }
  return false
}

// Vendor search and filter utilities
export function searchVendors(allVendors: Vendor[], query: string): Vendor[] {
  return allVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(query.toLowerCase()) ||
      vendor.description.toLowerCase().includes(query.toLowerCase()) ||
      vendor.location.toLowerCase().includes(query.toLowerCase()),
  )
}

export function filterVendors(
  allVendors: Vendor[],
  category?: string,
  minRating?: number,
  maxPrice?: number,
): Vendor[] {
  let filtered = allVendors

  if (category) {
    filtered = filtered.filter((v) => v.category === category)
  }

  if (minRating) {
    filtered = filtered.filter((v) => v.rating >= minRating)
  }

  return filtered
}

export function getVendorById(allVendors: Vendor[], vendorId: number): Vendor | undefined {
  return allVendors.find((v) => v.id === vendorId)
}

export function getFeaturedVendors(allVendors: Vendor[]): Vendor[] {
  return allVendors.filter((vendor) => vendor.featured).slice(0, 3)
}

// Reviews management
export function getVendorReviews(vendorId: number): Review[] {
  const key = `serghub_reviews_${vendorId}`
  const stored = localStorage.getItem(key)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error("Failed to parse vendor reviews:", e)
    return []
  }
}

export function addVendorReview(
  vendorId: number,
  serviceTitle: string | undefined,
  userId: string,
  userName: string,
  rating: number,
  comment?: string,
): Review {
  const key = `serghub_reviews_${vendorId}`
  const existing = getVendorReviews(vendorId)
  const review: Review = {
    id: Math.random().toString(36).substr(2, 9),
    vendorId,
    serviceTitle,
    userId,
    userName,
    rating: Math.max(1, Math.min(5, Math.round(rating))),
    comment,
    createdAt: new Date().toISOString(),
  }
  existing.push(review)
  localStorage.setItem(key, JSON.stringify(existing))
  return review
}
