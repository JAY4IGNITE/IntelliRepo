from app.auth.password import hash_password, verify_password
from app.auth.jwt import create_access_token, SECRET_KEY, ALGORITHM
from jose import jwt


def test_password_hashing_and_verification():
    """Verify that bcrypt hashes passwords securely and verifies correctly."""
    plain = "SuperSecretPassword123"
    hashed = hash_password(plain)

    assert hashed != plain
    assert verify_password(plain, hashed) is True
    assert verify_password("WrongPassword", hashed) is False


def test_create_and_decode_jwt():
    """Verify that JWT creation encodes user subject and decodes properly."""
    data = {"sub": "developer@example.com", "user_id": 42}
    token = create_access_token(data)

    assert isinstance(token, str)
    decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    assert decoded["sub"] == "developer@example.com"
    assert decoded["user_id"] == 42
    assert "exp" in decoded
