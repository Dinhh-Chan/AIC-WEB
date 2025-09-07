"use client"

import { useState } from "react"
import { JudgeLayout } from "@/components/judge/judge-layout"
import { FileViewer } from "@/components/file-viewer/file-viewer" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, Users, Search, Clock, Star } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

interface Team {
  id: string
  name: string
  school: string
  members: Array<{
    name: string
    role: string
    score?: number
  }>
  status: "active" | "inactive" | "eliminated"
  round: number
  totalScore: number
  submissions: Array<{
    type: "document" | "video" | "presentation" | "image"
    name: string
    url: string
    uploadDate: string
    size?: string
  }>
  nextPresentation?: string
}

function JudgePageContent() {
  const [teams] = useState<Team[]>([
    {
      id: "1",
      name: "AI Innovators",
      school: "Đại học Bách khoa Hà Nội",
      members: [
        { name: "Nguyễn Văn A", role: "Team Leader", score: 88 },
        { name: "Trần Thị B", role: "AI Developer", score: 85 },
        { name: "Lê Văn C", role: "UI/UX Designer", score: 82 },
      ],
      status: "active",
      round: 2,
      totalScore: 85,
      submissions: [
        {
          type: "document",
          name: "Báo cáo ý tưởng vòng 1.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          uploadDate: "2025-03-15",
          size: "2.5 MB",
        },
        {
          type: "video",
          name: "Demo sản phẩm.mp4",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          uploadDate: "2025-03-20",
          size: "15.2 MB",
        },
        {
          type: "presentation",
          name: "Thuyết trình vòng 2.pptx",
          url: "/files/team1-presentation.pptx",
          uploadDate: "2025-04-10",
          size: "8.7 MB",
        },
        {
          type: "image",
          name: "Mockup giao diện.png",
          url: "/ai-app-mockup-interface-design.png",
          uploadDate: "2025-04-05",
          size: "1.2 MB",
        },
      ],
      nextPresentation: "2025-04-25 14:00",
    },
    {
      id: "2",
      name: "Tech Pioneers",
      school: "Đại học Công nghệ",
      members: [
        { name: "Phạm Văn D", role: "Team Leader", score: 80 },
        { name: "Hoàng Thị E", role: "Backend Developer", score: 76 },
      ],
      status: "active",
      round: 2,
      totalScore: 78,
      submissions: [
        {
          type: "document",
          name: "Tài liệu kỹ thuật.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          uploadDate: "2025-03-18",
          size: "3.1 MB",
        },
        {
          type: "video",
          name: "Video giới thiệu.mp4",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          uploadDate: "2025-03-22",
          size: "12.8 MB",
        },
      ],
      nextPresentation: "2025-04-25 15:30",
    },
    {
      id: "3",
      name: "Smart Solutions",
      school: "Đại học Kinh tế Quốc dân",
      members: [
        { name: "Vũ Văn F", role: "Team Leader", score: 70 },
        { name: "Đỗ Thị G", role: "Business Analyst", score: 68 },
        { name: "Bùi Văn H", role: "Developer", score: 62 },
        { name: "Mai Thị I", role: "Designer", score: 60 },
      ],
      status: "eliminated",
      round: 1,
      totalScore: 65,
      submissions: [
        {
          type: "document",
          name: "Kế hoạch kinh doanh.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          uploadDate: "2025-03-12",
          size: "4.2 MB",
        },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.school.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Team["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Đang thi</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>
      case "eliminated":
        return <Badge className="bg-red-100 text-red-800">Bị loại</Badge>
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-red-600" />
      case "video":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "presentation":
        return <FileText className="h-4 w-4 text-orange-600" />
      case "image":
        return <FileText className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Danh sách đội thi
          </h1>
          <p className="text-gray-600 mt-1">Xem thông tin và chấm điểm các đội thi</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm đội thi hoặc trường..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Danh sách đội thi ({filteredTeams.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đội</TableHead>
                <TableHead>Trường</TableHead>
                <TableHead>Thành viên</TableHead>
                <TableHead>Vòng thi</TableHead>
                <TableHead>Điểm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lịch thi</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.school}</TableCell>
                  <TableCell>
                    <div className="text-sm">{team.members.length} thành viên</div>
                  </TableCell>
                  <TableCell>Vòng {team.round}</TableCell>
                  <TableCell className="font-semibold">{team.totalScore}</TableCell>
                  <TableCell>{getStatusBadge(team.status)}</TableCell>
                  <TableCell>
                    {team.nextPresentation ? (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Clock className="h-3 w-3" />
                        {new Date(team.nextPresentation).toLocaleString("vi-VN")}
                      </div>
                    ) : (
                      <span className="text-gray-400">Chưa có lịch</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTeam(team)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{team.name}</DialogTitle>
                          <DialogDescription>{team.school}</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="info" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="info">Thông tin đội</TabsTrigger>
                            <TabsTrigger value="files">Tài liệu nộp</TabsTrigger>
                            <TabsTrigger value="scoring">Chấm điểm</TabsTrigger>
                          </TabsList>

                          <TabsContent value="info" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Users className="h-5 w-5" />
                                  Thành viên đội ({team.members.length})
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {team.members.map((member, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                      <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-gray-600">{member.role}</div>
                                      </div>
                                      {member.score && (
                                        <div className="flex items-center gap-1">
                                          <Star className="h-4 w-4 text-yellow-500" />
                                          <span className="font-semibold">{member.score}</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="files" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <FileText className="h-5 w-5" />
                                  Tài liệu đã nộp ({team.submissions.length})
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {team.submissions.map((file, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                      <div className="flex items-center gap-3">
                                        {getFileIcon(file.type)}
                                        <div>
                                          <div className="font-medium">{file.name}</div>
                                          <div className="text-sm text-gray-600 flex items-center gap-4">
                                            <span>
                                              Nộp ngày: {new Date(file.uploadDate).toLocaleDateString("vi-VN")}
                                            </span>
                                            {file.size && <span>Kích thước: {file.size}</span>}
                                          </div>
                                        </div>
                                      </div>
                                      <FileViewer file={file} />
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="scoring" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Star className="h-5 w-5" />
                                  Chấm điểm đội thi
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Tính sáng tạo (25%)</label>
                                    <Input type="number" min="0" max="100" placeholder="0-100" />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Tính khả thi (30%)</label>
                                    <Input type="number" min="0" max="100" placeholder="0-100" />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Tác động xã hội (25%)</label>
                                    <Input type="number" min="0" max="100" placeholder="0-100" />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Trình bày (20%)</label>
                                    <Input type="number" min="0" max="100" placeholder="0-100" />
                                  </div>
                                </div>
                                <div className="mt-6">
                                  <h4 className="font-medium mb-3">Chấm điểm từng thành viên</h4>
                                  <div className="space-y-3">
                                    {team.members.map((member, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div>
                                          <div className="font-medium">{member.name}</div>
                                          <div className="text-sm text-gray-600">{member.role}</div>
                                        </div>
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          placeholder="0-100"
                                          className="w-20"
                                          defaultValue={member.score}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Lưu điểm
                                  </Button>
                                  <Button variant="outline">Hủy</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function JudgePage() {
  return (
    // <ProtectedRoute allowedRoles={["judge"]}>
      <JudgeLayout activeTab="teams">
        <JudgePageContent />
      </JudgeLayout>
    // {/* </ProtectedRoute> */}
  )
}
