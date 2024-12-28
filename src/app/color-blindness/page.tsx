"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Bell} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCourseModal } from "@/components/add-course";
import CourseCard from "@/components/course-card";
import { Sidebar } from "@/components/ui/sidebar";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getRandomBackground = () => {
    const backgrounds = ["bg-orange-200", "bg-green-200"];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };

  const getCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/subjects`,
        {
          params: { email },
        }
      );

      if (response.status === 200) {
        setSubjects(response.data.subjects);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkUserAndSetEmail = async () => {
      if (user?.emailAddresses[0].emailAddress) {
        const userEmail = user.emailAddresses[0].emailAddress;
        setEmail(userEmail);

        try {
          const response = await axios.get("/api/check-user");
          if (response.status === 200) {
            console.log("User checked:", response.data.user);
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };

    checkUserAndSetEmail();
  }, [user]);

  useEffect(() => {
    if (email) {
      getCourses();
    }
  }, [email]);

  return (
    <div className="flex min-h-screen w-full bg-green-50">
      {/* Left Sidebar */}
      <aside className="hidden sm:block w-64 border-r border-green-200 bg-green-100 p-4">
      <Sidebar />
      </aside>

      {/* Main Content */}
      <main className=" flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-green-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search Here"
              className="w-64 border-green-300 placeholder-green-400 focus:border-orange-400 focus:ring-orange-400"
              aria-label="Search"
              spellCheck="false"
              data-ms-editor="true"
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="text-green-600 hover:bg-green-100 hover:text-green-700"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Welcome Banner */}
        <Card className="mb-8 bg-orange-500 text-white">
          <CardContent className="p-6">
            <h3 className="mb-2 text-2xl font-bold">Welcome to UniVision</h3>
            <p className="mb-4 text-orange-100">
              <strong>Need help on using the app?</strong> Take a look at this
              tutorial to get started
            </p>
            <Button
              variant="secondary"
              className="bg-white font-semibold text-orange-700 hover:bg-orange-50"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-green-800">My Courses</h3>
          <AddCourseModal email={email} />
        </div>

        <div className="flex flex-wrap gap-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[200px] w-full rounded-xl"
                  />
                ))
            : subjects.map((subject: any, idx: number) => (
                <CourseCard
                  key={subject.slug}
                  slug={subject.slug}
                  title={subject.name}
                  topics={subject.topics}
                  email={email}
                  image={getRandomBackground()}
                />
              ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 hidden sm:block border-l border-green-200 bg-green-800 p-6 text-white">
        <div className="mb-8">
          <h3 className="mb-6 text-2xl font-bold">Pomodoro Timer</h3>
          <div className="flex aspect-square items-center justify-center rounded-full border-4 border-green-600 bg-green-700">
            <span className="text-3xl font-bold">25:00</span>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="secondary"
              className="bg-orange-500 font-semibold text-white hover:bg-orange-600"
            >
              Start
            </Button>
            <Button
              variant="secondary"
              className="bg-orange-500 font-semibold text-white hover:bg-orange-600"
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              className="bg-orange-500 font-semibold text-white hover:bg-orange-600"
            >
              Break
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">Calendar</h3>
          <div className="rounded-lg bg-green-700 p-4">
            <div className="mb-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-green-600"
              >
                {"<"}
              </Button>
              <span className="font-semibold">December 2024</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-green-600"
              >
                {">"}
              </Button>
            </div>
            {/* Calendar grid would go here */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-xs font-semibold text-green-300">
                  {day}
                </div>
              ))}
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`p-1 text-sm ${
                    i === 2 ? "rounded bg-orange-500 font-bold" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
