import Link from "next/link"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export function CategoryCard({ id, name, description, icon, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
      <div className="bg-card rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer border border-border hover:border-primary">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">{count} vendors</span>
          <span className="text-lg">→</span>
        </div>
      </div>
    </Link>
  )
}
