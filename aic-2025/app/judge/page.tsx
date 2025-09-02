"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getJudgeInfo, clearJudgeInfo, type JudgeInfo } from "@/lib/auth-client"

export default function JudgeDashboardPage() {
  const [judgeInfo, setJudgeInfo] = useState<JudgeInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Load judge info on component mount
  useEffect(() => {
    console.log('Judge Dashboard: Loading judge info...') // Debug log
    const info = getJudgeInfo()
    console.log('Judge Dashboard: Judge info from storage:', info) // Debug log
    
    if (!info) {
      console.log('Judge Dashboard: No judge info found, redirecting to login') // Debug log
      // Redirect to login if not authenticated
      router.push("/login")
      return
    }
    
    // Verify role
    if (info.role !== 'judge') {
      console.log('Judge Dashboard: Invalid role, redirecting') // Debug log
      clearJudgeInfo()
      router.push("/login")
      return
    }
    
    console.log('Judge Dashboard: Judge info loaded successfully') // Debug log
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
                Ban Giám Khảo AIC 2025
              </h1>
              <p className="text-gray-600">
                Xin chào, {judgeInfo.fullName}
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
            <h2 className="text-xl font-semibold mb-4">Chấm điểm đội thi</h2>
            <p className="text-gray-600">
              Chấm điểm và đánh giá các bài dự thi của các đội.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Lịch chấm thi</h2>
            <p className="text-gray-600">
              Xem lịch và thời gian chấm thi của bạn.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Thống kê</h2>
            <p className="text-gray-600">
              Xem thống kê và báo cáo về điểm số.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}