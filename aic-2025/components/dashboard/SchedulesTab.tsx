"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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

interface SchedulesTabProps {
  schedules: Schedule[]
  upcomingSchedules: Schedule[]
  isLoading: boolean
  error: string | null
  formatDateTime: (date: string) => string
}

export default function SchedulesTab({ 
  schedules, 
  upcomingSchedules, 
  isLoading, 
  error,
  formatDateTime 
}: SchedulesTabProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Có lỗi khi tải lịch thi: {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  const ScheduleCard = ({ schedule }: { schedule: Schedule }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Vòng {schedule.round}
            </h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Bắt đầu: {formatDateTime(schedule.start_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Kết thúc: {formatDateTime(schedule.end_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{schedule.location}</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm ${
            schedule.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
            schedule.status === 'ongoing' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {schedule.status === 'upcoming' ? 'Sắp diễn ra' :
             schedule.status === 'ongoing' ? 'Đang diễn ra' :
             'Đã kết thúc'}
          </div>
        </div>
        {schedule.description && (
          <p className="mt-4 text-gray-600">
            {schedule.description}
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Lịch thi sắp tới */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">
            Lịch thi sắp tới
          </CardTitle>
          <CardDescription>
            Các lịch thi trong 7 ngày tới
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingSchedules.length > 0 ? (
            upcomingSchedules.map(schedule => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Không có lịch thi nào trong 7 ngày tới
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tất cả lịch thi của đội */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">
            Tất cả lịch thi
          </CardTitle>
          <CardDescription>
            Lịch thi của đội bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          {schedules.length > 0 ? (
            schedules.map(schedule => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Chưa có lịch thi nào được phân bổ
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
