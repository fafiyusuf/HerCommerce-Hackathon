// Main index file - aggregates all vendor data and utilities

// Export all types
export type {
    Booking, Category, CollectionItem, Favorite, Review, Vendor, VendorInventoryItem,
    VendorService
} from "./types"

// Export categories
export { categories } from "./categories"

// Import all vendor arrays
import { carRentalVendors } from "./car-rental"
import { cateringVendors } from "./catering"
import { decorationVendors } from "./decoration"
import { djVendors } from "./dj"
import { dressRentersVendors } from "./dress-renters"
import { hairSalonsVendors } from "./hair-salons"
import { hennaVendors } from "./henna"
import { invitationVendors } from "./invitation"
import { makeupVendors } from "./makeup"
import { musicVendors } from "./music"
import { photographyVendors } from "./photography"
import type { Vendor } from "./types"
import { venueVendors } from "./venue"

// Export individual vendor arrays
export {
    carRentalVendors, cateringVendors, decorationVendors, djVendors, dressRentersVendors, hairSalonsVendors, hennaVendors,
    invitationVendors, makeupVendors, musicVendors, photographyVendors, venueVendors
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
  "hair-salons": hairSalonsVendors,
  "car-rental": carRentalVendors,
}

// Export all utility functions except the ones we're overriding
export {
    addInventoryItem, addToCollection, addVendorReview, addVendorService, bookings,
    createBooking, filterVendors, getUserBookings, getUserCollection, getUserFavorites, getVendorInventory, getVendorReviews, getVendorServices, isFavorite, removeCollectionItem, removeInventoryItem, removeVendorService, searchVendors, toggleFavorite
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
    filterVendors as filterVendorsUtil,
    getFeaturedVendors as getFeaturedVendorsUtil, searchVendors as searchVendorsUtil
} from "./utils"

