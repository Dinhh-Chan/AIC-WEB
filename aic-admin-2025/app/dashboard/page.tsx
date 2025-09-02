"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Users, Trophy, FileText, Star, Medal, Crown, LogOut } from "lucide-react"
import Link from "next/link"

function TeamDashboardContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Mock data for team members
  const teamMembers = [
    { id: 1, name: "Nguyễn Văn A", role: "Team Leader", university: "PTIT", score: 85 },
    { id: 2, name: "Trần Thị B", role: "AI Developer", university: "IU", score: 92 },
    { id: 3, name: "Lê Văn C", role: "Frontend Developer", university: "RIPT", score: 78 },
    { id: 4, name: "Phạm Thị D", role: "Data Scientist", university: "PTIT", score: 88 },
  ]

  // Mock data for all teams
  const allTeams = [
    { rank: 1, name: "AI Innovators", members: 4, totalScore: 345, avgScore: 86.25, status: "Vòng 2" },
    { rank: 2, name: "Tech Pioneers", members: 3, totalScore: 312, avgScore: 84.0, status: "Vòng 2" },
    { rank: 3, name: "Smart Solutions", members: 4, totalScore: 298, avgScore: 74.5, status: "Vòng 1" },
    { rank: 4, name: "Future Builders", members: 3, totalScore: 285, avgScore: 71.25, status: "Vòng 1" },
    { rank: 5, name: "Code Masters", members: 4, totalScore: 276, avgScore: 69.0, status: "Vòng 1" },
  ]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    alert("Bài thi đã được nộp thành công!")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AIC 2025 Dashboard
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-800">Đội thi</Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Đội Thi
          </h1>
          <p className="text-xl text-gray-600">Quản lý thông tin đội thi và nộp bài thi AIC 2025</p>
        </div>

        <Tabs defaultValue="submission" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submission" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Nộp bài thi
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Thành viên đội
            </TabsTrigger>
            <TabsTrigger value="rankings" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Bảng xếp hạng
            </TabsTrigger>
          </TabsList>

          {/* Submission Form Tab */}
          <TabsContent value="submission">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
                  <FileText className="w-6 h-6" />
                  Nộp bài thi Vòng 1
                </CardTitle>
                <CardDescription>Nộp ý tưởng và tài liệu cho vòng thi đầu tiên. Hạn nộp: 30/04/2025</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Tên đội thi</Label>
                      <Input id="teamName" placeholder="Nhập tên đội thi" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Tên dự án</Label>
                      <Input id="projectTitle" placeholder="Nhập tên dự án AI" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả ý tưởng</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết ý tưởng AI của bạn (tối thiểu 200 từ)"
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technology">Công nghệ sử dụng</Label>
                    <Input id="technology" placeholder="VD: Python, TensorFlow, OpenAI API..." required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Tài liệu đính kèm</Label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-gray-600">Kéo thả file hoặc click để chọn</p>
                        <p className="text-sm text-gray-500">PDF, DOC, PPT (tối đa 10MB)</p>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="fileInput"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("fileInput")?.click()}
                        >
                          Chọn file
                        </Button>
                      </div>
                      {selectedFile && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">Đã chọn: {selectedFile.name}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Nộp bài thi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
                  <Users className="w-6 h-6" />
                  Thông tin thành viên đội
                </CardTitle>
                <CardDescription>Danh sách các thành viên trong đội và điểm số cá nhân</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <p className="text-sm text-blue-600">{member.university}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-2xl font-bold text-purple-600">{member.score}</span>
                            </div>
                            <p className="text-sm text-gray-500">Điểm cá nhân</p>
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
                        Tổng điểm: {teamMembers.reduce((sum, member) => sum + member.score, 0)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {(teamMembers.reduce((sum, member) => sum + member.score, 0) / teamMembers.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rankings Tab */}
          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
                  <Trophy className="w-6 h-6" />
                  Bảng xếp hạng các đội thi
                </CardTitle>
                <CardDescription>Thứ hạng hiện tại của tất cả các đội tham gia AIC 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Hạng</TableHead>
                      <TableHead>Tên đội</TableHead>
                      <TableHead className="text-center">Thành viên</TableHead>
                      <TableHead className="text-center">Tổng điểm</TableHead>
                      <TableHead className="text-center">Điểm TB</TableHead>
                      <TableHead className="text-center">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allTeams.map((team) => (
                      <TableRow
                        key={team.rank}
                        className={team.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {team.rank === 1 && <Crown className="w-5 h-5 text-yellow-500" />}
                            {team.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                            {team.rank === 3 && <Medal className="w-5 h-5 text-orange-500" />}
                            {team.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{team.name}</TableCell>
                        <TableCell className="text-center">{team.members}</TableCell>
                        <TableCell className="text-center font-bold text-purple-600">{team.totalScore}</TableCell>
                        <TableCell className="text-center">{team.avgScore}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={team.status === "Vòng 2" ? "default" : "secondary"}
                            className={team.status === "Vòng 2" ? "bg-green-100 text-green-800" : ""}
                          >
                            {team.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["team"]}>
      <TeamDashboardContent />
    </ProtectedRoute>
  )
}
