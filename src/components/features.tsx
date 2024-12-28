import {
  Youtube,
  FileText,
  BrainCircuit,
  Eye,
  Palette,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: Youtube,
      title: "Related Video Recommendations",
      description:
        "AI-powered suggestions for relevant YouTube videos based on your current study topic.",
    },
    {
      icon: FileText,
      title: "Adaptive Notes",
      description:
        "Automatically generated study notes that adapt to your preferred learning format.",
    },
    {
      icon: BrainCircuit,
      title: "Interactive Quizzes",
      description:
        "Dynamic quiz generation based on your study material with spaced repetition.",
    },
    {
      icon: Eye,
      title: "Vision Modes",
      description:
        "Five specialized visual modes for different types of visual impairments and preferences.",
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description:
        "Personalized color schemes and contrast settings for optimal readability.",
    },
    {
      icon: Zap,
      title: "Quick Flashcards",
      description:
        "AI-generated flashcards with voice support and customizable review intervals.",
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Transform Your Study Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools that adapt to your learning style and visual needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-8 w-8 text-clr mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
