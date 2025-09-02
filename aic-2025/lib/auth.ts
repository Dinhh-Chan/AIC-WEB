import { cookies } from 'next/headers'

export async function getTeamInfo() {
  const cookieStore = await cookies()
  
  const teamId = cookieStore.get('team_id')?.value
  const teamName = cookieStore.get('team_name')?.value
  const username = cookieStore.get('team_username')?.value
  
  if (!teamId || !teamName || !username) {
    return null
  }
  
  return {
    id: parseInt(teamId),
    teamName,
    username
  }
}

export async function clearTeamInfo() {
  const cookieStore = await cookies()
  
  cookieStore.delete('team_id')
  cookieStore.delete('team_name')
  cookieStore.delete('team_username')

  return true
}

export async function isAuthenticated() {
  const teamInfo = await getTeamInfo()
  return teamInfo !== null
}
