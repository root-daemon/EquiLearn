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
} from "lucide-react";
import "@/styles/dyslexic-friendly.css";
import CourseCard from "@/components/course-card";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getRandomColor = () => {
    const colors = ["#e6f2ff", "#fff0e6", "#e6ffe6", "#ffe6e6"];
    return colors[Math.floor(Math.random() * colors.length)];
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
    if (user?.emailAddresses[0].emailAddress) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      getCourses();
    }
  }, [email]);

  const getRandomBackground = () => {
    const backgrounds = ["bg-orange-200", "bg-green-200"];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };

  return (
    <div className="dyslexic-friendly min-h-screen flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-100 dark:bg-gray-800 p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-white">
          UniVision
        </h1>

        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-xl rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            <Home className="w-6 h-6" />
            Home
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-xl rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Inbox className="w-6 h-6" />
            Inbox
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-xl rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <CalendarIcon className="w-6 h-6" />
            Calendar
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-xl rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Search className="w-6 h-6" />
            Search
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-xl rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Settings className="w-6 h-6" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-wide text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
                <Input
                  type="search"
                  placeholder="Search Here"
                  className="pl-12 text-xl h-14 rounded-full"
                  aria-label="Search"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Bell className="h-7 w-4" />
              </Button>
            </div>
          </div>

          {/* Welcome banner */}
          <Card className="bg-blue-100 border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-3xl font-bold text-blue-800">
                Welcome to UniVision
              </h3>
              <p className="text-xl text-blue-700">
                Need help on using the app? Take a look at this tutorial to get
                started
              </p>
              <Button
                size="lg"
                className="text-xl px-6 py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Courses section */}
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

      {/* Right sidebar */}
      <aside className="w-96 bg-gray-100 dark:bg-gray-800 p-6 space-y-8">
        <Card className="bg-white dark:bg-gray-700 border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-600 rounded-full" />
              <div
                className="absolute inset-0 border-4 border-blue-500 rounded-full"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  25:00
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button size="sm" className="text-xl">
                Start
              </Button>
              <Button size="sm" className="text-xl">
                Reset
              </Button>
              <Button size="sm" className="text-xl">
                Break
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-700 border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <span className="text-2xl font-semibold">December 2024</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            <div className="grid grid-cols-7 text-center gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-xl font-medium text-gray-600 dark:text-gray-400 p-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <Button
                  key={i + 1}
                  variant="ghost"
                  className={`text-xl p-2 ${
                    i + 1 === 3 ? "bg-blue-100 text-blue-800" : ""
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
