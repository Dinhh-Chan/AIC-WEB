import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AIC 2025 - Cuộc thi Trí tuệ Nhân tạo",
  description:
    "Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên Việt Nam. Tổng giá trị giải thưởng lên đến 500 triệu VNĐ.",
  generator: "v0.app",
  keywords: "AI, Artificial Intelligence, Competition, Vietnam, Students, AIC 2025",
  authors: [{ name: "AIC 2025 Organization" }],
  openGraph: {
    title: "AIC 2025 - Cuộc thi Trí tuệ Nhân tạo",
    description: "Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên Việt Nam",
    type: "website",
    locale: "vi_VN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
