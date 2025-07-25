"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Plus, Trash } from "lucide-react"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Switch } from "@/shared/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion"
import { Button } from "@/shared/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function CreateGamePage() {
  const navigate = useNavigate()
  // const searchParams = useSearchParams()
  const arenaId = searchParams.get("arena")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    timeLimit: "30",
    pointsPerQuestion: "10",
    isScheduled: false,
    scheduledDate: "",
    scheduledTime: "",
  })

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: "20",
      points: "10",
    },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        timeLimit: "20",
        points: "10",
      },
    ])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    console.log({ formData, questions })
    navigate(arenaId ? `/arena/${arenaId}` : "/dashboard")
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Create a New Game</h1>
            <p className="text-muted-foreground">Set up a trivia game with custom questions</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Game Details</CardTitle>
                  <CardDescription>Enter the basic details for your trivia game</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Game Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a title for your game"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your game is about"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="mixed">Mixed Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="time-limit">Default Time Limit (seconds)</Label>
                      <Select
                        value={formData.timeLimit}
                        onValueChange={(value) => setFormData({ ...formData, timeLimit: value })}
                      >
                        <SelectTrigger id="time-limit">
                          <SelectValue placeholder="Select time limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 seconds</SelectItem>
                          <SelectItem value="20">20 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="45">45 seconds</SelectItem>
                          <SelectItem value="60">60 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points">Default Points per Question</Label>
                      <Select
                        value={formData.pointsPerQuestion}
                        onValueChange={(value) => setFormData({ ...formData, pointsPerQuestion: value })}
                      >
                        <SelectTrigger id="points">
                          <SelectValue placeholder="Select points" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 points</SelectItem>
                          <SelectItem value="10">10 points</SelectItem>
                          <SelectItem value="20">20 points</SelectItem>
                          <SelectItem value="50">50 points</SelectItem>
                          <SelectItem value="100">100 points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="scheduled">Schedule Game</Label>
                      <p className="text-sm text-muted-foreground">Set a specific date and time for your game</p>
                    </div>
                    <Switch
                      id="scheduled"
                      checked={formData.isScheduled}
                      onCheckedChange={(checked) => setFormData({ ...formData, isScheduled: checked })}
                    />
                  </div>
                  {formData.isScheduled && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="scheduled-date">Date</Label>
                        <div className="relative">
                          <Input
                            id="scheduled-date"
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduled-time">Time</Label>
                        <div className="relative">
                          <Input
                            id="scheduled-time"
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Questions</CardTitle>
                  <CardDescription>Add questions to your trivia game</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="multiple" defaultValue={["question-0"]} className="w-full">
                    {questions.map((question, questionIndex) => (
                      <AccordionItem key={questionIndex} value={`question-${questionIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2 text-left">
                            <span className="font-medium">Question {questionIndex + 1}</span>
                            <span className="text-sm text-muted-foreground truncate">
                              {question.question || "No question text yet"}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                              <Textarea
                                id={`question-${questionIndex}`}
                                placeholder="Enter your question"
                                value={question.question}
                                onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Answer Options</Label>
                              <div className="grid gap-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                                      {String.fromCharCode(65 + optionIndex)}
                                    </div>
                                    <Input
                                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                      value={option}
                                      onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                                      required
                                    />
                                    <div className="flex items-center">
                                      <input
                                        type="radio"
                                        id={`correct-${questionIndex}-${optionIndex}`}
                                        name={`correct-${questionIndex}`}
                                        checked={question.correctAnswer === optionIndex}
                                        onChange={() => updateQuestion(questionIndex, "correctAnswer", optionIndex)}
                                        className="h-4 w-4"
                                      />
                                      <Label
                                        htmlFor={`correct-${questionIndex}-${optionIndex}`}
                                        className="ml-2 text-sm"
                                      >
                                        Correct
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor={`time-limit-${questionIndex}`}>Time Limit (seconds)</Label>
                                <div className="relative">
                                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Select
                                    value={question.timeLimit}
                                    onValueChange={(value) => updateQuestion(questionIndex, "timeLimit", value)}
                                  >
                                    <SelectTrigger id={`time-limit-${questionIndex}`} className="pl-10">
                                      <SelectValue placeholder="Select time limit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="10">10 seconds</SelectItem>
                                      <SelectItem value="20">20 seconds</SelectItem>
                                      <SelectItem value="30">30 seconds</SelectItem>
                                      <SelectItem value="45">45 seconds</SelectItem>
                                      <SelectItem value="60">60 seconds</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`points-${questionIndex}`}>Points</Label>
                                <Select
                                  value={question.points}
                                  onValueChange={(value) => updateQuestion(questionIndex, "points", value)}
                                >
                                  <SelectTrigger id={`points-${questionIndex}`}>
                                    <SelectValue placeholder="Select points" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5">5 points</SelectItem>
                                    <SelectItem value="10">10 points</SelectItem>
                                    <SelectItem value="20">20 points</SelectItem>
                                    <SelectItem value="50">50 points</SelectItem>
                                    <SelectItem value="100">100 points</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => removeQuestion(questionIndex)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Question
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Button type="button" variant="outline" className="w-full" onClick={addQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Game</Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

