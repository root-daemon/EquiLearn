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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 gap-12">
          {impairments.map((impairment) => (
            <div 
              key={impairment.name} 
              className="flex gap-12 items-start justify-center max-w-5xl mx-auto"
            >
              {/* Image Card */}
              <div className="bg-transparent rounded-2xl shadow-lg hover:shadow-xl transition-shadow w-[280px] flex-shrink-0">
                <Image
                  src={`/${impairment.image}.jpeg`}
                  alt={`Visual representation for ${impairment.name}`}
                  width={400}
                  height={200}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="flex-grow max-w-xl space-y-4 text-black pt-2">
                <h3 className="text-2xl font-semibold text-left">{impairment.name}</h3>
                <p className="!text-black text-left">{impairment.description}</p>
                <ul className="space-y-2">
                  {impairment.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
