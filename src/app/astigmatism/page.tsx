import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Home, Inbox, CalendarIcon, Search, Settings } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gray-50 font-['Verdana']">
      {/* Navigation Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 space-y-8">
        <div className="text-2xl font-semibold">UniVision</div>

        <nav className="space-y-4">
          <Link
            href="#"
            className="flex items-center space-x-3 px-4 py-3 bg-gray-100 rounded-lg text-gray-900"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {["Inbox", "Calendar", "Search", "Settings"].map((item) => (
            <Link
              key={item}
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {item === "Inbox" && <Inbox className="w-5 h-5" />}
              {item === "Calendar" && <CalendarIcon className="w-5 h-5" />}
              {item === "Search" && <Search className="w-5 h-5" />}
              {item === "Settings" && <Settings className="w-5 h-5" />}
              <span>{item}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900">Dashboard</h1>
          <Input
            type="search"
            placeholder="Search Here"
            className="w-80 bg-white"
          />
        </div>

        {/* Welcome Card */}
        <Card className="mb-12 bg-gray-100 border-none">
          <CardContent className="p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Welcome to UniVision
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Need help on using the app? Take a look at this tutorial to get
              started
            </p>
            <Button variant="outline" className="bg-white">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-900">My Courses</h2>
            <Button variant="outline" className="bg-white">
              Add Courses
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Operating Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>Mutex</li>
                  <li>Semaphores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Data Structures & Algos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>Prim's Algo</li>
                  <li>Kruskal's Algo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
