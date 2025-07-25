import { Award, Brain, Plus, Trophy, Users } from "lucide-react";

Button;
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authClient } from "@/shared/lib/auth-client";

export function DashboardPage() {

  // const { data: session } = authClient.useSession();
  // console.log(session);


  return (
    <>
      <Helmet>
        <title>Trivia Clash - Dashboard</title>
        <meta
          name="description"
          content="Challenge Minds. Win Rounds. Rule the Leaderboard."
        />
      </Helmet>

      <div className="container py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Welcome back, User!</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your trivia games
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Games Played
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +5 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Global Rank
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#156</div>
                <p className="text-xs text-muted-foreground">
                  Moved up 12 places
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Your Arenas</CardTitle>
                <CardDescription>
                  Arenas you&apos;ve created or joined recently
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  {
                    id: 1,
                    name: "Science Showdown",
                    players: 8,
                    status: "active",
                  },
                  {
                    id: 2,
                    name: "History Buffs",
                    players: 12,
                    status: "active",
                  },
                  {
                    id: 3,
                    name: "Movie Trivia Night",
                    players: 6,
                    status: "scheduled",
                  },
                ].map((arena) => (
                  <div
                    key={arena.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{arena.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {arena.players} players
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full px-2 py-1 text-xs ${
                          arena.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {arena.status === "active" ? "Active" : "Scheduled"}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/arena/${arena.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard/arenas">
                      <Plus className="mr-2 h-4 w-4" />
                      View All Arenas
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Games</CardTitle>
                <CardDescription>
                  Your recent trivia game results
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  {
                    id: 1,
                    arena: "Science Showdown",
                    score: "8/10",
                    position: "1st",
                    date: "Today",
                  },
                  {
                    id: 2,
                    name: "History Buffs",
                    score: "7/10",
                    position: "3rd",
                    date: "Yesterday",
                  },
                  {
                    id: 3,
                    name: "Pop Culture Quiz",
                    score: "6/10",
                    position: "5th",
                    date: "3 days ago",
                  },
                ].map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{game.arena || game.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {game.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        Score: <span className="font-medium">{game.score}</span>
                      </div>
                      <div className="text-sm">
                        Position:{" "}
                        <span className="font-medium">{game.position}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard/games">
                      <Plus className="mr-2 h-4 w-4" />
                      View Game History
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start playing or create new content
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Button className="h-24 flex-col" asChild>
                  <Link to="/arena/create">
                    <Plus className="mb-2 h-5 w-5" />
                    Create New Arena
                  </Link>
                </Button>
                <Button className="h-24 flex-col" variant="outline" asChild>
                  <Link to="/arena/join">
                    <Users className="mb-2 h-5 w-5" />
                    Join Arena
                  </Link>
                </Button>
                <Button className="h-24 flex-col" variant="outline" asChild>
                  <Link to="/game/create">
                    <Brain className="mb-2 h-5 w-5" />
                    Create New Game
                  </Link>
                </Button>
                <Button className="h-24 flex-col" variant="outline" asChild>
                  <Link to="/dashboard/leaderboards">
                    <Trophy className="mb-2 h-5 w-5" />
                    View Leaderboards
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Your trivia performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Science</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[85%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">History</span>
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
                      <span className="text-muted-foreground">Sports</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[65%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile/stats">View Detailed Stats</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
