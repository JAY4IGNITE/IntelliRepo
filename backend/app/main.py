from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.repositories import router as repository_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.github import router as github_router
from app.core.config import settings

app = FastAPI(
    title="IntelliRepo API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(github_router)
app.include_router(repository_router)


@app.get("/")
def root():
    return {"message": "Welcome to IntelliRepo API"}
