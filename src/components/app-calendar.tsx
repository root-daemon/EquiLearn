"use client";
import { Calendar } from "@/components/ui/calendar";

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
import { useState } from "react";
import PomodoroTimer from "./pomodoro";
import { routeCheck } from "@/data/authRoutes";

export function AppCalendar() {
  const pathname = usePathname();
  console.log(pathname);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const authRoutes = routeCheck(pathname);

  return authRoutes ? (
    ""
  ) : (
    <Sidebar side="right" className="p-0">
      <SidebarContent className="bg-[#] ">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <PomodoroTimer />
            <div className="flex flex-col gap-6 justify-center items-center p-5">
              <h1 className="text-[#160B38] text-2xl font-semibold justify-self-start self-start">
                Calendar
              </h1>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md  "
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
