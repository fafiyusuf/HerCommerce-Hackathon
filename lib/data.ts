// Mock data for vendor categories and vendors
export const categories = [
  { id: "makeup", name: "Makeup Artists", description: "Professional makeup for your special day", icon: "💄", count: 24 },
  { id: "dress-renters", name: "Dress Renters", description: "Wedding dress and attire rentals", icon: "👗", count: 12 },
  { id: "catering", name: "Caterers", description: "Delicious food and beverage options", icon: "🍽️", count: 18 },
  { id: "decoration", name: "Decorators", description: "Transform your venue beautifully", icon: "🎀", count: 21 },
  { id: "dj", name: "DJs", description: "Music and DJ services for your event", icon: "🎧", count: 14 },
  { id: "henna", name: "Henna Artists", description: "Traditional henna and body art services", icon: "✋🏽", count: 9 },
  { id: "photography", name: "Photographers", description: "Capture your precious moments", icon: "📸", count: 32 },
  { id: "invitation", name: "Invitation Card Makers", description: "Design and print beautiful invitations", icon: "✉️", count: 8 },
  { id: "venue", name: "Hotels & Venues", description: "Perfect spaces and accommodation for your celebration", icon: "🏛️", count: 15 },
  { id: "music", name: "Music & Entertainment", description: "Keep your guests entertained", icon: "🎵", count: 19 },
]

// Inventory typing and helpers
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

