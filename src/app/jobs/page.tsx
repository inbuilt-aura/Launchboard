"use client";

import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { JobCard } from "./job-card";

export default function JobBoard() {
  const [activeTab, setActiveTab] = useState("navigate-jobs");
  const [selectedLocation, setSelectedLocation] = useState("any");
  const [selectedCompensation, setSelectedCompensation] = useState("any");
  const [selectedSalaryType, setSelectedSalaryType] = useState("yearly");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [jobs, setJobs] = useState([
    {
      id: "1",
      companyName: "Ecma Corp",
       companyLogo:"/images/companies/ecma-corp.png?height=40&width=40",
      position: "Software Engineer",
      location: "Brussels",
      employmentType: "Full time",
      salary: "50-55k",
      postedTime: "29 min ago",
      description:
        "Build, test, and maintain efficient, reliable software systems while collaborating with the team to meet project goals.",
      isActivelyHiring: true,
    },
    {
      id: "2",
      companyName: "Hash Corp",
       companyLogo:"/images/companies/hash-corp.png?height=40&width=40",
      position: "Junior UI Designer",
      location: "Remote",
      employmentType: "Full time",
      salary: "50-55k",
      postedTime: "1d ago",
      description:
        "Assist in creating user-friendly interfaces, design prototypes, and collaborate with the team to enhance the overall user experience.",
      isActivelyHiring: true,
    },
    {
      id: "3",
      companyName: "Raleway Inc",
      companyLogo:"/images/companies/raleway.png?height=40&width=40",
      position: "Technical Support Engineer",
      location: "Austin, Texas",
      employmentType: "Full time",
      salary: "50-52k",
      postedTime: "1d ago",
      description:
        "Provide technical assistance, troubleshoot issues, and ensure seamless operation of systems for clients and internal teams.",
      isActivelyHiring: false,
    },
  ]);
  const tabsRef = useRef<HTMLDivElement>(null)
  const [newJob, setNewJob] = useState({
    companyName: "",
    position: "",
    location: "",
    employmentType: "",
    salary: "",
    description: "",
  })

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs(prev => {
      const isCurrentlyBookmarked = prev.includes(jobId);
      const newBookmarks = isCurrentlyBookmarked
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      return newBookmarks;
    });
  };

  useEffect(() => {
    const lastBookmarkedJob = jobs.find(job => bookmarkedJobs.includes(job.id));
    if (lastBookmarkedJob) {
      const isBookmarked = bookmarkedJobs.includes(lastBookmarkedJob.id);
      if (isBookmarked) {
        toast.success(`${lastBookmarkedJob.position} added to bookmarks`, { icon: "🔖" });
      } else {
        toast.error(`${lastBookmarkedJob.position} removed from bookmarks`, { icon: "🗑️" });
      }
    }
  }, [bookmarkedJobs, jobs]);

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev
      }
    
      toast.success('Applied successfully', { icon: '✅' })
      return [...prev, jobId]
    })
  }

  const handleShare = () => {
    toast.success('Link copied to clipboard')
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = tabsRef.current.offsetWidth
      const maxScroll = tabsRef.current.scrollWidth - tabsRef.current.offsetWidth
      let newScrollLeft = tabsRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))
      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (tabsRef.current) {
      const tab = tabsRef.current.querySelector(`[data-value="${activeTab}"]`) as HTMLElement
      if (tab) {
        const tabLeft = tab.offsetLeft
        const tabWidth = tab.offsetWidth
        const containerWidth = tabsRef.current.offsetWidth
        const scrollLeft = tabLeft - (containerWidth - tabWidth) / 2
        tabsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeTab])

  const handleNewJobSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (jobs.length + 1).toString()
    const newJobData = {
      ...newJob,
      id,
      companyLogo: "/placeholder.svg?height=40&width=40",
      postedTime: "Just now",
      isActivelyHiring: true,
    }
    setJobs(prevJobs => [newJobData, ...prevJobs])
    setNewJob({
      companyName: "",
      position: "",
      location: "",
      employmentType: "",
      salary: "",
      description: "",
    })
    setActiveTab("navigate-jobs")
    toast.success('Job posted successfully!')
  }

  useEffect(() => {
    const handleResize = () => {
      if (tabsRef.current) {
        tabsRef.current.scrollLeft = 0
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="navigate-jobs" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden"
              onClick={() => scrollTabs('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <TabsList ref={tabsRef} className="bg-transparent border-b white-border w-full justify-start overflow-x-auto flex-nowrap scrollbar-hide">
              {["navigate-jobs", "jobs-applied", "jobs-posted", "post-a-job"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  data-value={tab}
                  className={`data-[state=active]:bg-[#FB7637] data-[state=active]:text-white rounded-none px-4 py-2 ${
                    activeTab === tab ? "bg-[#FB7637] text-white" : ""
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab === "navigate-jobs" ? "Navigate Jobs" :
                   tab === "jobs-applied" ? "Jobs Applied" :
                   tab === "jobs-posted" ? "Jobs Posted" : "Post a Job"}
                  {tab === "jobs-applied" && (
                    <span className="ml-2 bg-white text-[#FB7637] rounded-full px-2 py-0.5 text-xs">{appliedJobs.length}</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden"
              onClick={() => scrollTabs('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Navigate <span className="text-[#FB7637]">jobs</span> on Launchboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Find your perfect role with easy job search and flexible compensations
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 -mt-1 text-muted-foreground" />
                <Input className="pl-10" placeholder="What position are you looking for?" />
              </div>
              <div className="relative md:w-64">
                <MapPin className="absolute left-3 top-3 h-5 w-5 -mt-1 text-muted-foreground" />
                <Input className="pl-10" placeholder="Location" />
              </div>
              <Button className="bg-[#FB7637] hover:bg-[#FB7637]/90 text-white">Search</Button>
            </div>
          </div>

          <TabsContent value="navigate-jobs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Filters Sidebar */}
              <Card className="md:col-span-3 p-4 white-border">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 font-semibold">Location</h3>
                    <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
                      <div className="space-y-2">
                        {["Any", "Remote job", "Same City", "Same State", "Same country", "Within 15 kms"].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.toLowerCase().replace(/\s/g, '-')} id={`location-${option.toLowerCase().replace(/\s/g, '-')}`} />
                            <Label htmlFor={`location-${option.toLowerCase().replace(/\s/g, '-')}`}>{option}</Label>
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
                          className={`flex-1 ${
                            selectedSalaryType === type.toLowerCase() 
                              ? "bg-[#FB7637]/10 text-[#FB7637] border-[#FB7637] hover:bg-[#FB7637]/20" 
                              : ""
                          }`}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {["$30000K", "$50000K", "$80000K", "$100000K"].map((amount) => (
                        <div key={amount} className="flex items-center space-x-2">
                          <Checkbox id={`salary-${amount}`} />
                          <Label htmlFor={`salary-${amount}`}>{">"} {amount}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Main Content */}
              <div className="md:col-span-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{jobs.length} Jobs</h2>
                  <Select>
                    <SelectTrigger className="w-[180px] white-border">
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
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      isBookmarked={bookmarkedJobs.includes(job.id)}
                      isApplied={appliedJobs.includes(job.id)}
                      onBookmark={() => handleBookmark(job.id)}
                      onApply={() => handleApply(job.id)}
                      onShare={handleShare}
                    />
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" size="sm" className="mx-1 text-xs sm:text-sm">
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 rotate-90" />
                    Prev
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? "default" : "outline"}
                      size="sm"
                      className={`mx-1 text-xs sm:text-sm ${page === 1 ? "bg-[#FB7637] text-white hover:bg-[#FB7637]/90" : ""}`}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="mx-1 text-xs sm:text-sm">
                    Next
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 rotate-270" />
                  </Button>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="md:col-span-3 space-y-6">
                <Card className="p-4 white-border">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Email me for jobs</h3>
                    <p className="text-sm text-muted-foreground">
                      Get personalized recommendation for newly posted jobs
                    </p>
                    <Input type="email" placeholder="name@email.com" className="white-border" />
                    <Button className="w-full bg-[#FB7637] hover:bg-[#FB7637]/90 text-white">
                      Subscribe
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 white-border">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Get noticed faster</h3>
                    <p className="text-sm text-muted-foreground">
                      A well maintained profile increases your chances of getting hired substantially
                    </p>
                    <div className="text-center text-sm text-muted-foreground">80% completed</div>
                    <Button className="w-full bg-[#FB7637] hover:bg-[#FB7637]/90 text-white">
                      Upload your resume
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs-applied">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Image 
                src="/placeholder.svg?height=128&width=128" 
                width={128} 
                height={128} 
                alt="No jobs applied" 
                className="mb-4" 
              />
              <h2 className="text-2xl font-semibold mb-2">No jobs applied yet</h2>
              <p className="text-muted-foreground mb-4">Start applying to jobs to see them here</p>
              <Button className="bg-[#FB7637] hover:bg-[#FB7637]/90 text-white">
                Explore jobs
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="jobs-posted">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Image 
                src="/placeholder.svg?height=128&width=128" 
                width={128} 
                height={128} 
                alt="No jobs posted" 
                className="mb-4" 
              />
              <h2 className="text-2xl font-semibold mb-2">No jobs posted yet</h2>
              <p className="text-muted-foreground mb-4">Start posting jobs to see them here</p>
              <Button className="bg-[#FB7637] hover:bg-[#FB7637]/90 text-white" onClick={() => setActiveTab("post-a-job")}>
                Post a job
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="post-a-job">
            <div className="max-w-2xl mx-auto white-border p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
              <form onSubmit={handleNewJobSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={newJob.companyName}
                    onChange={(e) => setNewJob({...newJob, companyName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newJob.position}
                    onChange={(e) => setNewJob({...newJob, position: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Input
                    id="employmentType"
                    value={newJob.employmentType}
                    onChange={(e) => setNewJob({...newJob, employmentType: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="bg-[#FB7637] hover:bg-[#FB7637]/90 text-white">
                  Post Job
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}