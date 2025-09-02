"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Play, ImageIcon, X } from "lucide-react"

interface FileViewerProps {
  file: {
    type: "document" | "video" | "presentation" | "image"
    name: string
    url: string
    uploadDate: string
    size?: string
  }
  trigger?: React.ReactNode
}

export function FileViewer({ file, trigger }: FileViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-red-600" />
      case "video":
        return <Play className="h-4 w-4 text-blue-600" />
      case "presentation":
        return <FileText className="h-4 w-4 text-orange-600" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "document":
        return "Tài liệu"
      case "video":
        return "Video"
      case "presentation":
        return "Thuyết trình"
      case "image":
        return "Hình ảnh"
      default:
        return "File"
    }
  }

  const renderFileContent = () => {
    switch (file.type) {
      case "document":
        return (
          <div className="w-full h-[600px] border rounded-lg">
            <iframe
              src={`${file.url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full rounded-lg"
              title={file.name}
            />
          </div>
        )
      case "video":
        return (
          <div className="w-full">
            <video controls className="w-full max-h-[600px] rounded-lg" preload="metadata">
              <source src={file.url} type="video/mp4" />
              Trình duyệt không hỗ trợ video này.
            </video>
          </div>
        )
      case "presentation":
        return (
          <div className="w-full h-[600px] border rounded-lg">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.url)}`}
              className="w-full h-full rounded-lg"
              title={file.name}
            />
          </div>
        )
      case "image":
        return (
          <div className="w-full flex justify-center">
            <img
              src={file.url || "/placeholder.svg"}
              alt={file.name}
              className="max-w-full max-h-[600px] rounded-lg object-contain"
            />
          </div>
        )
      default:
        return (
          <div className="w-full h-[400px] border rounded-lg flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Không thể xem trước file này</p>
              <p className="text-sm text-gray-500 mt-2">Vui lòng tải xuống để xem</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Xem
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(file.type)}
              <div>
                <DialogTitle className="text-xl">{file.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 mt-1">
                  <Badge variant="outline">{getFileTypeLabel(file.type)}</Badge>
                  <span>Ngày tải: {new Date(file.uploadDate).toLocaleDateString("vi-VN")}</span>
                  {file.size && <span>Kích thước: {file.size}</span>}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={file.url} download={file.name}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">{renderFileContent()}</div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
          <Button asChild>
            <a href={file.url} download={file.name}>
              <Download className="h-4 w-4 mr-2" />
              Tải xuống
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
