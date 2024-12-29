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
  
    setImpairment(impairmentId);
    localStorage.setItem('impairment', impairmentId);
  
      speakText(
        `You selected ${impairmentId}. Navigating to the ${impairmentId} page.`
      );
      router.push("/dashboard");
    
  };

  const voiceNavigate = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Add numeric labels to interactive elements
    const elements = document.querySelectorAll('button, a, [role="button"]');
    elements.forEach((el, index) => {
      const label = document.createElement('span');
      label.textContent = `${index + 1}`;
      label.className = 'absolute -top-4 -left-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm';
      if (el instanceof HTMLElement) {
        el.style.position = 'relative';
        el.appendChild(label);
      }
    });
  
    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
      
      // Handle numeric selection
      const number = parseInt(text);
      if (!isNaN(number) && number > 0 && number <= elements.length) {
        const element = elements[number - 1] as HTMLElement;
        element.click();
        return;
      }
  
      // Handle navigation commands
      if (text.includes('back')) {
        window.history.back();
      } else if (text.includes('forward')) {
        window.history.forward();
      }
    };
  
    recognition.onend = () => {
      recognition.start(); // Restart recognition
    };
  
    recognition.start();
  };

  useEffect(() => {
    voiceNavigate();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <Card className="w-full max-w-4xl p-12 border-none bg-transparent">
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
                className="text-2xl py-8 h-auto rounded-2xl"
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
              className="text-xl rounded-2xl py-6 px-8 h-auto"
            >
              Restart Voice Selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
