from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/test")
def test():
    return {"message": "Authentication API is working"}