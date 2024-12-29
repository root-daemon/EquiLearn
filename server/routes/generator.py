# routes/generator.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
import json
from dotenv import load_dotenv
from crewai import Agent, Task, Process, LLM, Crew

# Load environment variables
load_dotenv()

# Check for GROQ_API_KEY
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise Exception("GROQ_API_KEY environment variable is not set")


# -------------------
# LLM Initialization
# -------------------
groq_llm = LLM(
    model="groq/llama3-70b-8192",
    temperature=0.7,
    max_tokens=1500
)


# -------------------
# Pydantic Models
# -------------------
class StudyMaterialRequest(BaseModel):
    subject: str
    lesson_name: str
    topics: List[str]

class TaskRequest(StudyMaterialRequest):
    task_type: str  # 'content', 'flashcards', or 'quiz'

class TaskResponse(BaseModel):
    task_type: str
    result: Dict


# -------------------
# Generator Logic
# -------------------
class StudyMaterialGenerator:
    def __init__(self, subject: str, lesson_name: str, topics: List[str]):
        self.subject = subject
        self.lesson_name = lesson_name
        self.topics = topics

    def create_content_agent(self):
        return Agent(
            role='Content Creator',
            goal='Create comprehensive and engaging lesson content in markdown format',
            backstory="""You are an expert educational content creator...""",
            tools=[],
            llm=groq_llm,
            verbose=True
        )

    def create_flashcard_agent(self):
        return Agent(
            role='Flashcard Creator',
            goal='Create effective flashcards for memorization and quick review',
            backstory="""You are a specialist in creating memorable...""",
            tools=[],
            llm=groq_llm,
            verbose=True
        )

    def create_quiz_agent(self):
        return Agent(
            role='Quiz Creator',
            goal='Create challenging but fair multiple choice quizzes',
            backstory="""You are an experienced assessment designer...""",
            tools=[],
            llm=groq_llm,
            verbose=True
        )

    def create_content_task(self):
        return Task(
            description=f"""Create a moderately detailed lesson on {self.lesson_name} ...""",
            agent=self.create_content_agent(),
            expected_output="Markdown formatted lesson content with sections for each topic"
        )

    def create_flashcards_task(self):
        return Task(
            description=(
                f"Create 5 flashcards for {self.lesson_name} as a JSON array of objects. "
                "Each object should have the following two fields: 'question' and 'answer'.\n\n"
                "Example of the *entire output* you should provide (no extra keys or text):\n"
                "[\n"
                "  {\n"
                "    \"question\": \"What is an Operating System?\",\n"
                "    \"answer\": \"A software that manages computer hardware and software resources...\"\n"
                "  },\n"
                "  {\n"
                "    \"question\": \"Second question?\",\n"
                "    \"answer\": \"Second answer\"\n"
                "  }\n"
                "]\n\n"
                "Return only valid JSON in this array format. also dont use formatting and make this as a json format, Do not add the json thing, no new lines just a raw json as ill send it directly to the api. do not send me a markdown and should be an array of the objects strictly! FOLLOW THE JSON FORMAT STRICTLY!"
            ),
            agent=self.create_flashcard_agent(),
            expected_output="JSON array of flashcard objects with 'question' and 'answer' keys"
        )

    def create_quiz_task(self):
        return Task(
            description=(
                f"Create a multiple choice quiz for {self.lesson_name} as a JSON array of objects.\n\n"
                "Each quiz question should have:\n"
                "  1. \"question\": A string containing the question.\n"
                "  2. \"options\": An array of exactly 4 strings labeled A), B), C), D).\n"
                "  3. \"correct_answer\": A single letter (A, B, C, or D) that indicates the correct option.\n\n"
                "Return only valid JSON, in this array format.\n\n"
                "Example (replace with your own questions):\n"
                "[\n"
                "  {\n"
                "    \"question\": \"What is an operating system?\",\n"
                "    \"options\": [\n"
                "      \"A) A program that manages computer hardware and software resources\",\n"
                "      \"B) A collection of application software\",\n"
                "      \"C) A type of programming language\",\n"
                "      \"D) A network of computers\"\n"
                "    ],\n"
                "    \"correct_answer\": \"A\"\n"
                "  }\n"
                "]"
            ),
            agent=self.create_quiz_agent(),
            expected_output="Return only valid JSON in this array format. also dont use formatting and make this as a json format, Do not add the json thing, no new lines just a raw json as ill send it directly to the api. do not send me a markdown and should be an array of the objects strictly! FOLLOW THE JSON FORMAT STRICTLY!"
        )


    async def execute_task(self, task_type: str) -> Dict:
        try:
            if task_type == 'content':
                task = self.create_content_task()
            elif task_type == 'flashcards':
                task = self.create_flashcards_task()
            elif task_type == 'quiz':
                task = self.create_quiz_task()
            else:
                raise ValueError(f"Invalid task type: {task_type}")

            crew = Crew(
                agents=[task.agent],
                tasks=[task],
                process=Process.sequential,
                verbose=True
            )

            result = crew.kickoff()

            if task_type == 'content':
                return {'content': result}
            elif task_type == 'flashcards':
                return {'flashcards': result}
            else:  # quiz
                return {'quiz': result}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


# -------------------
# APIRouter Setup
# -------------------
generator_router = APIRouter()

@generator_router.post("/generate-task", response_model=TaskResponse)
async def generate_single_task(request: TaskRequest):
    """
    Generate a single component of study materials (content, flashcards, or quiz)
    """
    generator = StudyMaterialGenerator(
        subject=request.subject,
        lesson_name=request.lesson_name,
        topics=request.topics
    )

    try:
        result = await generator.execute_task(request.task_type)
        return TaskResponse(task_type=request.task_type, result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
