export interface Course {
  name: string;
  description: string;
  topics: string[];
  videoId?: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface CourseContent {
  notes: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}