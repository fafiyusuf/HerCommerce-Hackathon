"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState<"couple" | "vendor">("couple")
  const [vendorGovernmentId, setVendorGovernmentId] = useState("")
  const [vendorLicenses, setVendorLicenses] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const vendorVerification =
        userType === "vendor"
          ? { governmentId: vendorGovernmentId.trim(), licenses: vendorLicenses.split(",").map((s) => s.trim()).filter(Boolean) }
          : undefined
      if (userType === "vendor") {
        if (!vendorGovernmentId.trim() || !vendorLicenses.trim()) {
          throw new Error("Vendor ID and licenses are required for verification")
        }
      }
      await signup(email, password, name, userType, vendorVerification)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image
            src="/logoo2.png"
            alt="SergHub Logo"
            width={140}
            height={36}
            className="object-contain"
            priority
          />
        </Link>

        {/* Form Card */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join SergHub to find your perfect vendors</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">I am a:</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                  <input
                    type="radio"
                    name="userType"
                    value="couple"
                    checked={userType === "couple"}
                    onChange={(e) => setUserType(e.target.value as "couple" | "vendor")}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground font-medium">Couple / Event Organizer</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                  <input
                    type="radio"
                    name="userType"
                    value="vendor"
                    checked={userType === "vendor"}
                    onChange={(e) => setUserType(e.target.value as "couple" | "vendor")}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground font-medium">Vendor / Service Provider</span>
                </label>
              </div>
            </div>

            {userType === "vendor" && (
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Vendor Verification</h2>
                  <span className="text-xs text-muted-foreground">Required</span>
                </div>
                <div>
                  <label htmlFor="vendorId" className="block text-sm font-semibold text-foreground mb-2">
                    Government ID Number
                  </label>
                  <input
                    id="vendorId"
                    type="text"
                    value={vendorGovernmentId}
                    onChange={(e) => setVendorGovernmentId(e.target.value)}
                    placeholder="e.g., 0123-456789"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required={userType === "vendor"}
                  />
                </div>
                <div>
                  <label htmlFor="licenses" className="block text-sm font-semibold text-foreground mb-2">
                    Business License Numbers (comma separated)
                  </label>
                  <input
                    id="licenses"
                    type="text"
                    value={vendorLicenses}
                    onChange={(e) => setVendorLicenses(e.target.value)}
                    placeholder="e.g., LIC-1234, LIC-5678"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required={userType === "vendor"}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    We use these for verification. You can upload documents later in your dashboard if needed.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
