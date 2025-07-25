import { Button } from "@/shared/components/ui/button";
import { Brain } from "lucide-react";
import { githubSignup, googleSignup } from "../services/useAuthStore";

export default function SignupPage() {

  return (
    <div className="flex  h-screen w-screen">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex items-center gap-2 justify-center mb-8">
            <Brain className="h-8 w-8" />{" "}
            <p className="text-2xl font-bold">Trivia Clash</p>
          </div>

          <h2 className="text-center text-muted-foreground">
            No passwords needed - just one click with your existing accounts
          </h2>

          <p>We've eliminated passwords to give you:</p>
          <ul className="benefits-list">
            <li>One-click sign in</li>
            <li>No passwords to remember</li>
            <li>Built-in security from Google/GitHub</li>
          </ul>

          <div className="grid gap-2">
            <Button variant="outline" className="w-full" onClick={googleSignup}>
              Google
            </Button>
            <Button variant="outline" className="w-full" onClick={githubSignup}>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            We'll only access your basic profile information
          </p>
        </div>
      </div>
      <section className="hidden md:flex md:w-1/2 bg-pink-400"></section>
    </div>
  );
}
