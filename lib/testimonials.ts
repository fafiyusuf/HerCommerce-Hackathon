export interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  content: string
  rating: number
  vendor?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Almaz Tekle",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1594736797933-d0f3d0c24c2e?w=500&h=300&fit=crop&crop=center",
    content:
  "SergHub made our wedding planning so much easier! We found amazing vendors all in one place and the booking process was seamless. Our wedding day was absolutely perfect!",
    rating: 5,
    vendor: "Multiple vendors",
  },
  {
    id: 2,
    name: "Yohannes Abebe",
    role: "Groom",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=center",
    content:
  "As someone who was overwhelmed with wedding planning, SergHub was a lifesaver. The verified vendors gave us confidence and the reviews helped us make the right choices.",
    rating: 5,
    vendor: "Multiple vendors",
  },
  {
    id: 3,
    name: "Hiwot Mengistu",
    role: "Event Organizer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop&crop=center",
    content:
  "I've organized dozens of events and SergHub is the best platform I've found for connecting with quality vendors. My clients love the transparency and professionalism.",
    rating: 5,
    vendor: "Multiple vendors",
  },
  {
    id: 4,
    name: "Abeba Assefa",
    role: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1560869713-7d0b29837912?w=500&h=300&fit=crop&crop=center",
    content:
  "As a vendor, SergHub has been incredible for my business. I get consistent bookings from serious couples and the platform handles everything professionally.",
    rating: 5,
    vendor: "Abeba's Beauty Studio",
  },
  {
    id: 5,
    name: "Tadesse Kebede",
    role: "Photographer",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center",
    content:
  "SergHub connects me with couples who truly value quality photography. The booking system is efficient and I've built great relationships with my clients through the platform.",
    rating: 5,
    vendor: "Moments Captured Photography",
  },
  {
    id: 6,
    name: "Marta Wolde",
    role: "Caterer",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop&crop=center",
    content:
  "The platform has helped me reach couples I would never have found otherwise. SergHub's verification process gives clients confidence in my services.",
    rating: 5,
    vendor: "Ethiopian Feast Catering",
  },
]
