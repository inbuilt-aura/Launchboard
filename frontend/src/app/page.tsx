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
  Camera,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  Send,
  Copy,
  PhoneIcon as WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "../components/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sidebarData } from "../lib/data";
import { Toaster, toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
// import { PrivateRoute } from "@/components/PrivateRoute";

interface ProfileData {
  name: string;
  description: string;
  title: string;
  avatar: string;
  bannerImage?: string;
  banner?: string;
}

interface SidebarProps {
  profileData: ProfileData;
  profileCompletion: {
    percentage: number;
    message: string;
  };
  savedResources: Array<{ name: string; link: string }>;
  quickLinks: string[];
}

function Sidebar({
  profileData: initialProfileData,
  profileCompletion,
  savedResources,
  quickLinks,
}: SidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData: Partial<ProfileData>) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
    setIsEditing(false);
  };

  const handleImageUpload = (type: "banner" | "profile") => {
    if (type === "banner" && bannerInputRef.current) {
      bannerInputRef.current.click();
    } else if (type === "profile" && profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "banner" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const target = event.target;
        if (target?.result) {
          setProfileData((prev) => ({
            ...prev,
            [type === "banner" ? "bannerImage" : "avatar"]:
              target.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen mb-2 hidden md:block">
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
            {profileCompletion.message}
          </p>
          <div className="mb-1 pt-2">
            <Progress
              value={profileCompletion.percentage}
              className="h-2 bg-gray-200"
            />
          </div>
          <div className="text-right mt-2">
            <span className="text-sm text-black">
              {profileCompletion.percentage}% completed
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
            {savedResources.map((resource, index) => (
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
            {quickLinks.map((link, index) => (
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
              const formData = new FormData(e.target as HTMLFormElement);
              handleSave({
                name: formData.get("name") as string,
                title: formData.get("title") as string,
                banner: formData.get("banner") as string,
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

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyTag: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
  isVerified: boolean;
  applicants: number;
  isApplied: boolean;
}

function JobCard({
  job,
  onApply,
  view,
}: {
  job: Job;
  onApply: (jobId: string) => void;
  view: "for-you" | "following";
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(job.likes);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (isSaved) {
      toast.error("Removed from bookmarks", { icon: "🗑️" });
    } else {
      toast.success("Saved to bookmarks", { icon: "🔖" });
    }
  };

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Image
            src={job.companyLogo}
            alt={job.company}
            width={48}
            height={48}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex-grow">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 flex-wrap">
                <h4 className="text-sm font-medium text-gray-900">
                  {job.company}
                </h4>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 text-xs"
                >
                  {job.companyTag}
                </Badge>
              </div>
              {view === "for-you" && !job.isApplied && (
                <Button
                  className="bg-orange-500 text-white hover:bg-orange-600 text-xs"
                  size="sm"
                  onClick={() => onApply(job.id)}
                >
                  Apply
                </Button>
              )}
              {job.isApplied && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 text-xs"
                >
                  Applied
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold mt-2">{job.title}</h3>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {job.timeAgo}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700">{job.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#FFF2EB] text-[#FB7637] text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                {job.isVerified && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700 font-medium">
                      Payment verified
                    </span>
                  </>
                )}
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {job.applicants} applicants
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <ThumbsUp
                className={cn(
                  "h-5 w-5 transition-colors",
                  isLiked ? "fill-[#FB7637] text-[#FB7637]" : "text-[#ABABAB]"
                )}
              />
              <span className="text-sm text-gray-500">{likes}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleComment}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5 text-[#ABABAB]" />
              <span className="text-sm text-gray-500">{comments.length}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center"
            >
              <Bookmark
                className={cn(
                  "h-5 w-5 transition-colors",
                  isSaved ? "fill-[#FB7637] text-[#FB7637]" : "text-[#ABABAB]"
                )}
              />
            </motion.button>
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <Share2 className="h-5 w-5 text-[#ABABAB]" />
                </motion.button>
              </DialogTrigger>
              <ShareDialog jobTitle={job.title} />
            </Dialog>
          </div>
        </div>

        {isCommentOpen && (
          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 text-sm font-semibold">Comments</h4>
            <div className="mb-4 max-h-40 overflow-y-auto">
              {comments.map((comment, index) => (
                <p key={index} className="mb-2 text-sm">
                  {comment}
                </p>
              ))}
            </div>
            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow rounded-md border p-2 text-sm"
              />
              <Button type="submit" size="sm" className="hidden sm:flex">
                Post
              </Button>
              <Button type="submit" size="icon" className="sm:hidden">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ShareDialog({ jobTitle }: { jobTitle: string }) {
  const shareUrl = `https://example.com/job/${encodeURIComponent(jobTitle)}`;

  const shareOptions = [
    { name: "WhatsApp", icon: WhatsappIcon },
    { name: "Facebook", icon: FacebookIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "LinkedIn", icon: LinkedinIcon },
    { name: "Email", icon: MailIcon },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Share this job</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4 py-4">
        {shareOptions.map((option) => (
          <Button
            key={option.name}
            variant="outline"
            className="flex flex-col items-center gap-2 p-2 h-auto"
          >
            <option.icon className="h-6 w-6" />
            <span className="text-xs">{option.name}</span>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-grow p-2 text-sm border rounded"
        />
        <Button onClick={copyToClipboard} size="sm" className="px-3">
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </DialogContent>
  );
}

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

interface TrendingItem {
  title: string;
  subtitle: string;
}

function TrendingSection({
  type,
  items,
}: {
  type: string;
  items: TrendingItem[];
}) {
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

interface ConnectionRequest {
  id: string;
  name: string;
  role: string;
  mutual: number;
  avatar: string;
}

function ConnectionRequests({
  requests: initialRequests,
}: {
  requests: ConnectionRequest[];
}) {
  const [remainingRequests, setRemainingRequests] = useState(initialRequests);

  const handleAccept = (index: number) => {
    toast.success("Connection request accepted!");
    const updatedRequests = remainingRequests.filter((_, i) => i !== index);
    setRemainingRequests(updatedRequests);
  };

  const handleReject = (index: number) => {
    toast.error("Connection request rejected");
    const updatedRequests = remainingRequests.filter((_, i) => i !== index);
    setRemainingRequests(updatedRequests);
  };

  return (
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
  );
}

interface SuggestedConnection {
  name: string;
  role: string;
  mutual: number;
  avatar: string;
}

function SuggestedConnections({
  suggestions: initialSuggestions,
}: {
  suggestions: SuggestedConnection[];
}) {
  const [remainingSuggestions, setRemainingSuggestions] =
    useState(initialSuggestions);

  const handleConnect = (index: number) => {
    toast.success("Connection request sent");
    const updatedSuggestions = remainingSuggestions.filter(
      (_, i) => i !== index
    );
    setRemainingSuggestions(updatedSuggestions);
  };

  return (
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
  );
}

export default function HomePage() {
  const [view, setView] = useState<"for-you" | "following">("for-you");
  const [forYouJobs, setForYouJobs] = useState<Job[]>([
    {
      id: "1",
      title: "E-commerce Platform with MERN Stack",
      company: "Katelyn",
      companyLogo: "/avatars/emily.png",
      companyTag: "Stablecoin",
      location: "Remote",
      type: "Fixed Price",
      salary: "$2k",
      timeAgo: "5 mins ago",
      description:
        "Need a full-stack developer to build an e-commerce platform with user authentication, product management, cart functionality, and payment integration using Stripe.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      likes: 102,
      comments: 32,
      isVerified: true,
      applicants: 51,
      isApplied: false,
    },
    {
      id: "2",
      title: "Smart Contract Development for DAO",
      company: "Patrick",
      companyLogo: "/avatars/mike.png",
      companyTag: "Blockchain",
      location: "Remote",
      type: "Fixed Price",
      salary: "$2k",
      timeAgo: "5 mins ago",
      description:
        "Looking for a Web3 developer to create and deploy smart contracts for a DAO voting system with token-based governance and proposal creation.",
      tags: ["Web3", "Solidity", "React", "Node.js"],
      likes: 45,
      comments: 10,
      isVerified: true,
      applicants: 5,
      isApplied: false,
    },
  ]);

  const [followingJobs, setFollowingJobs] = useState<Job[]>([
    {
      id: "3",
      title: "NFT Marketplace Dashboard Development",
      company: "Ecma Corp",
      companyLogo: "/images/companies/ecma-corp.png",
      companyTag: "NFT",
      location: "Remote",
      type: "Fixed Price",
      salary: "$5k",
      timeAgo: "5 mins ago",
      description:
        "Looking for a developer to create an NFT marketplace dashboard with real-time price tracking, wallet integration, and transaction history. Need implementation of MetaMask connection and smart contract interaction.",
      tags: ["Web3", "Solidity", "React", "Node.js"],
      likes: 46,
      comments: 10,
      isVerified: true,
      applicants: 5,
      isApplied: true,
    },
    {
      id: "4",
      title: "Junior UI Designer",
      company: "Hash Corp",
      companyLogo: "/images/companies/hash-corp.png",
      companyTag: "Design",
      location: "Madrid",
      type: "Full time",
      salary: "$30-32k",
      timeAgo: "1 day ago",
      description:
        "We're seeking a talented Junior UI Designer to join our creative team. You'll be responsible for designing user-friendly interfaces for web and mobile applications, collaborating with UX designers and developers to bring designs to life.",
      tags: ["UI Design", "Figma", "Adobe XD", "Sketch"],
      likes: 23,
      comments: 5,
      isVerified: false,
      applicants: 15,
      isApplied: true,
    },
    {
      id: "5",
      title: "Technical Support Engineer",
      company: "Raleway Inc",
      companyLogo: "/images/companies/raleway.png",
      companyTag: "Support",
      location: "United States",
      type: "Full time",
      salary: "$50-52k",
      timeAgo: "1 day ago",
      description:
        "We are looking for a Technical Support Engineer to join our team. You will be responsible for providing technical assistance to our customers, troubleshooting issues, and ensuring customer satisfaction with our products and services.",
      tags: ["Technical Support", "Customer Service", "Troubleshooting"],
      likes: 12,
      comments: 3,
      isVerified: true,
      applicants: 8,
      isApplied: true,
    },
  ]);

  const handleApply = (jobId: string) => {
    const appliedJob = forYouJobs.find((job) => job.id === jobId);
    if (appliedJob) {
      setForYouJobs(forYouJobs.filter((job) => job.id !== jobId));
      setFollowingJobs([...followingJobs, { ...appliedJob, isApplied: true }]);
      toast.success("Applied successfully", { icon: "✅" });
    }
  };

  const jobs = view === "for-you" ? forYouJobs : followingJobs;

  const trendingJobs: TrendingItem[] = [
    { title: "Technical Support Engineer", subtitle: "Remote • Full time" },
    { title: "Software Engineer", subtitle: "Remote • Full time" },
    { title: "Blockchain Developer", subtitle: "Remote • Full time" },
  ];

  const connectionRequests: ConnectionRequest[] = [
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

  const suggestedConnections: SuggestedConnection[] = [
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
        <div className="col-span-12 md:col-span-3 space-y-6">
          <Sidebar
            profileData={sidebarData.profileData}
            profileCompletion={sidebarData.profileCompletion}
            savedResources={sidebarData.savedResources}
            quickLinks={sidebarData.quickLinks}
          />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <Button
                variant={view === "for-you" ? "default" : "ghost"}
                onClick={() => setView("for-you")}
                className={cn(
                  "rounded-lg",
                  view === "for-you"
                    ? "bg-[#FB7637] border border-[#FB7637] text-white hover:bg-[#FB7637]/90"
                    : "text-[#888888] hover:text-[#FB7637]"
                )}
              >
                For You
              </Button>
              <Button
                variant={view === "following" ? "default" : "ghost"}
                onClick={() => setView("following")}
                className={cn(
                  "rounded-lg",
                  view === "following"
                    ? "bg-[#FB7637] border border-[#FB7637] text-white hover:bg-[#FB7637]/90"
                    : "text-[#888888] hover:text-[#FB7637]"
                )}
              >
                Following
              </Button>
            </div>
            <Button variant="outline" className="rounded-full text-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                view={view}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-6">
          <FeatureAlert />
          <TrendingSection type="Jobs" items={trendingJobs} />
          <ConnectionRequests requests={connectionRequests} />
          <SuggestedConnections suggestions={suggestedConnections} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

  
