"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SWRConfig } from "swr";
import { useCourseState } from "@/lib/courseState";

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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/${email}/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
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
      <div className="min-h-screen w-full bg-white text-[#160B38] p-6">
        <div className="space-y-8">
          <div className="flex justify-between items-center m-12">
            <div>
              <Link href="/" className="text-clr hover:underline mb-2 inline-block">
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

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar with lessons */}
            <div className="bg-white p-4 border-r border-clr/20 h-fit">
              <h2 className="m-3 text-2xl font-bold">Lessons</h2>
              <div className="p-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton key={index} className="h-10 w-full rounded-md" />
                        ))
                      : course?.lessons?.map((lesson: any, index: number) => (
                          <Button
                            key={index}
                            variant={selectedLesson === index ? "secondary" : "ghost"}
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
              <div className="overflow-hidden bg-white border-0 border-clr/20">
                <CardContent className="p-0 rounded-none">
                  <Tabs defaultValue="flashcards" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none border-clr/20 bg-transparent px-4">
                      <TabsTrigger
                        value="flashcards"
                        className="data-[state=active]:bg-clr data-[state=active]:text-white text-[#160B38]"
                      >
                        Flashcards
                      </TabsTrigger>
                      <TabsTrigger
                        value="notes"
                        className="data-[state=active]:bg-clr data-[state=active]:text-white text-[#160B38]"
                      >
                        Notes
                      </TabsTrigger>
                      <TabsTrigger
                        value="quiz"
                        className="data-[state=active]:bg-clr data-[state=active]:text-white text-[#160B38]"
                      >
                        Quiz
                      </TabsTrigger>
                      <TabsTrigger
                        value="video"
                        className="data-[state=active]:bg-clr data-[state=active]:text-white text-[#160B38]"
                      >
                        Video
                      </TabsTrigger>
                    </TabsList>

                    {/* Flashcards */}
                    <TabsContent value="flashcards" className="p-6">
                      {isLoading ? (
                        <div className="flex items-center justify-between space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Card className="flex-1 min-h-[300px]">
                            <CardContent className="flex items-center justify-center h-full">
                              <Skeleton className="h-24 w-3/4" />
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
                                prev > 0 ? prev - 1 : flashcards.length - 1
                              );
                              setShowCardBack(false);
                            }}
                            aria-label="Previous flashcard"
                            className="bg-white text-[#160B38] border-clr hover:bg-clr hover:text-white"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>

                          {/* Only render the current card, or handle as a carousel */}
                          {flashcards.length > 0 && (
                            <Card
                              key={currentCard}
                              className="flex-1 cursor-pointer min-h-[300px] transition-all duration-500 ease-in-out transform perspective-1000 relative bg-white border border-clr/20"
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
                                  {flashcards[currentCard].question}
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
                                prev < flashcards.length - 1 ? prev + 1 : 0
                              );
                              setShowCardBack(false);
                            }}
                            aria-label="Next flashcard"
                            className="bg-white text-[#160B38] border-clr hover:bg-clr hover:text-white"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {!isLoading && flashcards.length > 0 && (
                        <p className="text-center mt-4 text-sm text-[#160B38]/80">
                          Card {currentCard + 1} of {flashcards.length}
                        </p>
                      )}
                    </TabsContent>

                    {/* Notes */}
                    <TabsContent value="notes">
                      <div className="prose p-6 px-32 w-full text-[#160B38]">
                        {isLoading ? (
                          <>
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="text-5xl font-extrabold mb-2 border-b border-gray-500"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 className="text-3xl font-bold mb-1" {...props} />
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 className="text-2xl font-bold" {...props} />
                              ),
                              p: ({ node, ...props }) => (
                                <p className="mb-4 ml-1" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside ml-2 pl-2" {...props} />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol className="list-decimal list-inside ml-2 pl-2" {...props} />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote
                                  className="border-l-4 border-gray-300 pl-4 italic"
                                  {...props}
                                />
                              ),
                              code: ({ node, ...props }) => (
                                <code className="bg-gray-100 p-1 rounded" {...props} />
                              ),
                            }}
                          >
                            {notes}
                          </ReactMarkdown>
                        )}
                      </div>
                    </TabsContent>

                    {/* Quiz */}
                    <TabsContent value="quiz" className="p-6">
                      {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-4 mb-8">
                              <Skeleton className="h-6 w-3/4" />
                              <div className="space-y-2">
                                {Array.from({ length: 4 }).map((_, optionIndex) => (
                                  <Skeleton
                                    key={optionIndex}
                                    className="h-10 w-full"
                                  />
                                ))}
                              </div>
                            </div>
                          ))
                        : quiz.map((question: any, index: number) => (
                            <div key={index} className="space-y-4 mb-8">
                              <h3 className="font-medium text-lg font-semibold text-[#160B38]">
                                {question.question}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map((option: string, optionIndex: number) => {
                                  const isSelected = quizAnswers[index] === optionIndex;
                                  const isCorrect = optionIndex === question.correctAnswer;

                                  return (
                                    <Button
                                      key={optionIndex}
                                      variant="outline"
                                      className={`w-full justify-start items-center transition-all duration-300 ease-in-out ${
                                        isSelected
                                          ? isCorrect
                                            ? "bg-green-100 text-green-800 border-green-500"
                                            : "bg-red-100 text-red-800 border-red-500"
                                          : "hover:bg-clr/10 text-[#160B38] border-clr/20"
                                      }`}
                                      onClick={() => handleQuizAnswer(index, optionIndex)}
                                    >
                                      {option}
                                      {isSelected && (
                                        <span className="ml-2">
                                          {isCorrect ? "✅" : "❌"}
                                        </span>
                                      )}
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                    </TabsContent>

                    {/* Video */}
                    <TabsContent value="video" className="aspect-video p-0">
                      {isLoading ? (
                        <div className="w-full h-full bg-gray-200 animate-pulse" />
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
                        <div className="flex items-center justify-center h-full text-[#160B38]">
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
