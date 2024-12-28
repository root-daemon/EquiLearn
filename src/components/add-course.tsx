"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
export function AddCourseModal(email: any) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([""]);

  const router = useRouter();

  const handleAddTopic = () => {
    setTopics([...topics, ""]);
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, topics: topics.filter((topic) => topic !== "") });

    console.log(email.email);
    console.log(title);
    console.log(topics);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/subjects/create`,
      {
        email: email.email,
        subjects: [
          {
            name: title,
            description: "Description",
            topics: topics,
          },
        ],
      }
    );

    console.log(response);

    setOpen(false);
    setTitle("");
    setTopics([""]);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit bg-clr/10 text-clr rounded-full hover:bg-clr/15">
          Add Courses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Enter the course title and a list of topics for the new course.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            {topics.map((topic, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`topic-${index}`} className="text-right">
                  Topic {index + 1}
                </Label>
                <Input
                  id={`topic-${index}`}
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  className="col-span-3"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="ml-auto"
              onClick={handleAddTopic}
            >
              Add Topic
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
