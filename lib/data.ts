// Mock data for vendor categories and vendors
export const categories = [
  { id: "makeup", name: "Makeup Artists", description: "Professional makeup for your special day", icon: "💄", count: 24 },
  { id: "dress-renters", name: "Dress Renters", description: "Wedding dress and attire rentals", icon: "👗", count: 12 },
  { id: "catering", name: "Caterers", description: "Delicious food and beverage options", icon: "🍽️", count: 18 },
  { id: "decoration", name: "Decorators", description: "Transform your venue beautifully", icon: "�", count: 21 },
  { id: "dj", name: "DJs", description: "Music and DJ services for your event", icon: "🎧", count: 14 },
  { id: "henna", name: "Henna Artists", description: "Traditional henna and body art services", icon: "✋🏽", count: 9 },
  { id: "photography", name: "Photographers", description: "Capture your precious moments", icon: "📸", count: 32 },
  { id: "invitation", name: "Invitation Card Makers", description: "Design and print beautiful invitations", icon: "✉️", count: 8 },
  { id: "venue", name: "Hotels & Venues", description: "Perfect spaces and accommodation for your celebration", icon: "🏛️", count: 15 },
  { id: "music", name: "Music & Entertainment", description: "Keep your guests entertained", icon: "🎵", count: 19 },
]

export const vendors: Record<string, any[]> = {
  makeup: [
    {
      id: 1,
      name: "Abeba's Beauty Studio",
      category: "makeup",
      rating: 4.9,
      reviews: 127,
      price: "$50-150",
      image: "/makeup-artist-studio.jpg",
      description: "Professional bridal makeup with 10+ years experience",
      location: "Addis Ababa",
      featured: true,
      bio: "Abeba is a certified makeup artist with over 10 years of experience in bridal and event makeup. She specializes in creating timeless looks that enhance natural beauty.",
      services: ["Bridal Makeup", "Bridesmaid Makeup", "Trial Sessions", "Airbrush Makeup", "Traditional Makeup"],
      portfolio: ["/makeup-artist-studio.jpg", "/makeup-artist-applying-lipstick.png"],
      availability: "Available weekends and weekdays",
      phone: "+251 911 234 567",
      email: "abeba@beautystudio.et",
    },
    {
      id: 2,
      name: "Glow & Shine Makeup",
      category: "makeup",
      rating: 4.8,
      reviews: 95,
      price: "$40-120",
      image: "/makeup-artist-applying-lipstick.png",
      description: "Specialized in traditional and modern makeup styles",
      location: "Addis Ababa",
      featured: false,
      bio: "Glow & Shine offers a perfect blend of traditional Ethiopian makeup styles with modern techniques.",
      services: ["Bridal Makeup", "Event Makeup", "Makeup Lessons", "Airbrush Services"],
      portfolio: ["/makeup-artist-applying-lipstick.png"],
      availability: "Weekends only",
      phone: "+251 911 345 678",
      email: "info@glowshine.et",
    },
    {
      id: 3,
      name: "Radiant Beauty",
      category: "makeup",
      rating: 4.7,
      reviews: 82,
      price: "$45-130",
      image: "/professional-makeup.jpg",
      description: "Airbrush and traditional makeup services",
      location: "Dire Dawa",
      featured: false,
      bio: "Radiant Beauty specializes in long-lasting makeup using premium products.",
      services: ["Airbrush Makeup", "Traditional Makeup", "Bridal Packages"],
      portfolio: ["/professional-makeup.jpg"],
      availability: "Available by appointment",
      phone: "+251 911 456 789",
      email: "radiant@beauty.et",
    },
  ],
  catering: [
    {
      id: 4,
      name: "Ethiopian Feast Catering",
      category: "catering",
      rating: 4.9,
      reviews: 156,
      price: "$15-30 per person",
      image: "/ethiopian-food-catering.jpg",
      description: "Authentic Ethiopian cuisine for your celebration",
      location: "Addis Ababa",
      featured: true,
      bio: "Ethiopian Feast brings authentic flavors and traditional hospitality to your wedding celebration.",
      services: ["Traditional Ethiopian Menu", "International Cuisine", "Beverage Service", "Dessert Packages"],
      portfolio: ["/ethiopian-food-catering.jpg"],
      availability: "Available for all dates",
      phone: "+251 911 567 890",
      email: "feast@catering.et",
    },
    {
      id: 5,
      name: "Delicious Moments",
      category: "catering",
      rating: 4.8,
      reviews: 112,
      price: "$12-25 per person",
      image: "/catering-service.png",
      description: "International and local cuisine options",
      location: "Addis Ababa",
      featured: false,
      bio: "Delicious Moments offers diverse menu options to suit every taste and budget.",
      services: ["Menu Customization", "Buffet Service", "Plated Dinners", "Bar Service"],
      portfolio: ["/catering-service.png"],
      availability: "Weekends and special dates",
      phone: "+251 911 678 901",
      email: "moments@catering.et",
    },
  ],
  photography: [
    {
      id: 6,
      name: "Moments Captured Photography",
      category: "photography",
      rating: 4.95,
      reviews: 203,
      price: "$800-2000",
      image: "/elegant-outdoor-wedding.png",
      description: "Professional wedding photography and videography",
      location: "Addis Ababa",
      featured: true,
      bio: "Moments Captured specializes in capturing authentic emotions and beautiful details of your wedding day.",
      services: ["Photography", "Videography", "Drone Footage", "Same-Day Edit", "Album Design"],
      portfolio: ["/elegant-outdoor-wedding.png"],
      availability: "Limited availability - book early",
      phone: "+251 911 789 012",
      email: "moments@photography.et",
    },
    {
      id: 7,
      name: "Lens & Light Studio",
      category: "photography",
      rating: 4.8,
      reviews: 178,
      price: "$600-1500",
      image: "/professional-photographer.png",
      description: "Candid and traditional photography styles",
      location: "Addis Ababa",
      featured: false,
      bio: "Lens & Light captures both candid moments and traditional portraits with artistic excellence.",
      services: ["Candid Photography", "Traditional Portraits", "Pre-wedding Shoots", "Video Services"],
      portfolio: ["/professional-photographer.png"],
      availability: "Available most weekends",
      phone: "+251 911 890 123",
      email: "lens@studio.et",
    },
  ],
  decoration: [
    {
      id: 8,
      name: "Dream Decorations",
      category: "decoration",
      rating: 4.9,
      reviews: 134,
      price: "$500-2000",
      image: "/elegant-wedding-decor.png",
      description: "Creative and elegant venue decorations",
      location: "Addis Ababa",
      featured: true,
      bio: "Dream Decorations transforms venues into magical spaces with creative designs and attention to detail.",
      services: ["Venue Decoration", "Floral Arrangements", "Lighting Design", "Custom Themes"],
      portfolio: ["/elegant-wedding-decor.png"],
      availability: "Available for all seasons",
      phone: "+251 911 901 234",
      email: "dream@decorations.et",
    },
  ],
  venue: [
    {
      id: 9,
      name: "Grand Ballroom Palace",
      category: "venue",
      rating: 4.8,
      reviews: 89,
      price: "$2000-5000",
      image: "/wedding-venue-ballroom.jpg",
      description: "Luxurious venue with full amenities",
      location: "Addis Ababa",
      featured: true,
      bio: "Grand Ballroom Palace offers elegant spaces with state-of-the-art facilities for your perfect celebration.",
      services: ["Ceremony Space", "Reception Hall", "Catering Kitchen", "Parking", "Accommodation Nearby"],
      portfolio: ["/wedding-venue-ballroom.jpg"],
      availability: "Book 6 months in advance",
      phone: "+251 911 012 345",
      email: "bookings@grandballroom.et",
    },
  ],
  music: [
    {
      id: 10,
      name: "Harmony Entertainment",
      category: "music",
      rating: 4.9,
      reviews: 98,
      price: "$300-800",
      image: "/live-band-music.jpg",
      description: "Live band and DJ services",
      location: "Addis Ababa",
      featured: false,
      bio: "Harmony Entertainment provides professional musicians and DJs to keep your guests entertained all night.",
      services: ["Live Band", "DJ Services", "Sound System", "Lighting", "MC Services"],
      portfolio: ["/live-band-music.jpg"],
      availability: "Available weekends",
      phone: "+251 911 123 456",
      email: "harmony@entertainment.et",
    },
  ],
}

// Add a few more sample vendors for new categories
vendors["dress-renters"] = [
  {
    id: 11,
    name: "Elegant Gowns Rental",
    category: "dress-renters",
    rating: 4.8,
    reviews: 64,
    price: "$80-400",
    image: "/dress-rental.jpg",
    description: "Designer gowns for rent with alteration options",
    location: "Addis Ababa",
    featured: false,
    bio: "Elegant Gowns provides high-end designer dresses for brides at affordable rental prices.",
    services: ["Bridal Gown Rental", "Bridesmaid Dresses", "Alterations"],
    portfolio: ["/dress-rental.jpg"],
    availability: "Weekdays and weekends",
    phone: "+251 911 222 333",
    email: "rentals@elegantgowns.et",
  },
]

