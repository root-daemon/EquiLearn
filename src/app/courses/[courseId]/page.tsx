"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SWRConfig } from "swr";
import { useCourseState } from "@/lib/courseState";
import { textToMorse } from "@/lib/morse";
import { Lesson, QuizQuestion, MarkdownComponentProps } from '@/types/Course';

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  // Unwrap the params using React.use()
  const resolvedParams = React.use(params);
  const { courseId } = resolvedParams;

  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showCardBack, setShowCardBack] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState<string | undefined>();
  const [morse, setMorse] = useState<string | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // 1. Fetch the data for the course
  useEffect(() => {
    const fetchData = async () => {
      if (!email || !courseId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/${email}/${courseId}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [email, courseId]);

  // 2. If user is logged in, set the email in state
  const { user } = useUser();
  useEffect(() => {
    async function checkUserAndSetEmail() {
      if (user?.emailAddresses[0].emailAddress) {
        const userEmail = user.emailAddresses[0].emailAddress;
        setEmail(userEmail);

        // Attempt to check user session or something
        try {
          const response = await axios.get("/api/check-user");
          if (response.status === 200) {
            console.log("User checked:", response.data.user);
          }
        } catch (err) {
          console.error("Error checking user:", err);
        }
      }
    }
    checkUserAndSetEmail();
  }, [user]);

  // 3. Build the "course" object from the data
  const course = data
    ? {
        title: data.subject.name,
        description: data.subject.description,
        lessons: data.subject.topics.map((topic: string) => ({
          title: topic,
        })),
        // If you have a videoId in your data...
        videoId: data.subject.videoId || null,
      }
    : null;

  // 4. Load notes, flashcards, and quiz (this uses your custom hook)
  //    You pass the data.subject to the hook
  const {
    notes,
    flashcards,
    quiz,
    isLoading: isLoadingGeneratedContent,
  } = useCourseState(data?.subject);

  // 5. Handle quiz answers
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  // 6. UI states
  if (error) return <div>Failed to load: {error.message}</div>;
  const isLoading = isLoadingData || isLoadingGeneratedContent;

  // 7. Render
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isOnline() {
          return true;
        },
      }}
    >
      <div className="min-h-screen w-full bg-white p-6 text-[#160B38]">
        <div className="space-y-8">
          <div className="m-12 flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="mb-2 inline-block text-clr hover:underline"
              >
                &larr; Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-[#160B38]">
                {isLoading ? (
                  <Skeleton className="h-12 w-64" />
                ) : (
                  course?.title || "Course Title"
                )}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Sidebar with lessons */}
            <div className="border-clr/20 h-fit border-r bg-white p-4">
              <h2 className="m-3 text-2xl font-bold">Lessons</h2>
              <div className="p-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton
                            key={index}
                            className="h-10 w-full rounded-md"
                          />
                        ))
                      : course?.lessons?.map((lesson: Lesson, index: number) => (
                          <Button
                            key={index}
                            variant={
                              selectedLesson === index ? "secondary" : "ghost"
                            }
                            className={`w-full justify-start text-left transition-all duration-300 ${
                              selectedLesson === index
                                ? "bg-clr text-white"
                                : "hover:bg-clr/10 text-[#160B38]"
                            }`}
                            onClick={() => setSelectedLesson(index)}
                          >
                            {lesson.title}
                          </Button>
                        ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-8">
              <div className="border-clr/20 overflow-hidden border-0 bg-white">
                <CardContent className="rounded-none p-0">
                  <Tabs defaultValue="flashcards" className="w-full">
                    <TabsList className="border-clr/20 w-full justify-start rounded-none border-b bg-transparent px-4">
                      <TabsTrigger
                        value="flashcards"
                        className="text-[#160B38] data-[state=active]:bg-clr data-[state=active]:text-white"
                      >
                        Flashcards
                      </TabsTrigger>
                      <TabsTrigger
                        value="notes"
                        className="text-[#160B38] data-[state=active]:bg-clr data-[state=active]:text-white"
                      >
                        Notes
                      </TabsTrigger>
                      <TabsTrigger
                        value="quiz"
                        className="text-[#160B38] data-[state=active]:bg-clr data-[state=active]:text-white"
                      >
                        Quiz
                      </TabsTrigger>
                      <TabsTrigger
                        value="video"
                        className="text-[#160B38] data-[state=active]:bg-clr data-[state=active]:text-white"
                      >
                        Video
                      </TabsTrigger>
                    </TabsList>

                    {/* Flashcards */}
                    <TabsContent value="flashcards" className="p-6">
                      {isLoading ? (
                        <div className="flex items-center justify-between space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Card className="min-h-[300px] flex-1">
                            <CardContent className="flex h-[300px] flex-col items-center justify-center gap-4">
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-6 w-1/4" />
                            </CardContent>
                          </Card>
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between space-x-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCurrentCard((prev) =>
                                prev > 0 ? prev - 1 : flashcards.length - 1,
                              );
                              setShowCardBack(false);
                            }}
                            aria-label="Previous flashcard"
                            className="border-clr bg-white text-[#160B38] hover:bg-clr hover:text-white"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          {/* Only render the current card, or handle as a carousel */}
                          {flashcards.length > 0 && (
                            <Card
                              key={currentCard}
                              className="perspective-1000 border-clr/20 relative min-h-[300px] flex-1 transform cursor-pointer border bg-white transition-all duration-500 ease-in-out"
                              onClick={() => setShowCardBack(!showCardBack)}
                            >
                              <CardContent
                                className={`backface-hidden absolute inset-0 flex items-center justify-center p-6 text-center transition-all duration-500 ease-in-out ${
                                  showCardBack
                                    ? "rotate-y-180 opacity-0"
                                    : "rotate-y-0 opacity-100"
                                }`}
                              >
                                <p className="text-2xl font-semibold text-[#160B38]">
                                  {flashcards[currentCard].question}
                                </p>
                              </CardContent>
                              <CardContent
                                className={`backface-hidden absolute inset-0 flex transform items-center justify-center p-6 text-center transition-all duration-500 ease-in-out ${
                                  showCardBack
                                    ? "rotate-y-0 opacity-100"
                                    : "rotate-y-180 opacity-0"
                                }`}
                                style={{
                                  transformStyle: "preserve-3d",
                                  backfaceVisibility: "hidden",
                                }}
                              >
                                <p className="text-2xl font-semibold text-[#160B38]">
                                  {flashcards[currentCard].answer}
                                </p>
                              </CardContent>
                            </Card>
                          )}

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCurrentCard((prev) =>
                                prev < flashcards.length - 1 ? prev + 1 : 0,
                              );
                              setShowCardBack(false);
                            }}
                            aria-label="Next flashcard"
                            className="border-clr bg-white text-[#160B38] hover:bg-clr hover:text-white"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {!isLoading && flashcards.length > 0 && (
                        <p className="mt-4 text-center text-sm text-[#160B38]/80">
                          Card {currentCard + 1} of {flashcards.length}
                        </p>
                      )}
                    </TabsContent>
                    {/* Notes */}
                    <TabsContent value="notes">
                      <div className="prose w-full p-6 px-32 text-[#160B38]">
                        {isLoading ? (
                          <>
                            <Skeleton className="mb-4 h-6 w-3/4" />
                            <Skeleton className="mb-2 h-4 w-full" />
                            <Skeleton className="mb-2 h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                          </>
                        ) : (
                          notes && (
                            <>
                              <div className="mb-4 flex justify-end">
                                <Button
                                  onClick={() => {
                                    const utterance =
                                      new SpeechSynthesisUtterance(notes);
                                    window.speechSynthesis.speak(utterance);
                                  }}
                                  className="hover:bg-clr/90 bg-clr text-white"
                                >
                                  🔊
                                </Button>
                                <Button
                                  onClick={async () => {
                                    try {
                                      if(morse) {
                                        setMorse(undefined)
                                      } else {
                                        setMorse(textToMorse(notes))
                                      }
                                    } catch (err) {
                                      console.error('Error playing morse sound:', err);
                                    }
                                  }}
                                  className="hover:bg-clr/90 bg-white border border-gray-300/10 text-black ml-2"
                                >
                                  {morse ? "Morse" : "Text"}
                                </Button>
                              </div>
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h1: (props: MarkdownComponentProps) => (
                                    <h1
                                      className="my-2 border-b border-gray-500 text-5xl font-extrabold"
                                      {...props}
                                    />
                                  ),
                                  h2: (props: MarkdownComponentProps) => (
                                    <h2
                                      className="mb-3 text-3xl font-bold"
                                      {...props}
                                    />
                                  ),
                                  h3: (props: MarkdownComponentProps) => (
                                    <h3
                                      className="text-2xl font-bold"
                                      {...props}
                                    />
                                  ),
                                  p: (props: MarkdownComponentProps) => (
                                    <p className="mb-4 ml-1" {...props} />
                                  ),
                                  ul: (props: MarkdownComponentProps) => (
                                    <ul
                                      className="ml-2 list-inside list-disc pl-2"
                                      {...props}
                                    />
                                  ),
                                  ol: (props: MarkdownComponentProps) => (
                                    <ol
                                      className="ml-2 list-inside list-decimal pl-2"
                                      {...props}
                                    />
                                  ),
                                  blockquote: (props: MarkdownComponentProps) => (
                                    <blockquote
                                      className="border-l-4 border-gray-300 pl-4 italic"
                                      {...props}
                                    />
                                  ),
                                  code: (props: MarkdownComponentProps) => (
                                    <code
                                      className="rounded bg-gray-100 p-1"
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {morse ? morse : notes}
                              </ReactMarkdown>
                            </>
                          )
                        )}
                      </div>{" "}
                    </TabsContent>

                    {/* Quiz */}
                    <TabsContent value="quiz" className="p-6">
                      {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="mb-8 space-y-4">
                              <Skeleton className="h-6 w-3/4" />
                              <div className="space-y-2">
                                {Array.from({ length: 4 }).map(
                                  (_, optionIndex) => (
                                    <Skeleton
                                      key={optionIndex}
                                      className="h-10 w-full"
                                    />
                                  ),
                                )}
                              </div>
                            </div>
                          ))
                        : quiz.map((question: QuizQuestion, index: number) => (
                            <div key={index} className="mb-8 space-y-4">
                              <h3 className="text-lg font-medium font-semibold text-[#160B38]">
                                {question.question}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map(
                                  (option: string, optionIndex: number) => {
                                    const isSelected =
                                      quizAnswers[index] === optionIndex;
                                    const isCorrect =
                                      optionIndex === question.correct_answer;

                                    return (
                                      <Button
                                        key={optionIndex}
                                        variant="outline"
                                        className={`w-full items-center justify-start transition-all duration-300 ease-in-out ${
                                          isSelected
                                            ? isCorrect
                                              ? "border-green-500 bg-green-100 text-green-800"
                                              : "border-red-500 bg-red-100 text-red-800"
                                            : "hover:bg-clr/10 border-clr/20 text-[#160B38]"
                                        }`}
                                        onClick={() =>
                                          handleQuizAnswer(index, optionIndex)
                                        }
                                      >
                                        {option}
                                        {isSelected && (
                                          <span className="ml-2">
                                            {isCorrect ? "✅" : "❌"}
                                          </span>
                                        )}
                                      </Button>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          ))}{" "}
                    </TabsContent>


                    {/* Video */}
                    <TabsContent value="video" className="aspect-video p-0">
                      {isLoading ? (
                        <div className="h-full w-full animate-pulse bg-gray-200" />
                      ) : course?.videoId ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${course.videoId}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Video for ${course.title}`}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#160B38]">
                          No video available for this course.
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SWRConfig>
  );
}
