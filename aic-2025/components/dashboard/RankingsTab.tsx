"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Crown, Medal } from "lucide-react"

interface Team {
  rank: number
  name: string
  members: number
  totalScore: number
  avgScore: number
  status: string
}

interface RankingsTabProps {
  allTeams: Team[]
}

export default function RankingsTab({ allTeams }: RankingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
          <Trophy className="w-6 h-6" />
          Bảng xếp hạng các đội thi
        </CardTitle>
        <CardDescription>Thứ hạng hiện tại của tất cả các đội tham gia AIC 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Hạng</TableHead>
              <TableHead>Tên đội</TableHead>
              <TableHead className="text-center">Thành viên</TableHead>
              <TableHead className="text-center">Tổng điểm</TableHead>
              <TableHead className="text-center">Điểm TB</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTeams.map((team) => (
              <TableRow
                key={team.rank}
                className={team.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {team.rank === 1 && <Crown className="w-5 h-5 text-yellow-500" />}
                    {team.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                    {team.rank === 3 && <Medal className="w-5 h-5 text-orange-500" />}
                    {team.rank}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{team.name}</TableCell>
                <TableCell className="text-center">{team.members}</TableCell>
                <TableCell className="text-center font-bold text-purple-600">{team.totalScore}</TableCell>
                <TableCell className="text-center">{team.avgScore}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={team.status === "Vòng 2" ? "default" : "secondary"}
                    className={team.status === "Vòng 2" ? "bg-green-100 text-green-800" : ""}
                  >
                    {team.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
