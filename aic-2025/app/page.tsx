import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, FileText, Star, Award } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
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
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#rules" className="text-gray-700 hover:text-blue-600 transition-colors">
                Thể lệ
              </a>
              <a href="#rounds" className="text-gray-700 hover:text-blue-600 transition-colors">
                Các vòng thi
              </a>
              <a href="#prizes" className="text-gray-700 hover:text-blue-600 transition-colors">
                Giải thưởng
              </a>
              <a href="#schedule" className="text-gray-700 hover:text-blue-600 transition-colors">
                Lịch thi
              </a>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Đăng nhập
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                CUỘC THI AIC 2025
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên - Nơi những ý tưởng sáng tạo được thể hiện và phát
                triển
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Tham gia ngay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 bg-transparent"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 scale-110"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aic%20robot%202025-vUOQbNQE5Vp7TFR6mYDr5H5H6GODiv.webp"
                  alt="AIC Robot 2025"
                  width={400}
                  height={400}
                  className="relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Rules */}
      <section id="rules" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thể lệ cuộc thi
            </h2>
            <p className="text-xl text-gray-600">Quy định và điều kiện tham gia</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Đối tượng tham gia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sinh viên các trường đại học, cao đẳng trên toàn quốc. Mỗi đội từ 2-4 thành viên.
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-purple-800">Yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Ý tưởng ứng dụng AI sáng tạo, khả thi và có tính ứng dụng thực tế cao.</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Thời gian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Cuộc thi diễn ra từ tháng 3 đến tháng 6 năm 2025 với 3 vòng thi chính.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Competition Rounds */}
      <section id="rounds" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Các vòng thi
            </h2>
            <p className="text-xl text-gray-600">Hành trình chinh phục đỉnh cao AI</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-800">Vòng 1: Ý tưởng</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Tháng 3-4</Badge>
                </div>
                <CardDescription className="text-lg">Trình bày ý tưởng và kế hoạch thực hiện</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Các đội trình bày ý tưởng ứng dụng AI thông qua tài liệu và video demo. Tập trung vào tính sáng tạo,
                  khả thi và tác động xã hội.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Tài liệu PDF</Badge>
                  <Badge variant="outline">Video 5 phút</Badge>
                  <Badge variant="outline">Thuyết trình</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-purple-800">Vòng 2: Bán kết</CardTitle>
                  <Badge className="bg-purple-100 text-purple-800">Tháng 5</Badge>
                </div>
                <CardDescription className="text-lg">Phát triển prototype và demo sản phẩm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Xây dựng prototype hoạt động, demo trực tiếp và trả lời câu hỏi từ ban giám khảo. Đánh giá kỹ thuật và
                  khả năng thực hiện.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Prototype</Badge>
                  <Badge variant="outline">Demo trực tiếp</Badge>
                  <Badge variant="outline">Q&A</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-yellow-800">Vòng 3: Chung kết</CardTitle>
                  <Badge className="bg-yellow-100 text-yellow-800">Tháng 6</Badge>
                </div>
                <CardDescription className="text-lg">Sản phẩm hoàn thiện và kế hoạch thương mại hóa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Trình bày sản phẩm hoàn thiện, kế hoạch kinh doanh và chiến lược phát triển. Đánh giá tổng thể và tiềm
                  năng thương mại.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Sản phẩm hoàn thiện</Badge>
                  <Badge variant="outline">Business Plan</Badge>
                  <Badge variant="outline">Pitch 15 phút</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scoring Criteria */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tiêu chí chấm điểm
            </h2>
            <p className="text-xl text-gray-600">Cách thức đánh giá các vòng thi</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-blue-800">Tính sáng tạo</CardTitle>
                <CardDescription className="text-2xl font-bold text-purple-600">25%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Độ mới mẻ và sáng tạo của ý tưởng</p>
              </CardContent>
            </Card>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-purple-800">Tính khả thi</CardTitle>
                <CardDescription className="text-2xl font-bold text-blue-600">30%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Khả năng thực hiện và triển khai</p>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <CardTitle className="text-blue-800">Tác động xã hội</CardTitle>
                <CardDescription className="text-2xl font-bold text-purple-600">25%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Lợi ích mang lại cho cộng đồng</p>
              </CardContent>
            </Card>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <CardTitle className="text-purple-800">Trình bày</CardTitle>
                <CardDescription className="text-2xl font-bold text-blue-600">20%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Kỹ năng thuyết trình và demo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Giải thưởng
            </h2>
            <p className="text-xl text-gray-600">Tổng giá trị giải thưởng lên đến 500 triệu VNĐ</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-yellow-300 bg-gradient-to-b from-yellow-50 to-yellow-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-yellow-800">Giải Nhất</CardTitle>
                <CardDescription className="text-4xl font-bold text-yellow-600">200 triệu VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Tiền mặt 200 triệu VNĐ</li>
                  <li>• Cơ hội đầu tư từ quỹ Venture Capital</li>
                  <li>• Hỗ trợ inkubator 1 năm</li>
                  <li>• Chứng nhận và cúp vàng</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-gray-800">Giải Nhì</CardTitle>
                <CardDescription className="text-4xl font-bold text-gray-600">150 triệu VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Tiền mặt 150 triệu VNĐ</li>
                  <li>• Hỗ trợ mentoring 6 tháng</li>
                  <li>• Khóa học AI chuyên sâu</li>
                  <li>• Chứng nhận và cúp bạc</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-300 bg-gradient-to-b from-orange-50 to-orange-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-orange-800">Giải Ba</CardTitle>
                <CardDescription className="text-4xl font-bold text-orange-600">100 triệu VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Tiền mặt 100 triệu VNĐ</li>
                  <li>• Laptop cao cấp cho team</li>
                  <li>• Khóa học online 1 năm</li>
                  <li>• Chứng nhận và cúp đồng</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">Ngoài ra còn có các giải khuyến khích và giải thưởng đặc biệt</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">Giải Sáng tạo nhất</Badge>
              <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">Giải Ứng dụng thực tế</Badge>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">Giải Tác động xã hội</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AIC 2025</h3>
              <p className="text-blue-200">Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên Việt Nam</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#rules" className="hover:text-white transition-colors">
                    Thể lệ cuộc thi
                  </a>
                </li>
                <li>
                  <a href="#rounds" className="hover:text-white transition-colors">
                    Các vòng thi
                  </a>
                </li>
                <li>
                  <a href="#prizes" className="hover:text-white transition-colors">
                    Giải thưởng
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="hover:text-white transition-colors">
                    Lịch thi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <div className="text-blue-200 space-y-2">
                <p>Email: info@aic2025.vn</p>
                <p>Hotline: 1900 1234</p>
                <p>Địa chỉ: Hà Nội, Việt Nam</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 AIC Competition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
