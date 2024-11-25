"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Users,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  SwitchCamera,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationsPanel } from "@/components/notifications-panel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";
import Image from "next/image";

export default function Navbar() {
  const [currentProfile, setCurrentProfile] = useState("Zohayo");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const switchProfile = () => {
    const newProfile = currentProfile === "Zohayo" ? "Glam AI" : "Zohayo";
    setCurrentProfile(newProfile);
    toast(`Switching profile to ${newProfile}`);
  };

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { href: "/", icon: "home" as const, label: "Home" },
    { href: "/jobs", icon: "jobs" as const, label: "Jobs" },
    { href: "/projects", icon: "projects" as const, label: "Projects" },
    { href: "/network", icon: "network" as const, label: "Network" },
    { href: "/inbox", icon: "inbox" as const, label: "Inbox" },
  ];

  return (
    <header className="border-b fixed bg-white top-0 w-full z-50">
      <Toaster />
      <div className="container max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Search */}
        <div className="flex items-center gap-x-5">
          <Link href="/" className="mr-6">
            <Image
              className="h-8 w-auto"
              width={32}
              height={32}
              src="/logo.svg"
              alt="logo"
            />
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search Launchboard"
              className="h-9 w-[240px] bg-[#FFE0BA] border-0 pr-8"
            />
            <Search className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        {/* Notifications and Profile */}
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-medium text-white flex items-center justify-center">
                  1
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-[420px] p-0">
              <NotificationsPanel />
            </SheetContent>
          </Sheet>

          <div className="hidden md:block">
            <ProfileDropdown
              currentProfile={currentProfile}
              switchProfile={switchProfile}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="mb-4"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="mb-6">
            <ProfileDropdown
              currentProfile={currentProfile}
              switchProfile={switchProfile}
            />
          </div>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-medium ${
                  isActive(item.href) ? "text-black" : "text-graphite"
                }`}
                onClick={toggleSidebar}
              >
                <NavIcon icon={item.icon} isActive={isActive(item.href)} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: "home" | "jobs" | "projects" | "network" | "inbox";
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center text-sm font-medium ${
        isActive ? "text-black" : "text-graphite"
      }`}
    >
      <NavIcon icon={icon} isActive={isActive} />
      {label}
    </Link>
  );
}

function NavIcon({
  icon,
  isActive,
}: {
  icon: "home" | "jobs" | "projects" | "network" | "inbox";
  isActive: boolean;
}) {
  const icons = {
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-6 ${isActive ? "text-black" : "text-stone"}`}
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
    jobs: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-6 ${isActive ? "text-black" : "text-stone"}`}
      >
        <path
          fillRule="evenodd"
          d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clipRule="evenodd"
        />
        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
      </svg>
    ),
    projects: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-6 ${isActive ? "text-black" : "text-stone"}`}
      >
        <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
      </svg>
    ),
    network: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-6 ${isActive ? "text-black" : "text-stone"}`}
      >
        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
      </svg>
    ),
    inbox: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-6 ${isActive ? "text-black" : "text-stone"}`}
      >
        <path
          fillRule="evenodd"
          d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0
0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return icons[icon];
}

function ProfileDropdown({
  currentProfile,
  switchProfile,
}: {
  currentProfile: string;
  switchProfile: () => void;
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-2">
          <Image
            width={32}
            height={32}
            src="/avatars/me.png"
            alt="Me"
            className="rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Divya Yash</span>
            <span className="text-xs text-muted-foreground">
              {currentProfile}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Divya Yash</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentProfile}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={switchProfile}>
            <SwitchCamera className="mr-2 h-4 w-4" />
            <span>Switch to</span>
            <span className="ml-auto rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-600">
              {currentProfile === "Zohayo" ? "Glam AI" : "Zohayo"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/manage-profiles")}>
            <Users className="mr-2 h-4 w-4" />
            <span>Manage Profiles</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/profile")}>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/help-center")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help Center</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
