import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  content: string
  rating: number
}

export function TestimonialCard({ name, role, image, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>

      <p className="text-foreground mb-6 leading-relaxed italic">"{content}"</p>

      <div className="flex items-center gap-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}
