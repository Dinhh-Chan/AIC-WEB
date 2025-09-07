"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { JudgeLayout } from "@/components/judge/judge-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin } from "lucide-react"

interface ScheduleEvent {
  id: string
  teamName: string
  school: string
  time: string
  duration: number
  room: string
  round: number
  status: "upcoming" | "current" | "completed"
}

function JudgeScheduleContent() {
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: "1",
      teamName: "AI Innovators",
      school: "Đại học Bách khoa Hà Nội",
      time: "2025-04-25 14:00",
      duration: 30,
      room: "Phòng A101",
      round: 2,
      status: "current",
    },
    {
      id: "2",
      teamName: "Tech Pioneers",
      school: "Đại học Công nghệ",
      time: "2025-04-25 15:30",
      duration: 30,
      room: "Phòng A101",
      round: 2,
      status: "upcoming",
    },
    {
      id: "3",
      teamName: "Future Builders",
      school: "Đại học Quốc gia",
      time: "2025-04-25 16:00",
      duration: 30,
      room: "Phòng A102",
      round: 2,
      status: "upcoming",
    },
    {
      id: "4",
      teamName: "Smart Solutions",
      school: "Đại học Kinh tế Quốc dân",
      time: "2025-04-25 12:30",
      duration: 30,
      room: "Phòng A101",
      round: 1,
      status: "completed",
    },
  ]

  const getStatusBadge = (status: ScheduleEvent["status"]) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-100 text-green-800">Đang diễn ra</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Sắp tới</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Đã hoàn thành</Badge>
    }
  }

  const currentEvent = scheduleEvents.find((event) => event.status === "current")
  const upcomingEvents = scheduleEvents.filter((event) => event.status === "upcoming")
  const completedEvents = scheduleEvents.filter((event) => event.status === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lịch thi hôm nay
        </h1>
        <p className="text-gray-600 mt-1">Theo dõi lịch trình các đội thi</p>
      </div>

      {/* Current Event */}
      {currentEvent && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Clock className="h-5 w-5" />
              Đang diễn ra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-green-900">{currentEvent.teamName}</h3>
                <p className="text-green-700">{currentEvent.school}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-green-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(currentEvent.time).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {currentEvent.duration} phút
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {currentEvent.room}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 mb-2">Vòng {currentEvent.round}</Badge>
                <div className="text-2xl font-bold text-green-800">
                  {new Date(currentEvent.time).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Sắp tới ({upcomingEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {new Date(event.time).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
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
                {getStatusBadge(event.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Đã hoàn thành ({completedEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">
                      {new Date(event.time).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{event.teamName}</h3>
                    <p className="text-sm text-gray-600">{event.school}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Vòng {event.round}</Badge>
                  {getStatusBadge(event.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function JudgeSchedulePage() {
  return (
    // <ProtectedRoute allowedRoles={["judge"]}>
      <JudgeLayout activeTab="schedule">
        <JudgeScheduleContent />
      </JudgeLayout>
    // </ProtectedRoute>
  )
}
