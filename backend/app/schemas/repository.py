from pydantic import BaseModel, ConfigDict
from typing import Optional


class RepositoryResponse(BaseModel):
    id: int
    github_repo_id: int
    name: str
    full_name: str
    description: Optional[str] = None
    language: Optional[str] = None
    default_branch: str
    html_url: str
    owner_id: int

    model_config = ConfigDict(from_attributes=True)