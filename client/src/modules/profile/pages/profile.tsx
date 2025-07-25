Link;
import { Calendar, Edit, Mail, MapPin, Share2, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import api, { isAxiosErrorWithResponse } from "@/shared/lib/axios";
import { useToast } from "@/shared/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  // NOTE: check if the users has already created a username

  const checkCookie = async () => {
    try {
      const res = await api.post(`/profiles`, { username: "aiiomide" });
      console.log(res.data);
    } catch (error) {
      if (isAxiosErrorWithResponse(error)) {
        toast({
          description: `${error.response?.data.message}`,
        });
        if (error.response?.status === 401) {
          // Handle unauthorized
        }

        // if(error.request)
      } else if (error instanceof Error) {
        alert(error.message);
        console.log("Unknown error: ", error);
      }
    } finally {
      // setLoading(false);
      // return {
      // available: data.available,
      // message: data.available ? "Username is available" : "Username is taken",
      // const { available, message } = await checkUsername(username)
      // if (available) {
      // toast.success(message)
      // } else {
      // toast.error(message)
      // }
      // }
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:w-1/3">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                asChild
              >
                <Link to="/profile/edit">
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">@johndoe</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile/edit">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={checkCookie}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Trivia enthusiast and science lover</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined January 2023</span>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Science Pro", icon: "🧪" },
                    { name: "History Buff", icon: "📜" },
                    { name: "Quick Draw", icon: "⚡" },
                    { name: "Perfect Score", icon: "🎯" },
                    { name: "Team Player", icon: "👥" },
                    { name: "Early Bird", icon: "🐦" },
                  ].map((badge) => (
                    <div
                      key={badge.name}
                      className="flex flex-col items-center gap-1 rounded-lg border p-2 text-center"
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <span className="text-xs font-medium">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm" asChild>
                  <Link to="/profile/badges">View All Badges</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="history">Game History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                    <CardDescription>
                      Your trivia performance statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <h3 className="font-medium">Overall Stats</h3>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <span className="text-muted-foreground">
                              Games Played
                            </span>
                            <span className="font-medium">124</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <span className="text-muted-foreground">
                              Win Rate
                            </span>
                            <span className="font-medium">68%</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <span className="text-muted-foreground">
                              Avg. Score
                            </span>
                            <span className="font-medium">78/100</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <span className="text-muted-foreground">
                              Total Points
                            </span>
                            <span className="font-medium">9,652</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Category Performance</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Science
                              </span>
                              <span className="font-medium">85%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[85%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                History
                              </span>
                              <span className="font-medium">72%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[72%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Entertainment
                              </span>
                              <span className="font-medium">93%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[93%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Sports
                              </span>
                              <span className="font-medium">65%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-4">
                      <h3 className="font-medium">Global Rankings</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-lg border p-4 text-center">
                          <div className="text-3xl font-bold text-primary">
                            #156
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Overall Rank
                          </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <div className="text-3xl font-bold text-primary">
                            #42
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Science Rank
                          </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <div className="text-3xl font-bold text-primary">
                            #89
                          </div>
                          <p className="text-sm text-muted-foreground">
                            History Rank
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Game History</CardTitle>
                    <CardDescription>
                      Your recent game history and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          arena: "Science Showdown",
                          score: "45/50",
                          position: "1st",
                          date: "Today",
                          category: "Science",
                        },
                        {
                          arena: "History Buffs",
                          score: "38/50",
                          position: "3rd",
                          date: "Yesterday",
                          category: "History",
                        },
                        {
                          arena: "Pop Culture Quiz",
                          score: "42/50",
                          position: "2nd",
                          date: "3 days ago",
                          category: "Entertainment",
                        },
                        {
                          arena: "Geography Masters",
                          score: "35/50",
                          position: "5th",
                          date: "Last week",
                          category: "Geography",
                        },
                        {
                          arena: "Sports Trivia",
                          score: "30/50",
                          position: "7th",
                          date: "Last week",
                          category: "Sports",
                        },
                      ].map((game, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{game.arena}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{game.category}</Badge>
                              <span>{game.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              Score:{" "}
                              <span className="font-medium">{game.score}</span>
                            </div>
                            <div className="text-sm">
                              Position:{" "}
                              <span className="font-medium">
                                {game.position}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/game/history/${i}`}>Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/profile/history">View Full History</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Achievements and milestones you've unlocked
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          name: "First Victory",
                          description: "Win your first game",
                          completed: true,
                          progress: 100,
                          icon: "🏆",
                        },
                        {
                          name: "Perfect Score",
                          description: "Score 100% in any game",
                          completed: true,
                          progress: 100,
                          icon: "🎯",
                        },
                        {
                          name: "Science Expert",
                          description: "Win 10 science quizzes",
                          completed: true,
                          progress: 100,
                          icon: "🧪",
                        },
                        {
                          name: "History Buff",
                          description: "Answer 100 history questions correctly",
                          completed: false,
                          progress: 75,
                          icon: "📜",
                        },
                        {
                          name: "Speed Demon",
                          description:
                            "Answer 20 questions in under 5 seconds each",
                          completed: false,
                          progress: 60,
                          icon: "⚡",
                        },
                        {
                          name: "Social Butterfly",
                          description: "Play games with 50 different players",
                          completed: false,
                          progress: 40,
                          icon: "🦋",
                        },
                        {
                          name: "Arena Master",
                          description: "Create and host 5 successful arenas",
                          completed: true,
                          progress: 100,
                          icon: "👑",
                        },
                        {
                          name: "Trivia Addict",
                          description: "Play 100 games",
                          completed: false,
                          progress: 80,
                          icon: "🎮",
                        },
                      ].map((achievement) => (
                        <div
                          key={achievement.name}
                          className="rounded-lg border p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
                              {achievement.icon}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  {achievement.name}
                                </h3>
                                {achievement.completed && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-auto"
                                  >
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {achievement.description}
                              </p>
                              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-muted-foreground text-right">
                                {achievement.progress}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
