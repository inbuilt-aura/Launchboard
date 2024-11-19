'use client'

import { Search, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "./job-card"
import { Navbar } from '@/components/navbar'

export default function Component() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("navigate-jobs")
  const [selectedLocation, setSelectedLocation] = useState("any")
  const [selectedCompensation, setSelectedCompensation] = useState("any")
  const [selectedSalaryType, setSelectedSalaryType] = useState("yearly")
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([])

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div>
      <Navbar/>
  
    <div className="container  max-w-[1400px] mx-auto px-4 md:px-6 pt-28">
      
      <div className="mb-8">
        <h1 className="text-2xl text-bricolage md:text-3xl font-bold">
          Navigate <span className="text-[#FF5C35]">jobs</span> on Launchboard
        </h1>
        <p className="text-muted-foreground">
          Find your perfect role with easy job search and flexible compensations
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input className="pl-10" placeholder="What position are you looking for ?" />
          </div>
          <Input placeholder="Location" className="md:w-64" />
          <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90">Search</Button>
        </div>
      </div>

      <Tabs defaultValue="navigate-jobs" className="mb-8">
        <TabsList className="bg-transparent border-b">
          <TabsTrigger 
            value="navigate-jobs" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none"
            onClick={() => setActiveTab("navigate-jobs")}
          >
            Navigate Jobs
          </TabsTrigger>
          <TabsTrigger 
            value="jobs-applied" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none"
            onClick={() => setActiveTab("jobs-applied")}
          >
            Jobs Applied
          </TabsTrigger>
          <TabsTrigger 
            value="jobs-posted" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none"
            onClick={() => setActiveTab("jobs-posted")}
          >
            Jobs Posted
          </TabsTrigger>
          <TabsTrigger 
            value="post-a-job" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none"
            onClick={() => setActiveTab("post-a-job")}
          >
            Post a Job
          </TabsTrigger>
        </TabsList>
        <TabsContent value="navigate-jobs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            <Card className="md:col-span-3 p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-semibold">Location</h3>
                  <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
                    <div className="space-y-2">
                      {["Any", "Remote", "On site", "Hybrid"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.toLowerCase()} id={`location-${option.toLowerCase()}`} />
                          <Label htmlFor={`location-${option.toLowerCase()}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Compensation</h3>
                  <RadioGroup value={selectedCompensation} onValueChange={setSelectedCompensation}>
                    <div className="space-y-2">
                      {["Any", "Equity", "Project tokens", "Stablecoins", "Hybrid"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.toLowerCase()} id={`compensation-${option.toLowerCase()}`} />
                          <Label htmlFor={`compensation-${option.toLowerCase()}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Salary</h3>
                  <div className="mb-4 flex gap-2">
                    {["Hourly", "Monthly", "Yearly"].map((type) => (
                      <Button
                        key={type}
                        variant={selectedSalaryType === type.toLowerCase() ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSalaryType(type.toLowerCase())}
                        className="flex-1"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[30000, 50000, 80000, 100000].map((amount) => (
                      <div key={amount} className="flex items-center space-x-2">
                        <Checkbox id={`salary-${amount}`} />
                        <Label htmlFor={`salary-${amount}`}>{">"} ${amount}K</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Date of posting</h3>
                  <RadioGroup defaultValue="all-time">
                    <div className="space-y-2">
                      {["All time", "Last 24 hours", "Last 7 days", "Last 30 days"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.toLowerCase().replace(/\s/g, '-')} id={`date-${option.toLowerCase().replace(/\s/g, '-')}`} />
                          <Label htmlFor={`date-${option.toLowerCase().replace(/\s/g, '-')}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Type of employment</h3>
                  <RadioGroup defaultValue="full-time">
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Bounty"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.toLowerCase()} id={`employment-${option.toLowerCase()}`} />
                          <Label htmlFor={`employment-${option.toLowerCase()}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Compensation Model</h3>
                  <RadioGroup defaultValue="any">
                    <div className="space-y-2">
                      {["Any", "Milestone based", "Contractual", "Salary"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.toLowerCase().replace(/\s/g, '-')} id={`model-${option.toLowerCase().replace(/\s/g, '-')}`} />
                          <Label htmlFor={`model-${option.toLowerCase().replace(/\s/g, '-')}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>

            {/* Main Content */}
            <div className="md:col-span-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">318 Jobs</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <JobCard
                  id="1"
                  companyName="Ecma Corp"
                  companyLogo="/images/companies/ecma-corp.png?height=40&width=40"
                  position="Software Engineer"
                  location="Brussels"
                  employmentType="Full time"
                  salary="50-55k"
                  postedTime="29 min ago"
                  description="Build, test, and maintain efficient, reliable software systems while collaborating with the team to meet project goals."
                  isActivelyHiring
                  isBookmarked={bookmarkedJobs.includes('1')}
                  onBookmark={() => handleBookmark('1')}
                />
                <JobCard
                  id="2"
                  companyName="Hash Corp"
                  companyLogo="/images/companies/hash-corp.png?height=40&width=40"
                  position="Junior UI Designer"
                  location="Remote"
                  employmentType="Full time"
                  salary="50-55k"
                  postedTime="1d ago"
                  description="Assist in creating user-friendly interfaces, design prototypes, and collaborate with the team to enhance the overall user experience."
                  isActivelyHiring
                  isBookmarked={bookmarkedJobs.includes('2')}
                  onBookmark={() => handleBookmark('2')}
                />
                <JobCard
                  id="3"
                  companyName="Raleway Inc"
                  companyLogo="/images/companies/raleway.png?height=40&width=40"
                  position="Technical Support Engineer"
                  location="Austin, Texas"
                  employmentType="Full time"
                  salary="50-55k"
                  postedTime="1d ago"
                  description="Provide technical assistance, troubleshoot issues, and ensure seamless operation of systems for clients and internal teams."
                  isBookmarked={bookmarkedJobs.includes('3')}
                  onBookmark={() => handleBookmark('3')}
                />
                <JobCard
                  id="4"
                  companyName="Frie AI"
                  companyLogo="/images/companies/frie.png?height=40&width=40"
                  position="Product Designer"
                  location="Austin, Texas"
                  employmentType="Full time"
                  salary="50-55k"
                  postedTime="1d ago"
                  description="Design and refine user-centered products, create prototypes, and collaborate with cross-functional teams to deliver exceptional experiences."
                  isBookmarked={bookmarkedJobs.includes('4')}
                  onBookmark={() => handleBookmark('4')}
                />
                <JobCard
                  id="5"
                  companyName="Glaze"
                  companyLogo="/images/companies/glaze.png?height=40&width=40"
                  position="Copywriter (Growth)"
                  location="London, UK"
                  employmentType="Full time"
                  salary="50-55k"
                  postedTime="1d ago"
                  description="Craft compelling content that resonates with audiences and elevates our brand voice. Bring your creativity and writing skills to drive impactful marketing campaigns."
                  isBookmarked={bookmarkedJobs.includes('5')}
                  onBookmark={() => handleBookmark('5')}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" size="sm" className="mx-1">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className="mx-1"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm" className="mx-1">
                  Next
                  <ChevronDown className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>

            {/* Right Sidebar */}
            <Card className="md:col-span-3 p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-semibold">Filter roles</h3>
                  <div className="space-y-4">
                    {["Business", "Design", "Technical", "Others"].map((category) => (
                      <Select key={category}>
                        <SelectTrigger>
                          <SelectValue placeholder={category} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["AI", "SaaS", "Fintech", "Web3", "AI/ML", "Cloud"].map((tag) => (
                      <Button key={tag} variant="outline" size="sm">
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Email me for jobs</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendation for newly posted jobs
                  </p>
                  <Input type="email" placeholder="name@email.com" />
                  <Button className="w-full bg-[#FF5C35] hover:bg-[#FF5C35]/90">Subscribe</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Get noticed faster</h3>
                  <p className="text-sm text-muted-foreground">
                    A well maintained profile increases your chances of getting hired substantially
                  </p>
                  <Button className="w-full bg-[#FF5C35] hover:bg-[#FF5C35]/90">Upload your resume</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="jobs-applied">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Image src="/placeholder.svg?height=128&width=128" width={128} height={128} alt="No jobs applied" className="mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No jobs applied yet</h2>
            <p className="text-muted-foreground mb-4">Start applying to jobs to see them here</p>
            <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90">Explore jobs</Button>
          </div>
        </TabsContent>
        <TabsContent value="jobs-posted">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Image src="/placeholder.svg?height=128&width=128" width={128} height={128} alt="No jobs posted" className="mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No jobs posted yet</h2>
            <p className="text-muted-foreground mb-4">Start posting jobs to see them here</p>
            <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90">Post a job</Button>
          </div>
        </TabsContent>
        <TabsContent value="post-a-job">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Image src="/placeholder.svg?height=128&width=128" width={128} height={128} alt="Post a job" className="mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Ready to post a job?</h2>
            <p className="text-muted-foreground mb-4">Fill out the form to get started</p>
            <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90">Start posting</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}