import { Award, Brain, Clock, Cog, MessageSquare, Plus, Share2, Users } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Link } from "react-router-dom"
import { Input } from "@/shared/components/ui/input"
import { useParams } from "react-router-dom";

export default function ArenaPage() {
  // In a real app, you would fetch the arena data based on the ID
  
  const params = useParams();
  const arenaId = params.id

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Science Showdown</h1>
              <Badge variant="outline" className="ml-2">
                Science
              </Badge>
            </div>
            <p className="text-muted-foreground">Test your knowledge of scientific facts and discoveries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Cog className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="games">Games</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="games">
                <Card>
                  <CardHeader>
                    <CardTitle>Games</CardTitle>
                    <CardDescription>Join an existing game or create a new one</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Active Game</h3>
                            <p className="text-sm text-muted-foreground">Started 5 minutes ago • 6/10 players</p>
                          </div>
                          <Button>Join Game</Button>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <Avatar key={i} className="border-2 border-background">
                                <AvatarImage src={`/placeholder-user.jpg`} />
                                <AvatarFallback>U{i}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">Round 3/10 in progress</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Scheduled Game</h3>
                            <p className="text-sm text-muted-foreground">Starts in 15 minutes • 3/10 players</p>
                          </div>
                          <Button variant="outline">Join Waiting Room</Button>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <Avatar key={i} className="border-2 border-background">
                                <AvatarImage src={`/placeholder-user.jpg`} />
                                <AvatarFallback>U{i}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            Waiting for more players
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to={`/game/create?arena=${arenaId}`}>
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Game
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="players">
                <Card>
                  <CardHeader>
                    <CardTitle>Players</CardTitle>
                    <CardDescription>Players currently in this arena</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Alex Johnson", status: "In Game", role: "Host" },
                        { name: "Sarah Williams", status: "In Game", role: "Player" },
                        { name: "Michael Brown", status: "In Game", role: "Player" },
                        { name: "Emily Davis", status: "In Lobby", role: "Player" },
                        { name: "David Wilson", status: "In Lobby", role: "Player" },
                        { name: "Jessica Taylor", status: "In Lobby", role: "Player" },
                        { name: "Daniel Martinez", status: "Spectating", role: "Player" },
                        { name: "Olivia Anderson", status: "Spectating", role: "Player" },
                      ].map((player, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user.jpg`} />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.status}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {player.role === "Host" && <Badge variant="secondary">Host</Badge>}
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="chat">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Arena Chat</CardTitle>
                    <CardDescription>Chat with other players in the arena</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-4">
                      {[
                        {
                          name: "Alex Johnson",
                          message: "Welcome everyone to the Science Showdown!",
                          time: "10:15 AM",
                          isHost: true,
                        },
                        {
                          name: "Sarah Williams",
                          message: "Thanks for hosting! Looking forward to the game.",
                          time: "10:16 AM",
                        },
                        {
                          name: "Michael Brown",
                          message: "Is anyone else having trouble with the audio?",
                          time: "10:18 AM",
                        },
                        {
                          name: "Alex Johnson",
                          message: "Try refreshing your browser, Michael.",
                          time: "10:19 AM",
                          isHost: true,
                        },
                        {
                          name: "Emily Davis",
                          message: "I just joined. When does the next game start?",
                          time: "10:22 AM",
                        },
                        { name: "David Wilson", message: "In about 15 minutes I think", time: "10:23 AM" },
                        {
                          name: "Jessica Taylor",
                          message: "This is my first time playing. Any tips?",
                          time: "10:25 AM",
                        },
                        {
                          name: "Daniel Martinez",
                          message: "Just have fun and don't stress about the timer!",
                          time: "10:26 AM",
                        },
                        {
                          name: "Olivia Anderson",
                          message: "What's the category for the next game?",
                          time: "10:28 AM",
                        },
                        {
                          name: "Alex Johnson",
                          message: "We'll be focusing on astronomy and physics!",
                          time: "10:30 AM",
                          isHost: true,
                        },
                      ].map((message, i) => (
                        <div key={i} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder-user.jpg`} />
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{message.name}</span>
                              {message.isHost && (
                                <Badge variant="secondary" className="text-xs">
                                  Host
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center gap-2">
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button>Send</Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Arena Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Players</span>
                    </div>
                    <span className="font-medium">8/20</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span>Games Played</span>
                    </div>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Created</span>
                    </div>
                    <span className="font-medium">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Alex Johnson", score: 1250, position: 1 },
                    { name: "Sarah Williams", score: 980, position: 2 },
                    { name: "Michael Brown", score: 875, position: 3 },
                    { name: "Emily Davis", score: 720, position: 4 },
                    { name: "David Wilson", score: 650, position: 5 },
                  ].map((player) => (
                    <div key={player.position} className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
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
                      <div className="flex-1 truncate">
                        <p className="truncate font-medium">{player.name}</p>
                      </div>
                      <div className="font-medium">{player.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/arena/${arenaId}/leaderboard`}>
                    <Award className="mr-2 h-4 w-4" />
                    View Full Leaderboard
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

