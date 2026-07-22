from sqlalchemy.orm import Session

from app.models.repository import Repository
import app.repositories.repository_repository as repository_repository


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