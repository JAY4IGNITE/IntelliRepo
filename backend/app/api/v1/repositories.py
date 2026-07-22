from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

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
def get_repository(repo_id: int, db: Session = Depends(get_db)):
    repository = repository_service.get_repository(db, repo_id)

    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found",
        )

    return repository