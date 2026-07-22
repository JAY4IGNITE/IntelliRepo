import httpx

GITHUB_API = "https://api.github.com"


async def get_github_user(access_token: str):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github+json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{GITHUB_API}/user", headers=headers)
        response.raise_for_status()
        return response.json()


async def get_user_repositories(access_token: str):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github+json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{GITHUB_API}/user/repos",
            headers=headers,
            params={"sort": "updated", "per_page": 100},
        )
        response.raise_for_status()
        return response.json()