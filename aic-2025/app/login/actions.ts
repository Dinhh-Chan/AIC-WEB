'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { api, API_ENDPOINTS } from '@/lib/api'

export async function loginAction(formData: FormData) {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()

  // Validate form data
  if (!username || !password) {
    redirect('/login?error=missing_fields')
  }

  try {
    // Gọi API authenticate với username và password làm query parameters
    const authEndpoint = `${API_ENDPOINTS.TEAMS.AUTHENTICATE}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    const response = await api.post(authEndpoint)
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        redirect('/login?error=invalid_credentials')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    // Kiểm tra cấu trúc response
    if (!result.data) {
      redirect('/login?error=invalid_response')
    }

    const team = result.data

    // Lưu thông tin team vào cookies để duy trì session
    const cookieStore = await cookies()
    cookieStore.set('team_id', team.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    
    cookieStore.set('team_username', team.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    cookieStore.set('team_name', team.team_name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    // Redirect đến dashboard sau khi đăng nhập thành công
    redirect('/dashboard')

  } catch (error) {
    console.error('Login error:', error)
    redirect('/login?error=server_error')
  }
}
