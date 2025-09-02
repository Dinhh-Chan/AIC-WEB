export interface TeamMember {
  id: number
  name: string
  role: string
  university: string
  score: number
}

export interface Team {
  rank: number
  name: string
  members: number
  totalScore: number
  avgScore: number
  status: string
}

export const mockTeamMembers: TeamMember[] = [
  { id: 1, name: "Nguyễn Văn A", role: "Team Leader", university: "PTIT", score: 85 },
  { id: 2, name: "Trần Thị B", role: "AI Developer", university: "IU", score: 92 },
  { id: 3, name: "Lê Văn C", role: "Frontend Developer", university: "RIPT", score: 78 },
  { id: 4, name: "Phạm Thị D", role: "Data Scientist", university: "PTIT", score: 88 },
]

export const mockAllTeams: Team[] = [
  { rank: 1, name: "AI Innovators", members: 4, totalScore: 345, avgScore: 86.25, status: "Vòng 2" },
  { rank: 2, name: "Tech Pioneers", members: 3, totalScore: 312, avgScore: 84.0, status: "Vòng 2" },
  { rank: 3, name: "Smart Solutions", members: 4, totalScore: 298, avgScore: 74.5, status: "Vòng 1" },
  { rank: 4, name: "Future Builders", members: 3, totalScore: 285, avgScore: 71.25, status: "Vòng 1" },
  { rank: 5, name: "Code Masters", members: 4, totalScore: 276, avgScore: 69.0, status: "Vòng 1" },
]
