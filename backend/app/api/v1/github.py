from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx

from app.core.config import settings
from app.dependencies.db import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.services import github_service

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
async def github_callback(
    code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
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

    current_user.github_id = str(github_user["id"])
    current_user.github_username = github_user["login"]
    current_user.github_avatar_url = github_user["avatar_url"]
    current_user.github_access_token = access_token

    db.commit()
    db.refresh(current_user)

    return {
        "message": "GitHub account linked successfully",
        "github_username": current_user.github_username,
    }