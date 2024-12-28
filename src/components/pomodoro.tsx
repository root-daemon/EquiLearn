'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, Pause, Play, RotateCcw } from 'lucide-react'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export function PomodoroTimer() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (isWork) {
        setTimeLeft(BREAK_TIME)
        setIsWork(false)
      } else {
        setTimeLeft(WORK_TIME)
        setIsWork(true)
      }
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isWork])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(WORK_TIME)
    setIsWork(true)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='relative'>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
      >
        <Timer className="h-4 w-4" />
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-64 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle>{isWork ? 'Work Time' : 'Break Time'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center mb-4">
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center space-x-2">
              <Button size="sm" onClick={toggleTimer}>
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

