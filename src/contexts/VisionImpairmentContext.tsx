"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type VisionImpairment =
  | "low-vision"
  | "color-blindness"
  | "dyslexia"
  | "glaucoma"
  | "astigmatism"
  | "none"
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

  return (
    <VisionImpairmentContext.Provider value={{ impairment, setImpairment }}>
      {children}
    </VisionImpairmentContext.Provider>
  );
};
