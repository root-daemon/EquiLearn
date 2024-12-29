import { useState, useEffect } from 'react';
import { generateTask } from './course';
import { Course } from '@/types/Course';

export function useCourseState(courseData: Course) {
  const [notes, setNotes] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<any[] | null>(null);
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchCourseContent() {
      if (!courseData) return;

      setIsLoading(true);
      try {
        const [notesData, flashcardsData, quizData] = await Promise.all([
          generateTask({
            subject: courseData.name,
            topics: courseData.topics,
            task_type: 'content'
          }),
          generateTask({
            subject: courseData.name,
            topics: courseData.topics,
            task_type: 'flashcards'
          }),
          generateTask({
            subject: courseData.name,
            topics: courseData.topics,
            task_type: 'quiz'
          })
        ]);

        if (mounted) {
          setNotes(notesData.content);
          setFlashcards(flashcardsData.content);
          setQuiz(quizData.content);
        }
      } catch (error) {
        console.error('Error fetching course content:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCourseContent();

    return () => {
      mounted = false;
    };
  }, [courseData]);

  return { 
    notes: notes ?? '',
    flashcards: flashcards ?? [],
    quiz: quiz ?? [],
    isLoading 
  };
}

