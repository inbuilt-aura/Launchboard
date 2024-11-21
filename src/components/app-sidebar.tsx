import React from 'react';
// import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
//   SheetClose,
} from "@/components/ui/sheet";

interface ApplicationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    companyName: string;
    position: string;
  };
  onSubmit: (jobId: string) => void;
}

export function ApplicationSidebar({ isOpen, onClose, job, onSubmit }: ApplicationSidebarProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(job.id);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Your Application</SheetTitle>
          <SheetDescription>
            Apply for {job.position} at {job.companyName}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <Label htmlFor="resume">Resume/CV</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
          </div>
          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea id="coverLetter" placeholder="Why do you want to work with us?" />
          </div>
          <SheetFooter>
            {/* <SheetClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </SheetClose> */}
            <Button type="submit" className="w-full bg-[#FB7637] text-white">Submit application</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

