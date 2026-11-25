<div align="center">

  <img src="./frontend/public/favicon.svg" alt="IntelliRepo Logo" width="80" height="80" />

  # IntelliRepo

  **AI-Driven Codebase Intelligence & Engineering Risk Prediction Platform**

  Analyze repository architecture, predict defect hotspots, evaluate maintainability, and gain actionable codebase insights through automated static parsing and machine learning.

  <p align="center">
    <a href="https://github.com/JAY4IGNITE/IntelliRepo/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/Python-3.10+-3776AB.svg?logo=python&logoColor=white" alt="Python 3.10+">
    <img src="https://img.shields.io/badge/FastAPI-0.115+-009688.svg?logo=fastapi&logoColor=white" alt="FastAPI">
    <img src="https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black" alt="React 19">
    <img src="https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <a href="https://github.com/JAY4IGNITE/IntelliRepo/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-system-workflow">Workflow</a> •
    <a href="#-quickstart">Quickstart</a> •
    <a href="API.md">API Reference</a> •
    <a href="CONTRIBUTING.md">Contributing</a>
  </p>

</div>

---

## 📖 Overview

Modern software repositories scale rapidly into thousands of files with complex dependency graphs, subtle architectural drift, and uneven test coverage. Understanding codebases, onboarding new developers, and pinpointing defect-prone modules consumes substantial engineering time.

**IntelliRepo** solves this by unifying:
* **Automated Repository Parsing**: Extracts folder hierarchy, module dependencies, and code metrics.
* **Predictive Risk Modeling**: Employs machine learning to estimate defect probability, maintainability scores, and complexity hotspots.
* **Interactive Engineering Dashboard**: Delivers real-time analytics, language breakdowns, and synchronization with GitHub repositories.
* **Developer-Centric API**: Provides an extensible FastAPI backend with JWT authentication and GitHub OAuth.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **GitHub Synchronization** | Seamlessly connect personal and organization GitHub accounts via OAuth to track and sync repositories automatically. |
| **Predictive Risk Analytics** | Forecast defect-prone modules, cyclomatic complexity anomalies, and maintainability indices using ML models. |
| **Code Intelligence Dashboard** | Real-time visualization of repository health scores, issue counts, fork/star trajectories, and tech stack distribution. |
| **Modern API Architecture** | Fully typed, high-performance REST endpoints powered by FastAPI, Pydantic v2, and SQLAlchemy. |
| **Responsive Design & Theming** | Built with Tailwind CSS v4, Lucide Icons, and accessible Radix UI primitives, with native dark/light theme switching. |

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph Client["Frontend Client (React 19 + Vite)"]
        direction TB
        UI["Interactive Dashboard UI"]
        Theme["Theme & Auth State"]
        APIClient["Axios HTTP Client"]
        UI --- Theme
        UI --- APIClient
    end

    subgraph Backend["API Server (FastAPI)"]
        direction TB
        Gate["CORS & Request Gateway"]
        AuthRoute["Auth Router (/auth)"]
        GHRoute["GitHub Router (/github)"]
        RepoRoute["Repositories Router (/repositories)"]
        UserRoute["Users Router (/users)"]
        ServiceLayer["Business Services Layer"]

        Gate --> AuthRoute & GHRoute & RepoRoute & UserRoute
        AuthRoute & GHRoute & RepoRoute & UserRoute --> ServiceLayer
    end

    subgraph Storage["Data & Intelligence Layer"]
        direction TB
        DB[("PostgreSQL Database")]
        Alembic["Alembic Schema Migrations"]
        MLService["ML Risk & Feature Engine"]

        DB --- Alembic
    end

    APIClient <-->|REST API / Bearer JWT| Gate
    ServiceLayer <-->|SQLAlchemy ORM| DB
    ServiceLayer <-->|Feature Ingestion| MLService
```

---

## 🔄 System Workflow

```mermaid
flowchart LR
    A["1. User Connects GitHub"] --> B["2. Ingest Metadata & Tree"]
    B --> C["3. Extract Numerical Features"]
    C --> D["4. Evaluate Risk Models"]
    D --> E["5. Display Insights & Health Score"]
