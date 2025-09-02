"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getTeamInfo, clearTeamInfo, type TeamInfo } from "@/lib/auth-client"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardTabs from "@/components/dashboard/DashboardTabs"
import { mockAllTeams } from "@/lib/types/dashboard"
import { useSubmission } from "@/hooks/useSubmission"
import { useSchedules } from "@/hooks/useSchedules"

export default function DashboardPage() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Custom hooks
  const { 
    submissionLoading, 
    currentSubmission, 
    isLoading: isSubmissionLoading, 
    handleSubmissionSubmit 
  } = useSubmission(teamInfo)

  const {
    schedules,
    upcomingSchedules,
    isLoading: isSchedulesLoading,
    error: schedulesError,
    formatDateTime
  } = useSchedules(teamInfo)
  
  // Load team info on component mount
  useEffect(() => {
    console.log('Dashboard: Loading team info...') // Debug log
    const info = getTeamInfo()
    console.log('Dashboard: Team info from storage:', info) // Debug log
    
    if (!info) {
      console.log('Dashboard: No team info found, redirecting to login') // Debug log
      // Redirect to login if not authenticated
      router.push("/login")
      return
    }
    
    console.log('Dashboard: Team info loaded successfully') // Debug log
    setTeamInfo(info)
    setLoading(false)
  }, [router])
  
  // Handle logout
  const handleLogout = () => {
    clearTeamInfo()
    router.push("/login")
  }
  
  // Show loading while team info is being loaded
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

  // Ensure teamInfo is not null for components
  if (!teamInfo) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <DashboardHeader teamInfo={teamInfo} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Xin chào, {teamInfo.teamName}!
          </h1>
          <p className="text-xl text-gray-600">
            {currentSubmission 
              ? "Bạn đã nộp bài thi. Bạn có thể chỉnh sửa bài nộp của mình." 
              : "Quản lý thông tin đội thi và nộp bài thi AIC 2025"}
          </p>
        </div>

        <DashboardTabs
          teamInfo={teamInfo}
          onSubmissionSubmit={handleSubmissionSubmit}
          submissionLoading={submissionLoading}
          currentSubmission={currentSubmission}
          isSubmissionLoading={isSubmissionLoading}
          allTeams={mockAllTeams}
          schedules={schedules}
          upcomingSchedules={upcomingSchedules}
          isSchedulesLoading={isSchedulesLoading}
          schedulesError={schedulesError}
          formatDateTime={formatDateTime}
        />
      </div>
    </div>
  )
}