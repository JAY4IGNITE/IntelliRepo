from app.auth.jwt import create_access_token

token = create_access_token(
    {"sub": "admin@example.com"}
)

print(token)