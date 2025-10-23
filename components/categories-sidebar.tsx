"use client"

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar"
import { VendorCard } from "@/components/vendor-card"
import * as React from "react"

type Category = {
  id: string
  name: string
  description?: string
  icon?: string
  count?: number
}

type VendorsByCategory = Record<string, any[]>

export default function CategoriesSidebar({
  categories,
  vendors,
}: {
  categories: Category[]
  vendors: VendorsByCategory
}) {
  const [active, setActive] = React.useState<string>(categories?.[0]?.id ?? "")

  const activeCategory = React.useMemo(
    () => categories.find((c) => c.id === active) || categories[0],
    [categories, active],
  )
  const activeVendors = React.useMemo(() => vendors[activeCategory?.id] || [], [vendors, activeCategory?.id])

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[60vh]">
        <Sidebar variant="inset" collapsible="offcanvas">
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categories.map((cat) => {
                    const count = vendors[cat.id]?.length ?? cat.count ?? 0
                    return (
                      <SidebarMenuItem key={cat.id}>
                        <SidebarMenuButton
                          isActive={active === cat.id}
                          onClick={() => setActive(cat.id)}
                          tooltip={cat.name}
                        >
                          {cat.icon ? <span className="text-base">{cat.icon}</span> : null}
                          <span>{cat.name}</span>
                        </SidebarMenuButton>
                        {count > 0 ? <SidebarMenuBadge>{count}</SidebarMenuBadge> : null}
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <div className="px-4 py-6 md:px-6">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                {activeCategory?.name || "Vendors"}
              </h2>
              {activeCategory?.description ? (
                <p className="text-muted-foreground mt-1 text-sm">{activeCategory.description}</p>
              ) : null}
            </div>

            {activeVendors.length === 0 ? (
              <Empty className="border-border border">
                <EmptyHeader>
                  <EmptyTitle>No vendors yet</EmptyTitle>
                  <EmptyDescription>
                    We couldn't find vendors for this category. Try a different category or check back later.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    id={vendor.id}
                    name={vendor.name}
                    rating={vendor.rating}
                    reviews={vendor.reviews}
                    price={vendor.price}
                    image={vendor.image}
                    description={vendor.description}
                    location={vendor.location}
                    category={vendor.category}
                  />
                ))}
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
