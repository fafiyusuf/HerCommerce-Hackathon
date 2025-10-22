"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  userType: "couple" | "vendor"
  vendorInfo?: {
    businessName: string
    category: string
    phone: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, userType: "couple" | "vendor") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("serghub_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - in production, this would call an API
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
          userType: email.includes("vendor") ? "vendor" : "couple",
          vendorInfo: email.includes("vendor")
            ? {
                businessName: "My Business",
                category: "makeup",
                phone: "+251 911 234 567",
              }
            : undefined,
        }
        setUser(mockUser)
        localStorage.setItem("serghub_user", JSON.stringify(mockUser))
      } else {
        throw new Error("Invalid credentials")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, userType: "couple" | "vendor") => {
    setIsLoading(true)
    try {
      // Mock signup - in production, this would call an API
      if (email && password.length >= 6 && name) {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          userType,
          vendorInfo:
            userType === "vendor"
              ? {
                  businessName: "",
                  category: "",
                  phone: "",
                }
              : undefined,
        }
        setUser(newUser)
        localStorage.setItem("serghub_user", JSON.stringify(newUser))
      } else {
        throw new Error("Invalid signup data")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("serghub_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
