from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from utilities.database import Database
from schemas.schema import UserSubjects
from slugify import slugify
from utilities.slugify import generate_unique_slug, subject_exists
from routes.subjects.card import StudyMaterialGenerator
from googleapiclient.discovery import build
from utilities.env import Env

db = Database()
subjects_router = APIRouter()
env = Env()


@subjects_router.post("/create")
async def create_subject(subject: UserSubjects):
    user = db.User.find_one({"email": subject.email})
    if not user:
        return JSONResponse(status_code=404, content={"message": "User not found"})
    existing_subjects = {sub.get("name").lower() for sub in user.get("subjects", [])}
    existing_slugs = {sub.get("slug") for sub in user.get("subjects", [])}
    for sub in subject.subjects:
        if subject_exists(sub.name, existing_subjects):
            return JSONResponse(
                status_code=409,
                content={"message": f"Subject already exists."},
            )
        base_slug = slugify(sub.name)
        unique_slug = generate_unique_slug(base_slug, existing_slugs)
        new_subject = {
            "name": sub.name,
            "description": sub.description,
            "topics": sub.topics,
            "slug": unique_slug,
        }
        db.User.update_one(
            {"email": subject.email}, {"$push": {"subjects": new_subject}}
        )
    return JSONResponse(
        status_code=201, content={"message": "Subjects added successfully"}
    )


@subjects_router.get("/{email}/{slug}")
async def get_subject_and_videos_and_generate_study_material(email: str, slug: str):
    user = db.User.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    subjects = user.get("subjects", [])
    subject = None
    for sub in subjects:
        if sub["slug"] == slug:
            subject = sub
            break

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    query = subject.get("name", "")

    api_key = env.GEMINI_API_KEY
    if not api_key:
        raise HTTPException(status_code=400, detail="Gemini API key is required")

    generator = StudyMaterialGenerator(api_key=api_key)
    if query:
        text = query
    else:
        raise HTTPException(status_code=400, detail="Context must be provided")

    study_material_result = generator.process_large_text(text)

    youtube = build("youtube", "v3", developerKey=env.YOUTUBE_API_KEY)
    video_urls = []

    try:
        response = (
            youtube.search()
            .list(q=query, type="video", maxResults=10, part="id,snippet")
            .execute()
        )
        for item in response.get("items", []):
            video_id = item["id"]["videoId"]
            video_url = f"{env.YOUTUBE_BASE_URL}{video_id}"
            video_urls.append(video_url)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching YouTube videos: {str(e)}"
        )

    return JSONResponse(
        status_code=200,
        content={
            "message": "Subject, study material, and YouTube videos fetched successfully",
            "subject": subject,
            "study_material": study_material_result,
            "video_urls": video_urls,
        },
    )


@subjects_router.delete("/{email}/{slug}")
async def delete_subject(email: str, slug: str):
    user = db.User.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for sub in user.get("subjects", []):
        if sub["slug"] == slug:
            db.User.update_one(
                {"email": email}, {"$pull": {"subjects": {"slug": slug}}}
            )
            return JSONResponse(
                status_code=200, content={"message": "Subject deleted successfully"}
            )
    raise HTTPException(status_code=404, detail="Subject not found")


@subjects_router.get("/subjects")
async def get_subjects(email: str):
    user = db.User.find_one({"email": email})
    if not user:
        return JSONResponse(status_code=404, content={"message": "User not found"})
    subject = user.get("subjects", [])
    return JSONResponse({"message": "Subjects Fetched", "subjects": subject})
