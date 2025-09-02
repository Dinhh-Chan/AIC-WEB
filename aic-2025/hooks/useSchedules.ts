"use client"
import { useState, useEffect } from "react"
import { TeamInfo } from "@/lib/auth-client"

interface Schedule {
  id: number
  team_id: number
  round: string
  location: string
  start_time: string
  end_time: string
  description: string
  status: string
}

export function useSchedules(teamInfo: TeamInfo | null) {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch team's schedules
  useEffect(() => {
    async function fetchSchedules() {
      if (!teamInfo) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        // Fetch team's schedules
        const teamResponse = await fetch(`/api/v1/schedules/team/${teamInfo.teamId}`)
        if (!teamResponse.ok) {
          throw new Error('Failed to fetch team schedules')
        }
        const teamData = await teamResponse.json()
        setSchedules(teamData.data || [])

        // Fetch upcoming schedules (next 7 days)
        const upcomingResponse = await fetch('/api/v1/schedules/upcoming?days=7')
        if (!upcomingResponse.ok) {
          throw new Error('Failed to fetch upcoming schedules')
        }
        const upcomingData = await upcomingResponse.json()
        setUpcomingSchedules(upcomingData.data || [])

      } catch (err) {
        console.error('Error fetching schedules:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSchedules()
  }, [teamInfo])

  // Format date for display
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    } catch (e) {
      return 'Không xác định'
    }
  }

  return {
    schedules,
    upcomingSchedules,
    isLoading,
    error,
    formatDateTime
  }
}
