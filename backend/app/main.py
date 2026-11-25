from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

from app.api.v1.repositories import router as repository_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.github import router as github_router
from app.api.v1.health import router as health_router
from app.core.config import settings
from app.utils.exceptions import APIException
from app.utils.responses import error_response

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


@app.exception_handler(APIException)
async def api_exception_handler(request: Request, exc: APIException):
    return error_response(
        message=exc.message,
        code=exc.code,
        status_code=exc.status_code,
        details=exc.details,
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [
        {
            "field": ".".join(str(loc) for loc in err.get("loc", [])),
            "message": err.get("msg", "Invalid value"),
            "type": err.get("type", "value_error"),
        }
        for err in exc.errors()
    ]
    return error_response(
        message="Request payload validation failed",
        code="VALIDATION_ERROR",
        status_code=422,
        details=errors,
    )


@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return error_response(
        message="A database operation error occurred",
        code="DATABASE_ERROR",
        status_code=500,
    )


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(github_router)
app.include_router(repository_router)
app.include_router(health_router)


@app.get("/")
def root():
    return {"message": "Welcome to IntelliRepo API"}
