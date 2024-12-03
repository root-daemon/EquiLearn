import React from "react";
import Link from "next/link";

const CourseCard = ({
  id,
  title,
  topics,
  image,
}: {
  id: string;
  title: string;
  topics: string[];
  image: string;
}) => {
  return (
    <Link href={`/courses/${id}`} className="block">
      <div className="flex flex-col justify-start items-start h-[350px] w-[300px] p-5 gap-3 rounded-3xl border bg-white hover:shadow-lg transition-shadow">
        <div className="h-[60%] w-full rounded-3xl border">
          <img
            src={image}
            alt=""
            className="rounded-3xl h-full w-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold">{title}</h1>
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
