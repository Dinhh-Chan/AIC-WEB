"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type AdminTab = "teams" | "judges" | "schedule" | "settings"

interface AdminLayoutProps {
  activeTab: AdminTab
  children: ReactNode
}

export function AdminLayout({ activeTab, children }: AdminLayoutProps) {
  const navItems: Array<{ key: AdminTab; href: string; label: string }> = [
    { key: "teams", href: "/admin/teams", label: "Đội thi" },
    { key: "judges", href: "/admin/judges", label: "Giám khảo" },
    { key: "schedule", href: "/admin/schedule", label: "Lịch thi" },
    { key: "settings", href: "/admin/settings", label: "Cài đặt" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AIC 2025 - Admin
            </h1>
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === item.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <aside className="md:block hidden">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === item.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
              {children}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


