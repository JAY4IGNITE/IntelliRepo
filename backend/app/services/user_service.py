from sqlalchemy.orm import Session
from app.auth.password import verify_password
from app.auth.jwt import create_access_token

from app.auth.password import hash_password
from app.models.user import User
from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
)
from app.schemas.user import UserCreate

def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user.hashed_password):
        raise ValueError("Invalid email or password")

    token = create_access_token(
        {"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }

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