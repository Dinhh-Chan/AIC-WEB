"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Users, Trophy, FileText, Calendar } from "lucide-react"
import SubmissionForm from "./SubmissionForm"
import TeamMembersTab from "./TeamMembersTab"
import RankingsTab from "./RankingsTab"
import SchedulesTab from "./SchedulesTab"
import { TeamInfo } from "@/lib/auth-client"
import { useTeamMembers } from "@/hooks/useTeamMembers"

interface Team {
  rank: number
  name: string
  members: number
  totalScore: number
  avgScore: number
  status: string
}

interface Submission {
  id: number
  team_id: number
  project_title: string
  description: string
  technology: string
  report_file?: string
  slide_file?: string
  video_url?: string
  source_code_url?: string
  status_submission: string
  submitted_at: string
}

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

interface DashboardTabsProps {
  teamInfo: TeamInfo
  onSubmissionSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  submissionLoading: boolean
  currentSubmission: Submission | null
  isSubmissionLoading: boolean
  allTeams: Team[]
  schedules: Schedule[]
  upcomingSchedules: Schedule[]
  isSchedulesLoading: boolean
  schedulesError: string | null
  formatDateTime: (date: string) => string
}

export default function DashboardTabs({ 
  teamInfo, 
  onSubmissionSubmit, 
  submissionLoading, 
  currentSubmission,
  isSubmissionLoading,
  allTeams,
  schedules,
  upcomingSchedules,
  isSchedulesLoading,
  schedulesError,
  formatDateTime
}: DashboardTabsProps) {
  // Fetch team members with scores
  const { teamMembers, loading: membersLoading, error: membersError, refetch } = useTeamMembers(teamInfo.teamId)
  
  return (
    <Tabs defaultValue="submission" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="submission" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {currentSubmission ? 'Chỉnh sửa bài nộp' : 'Nộp bài thi'}
        </TabsTrigger>
        <TabsTrigger value="team" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Thành viên đội
        </TabsTrigger>
        <TabsTrigger value="schedules" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Lịch thi
        </TabsTrigger>
        <TabsTrigger value="rankings" className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Bảng xếp hạng
        </TabsTrigger>
      </TabsList>

      <TabsContent value="submission">
        <SubmissionForm 
          teamInfo={teamInfo}
          onSubmit={onSubmissionSubmit}
          loading={submissionLoading}
          currentSubmission={currentSubmission}
          isLoading={isSubmissionLoading}
        />
      </TabsContent>

      <TabsContent value="team">
        <TeamMembersTab 
          teamMembers={teamMembers} 
          loading={membersLoading}
          error={membersError}
          onRefresh={refetch}
        />
      </TabsContent>

      <TabsContent value="schedules">
        <SchedulesTab 
          schedules={schedules}
          upcomingSchedules={upcomingSchedules}
          isLoading={isSchedulesLoading}
          error={schedulesError}
          formatDateTime={formatDateTime}
        />
      </TabsContent>

      <TabsContent value="rankings">
        <RankingsTab allTeams={allTeams} />
      </TabsContent>
    </Tabs>
  )
}