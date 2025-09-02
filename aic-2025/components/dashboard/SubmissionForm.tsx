"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { TeamInfo } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"

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

interface SubmissionFormProps {
  teamInfo: TeamInfo
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  currentSubmission: Submission | null
  isLoading: boolean
}

export default function SubmissionForm({ 
  teamInfo, 
  onSubmit, 
  loading, 
  currentSubmission, 
  isLoading 
}: SubmissionFormProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    } catch (e) {
      return 'Không xác định'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
          <FileText className="w-6 h-6" />
          {currentSubmission ? 'Chỉnh sửa bài nộp' : 'Nộp bài thi Vòng 1'}
          {currentSubmission && (
            <span className="ml-2 text-sm text-green-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" /> 
              Đã nộp: {formatDate(currentSubmission.submitted_at)}
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {currentSubmission 
            ? 'Chỉnh sửa bài nộp của đội thi. Bạn có thể cập nhật thông tin và tài liệu đã nộp.'
            : 'Nộp ý tưởng và tài liệu cho vòng thi đầu tiên. Hạn nộp: 30/04/2025'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <form className="space-y-6" 
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamName">Tên đội thi</Label>
                <Input 
                  id="teamName" 
                  name="teamName"
                  defaultValue={teamInfo?.teamName || ''}
                  placeholder="Nhập tên đội thi" 
                  disabled 
                />
                {/* Hidden input for team_id */}
                <input 
                  type="hidden" 
                  name="team_id" 
                  value={teamInfo?.teamId?.toString() || ''} 
                />
                {/* Hidden input for status */}
                <input 
                  type="hidden" 
                  name="status_submission" 
                  value="submitted" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project_title">Tên dự án</Label>
                <Input 
                  id="project_title" 
                  name="project_title"
                  defaultValue={currentSubmission?.project_title || ''}
                  placeholder="Nhập tên dự án AI" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả ý tưởng</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={currentSubmission?.description || ''}
                placeholder="Mô tả chi tiết ý tưởng AI của bạn (tối thiểu 200 từ)"
                className="min-h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technology">Công nghệ sử dụng</Label>
              <Input 
                id="technology" 
                name="technology"
                defaultValue={currentSubmission?.technology || ''}
                placeholder="VD: Python, TensorFlow, OpenAI API..." 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="report_file">
                  Báo cáo (PDF, DOC)
                  {currentSubmission?.report_file && (
                    <span className="ml-2 text-xs text-green-600">
                      (Đã nộp - Tải lại để thay thế)
                    </span>
                  )}
                </Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <Input
                    type="file"
                    id="report_file"
                    name="report_file"
                    accept=".pdf,.doc,.docx"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tối đa 50MB</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slide_file">
                  Slide thuyết trình (PDF, PPT)
                  {currentSubmission?.slide_file && (
                    <span className="ml-2 text-xs text-green-600">
                      (Đã nộp - Tải lại để thay thế)
                    </span>
                  )}
                </Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <Input
                    type="file"
                    id="slide_file"
                    name="slide_file"
                    accept=".pdf,.ppt,.pptx"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tối đa 50MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="video_url">Link video demo (tùy chọn)</Label>
                <Input 
                  id="video_url" 
                  name="video_url"
                  defaultValue={currentSubmission?.video_url || ''}
                  type="url"
                  placeholder="https://youtube.com/watch?v=..." 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source_code_url">Link source code (tùy chọn)</Label>
                <Input 
                  id="source_code_url" 
                  name="source_code_url"
                  defaultValue={currentSubmission?.source_code_url || ''}
                  type="url"
                  placeholder="https://github.com/..." 
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang {currentSubmission ? 'cập nhật' : 'nộp'} bài...
                </>
              ) : (
                currentSubmission ? "Cập nhật bài nộp" : "Nộp bài thi"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}