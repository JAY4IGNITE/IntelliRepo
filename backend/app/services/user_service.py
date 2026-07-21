from sqlalchemy.orm import Session

from app.auth.password import hash_password
from app.models.user import User
from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
)
from app.schemas.user import UserCreate


def register_user(db: Session, user: UserCreate):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise ValueError("Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    return create_user(db, new_user)