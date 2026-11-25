import time
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.dependencies.db import get_db
from app.core.config import settings

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("", summary="Service liveness probe")
@router.get("/", summary="Service liveness probe", include_in_schema=False)
def check_health():
    """
    Liveness probe: checks whether the FastAPI application process is alive.
    """
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }


@router.get("/ready", summary="Database readiness probe")
@router.get("/db", summary="Database connectivity check", include_in_schema=False)
def check_readiness(db: Session = Depends(get_db)):
    """
    Readiness probe: verifies PostgreSQL database connectivity and measures round-trip latency.
    """
    start_time = time.perf_counter()
    try:
        db.execute(text("SELECT 1"))
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return {
            "status": "ready",
            "database": "connected",
            "latency_ms": latency_ms,
        }
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "unhealthy",
                "database": "disconnected",
                "error": str(exc),
            },
        )
