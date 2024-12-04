"use client";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AddCourseModal } from "@/components/add-course";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getRandomBackground = () => {
    const backgrounds = ["/bg1.svg", "/bg2.svg", "/bg3.svg"];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  };

  const getCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/subjects`,
        {
          params: {
            email: email,
          },
        }
      );

      if (response.status === 200) {
        setSubjects(response.data.subjects);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress) {
      const userEmail = user?.emailAddresses[0].emailAddress;
      setEmail(userEmail);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      getCourses();
    }
  }, [email]);

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center p-10">
      {/* heading */}
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex relative justify-start items-center">
          <Search className="absolute left-2 z-10 h-5" />

          <Input
            className="max-w-fit px-6 py-5 pl-9 text-2xl rounded-full"
            placeholder="Search Here"
            spellCheck="false"
            data-ms-editor="true"
          />
        </div>
      </div>
      {/* splash */}
      <div className="bg-[#9F85EE] h-[35vh] p-10 w-full flex flex-col gap-4 justify-end rounded-2xl">
        <h1 className="text-2xl text-white font-bold w-1/2">
          Welcome to UniVision
        </h1>
        <h1 className="text-lg leading-none text-white font-medium w-1/2">
          Need help on using the app? Take a look at this tutorial to get
          started
        </h1>
        <Button className="w-fit bg-white text-black rounded-full hover:bg-white">
          Get Started
        </Button>
      </div>
      {/* my courses */}
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <AddCourseModal email={email} />
      </div>

      <div className="w-full h-full justify-start items-center flex flex-wrap gap-x-6 gap-y-8">
        {isLoading
          ? Array(1)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className=" h-[350px] w-[300px] rounded-xl"
                />
              ))
          : subjects.map((subject, idx) => (
              <CourseCard
                key={idx}
                slug={subject.slug}
                title={subject.name}
                topics={subject.topics}
                email={email}
                image={getRandomBackground()}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;