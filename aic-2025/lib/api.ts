// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export const API_ENDPOINTS = {
  // Teams endpoints
  TEAMS: {
    AUTHENTICATE: '/api/v1/teams/authenticate',
    LIST: '/api/v1/teams',
    CREATE: '/api/v1/teams',
    GET_BY_ID: (id: number) => `/api/v1/teams/${id}`,
    UPDATE: (id: number) => `/api/v1/teams/${id}`,
    DELETE: (id: number) => `/api/v1/teams/${id}`,
  },
  
  // Team Members endpoints
  TEAM_MEMBERS: {
    LIST: '/api/v1/team-members',
    CREATE: '/api/v1/team-members',
    GET_BY_ID: (id: number) => `/api/v1/team-members/${id}`,
    UPDATE: (id: number) => `/api/v1/team-members/${id}`,
    DELETE: (id: number) => `/api/v1/team-members/${id}`,
    GET_BY_TEAM: (teamId: number) => `/api/v1/team-members/team/${teamId}`,
  },
  
  // Submissions endpoints
  SUBMISSIONS: {
    LIST: '/api/v1/submissions',
    CREATE: '/api/v1/submissions',
    GET_BY_ID: (id: number) => `/api/v1/submissions/${id}`,
    UPDATE: (id: number) => `/api/v1/submissions/${id}`,
    DELETE: (id: number) => `/api/v1/submissions/${id}`,
    GET_BY_TEAM: (teamId: number) => `/api/v1/submissions/team/${teamId}`,
  },
  
  // Team Scores endpoints
  TEAM_SCORES: {
    LIST: '/api/v1/team-scores',
    CREATE: '/api/v1/team-scores',
    GET_BY_ID: (id: number) => `/api/v1/team-scores/${id}`,
    UPDATE: (id: number) => `/api/v1/team-scores/${id}`,
    DELETE: (id: number) => `/api/v1/team-scores/${id}`,
    GET_BY_TEAM: (teamId: number) => `/api/v1/team-scores/team/${teamId}`,
    GET_TEAM_AVERAGE: (teamId: number, round: string) => `/api/v1/team-scores/team/${teamId}/average?round=${round}`,
    GET_RANKINGS: (round: string) => `/api/v1/team-scores/rankings?round=${round}`,
  },
  
  // Judges endpoints
  JUDGES: {
    AUTHENTICATE: '/api/v1/judges/authenticate',
    LIST: '/api/v1/judges',
    CREATE: '/api/v1/judges',
    GET_BY_ID: (id: number) => `/api/v1/judges/${id}`,
    UPDATE: (id: number) => `/api/v1/judges/${id}`,
    DELETE: (id: number) => `/api/v1/judges/${id}`,
    GET_ADMINS: '/api/v1/judges/admins',
    GET_REGULAR: '/api/v1/judges/regular',
  },
  
  // Schedules endpoints
  SCHEDULES: {
    LIST: '/api/v1/schedules',
    CREATE: '/api/v1/schedules',
    GET_BY_ID: (id: number) => `/api/v1/schedules/${id}`,
    UPDATE: (id: number) => `/api/v1/schedules/${id}`,
    DELETE: (id: number) => `/api/v1/schedules/${id}`,
    GET_BY_TEAM: (teamId: number) => `/api/v1/schedules/team/${teamId}`,
    GET_UPCOMING: '/api/v1/schedules/upcoming',
  }
}

// Helper function to build complete URL
export function buildApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`
}

// API client with common configurations
export async function apiCall(
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> {
  const url = buildApiUrl(endpoint)
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: RequestInit = {
    ...options,
    headers: defaultHeaders,
  }

  return fetch(url, config)
}

// Helper functions for common HTTP methods
export const api = {
  get: (endpoint: string, options: RequestInit = {}) => 
    apiCall(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: any, options: RequestInit = {}) => 
    apiCall(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: (endpoint: string, data?: any, options: RequestInit = {}) => 
    apiCall(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: (endpoint: string, options: RequestInit = {}) => 
    apiCall(endpoint, { ...options, method: 'DELETE' }),
    
  // Special method for form data (multipart/form-data)
  postForm: (endpoint: string, formData: FormData, options: RequestInit = {}) => {
    const { headers, ...restOptions } = options
    
    // Debug the request
    console.log('postForm endpoint:', endpoint)
    
    // Log form data contents for debugging
    console.log('postForm formData contents:')
    formData.forEach((value, key) => {
      console.log(`FormData entry - ${key}: ${value instanceof File ? value.name : value}`)
    })
    
    // Verify required fields are present
    if (endpoint.includes('/submissions') && !formData.get('team_id')) {
      console.error('ERROR: Missing required team_id in form data!')
    }
    
    return apiCall(endpoint, {
      ...restOptions,
      method: 'POST',
      body: formData,  // Use the original FormData directly
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...headers,
      },
    })
  },
  
  // Special method for form data (multipart/form-data) with PUT
  putForm: (endpoint: string, formData: FormData, options: RequestInit = {}) => {
    const { headers, ...restOptions } = options
    return apiCall(endpoint, {
      ...restOptions,
      method: 'PUT',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...headers,
      },
    })
  }
}