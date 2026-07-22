from sqlalchemy import Column, Integer, String

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    github_id = Column(String(100), unique=True, nullable=True)
    github_username = Column(String(255), nullable=True)
    github_access_token = Column(String(500), nullable=True)
    github_avatar_url = Column(String(500), nullable=True)