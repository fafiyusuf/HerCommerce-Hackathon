# SergHub Data Architecture

## Overview
The vendor data has been decoupled from a single large file into an organized modular structure for better maintainability and scalability.

## Structure

```
lib/
├── data.ts                    # Main entry point (backward compatible)
└── data/
    ├── types.ts              # TypeScript interfaces and types
    ├── categories.ts         # Category definitions
    ├── utils.ts              # Helper functions
    ├── index.ts              # Main aggregator
    ├── makeup.ts             # Makeup artists vendors (5 vendors)
    ├── catering.ts           # Catering vendors (4 vendors)
    ├── photography.ts        # Photography vendors (4 vendors)
    ├── decoration.ts         # Decoration vendors (2 vendors)
    ├── venue.ts              # Venue vendors (2 vendors)
    ├── music.ts              # Music vendors (2 vendors)
    ├── dress-renters.ts      # Dress rental vendors (2 vendors)
    ├── dj.ts                 # DJ vendors (2 vendors)
    ├── henna.ts              # Henna artists vendors (2 vendors)
    └── invitation.ts         # Invitation vendors (2 vendors)
  ├── hair-salons.ts       # Hair salons (male & female) vendors (2+ vendors)
  └── car-rental.ts        # Car rental services (limo, jeep) vendors (2+ vendors)
```

## Files Description

### `lib/data.ts`
Main entry point that re-exports everything from `lib/data/index.ts`. All existing imports from `@/lib/data` continue to work without changes.

### `lib/data/types.ts`
Contains all TypeScript interfaces:
- `VendorInventoryItem` - Vendor inventory item structure
- `VendorService` - Vendor service structure
- `Vendor` - Main vendor interface
- `Category` - Category interface
- `Booking` - Booking interface
- `Favorite` - Favorite interface
- `CollectionItem` - Collection item interface

### `lib/data/categories.ts`
Exports the `categories` array with all 10 vendor categories.

### `lib/data/utils.ts`
Contains all utility functions:
- Inventory management: `getVendorInventory`, `addInventoryItem`, `removeInventoryItem`
- Service management: `getVendorServices`, `addVendorService`, `removeVendorService`
- Booking management: `createBooking`, `getUserBookings`
- Favorites management: `getUserFavorites`, `isFavorite`, `toggleFavorite`
- Collection management: `addToCollection`, `getUserCollection`, `removeCollectionItem`
- Search and filter: `searchVendors`, `filterVendors`, `getFeaturedVendors`, `getVendorById`

### `lib/data/[category].ts`
Each category file exports a typed vendor array:
- `makeupVendors` from `makeup.ts`
- `cateringVendors` from `catering.ts`
- `photographyVendors` from `photography.ts`
- `decorationVendors` from `decoration.ts`
- `venueVendors` from `venue.ts`
- `musicVendors` from `music.ts`
- `dressRentersVendors` from `dress-renters.ts`
- `djVendors` from `dj.ts`
- `hennaVendors` from `henna.ts`
- `invitationVendors` from `invitation.ts`

### `lib/data/index.ts`
Main aggregator that:
- Imports all category-specific vendor arrays
- Combines them into a single `vendors` object (backward compatible)
- Re-exports all types, utilities, and individual arrays
- Provides helper functions like `getVendorById` and `getFeaturedVendors`

## Backward Compatibility

All existing code continues to work without modifications:

```typescript
// ✅ All these imports still work
import { vendors, categories, getFeaturedVendors } from "@/lib/data"
import { getVendorById, searchVendors } from "@/lib/data"
import type { Vendor, Category, Booking } from "@/lib/data"
```

## Benefits

1. **Modularity**: Each category is in its own file, making it easier to find and edit specific vendors
2. **Maintainability**: Smaller files are easier to review and update
3. **Type Safety**: All types are centralized in `types.ts`
4. **Scalability**: Easy to add new categories or vendors
5. **Performance**: Better tree-shaking potential (though minor for this use case)
6. **Organization**: Clear separation of concerns between data, types, and utilities
7. **Backward Compatible**: No breaking changes to existing code

## Adding New Vendors

To add a new vendor to a category:

1. Open the appropriate `lib/data/[category].ts` file
2. Add the vendor object to the exported array
3. Ensure all required fields match the `Vendor` interface

Example:
```typescript
// lib/data/makeup.ts
export const makeupVendors: Vendor[] = [
  // ... existing vendors
  {
    id: 28,
    name: "New Makeup Studio",
    category: "makeup",
    // ... other required fields
  }
]
```

## Adding New Categories

To add a new category:

1. Add the category to `lib/data/categories.ts`
2. Create a new file `lib/data/[new-category].ts` with vendor array
3. Import and add to the `vendors` object in `lib/data/index.ts`
4. Export the new array from `lib/data/index.ts`

## Migration Notes

// Original file: `lib/data.ts` (~1351 lines) 
// New structure: 13 organized files averaging ~150 lines each
// Zero breaking changes
// All existing imports work as before
// All functionality preserved
