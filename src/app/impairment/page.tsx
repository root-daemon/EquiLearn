"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVisionImpairment } from "@/contexts/VisionImpairmentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkUser } from "@/lib/checkUser";

const impairments = [
  { id: "low-vision", label: "Low Vision" },
  { id: "color-blindness", label: "Color Blindness" },
  { id: "dyslexia", label: "Dyslexia" },
  { id: "glaucoma", label: "Glaucoma" },
  { id: "astigmatism", label: "Astigmatism" },
  { id: "none", label: "No Impairment" },
];

export default function VisionImpairmentSelector() {
  const router = useRouter();
  const { setImpairment } = useVisionImpairment();
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);

  checkUser();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    if (speechSynthesis) {
      speakText(
        "Please select your vision impairment. Options are: Low Vision, Color Blindness, Dyslexia, Glaucoma, Astigmatism, and No Impairment.",
        handleVoiceSelection
      );
    }
  }, [speechSynthesis]);

  const speakText = (text: string, onEnd?: () => void) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceSelection = () => {
    setIsListening(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript.toLowerCase();

      const selectedImpairment = impairments.find((imp) =>
        text.includes(imp.id)
      );
      if (selectedImpairment) {
        handleSelection(selectedImpairment.id);
      } else {
        speakText(
          "I'm sorry, I didn't catch that. Please try again or use the buttons to select your impairment.",
          handleVoiceSelection
        );
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error", event.error);
      setIsListening(false);
      handleVoiceSelection(); // Restart voice recognition
    };

    recognition.start();
  };

  const handleSelection = (impairmentId: string) => {
    setImpairment(impairmentId as any);
    if (impairmentId === "none") {
      speakText(
        "You selected No Impairment. Navigating to the normal dashboard."
      );
      router.push("/dashboard");
    } else {
      speakText(
        `You selected ${impairmentId}. Navigating to the ${impairmentId} page.`
      );
      router.push(`/${impairmentId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <Card className="w-full max-w-4xl p-12">
        <CardHeader>
          <CardTitle className="text-4xl text-center mb-4">
            Select Your Vision Impairment
          </CardTitle>
          <CardDescription className="text-xl text-center">
            Choose the option that best describes your vision condition or use
            voice commands.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impairments.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleSelection(item.id)}
                className="text-2xl py-8 h-auto"
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl mb-4">
              {isListening
                ? "Listening for voice command..."
                : "Click a button or speak your selection"}
            </p>
            <Button
              onClick={() => {
                speakText(
                  "Please select your vision impairment. Options are: Low Vision, Color Blindness, Dyslexia, Glaucoma, Astigmatism, and No Impairment.",
                  handleVoiceSelection
                );
              }}
              className="text-xl py-6 px-8 h-auto"
            >
              Restart Voice Selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
