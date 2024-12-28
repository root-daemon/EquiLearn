"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCourseModal } from "@/components/add-course";
import {
  Home,
  Inbox,
  CalendarIcon,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sidebar,
} from "lucide-react";
import CourseCard from "@/components/course-card";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-r from-rose-100 to-teal-100",
      "bg-gradient-to-r from-green-100 to-blue-100",
      "bg-gradient-to-r from-yellow-100 to-pink-100",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

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
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
      {/* Sidebar with high contrast and larger text */}
      <aside className="w-72 hidden sm:block bg-gray-900 text-white p-6 space-y-6">
        <Sidebar />
      </aside>

      {/* Main content with improved contrast and larger text */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search Here"
                  className="pl-10 text-lg h-12"
                  aria-label="Search"
                  spellCheck="false"
                  data-ms-editor="true"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Bell className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Welcome banner with high contrast */}
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-3xl font-bold">Welcome to Equilearn</h3>
              <p className="text-xl opacity-90">
                Need help on using the app? Take a look at this tutorial to get
                started
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-6 py-3 mt-4"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Courses section with improved visibility */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Courses
              </h3>
              <AddCourseModal email={email} />
            </div>

            <div className="flex flex-wrap gap-6">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-[250px] w-full rounded-xl"
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
          </div>
        </div>
      </main>

      {/* Right sidebar with improved contrast */}
      <aside className="w-96 hidden sm:block bg-gray-900 text-white p-6 space-y-8">
        <Card className="bg-gray-800 border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-4 border-gray-700 rounded-full" />
              <div
                className="absolute inset-0 border-4 border-primary rounded-full"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">25:00</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="text-lg">
                Start
              </Button>
              <Button variant="outline" size="sm" className="text-lg">
                Reset
              </Button>
              <Button variant="outline" size="sm" className="text-lg">
                Break
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-xl font-semibold">December 2024</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="grid grid-cols-7 text-center gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-lg font-medium text-gray-400 p-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <Button
                  key={i + 1}
                  variant="ghost"
                  className={`text-lg p-2 ${
                    i + 1 === 3 ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
