import React, { useState, useRef } from 'react'
import { X, MessageCircle, Bookmark, Share2, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { DialogTitle } from "@/components/ui/dialog"
import { toast } from 'react-hot-toast'

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

interface Reply {
  id: number;
  author: string;
  avatar: string;
  time: string;
  text: string;
}

interface Comment extends Reply {
  replies: Reply[];
}

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
}

const companyImages: string[] = [
  "/images/companies/ecma-corp.png",
  "/images/companies/ecma-corp.png",
  "/images/companies/glaze.png",
  "/images/companies/glaze.png",
]

const files: Array<{ name: string; type: string }> = [
  { name: "Publication.pdf", type: "pdf" },
  { name: "Whitepaper.pdf", type: "pdf" },
]

const initialComments: Comment[] = [
  { 
    id: 1, 
    author: "Tom Rolls", 
    avatar: "/placeholder.svg?height=40&width=40", 
    time: "6 mins ago", 
    text: "Sounds very promising. I really like the approach.",
    replies: []
  },
  { 
    id: 2, 
    author: "Ji-Hoon", 
    avatar: "/placeholder.svg?height=40&width=40", 
    time: "8 mins ago", 
    text: "Nice!",
    replies: []
  },
]

export function ProjectSidebar({ isOpen, onClose, selectedProject }: ProjectSidebarProps) {
  const [newComment, setNewComment] = useState<string>('')
  const [commentsState, setCommentsState] = useState<Comment[]>(initialComments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() === '') return

    const newCommentObj: Comment | Reply = {
      id: Date.now(),
      author: "Current User",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Just now",
      text: newComment,
      replies: []
    }

    if (replyingTo !== null) {
      setCommentsState(prevComments => 
        prevComments.map(comment => 
          comment.id === replyingTo
            ? {
                ...comment,
                replies: [...comment.replies, newCommentObj as Reply]
              }
            : comment
        )
      )
      setReplyingTo(null)
      toast.success('Reply posted successfully!')
    } else {
      setCommentsState(prevComments => [...prevComments, newCommentObj as Comment])
      toast.success('Comment posted successfully!')
    }
    setNewComment('')
  }

  const handleNextImage = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handlePrevImage = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(commentId)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[90%] sm:w-[1000px] sm:max-w-full p-0">
        <VisuallyHidden>
          <DialogTitle>Project Description</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Project Description</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Left column */}
            <div className="w-2/3 overflow-y-auto border-r border-gray-200">
              {selectedProject && (
                <div className="p-6">
                  <Card className="mb-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image
                          src={selectedProject.logo}
                          alt={`${selectedProject.name} logo`}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                          <div className="flex gap-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{selectedProject.stage}</span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{selectedProject.fundingStatus}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                          <MessageCircle className="h-4 w-4" />
                          <span className="sr-only">Messages</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => toast.success('Project bookmarked!')}
                        >
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">Bookmark</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => toast.success('Project link copied to clipboard!')}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button 
                          className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white"
                          onClick={() => toast.success('You are now following this project!')}
                        >
                          Follow
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{selectedProject.shortDescription}</p>
                      <p className="text-sm text-gray-600 mb-4">{selectedProject.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                        <span>{selectedProject.location}</span>
                        <span>•</span>
                        <span>{selectedProject.type}</span>
                        <span>•</span>
                        <span>{selectedProject.employees}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="overview" className="w-full mb-6">
                    <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start">
                      <TabsTrigger 
                        value="overview" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger 
                        value="contribute" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
                      >
                        Contribute
                      </TabsTrigger>
                      <TabsTrigger 
                        value="people" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C35] data-[state=active]:text-[#FF5C35] rounded-none px-4 py-2"
                      >
                        People
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Files & Documents</h3>
                        <div className="relative">
                          <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth"
                            style={{ scrollSnapType: 'x mandatory' }}
                          >
                            {companyImages.map((image, index) => (
                              <div 
                                key={index} 
                                className="flex-shrink-0 w-[calc(25%-12px)] scroll-snap-align-start"
                                style={{ scrollSnapAlign: 'start' }}
                              >
                                <Image 
                                  src={image} 
                                  alt={`Company image ${index + 1}`} 
                                  width={300} 
                                  height={200} 
                                  className="rounded-lg w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                          <Button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                            onClick={handlePrevImage}
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-6 w-6 text-gray-600" />
                          </Button>
                          <Button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                            onClick={handleNextImage}
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-6 w-6 text-gray-600" />
                          </Button>
                        </div>
                        <div className="flex gap-4 mt-4">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                              <div className="bg-red-500 text-white rounded p-1">
                                <span className="text-xs font-bold">PDF</span>
                              </div>
                              <span className="text-sm">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Comments</h3>
                        <div className="space-y-4">
                          {commentsState.map((comment) => (
                            <div key={comment.id} className="space-y-2">
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarImage src={comment.avatar} alt={comment.author} />
                                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{comment.text}</p>
                                  <Button 
                                    variant="link" 
                                    size="sm" 
                                    onClick={() => handleReplyClick(comment.id)}
                                    className="text-[#FF5C35] p-0 h-auto"
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-4 ml-8">
                                  <Avatar>
                                    <AvatarImage src={reply.avatar} alt={reply.author} />
                                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">{reply.author}</span>
                                      <span className="text-xs text-gray-500">{reply.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleCommentSubmit} className="mt-4">
                          <Textarea
                            placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full mb-2"
                          />
                          <div className="flex justify-between items-center">
                            <Button type="submit" className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white">
                              {replyingTo ? "Post Reply" : "Post Comment"}
                            </Button>
                            {replyingTo && (
                              <Button variant="ghost" onClick={() => setReplyingTo(null)}>
                                Cancel Reply
                              </Button>
                            )}
                          </div>
                        </form>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="w-1/3 p-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Job Suggestion</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">{selectedProject?.type} Developer</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedProject?.name}</p>
                  <p className="text-sm text-gray-600 mb-4">{selectedProject?.location}</p>
                  <Button 
                    className="w-full bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white"
                    onClick={() => toast.success('Application submitted successfully!')}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

