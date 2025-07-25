"use client"

import { Award, Home, RotateCcw, Share2 } from "lucide-react"

import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"

export default function GameResultsPage() {
  const searchParams = useSearchParams()
  const score = searchParams.get("score") || "0"

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Game Complete!</h1>
              <p className="text-muted-foreground">You scored {score} points in the Science Quiz</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Performance</CardTitle>
              <CardDescription>Here&apos;s how you did in this game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Accuracy</span>
                  <span className="font-medium">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Speed</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Difficulty</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Score</span>
                  <span className="text-xl font-bold">{score}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Alex Johnson", score: 50, position: 1 },
                  { name: "Sarah Williams", score: 45, position: 2 },
                  { name: "You", score: Number.parseInt(score), position: 3, isYou: true },
                  { name: "Michael Brown", score: 35, position: 4 },
                  { name: "Emily Davis", score: 30, position: 5 },
                  { name: "David Wilson", score: 25, position: 6 },
                  { name: "Jessica Taylor", score: 20, position: 7 },
                  { name: "Daniel Martinez", score: 15, position: 8 },
                ].map((player) => (
                  <div
                    key={player.position}
                    className={`flex items-center justify-between rounded-lg border p-3 ${
                      player.isYou ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          player.position === 1
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : player.position === 2
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              : player.position === 3
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {player.position}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-user.jpg`} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={player.isYou ? "font-medium" : ""}>{player.name}</span>
                    </div>
                    <span className="font-medium">{player.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="flex-1" asChild>
              <Link href={`/arena/${params.id}`}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

