"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TeamInfo } from "@/lib/auth-client"

interface DashboardHeaderProps {
  teamInfo: TeamInfo | null
  onLogout: () => void
}

export default function DashboardHeader({ teamInfo, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AIC 2025 Dashboard
            </h1>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/">Về trang chủ</Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
