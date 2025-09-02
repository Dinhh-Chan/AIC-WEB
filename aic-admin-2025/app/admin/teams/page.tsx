"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Users, Search } from "lucide-react"

interface Team {
  id: string
  name: string
  school: string
  members: string[]
  status: "active" | "inactive" | "eliminated"
  round: number
  score: number
}

function AdminTeamsContent() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "AI Innovators",
      school: "Đại học Bách khoa Hà Nội",
      members: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"],
      status: "active",
      round: 2,
      score: 85,
    },
    {
      id: "2",
      name: "Tech Pioneers",
      school: "Đại học Công nghệ",
      members: ["Phạm Văn D", "Hoàng Thị E"],
      status: "active",
      round: 2,
      score: 78,
    },
    {
      id: "3",
      name: "Smart Solutions",
      school: "Đại học Kinh tế Quốc dân",
      members: ["Vũ Văn F", "Đỗ Thị G", "Bùi Văn H", "Mai Thị I"],
      status: "eliminated",
      round: 1,
      score: 65,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [newTeam, setNewTeam] = useState({
    name: "",
    school: "",
    members: [""],
  })

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.school.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMember = () => {
    setNewTeam({ ...newTeam, members: [...newTeam.members, ""] })
  }

  const handleRemoveMember = (index: number) => {
    const updatedMembers = newTeam.members.filter((_, i) => i !== index)
    setNewTeam({ ...newTeam, members: updatedMembers })
  }

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...newTeam.members]
    updatedMembers[index] = value
    setNewTeam({ ...newTeam, members: updatedMembers })
  }

  const handleSaveTeam = () => {
    if (editingTeam) {
      // Update existing team
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id
            ? { ...team, name: newTeam.name, school: newTeam.school, members: newTeam.members.filter((m) => m.trim()) }
            : team,
        ),
      )
      setEditingTeam(null)
    } else {
      // Add new team
      const team: Team = {
        id: Date.now().toString(),
        name: newTeam.name,
        school: newTeam.school,
        members: newTeam.members.filter((m) => m.trim()),
        status: "active",
        round: 1,
        score: 0,
      }
      setTeams([...teams, team])
    }
    setNewTeam({ name: "", school: "", members: [""] })
    setIsAddDialogOpen(false)
  }

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team)
    setNewTeam({
      name: team.name,
      school: team.school,
      members: [...team.members, ""],
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId))
  }

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

  return (
    <AdminLayout activeTab="teams">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quản lý đội thi
            </h1>
            <p className="text-gray-600 mt-1">Thêm, sửa, xóa và quản lý các đội thi</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm đội thi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingTeam ? "Sửa đội thi" : "Thêm đội thi mới"}</DialogTitle>
                <DialogDescription>
                  {editingTeam ? "Cập nhật thông tin đội thi" : "Nhập thông tin đội thi mới"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team-name">Tên đội</Label>
                  <Input
                    id="team-name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    placeholder="Nhập tên đội thi"
                  />
                </div>
                <div>
                  <Label htmlFor="school">Trường học</Label>
                  <Input
                    id="school"
                    value={newTeam.school}
                    onChange={(e) => setNewTeam({ ...newTeam, school: e.target.value })}
                    placeholder="Nhập tên trường"
                  />
                </div>
                <div>
                  <Label>Thành viên đội (2-4 người)</Label>
                  {newTeam.members.map((member, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        placeholder={`Thành viên ${index + 1}`}
                      />
                      {newTeam.members.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveMember(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {newTeam.members.length < 4 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddMember}
                      className="mt-2 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thành viên
                    </Button>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    setEditingTeam(null)
                    setNewTeam({ name: "", school: "", members: [""] })
                  }}
                >
                  Hủy
                </Button>
                <Button onClick={handleSaveTeam}>{editingTeam ? "Cập nhật" : "Thêm đội"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.school}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {team.members.slice(0, 2).join(", ")}
                        {team.members.length > 2 && ` +${team.members.length - 2} khác`}
                      </div>
                    </TableCell>
                    <TableCell>Vòng {team.round}</TableCell>
                    <TableCell className="font-semibold">{team.score}</TableCell>
                    <TableCell>{getStatusBadge(team.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTeam(team)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeam(team.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default function AdminTeamsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminTeamsContent />
    </ProtectedRoute>
  )
}
