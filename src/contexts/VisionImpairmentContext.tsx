"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type VisionImpairment =
  | "low-vision"
  | "color-blindness"
  | "dyslexia"
  | "glaucoma"
  | "astigmatism"
  | "none"
  | string
  | null;

interface VisionImpairmentContextType {
  impairment: VisionImpairment;
  setImpairment: (impairment: VisionImpairment) => void;
}

const VisionImpairmentContext = createContext<
  VisionImpairmentContextType | undefined
>(undefined);

export const useVisionImpairment = () => {
  const context = useContext(VisionImpairmentContext);
  if (!context) {
    throw new Error(
      "useVisionImpairment must be used within a VisionImpairmentProvider"
    );
  }
  return context;
};

export const VisionImpairmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [impairment, setImpairment] = useState<VisionImpairment>(null);

  useEffect(() => {
    const storedImpairment = localStorage.getItem('impairment');
    console.log(storedImpairment)
    switch (storedImpairment) {
      case "low-vision":
        document.body.classList.add("low-vision");
        break;
      case "color-blindness":
        document.body.classList.add("color-blindness");
        break;
      case "dyslexia":
        document.body.classList.add("dyslexia");
        break;
      case "glaucoma":
        document.body.classList.add("glaucoma");
        break;
      case "astigmatism":
        document.body.classList.add("astigmatism");
        break;
      default:
        document.body.classList.remove("low-vision", "color-blindness", "dyslexia", "glaucoma", "astigmatism");
        break;
    }
    if (storedImpairment) {
      setImpairment(storedImpairment as VisionImpairment);
      
    }
  }, []);

  return (
    <VisionImpairmentContext.Provider value={{ impairment, setImpairment }}>
      {children}
    </VisionImpairmentContext.Provider>
  );
};