from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.models.repository import Repository
from app.schemas.repository import RepositoryResponse, DashboardStats
from app.services.repository_service import sync_repositories, get_user_repositories

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


@router.get("/health")
def health():
    return {"message": "Repository module working"}


@router.get("", response_model=list[RepositoryResponse])
def list_repositories(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_repositories(db, current_user.id)


@router.get("/stats", response_model=DashboardStats)
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    repos = get_user_repositories(db, current_user.id)

    languages: dict[str, int] = {}
    for repo in repos:
        if repo.language:
            languages[repo.language] = languages.get(repo.language, 0) + 1

    return DashboardStats(
        total_repos=len(repos),
        total_stars=sum(r.stars for r in repos),
        total_forks=sum(r.forks for r in repos),
        total_issues=sum(r.open_issues for r in repos),
        languages=languages,
    )


@router.post("/sync")
async def sync(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not current_user.github_access_token:
        raise HTTPException(
            status_code=400,
            detail="GitHub account not connected. Please link your GitHub account first.",
        )
    return await sync_repositories(current_user, db)
