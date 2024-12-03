import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { checkUser } from "@/lib/checkUser";

const Home = async () => {
  const userId = auth();
  const user = await checkUser();

  const getRandomBackground = () => {
    const backgrounds = ["/bg1.svg", "/bg2.svg", "/bg3.svg"];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  };

  const courses = [
    {
      id: "operating-systems",
      title: "Operating Systems",
      topics: ["Mutex", "Semaphores", "Deadlocks"],
    },
    {
      id: "data-structures",
      title: "Data Structures & Algos",
      topics: ["Prim's Algo", "Kruskal's Algo", "Djikstra's Algo"],
    },
    {
      id: "computer-organisation",
      title: "Computer Organisation",
      topics: ["ARM", "Bus Architecture", "Memory"],
    },
  ];

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
        <Button className="w-fit bg-[#F2EFFD] text-[#9F85EE] rounded-full hover:bg-[#F2EFFD]">
          Add Courses
        </Button>
      </div>

      <div className="w-full h-full justify-start items-center flex flex-wrap gap-x-6 gap-y-8">
        {courses.map((course, idx) => (
          <CourseCard
            key={idx}
            id={course.id}
            title={course.title}
            topics={course.topics}
            image={getRandomBackground()}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
