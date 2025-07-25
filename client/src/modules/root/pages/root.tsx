/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/shared/components/ui/button";
// import { ModeToggle } from "@/shared/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Brain, Users } from "lucide-react";

export default function Root() {
    /* <ModeToggle/> */

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Challenge Your Knowledge with Friends
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Create trivia arenas, invite friends, and compete in
                  real-time. Show off your knowledge and climb the leaderboards.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">
                  <Button size="lg" className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-[450px] rounded-full bg-gradient-to-b from-primary/20 to-primary/0 p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl bg-background p-8 shadow-lg">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">Science Quiz</h3>
                        <p className="text-sm text-muted-foreground">
                          Question 3 of 10
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">
                          What is the chemical symbol for gold?
                        </p>
                        <div className="grid gap-2">
                          <Button variant="outline" className="justify-start">
                            Au
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Ag
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Fe
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Gd
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to create and enjoy trivia games with
                friends
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Custom Quizzes</h3>
                <p className="text-muted-foreground">
                  Create your own trivia games with custom questions and
                  categories
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Multiplayer Arenas</h3>
                <p className="text-muted-foreground">
                  Compete with friends in real-time trivia arenas
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Leaderboards</h3>
                <p className="text-muted-foreground">
                  Track your progress and compete for the top spot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Trivia Quiz App. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
