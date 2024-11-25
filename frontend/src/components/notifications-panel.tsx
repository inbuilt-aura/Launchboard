"use client"

import { MoreHorizontal, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "connection" | "comment" | "feature" | "project" | "job" | "following" | "like"
  avatar?: string
  initials?: string
  title: string
  content: string
  timestamp: string
  actions?: React.ReactNode
  projectIcon?: React.ReactNode
}

export function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "connection",
      initials: "AS",
      title: "Ashish Singh",
      content: "has sent you a connection request.",
      timestamp: "2m",
      actions: (
        <div className="flex gap-2 mt-2">
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-normal h-8 px-3 rounded">Accept</Button>
          <Button size="sm" variant="outline" className="h-8 px-3 rounded">Decline</Button>
        </div>
      ),
    },
    {
      id: "2",
      type: "comment",
      avatar: "/placeholder.svg",
      title: "Patrick",
      content: "replied to your comment on Decentralized KYC on blockchain -",
      timestamp: "8h",
      actions: (
        <div className="mt-2 rounded bg-gray-100 p-3">
          <p className="text-sm text-gray-600">&quot;Sounds good&quot;</p>
        </div>
      ),
    },
    {
      id: "3",
      type: "feature",
      projectIcon: (
        <div className="h-10 w-10 rounded bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
          L
        </div>
      ),
      title: "New Feature Alert!",
      content: "You can now send posts to your connect on the platform directly",
      timestamp: "14h",
      actions: (
        <Button size="sm" variant="secondary" className="mt-2 h-8 px-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-900">
          Try now
        </Button>
      ),
    },
    {
      id: "4",
      type: "project",
      avatar: "/placeholder.svg",
      title: "Katelyn M",
      content: "has posted a new project",
      timestamp: "14h",
      actions: (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
          <svg
            className=" h-4 w-4 text-orange-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          AI based twitter bookmarks preprocessor
        </div>
      ),
    },
    {
      id: "5",
      type: "job",
      projectIcon: (
        <div className="h-10 w-10 rounded bg-red-500 text-white flex items-center justify-center text-xl font-bold">
          F
        </div>
      ),
      title: "Frie Inc",
      content: "has posted a new job that matches your role",
      timestamp: "14h",
      actions: (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
          <svg
            className=" h-4 w-4 text-orange-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Remote blockchain developer for a decentralized...
        </div>
      ),
    },
    {
      id: "6",
      type: "following",
      initials: "AG",
      title: "Andrej and 8 others",
      content: "started following you",
      timestamp: "15h",
    },
    {
      id: "7",
      type: "like",
      initials: "YS",
      title: "Yash and 14 others",
      content: 'liked the published project "Virtual AI simulator google maps"',
      timestamp: "15h",
    },
  ]

  return (
    <div className="flex h-full overflow-y-scroll flex-col bg-white">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-orange-500 hover:text-orange-600 h-8 px-2 text-sm font-normal">
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="flex-1">
        <div className="border-b px-4">
          <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
            <TabsTrigger value="all" className="relative rounded-none border-b-2 border-transparent px-2 pb-2 pt-2 font-normal text-sm data-[state=active]:border-orange-500 data-[state=active]:text-orange-500">
              All
              <span className="ml-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white">1</span>
            </TabsTrigger>
            <TabsTrigger value="mentions" className="relative rounded-none border-b-2 border-transparent px-2 pb-2 pt-2 font-normal text-sm data-[state=active]:border-orange-500 data-[state=active]:text-orange-500">
              Mentions
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="flex-1 overflow-auto p-0">
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-4">
                {notification.avatar ? (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>{notification.initials}</AvatarFallback>
                  </Avatar>
                ) : notification.projectIcon ? (
                  notification.projectIcon
                ) : (
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold">
                      {notification.initials}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-medium">{notification.title}</span>{" "}
                      <span className="text-gray-600">{notification.content}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{notification.timestamp}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as read</DropdownMenuItem>
                          <DropdownMenuItem>Turn off notifications</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {notification.actions}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mentions" className="flex-1 overflow-auto p-0">
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No mentions yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}