"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, UserCheck, Search, Mail, Phone } from "lucide-react"

interface Judge {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  expertise: string[]
  status: "active" | "inactive"
  assignedRounds: number[]
}

function AdminJudgesContent() {
  const [judges, setJudges] = useState<Judge[]>([
    {
      id: "1",
      name: "TS. Nguyễn Văn An",
      email: "nva@university.edu.vn",
      phone: "0901234567",
      organization: "Đại học Bách khoa Hà Nội",
      expertise: ["Machine Learning", "Computer Vision", "NLP"],
      status: "active",
      assignedRounds: [1, 2],
    },
    {
      id: "2",
      name: "PGS. Trần Thị Bình",
      email: "ttb@tech.edu.vn",
      phone: "0912345678",
      organization: "Đại học Công nghệ",
      expertise: ["AI Ethics", "Data Science", "Deep Learning"],
      status: "active",
      assignedRounds: [2, 3],
    },
    {
      id: "3",
      name: "Dr. Lê Văn Cường",
      email: "lvc@research.org",
      phone: "0923456789",
      organization: "Viện Nghiên cứu AI",
      expertise: ["Robotics", "IoT", "Edge Computing"],
      status: "inactive",
      assignedRounds: [1],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingJudge, setEditingJudge] = useState<Judge | null>(null)
  const [newJudge, setNewJudge] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    expertise: "",
    assignedRounds: [] as number[],
  })

  const filteredJudges = judges.filter(
    (judge) =>
      judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSaveJudge = () => {
    const expertiseArray = newJudge.expertise
      .split(",")
      .map((exp) => exp.trim())
      .filter((exp) => exp)

    if (editingJudge) {
      // Update existing judge
      setJudges(
        judges.map((judge) =>
          judge.id === editingJudge.id
            ? {
                ...judge,
                name: newJudge.name,
                email: newJudge.email,
                phone: newJudge.phone,
                organization: newJudge.organization,
                expertise: expertiseArray,
                assignedRounds: newJudge.assignedRounds,
              }
            : judge,
        ),
      )
      setEditingJudge(null)
    } else {
      // Add new judge
      const judge: Judge = {
        id: Date.now().toString(),
        name: newJudge.name,
        email: newJudge.email,
        phone: newJudge.phone,
        organization: newJudge.organization,
        expertise: expertiseArray,
        status: "active",
        assignedRounds: newJudge.assignedRounds,
      }
      setJudges([...judges, judge])
    }

    setNewJudge({
      name: "",
      email: "",
      phone: "",
      organization: "",
      expertise: "",
      assignedRounds: [],
    })
    setIsAddDialogOpen(false)
  }

  const handleEditJudge = (judge: Judge) => {
    setEditingJudge(judge)
    setNewJudge({
      name: judge.name,
      email: judge.email,
      phone: judge.phone,
      organization: judge.organization,
      expertise: judge.expertise.join(", "),
      assignedRounds: judge.assignedRounds,
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteJudge = (judgeId: string) => {
    setJudges(judges.filter((judge) => judge.id !== judgeId))
  }

  const handleToggleStatus = (judgeId: string) => {
    setJudges(
      judges.map((judge) =>
        judge.id === judgeId ? { ...judge, status: judge.status === "active" ? "inactive" : "active" } : judge,
      ),
    )
  }

  const getStatusBadge = (status: Judge["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Tạm dừng</Badge>
    }
  }

  const handleRoundToggle = (round: number) => {
    const updatedRounds = newJudge.assignedRounds.includes(round)
      ? newJudge.assignedRounds.filter((r) => r !== round)
      : [...newJudge.assignedRounds, round]
    setNewJudge({ ...newJudge, assignedRounds: updatedRounds })
  }

  return (
    <AdminLayout activeTab="judges">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quản lý ban giám khảo
            </h1>
            <p className="text-gray-600 mt-1">Thêm, sửa, xóa và quản lý ban giám khảo</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm giám khảo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingJudge ? "Sửa thông tin giám khảo" : "Thêm giám khảo mới"}</DialogTitle>
                <DialogDescription>
                  {editingJudge ? "Cập nhật thông tin giám khảo" : "Nhập thông tin giám khảo mới"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="judge-name">Họ và tên</Label>
                  <Input
                    id="judge-name"
                    value={newJudge.name}
                    onChange={(e) => setNewJudge({ ...newJudge, name: e.target.value })}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newJudge.email}
                    onChange={(e) => setNewJudge({ ...newJudge, email: e.target.value })}
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={newJudge.phone}
                    onChange={(e) => setNewJudge({ ...newJudge, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Tổ chức</Label>
                  <Input
                    id="organization"
                    value={newJudge.organization}
                    onChange={(e) => setNewJudge({ ...newJudge, organization: e.target.value })}
                    placeholder="Nhập tên tổ chức"
                  />
                </div>
                <div>
                  <Label htmlFor="expertise">Chuyên môn (phân cách bằng dấu phẩy)</Label>
                  <Textarea
                    id="expertise"
                    value={newJudge.expertise}
                    onChange={(e) => setNewJudge({ ...newJudge, expertise: e.target.value })}
                    placeholder="VD: Machine Learning, Computer Vision, NLP"
                  />
                </div>
                <div>
                  <Label>Vòng thi được phân công</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3].map((round) => (
                      <Button
                        key={round}
                        type="button"
                        variant={newJudge.assignedRounds.includes(round) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleRoundToggle(round)}
                      >
                        Vòng {round}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    setEditingJudge(null)
                    setNewJudge({
                      name: "",
                      email: "",
                      phone: "",
                      organization: "",
                      expertise: "",
                      assignedRounds: [],
                    })
                  }}
                >
                  Hủy
                </Button>
                <Button onClick={handleSaveJudge}>{editingJudge ? "Cập nhật" : "Thêm giám khảo"}</Button>
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
                placeholder="Tìm kiếm giám khảo, tổ chức hoặc chuyên môn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Judges Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Danh sách ban giám khảo ({filteredJudges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Tổ chức</TableHead>
                  <TableHead>Chuyên môn</TableHead>
                  <TableHead>Vòng thi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJudges.map((judge) => (
                  <TableRow key={judge.id}>
                    <TableCell className="font-medium">{judge.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {judge.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {judge.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{judge.organization}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {judge.expertise.slice(0, 2).map((exp, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                        {judge.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{judge.expertise.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {judge.assignedRounds.map((round) => (
                          <Badge key={round} className="bg-blue-100 text-blue-800 text-xs">
                            V{round}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(judge.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditJudge(judge)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(judge.id)}
                          className={judge.status === "active" ? "text-yellow-600" : "text-green-600"}
                        >
                          {judge.status === "active" ? "Tạm dừng" : "Kích hoạt"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteJudge(judge.id)}
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

export default function AdminJudgesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminJudgesContent />
    </ProtectedRoute>
  )
}
