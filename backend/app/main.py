from fastapi import FastAPI
from app.api.v1.repositories import router as repository_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.github import router as github_router

app = FastAPI(
    title="IntelliRepo API",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(github_router)
app.include_router(repository_router)


@app.get("/")
def root():
    return {"message": "Welcome to IntelliRepo API"}
