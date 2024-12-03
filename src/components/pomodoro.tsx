"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function PomodoroTimer() {
  const [time, setTime] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const toggleTimer = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTime(isBreak ? BREAK_TIME : WORK_TIME);
  }, [isBreak]);

  const switchMode = useCallback(() => {
    setIsBreak(!isBreak);
    setTime(isBreak ? WORK_TIME : BREAK_TIME);
    setIsActive(false);
  }, [isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      switchMode();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, switchMode]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = isBreak
    ? (BREAK_TIME - time) / BREAK_TIME
    : (WORK_TIME - time) / WORK_TIME;

  return (
    <Card className="w-full max-w-md mx-auto bg-transparent border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-white font-bold text-center">
          {isBreak ? "Break Time" : "Pomodoro Timer"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CircularProgress progress={progress} />
        <div className="text-4xl text-white font-bold mt-4">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button
          onClick={toggleTimer}
          className="text-[#160B38] bg-white hover:bg-white"
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={resetTimer}
          className="text-[#160B38] bg-white hover:bg-white"
        >
          Reset
        </Button>
        <Button
          onClick={switchMode}
          className="text-[#160B38] bg-white hover:bg-white"
        >
          {isBreak ? " Work" : " Break"}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface CircularProgressProps {
  progress: number;
}

function CircularProgress({ progress }: CircularProgressProps) {
  const radius = 80;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}
