import axios from 'axios';

interface GenerateTaskParams {
  subject: string;
  topics: string[];
  task_type: 'content' | 'flashcards' | 'quiz';
}

async function generateTask(params: GenerateTaskParams) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generator/generate-task`, {
            subject: params.subject,
            lesson_name: params.subject,
            topics: params.topics,
            task_type: params.task_type
        });
        return response.data;
    } catch (error) {
        console.error('Error generating task:', error);
        throw error;
    }
}

export { generateTask };

