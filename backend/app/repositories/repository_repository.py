from sqlalchemy.orm import Session

from app.models.repository import Repository


def get_all(db: Session):
    return db.query(Repository).all()


def get_by_id(db: Session, repo_id: int):
    return db.query(Repository).filter(Repository.id == repo_id).first()


def get_by_github_repo_id(db: Session, github_repo_id: int):
    return (
        db.query(Repository)
        .filter(Repository.github_repo_id == github_repo_id)
        .first()
    )


def create(db: Session, repository: Repository):
    db.add(repository)
    db.commit()
    db.refresh(repository)
    return repository


def delete(db: Session, repository: Repository):
    db.delete(repository)
    db.commit() 

