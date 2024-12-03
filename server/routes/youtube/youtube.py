from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from googleapiclient.discovery import build
from utilities.env import Env

yt_router = APIRouter()
env = Env()


def search(youtube, **kwargs):
    return youtube.search().list(part="snippet", **kwargs).execute()


@yt_router.get("/youtube-videos")
async def get_youtube_videos(query: str = Query(...)):
    youtube = build("youtube", "v3", developerKey=env.YOUTUBE_API_KEY)
    video_urls = []

    try:
        response = search(youtube, q=query, type="video", maxResults=10)

        for item in response.get("items", []):
            video_id = item["id"]["videoId"]
            video_url = f"{env.YOUTUBE_BASE_URL}={video_id}"
            video_urls.append(video_url)

        return JSONResponse(content={"video_urls": video_urls})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
