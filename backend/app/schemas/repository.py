from pydantic import BaseModel, ConfigDict


class RepositoryResponse(BaseModel):
    github_repo_id: int
    name: str
    full_name: str
    description: str | None = None
    language: str | None = None
    default_branch: str
    html_url: str

    model_config = ConfigDict(from_attributes=True)