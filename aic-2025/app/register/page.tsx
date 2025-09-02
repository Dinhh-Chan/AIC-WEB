import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, UserPlus } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20ript-7RhraWi3oj3VuHevGcTbl5VLze0Tw6.webp"
                  alt="RIPT Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20iu-Ii8caC639xhA0CGVFClheMsMON9cDQ.webp"
                  alt="IU Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20ptit-MngEeovFJSI13Zwk5xqCDaCYMEBiF3.webp"
                  alt="PTIT Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AIC 2025
              </h1>
            </div>
            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </header>

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <Card className="w-full max-w-md border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Đăng ký đội thi
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Tạo tài khoản đội thi mới
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team_name" className="text-gray-700">
                Tên đội
              </Label>
              <Input
                id="team_name"
                placeholder="Nhập tên đội thi"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                placeholder="Tạo tên đăng nhập cho đội"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Tạo mật khẩu"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="text-gray-700">
                Xác nhận mật khẩu
              </Label>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slogan" className="text-gray-700">
                Slogan đội
              </Label>
              <Input
                id="slogan"
                placeholder="Slogan của đội (không bắt buộc)"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Đăng ký
            </Button>
            <div className="text-center text-gray-600">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AIC Competition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
