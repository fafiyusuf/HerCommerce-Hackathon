// Type definitions for SergHub vendor management

export interface VendorInventoryItem {
  id: string
  vendorId: number
  title: string
  description?: string
  price: string
  images: string[]
  inStock?: boolean
  attributes?: Record<string, string | number | boolean>
  createdAt: string
}

export interface VendorService {
  id: string
  vendorId: number
  title: string
  description?: string
  price?: string
  images?: string[]
  createdAt: string
}

export interface Vendor {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  price: string
  image: string
  description: string
  location: string
  featured: boolean
  bio: string
  services: string[]
  portfolio: string[]
  availability: string
  phone: string
  email: string
  inventory: VendorInventoryItem[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export interface Booking {
  id: string
  vendorId: number
  vendorName: string
  userId: string
  userName: string
  eventDate: string
  eventType: string
  guestCount: number
  budget: string
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export interface Favorite {
  id: string
  userId: string
  vendorId: number
  vendorName: string
  createdAt: string
}

export interface CollectionItem {
  id: string
  userId: string
  vendorId: number
  vendorName: string
  category: string
  notes?: string
  createdAt: string
}

// Reviews left by users for vendors/services
export interface Review {
  id: string
  vendorId: number
  serviceTitle?: string
  userId: string
  userName: string
  rating: number
  comment?: string
  createdAt: string
}
