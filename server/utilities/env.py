from dotenv import load_dotenv
import os


class Env:
    def __init__(self):
        load_dotenv()
        self.DB_URI = os.getenv("DB_URI")
        self.DB_NAME = os.getenv("DB_NAME")
        self.YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
        self.YOUTUBE_BASE_URL = os.getenv("YOUTUBE_BASE_URL")
        self.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
