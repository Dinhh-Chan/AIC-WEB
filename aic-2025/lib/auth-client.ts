// Team Info type
export interface TeamInfo {
  teamId: number
  teamName: string
  username: string
}

// Judge Info type
export interface JudgeInfo {
  id: number
  fullName: string
  username: string
  role: 'admin' | 'judge'
}

// Get team info from localStorage
export function getTeamInfo(): TeamInfo | null {
  if (typeof window === 'undefined') return null
  const teamInfo = localStorage.getItem('teamInfo')
  return teamInfo ? JSON.parse(teamInfo) : null
}

// Set team info to localStorage
export function setTeamInfo(teamInfo: TeamInfo): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('teamInfo', JSON.stringify(teamInfo))
}

// Clear team info from localStorage
export function clearTeamInfo(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('teamInfo')
}

// Get judge info from localStorage
export function getJudgeInfo(): JudgeInfo | null {
  if (typeof window === 'undefined') return null
  const judgeInfo = localStorage.getItem('judgeInfo')
  return judgeInfo ? JSON.parse(judgeInfo) : null
}

// Set judge info to localStorage
export function setJudgeInfo(judgeInfo: JudgeInfo): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('judgeInfo', JSON.stringify(judgeInfo))
}

// Clear judge info from localStorage
export function clearJudgeInfo(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('judgeInfo')
}

// Clear all auth info
export function clearAllAuthInfo(): void {
  if (typeof window === 'undefined') return
  clearTeamInfo()
  clearJudgeInfo()
}