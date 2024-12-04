"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Book, Calendar, Clock, Search } from "lucide-react";
import { AddCourseModal } from "@/components/add-course";
import CourseCard from "@/components/course-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();

  const getRandomBackground = () => {
    const backgrounds = ["/bg1.svg", "/bg2.svg", "/bg3.svg"];
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
    if (user?.emailAddresses[0].emailAddress) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      getCourses();
    }
  }, [email]);

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 p-8 md:p-16 lg:p-32">
      <main className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">UniVision Dashboard</h1>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Here"
              className="pl-10 text-lg py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              spellCheck="false"
              data-ms-editor="true"
            />
          </div>
        </header>

        {/* Main Navigation - Simplified and centered */}
        <nav className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Home, label: "Home" },
              { icon: Book, label: "Courses" },
              { icon: Calendar, label: "Calendar" },
              { icon: Clock, label: "Timer" },
            ].map((item) => (
              <Button key={item.label} variant="ghost" className="text-xl p-4">
                <item.icon className="h-6 w-6 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Welcome Banner - High contrast */}
        <Card className="mb-8 bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <h2 className="mb-4 text-3xl font-bold">Welcome to UniVision</h2>
            <p className="mb-6 text-xl">
              Need help using the app? Check out our tutorial to get started.
            </p>
            <Button size="lg" variant="secondary" className="text-lg">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <section className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">My Courses</h2>
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
              : filteredSubjects.map((subject) => (
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
        </section>

        {/* Pomodoro Timer - Simplified and integrated */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pomodoro Timer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold">25:00</div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" className="text-lg">
                Start
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Reset
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Break
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
