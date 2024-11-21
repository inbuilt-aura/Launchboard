"use client"

import React from "react"
import { X, MapPin, DollarSign, Clock, Briefcase, Users, Bookmark, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface JobDescriptionSidebarProps {
  isOpen: boolean
  onClose: () => void
  job: {
    id: string
    companyName: string
    companyLogo: string
    position: string
    location: string
    employmentType: string
    salary: string
    postedTime: string
    employees: string
    description: string
    aboutStartup: string
    jobHighlights: {
      title: string
      subtitle: string
      icon: React.ReactNode
    }[]
    tags: string[]
  }
  onApply: () => void
  onBookmark: () => void
  onShare: () => void
  isBookmarked: boolean
  isApplied: boolean
}

export function JobDescriptionSidebar({
  isOpen,
  onClose,
  job,
  onApply,
  onBookmark,
  onShare,
  isBookmarked,
  isApplied,
}: JobDescriptionSidebarProps) {
  const [copied, setCopied] = React.useState(false)
  const shareUrl = `https://launchboard.com/jobs/${job.id}`

  if (!isOpen) return null

  const handleShare = async (platform: string) => {
    const text = `Check out this ${job.position} position at ${job.companyName}`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`,
    }

    if (platform === "copy") {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      if (onShare) onShare()
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank")
    }
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-[70vw] max-w-6xl bg-white shadow-lg overflow-y-auto z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold">Job Description</h2>
          <h3 className="text-sm text-gray-600">
            <span className="font-bold mr-1">{job.position}</span>@{" "}
            <span className="text-red-500 underline ml-1">{job.companyName}</span>
          </h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6 space-y-6 bg-gray-100">
        <div className="flex flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <Card className="bg-gray-50 p-4">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Image
                      src={job.companyLogo}
                      alt={`${job.companyName} logo`}
                      width={64}
                      height={64}
                      className="rounded-lg h-16 w-auto"
                    />
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        {job.companyName}
                      </h3>
                      <h4 className="text-lg font-semibold mt-1">
                        {job.position}
                      </h4>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.employmentType}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />${job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.postedTime}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {job.employees}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onBookmark}
                      className={isBookmarked ? "text-[#FB7637]" : ""}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleShare("twitter")}>
                          Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("facebook")}>
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                          LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("email")}>
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("copy")}>
                          {copied ? "Copied!" : "Copy link"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 p-4">
              <CardContent className="p-0">
                <h4 className="font-semibold text-lg mb-2">About the job</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.description}
                </p>
                <Button variant="outline" className="w-full">
                  Read more
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Right Column */}
          <div className="flex-1 space-y-4">
            <Card className="bg-gray-50 p-4">
              <CardContent className="p-0">
                <h4 className="font-semibold text-lg mb-2">Apply to {job.companyName}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the next step in your career journey by applying to this exciting opportunity at {job.companyName}.
                </p>
                <Button
                  className={`w-full ${
                    isApplied
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-[#FB7637] hover:bg-[#FB7637]/90"
                  } text-white`}
                  onClick={onApply}
                  disabled={isApplied}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 p-4">
              <CardContent className="p-0 space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">About the startup</h4>
                  <p className="text-sm text-muted-foreground mb-4">{job.aboutStartup}</p>
                  <Button variant="outline" className="w-full">
                    Read more
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">Job Highlights</h4>
                  <div className="space-y-3">
                    {job.jobHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {highlight.icon}
                        <div>
                          <h5 className="font-semibold">{highlight.title}</h5>
                          <p className="text-sm text-muted-foreground">
                            {highlight.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

