'use client'

import { useState } from 'react'
import { Navbar } from "@/components/navbar"
import { ProjectFeed } from "@/components/project-feed"
import { ProjectSidebar } from "@/components/project-sidebar"
import { Toaster } from "@/components/ui/toaster"

interface Project {
  id: number;
  name: string;
  logo: string;
  description: string;
  shortDescription: string;
  location: string;
  type: string;
  employees: string;
  stage: string;
  fundingStatus: string;
  likes: number;
  comments: number;
}

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDrawerOpen(true)
  }

  return (
    <div>
      <Navbar />
      <div className="container max-w-[1400px] pt-20 mx-auto px-4 py-8">
        <ProjectFeed onProjectClick={handleProjectClick} />
      </div>
      <ProjectSidebar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedProject={selectedProject}
      />
      <Toaster />
    </div>
  )
}

