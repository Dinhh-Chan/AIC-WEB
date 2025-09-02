"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, RefreshCw } from "lucide-react"

function AdminSettingsContent() {
  return (
    <AdminLayout activeTab="settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cài đặt hệ thống
          </h1>
          <p className="text-gray-600 mt-1">Quản lý cấu hình và thiết lập cuộc thi</p>
        </div>

        <div className="grid gap-6">
          {/* Competition Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cài đặt cuộc thi
              </CardTitle>
              <CardDescription>Thông tin cơ bản về cuộc thi AIC 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="competition-name">Tên cuộc thi</Label>
                  <Input id="competition-name" defaultValue="AIC 2025" />
                </div>
                <div>
                  <Label htmlFor="competition-year">Năm tổ chức</Label>
                  <Input id="competition-year" defaultValue="2025" />
                </div>
              </div>
              <div>
                <Label htmlFor="competition-description">Mô tả cuộc thi</Label>
                <Textarea
                  id="competition-description"
                  defaultValue="Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên Việt Nam"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registration-start">Ngày mở đăng ký</Label>
                  <Input id="registration-start" type="date" defaultValue="2025-02-01" />
                </div>
                <div>
                  <Label htmlFor="registration-end">Ngày đóng đăng ký</Label>
                  <Input id="registration-end" type="date" defaultValue="2025-02-28" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
              <CardDescription>Các thiết lập chức năng của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép đăng ký mới</Label>
                  <p className="text-sm text-gray-600">Đội thi có thể đăng ký tham gia cuộc thi</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép nộp bài</Label>
                  <p className="text-sm text-gray-600">Đội thi có thể nộp bài thi</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị kết quả công khai</Label>
                  <p className="text-sm text-gray-600">Kết quả chấm điểm được hiển thị công khai</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Gửi email thông báo</Label>
                  <p className="text-sm text-gray-600">Tự động gửi email thông báo cho đội thi</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Thông tin liên hệ hiển thị trên website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email liên hệ</Label>
                  <Input id="contact-email" type="email" defaultValue="info@aic2025.vn" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Số điện thoại</Label>
                  <Input id="contact-phone" defaultValue="1900 1234" />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-address">Địa chỉ</Label>
                <Input id="contact-address" defaultValue="Hà Nội, Việt Nam" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Lưu cài đặt
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Khôi phục mặc định
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminSettingsContent />
    </ProtectedRoute>
  )
}
