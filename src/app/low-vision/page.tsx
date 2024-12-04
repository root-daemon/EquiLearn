import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Inbox,
  CalendarIcon,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      {/* Sidebar with high contrast and larger text */}
      <aside className="w-72 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">UniVision</h1>

        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-lg rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Home className="w-6 h-6" />
            Home
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-lg rounded-lg hover:bg-gray-800"
          >
            <Inbox className="w-6 h-6" />
            Inbox
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-lg rounded-lg hover:bg-gray-800"
          >
            <CalendarIcon className="w-6 h-6" />
            Calendar
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-lg rounded-lg hover:bg-gray-800"
          >
            <Search className="w-6 h-6" />
            Search
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-lg rounded-lg hover:bg-gray-800"
          >
            <Settings className="w-6 h-6" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content with improved contrast and larger text */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search Here"
                className="pl-10 text-lg h-12"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Welcome banner with high contrast */}
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-3xl font-bold">Welcome to UniVision</h3>
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
              <Button variant="outline" size="lg" className="text-lg">
                Add Courses
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="h-48 bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg" />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Operating Systems
                    </h4>
                    <ul className="mt-2 space-y-1 text-lg text-gray-700 dark:text-gray-300">
                      <li>Mutex</li>
                      <li>Semaphores</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg" />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Data Structures & Algos
                    </h4>
                    <ul className="mt-2 space-y-1 text-lg text-gray-700 dark:text-gray-300">
                      <li>Prim's Algo</li>
                      <li>Kruskal's Algo</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Right sidebar with improved contrast */}
      <aside className="w-96 bg-gray-900 text-white p-6 space-y-8">
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
