import Image from "next/image";
import { Eye, Palette, BookOpen, Target, Glasses } from "lucide-react";

const impairments = [
  {
    icon: Eye,
    name: "Low Vision",
    description: "Key Features:",
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
    description: "Key Features:",
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
    description: "Key Features:",
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
    description: "Key Features:",
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
    description: "Key Features:",
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
    <section id="accessibility" className="py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-4xl font-bold">Accessible for Everyone</h2>
          <p className="text-md max-w-screen-sm opacity-60">
            Tailored solutions for five different types of visual impairments,
            ensuring an inclusive learning experience for all students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {impairments.map((impairment) => (
            <div
              key={impairment.name}
              className="mx-auto flex max-w-5xl items-start justify-center gap-12"
            >
              {/* Image Card */}
              <div className="w-[480px] flex-shrink-0 rounded-2xl bg-transparent shadow-lg transition-shadow hover:shadow-xl">
                <Image
                  src={`/${impairment.image}.jpeg`}
                  alt={`Visual representation for ${impairment.name}`}
                  width={1200}
                  height={600}
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="max-w-xl flex-grow space-y-4 pt-2 text-black">
                <h3 className="text-left text-2xl font-semibold">
                  {impairment.name}
                </h3>
                <p className="text-left !text-black">
                  {impairment.description}
                </p>
                <ul className="space-y-2">
                  {impairment.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-black"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
