"use client"

import { useAuth } from "@/lib/auth-context"
import { Building2, Calendar, Edit2, Mail, User } from "lucide-react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    category: "",
    phone: "",
  })

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        businessName: user.vendorInfo?.businessName || "",
        category: user.vendorInfo?.category || "",
        phone: user.vendorInfo?.phone || "",
      })
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const handleSave = () => {
    // TODO: Implement actual save functionality
    console.log("Saving profile data:", formData)
    setIsEditing(false)
    // In a real app, you would call an API to update the user profile
  }

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      businessName: user.vendorInfo?.businessName || "",
      category: user.vendorInfo?.category || "",
      phone: user.vendorInfo?.phone || "",
    })
    setIsEditing(false)
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8 space-y-8">
          {/* Account Type Badge */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Account Type:</span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              user.userType === "vendor" 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
            }`}>
              {user.userType === "vendor" ? "Vendor" : "Couple/Organizer"}
            </span>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 rounded-lg">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{user.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 rounded-lg">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{user.email}</span>
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </div>

            {/* Vendor-Specific Information */}
            {user.userType === "vendor" && (
              <>
                <div className="border-t border-border pt-6 mt-6">
                  <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2 mb-6">
                    <Building2 className="w-5 h-5 text-primary" />
                    Business Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground">
                        Business Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter business name"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 rounded-lg">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{user.vendorInfo?.businessName || "Not set"}</span>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground">
                        Category
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select category</option>
                          <option value="makeup">Makeup</option>
                          <option value="photography">Photography</option>
                          <option value="catering">Catering</option>
                          <option value="decoration">Decoration</option>
                          <option value="venue">Venue</option>
                          <option value="dj">DJ</option>
                          <option value="music">Music</option>
                          <option value="henna">Henna</option>
                          <option value="dress-renters">Dress Renters</option>
                          <option value="invitation">Invitation</option>
                        </select>
                      ) : (
                        <div className="px-4 py-2.5 bg-secondary/30 rounded-lg">
                          <span className="text-foreground font-medium capitalize">{user.vendorInfo?.category || "Not set"}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground">
                        Business Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-secondary/30 rounded-lg">
                          <span className="text-foreground font-medium">{user.vendorInfo?.phone || "Not set"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Account Creation Date */}
            <div className="border-t border-border pt-6 mt-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Account created on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
