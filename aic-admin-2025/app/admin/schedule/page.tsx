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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, Users } from "lucide-react"

interface ScheduleEvent {
  id: string
  teamId: string
  teamName: string
  school: string
  date: string
  time: string
  duration: number
  room: string
  round: number
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

interface Team {
  id: string
  name: string
  school: string
  round: number
  status: "active" | "inactive" | "eliminated"
}

function AdminScheduleContent() {
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      teamId: "1",
      teamName: "AI Innovators",
      school: "Đại học Bách khoa Hà Nội",
      date: "2025-04-25",
      time: "14:00",
      duration: 30,
      room: "Phòng A101",
      round: 2,
      status: "scheduled",
      notes: "Chuẩn bị projector và micro",
    },
    {
      id: "2",
      teamId: "2",
      teamName: "Tech Pioneers",
      school: "Đại học Công nghệ",
      date: "2025-04-25",
      time: "15:30",
      duration: 30,
      room: "Phòng A101",
      round: 2,
      status: "scheduled",
    },
    {
      id: "3",
      teamId: "3",
      teamName: "Smart Solutions",
      school: "Đại học Kinh tế Quốc dân",
      date: "2025-04-24",
      time: "10:00",
      duration: 30,
      room: "Phòng A102",
      round: 1,
      status: "completed",
    },
  ])

  const [teams] = useState<Team[]>([
    { id: "1", name: "AI Innovators", school: "Đại học Bách khoa Hà Nội", round: 2, status: "active" },
    { id: "2", name: "Tech Pioneers", school: "Đại học Công nghệ", round: 2, status: "active" },
    { id: "3", name: "Smart Solutions", school: "Đại học Kinh tế Quốc dân", round: 1, status: "eliminated" },
    { id: "4", name: "Future Builders", school: "Đại học Quốc gia", round: 2, status: "active" },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null)
  const [newEvent, setNewEvent] = useState({
    teamId: "",
    date: "",
    time: "",
    duration: 30,
    room: "",
    round: 1,
    notes: "",
  })

  const rooms = ["Phòng A101", "Phòng A102", "Phòng A103", "Phòng B201", "Phòng B202"]
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  const getStatusBadge = (status: ScheduleEvent["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>
    }
  }

  const handleSaveEvent = () => {
    const selectedTeam = teams.find((t) => t.id === newEvent.teamId)
    if (!selectedTeam) return

    if (editingEvent) {
      // Update existing event
      setScheduleEvents((events) =>
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                teamId: newEvent.teamId,
                teamName: selectedTeam.name,
                school: selectedTeam.school,
                date: newEvent.date,
                time: newEvent.time,
                duration: newEvent.duration,
                room: newEvent.room,
                round: newEvent.round,
                notes: newEvent.notes,
              }
            : event,
        ),
      )
      setEditingEvent(null)
    } else {
      // Add new event
      const event: ScheduleEvent = {
        id: Date.now().toString(),
        teamId: newEvent.teamId,
        teamName: selectedTeam.name,
        school: selectedTeam.school,
        date: newEvent.date,
        time: newEvent.time,
        duration: newEvent.duration,
        room: newEvent.room,
        round: newEvent.round,
        status: "scheduled",
        notes: newEvent.notes,
      }
      setScheduleEvents([...scheduleEvents, event])
    }

    setNewEvent({
      teamId: "",
      date: "",
      time: "",
      duration: 30,
      room: "",
      round: 1,
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditEvent = (event: ScheduleEvent) => {
    setEditingEvent(event)
    setNewEvent({
      teamId: event.teamId,
      date: event.date,
      time: event.time,
      duration: event.duration,
      room: event.room,
      round: event.round,
      notes: event.notes || "",
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    setScheduleEvents((events) => events.filter((event) => event.id !== eventId))
  }

  const handleStatusChange = (eventId: string, newStatus: ScheduleEvent["status"]) => {
    setScheduleEvents((events) =>
      events.map((event) => (event.id === eventId ? { ...event, status: newStatus } : event)),
    )
  }

  const todayEvents = scheduleEvents.filter((event) => event.date === new Date().toISOString().split("T")[0])
  const upcomingEvents = scheduleEvents.filter((event) => new Date(event.date) > new Date())
  const completedEvents = scheduleEvents.filter((event) => event.status === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quản lý lịch thi
          </h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý lịch trình các đội thi</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch thi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Sửa lịch thi" : "Thêm lịch thi mới"}</DialogTitle>
              <DialogDescription>
                {editingEvent ? "Cập nhật thông tin lịch thi" : "Tạo lịch thi cho đội"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="team">Đội thi</Label>
                <Select value={newEvent.teamId} onValueChange={(value) => setNewEvent({ ...newEvent, teamId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đội thi" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams
                      .filter((team) => team.status === "active")
                      .map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name} - {team.school}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Ngày thi</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Giờ thi</Label>
                  <Select value={newEvent.time} onValueChange={(value) => setNewEvent({ ...newEvent, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Thời lượng (phút)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    max="120"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="round">Vòng thi</Label>
                  <Select
                    value={newEvent.round.toString()}
                    onValueChange={(value) => setNewEvent({ ...newEvent, round: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Vòng 1</SelectItem>
                      <SelectItem value="2">Vòng 2</SelectItem>
                      <SelectItem value="3">Vòng 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="room">Phòng thi</Label>
                <Select value={newEvent.room} onValueChange={(value) => setNewEvent({ ...newEvent, room: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú thêm (tùy chọn)"
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setEditingEvent(null)
                  setNewEvent({
                    teamId: "",
                    date: "",
                    time: "",
                    duration: 30,
                    room: "",
                    round: 1,
                    notes: "",
                  })
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleSaveEvent}>{editingEvent ? "Cập nhật" : "Thêm lịch"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Hôm nay ({todayEvents.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Sắp tới ({upcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành ({completedEvents.length})</TabsTrigger>
          <TabsTrigger value="all">Tất cả ({scheduleEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lịch thi hôm nay
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không có lịch thi nào hôm nay</p>
              ) : (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{event.time}</div>
                          <div className="text-sm text-gray-500">{event.duration} phút</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{event.teamName}</h3>
                          <p className="text-gray-600">{event.school}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.room}
                            </div>
                            <Badge variant="outline">Vòng {event.round}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Lịch thi sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không có lịch thi sắp tới</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {new Date(event.date).toLocaleDateString("vi-VN")}
                          </div>
                          <div className="text-sm text-gray-500">{event.time}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{event.teamName}</h3>
                          <p className="text-gray-600">{event.school}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.room}
                            </div>
                            <Badge variant="outline">Vòng {event.round}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Đã hoàn thành
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Đội thi</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Giờ</TableHead>
                    <TableHead>Phòng</TableHead>
                    <TableHead>Vòng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.teamName}</div>
                          <div className="text-sm text-gray-600">{event.school}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell>{event.time}</TableCell>
                      <TableCell>{event.room}</TableCell>
                      <TableCell>Vòng {event.round}</TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
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
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tất cả lịch thi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Đội thi</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Giờ</TableHead>
                    <TableHead>Phòng</TableHead>
                    <TableHead>Vòng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.teamName}</div>
                          <div className="text-sm text-gray-600">{event.school}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell>{event.time}</TableCell>
                      <TableCell>{event.room}</TableCell>
                      <TableCell>Vòng {event.round}</TableCell>
                      <TableCell>
                        <Select
                          value={event.status}
                          onValueChange={(value: ScheduleEvent["status"]) => handleStatusChange(event.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AdminSchedulePage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout activeTab="schedule">
        <AdminScheduleContent />
      </AdminLayout>
    </ProtectedRoute>
  )
}
