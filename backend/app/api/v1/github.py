from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
from app.core.oauth_state import create_state, get_email_from_state

from app.core.config import settings
from app.dependencies.db import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/github",
    tags=["GitHub"],
)   


@router.get("/health")
def github_health():
    return {"message": "GitHub module is ready"}


@router.get("/login")
def github_login(
    current_user: User = Depends(get_current_user),
):
    state = create_state(current_user.email)

    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}"
        f"&state={state}"
        "&scope=repo read:user user:email"
    )

    return RedirectResponse(url=github_url)

@router.get("/callback")
async def github_callback(
    code: str,
    state: str,
    db: Session = Depends(get_db),
):  
    email = get_email_from_state(state)

    if email is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid OAuth state"
        )

    current_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if current_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
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
        "redirect_uri": settings.GITHUB_REDIRECT_URI,
        }
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
    if user_response.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail=github_user,
        )

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