import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface SavedVendor {
  id: number
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  price: string
  description: string
  location: string
  savedAt: string
}

interface VendorStore {
  savedVendors: SavedVendor[]
  favorites: number[]
  addVendor: (vendor: Omit<SavedVendor, 'savedAt'>) => void
  removeVendor: (id: number) => void
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  clearAll: () => void
}

export const useVendorStore = create<VendorStore>()(
  persist(
    (set, get) => ({
      savedVendors: [],
      favorites: [],
      
      addVendor: (vendor: Omit<SavedVendor, 'savedAt'>) => {
        const exists = get().savedVendors.find((v: SavedVendor) => v.id === vendor.id)
        if (!exists) {
          set((state: VendorStore) => ({
            savedVendors: [
              ...state.savedVendors,
              { ...vendor, savedAt: new Date().toISOString() }
            ]
          }))
        }
      },
      
      removeVendor: (id: number) => {
        set((state: VendorStore) => ({
          savedVendors: state.savedVendors.filter((v: SavedVendor) => v.id !== id)
        }))
      },
      
      toggleFavorite: (id: number) => {
        set((state: VendorStore) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav: number) => fav !== id)
            : [...state.favorites, id]
        }))
      },
      
      isFavorite: (id: number) => {
        return get().favorites.includes(id)
      },
      
      clearAll: () => {
        set({ savedVendors: [], favorites: [] })
      }
    }),
    {
  name: 'serghub-vendor-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
