import { useState, useEffect } from 'react';
import { generateTask } from './course';
import { Course, Flashcard, QuizQuestion } from '@/types/Course';

export function useCourseState(courseData: Course) {
  const [notes, setNotes] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
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
          // Parse notes (markdown content)
          setNotes(notesData.result.content.raw);

          // Parse flashcards
          const flashcardsContent = JSON.parse(flashcardsData.result.flashcards.raw);
          setFlashcards(flashcardsContent);

          // Parse quiz
          const quizContent = JSON.parse(quizData.result.quiz.raw);
          setQuiz(quizContent);
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
    notes,
    flashcards,
    quiz,
    isLoading
  };
}

