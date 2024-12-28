import React from "react";
import Link from "next/link";
import { Trash } from "lucide-react";
import axios from "axios";
import { revalidatePath } from "next/cache";

const CourseCard = ({
  slug,
  title,
  topics,
  image,
  email,
}: {
  slug: string;
  title: string;
  topics: string[];
  image: string;
  email: string;
}) => {
  const deleteFunction = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/${email}/${slug}`
      );
      console.log("Course deleted:", response.data);
      window.location.reload(); // Force page reload
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Link href={`/courses/${slug}`} className="block relative">
      <div className="flex flex-col relative justify-start items-start h-[350px] w-[300px] p-5 gap-3 rounded-3xl border bg-white hover:shadow-lg transition-shadow">
        {/* Trash Button */}
        <Trash
          className="absolute top-56 right-4 text-gray-600 hover:text-red-500 cursor-pointer z-10"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation
            e.stopPropagation(); // Stop event propagation
            deleteFunction();
          }}
        />
        {/* Image */}
        <div className="h-[60%] w-full rounded-3xl border">
          <img
            src={image}
            alt=""
            className="rounded-3xl h-full w-full object-cover"
          />
        </div>
        {/* Title */}
        <div className="flex w-full justify-between items-start">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {/* Topics */}
        <div className="flex flex-col gap-0">
          {topics.map((topic, idx) => (
            <p className="text-sm font-light" key={idx}>
              {topic}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
