"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Navbar } from "@/components/navbar";

 const allUsers = [
  {
    name: "Eliza Grimes",
    role: "Full-stack Developer",
    bio: "Full-stack Developer at Closer.ai | Web3 | Previously @ Solid.ai. Actively working on idea..",
    avatar: "/avatars/Eliza.png",
    domain: "SaaS",
    connections: 150,
    followers: 200,
    following: 100,
  },
  {
    name: "Cody Maxwell",
    role: "Blockchain Dev",
    bio: "Blockchain Developer at Blockify | Crypto & Web3 | Prev @ Bitverse",
    avatar: "/avatars/Cody.png",
    domain: "Web3",
    connections: 120,
    followers: 180,
    following: 90,
  },
  {
    name: "Frank Ocean",
    role: "Product Manager",
    bio: "PM at SyncUp | Tech & Data Enthusiast | Prev @ FlowLabs.",
    avatar: "/avatars/Frank.png",
    domain: "SaaS",
    connections: 200,
    followers: 300,
    following: 150,
  },
  {
    name: "Emily Flint",
    role: "UX Designer",
    bio: "UX Designer at PixelCraft | UI/UX & Accessibility Advocate",
    avatar: "/avatars/Emily.png",
    domain: "EdTech",
    connections: 180,
    followers: 250,
    following: 120,
  },
  {
    name: "Alex Johnson",
    role: "CTO",
    bio: "CTO at TechNova | Full-stack developer | AI enthusiast",
    avatar: "/avatars/Alex.png",
    domain: "AI/ML",
    connections: 220,
    followers: 400,
    following: 180,
  },
  {
    name: "Sarah Lee",
    role: "Founder",
    bio: "Founder of GreenEats | Sustainable food tech | Former chef",
    avatar: "/avatars/Sarah.png",
    domain: "CleanTech",
    connections: 160,
    followers: 280,
    following: 110,
  },
  {
    name: "Mike Ross",
    role: "CFO",
    bio: "CFO at FinEdge | Financial expert | Startup advisor",
    avatar: "/avatars/Mike.png",
    domain: "Fintech",
    connections: 140,
    followers: 190,
    following: 80,
  },
  {
    name: "Rachel Green",
    role: "CEO",
    bio: "CEO of FashionForward | E-commerce expert | Fashion industry veteran",
    avatar: "/avatars/Rachel.png",
    domain: "E-commerce",
    connections: 250,
    followers: 500,
    following: 200,
  },
];
const filterCategories = {
  technical: [
    "Full-stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Engineer",
    "ML Engineer",
  ],
  business: [
    "Founder",
    "CEO",
    "CFO",
    "CTO",
    "Product Manager",
    "Business Analyst",
    "Growth Manager",
  ],
  design: [
    "UI Designer",
    "UX Designer",
    "Product Designer",
    "Visual Designer",
    "Motion Designer",
  ],
  other: [
    "Marketing Manager",
    "Content Strategist",
    "Community Manager",
    "Project Manager",
    "Technical Writer",
  ],
  domains: [
    "SaaS",
    "Fintech",
    "Web3",
    "AI/ML",
    "Cloud",
    "HealthTech",
    "EdTech",
    "E-commerce",
    "Gaming",
    "CleanTech",
  ],
};

export default function NetworkContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState({
    technical: true,
    business: true,
    design: true,
    other: true,
    domains: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.includes(user.role) ||
        selectedFilters.includes(user.domain);
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Connections" && user.connections > 0) ||
        (activeTab === "Followers" && user.followers > 0) ||
        (activeTab === "Following" && user.following > 0);
      return matchesSearch && matchesFilter && matchesTab;
    });
  }, [searchTerm, selectedFilters, activeTab]);

  return (
    <div>
      <Navbar />

      <main className="mx-auto grid max-w-[1400px] pt-24 grid-cols-[1fr_300px] gap-8 p-8">
        <div className="space-y-8">
          <div className="bg-[#fff5f2] p-4 rounded-lg border border-[#ffd4c2]">
            <h1 className="text-xl text-bricolage font-semibold text-gray-800">
              Connect & Collaborate with people on Launchboard
            </h1>
          </div>

          {/* Search People */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-9 border-gray-300 rounded-full"
              placeholder="Search people on Launchboard"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white p-1 rounded-full border border-gray-200 w-fit">
            {["All", "Explore", "Connections", "Followers", "Following"].map(
              (tab) => (
                <Button
                  key={tab}
                  className={`rounded-full px-4 text-sm font-medium ${
                    activeTab === tab
                      ? "bg-[#ff6b3d] text-white hover:bg-[#ff6b3d]/90"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              )
            )}
          </div>

          {/* User Grid */}
          <div className="min-h-[400px]">
            {" "}
            {/* Add minimum height to prevent layout shift */}
            {filteredUsers.length > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {filteredUsers.map((user, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border border-gray-200 shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16 rounded-full border-2 border-white shadow-md">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.role}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {user.bio}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-normal h-9"
                        >
                          Follow
                        </Button>
                        <Button className="flex-1 rounded-full bg-[#ff6b3d] hover:bg-[#ff6b3d]/90 text-white text-sm font-normal h-9">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-start justify-center pt-16">
                {" "}
                {/* Align to top instead of center */}
                <p className="text-gray-500">
                  No results found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-0">
              <div className="bg-[#fff5f2] px-4 py-3 border-b border-[#ffd4c2]">
                <h2 className="text-lg font-semibold text-gray-800">
                  Filter your search
                </h2>
              </div>

              {Object.entries(filterCategories).map(([category, filters]) => (
                <Collapsible
                  key={category}
                  open={openSections[category as keyof typeof openSections]}
                  onOpenChange={() =>
                    toggleSection(category as keyof typeof openSections)
                  }
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    {openSections[category as keyof typeof openSections] ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-b border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {filters.map((filter) => (
                        <Button
                          key={filter}
                          size="sm"
                          variant={
                            selectedFilters.includes(filter)
                              ? "default"
                              : "outline"
                          }
                          className={`rounded-full px-3 py-1 h-auto text-xs font-normal ${
                            selectedFilters.includes(filter)
                              ? "bg-[#ff6b3d] text-white hover:bg-[#ff6b3d]/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleFilter(filter)}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
