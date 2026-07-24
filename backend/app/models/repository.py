from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    github_repo_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    language = Column(String, nullable=True)

    stars = Column(Integer, default=0)
    forks = Column(Integer, default=0)
    open_issues = Column(Integer, default=0)

    default_branch = Column(String)
    html_url = Column(String)

    user = relationship("User")