vendors["dj"] = [
  {
    id: 12,
    name: "BeatWave DJs",
    category: "dj",
    rating: 4.7,
    reviews: 48,
    price: "$150-400",
    image: "/dj-band.jpg",
    description: "Experienced DJs and MCs for weddings and events",
    location: "Addis Ababa",
    featured: false,
    bio: "BeatWave keeps the dancefloor full with modern and traditional hits.",
    services: ["DJ Services", "Sound System Rental", "MC Services"],
    portfolio: ["/dj-band.jpg"],
    availability: "Weekends",
    phone: "+251 911 333 444",
    email: "contact@beatwave.et",
  },
]

vendors["henna"] = [
  {
    id: 13,
    name: "Henna Artistry by Lulit",
    category: "henna",
    rating: 4.9,
    reviews: 40,
    price: "$30-120",
    image: "/henna-artist.jpg",
    description: "Traditional and modern henna designs for brides",
    location: "Addis Ababa",
    featured: false,
    bio: "Lulit brings traditional Ethiopian henna with modern flair for special occasions.",
    services: ["Bridal Henna", "Family Henna", "Custom Designs"],
    portfolio: ["/henna-artist.jpg"],
    availability: "Weekends",
    phone: "+251 911 444 555",
    email: "henna@lulit.et",
  },
]

vendors["invitation"] = [
  {
    id: 14,
    name: "Lovely Invites Studio",
    category: "invitation",
    rating: 4.7,
    reviews: 22,
    price: "$0.5-3 per card",
    image: "/invitation-cards.jpg",
    description: "Custom invitation design and printing services",
    location: "Addis Ababa",
    featured: false,
    bio: "Lovely Invites creates beautiful bespoke invitations and stationery for weddings.",
    services: ["Custom Design", "Printing", "Envelope Addressing"],
    portfolio: ["/invitation-cards.jpg"],
    availability: "Mon-Fri",
    phone: "+251 911 555 666",
    email: "hello@lovelyinvites.et",
  },
]

// Vendor services management (for vendors to add/edit their offered services and portfolio)
export interface VendorService {
  id: string
  vendorId: number
  title: string
  description?: string
  price?: string
  images?: string[]
  createdAt: string
}

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

export function addVendorService(vendorId: number, title: string, description?: string, price?: string, images?: string[]): VendorService {
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

export function getVendorById(vendorId: number) {
  const allVendors = Object.values(vendors).flat()
  return allVendors.find((v) => v.id === vendorId)
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

export const bookings: Booking[] = []

export function createBooking(
  vendorId: number,
  userId: string,
  userName: string,
  eventDate: string,
  eventType: string,
  guestCount: number,
  budget: string,
  notes: string,
): Booking {
  const allVendors = Object.values(vendors).flat()
  const vendor = allVendors.find((v) => v.id === vendorId)

  if (!vendor) {
    throw new Error("Vendor not found")
  }

  const booking: Booking = {
    id: Math.random().toString(36).substr(2, 9),
    vendorId,
    vendorName: vendor.name,
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

// Favorites and collection storage
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

export function addToCollection(userId: string, vendorId: number, vendorName: string, category: string, notes?: string): CollectionItem {
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

export function searchVendors(query: string): (typeof vendors)[keyof typeof vendors] {
  const allVendors = Object.values(vendors).flat()
  return allVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(query.toLowerCase()) ||
      vendor.description.toLowerCase().includes(query.toLowerCase()) ||
      vendor.location.toLowerCase().includes(query.toLowerCase()),
  )
}

export function filterVendors(
  category?: string,
  minRating?: number,
  maxPrice?: number,
): (typeof vendors)[keyof typeof vendors] {
  let allVendors = Object.values(vendors).flat()

  if (category) {
    allVendors = allVendors.filter((v) => v.category === category)
  }

  if (minRating) {
    allVendors = allVendors.filter((v) => v.rating >= minRating)
  }

  return allVendors
}

export function getFeaturedVendors() {
  const allVendors = Object.values(vendors).flat()
  return allVendors.filter((vendor) => vendor.featured).slice(0, 3)
}
