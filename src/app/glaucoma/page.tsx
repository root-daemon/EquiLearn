import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Book, Calendar, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 p-32">
      <main className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">UniVision Dashboard</h1>
          <Input
            type="search"
            placeholder="Search Here"
            className="max-w-md mx-auto text-lg"
          />
        </header>

        {/* Main Navigation - Simplified and centered */}
        <nav className="mb-8">
          <div className="flex justify-center space-x-4">
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
            <Button variant="outline" size="lg" className="text-lg">
              Add Course
            </Button>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Operating Systems",
                topics: ["Mutex", "Semaphores"],
                gradient: "from-pink-500 to-orange-500",
              },
              {
                title: "Data Structures & Algorithms",
                topics: ["Prim's Algorithm", "Kruskal's Algorithm"],
                gradient: "from-green-500 to-blue-500",
              },
            ].map((course) => (
              <Card key={course.title} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {course.title}
                  </CardTitle>
                  <ul className="mt-2 space-y-1">
                    {course.topics.map((topic) => (
                      <li key={topic} className="text-lg text-muted-foreground">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardHeader>
              </Card>
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
