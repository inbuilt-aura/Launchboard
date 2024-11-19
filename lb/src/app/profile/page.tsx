"use client"

import { Camera, Plus } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from '@/components/navbar'

export default function Component() {
  const [links, setLinks] = useState([{ type: "website", url: "" }])
  const [socials, setSocials] = useState([{ type: "social", url: "" }])

  const addLink = (type: "website" | "social") => {
    if (type === "website") {
      setLinks([...links, { type: "website", url: "" }])
    } else {
      setSocials([...socials, { type: "social", url: "" }])
    }
  }

  return (
    <div>
    <Navbar/>
    <div className=" container max-w-[1400px] pt-20 mx-auto flex min-h-screen bg-white">
    
      <div className="w-64 border-r border-gray-200">
        <nav className="space-y-1 p-4">
          <Button variant="ghost" className="w-full justify-start font-normal text-orange-500">
            About
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Education
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Skills
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Experience
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Jobs
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Projects
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-gray-600">
            Activity
          </Button>
        </nav>
      </div>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Profile &gt; About</h1>
            </div>
            <Button variant="outline" className="bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600">
              Preview Profile
            </Button>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="h-48 w-full rounded-lg bg-gray-100">
                <div className="flex h-full items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <div className="absolute -bottom-16 left-4">
                <div className="relative h-24 w-24 rounded-full border-4 border-white bg-gray-200">
                  <div className="flex h-full items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button size="icon" variant="secondary" className="absolute bottom-4 right-4 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="pt-16 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" className="rounded-md border-gray-300" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" className="rounded-md border-gray-300" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="currentRole" className="text-sm font-medium text-gray-700">Current Role</Label>
                <Input id="currentRole" placeholder="Enter Current role" className="rounded-md border-gray-300" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization" className="text-sm font-medium text-gray-700">Current Organization</Label>
                <Input id="organization" placeholder="Enter Current role" className="rounded-md border-gray-300" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="headline" className="text-sm font-medium text-gray-700">Headline</Label>
              <Input
                id="headline"
                placeholder="Enter a concise, impactful headline that highlights your unique strengths or achievements"
                className="rounded-md border-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary" className="text-sm font-medium text-gray-700">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief, engaging summary that showcases your key skills, accomplishments, or contributions"
                className="min-h-[100px] rounded-md border-gray-300"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Add Links</Label>
              <div className="grid gap-4">
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <div key={index} className="relative">
                      <Input placeholder="Add Website" className="rounded-md border-gray-300 pr-10" />
                      {index === links.length - 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => addLink("website")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {socials.map((social, index) => (
                    <div key={index} className="relative">
                      <Input placeholder="Add Socials" className="rounded-md border-gray-300 pr-10" />
                      {index === socials.length - 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => addLink("social")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Submit</Button>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}