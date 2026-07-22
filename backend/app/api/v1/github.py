from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import httpx

from app.core.config import settings

router = APIRouter(
    prefix="/github",
    tags=["GitHub"],
)


@router.get("/health")
def github_health():
    return {"message": "GitHub module is ready"}


@router.get("/login")
def github_login():
    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        "&scope=repo read:user user:email"
    )

    return RedirectResponse(github_url)


@router.get("/callback")
async def github_callback(code: str):
    token_url = "https://github.com/login/oauth/access_token"

    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            token_url,
            headers={
                "Accept": "application/json"
            },
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            },
        )

    token_data = token_response.json()

    if "access_token" not in token_data:
        raise HTTPException(
            status_code=400,
            detail=token_data,
        )

    access_token = token_data["access_token"]

    async with httpx.AsyncClient() as client:
        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github+json",
            },
        )

    github_user = user_response.json()

    return {
        "access_token": access_token,
        "github_user": github_user,
    }