```

1. **Authentication & Authorization**: The user authenticates via JWT or GitHub OAuth.
2. **Repository Sync**: Repositories, commits, issues, and languages are ingested into PostgreSQL.
3. **Feature Engineering**: Files are parsed to compute metrics such as cyclomatic complexity, function count, nesting depth, and import density.
4. **Predictive Inference**: ML models classify files by defect risk and compute maintainability indices.
5. **Dashboard Visualization**: Findings, distribution charts, and health scores are presented in real time.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS v4, Radix UI, TanStack Query, Framer Motion, Lucide Icons |
| **Backend** | FastAPI, Python 3.10+, Uvicorn, SQLAlchemy 2.0, Alembic, Pydantic v2, HTTPX |
| **Database** | PostgreSQL, Psycopg2 |
| **Machine Learning** | Scikit-learn, XGBoost, LightGBM (Inference & Training Pipeline) |
| **DevOps & Tooling** | Docker, Docker Compose, Oxlint, Git |

---

## 📁 Project Structure

```
IntelliRepo/
├── backend/                # FastAPI application backend
│   ├── alembic/            # Database schema migration scripts
│   ├── app/
│   │   ├── api/v1/         # Route handlers: auth, users, github, repositories
│   │   ├── auth/           # Password hashing, JWT verification, dependencies
│   │   ├── core/           # Settings, logging, and security configurations
│   │   ├── database/       # SQLAlchemy engine and session lifecycle
│   │   ├── models/         # Database entity models
│   │   ├── repositories/   # Database access layer (data mappers)
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── services/       # Core business logic and external integrations
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container image definition
│
├── frontend/               # React 19 client application
│   ├── src/
│   │   ├── components/     # UI primitives and shared components
│   │   ├── context/        # Authentication and Theme React contexts
│   │   ├── lib/            # Axios API client and utility helpers
│   │   └── pages/          # Dashboard, Repository, and Auth views
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.ts      # Vite configuration
│
├── ml-service/             # Machine learning training, inference, and explainability
├── docker/                 # Multi-service Docker Compose configurations
├── API.md                  # Detailed REST API endpoint specification
└── CONTRIBUTING.md         # Open-source contribution and setup guidelines
```

---

## 🚀 Quickstart

### Prerequisites

Ensure you have installed:
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 18+](https://nodejs.org/) and `npm`
* [PostgreSQL 14+](https://www.postgresql.org/)

### 1. Clone Repository

```bash
git clone https://github.com/JAY4IGNITE/IntelliRepo.git
cd IntelliRepo
```

### 2. Configure Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
```

Update `backend/.env` with your PostgreSQL database URL, a secure `SECRET_KEY`, and optional GitHub OAuth credentials:

```env
DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/intellirepo
SECRET_KEY=generate_a_random_secure_secret_key
FRONTEND_URL=http://localhost:5173
```

Run database migrations:

```bash
alembic upgrade head
```

Start the API server:

```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The interactive Swagger documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### 3. Configure Frontend

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Authenticate and obtain JWT Bearer token | No |
| `GET` | `/users/me` | Fetch authenticated user profile | Yes |
| `GET` | `/github/connect` | Generate GitHub OAuth authorization URL | Yes |
| `GET` | `/github/callback` | Process GitHub OAuth callback | No |
| `GET` | `/repositories` | List tracked repositories for user | Yes |
| `GET` | `/repositories/stats` | Aggregate dashboard statistics | Yes |
| `POST` | `/repositories/sync` | Trigger GitHub repository synchronization | Yes |

For full endpoint documentation, payload schemas, and example responses, see **[API.md](API.md)**.

---

## 🔒 Security & Sensitive Data

* Never commit `.env` files or hardcoded credentials to version control.
* Use strong, random strings for `SECRET_KEY`.
* Store OAuth client secrets and database passwords securely in environment variables.
* Always keep the `.gitignore` rules updated to prevent accidental credential leakage.

---

## 🤝 Contributing

Contributions are welcomed! Whether you want to improve documentation, add features, or report bugs:

1. Review the **[CONTRIBUTING.md](CONTRIBUTING.md)** guide.
2. Fork the repository and create your feature branch (`git checkout -b feat/new-feature`).
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/).
4. Submit a Pull Request targeting the upstream `main` branch.

---

## 📜 License

This project is licensed under the **[MIT License](LICENSE)**.
