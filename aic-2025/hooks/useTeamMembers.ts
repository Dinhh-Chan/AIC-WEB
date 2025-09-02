"use client"
import { useState, useEffect } from "react"
import { api, API_ENDPOINTS } from "@/lib/api"

export interface TeamMemberWithScore {
  id: number
  full_name: string
  student_code: string
  student_batch: string
  class_code: string
  email: string
  phone: string
  is_leader: boolean
  avatar_url?: string
  average_score: number
  total_scores: number
}

export function useTeamMembers(teamId: number | null) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithScore[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTeamMembers = async () => {
    if (!teamId) return

    setLoading(true)
    setError(null)

    try {
      // Fetch team members
      const membersResponse = await api.get(API_ENDPOINTS.TEAM_MEMBERS.GET_BY_TEAM(teamId))
      
      if (!membersResponse.ok) {
        throw new Error('Không thể tải danh sách thành viên')
      }

      const membersData = await membersResponse.json()
      const members = membersData.data || []

      // Fetch scores for each member
      const membersWithScores = await Promise.all(
        members.map(async (member: any) => {
          try {
            // Get average score for this member in current round
            const scoresResponse = await api.get(
              `/api/v1/member-scores/member/${member.id}/average/round1`
            )
            
            let averageScore = 0
            let totalScores = 0
            
            if (scoresResponse.ok) {
              const scoresData = await scoresResponse.json()
              averageScore = scoresData.data?.average_score || 0
              totalScores = scoresData.data?.total_scores || 0
            }

            return {
              id: member.id,
              full_name: member.full_name,
              student_code: member.student_code,
              student_batch: member.student_batch,
              class_code: member.class_code,
              email: member.email,
              phone: member.phone,
              is_leader: member.is_leader,
              avatar_url: member.avatar_url,
              average_score: averageScore,
              total_scores: totalScores
            }
          } catch (error) {
            console.error(`Error fetching scores for member ${member.id}:`, error)
            return {
              id: member.id,
              full_name: member.full_name,
              student_code: member.student_code,
              student_batch: member.student_batch,
              class_code: member.class_code,
              email: member.email,
              phone: member.phone,
              is_leader: member.is_leader,
              avatar_url: member.avatar_url,
              average_score: 0,
              total_scores: 0
            }
          }
        })
      )

      setTeamMembers(membersWithScores)
    } catch (error: any) {
      console.error('Error fetching team members:', error)
      setError(error.message || 'Có lỗi xảy ra khi tải thông tin thành viên')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [teamId])

  const refetch = () => {
    fetchTeamMembers()
  }

  return {
    teamMembers,
    loading,
    error,
    refetch
  }
}
