"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getJudgeInfo, clearJudgeInfo, type JudgeInfo } from "@/lib/auth-client"

export default function AdminDashboardPage() {
  const [judgeInfo, setJudgeInfo] = useState<JudgeInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Load judge info on component mount
  useEffect(() => {
    console.log('Admin Dashboard: Loading judge info...') // Debug log
    const info = getJudgeInfo()
    console.log('Admin Dashboard: Judge info from storage:', info) // Debug log
    
    if (!info) {
      console.log('Admin Dashboard: No judge info found, redirecting to login') // Debug log
      // Redirect to login if not authenticated
      router.push("/login")
      return
    }
    
    // Verify role
    if (info.role !== 'admin') {
      console.log('Admin Dashboard: Invalid role, redirecting') // Debug log
      clearJudgeInfo()
      router.push("/login")
      return
    }
    
    console.log('Admin Dashboard: Admin info loaded successfully') // Debug log
    setJudgeInfo(info)
    setLoading(false)
  }, [router])
  
  // Handle logout
  const handleLogout = () => {
    clearJudgeInfo()
    router.push("/login")
  }
  
  // Show loading while judge info is being loaded
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Ensure judgeInfo is not null for components
  if (!judgeInfo) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard AIC 2025
              </h1>
              <p className="text-gray-600">
                Xin chào, {judgeInfo.fullName} (Admin)
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards - replace with actual functionality */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quản lý đội thi</h2>
            <p className="text-gray-600">
              Xem và quản lý thông tin các đội thi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quản lý giám khảo</h2>
            <p className="text-gray-600">
              Thêm, sửa, xóa thông tin giám khảo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Lịch thi đấu</h2>
            <p className="text-gray-600">
              Quản lý lịch thi đấu và phân công giám khảo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bảng xếp hạng</h2>
            <p className="text-gray-600">
              Xem bảng xếp hạng và điểm số của các đội.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Cài đặt hệ thống</h2>
            <p className="text-gray-600">
              Quản lý các cài đặt hệ thống.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Báo cáo & Thống kê</h2>
            <p className="text-gray-600">
              Xem báo cáo và thống kê về cuộc thi.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
