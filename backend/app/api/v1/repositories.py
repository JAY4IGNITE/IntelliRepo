from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.dependencies.db import get_db
from app.schemas.repository import RepositoryResponse
from app.services import repository_service

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


@router.get("/", response_model=list[RepositoryResponse])
def get_repositories(db: Session = Depends(get_db)):
    return repository_service.list_repositories(db)


@router.get("/{repo_id}", response_model=RepositoryResponse)
def get_repository(
    repo_id: int,
    db: Session = Depends(get_db)
):
    repository = repository_service.get_repository(db, repo_id)

    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )

    return repository



@router.post("/sync", response_model=list[RepositoryResponse])
async def sync_repositories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await repository_service.sync_repositories(
        db,
        current_user,
    )