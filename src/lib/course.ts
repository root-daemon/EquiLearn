import { Course } from '@/types/Course';
import axios from 'axios';



async function generateTask(params: Course) {
    try {
        const response = await axios.post('/generator/generate-task', {
            subject: params.subject,
            lesson_name: params.lessons,
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

