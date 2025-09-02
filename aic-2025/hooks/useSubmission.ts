"use client"
import { useState, useEffect } from "react"
import { TeamInfo } from "@/lib/auth-client"

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

export function useSubmission(teamInfo: TeamInfo | null) {
  const [submissionLoading, setSubmissionLoading] = useState(false)
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch existing submission for this team
  useEffect(() => {
    async function fetchSubmission() {
      if (!teamInfo) return
      
      setIsLoading(true)
      try {
        const response = await fetch(`/api/v1/submissions/team/${teamInfo.teamId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.data && data.data.length > 0) {
            setCurrentSubmission(data.data[0])
          }
        }
      } catch (error) {
        console.error("Error fetching submission:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSubmission()
  }, [teamInfo])

  const handleSubmissionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmissionLoading(true)
    
    try {
      // Đảm bảo có thông tin đội
      if (!teamInfo) {
        throw new Error('Không tìm thấy thông tin đội')
      }

      // Lấy form data từ form
      const form = event.currentTarget
      const formData = new FormData(form)
      
      formData.append('team_id', teamInfo.teamId.toString())
      formData.set('status_submission', 'submitted')
      
      // Kiểm tra các trường bắt buộc
      const requiredFields = ['project_title', 'description', 'technology']
      const missingFields = requiredFields.filter(field => !formData.get(field))
      
      console.log("===== missingFields =====", missingFields)
      if (missingFields.length > 0) {
        throw new Error(`Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`)
      }
      
      console.log('Sending form data:')
      formData.forEach((value, key) => {
        console.log(`${key}: ${value instanceof File ? value.name || 'No file name' : value}`)
      })
      
      // Gửi request - luôn dùng POST vì API sẽ tự xử lý update nếu đã có submission
      const response = await fetch('/api/v1/submissions', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('Success response:', result)
        
        // Cập nhật submission hiện tại
        if (result.data) {
          setCurrentSubmission(result.data)
        }
        
        alert(currentSubmission 
          ? "Cập nhật bài nộp thành công!" 
          : "Nộp bài thành công!")
      } else {
        // Xử lý lỗi
        let errorMessage = 'Có lỗi xảy ra khi nộp bài'
        try {
          const errorData = await response.json()
          console.error('Error response:', errorData)
          
          // Xử lý lỗi từ API
          if (errorData.detail && Array.isArray(errorData.detail)) {
            const fieldErrors = errorData.detail.map((err: any) => {
              const field = err.loc && err.loc.length > 1 ? err.loc[1] : 'unknown'
              return `${field}: ${err.msg}`
            }).join(', ')
            errorMessage = `Lỗi dữ liệu: ${fieldErrors}`
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          const errorText = await response.text()
          console.error('Error response text:', errorText)
        }
        throw new Error(errorMessage)
      }
    } catch (error: any) {
      console.error('Submission error:', error)
      alert("Lỗi! " + (error.message || "Có lỗi xảy ra khi nộp bài thi."))
    } finally {
      setSubmissionLoading(false)
    }
  }

  return {
    submissionLoading,
    currentSubmission,
    isLoading,
    handleSubmissionSubmit
  }
}