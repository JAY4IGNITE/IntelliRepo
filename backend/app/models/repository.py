from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.base import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)

    github_repo_id = Column(Integer, unique=True, nullable=False)

    name = Column(String(255), nullable=False)

    full_name = Column(String(255), nullable=False)

    description = Column(String(500), nullable=True)

    language = Column(String(100), nullable=True)

    default_branch = Column(String(100), nullable=False)

    html_url = Column(String(500), nullable=False)

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )