
interface GenerateTaskParams {
  subject: string;
  topics: string[];
  task_type: 'content' | 'flashcards' | 'quiz';
}

async function generateTask(params: GenerateTaskParams) {
    try {
        const response = await fetch(`/api/generator/generate-task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: params.subject,
                lesson_name: params.subject,
                topics: params.topics,
                task_type: params.task_type
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating task:', error);
        throw error;
    }
}

export { generateTask };

