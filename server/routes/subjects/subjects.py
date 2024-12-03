from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from utilities.database import Database
from schemas.schema import UserSubjects
from slugify import slugify
from utilities.slugify import generate_unique_slug, subject_exists

db = Database()
subjects_router = APIRouter()


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
async def get_subject(email: str, slug: str):
    user = db.User.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for sub in user.get("subjects", []):
        if sub["slug"] == slug:
            return JSONResponse(
                status_code=200,
                content={"message": "Subject found", "subject": sub},
            )
    raise HTTPException(status_code=404, detail="Subject not found")


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

@subjects_router.get('/subjects')
async def get_subjects(email: str):
    user = db.User.find_one({"email":email})
    if not user:
        return JSONResponse(status_code=404, content={"message": "User not found"})
    subject = user.get("subjects", [])
    return JSONResponse({"message": "Subjects Fetched","subjects": subject})