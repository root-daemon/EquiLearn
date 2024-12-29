from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.youtube.youtube import yt_router
from routes.subjects.subjects import subjects_router
from routes.subjects.cards import cards_router
from routes.generator import generator_router 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(yt_router, prefix="/videos")
app.include_router(subjects_router, prefix="/subjects")
app.include_router(cards_router, prefix="/cards")
app.include_router(generator_router, prefix="/generator")


@app.get("/")
async def healthcheck():
    return JSONResponse(
        status_code=200, content={"message": "All Modules loaded Successfully"}
    )
