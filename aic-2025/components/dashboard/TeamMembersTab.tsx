"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, Crown, Mail, Phone, User } from "lucide-react"
import { TeamMemberWithScore } from "@/hooks/useTeamMembers"

interface TeamMembersTabProps {
  teamMembers: TeamMemberWithScore[]
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export default function TeamMembersTab({ teamMembers, loading, error, onRefresh }: TeamMembersTabProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
            <Users className="w-6 h-6" />
            Thông tin thành viên đội
          </CardTitle>
          <CardDescription>Đang tải thông tin thành viên...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
            <Users className="w-6 h-6" />
            Thông tin thành viên đội
          </CardTitle>
          <CardDescription>Có lỗi xảy ra khi tải thông tin thành viên</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (teamMembers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
            <Users className="w-6 h-6" />
            Thông tin thành viên đội
          </CardTitle>
          <CardDescription>Chưa có thành viên nào trong đội</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">Đội chưa có thành viên nào.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalScore = teamMembers.reduce((sum, member) => sum + member.average_score, 0)
  const averageScore = teamMembers.length > 0 ? (totalScore / teamMembers.length).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
          <Users className="w-6 h-6" />
          Thông tin thành viên đội
        </CardTitle>
        <CardDescription>Danh sách các thành viên trong đội và điểm số hiện tại</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className={`border-l-4 ${member.is_leader ? 'border-l-yellow-500' : 'border-l-blue-500'}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{member.full_name}</h3>
                      {member.is_leader && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Crown className="w-3 h-3 mr-1" />
                          Trưởng nhóm
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">MSSV: {member.student_code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Lớp: {member.student_batch}{member.class_code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-purple-600">
                        {member.average_score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Điểm trung bình</p>
                    {member.total_scores > 0 && (
                      <p className="text-xs text-gray-400">
                        Tổng: {member.total_scores.toFixed(1)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Điểm trung bình đội</h3>
              <p className="text-sm text-gray-600">
                Tổng điểm: {totalScore.toFixed(1)} | Số thành viên: {teamMembers.length}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {averageScore}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
