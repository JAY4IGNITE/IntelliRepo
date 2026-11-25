def test_register_user_success(client):
    """Test successful user registration."""
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "SecurePassword123!",
    }
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "testuser@example.com"
    assert "id" in data
    assert "hashed_password" not in data


def test_register_duplicate_email_fails(client):
    """Test that registering an existing email raises HTTP 400."""
    payload = {
        "username": "user1",
        "email": "duplicate@example.com",
        "password": "Password123!",
    }
    res1 = client.post("/auth/register", json=payload)
    assert res1.status_code == 200

    payload2 = {
        "username": "user2",
        "email": "duplicate@example.com",
        "password": "AnotherPassword456!",
    }
    res2 = client.post("/auth/register", json=payload2)
    assert res2.status_code == 400


def test_login_user_success(client):
    """Test successful authentication and JWT issuance."""
    # Register first
    client.post(
        "/auth/register",
        json={
            "username": "loginuser",
            "email": "loginuser@example.com",
            "password": "MySecretPassword123",
        },
    )

    # Login with form data
    login_data = {
        "username": "loginuser@example.com",
        "password": "MySecretPassword123",
    }
    response = client.post("/auth/login", data=login_data)
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert token_data["token_type"] == "bearer"


def test_login_invalid_password_fails(client):
    """Test login rejection on wrong password."""
    client.post(
        "/auth/register",
        json={
            "username": "wrongpwuser",
            "email": "wrongpw@example.com",
            "password": "CorrectPassword",
        },
    )

    response = client.post(
        "/auth/login",
        data={"username": "wrongpw@example.com", "password": "WrongPassword"},
    )
    assert response.status_code == 401


def test_auth_test_endpoint(client):
    """Test health check route on auth router."""
    response = client.get("/auth/test")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
