# IntelliRepo REST API Documentation

This document describes the core REST API endpoints provided by the IntelliRepo FastAPI backend.

* **Base URL**: `http://127.0.0.1:8000`
* **Interactive Documentation (Swagger)**: `http://127.0.0.1:8000/docs`
* **Alternative Documentation (ReDoc)**: `http://127.0.0.1:8000/redoc`

---

## 🔐 Authentication

Endpoints requiring authentication expect a standard HTTP `Authorization` header containing a JSON Web Token (JWT):

```http
Authorization: Bearer <your_jwt_access_token>
```

---

## 1. Authentication Endpoints (`/auth`)

### Register User
* **Method**: `POST`
* **Path**: `/auth/register`
* **Description**: Create a new user account.
* **Request Body**:
  ```json
  {
    "username": "developer123",
    "email": "developer@example.com",
    "password": "SecurePassword123"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "id": 1,
    "username": "developer123",
    "email": "developer@example.com",
    "github_username": null,
    "github_avatar_url": null
  }
  ```

### Login
* **Method**: `POST`
* **Path**: `/auth/login`
* **Description**: Authenticate with email and password to receive a Bearer token.
* **Request Format**: Form Data (`application/x-www-form-urlencoded`)
  * `username`: `developer@example.com` (user's email)
  * `password`: `SecurePassword123`
* **Response (200 OK)**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
    "token_type": "bearer"
  }
  ```

### Health / Test
* **Method**: `GET`
* **Path**: `/auth/test`
* **Description**: Verify the authentication routing status.

---

## 2. User Endpoints (`/users`)

### Get Current User Profile
* **Method**: `GET`
* **Path**: `/users/me`
* **Authentication**: Required (`Bearer <token>`)
* **Response (200 OK)**:
  ```json
  {
    "id": 1,
    "username": "developer123",
    "email": "developer@example.com",
    "github_username": "dev-user",
    "github_avatar_url": "https://avatars.githubusercontent.com/u/123456"
  }
  ```

---

## 3. GitHub OAuth Endpoints (`/github`)

### GitHub Module Status
* **Method**: `GET`
* **Path**: `/github/health`

### Get GitHub Connect URL
* **Method**: `GET`
* **Path**: `/github/connect`
* **Authentication**: Required
* **Response (200 OK)**:
  ```json
  {
    "url": "https://github.com/login/oauth/authorize?client_id=...&redirect_uri=..."
  }
  ```

### GitHub OAuth Redirect Login
* **Method**: `GET`
* **Path**: `/github/login`
* **Authentication**: Required
* **Description**: Redirects browser directly to GitHub authorization page.

### OAuth Callback
* **Method**: `GET`
* **Path**: `/github/callback?code=<code>&state=<state>`
* **Description**: Handles GitHub OAuth callback exchange, retrieves access token, and links user GitHub profile.

---

## 4. Repositories Endpoints (`/repositories`)

### Health Check
* **Method**: `GET`
* **Path**: `/repositories/health`

### List Repositories
* **Method**: `GET`
* **Path**: `/repositories`
* **Authentication**: Required
* **Response (200 OK)**:
  ```json
  [
    {
      "id": 101,
      "name": "IntelliRepo",
      "full_name": "JAY4IGNITE/IntelliRepo",
      "description": "AI-Driven Software Architecture Analysis Platform",
      "language": "Python",
      "stars": 42,
      "forks": 10,
      "open_issues": 2,
      "default_branch": "main",
      "html_url": "https://github.com/JAY4IGNITE/IntelliRepo"
    }
  ]
  ```

### Get Dashboard Statistics
* **Method**: `GET`
* **Path**: `/repositories/stats`
* **Authentication**: Required
* **Response (200 OK)**:
  ```json
  {
    "total_repos": 12,
    "total_stars": 85,
    "total_forks": 24,
    "total_issues": 7,
    "languages": {
      "Python": 6,
      "TypeScript": 4,
      "Rust": 2
    }
  }
  ```

### Sync GitHub Repositories
* **Method**: `POST`
* **Path**: `/repositories/sync`
* **Authentication**: Required
* **Description**: Fetches user's latest repositories from GitHub and synchronizes them in the database.
