import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware - we're using client-side authentication with localStorage
  // Middleware can't access localStorage, so we handle auth in components
  return NextResponse.next()
}

export const config = {
  matcher: []
}
