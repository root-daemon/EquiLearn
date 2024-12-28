import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { VisionModes } from "@/components/vision-modes";

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <Nav />
      <Hero />
      <Features />
      <VisionModes />
    </div>
  );
}
