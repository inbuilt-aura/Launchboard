"use client";

import {
  Bookmark,
  Share2,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobCardProps {
  id: string;
  companyName: string;
  companyLogo: string;
  position: string;
  location: string;
  employmentType: string;
  salary: string;
  postedTime: string;
  description: string;
  employees: string;
  isActivelyHiring?: boolean;
  isBookmarked?: boolean;
  isApplied?: boolean;
  onBookmark?: () => void;
  onApply?: () => void;
  onShare?: () => void;
  onViewDetails?: () => void;
  logoWidth: number;
  logoHeight: number;
  
}

export function JobCard({
  id,
  companyName,
  companyLogo,
  position,
  location,
  employmentType,
  salary,
  postedTime,
  description,
  employees,
  isActivelyHiring = false,
  isBookmarked = false,
  isApplied = false,
  onBookmark,
  onApply,
  onShare,
  onViewDetails,
  logoWidth,
  logoHeight,
}: JobCardProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://launchboard.com/jobs/${id}`;

  const handleShare = async (platform: string) => {
    const text = `Check out this ${position} position at ${companyName}`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      email: `mailto:?subject=${encodeURIComponent(
        text
      )}&body=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === "copy") {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onShare) onShare();
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  return (
    <Card className="overflow-hidden border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              width={logoWidth}
              height={logoHeight}
              className="rounded-lg h-12 w-auto cursor-pointer"
              onClick={onViewDetails}
            />
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <h3
                  className="font-semibold text-sm text-muted-foreground cursor-pointer"
                  onClick={onViewDetails}
                >
                  {companyName}
                </h3>
                {isActivelyHiring && (
                  <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Actively hiring
                  </span>
                )}
              </div>
              <h4
                className="text-lg font-semibold mt-1 cursor-pointer"
                onClick={onViewDetails}
              >
                {position}
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {employmentType}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />${salary}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {postedTime}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {employees}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex gap-2">
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
            <Button
              className={`${
                isApplied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#FB7637] hover:bg-[#FB7637]/90"
              } text-white`}
              onClick={onApply}
              disabled={isApplied}
            >
              Apply
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground pl-16">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}