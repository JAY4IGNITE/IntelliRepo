import httpx
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.repository import Repository


GITHUB_API = "https://api.github.com/user/repos"


def get_user_repositories(db: Session, user_id: int):
    return (
        db.query(Repository)
        .filter(Repository.user_id == user_id)
        .order_by(Repository.stars.desc())
        .all()
    )


async def sync_repositories(current_user: User, db: Session):
    headers = {
        "Authorization": f"Bearer {current_user.github_access_token}",
        "Accept": "application/vnd.github+json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            GITHUB_API,
            headers=headers,
            params={"per_page": 100, "sort": "updated"},
        )

    if response.status_code != 200:
        return {"error": response.json()}

    repositories = response.json()
    synced = []
    updated = []

    for repo in repositories:
        existing = (
            db.query(Repository)
            .filter(Repository.github_repo_id == str(repo["id"]))
            .first()
        )

        if existing:
            existing.name = repo["name"]
            existing.full_name = repo["full_name"]
            existing.description = repo["description"]
            existing.language = repo["language"]
            existing.stars = repo["stargazers_count"]
            existing.forks = repo["forks_count"]
            existing.open_issues = repo["open_issues_count"]
            existing.default_branch = repo["default_branch"]
            existing.html_url = repo["html_url"]
            updated.append(repo["name"])
            continue

        new_repo = Repository(
            user_id=current_user.id,
            github_repo_id=str(repo["id"]),
            name=repo["name"],
            full_name=repo["full_name"],
            description=repo["description"],
            language=repo["language"],
            stars=repo["stargazers_count"],
            forks=repo["forks_count"],
            open_issues=repo["open_issues_count"],
            default_branch=repo["default_branch"],
            html_url=repo["html_url"],
        )
        db.add(new_repo)
        synced.append(repo["name"])

    db.commit()

    return {
        "message": "Repositories synced successfully",
        "synced": synced,
        "updated": updated,
        "total": len(synced) + len(updated),
    }
