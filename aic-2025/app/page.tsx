import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 text-lg md:text-xl">
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
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Đăng nhập
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                CUỘC THI AIC 2025
              </h1>
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                Cuộc thi Trí tuệ Nhân tạo hàng đầu dành cho sinh viên - Nơi những ý tưởng sáng tạo được thể hiện và phát
                triển
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                  >
                    Tham gia ngay
                  </Button>
                </Link>
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
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thể lệ cuộc thi
            </h2>
            <p className="text-2xl text-gray-600">Quy định và điều kiện tham gia</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Đối tượng tham gia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tất cả sinh viên các trường đại học, cao đẳng toàn quốc. Mỗi đội 3-4 thành viên, có ít nhất 2 sinh viên CNTT và ít nhất 1 nam, 1 nữ.
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-purple-800">Yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  <strong>Tính ứng dụng cao:</strong> Giải quyết vấn đề thực tiễn trong giáo dục & học tập, hỗ trợ cộng đồng & công việc xã hội, văn hóa - ngôn ngữ & sáng tạo nội dung.
                </p>
                <p className="text-gray-600">
                  <strong>Đổi mới sáng tạo:</strong> Ý tưởng có sự khác biệt, sáng tạo và khả năng triển khai thực tế.
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Thời gian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 space-y-1">
                  <p><strong>15/09:</strong> Hạn đăng ký đội tham gia</p>
                  <p><strong>19/09:</strong> Nộp sản phẩm ý tưởng</p>
                  <p><strong>21/09:</strong> Vòng 1 & Công bố kết quả</p>
                  <p><strong>22/09-02/10:</strong> Phát triển sản phẩm</p>
                  <p><strong>03/10:</strong> Vòng chung kết</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Competition Rounds */}
      <section id="rounds" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Các vòng thi
            </h2>
            <p className="text-2xl text-gray-600">Hành trình chinh phục đỉnh cao AI</p>
          </div>
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-800">Vòng 1: Ý tưởng</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">21/09</Badge>
                </div>
                <CardDescription className="text-lg">Trình bày ý tưởng và sản phẩm demo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Các đội nộp tài liệu và thuyết trình trước Ban giám khảo về ý tưởng ứng dụng AI:
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600"><strong>• Báo cáo chi tiết (5-10 trang):</strong> Giới thiệu sản phẩm, lý do chọn đề tài, chức năng chính, mô hình kinh doanh, khó khăn, hướng phát triển, phân công công việc</p>
                  <p className="text-gray-600"><strong>• Slide thuyết trình</strong></p>
                  <p className="text-gray-600"><strong>• Video demo sản phẩm:</strong> Giới thiệu chức năng, giao diện</p>
                  <p className="text-gray-600"><strong>• Source code</strong></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Báo cáo PDF</Badge>
                  <Badge variant="outline">Video demo</Badge>
                  <Badge variant="outline">Source code</Badge>
                  <Badge variant="outline">Thuyết trình</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-purple-800">Vòng chung kết</CardTitle>
                  <Badge className="bg-purple-100 text-purple-800">03/10</Badge>
                </div>
                <CardDescription className="text-lg">Thuyết trình và demo sản phẩm trực tiếp</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Trình bày trực tiếp trước Ban Giám khảo với các nội dung:
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600"><strong>• Nội dung thuyết trình:</strong> Chức năng chính, công nghệ sử dụng, giải pháp thực tế, tiềm năng phát triển</p>
                  <p className="text-gray-600"><strong>• Demo sản phẩm trực tiếp</strong></p>
                  <p className="text-gray-600"><strong>• Q&A:</strong> Ban Giám khảo đặt câu hỏi đánh giá sâu về ý tưởng, sản phẩm, năng lực đội</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Thuyết trình trực tiếp</Badge>
                  <Badge variant="outline">Demo sản phẩm</Badge>
                  <Badge variant="outline">Q&A với BGK</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Giải thưởng & Lợi ích
            </h2>
            <p className="text-2xl text-gray-600">Những phần thưởng hấp dẫn đang chờ đón bạn</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            <Card className="text-center border-yellow-300 bg-gradient-to-b from-yellow-50 to-yellow-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-yellow-800">Giải Nhất</CardTitle>
                <CardDescription className="text-4xl font-bold text-yellow-600">5.000.000 VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>🏆 Tiền mặt 5.000.000đ</li>
                  <li>📜 Chứng nhận chính thức</li>
                  <li>🎁 Quà tặng đặc biệt</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-gray-800">Giải Nhì</CardTitle>
                <CardDescription className="text-4xl font-bold text-gray-600">3.000.000 VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>🥈 Tiền mặt 3.000.000đ</li>
                  <li>📜 Chứng nhận chính thức</li>
                  <li>🎁 Quà tặng đặc biệt</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-300 bg-gradient-to-b from-orange-50 to-orange-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Trophy className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-orange-800">Giải Ba</CardTitle>
                <CardDescription className="text-4xl font-bold text-orange-600">2.000.000 VNĐ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>🥉 Tiền mặt 2.000.000đ</li>
                  <li>📜 Chứng nhận chính thức</li>
                  <li>🎁 Quà tặng đặc biệt</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Benefits Section */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Lợi ích tham gia cuộc thi</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                    📜 Chứng nhận chính thức
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nhận giấy chứng nhận tham dự chính thức từ Viện Khoa học Kỹ thuật Bưu điện - Học viện Công nghệ Bưu chính Viễn thông làm đẹp thêm hồ sơ cá nhân.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                    👨‍🏫 Training từ chuyên gia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Được training từ các chuyên gia giúp nâng cao kiến thức, kỹ năng và hoàn thiện sản phẩm của nhóm.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                    🚀 Thử thách bản thân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Thử thách bản thân, rèn luyện tư duy và kỹ năng teamwork qua các bài toán thực tế.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-800 flex items-center gap-2">
                    🎯 Nhiều giải phụ hấp dẫn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ngoài 3 giải chính, còn có nhiều giải phụ và giải thưởng đặc biệt đang chờ đón các đội thi.
                  </p>
                </CardContent>
              </Card>
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
                <p>Email: dinhtran29092005@gmail.com</p>
                <p>Hotline: 0989811424</p>
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
