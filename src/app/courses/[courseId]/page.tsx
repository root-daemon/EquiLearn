"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showCardBack, setShowCardBack] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState<any>();

  const courseId = React.use(params).courseId;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/${email}/${courseId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000, // 1 hour
    }
  );

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  if (error) return <div>Failed to load</div>;

  const course = data
    ? {
        title: data.subject.name,
        description: data.subject.description,
        lessons: data.subject.topics.map((topic: string) => ({
          title: topic,
          flashcards: data.study_material.flashcards,
          notes: data.study_material.notes,
          quiz: data.study_material.quiz.map((q: any) => ({
            ...q,
            answer: q.correct_answer.charCodeAt(0) - 65,
          })),
        })),
        videoId: data.video_urls[0]?.split("v=")[1] || "",
      }
    : null;

  useEffect(() => {
    console.log(course?.videoId);
  }, [course]);

  const { user } = useUser();

  useEffect(() => {
    const checkUserAndSetEmail = async () => {
      if (user?.emailAddresses[0].emailAddress) {
        const userEmail = user.emailAddresses[0].emailAddress;
        setEmail(userEmail);

        try {
          const response = await axios.get("/api/check-user");
          if (response.status === 200) {
            console.log("User checked:", response.data.user);
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };

    checkUserAndSetEmail();
  }, [user]);

  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isOnline() {
          /* Customize the network state detector */
          return true;
        },
      }}
    >
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
                {isLoading ? (
                  <Skeleton className="h-12 w-64" />
                ) : (
                  course?.title || "Course Title"
                )}
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            <Card className="bg-white border border-[#9F85EE]/20 shadow-lg rounded-xl h-fit">
              <CardHeader className="bg-[#9F85EE] text-white rounded-t-xl">
                <CardTitle>Lessons</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {isLoading
                      ? Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <Skeleton
                              key={index}
                              className="h-10 w-full rounded-md"
                            />
                          ))
                      : course?.lessons.map((lesson, index) => (
                          <Button
                            key={index}
                            variant={
                              selectedLesson === index ? "secondary" : "ghost"
                            }
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
                  <CardTitle>
                    {isLoading ? (
                      <Skeleton className="h-6 w-48" />
                    ) : (
                      course?.lessons[selectedLesson]?.title || "Lesson Title"
                    )}
                  </CardTitle>
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
                                prev > 0
                                  ? prev - 1
                                  : course?.lessons[selectedLesson].flashcards
                                      .length - 1
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
                                {
                                  course?.lessons[selectedLesson].flashcards[
                                    currentCard
                                  ].question
                                }
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
                                {
                                  course?.lessons[selectedLesson].flashcards[
                                    currentCard
                                  ].answer
                                }
                              </p>
                            </CardContent>
                          </Card>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCurrentCard((prev) =>
                                prev <
                                course?.lessons[selectedLesson].flashcards
                                  .length -
                                  1
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
                      )}
                      {!isLoading && (
                        <p className="text-center mt-4 text-sm text-[#160B38]/80">
                          Card {currentCard + 1} of{" "}
                          {course?.lessons[selectedLesson].flashcards.length}
                        </p>
                      )}
                    </TabsContent>
                    <TabsContent value="notes">
                      <div className="prose max-w-none p-6 text-[#160B38]">
                        {isLoading ? (
                          <>
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </>
                        ) : (
                          <ReactMarkdown>
                            {course?.lessons[selectedLesson].notes}
                          </ReactMarkdown>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="quiz" className="p-6">
                      {isLoading
                        ? Array(3)
                            .fill(0)
                            .map((_, index) => (
                              <div key={index} className="space-y-4 mb-8">
                                <Skeleton className="h-6 w-3/4" />
                                <div className="space-y-2">
                                  {Array(4)
                                    .fill(0)
                                    .map((_, optionIndex) => (
                                      <Skeleton
                                        key={optionIndex}
                                        className="h-10 w-full"
                                      />
                                    ))}
                                </div>
                              </div>
                            ))
                        : course?.lessons[selectedLesson].quiz.map(
                            (question, index) => (
                              <div key={index} className="space-y-4 mb-8">
                                <h3 className="font-medium text-lg text-[#160B38]">
                                  {question.question}
                                </h3>
                                <div className="space-y-2">
                                  {question.options.map(
                                    (option, optionIndex) => (
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
                                    )
                                  )}
                                </div>
                              </div>
                            )
                          )}
                    </TabsContent>
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SWRConfig>
  );
}
