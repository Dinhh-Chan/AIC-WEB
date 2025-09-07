"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Eye, EyeOff, Users, UserCheck, Shield } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type UserRole = "team" | "judge" | "admin"

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

// Mock API endpoints - replace with your actual endpoints
const API_ENDPOINTS = {
  TEAMS: {
    AUTHENTICATE: "/api/teams/authenticate",
  },
  JUDGES: {
    AUTHENTICATE: "/api/judges/authenticate",
  },
}

// Mock auth functions - replace with your actual implementations
const getTeamInfo = () => null
const setTeamInfo = (info: any) => console.log("Setting team info:", info)
const getJudgeInfo = () => null
const setJudgeInfo = (info: any) => console.log("Setting judge info:", info)

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("team")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Fix hydration mismatch by waiting for client-side mounting
  React.useEffect(() => {
    setMounted(true)

    // Check if already logged in and redirect
    const existingTeamInfo = getTeamInfo()
    const existingJudgeInfo = getJudgeInfo()

    if (existingTeamInfo) {
      console.log("Already logged in as team, redirecting to dashboard")
      window.location.href = "/dashboard"
    } else if (existingJudgeInfo) {
      console.log("Already logged in as judge, redirecting to judge dashboard")
      if ((existingJudgeInfo as any).role === "admin") {
        window.location.href = "/admin"
      } else {
        window.location.href = "/judge"
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (role === "team") {
        // Team login - using fetch directly
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.TEAMS.AUTHENTICATE}`
        console.log("Team login endpoint:", endpoint)

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
          const result = await response.json()
          console.log("Team login response:", result)

          const teamData = result.data
          const teamInfo = {
            teamId: teamData.id,
            teamName: teamData.team_name || teamData.teamName,
            username: teamData.username,
          }

          setTeamInfo(teamInfo)
          window.location.href = "/dashboard"
        } else {
          const errorData = await response.json()
          console.error("Team login error:", errorData)

          // Handle error detail which could be a string or an array of objects
          let errorMessage = "Sai tên đăng nhập hoặc mật khẩu"

          if (errorData.detail) {
            if (typeof errorData.detail === "string") {
              errorMessage = errorData.detail
            } else if (Array.isArray(errorData.detail)) {
              // Join multiple error messages if it's an array
              errorMessage = errorData.detail
                .map((err: any) => {
                  if (typeof err === "string") return err
                  if (err.msg) return err.msg
                  return JSON.stringify(err)
                })
                .join(", ")
            }
          }

          setError(errorMessage)
        }
      } else {
        // Judge/Admin login - using fetch directly with query parameters
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.JUDGES.AUTHENTICATE}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        console.log("Judge login endpoint:", endpoint.replace(password, "********"))

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json()
          console.log("Judge login response:", result)

          const judgeData = result.data
          const judgeInfo = {
            id: judgeData.id,
            fullName: judgeData.full_name,
            username: judgeData.username,
            role: judgeData.role,
          }

          setJudgeInfo(judgeInfo)

          // Redirect based on role
          if (judgeData.role === "admin") {
            window.location.href = "/admin"
          } else {
            window.location.href = "/judge"
          }
        } else {
          const errorData = await response.json()
          console.error("Judge login error:", errorData)

          // Handle error detail which could be a string or an array of objects
          let errorMessage = "Sai tên đăng nhập hoặc mật khẩu"

          if (errorData.detail) {
            if (typeof errorData.detail === "string") {
              errorMessage = errorData.detail
            } else if (Array.isArray(errorData.detail)) {
              // Join multiple error messages if it's an array
              errorMessage = errorData.detail
                .map((err: any) => {
                  if (typeof err === "string") return err
                  if (err.msg) return err.msg
                  return JSON.stringify(err)
                })
                .join(", ")
            } else if (typeof errorData.detail === "object") {
              // If it's an object, convert to string
              errorMessage = JSON.stringify(errorData.detail)
            }
          }

          setError(errorMessage)
        }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Show loading until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  const roleOptions = [
    {
      value: "team",
      label: "Đội thi",
      icon: Users,
      description: "Dành cho các đội tham gia cuộc thi",
    },
    {
      value: "judge",
      label: "Ban giám khảo",
      icon: UserCheck,
      description: "Dành cho ban giám khảo",
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <LogIn className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Đăng nhập AIC 2025
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Chọn vai trò và đăng nhập với tài khoản của bạn
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">Vai trò</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="space-y-3">
                  {roleOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <div
                        key={option.value}
                        className={`relative flex items-start space-x-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                          role === option.value
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${
                              role === option.value
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={option.value} className="text-base font-medium cursor-pointer block">
                              {option.label}
                            </Label>
                            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-medium text-gray-700">
                    Tên đăng nhập
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 text-base"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium text-gray-700">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 text-base pr-12"
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      disabled={loading}
                      suppressHydrationWarning
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Đăng nhập
                  </>
                )}
              </Button>
            </form>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-center">
                <Button variant="outline" asChild className="h-11 px-6 bg-transparent">
                  <Link href="/" className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Về trang chủ
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
