'use client'

import { Bookmark, ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Navbar } from "@/components/navbar";


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projectCategories = [
    "All", "AI", "Web3", "Enterprise", "DeSoc", "Data & Analytics", "DeFin", "GameFi", "DePIN"
  ]
const projects = [
  {
    id: 1,
    name: "Hash Corp",
    logo: "/images/companies/hash-corp.png?height=48&width=48",
    description: "A state-of-the-art AI face analyzer which gives you a compatible skin care routine as per your needs",
    location: "San Francisco",
    type: "B2B",
    employees: "10 employees",
    stage: "Growth Stage",
    fundingStatus: "Recently Funded",
    likes: 45,
    comments: 10
  },
  {
    id: 2,
    name: "Ecma Corp",
    logo: "/images/companies/ecma-corp.png?height=48&width=48",
    description: "A state-of-the-art AI face analyzer which gives you a compatible skin care routine as per your needs",
    location: "San Francisco",
    type: "B2B",
    employees: "10 employees",
    stage: "Growth Stage",
    fundingStatus: "Recently Funded",
    likes: 45,
    comments: 10
  },
  {
    id: 3,
    name: "Frie AI",
    logo: "/images/companies/frie.png?height=48&width=48",
    description: "A state-of-the-art AI face analyzer which gives you a compatible skin care routine as per your needs",
    location: "San Francisco",
    type: "B2B",
    employees: "10 employees",
    stage: "Growth Stage",
    fundingStatus: "Recently Funded",
    likes: 45,
    comments: 10
  },
]

export default function ProjectFeed() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div>


        <Navbar/>

    <div className="container max-w-[1400px] pt-20 mx-auto px-4 py-8">
      <Tabs defaultValue="navigate-projects" className="w-full">
        <TabsList className="mb-6 bg-transparent border-b border-gray-200">
          <TabsTrigger 
            value="navigate-projects" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
          >
            Navigate Projects
          </TabsTrigger>
          <TabsTrigger 
            value="projects-applied" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
          >
            Projects Applied
          </TabsTrigger>
          <TabsTrigger 
            value="projects-posted" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
          >
            Projects Posted
          </TabsTrigger>
          <TabsTrigger 
            value="post-a-project" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
          >
            Post a Project
          </TabsTrigger>
        </TabsList>
        <TabsContent value="navigate-projects">
          <h1 className="text-3xl font-bold mb-2">
            Navigate <span className="text-[#FF5C35]">projects</span> on Launchboard
          </h1>
          <p className="text-gray-600 mb-6">
            Discover exciting projects and opportunities. Collaborate and contribute
          </p>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {projectCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedCategory === category 
                    ? "bg-[#FF5C35] text-white" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">3929 projects</h2>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="funded">Recently Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-8">
            {["B2B", "Healthcare", "DeFi"].map((category) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <Button variant="link" className="text-[#FF5C35]">View all {category} projects</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="icon" className="mx-1">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                className={`mx-1 ${page === 1 ? "bg-[#FF5C35] text-white" : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="mx-1">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
          <Image
            src={project.logo}
            alt={`${project.name} logo`}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <div className="flex gap-2 mt-1">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{project.stage}</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{project.fundingStatus}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
          <span>{project.location}</span>
          <span>•</span>
          <span>{project.type}</span>
          <span>•</span>
          <span>{project.employees}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <MessageCircle className="h-4 w-4 mr-1" />
              {project.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Bookmark className="h-4 w-4 mr-1" />
              {project.likes}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}