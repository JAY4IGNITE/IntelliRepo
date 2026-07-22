from sqlalchemy.orm import Session

from app.models.repository import Repository
import app.repositories.repository_repository as repository_repository
from app.services import github_service



def list_repositories(db: Session):
    """
    Return all repositories.
    """
    return repository_repository.get_all(db)


def get_repository(db: Session, repo_id: int):
    """
    Return a repository by ID.
    """
    return repository_repository.get_by_id(db, repo_id)


def create_repository(db: Session, repository: Repository):
    """ 
    Create a new repository.
    """
    return repository_repository.create(db, repository)


def delete_repository(db: Session, repo_id: int):
    """
    Delete a repository.
    """
    repository = repository_repository.get_by_id(db, repo_id)

    if repository is None:
        return None

    repository_repository.delete(db, repository)

    return repository



async def sync_repositories(db, current_user):
    repos = await github_service.get_user_repositories(
        current_user.github_access_token
    )

    synced = []

    for repo in repos:

        existing = repository_repository.get_by_github_repo_id(
            db,
            repo["id"],
        )

        if existing:
            synced.append(existing)
            continue

        new_repo = Repository(
            github_repo_id=repo["id"],
            name=repo["name"],
            full_name=repo["full_name"],
            description=repo["description"],
            language=repo["language"],
            default_branch=repo["default_branch"],
            html_url=repo["html_url"],
            owner_id=current_user.id,
        )

        synced.append(
            repository_repository.create(db, new_repo)
        )

    return synced