from pydantic import BaseModel, ConfigDict


class RepositoryResponse(BaseModel):
    id: int
    name: str
    full_name: str
    description: str | None = None
    language: str | None = None
    stars: int
    forks: int
    open_issues: int
    default_branch: str | None = None
    html_url: str

    model_config = ConfigDict(from_attributes=True)


class DashboardStats(BaseModel):
    total_repos: int
    total_stars: int
    total_forks: int
    total_issues: int
    languages: dict[str, int]
