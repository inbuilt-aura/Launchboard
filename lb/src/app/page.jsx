"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Filter,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { sidebarData } from "../lib/data";
import { Toaster, toast } from "react-hot-toast";

function Sidebar() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(sidebarData.profileData);
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
    setIsEditing(false);
  };

  const handleImageUpload = (type) => {
    if (type === "banner" && bannerInputRef.current) {
      bannerInputRef.current.click();
    } else if (type === "profile" && profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const onFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileData((prev) => ({
            ...prev,
            [type === "banner" ? "bannerImage" : "avatar"]: event.target.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen mb-2">
      <div className="p-4">
        <div className="white-border">
          <div className="relative">
            <div
              className="bg-[#FB7637] h-24 flex relative group rounded-lg cursor-pointer w-full"
              onClick={() => isEditing && handleImageUpload("banner")}
              style={
                profileData.bannerImage
                  ? {
                      backgroundImage: `url(${profileData.bannerImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {isEditing && (
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </div>
              )}
            </div>
            <div
              className="absolute bottom-0 left-4 transform translate-y-1/2 group cursor-pointer"
              onClick={() => isEditing && handleImageUpload("profile")}
            >
              <Image
                src={profileData.avatar}
                width={80}
                height={80}
                alt={profileData.name}
                className="rounded-full border-4 border-white"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </div>
              )}
            </div>
          </div>

          <input
            type="file"
            ref={bannerInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => onFileChange(e, "banner")}
          />
          <input
            type="file"
            ref={profileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => onFileChange(e, "profile")}
          />

          <div className="mt-12 px-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{profileData.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {profileData.description}
                </p>
                <div className="flex items-center mt-2 gap-2">
                  <Image
                    src="/building.png"
                    alt="building"
                    width={17}
                    height={17}
                  />
                  <p className="text-sm text-gray-600">{profileData.title}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#888888] h-20 w-20 -mt-[70px] -mr-[10px]"
                onClick={handleEdit}
              >
                <Image src="/edit.png" alt="edit" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <div className="white-border">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center mr-2">
              <Image src="/profile.png" alt="profile" width={24} height={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Complete profile
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-2 pt-2">
            {sidebarData.profileCompletion.message}
          </p>
          <div className="mb-1 pt-2">
            <Progress
              value={sidebarData.profileCompletion.percentage}
              className="h-2 bg-gray-200"
            />
          </div>
          <div className="text-right mt-2">
            <span className="text-sm text-black">
              {sidebarData.profileCompletion.percentage}% completed
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <div className="white-border">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center mr-2">
              <Image
                src="/profile.png"
                alt="resources"
                width={24}
                height={24}
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Saved resources
            </h3>
          </div>
          <ul className="space-y-1 ml-8 list-disc text-[black]">
            {sidebarData.savedResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  className="text-xs text-[#888888] hover:underline"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 px-4 mb-10">
        <div className="white-border">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center mr-2">
              <Image src="/link.png" alt="quick links" width={24} height={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Quick links</h3>
          </div>
          <ul className="space-y-1 list-disc ml-8 text-black">
            {sidebarData.quickLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="text-xs text-[#888888] hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSave({
                name: formData.get("name"),
                title: formData.get("title"),
                banner: formData.get("banner"),
              });
            }}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input id="name" name="name" defaultValue={profileData.name} />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={profileData.title}
                />
              </div>
              <div>
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner Text
                </label>
                <Textarea
                  id="banner"
                  name="banner"
                  defaultValue={profileData.banner}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </aside>
  );
}

// Job Card Component
function JobCard({ job }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>
          <Button
            className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
            variant="outline"
            size="sm"
          >
            Apply
          </Button>
        </div>
        <div className="mt-4 flex space-x-4 text-sm text-gray-500">
          <span>{job.location}</span>
          <span>{job.type}</span>
          <span>{job.salary}</span>
        </div>
        <p className="mt-4 text-sm text-gray-700">{job.description}</p>
        <div className="mt-4 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-500"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-500"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={project.logo}
              alt={project.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
          <Badge variant="secondary">{project.stage}</Badge>
        </div>
        <p className="mt-2 text-sm text-gray-700">{project.description}</p>
        <div className="mt-4 flex space-x-4 text-sm text-gray-500">
          <span>{project.location}</span>
          <span>{project.type}</span>
          <span>{project.employees} employees</span>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-500"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            {project.upvotes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-500"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {project.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-500"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Feature Alert Component
function FeatureAlert() {
  return (
    <Card className="bg-white text-white">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Image src="/logo.svg" alt="quick links" width={24} height={24} />

          <h3 className="text-lg font-semibold text-black">
            New Feature alert
          </h3>
        </div>
        <p className="mt-2 text-sm text-black opacity-80">
          You can now send posts to your connect on the platform directly.
        </p>
        <div className="space-x-4">
          <Button
            className="mt-4 bg-[#FFF2EB] text-[#FB7637] hover:bg-gray-100"
            size="sm"
          >
            Try Now
          </Button>
          <Button
            className="mt-4 bg-white rounded-lg text-[#888888] hover:bg-gray-100"
            size="sm"
          >
            Mark as Read
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Trending Section Component
function TrendingSection({ type, items }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          🚀 Trending {type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ConnectionRequests({ requests }) {
  const [remainingRequests, setRemainingRequests] = useState(requests);

  const handleAccept = (index) => {
    toast.success("Connection request accepted!");

    const updatedRequests = remainingRequests.filter((_, i) => i !== index);
    setRemainingRequests(updatedRequests);
  };

  const handleReject = (index) => {
    toast.error("Connection request rejected");

    const updatedRequests = remainingRequests.filter((_, i) => i !== index);
    setRemainingRequests(updatedRequests);
  };

  return (
    <>
      <Toaster />
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justfiy-center space-x-2">
            <Image
              src="/connect.png"
              alt="quick links"
              width={24}
              height={24}
              className="ml-2"
            />

            <CardTitle className="text-base font-semibold">
              Connection Requests
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {remainingRequests.map((request, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarImage src={request.avatar} alt={request.name} />
                    <AvatarFallback>
                      {request.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-500">{request.role}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-[#FB7637] text-white"
                        onClick={() => handleAccept(index)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-[#FFE7EA] text-[#FF2740]"
                        onClick={() => handleReject(index)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

// Suggested Connections Component
function SuggestedConnections({ suggestions }) {
  const [remainingSuggestions, setRemainingSuggestions] = useState(suggestions);

  const handleConnect = (index) => {
    toast.success("Connection request sent");

    const updatedSuggestions = remainingSuggestions.filter(
      (_, i) => i !== index
    );
    setRemainingSuggestions(updatedSuggestions);
  };

  return (
    <>
      <Toaster />
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justfiy-center space-x-2">
            <Image
              src="/connect.png"
              alt="quick links"
              width={24}
              height={24}
              className="ml-2"
            />

            <CardTitle className="text-base font-semibold">
              Suggested Connection{" "}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {remainingSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-4">
                <Avatar className="mt-1">
                  <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                  <AvatarFallback>
                    {suggestion.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{suggestion.name}</p>
                  <p className="text-sm text-gray-500">{suggestion.role}</p>
                  <p className="text-xs text-gray-400">
                    {suggestion.mutual} mutual connections
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(index)}
                >
                  Connect
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

// Main Component
export default function HomePage() {
  const [view, setView] = useState("for-you");

  // const user = {
  //   name: "Divya Yash",
  //   role: "Product Designer",
  //   avatar: "/avatars/me.png",
  //   connections: 1269,
  //   jobOffers: 18,
  //   projects: 28
  // }

  // const profileCompletion = {
  //   percentage: 70,
  //   completed: 7,
  //   total: 10,
  //   message: "Complete your profile to attract more opportunities"
  // }

  // const savedResources = [
  //   { name: "Jobs", count: 12 },
  //   { name: "Projects", count: 4 },
  //   { name: "Courses", count: 6 },
  // ]

  // const quickLinks = ["Find Jobs", "Network", "Learning", "Career Advice"]

  const jobs = [
    {
      title: "Product Designer",
      company: "Frie AI",
      companyLogo: "/images/companies/frie.png",
      location: "Austin, Texas",
      type: "Full time",
      salary: "$50-55k",
      description:
        "Design and refine user-centered products, create prototypes, and collaborate with cross-functional teams to deliver exceptional experiences",
    },
    {
      title: "Junior UI Designer",
      company: "Hash Corp",
      companyLogo: "/images/companies/hash-corp.png",
      location: "Remote",
      type: "Full time",
      salary: "$50-55k",
      description:
        "Assist in creating user-friendly interfaces, design prototypes, and collaborate with the team to enhance the overall user experience",
    },
  ];

  const projects = [
    {
      name: "Hash Corp",
      logo: "/images/companies/hash-corp.png",
      stage: "Growth Stage",
      description:
        "A state-of-the-art AI face analyzer which gives you a compatible skin care routine as per your needs",
      location: "San Francisco",
      type: "B2B",
      employees: 10,
      upvotes: 45,
      comments: 0,
    },
    {
      name: "Ecma Corp",
      logo: "/images/companies/ecma-corp.png",
      stage: "Growth Stage",
      description:
        "A state-of-the-art AI face analyzer which gives you a compatible skin care routine as per your needs",
      location: "San Francisco",
      type: "B2B",
      employees: 10,
      upvotes: 45,
      comments: 0,
    },
  ];

  const trendingJobs = [
    { title: "Technical Support Engineer", subtitle: "Remote • Full time" },
    { title: "Software Engineer", subtitle: "Remote • Full time" },
    { title: "Blockchain Developer", subtitle: "Remote • Full time" },
  ];

  const trendingProjects = [
    { title: "Video Streaming Platform", subtitle: "Growth Stage • B2B" },
    { title: "VR sharing playground", subtitle: "Growth Stage • B2B" },
    { title: "Java Legacy Refactoring", subtitle: "Growth Stage • B2B" },
  ];

  const connectionRequests = [
    {
      id: "1",
      name: "Emily Flint",
      role: "UX Designer",
      mutual: 12,
      avatar: "/avatars/emily.png",
    },
    {
      id: "2",
      name: "Ji-hoon",
      role: "Product Manager",
      mutual: 8,
      avatar: "/avatars/ji-hoon.png",
    },
  ];

  const suggestedConnections = [
    {
      name: "Jeff Sanders",
      role: "Frontend Developer",
      mutual: 15,
      avatar: "/avatars/jeff.png",
    },
    {
      name: "Cody Maxwell",
      role: "Data Scientist",
      mutual: 7,
      avatar: "/avatars/cody.png",
    },
  ];

  return (
    <div className="font-poppins min-h-screen bg-gray-50 py-20">
      <Navbar />
      <div className="container max-w-[1400px] mx-auto grid grid-cols-12 gap-6 px-4 py-8">
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-6">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <Button
                variant={view === "for-you" ? "default" : "ghost"}
                onClick={() => setView("for-you")}
                className={
                  view === "for-you"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : ""
                }
              >
                For You
              </Button>
              <Button
                variant={view === "following" ? "default" : "ghost"}
                onClick={() => setView("following")}
                className={
                  view === "following"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-[#888888]"
                }
              >
                Following
              </Button>
            </div>
            <Button variant="outline" className="text-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
            <div className="grid grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 space-y-6">
          <FeatureAlert />
          <TrendingSection type="Jobs" items={trendingJobs} />
          <TrendingSection type="Projects" items={trendingProjects} />
          <ConnectionRequests requests={connectionRequests} />
          <SuggestedConnections suggestions={suggestedConnections} />
        </div>
      </div>
    </div>
  );
}
