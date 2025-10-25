"use client";

import { useAuth } from "@/lib/auth-context";
import { addVendorService, getVendorServices, removeVendorService, vendors } from "@/lib/data";
import { Building2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function VendorServicesPage() {
  const { user, isLoading } = useAuth();
  const [vendorServices, setVendorServices] = useState<any[]>([]);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [newServiceImages, setNewServiceImages] = useState("");

  useEffect(() => {
    if (!isLoading && user && user.userType === "vendor") {
      const all = Object.values(vendors).flat();
      const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email);
      const vendorId = found ? found.id : 0;
      setVendorServices(getVendorServices(vendorId));
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }
  if (!user || user.userType !== "vendor") {
    return <div className="text-center py-16">Only vendors can manage services.</div>;
  }

  const handleAddService = () => {
    const all = Object.values(vendors).flat();
    const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email);
    const vendorId = found ? found.id : 0;
    if (!newServiceTitle) return;
    const images = newServiceImages ? newServiceImages.split(",").map((s) => s.trim()) : [];
    addVendorService(vendorId, newServiceTitle, newServiceDescription || undefined, newServicePrice || undefined, images);
    setVendorServices(getVendorServices(vendorId));
    setNewServiceTitle("");
    setNewServiceDescription("");
    setNewServicePrice("");
    setNewServiceImages("");
  };

  const handleRemoveService = (serviceId: string) => {
    const all = Object.values(vendors).flat();
    const found = all.find((v: any) => v.name === user.vendorInfo?.businessName || v.email === user.email);
    const vendorId = found ? found.id : 0;
    removeVendorService(vendorId, serviceId);
    setVendorServices(getVendorServices(vendorId));
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border">
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Manage My Services
          </h1>
          <p className="text-muted-foreground mt-2">Add, edit, or remove your business services here.</p>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <label className="block text-sm text-muted-foreground mb-2">Add Service</label>
            <div className="flex gap-2 flex-wrap">
              <input
                value={newServiceTitle}
                onChange={(e) => setNewServiceTitle(e.target.value)}
                placeholder="Service title"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <input
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
                placeholder="Short description"
                className="w-full md:w-96 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <input
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                placeholder="Price"
                className="w-40 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <input
                value={newServiceImages}
                onChange={(e) => setNewServiceImages(e.target.value)}
                placeholder="Image URLs (comma separated)"
                className="w-96 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>
          {vendorServices.length === 0 ? (
            <div className="text-muted-foreground">No services added yet</div>
          ) : (
            <div className="space-y-4">
              {vendorServices.map((s) => (
                <div key={s.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    {s.description && <div className="text-sm text-muted-foreground mt-1">{s.description}</div>}
                    <div className="text-sm text-muted-foreground mt-1">{s.price}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemoveService(s.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
