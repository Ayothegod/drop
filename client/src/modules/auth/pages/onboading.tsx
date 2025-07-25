import { Brain, Check, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Textarea } from "@/shared/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useUsernameChecker } from "../services/checkUsername";
import { Helmet } from "react-helmet-async";
import { useOnbordingStore } from "../services/useOnboardingStore";
import { useToast } from "@/shared/hooks/use-toast";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    bio,
    experience,
    filterInterests,
    interests,
    setBio,
    setExperience,
    setInterests,
    isError,
    loading,
    setIsError,
    setLoading,
    updateProfile,
    setUsername,
    username,
  } = useOnbordingStore();
  
  const [step, setStep] = useState(1);
  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const { msg, type, arrays, data } = await updateProfile(
        username,
        interests,
        bio,
        experience
      );
      // console.log({ msg, type, arrays });

      if (arrays) {
        // console.log({ data });

        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div>
              {data?.map((data) => (
                <p>{data.message}</p>
              ))}
            </div>
          ),
          duration: 5000,
        });
        return;
      } else if (type == "error") {
        toast({ title: "Error", description: msg, variant: "destructive" });
        return;
      } else {
        toast({ title: "Success", description: msg });
        navigate("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const { checkUsername } = useUsernameChecker();

  const handleUsernameChange = (username: string) => {
    checkUsername(
      username,
      (data) => {
        setIsError(false);
        setLoading(false);
        toast({ title: "Success", description: data });
      },
      (errorMsg) => {
        setIsError(true);
        setLoading(false);
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive",
        });
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Trivia Clash - Onboarding</title>
        <meta
          name="description"
          content="Challenge Minds. Win Rounds. Rule the Leaderboard."
        />
      </Helmet>
      <div className="container flex min-h-screen flex-col items-center justify-center py-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <Brain className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Complete Your Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Let&apos;s set up your profile so you can start playing trivia
              games
            </p>
          </div>

          <div className="flex justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : step > i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground bg-background text-muted-foreground"
                  }`}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {i === 1 ? "Basic Info" : i === 2 ? "Preferences" : "Finish"}
                </span>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? "Basic Information"
                  : step === 2
                  ? "Your Preferences"
                  : "Almost Done!"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Tell us a bit about yourself"
                  : step === 2
                  ? "Select your trivia preferences"
                  : "Review your information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex w-full justify-between">
                      <Label htmlFor="username">Username</Label>

                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : isError === null ? null : isError === false ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <XCircle className="text-red-500" />
                      )}
                    </div>
                    <Input
                      id="username"
                      value={username}
                      placeholder="Choose a unique username"
                      onChange={(e) => {
                        const value = e.target.value;
                        setUsername(value);
                        setLoading(true);
                        handleUsernameChange(value);
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a bit about yourself"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Trivia Experience</Label>
                    <RadioGroup
                      value={experience}
                      onValueChange={(
                        value: "beginner" | "intermediate" | "expert"
                      ) => setExperience(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner">Beginner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="intermediate"
                          id="intermediate"
                        />
                        <Label htmlFor="intermediate">Intermediate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">Expert</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label>Favorite Categories (Select at least 3)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "History",
                        "Science",
                        "Sports",
                        "Entertainment",
                        "Geography",
                        "Art",
                        "Literature",
                        "Technology",
                      ].map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={category.toLowerCase()}
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInterests(category);
                              } else {
                                filterInterests(category);
                              }
                            }}
                            checked={interests.includes(category)}
                          />
                          <Label htmlFor={category.toLowerCase()}>
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-xl">Profile Summary</h3>
                    <div className="mt-2 space-y-2">
                      <p>
                        <span className="font-medium">Username:</span>{" "}
                        <span className="font-normal text-muted-foreground">
                          {username}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Bio:</span>{" "}
                        <span className="font-normal text-muted-foreground">
                          {bio}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Experience:</span>{" "}
                        <span className="font-normal text-muted-foreground">
                          {experience}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Interests:</span>{" "}
                        <span className="font-normal text-muted-foreground">
                          {interests.join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can always update your profile information later.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {step < 3 ? "Next" : "Complete Setup"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>{" "}
    </>
  );
}
