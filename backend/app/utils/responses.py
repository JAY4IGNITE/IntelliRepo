from typing import Any, Optional
from fastapi.responses import JSONResponse


def error_response(
    message: str,
    code: str = "ERROR",
    status_code: int = 400,
    details: Optional[Any] = None,
) -> JSONResponse:
    """Format and return a standardized JSON error response."""
    content: dict[str, Any] = {
        "success": False,
        "error": {
            "code": code,
            "message": message,
        },
    }
    if details is not None:
        content["error"]["details"] = details

    return JSONResponse(status_code=status_code, content=content)


def success_response(
    data: Optional[Any] = None,
    message: str = "Success",
    status_code: int = 200,
) -> JSONResponse:
    """Format and return a standardized JSON success response."""
    content: dict[str, Any] = {
        "success": True,
        "message": message,
    }
    if data is not None:
        content["data"] = data

    return JSONResponse(status_code=status_code, content=content)
