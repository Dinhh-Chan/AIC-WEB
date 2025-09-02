"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type UserRole = "admin" | "judge" | "team"

interface LoginCredentials {
  admin: { username: string; password: string }
  judge: { username: string; password: string }
  team: { username: string; password: string }
}

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<UserRole>("team")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials for different roles
  const credentials: LoginCredentials = {
    admin: { username: "admin", password: "admin123" },
    judge: { username: "judge", password: "judge123" },
    team: { username: "team", password: "team123" },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const roleCredentials = credentials[role]

    if (username === roleCredentials.username && password === roleCredentials.password) {
      // Store user info in localStorage (in real app, use proper auth)
      localStorage.setItem("user", JSON.stringify({ username, role }))

      // Redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin/teams")
          break
        case "judge":
          router.push("/judge")
          break
        case "team":
          router.push("/dashboard")
          break
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }

    setIsLoading(false)
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Quản trị viên"
      case "judge":
        return "Ban giám khảo"
      case "team":
        return "Đội thi"
    }
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Quản lý đội thi, ban giám khảo và lịch trình"
      case "judge":
        return "Chấm điểm và đánh giá các đội thi"
      case "team":
        return "Nộp bài thi và xem kết quả"
    }
  }

  const getDemoCredentials = (role: UserRole) => {
    return credentials[role]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang chủ
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aic%20robot%202025-vUOQbNQE5Vp7TFR6mYDr5H5H6GODiv.webp"
              alt="AIC Robot 2025"
              width={60}
              height={60}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Đăng nhập AIC 2025
          </h1>
          <p className="text-gray-600 mt-2">Chọn vai trò và đăng nhập vào hệ thống</p>
        </div>

        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="space-y-4">
            <div>
              <Label htmlFor="role" className="text-base font-medium">
                Vai trò
              </Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team">Đội thi</SelectItem>
                  <SelectItem value="judge">Ban giám khảo</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-center">
              <CardTitle className="text-xl">{getRoleLabel(role)}</CardTitle>
              <CardDescription className="mt-1">{getRoleDescription(role)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Đang đăng nhập..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </>
                )}
              </Button>
            </form>

            {/* Demo credentials info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Thông tin đăng nhập demo:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>
                  <strong>Tên đăng nhập:</strong> {getDemoCredentials(role).username}
                </div>
                <div>
                  <strong>Mật khẩu:</strong> {getDemoCredentials(role).password}
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Đây là thông tin đăng nhập demo cho mục đích trình diễn</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Cần hỗ trợ?{" "}
            <a href="mailto:support@aic2025.vn" className="text-blue-600 hover:text-blue-700">
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
