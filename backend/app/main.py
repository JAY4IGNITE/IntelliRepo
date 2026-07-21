from fastapi import FastAPI
from app.api.v1.auth import router as auth_router

app = FastAPI(
    title="IntelliRepo API",
    version="1.0.0"
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to IntelliRepo API"
    }