from pydantic import BaseModel


class RepositoryResponse(BaseModel):
    id: int
    name: str
    full_name: str
    description: str | None = None
    language: str | None = None
    stars: int
    forks: int
    open_issues: int
    html_url: str

    class Config:
        from_attributes = True