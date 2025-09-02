"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api"
import { getTeamInfo, setTeamInfo, getJudgeInfo, setJudgeInfo, type TeamInfo, type JudgeInfo } from "@/lib/auth-client"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type UserRole = 'team' | 'judge' | 'admin'

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>('team')
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
      if (existingJudgeInfo.role === 'admin') {
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
      if (role === 'team') {
        // Team login - using fetch directly
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.TEAMS.AUTHENTICATE}`
        console.log("Team login endpoint:", endpoint)
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })

        if (response.ok) {
          const result = await response.json()
          console.log("Team login response:", result)
          
          const teamData = result.data
          const teamInfo: TeamInfo = {
            teamId: teamData.id,
            teamName: teamData.team_name || teamData.teamName,
            username: teamData.username
          }
          
          setTeamInfo(teamInfo)
          window.location.href = "/dashboard"
          
        } else {
          const errorData = await response.json()
          console.error("Team login error:", errorData)
          
          // Handle error detail which could be a string or an array of objects
          let errorMessage = "Sai tên đăng nhập hoặc mật khẩu"
          
          if (errorData.detail) {
            if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail
            } else if (Array.isArray(errorData.detail)) {
              // Join multiple error messages if it's an array
              errorMessage = errorData.detail
                .map((err: any) => {
                  if (typeof err === 'string') return err
                  if (err.msg) return err.msg
                  return JSON.stringify(err)
                })
                .join(', ')
            }
          }
          
          setError(errorMessage)
        }
      } else {
        // Judge/Admin login - using fetch directly with query parameters
        // Based on the API definition, username and password should be sent as query parameters
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.JUDGES.AUTHENTICATE}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        console.log("Judge login endpoint:", endpoint.replace(password, "********"))
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const result = await response.json()
          console.log("Judge login response:", result)
          
          const judgeData = result.data
          const judgeInfo: JudgeInfo = {
            id: judgeData.id,
            fullName: judgeData.full_name,
            username: judgeData.username,
            role: judgeData.role
          }
          
          setJudgeInfo(judgeInfo)
          
          // Redirect based on role
          if (judgeData.role === 'admin') {
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
            if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail
            } else if (Array.isArray(errorData.detail)) {
              // Join multiple error messages if it's an array
              errorMessage = errorData.detail
                .map((err: any) => {
                  if (typeof err === 'string') return err
                  if (err.msg) return err.msg
                  return JSON.stringify(err)
                })
                .join(', ')
            } else if (typeof errorData.detail === 'object') {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Đăng nhập AIC 2025
            </CardTitle>
            <CardDescription>
              Đăng nhập với tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Vai trò</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Đội thi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="judge" id="judge" />
                    <Label htmlFor="judge">Ban giám khảo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  suppressHydrationWarning
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pr-10"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                    suppressHydrationWarning
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}