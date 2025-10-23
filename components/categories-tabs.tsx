"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VendorCard } from "./vendor-card"

interface Category {
  id: string
  name: string
  icon?: string
}

interface Props {
  categories: Category[]
  vendors: Record<string, any[]>
}

export default function CategoriesTabs({ categories, vendors }: Props) {
  if (!categories || categories.length === 0) return null

  return (
    <Tabs defaultValue={categories[0].id} className="w-full">
      <TabsList>
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.icon} {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {(vendors[category.id] || []).map((vendor) => (
              <VendorCard key={vendor.id} {...vendor} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
