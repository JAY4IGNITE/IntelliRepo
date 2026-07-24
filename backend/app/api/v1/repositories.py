from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.services.repository_service import sync_repositories

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


@router.get("/health")
def health():
    return {
        "message": "Repository module working"
    }


@router.post("/sync")
async def sync(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return await sync_repositories(current_user, db)