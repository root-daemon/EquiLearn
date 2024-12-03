import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, BookOpen, Youtube, FileText, BrainCircuit } from "lucide-react";

export function Hero() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl"
          aria-hidden="true"
        >
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-purple-100 to-purple-50 opacity-30" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Eye className="h-8 w-8 text-purple-600" />
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Personalized Learning for Every Vision
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-8">
            UniVision adapts to your needs with AI-powered study materials and
            five specialized visual modes. Generate custom content, from video
            summaries to flashcards, tailored to your learning style.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
