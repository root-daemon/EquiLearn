import { Button } from "@/components/ui/button";
import { Eye, BookOpen } from "lucide-react";
import { RiSpeakLine } from "react-icons/ri";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative">

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl !leading-normal font-extrabold tracking-tight sm:text-6xl mb-6">
            From Vision to Voice<br />
            <span className="px-3 py-0.5 rounded-2xl bg-clr text-white font-extrabold">Learning</span>  for All.
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            <Eye className="h-8 w-8 text-clr" />
            <BookOpen className="h-8 w-8 text-clr" />
            <RiSpeakLine className="h-8 w-8 text-clr" />
          </div>
          
          <p className="text-base  max-w-screen-sm text-muted-foreground mb-8">
            UniVision adapts to your needs with AI-powered study materials and
            five specialized visual modes. Generate custom content, from video
            summaries to flashcards, tailored to your learning style.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link href={"/dashboard"}>
              <Button size="lg" className="gap-2 bg-clr text-white font-extrabold rounded-xl px-6 hover:bg-clr hover:brightness-90 transition-all duration-100">
                <BookOpen className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href={"#cards"} >
            <Button size="lg" variant="outline" className="rounded-xl px-6">
              Features
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
