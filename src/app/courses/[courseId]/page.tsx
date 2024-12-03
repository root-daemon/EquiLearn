"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const COURSE_DATA = {
  "operating-systems": {
    title: "Operating Systems",
    description: "Learn about operating system concepts and implementations",
    lessons: [
      {
        title: "Introduction to OS",
        flashcards: [
          {
            front: "What is an Operating System?",
            back: "An OS is system software that manages hardware and software resources",
          },
          {
            front: "What are the main functions of an OS?",
            back: "Process management, memory management, file management, I/O management",
          },
        ],
        notes: `# Introduction to Operating Systems
        
An operating system (OS) is system software that manages computer hardware and software resources...`,
        quiz: [
          {
            question:
              "Which of the following is NOT a function of an operating system?",
            options: [
              "Process Management",
              "Memory Management",
              "Web Browsing",
              "File Management",
            ],
            answer: 2,
          },
        ],
        videoId: "dQw4w9WgXcQ",
      },
      {
        title: "Process Management",
        flashcards: [
          {
            front: "What is a process?",
            back: "A process is a program in execution",
          },
          {
            front: "What is a thread?",
            back: "A thread is the smallest unit of execution within a process",
          },
        ],
        notes: `# Process Management

A process is a program in execution. Each process has its own memory space...`,
        quiz: [
          {
            question: "What is the difference between a process and a thread?",
            options: [
              "They are the same thing",
              "A process is smaller than a thread",
              "A thread is part of a process",
              "Processes cannot contain threads",
            ],
            answer: 2,
          },
        ],
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  "data-structures": {
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms",
    lessons: [
      {
        title: "Introduction to Data Structures",
        flashcards: [
          {
            front: "What is a data structure?",
            back: "A data structure is a way of organizing data",
          },
          {
            front: "What is an algorithm?",
            back: "A step-by-step procedure to solve a problem",
          },
        ],
        notes: `# Data Structures Basics

Data structures are fundamental concepts in computer science...`,
        quiz: [
          {
            question: "Which of these is NOT a basic data structure?",
            options: ["Array", "LinkedList", "Operating System", "Stack"],
            answer: 2,
          },
        ],
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  "computer-organisation": {
    title: "Computer Organisation",
    description: "Understand the fundamental concepts of computer architecture",
    lessons: [
      {
        title: "Introduction to Computer Organisation",
        flashcards: [
          {
            front: "What is computer organisation?",
            back: "Computer organisation is the structural relationships between components of a computer system",
          },
          {
            front:
              "What is the difference between computer organisation and computer architecture?",
            back: "Computer organisation deals with structural relationships, while computer architecture deals with conceptual design and fundamental operational structure",
          },
        ],
        notes: `# Introduction to Computer Organisation

Computer organisation refers to the way the hardware components of a computer system are arranged and how they interact with each other...`,
        quiz: [
          {
            question:
              "Which of the following is NOT a part of computer organisation?",
            options: ["CPU", "Memory", "Operating System", "Bus Architecture"],
            answer: 2,
          },
        ],
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
};

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showCardBack, setShowCardBack] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const course = COURSE_DATA[params.courseId as keyof typeof COURSE_DATA];

  if (!course) {
    return <div>Course not found</div>;
  }

  const currentLesson = course.lessons[selectedLesson];

  return (
    <div className="min-h-screen w-full bg-white text-[#160B38] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Link
              href="/"
              className="text-[#9F85EE] hover:underline mb-2 inline-block"
            >
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-[#160B38]">
              {course.title}
            </h1>
            <p className="text-[#160B38]/80 text-lg">{course.description}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <Card className="bg-white border border-[#9F85EE]/20 shadow-lg h-fit">
            <CardHeader className="bg-[#9F85EE] text-white">
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <Button
                      key={index}
                      variant={selectedLesson === index ? "secondary" : "ghost"}
                      className={`w-full justify-start text-left transition-all duration-300 ${
                        selectedLesson === index
                          ? "bg-[#9F85EE] text-white"
                          : "hover:bg-[#9F85EE]/10 text-[#160B38]"
                      }`}
                      onClick={() => setSelectedLesson(index)}
                    >
                      {lesson.title}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="overflow-hidden bg-white border border-[#9F85EE]/20 shadow-lg">
              <CardHeader className="bg-[#9F85EE] text-white">
                <CardTitle>{currentLesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="flashcards" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-[#9F85EE]/20 bg-transparent p-0">
                    <TabsTrigger
                      value="flashcards"
                      className="data-[state=active]:bg-[#9F85EE] data-[state=active]:text-white rounded-none text-[#160B38]"
                    >
                      Flashcards
                    </TabsTrigger>
                    <TabsTrigger
                      value="notes"
                      className="data-[state=active]:bg-[#9F85EE] data-[state=active]:text-white rounded-none text-[#160B38]"
                    >
                      Notes
                    </TabsTrigger>
                    <TabsTrigger
                      value="quiz"
                      className="data-[state=active]:bg-[#9F85EE] data-[state=active]:text-white rounded-none text-[#160B38]"
                    >
                      Quiz
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="data-[state=active]:bg-[#9F85EE] data-[state=active]:text-white rounded-none text-[#160B38]"
                    >
                      Video
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="flashcards" className="p-6">
                    <div className="flex items-center justify-between space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentCard((prev) =>
                            prev > 0
                              ? prev - 1
                              : currentLesson.flashcards.length - 1
                          );
                          setShowCardBack(false);
                        }}
                        aria-label="Previous flashcard"
                        className="bg-white text-[#160B38] border-[#9F85EE] hover:bg-[#9F85EE] hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Card
                        className="flex-1 cursor-pointer min-h-[300px] transition-all duration-500 ease-in-out transform perspective-1000 relative bg-white border border-[#9F85EE]/20"
                        onClick={() => setShowCardBack(!showCardBack)}
                      >
                        <CardContent
                          className={`absolute inset-0 flex items-center justify-center p-6 text-center backface-hidden transition-all duration-500 ease-in-out ${
                            showCardBack
                              ? "opacity-0 rotate-y-180"
                              : "opacity-100 rotate-y-0"
                          }`}
                        >
                          <p className="text-2xl font-semibold text-[#160B38]">
                            {currentLesson.flashcards[currentCard].front}
                          </p>
                        </CardContent>
                        <CardContent
                          className={`absolute inset-0 flex items-center justify-center p-6 text-center backface-hidden transition-all duration-500 ease-in-out transform ${
                            showCardBack
                              ? "opacity-100 rotate-y-0"
                              : "opacity-0 rotate-y-180"
                          }`}
                          style={{
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <p className="text-2xl font-semibold text-[#160B38]">
                            {currentLesson.flashcards[currentCard].back}
                          </p>
                        </CardContent>
                      </Card>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentCard((prev) =>
                            prev < currentLesson.flashcards.length - 1
                              ? prev + 1
                              : 0
                          );
                          setShowCardBack(false);
                        }}
                        aria-label="Next flashcard"
                        className="bg-white text-[#160B38] border-[#9F85EE] hover:bg-[#9F85EE] hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-center mt-4 text-sm text-[#160B38]/80">
                      Card {currentCard + 1} of{" "}
                      {currentLesson.flashcards.length}
                    </p>
                  </TabsContent>
                  <TabsContent value="notes">
                    <div className="prose max-w-none p-6 text-[#160B38]">
                      {currentLesson.notes}
                    </div>
                  </TabsContent>
                  <TabsContent value="quiz" className="p-6">
                    {currentLesson.quiz.map((question, index) => (
                      <div key={index} className="space-y-4 mb-8">
                        <h3 className="font-medium text-lg text-[#160B38]">
                          {question.question}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <Button
                              key={optionIndex}
                              variant="outline"
                              className={`w-full justify-start transition-all duration-300 ease-in-out ${
                                quizAnswers[index] === optionIndex
                                  ? optionIndex === question.answer
                                    ? "bg-green-100 text-green-800 border-green-500"
                                    : "bg-red-100 text-red-800 border-red-500"
                                  : "hover:bg-[#9F85EE]/10 text-[#160B38] border-[#9F85EE]"
                              }`}
                              onClick={() =>
                                handleQuizAnswer(index, optionIndex)
                              }
                            >
                              {option}
                              {quizAnswers[index] === optionIndex && (
                                <span className="ml-2">
                                  {optionIndex === question.answer
                                    ? "✅"
                                    : "❌"}
                                </span>
                              )}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="video" className="aspect-video p-0">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/7uXeLEAWEwY?si=Jmyzzz08f8s4RT2D`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Video for ${currentLesson.title}`}
                      className="rounded-b-lg"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
