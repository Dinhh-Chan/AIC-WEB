"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  username: string
  role: "admin" | "judge" | "team"
}

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Array<"admin" | "judge" | "team">
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          const parsedUser = JSON.parse(userData) as User
          setUser(parsedUser)

          // Check if user role is allowed
          if (!allowedRoles.includes(parsedUser.role)) {
            router.push("/login")
            return
          }
        } else {
          router.push(redirectTo)
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push(redirectTo)
        return
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [allowedRoles, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
