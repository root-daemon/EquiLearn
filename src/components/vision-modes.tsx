import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Palette, BookOpen, Target, Glasses } from "lucide-react";

const impairments = [
  {
    icon: Eye,
    name: "Low Vision",
    description: "Optimized for users with reduced visual acuity",
    features: [
      "Large scalable fonts",
      "High contrast color schemes",
      "Simplified layouts",
    ],
    image: "low",
  },
  {
    icon: Palette,
    name: "Color Blindness",
    description: "Adapted for various types of color vision deficiency",
    features: [
      "Carefully selected color palettes",
      "Use of patterns and textures",
      "Clear labeling and icons",
    ],
    image: "colorblind",
  },
  {
    icon: BookOpen,
    name: "Dyslexia",
    description: "Designed to improve readability for dyslexic users",
    features: [
      "OpenDyslexic font option",
      "Increased line and letter spacing",
      "Customizable background colors",
    ],
    image: "dyslexia",
  },
  {
    icon: Target,
    name: "Glaucoma",
    description: "Tailored for users with peripheral vision loss",
    features: [
      "Centralized content layout",
      "Enhanced navigation cues",
      "Adjustable text size and contrast",
    ],
    image: "glaucoma",
  },
  {
    icon: Glasses,
    name: "Astigmatism",
    description: "Optimized for users with blurred or distorted vision",
    features: [
      "Clear, sans-serif fonts",
      "Adjustable line thickness",
      "High definition images and icons",
    ],
    image: "astigmatism",
  },
];

export function VisionModes() {
  return (
    <section id="accessibility" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Accessible for Everyone
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions for five different types of visual impairments,
            ensuring an inclusive learning experience for all students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impairments.map((impairment, index) => (
            <Card
              key={impairment.name}
              className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <impairment.icon className="h-8 w-8" />
                  {impairment.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between p-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    {impairment.description}
                  </p>
                  <h4 className="font-semibold mb-2 text-lg">Key Features:</h4>
                  <ul className="space-y-2">
                    {impairment.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-primary mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Image
                    src={`/${impairment.image}.jpeg`}
                    alt={`Visual representation for ${impairment.name}`}
                    width={400}
                    height={200}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
