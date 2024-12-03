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
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

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
    pathname === "/sign-in" || pathname === "/sign-up" ? true : false;
  console.log(authRoutes);

  return authRoutes ? (
    ""
  ) : (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-black font-bold my-4">
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
    </Sidebar>
  );
}
