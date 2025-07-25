"use client";

import { useState, useEffect } from "react";
import { Clock, Flag, Users } from "lucide-react";

import { Progress } from "@/shared/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export default function GamePage() {
  const id = "params.id";
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // Sample questions data
  const questions = [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Gd"],
      correctAnswer: 0,
      timeLimit: 20,
      points: 10,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      timeLimit: 20,
      points: 10,
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Brain"],
      correctAnswer: 2,
      timeLimit: 20,
      points: 10,
    },
    {
      question: "Which of these elements is a noble gas?",
      options: ["Oxygen", "Chlorine", "Neon", "Sodium"],
      correctAnswer: 2,
      timeLimit: 20,
      points: 10,
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "200,000 km/s"],
      correctAnswer: 0,
      timeLimit: 20,
      points: 10,
    },
  ];

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      // Game is over, navigate to results
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (!isAnswered) {
            // Time's up without answering
            setIsAnswered(true);
            setTimeout(() => {
              nextQuestion();
            }, 2000);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, questions.length]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + questions[currentQuestion].points);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
      setIsAnswered(false);
    } else {
      // Game is over, navigate to results
      navigate(`/game/${id}/results?score=${score}`);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Game Complete!</CardTitle>
            <CardDescription>Redirecting to results...</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={100} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Science Quiz</h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>8 players</span>
              </div>
              <Button variant="outline" size="sm">
                <Flag className="mr-2 h-4 w-4" />
                Report
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="w-32"
              />
              <span className="text-sm">
                {currentQuestion}/{questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Score:</span>
              <span>{score}</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span
                    className={`font-medium ${
                      timeLeft < 5 ? "text-red-500" : ""
                    }`}
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <Progress
                value={(timeLeft / currentQuestionData.timeLimit) * 100}
                className="w-full"
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-lg font-medium">
                  {currentQuestionData.question}
                </p>
              </div>
              <div className="grid gap-3">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                      selectedOption === index
                        ? index === currentQuestionData.correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : isAnswered &&
                          index === currentQuestionData.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Alex Johnson", score: 40, position: 1 },
                  { name: "Sarah Williams", score: 30, position: 2 },
                  { name: "You", score: score, position: 3, isYou: true },
                  { name: "Michael Brown", score: 20, position: 4 },
                  { name: "Emily Davis", score: 10, position: 5 },
                ].map((player) => (
                  <div
                    key={player.position}
                    className={`flex items-center justify-between rounded-lg border p-2 ${
                      player.isYou ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                        {player.position}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-user.jpg`} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={player.isYou ? "font-medium" : ""}>
                        {player.name}
                      </span>
                    </div>
                    <span className="font-medium">{player.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
