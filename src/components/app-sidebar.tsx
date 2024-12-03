"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const authRoutes =
    pathname === "/" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/astigmatism" ||
    pathname === "/glaucoma"
      ? true
      : false;

  return authRoutes ? (
    ""
  ) : (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl text-black font-bold my-4 ml-4">
            UniVision
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-3 gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`${
                        pathname === item.url
                          ? "bg-[#7C59E9] hover:bg-[#7C59E9]"
                          : ""
                      } rounded-xl py-5 px-4`}
                    >
                      <item.icon
                        className={`${
                          pathname === item.url ? "text-white" : "text-black"
                        }`}
                      />
                      <span
                        className={`${
                          pathname === item.url ? "text-white" : "text-black"
                        }`}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex w-full p-4 justify-start items-start border">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
