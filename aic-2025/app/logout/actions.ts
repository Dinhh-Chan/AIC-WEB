'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const cookieStore = await cookies()
  
  // Xóa tất cả cookies đăng nhập
  cookieStore.delete('team_id')
  cookieStore.delete('team_name')
  cookieStore.delete('team_username')
  
  // Chuyển hướng về trang chủ
  redirect('/')
}