export const vendors: Record<string, any[]> = {
  makeup: [
    {
      id: 1,
      name: "Abeba's Beauty Studio",
      category: "makeup",
      rating: 4.9,
      reviews: 127,
      price: "$50-150",
      image: "https://images.unsplash.com/photo-1560869713-7d0b29837912?w=500&h=300&fit=crop&crop=center",
      description: "Professional Ethiopian bridal makeup with traditional and modern styles",
      location: "Addis Ababa",
      featured: true,
      bio: "Abeba is a certified makeup artist with over 10 years of experience in Ethiopian bridal and event makeup. She specializes in creating looks that honor traditional beauty while incorporating modern techniques.",
      services: ["Traditional Ethiopian Bridal", "Modern Bridal Makeup", "Habesha Kemis Styling", "Trial Sessions", "Airbrush Makeup"],
      portfolio: ["https://images.unsplash.com/photo-1560869713-7d0b29837912?w=500&h=300&fit=crop&crop=center", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=300&fit=crop&crop=center"],
      availability: "Available weekends and weekdays",
      phone: "+251 911 234 567",
      email: "abeba@beautystudio.et",
      inventory: [
        {
          id: "mkp-1",
          vendorId: 1,
          title: "Traditional Ethiopian Bridal Package",
          description: "Complete traditional look with kohl eyes, henna lips, and gold highlights for Habesha wedding.",
          price: "$150",
          images: ["https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { duration: "3 hrs", traditional: true, goldAccents: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "mkp-2",
          vendorId: 1,
          title: "Bridesmaid & Family Glam",
          description: "Elegant makeup for bridesmaids wearing traditional Habesha kemis.",
          price: "$70",
          images: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { duration: "1.5 hrs", traditional: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "mkp-3",
          vendorId: 1,
          title: "Pre-Wedding Trial",
          description: "Test traditional Ethiopian bridal look before your special day.",
          price: "$60",
          images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { duration: "1 hr", redeemable: false },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: "Glow & Shine Makeup",
      category: "makeup",
      rating: 4.8,
      reviews: 95,
      price: "$40-120",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=300&fit=crop&crop=center",
      description: "Specialized in traditional and modern Ethiopian makeup styles",
      location: "Addis Ababa",
      featured: false,
      bio: "Glow & Shine offers a perfect blend of traditional Ethiopian makeup styles with modern techniques.",
      services: ["Traditional Ethiopian Makeup", "Modern Bridal Looks", "Makeup Lessons", "Airbrush Services"],
      portfolio: ["https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends only",
      phone: "+251 911 345 678",
      email: "info@glowshine.et",
      inventory: [
        {
          id: "mkp-4",
          vendorId: 2,
          title: "Airbrush Bridal Package",
          description: "Lightweight airbrush finish with full glam.",
          price: "$120",
          images: ["https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { airbrush: true, duration: "2 hrs" },
          createdAt: new Date().toISOString(),
        },
        {
          id: "mkp-5",
          vendorId: 2,
          title: "Event Makeup",
          description: "Perfect for graduations and events.",
          price: "$50",
          images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { lashes: false, duration: "1 hr" },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 3,
      name: "Radiant Beauty",
      category: "makeup",
      rating: 4.7,
      reviews: 82,
      price: "$45-130",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=300&fit=crop&crop=center",
      description: "Airbrush and traditional Ethiopian makeup services",
      location: "Dire Dawa",
      featured: false,
      bio: "Radiant Beauty specializes in long-lasting makeup using premium products and traditional techniques.",
      services: ["Airbrush Makeup", "Traditional Ethiopian Makeup", "Bridal Packages"],
      portfolio: ["https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=300&fit=crop&crop=center"],
      availability: "Available by appointment",
      phone: "+251 911 456 789",
      email: "radiant@beauty.et",
      inventory: [
        {
          id: "mkp-6",
          vendorId: 3,
          title: "Traditional Bridal Look",
          description: "Classic Ethiopian bridal makeup.",
          price: "$90",
          images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center"],
          inStock: true,
          attributes: { traditional: true, duration: "2 hrs" },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 19,
      name: "Golden Touch Makeup",
      category: "makeup",
      rating: 4.6,
      reviews: 71,
      price: "$45-140",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center",
      description: "Glamorous makeup for special Ethiopian occasions",
      location: "Addis Ababa",
      featured: false,
      bio: "Golden Touch creates stunning looks with premium products and expert techniques for Ethiopian celebrations.",
      services: ["Bridal Makeup", "Event Glam", "Photoshoot Makeup", "Traditional Ethiopian Looks"],
      portfolio: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends and evenings",
      phone: "+251 911 777 888",
      email: "golden@makeup.et",
      inventory: [
        {
          id: "mkp-7",
          vendorId: 19,
          title: "Glamour Package",
          description: "Full glam with contouring and highlight.",
          price: "$110",
          images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop&crop=center"],
          attributes: { duration: "2 hrs", contouring: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 20,
      name: "Bella Beauty Lounge",
      category: "makeup",
      rating: 4.7,
      reviews: 89,
      price: "$55-160",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=300&fit=crop&crop=center",
      description: "Modern makeup studio with latest techniques for Ethiopian brides",
      location: "Dire Dawa",
      featured: false,
      bio: "Bella Beauty combines artistic vision with technical skill for flawless Ethiopian bridal results.",
      services: ["HD Makeup", "Skin Prep", "Color Matching", "Traditional Ethiopian Styles"],
      portfolio: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=300&fit=crop&crop=center"],
      availability: "By appointment",
      phone: "+251 911 999 111",
      email: "bella@beauty.et",
      inventory: [
        {
          id: "mkp-8",
          vendorId: 20,
          title: "HD Bridal Package",
          description: "High-definition makeup perfect for photos and video.",
          price: "$140",
          images: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=300&fit=crop&crop=center"],
          attributes: { hd: true, duration: "2.5 hrs" },
          createdAt: new Date().toISOString(),
        },
      ],
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
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center",
      description: "Authentic Ethiopian cuisine with traditional injera and wot dishes",
      location: "Addis Ababa",
      featured: true,
      bio: "Ethiopian Feast brings authentic traditional flavors and cultural hospitality to your wedding celebration with recipes passed down through generations.",
      services: ["Traditional Ethiopian Buffet", "Doro Wot & Kitfo Specialties", "Coffee Ceremony", "Vegetarian Fasting Menu"],
      portfolio: ["https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center"],
      availability: "Available for all dates",
      phone: "+251 911 567 890",
      email: "feast@catering.et",
      inventory: [
        {
          id: "cat-1",
          vendorId: 4,
          title: "Traditional Ethiopian Feast",
          description: "Doro wot, kitfo, shiro, tibs with fresh injera and traditional honey wine.",
          price: "$25 per person",
          images: ["https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop&crop=center"],
          attributes: { minGuests: 100, injera: true, honeyWine: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "cat-2",
          vendorId: 4,
          title: "Royal Wedding Package",
          description: "Premium Ethiopian dishes + coffee ceremony with traditional roasting.",
          price: "$35 per person",
          images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop&crop=center"],
          attributes: { minGuests: 100, coffeeCeremony: true, premiumCuts: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 5,
      name: "Delicious Moments",
      category: "catering",
      rating: 4.8,
      reviews: 112,
      price: "$12-25 per person",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center",
      description: "International and Ethiopian local cuisine options",
      location: "Addis Ababa",
      featured: false,
      bio: "Delicious Moments offers diverse Ethiopian and international menu options to suit every taste and budget.",
      services: ["Ethiopian Menu Customization", "Buffet Service", "Plated Dinners", "Traditional Coffee Service"],
      portfolio: ["https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends and special dates",
      phone: "+251 911 678 901",
      email: "moments@catering.et",
      inventory: [
        {
          id: "cat-3",
          vendorId: 5,
          title: "Lite Buffet",
          description: "Two proteins, two sides, salads, beverages.",
          price: "$18 per person",
          images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop&crop=center"],
          attributes: { minGuests: 80 },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 21,
      name: "Royal Feast Catering",
      category: "catering",
      rating: 4.7,
      reviews: 94,
      price: "$18-35 per person",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop&crop=center",
      description: "Premium Ethiopian catering with fusion cuisine options",
      location: "Addis Ababa",
      featured: false,
      bio: "Royal Feast specializes in both traditional Ethiopian and international fusion menus for elegant celebrations.",
      services: ["Ethiopian-International Fusion", "Vegetarian Options", "Traditional Coffee Ceremony", "Premium Dessert Bar"],
      portfolio: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop&crop=center"],
      availability: "Year-round availability",
      phone: "+251 911 888 777",
      email: "royal@feast.et",
      inventory: [
        {
          id: "cat-4",
          vendorId: 21,
          title: "Fusion Buffet",
          description: "Ethiopian-Italian fusion with wine pairing.",
          price: "$32 per person",
          images: ["https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop&crop=center"],
          attributes: { minGuests: 120, wineIncluded: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 22,
      name: "Spice Garden Catering",
      category: "catering",
      rating: 4.5,
      reviews: 67,
      price: "$14-28 per person",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop&crop=center",
      description: "Authentic Ethiopian spices and traditional cooking methods",
      location: "Bahir Dar",
      featured: false,
      bio: "Spice Garden brings authentic regional Ethiopian flavors to your celebration with traditional cooking methods.",
      services: ["Regional Ethiopian Specialties", "Halal Options", "Live Injera Making", "Traditional Spice Blends"],
      portfolio: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends",
      phone: "+251 911 666 555",
      email: "spice@garden.et",
      inventory: [
        {
          id: "cat-5",
          vendorId: 22,
          title: "Traditional Feast",
          description: "Regional specialties with live injera station.",
          price: "$24 per person",
          images: ["https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center"],
          attributes: { minGuests: 150, liveStation: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  photography: [
    {
      id: 6,
      name: "Habesha Wedding Photography",
      category: "photography",
      rating: 4.95,
      reviews: 203,
      price: "$800-2000",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center",
      description: "Specialized in traditional Ethiopian wedding ceremonies and cultural moments",
      location: "Addis Ababa",
      featured: true,
      bio: "Habesha Wedding Photography specializes in capturing the beauty of Ethiopian traditions, from the Melse ceremony to the grand Habesha kemis moments.",
      services: ["Traditional Ceremony Coverage", "Habesha Kemis Portraits", "Melse & Shimgelit Documentation", "Family Portrait Sessions"],
      portfolio: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center"],
      availability: "Limited availability - book early",
      phone: "+251 911 789 012",
      email: "moments@photography.et",
      inventory: [
        {
          id: "pho-1",
          vendorId: 6,
          title: "Complete Traditional Coverage",
          description: "Full day coverage of Melse, ceremony, and reception with cultural focus.",
          price: "$1,800",
          images: ["https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 12, traditional: true, culturalFocus: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "pho-2",
          vendorId: 6,
          title: "Silver Photo",
          description: "1 photographer, 8hr coverage, edited photos.",
          price: "$1,100",
          images: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 8, album: false },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 7,
      name: "Lens & Light Studio",
      category: "photography",
      rating: 4.8,
      reviews: 178,
      price: "$600-1500",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=300&fit=crop&crop=center",
      description: "Candid and traditional Ethiopian photography styles",
      location: "Addis Ababa",
      featured: false,
      bio: "Lens & Light captures both candid moments and traditional Ethiopian portraits with artistic excellence.",
      services: ["Candid Photography", "Traditional Ethiopian Portraits", "Pre-wedding Shoots", "Cultural Documentation"],
      portfolio: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=300&fit=crop&crop=center"],
      availability: "Available most weekends",
      phone: "+251 911 890 123",
      email: "lens@studio.et",
      inventory: [
        {
          id: "pho-3",
          vendorId: 7,
          title: "Candid Story Package",
          description: "Candid focus with highlight video.",
          price: "$1,300",
          images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 9 },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 23,
      name: "Artistic Vision Photography",
      category: "photography",
      rating: 4.8,
      reviews: 156,
      price: "$700-1800",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center",
      description: "Creative and artistic Ethiopian wedding photography",
      location: "Addis Ababa",
      featured: false,
      bio: "Artistic Vision captures unique perspectives and creative compositions of Ethiopian wedding traditions.",
      services: ["Artistic Photography", "Black & White", "Fine Art Prints", "Cultural Engagement Sessions"],
      portfolio: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center"],
      availability: "Limited dates",
      phone: "+251 911 444 333",
      email: "artistic@vision.et",
      inventory: [
        {
          id: "pho-4",
          vendorId: 23,
          title: "Artistic Package",
          description: "Creative photography with fine art editing.",
          price: "$1,500",
          images: ["https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 8, artPrints: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 24,
      name: "Timeless Memories Studio",
      category: "photography",
      rating: 4.6,
      reviews: 88,
      price: "$550-1200",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop&crop=center",
      description: "Classic Ethiopian photography with modern editing",
      location: "Mekelle",
      featured: false,
      bio: "Timeless Memories focuses on capturing genuine emotions and candid moments in Ethiopian celebrations.",
      services: ["Traditional Ethiopian Photography", "Family Portraits", "Cultural Event Coverage"],
      portfolio: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends and holidays",
      phone: "+251 911 222 444",
      email: "timeless@memories.et",
      inventory: [
        {
          id: "pho-5",
          vendorId: 24,
          title: "Classic Package",
          description: "Traditional coverage with elegant editing.",
          price: "$950",
          images: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 6, album: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  decoration: [
    {
      id: 8,
      name: "Ethiopian Traditional Decorations",
      category: "decoration",
      rating: 4.9,
      reviews: 134,
      price: "$500-2000",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop&crop=center",
      description: "Authentic Ethiopian wedding decorations with traditional colors and symbols",
      location: "Addis Ababa",
      featured: true,
      bio: "Ethiopian Traditional Decorations specializes in creating authentic Habesha wedding atmospheres using traditional Ethiopian colors, fabrics, and cultural symbols.",
      services: ["Traditional Ethiopian Themes", "Habesha Kemis Color Coordination", "Ethiopian Flag Motifs", "Cultural Symbol Integration"],
      portfolio: ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop&crop=center"],
      availability: "Available for all seasons",
      phone: "+251 911 901 234",
      email: "dream@decorations.et",
      inventory: [
        {
          id: "dec-1",
          vendorId: 8,
          title: "Traditional Habesha Theme",
          description: "Green, yellow, red color scheme with Ethiopian cultural symbols and traditional fabrics.",
          price: "$1,500",
          images: ["https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=300&fit=crop&crop=center"],
          attributes: { traditional: true, ethiopianColors: true, culturalSymbols: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "dec-2",
          vendorId: 8,
          title: "Royal Ethiopian Palace Theme",
          description: "Gold and deep red décor inspired by Ethiopian royal traditions with traditional instruments display.",
          price: "$2,200",
          images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop&crop=center"],
          attributes: { royal: true, goldAccents: true, traditionalInstruments: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    // Added a second decorator vendor for more data
    {
      id: 15,
      name: "Blossom Events Decor",
      category: "decoration",
      rating: 4.7,
      reviews: 72,
      price: "$900-2500",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop&crop=center",
      description: "Creative Ethiopian themes and full venue styling",
      location: "Addis Ababa",
      featured: false,
      bio: "Blossom Events specializes in modern Ethiopian themes tailored to your cultural story.",
      services: ["Ethiopian Stage Design", "Traditional Floral Styling", "Cultural Lighting", "Custom Ethiopian Backdrops"],
      portfolio: ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop&crop=center"],
      availability: "By appointment",
      phone: "+251 911 777 222",
      email: "hello@blossomevents.et",
      inventory: [
        {
          id: "dec-3",
          vendorId: 15,
          title: "Modern Minimal Theme",
          description: "Monochrome palette with clean lines and candles.",
          price: "$1,400",
          images: ["https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=300&fit=crop&crop=center"],
          attributes: { stage: true, centerpieces: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  venue: [
    {
      id: 9,
      name: "Addis Ababa Grand Hotel",
      category: "venue",
      rating: 4.8,
      reviews: 89,
      price: "$2000-5000",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c8e8ada?w=500&h=300&fit=crop&crop=center",
      description: "Luxurious Ethiopian venue perfect for traditional and modern weddings",
      location: "Addis Ababa",
      featured: true,
      bio: "Addis Ababa Grand Hotel offers elegant spaces that honor Ethiopian traditions while providing modern amenities for your perfect celebration.",
      services: ["Traditional Ceremony Space", "Modern Reception Hall", "Ethiopian Coffee Station", "Cultural Performance Area"],
      portfolio: ["https://images.unsplash.com/photo-1519167758481-83f29c8e8ada?w=500&h=300&fit=crop&crop=center"],
      availability: "Book 6 months in advance",
      phone: "+251 911 012 345",
      email: "bookings@grandballroom.et",
      inventory: [
        {
          id: "ven-1",
          vendorId: 9,
          title: "Royal Ethiopian Ballroom",
          description: "Grand hall for 500 guests with traditional Ethiopian architectural elements.",
          price: "$4,200/day",
          images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop&crop=center"],
          attributes: { capacity: 500, traditional: true, parking: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "ven-2",
          vendorId: 9,
          title: "Garden Terrace",
          description: "Outdoor ceremony space for up to 200 guests.",
          price: "$1,200/day",
          images: ["https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500&h=300&fit=crop&crop=center"],
          attributes: { capacity: 200, outdoor: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 16,
      name: "Lideta Event Center",
      category: "venue",
      rating: 4.6,
      reviews: 54,
      price: "$1500-3500",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c8e8ada?w=500&h=300&fit=crop&crop=center",
      description: "Modern Ethiopian halls with ample parking and cultural ambiance",
      location: "Addis Ababa",
      featured: false,
      bio: "Lideta Event Center offers flexible halls for Ethiopian weddings and cultural events.",
      services: ["Traditional Ethiopian Hall", "Modern Reception Space", "Ethiopian Catering Coordination"],
      portfolio: ["https://images.unsplash.com/photo-1519167758481-83f29c8e8ada?w=500&h=300&fit=crop&crop=center"],
      availability: "Open calendar",
      phone: "+251 911 888 999",
      email: "info@lidetaevents.et",
      inventory: [
        {
          id: "ven-3",
          vendorId: 16,
          title: "Medium Hall",
          description: "Ideal for 250 guests, basic lighting included.",
          price: "$2,000/day",
          images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop&crop=center"],
          attributes: { capacity: 250, parking: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  music: [
    {
      id: 10,
      name: "Ethiopian Traditional Music",
      category: "music",
      rating: 4.9,
      reviews: 98,
      price: "$300-800",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center",
      description: "Authentic Ethiopian music with traditional instruments and modern hits",
      location: "Addis Ababa",
      featured: false,
      bio: "Ethiopian Traditional Music brings the soul of Ethiopia to your celebration with authentic krar, masinqo, and modern Ethiopian hits.",
      services: ["Traditional Ethiopian Band", "Krar & Masinqo Performance", "Modern Ethiopian Hits", "Cultural Dance Music"],
      portfolio: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center"],
      availability: "Available weekends",
      phone: "+251 911 123 456",
      email: "harmony@entertainment.et",
      inventory: [
        {
          id: "mus-1",
          vendorId: 10,
          title: "Traditional Ethiopian Performance",
          description: "Live band with krar, masinqo, and traditional Ethiopian wedding songs.",
          price: "$650",
          images: ["https://images.unsplash.com/photo-1501286353178-1ec881214838?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 4, traditional: true, liveInstruments: true },
          createdAt: new Date().toISOString(),
        },
        {
          id: "mus-2",
          vendorId: 10,
          title: "DJ Package (5 hrs)",
          description: "Professional DJ with lighting rig.",
          price: "$400",
          images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 5, lighting: true },
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 17,
      name: "Ethio Sounds",
      category: "music",
      rating: 4.7,
      reviews: 61,
      price: "$250-900",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=500&h=300&fit=crop&crop=center",
      description: "Live traditional and modern Ethiopian music",
      location: "Addis Ababa",
      featured: false,
      bio: "Ethio Sounds blends modern hits with traditional Ethiopian melodies and cultural performances.",
      services: ["Live Traditional Ethiopian", "Modern Ethiopian Hits", "Cultural Dance Music", "Traditional Instruments"],
      portfolio: ["https://images.unsplash.com/photo-1501286353178-1ec881214838?w=500&h=300&fit=crop&crop=center"],
      availability: "Weekends",
      phone: "+251 911 222 777",
      email: "book@ethiosounds.et",
      inventory: [
        {
          id: "mus-3",
          vendorId: 17,
          title: "Traditional Band (3 hrs)",
          description: "Azmari and masinqo with percussion.",
          price: "$350",
          images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center"],
          attributes: { hours: 3 },
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
}

// Add a few more sample vendors for new categories
vendors["dress-renters"] = [
  {
    id: 11,
    name: "Habesha Kemis Boutique",
    category: "dress-renters",
    rating: 4.8,
    reviews: 64,
    price: "$80-400",
    image: "https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center",
    description: "Authentic Ethiopian traditional wedding dresses and modern Habesha kemis",
    location: "Addis Ababa",
    featured: false,
    bio: "Habesha Kemis Boutique provides authentic Ethiopian wedding attire, from traditional white cotton dresses to modern Habesha kemis with intricate embroidery.",
    services: ["Traditional Habesha Kemis", "Modern Ethiopian Dresses", "Custom Embroidery", "Cultural Accessories"],
    portfolio: ["https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center"],
    availability: "Weekdays and weekends",
    phone: "+251 911 222 333",
    email: "rentals@elegantgowns.et",
    inventory: [
      {
        id: "drs-1",
        vendorId: 11,
        title: "Traditional White Habesha Kemis",
        description: "Classic white Ethiopian dress with traditional embroidered borders.",
        price: "$250",
        images: ["https://images.unsplash.com/photo-1582831302324-c6ad8dbf5f02?w=500&h=300&fit=crop&crop=center"],
        inStock: true,
        attributes: { style: "Traditional", color: "White", embroidery: "Gold" },
        createdAt: new Date().toISOString(),
      },
      {
        id: "drs-2",
        vendorId: 11,
        title: "Modern Habesha Kemis",
        description: "Contemporary Ethiopian dress with modern cut and traditional colors.",
        price: "$280",
        images: ["https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=300&fit=crop&crop=center"],
        inStock: true,
        attributes: { style: "Modern", colors: "Green/Yellow/Red", fit: "Tailored" },
        createdAt: new Date().toISOString(),
      },
      {
        id: "drs-3",
        vendorId: 11,
        title: "Royal Ethiopian Gown",
        description: "Elaborate traditional gown with royal Ethiopian design elements and gold threading.",
        price: "$400",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center"],
        inStock: true,
        attributes: { style: "Royal", goldThreading: true, ceremonial: true },
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 18,
    name: "Bridal Closet Addis",
    category: "dress-renters",
    rating: 4.6,
    reviews: 41,
    price: "$70-350",
    image: "https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center",
    description: "Affordable Ethiopian bridal rentals with traditional accessories",
    location: "Addis Ababa",
    featured: false,
    bio: "Bridal Closet offers curated Ethiopian gowns and matching traditional veils and accessories.",
    services: ["Ethiopian Dress Rental", "Traditional Veils & Accessories", "Cultural Fittings"],
    portfolio: ["https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center"],
    availability: "Weekdays",
    phone: "+251 911 101 202",
    email: "hello@bridalcloset.et",
    inventory: [
      {
        id: "drs-4",
        vendorId: 18,
        title: "Boho Chic Dress",
        description: "Flowy chiffon with lace sleeves.",
        price: "$210",
        images: ["https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=300&fit=crop&crop=center"],
        attributes: { size: "US 2-8", color: "Ivory" },
        createdAt: new Date().toISOString(),
      },
    ],
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
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center",
    description: "Experienced DJs and MCs for Ethiopian weddings and cultural events",
    location: "Addis Ababa",
    featured: false,
    bio: "BeatWave keeps the dancefloor full with modern hits and traditional Ethiopian music.",
    services: ["DJ Services", "Ethiopian Music Mix", "MC Services", "Sound System Rental"],
    portfolio: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=center"],
    availability: "Weekends",
    phone: "+251 911 333 444",
    email: "contact@beatwave.et",
    inventory: [
      {
        id: "dj-1",
        vendorId: 12,
        title: "Standard DJ (4 hrs)",
        description: "DJ, sound system, curated playlist.",
        price: "$300",
        images: ["https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=500&h=300&fit=crop&crop=center"],
        attributes: { hours: 4 },
        createdAt: new Date().toISOString(),
      },
      {
        id: "dj-2",
        vendorId: 12,
        title: "Premium DJ + Lights",
        description: "DJ with moving head lights and smoke.",
        price: "$450",
        images: ["https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop&crop=center"],
        attributes: { hours: 5, lighting: true, smoke: true },
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 25,
    name: "Party Mix DJs",
    category: "dj",
    rating: 4.6,
    reviews: 52,
    price: "$200-500",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop&crop=center",
    description: "High-energy DJs specializing in Ethiopian dance music",
    location: "Addis Ababa",
    featured: false,
    bio: "Party Mix keeps the energy high with latest hits and classic Ethiopian dance tracks.",
    services: ["Ethiopian DJ Services", "Dance Floor Lighting", "Traditional Music Mix"],
    portfolio: ["https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop&crop=center"],
    availability: "Friday-Sunday",
    phone: "+251 911 555 333",
    email: "party@mix.et",
    inventory: [
      {
        id: "dj-3",
        vendorId: 25,
        title: "Dance Party Package",
        description: "DJ with dance floor lighting and fog machine.",
        price: "$420",
        images: ["https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=500&h=300&fit=crop&crop=center"],
        attributes: { hours: 6, fog: true, danceFloor: true },
        createdAt: new Date().toISOString(),
      },
    ],
  },
]

vendors["henna"] = [
  {
    id: 13,
    name: "Ethiopian Henna by Lulit",
    category: "henna",
    rating: 4.9,
    reviews: 40,
    price: "$30-120",
    image: "https://images.unsplash.com/photo-1583431249456-25ac2173e01d?w=500&h=300&fit=crop&crop=center",
    description: "Traditional Ethiopian henna patterns and bridal designs",
    location: "Addis Ababa",
    featured: false,
    bio: "Lulit specializes in traditional Ethiopian henna artistry, creating intricate designs that honor cultural heritage for special occasions.",
    services: ["Traditional Ethiopian Henna", "Bridal Henna Ceremonies", "Cultural Pattern Designs", "Family Henna Sessions"],
    portfolio: ["https://images.unsplash.com/photo-1583431249456-25ac2173e01d?w=500&h=300&fit=crop&crop=center"],
    availability: "Weekends",
    phone: "+251 911 444 555",
    email: "henna@lulit.et",
    inventory: [
      {
        id: "hen-1",
        vendorId: 13,
        title: "Ethiopian Bridal Henna Ceremony",
        description: "Traditional Ethiopian bridal henna with cultural patterns and symbols.",
        price: "$120",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center"],
        attributes: { duration: "4-5 hrs", traditional: true, cultural: true },
        createdAt: new Date().toISOString(),
      },
      {
        id: "hen-2",
        vendorId: 13,
        title: "Family Henna (per person)",
        description: "Simple floral patterns.",
        price: "$25",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center"],
        attributes: { duration: "20-30 mins" },
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 26,
    name: "Mehndi Magic Studio",
    category: "henna",
    rating: 4.7,
    reviews: 35,
    price: "$25-100",
    image: "https://images.unsplash.com/photo-1583431249456-25ac2173e01d?w=500&h=300&fit=crop&crop=center",
    description: "Intricate Arabic and Ethiopian henna patterns",
    location: "Addis Ababa",
    featured: false,
    bio: "Mehndi Magic specializes in detailed Arabic and traditional Ethiopian-style henna art.",
    services: ["Arabic Henna", "Ethiopian Traditional Patterns", "Glitter Henna", "White Henna"],
    portfolio: ["https://images.unsplash.com/photo-1583431249456-25ac2173e01d?w=500&h=300&fit=crop&crop=center"],
    availability: "Daily appointments",
    phone: "+251 911 777 444",
    email: "magic@mehndi.et",
    inventory: [
      {
        id: "hen-3",
        vendorId: 26,
        title: "Arabic Bridal Design",
        description: "Flowing Arabic patterns with intricate details.",
        price: "$90",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center"],
        attributes: { style: "Arabic", duration: "3-4 hrs" },
        createdAt: new Date().toISOString(),
      },
    ],
  },
]

vendors["invitation"] = [
  {
    id: 14,
    name: "Ethiopian Wedding Invites",
    category: "invitation",
    rating: 4.7,
    reviews: 22,
    price: "$0.5-3 per card",
    image: "https://images.unsplash.com/photo-1543509683-97c0e82e7ec4?w=500&h=300&fit=crop&crop=center",
    description: "Traditional Ethiopian wedding invitations with cultural motifs and calligraphy",
    location: "Addis Ababa",
    featured: false,
    bio: "Ethiopian Wedding Invites creates beautiful invitations that honor Ethiopian traditions with cultural symbols and traditional Amharic calligraphy.",
    services: ["Traditional Ethiopian Designs", "Amharic Calligraphy", "Cultural Symbol Integration", "Bilingual Invitations"],
    portfolio: ["https://images.unsplash.com/photo-1543509683-97c0e82e7ec4?w=500&h=300&fit=crop&crop=center"],
    availability: "Mon-Fri",
    phone: "+251 911 555 666",
    email: "hello@lovelyinvites.et",
    inventory: [
      {
        id: "inv-1",
        vendorId: 14,
        title: "Traditional Ethiopian Design",
        description: "Invitation with Ethiopian cultural symbols and English/Amharic text.",
        price: "$2.5 per set",
        images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=300&fit=crop&crop=center"],
        attributes: { bilingual: true, culturalSymbols: true, paper: "350gsm" },
        createdAt: new Date().toISOString(),
      },
      {
        id: "inv-2",
        vendorId: 14,
        title: "Minimal Card Set",
        description: "Clean typography with colored envelope.",
        price: "$1.2 per set",
        images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=300&fit=crop&crop=center"],
        attributes: { minOrder: 50 },
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 27,
    name: "Creative Cards Co.",
    category: "invitation",
    rating: 4.5,
    reviews: 18,
    price: "$0.8-4 per card",
    image: "https://images.unsplash.com/photo-1543509683-97c0e82e7ec4?w=500&h=300&fit=crop&crop=center",
    description: "Modern and artistic Ethiopian invitation designs",
    location: "Addis Ababa",
    featured: false,
    bio: "Creative Cards specializes in unique, modern Ethiopian invitation designs with artistic and cultural flair.",
    services: ["Digital Ethiopian Design", "Laser Cutting", "Cultural Art Invites", "RSVP Management"],
    portfolio: ["https://images.unsplash.com/photo-1543509683-97c0e82e7ec4?w=500&h=300&fit=crop&crop=center"],
    availability: "Tue-Sat",
    phone: "+251 911 888 222",
    email: "creative@cards.et",
    inventory: [
      {
        id: "inv-3",
        vendorId: 27,
        title: "Watercolor Suite",
        description: "Hand-painted watercolor design with matching RSVP.",
        price: "$3.5 per set",
        images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=300&fit=crop&crop=center"],
        attributes: { minOrder: 75, watercolor: true },
        createdAt: new Date().toISOString(),
      },
    ],
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
