"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Globe, Lock, Users } from "lucide-react"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Switch } from "@/shared/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"

export default function CreateArenaPage() {
  const navigate = useNavigate()
  const [arenaType, setArenaType] = useState("public")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    maxPlayers: "10",
    isScheduled: false,
    scheduledDate: "",
    scheduledTime: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    console.log(formData)
    navigate("/dashboard/arenas")
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Create a New Arena</h1>
            <p className="text-muted-foreground">Set up a trivia arena for you and your friends to compete in</p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the basic details for your trivia arena</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Arena Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter a name for your arena"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what your arena is about"
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
                    <div className="space-y-2">
                      <Label htmlFor="arena-type">Arena Type</Label>
                      <div className="flex gap-4">
                        <div
                          className={`flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${
                            arenaType === "public" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setArenaType("public")}
                        >
                          <Globe className="h-6 w-6" />
                          <div className="text-center">
                            <p className="font-medium">Public</p>
                            <p className="text-xs text-muted-foreground">Anyone can join</p>
                          </div>
                        </div>
                        <div
                          className={`flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${
                            arenaType === "private" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setArenaType("private")}
                        >
                          <Lock className="h-6 w-6" />
                          <div className="text-center">
                            <p className="font-medium">Private</p>
                            <p className="text-xs text-muted-foreground">Invite only</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {arenaType === "private" && (
                      <div className="space-y-2">
                        <Label htmlFor="password">Password (Optional)</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Set a password for your arena"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave blank if you want to use invite links only
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => document.querySelector('[data-value="settings"]')?.click()}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Arena Settings</CardTitle>
                    <CardDescription>Configure the settings for your trivia arena</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-players">Maximum Players</Label>
                      <Select
                        value={formData.maxPlayers}
                        onValueChange={(value) => setFormData({ ...formData, maxPlayers: value })}
                      >
                        <SelectTrigger id="max-players">
                          <SelectValue placeholder="Select maximum players" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 players</SelectItem>
                          <SelectItem value="10">10 players</SelectItem>
                          <SelectItem value="20">20 players</SelectItem>
                          <SelectItem value="50">50 players</SelectItem>
                          <SelectItem value="100">100 players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="scheduled">Schedule Arena</Label>
                        <p className="text-sm text-muted-foreground">Set a specific date and time for your arena</p>
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
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="scheduled-date"
                              type="date"
                              className="pl-10"
                              value={formData.scheduledDate}
                              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="scheduled-time">Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="scheduled-time"
                              type="time"
                              className="pl-10"
                              value={formData.scheduledTime}
                              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Allow Spectators</Label>
                          <p className="text-sm text-muted-foreground">Let non-participants watch the games</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Auto-Start Games</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically start games when enough players join
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                    >
                      Back
                    </Button>
                    <Button type="button" onClick={() => document.querySelector('[data-value="themes"]')?.click()}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="themes">
                <Card>
                  <CardHeader>
                    <CardTitle>Arena Theme</CardTitle>
                    <CardDescription>Customize the look and feel of your arena</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme Color</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                            <div
                              key={color}
                              className="flex h-10 cursor-pointer items-center justify-center rounded-md border"
                              style={{ backgroundColor: color }}
                            >
                              <div className="h-6 w-6 rounded-full bg-white/20" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Background Style</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 border-primary bg-primary/5">
                            <div className="h-16 w-full rounded-md bg-gradient-to-r from-primary/20 to-primary/5" />
                            <span className="text-xs">Gradient</span>
                          </div>
                          <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4">
                            <div className="h-16 w-full rounded-md bg-muted" />
                            <span className="text-xs">Solid</span>
                          </div>
                          <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4">
                            <div
                              className="h-16 w-full rounded-md bg-muted"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fillOpacity='0.1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                              }}
                            />
                            <span className="text-xs">Pattern</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Preview</Label>
                        <div className="rounded-lg border p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Science Showdown</h3>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">8 players</span>
                            </div>
                          </div>
                          <div className="mt-4 grid gap-2">
                            <div className="rounded-md bg-primary/10 p-3">
                              <p className="font-medium text-primary">Question 1</p>
                              <p>What is the chemical symbol for gold?</p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                              <div className="rounded-md border p-2 text-center">Au</div>
                              <div className="rounded-md border p-2 text-center">Ag</div>
                              <div className="rounded-md border p-2 text-center">Fe</div>
                              <div className="rounded-md border p-2 text-center">Gd</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => document.querySelector('[data-value="settings"]')?.click()}
                    >
                      Back
                    </Button>
                    <Button type="submit">Create Arena</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

