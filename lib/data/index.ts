// Main index file - aggregates all vendor data and utilities

// Export all types
export type {
  VendorInventoryItem,
  VendorService,
  Vendor,
  Category,
  Booking,
  Favorite,
  CollectionItem,
} from "./types"

// Export categories
export { categories } from "./categories"

// Import all vendor arrays
import { makeupVendors } from "./makeup"
import { cateringVendors } from "./catering"
import { photographyVendors } from "./photography"
import { decorationVendors } from "./decoration"
import { venueVendors } from "./venue"
import { musicVendors } from "./music"
import { dressRentersVendors } from "./dress-renters"
import { djVendors } from "./dj"
import { hennaVendors } from "./henna"
import { invitationVendors } from "./invitation"
import type { Vendor } from "./types"

// Export individual vendor arrays
export {
  makeupVendors,
  cateringVendors,
  photographyVendors,
  decorationVendors,
  venueVendors,
  musicVendors,
  dressRentersVendors,
  djVendors,
  hennaVendors,
  invitationVendors,
}

// Aggregate all vendors into a single vendors object (maintains backward compatibility)
export const vendors: Record<string, Vendor[]> = {
  makeup: makeupVendors,
  catering: cateringVendors,
  photography: photographyVendors,
  decoration: decorationVendors,
  venue: venueVendors,
  music: musicVendors,
  "dress-renters": dressRentersVendors,
  dj: djVendors,
  henna: hennaVendors,
  invitation: invitationVendors,
}

// Export all utility functions except the ones we're overriding
export {
  getVendorInventory,
  addInventoryItem,
  removeInventoryItem,
  getVendorServices,
  addVendorService,
  removeVendorService,
  bookings,
  createBooking,
  getUserBookings,
  getUserFavorites,
  isFavorite,
  toggleFavorite,
  addToCollection,
  getUserCollection,
  removeCollectionItem,
  searchVendors,
  filterVendors,
} from "./utils"

// Helper function to get vendor by ID (searches across all categories)
export function getVendorById(vendorId: number): Vendor | undefined {
  const allVendors = Object.values(vendors).flat()
  return allVendors.find((v) => v.id === vendorId)
}

// Override getFeaturedVendors to work without parameters (backward compatibility)
export function getFeaturedVendors(): Vendor[] {
  const allVendors = Object.values(vendors).flat()
  return allVendors.filter((vendor) => vendor.featured).slice(0, 3)
}

// Re-export utility functions with the same names
export {
  searchVendors as searchVendorsUtil,
  filterVendors as filterVendorsUtil,
  getFeaturedVendors as getFeaturedVendorsUtil,
} from "./utils"
