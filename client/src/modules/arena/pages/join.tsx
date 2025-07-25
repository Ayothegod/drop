import type React from "react"

import { useState } from "react"
import { ArrowRight, Search } from "lucide-react"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"

export default function JoinArenaPage() {
  const navigate = useNavigate()
  const [arenaCode, setArenaCode] = useState("")
  const [arenaPassword, setArenaPassword] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the code and password
    navigate(`/arena/${arenaCode}`)
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Join an Arena</h1>
            <p className="text-muted-foreground">Join an existing trivia arena to compete with friends</p>
          </div>

          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Join by Code</TabsTrigger>
              <TabsTrigger value="browse">Browse Arenas</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>Join by Arena Code</CardTitle>
                  <CardDescription>Enter the arena code provided by the host</CardDescription>
                </CardHeader>
                <form onSubmit={handleJoinByCode}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="arena-code">Arena Code</Label>
                      <Input
                        id="arena-code"
                        placeholder="Enter arena code (e.g., ABC123)"
                        value={arenaCode}
                        onChange={(e) => setArenaCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arena-password">Password (if required)</Label>
                      <Input
                        id="arena-password"
                        type="password"
                        placeholder="Enter arena password"
                        value={arenaPassword}
                        onChange={(e) => setArenaPassword(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!arenaCode}>
                      Join Arena
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="browse">
              <Card>
                <CardHeader>
                  <CardTitle>Browse Public Arenas</CardTitle>
                  <CardDescription>Find and join public trivia arenas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="Search arenas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: 1, name: "Science Showdown", players: "8/10", category: "Science" },
                      { id: 2, name: "History Buffs", players: "12/20", category: "History" },
                      { id: 3, name: "Movie Trivia Night", players: "6/15", category: "Entertainment" },
                      { id: 4, name: "Geography Masters", players: "15/30", category: "Geography" },
                    ].map((arena) => (
                      <div key={arena.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">{arena.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{arena.category}</span>
                            <span>•</span>
                            <span>{arena.players} players</span>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/arena/${arena.id}`}>
                            Join
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/dashboard/arenas">View All Public Arenas</a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

