from pydantic import BaseModel
from typing import List


class SubjectItem(BaseModel):
    name: str
    description: str
    topics: List[str]


class UserSubjects(BaseModel):
    email: str
    subjects: List[SubjectItem]
