import { Brain, Plus, Search, Users } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function ArenasPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Arenas</h1>
          <p className="text-muted-foreground">
            Create or join trivia arenas to compete with friends
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search arenas..." />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/arena/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Arena
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/arena/join">Join Arena</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="your-arenas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="your-arenas">Your Arenas</TabsTrigger>
            <TabsTrigger value="public-arenas">Public Arenas</TabsTrigger>
            <TabsTrigger value="past-arenas">Past Arenas</TabsTrigger>
          </TabsList>
          <TabsContent value="your-arenas">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 1,
                  name: "Science Showdown",
                  players: 8,
                  status: "active",
                  category: "Science",
                },
                {
                  id: 2,
                  name: "History Buffs",
                  players: 12,
                  status: "active",
                  category: "History",
                },
                {
                  id: 3,
                  name: "Movie Trivia Night",
                  players: 6,
                  status: "scheduled",
                  category: "Entertainment",
                },
                {
                  id: 4,
                  name: "Sports Fanatics",
                  players: 10,
                  status: "active",
                  category: "Sports",
                },
              ].map((arena) => (
                <Card key={arena.id}>
                  <CardHeader>
                    <CardTitle>{arena.name}</CardTitle>
                    <CardDescription>{arena.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {arena.players} players
                        </div>
                        <div
                          className={`rounded-full px-2 py-1 text-xs ${
                            arena.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {arena.status === "active" ? "Active" : "Scheduled"}
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to={`/arena/${arena.id}`}>Enter Arena</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="public-arenas">
            <div className="mb-6 flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="active">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 5,
                  name: "Geography Masters",
                  players: 15,
                  status: "active",
                  category: "Geography",
                },
                {
                  id: 6,
                  name: "Music Through the Ages",
                  players: 9,
                  status: "active",
                  category: "Music",
                },
                {
                  id: 7,
                  name: "Tech Trivia",
                  players: 11,
                  status: "scheduled",
                  category: "Technology",
                },
                {
                  id: 8,
                  name: "Art & Literature",
                  players: 7,
                  status: "active",
                  category: "Art",
                },
                {
                  id: 9,
                  name: "Food & Drink Quiz",
                  players: 14,
                  status: "active",
                  category: "Food",
                },
                {
                  id: 10,
                  name: "General Knowledge",
                  players: 20,
                  status: "scheduled",
                  category: "General",
                },
              ].map((arena) => (
                <Card key={arena.id}>
                  <CardHeader>
                    <CardTitle>{arena.name}</CardTitle>
                    <CardDescription>{arena.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {arena.players} players
                        </div>
                        <div
                          className={`rounded-full px-2 py-1 text-xs ${
                            arena.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {arena.status === "active" ? "Active" : "Scheduled"}
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to={`/arena/${arena.id}`}>Join Arena</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past-arenas">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 11,
                  name: "Weekend Trivia",
                  players: 18,
                  date: "Last Sunday",
                  category: "Mixed",
                },
                {
                  id: 12,
                  name: "Science Challenge",
                  players: 12,
                  date: "Last Friday",
                  category: "Science",
                },
                {
                  id: 13,
                  name: "Movie Buffs",
                  players: 9,
                  date: "2 weeks ago",
                  category: "Movies",
                },
                {
                  id: 14,
                  name: "History Quiz",
                  players: 14,
                  date: "3 weeks ago",
                  category: "History",
                },
              ].map((arena) => (
                <Card key={arena.id}>
                  <CardHeader>
                    <CardTitle>{arena.name}</CardTitle>
                    <CardDescription>{arena.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {arena.players} players
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {arena.date}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/arena/${arena.id}/results`}>
                          View Results
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function ArenasLoadingPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Brain className="h-10 w-10 animate-pulse text-primary" />
        <h2 className="text-xl font-medium">Loading...</h2>
        <p className="text-sm text-muted-foreground">
          Preparing your trivia experience - arenas loader
        </p>
      </div>
    </div>
  );
}
