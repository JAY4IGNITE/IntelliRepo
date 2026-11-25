# Contributing to IntelliRepo

Thank you for your interest in contributing to IntelliRepo! We welcome contributions to documentation, bug fixes, features, and performance enhancements.

---

## 🛠 Prerequisites

Before getting started, make sure you have the following installed on your system:

* **Python**: 3.10 or higher
* **Node.js**: 18.x or higher (LTS recommended)
* **npm** or **pnpm**
* **Git**
* **PostgreSQL**: 14+ (or a local Docker instance)

---

## 🚀 Getting Started

### 1. Fork and Clone

Fork the repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/<your-username>/IntelliRepo.git
cd IntelliRepo
```

Set up the upstream remote to stay synced with the original repository:

```bash
git remote add upstream https://github.com/JAY4IGNITE/IntelliRepo.git
```

### 2. Branching Strategy

Create a descriptive feature branch from `main`:

```bash
git checkout -b <type>/<short-description>
```

Common branch prefixes:
* `feat/` - New feature implementation
* `fix/` - Bug fix
* `docs/` - Documentation additions or updates
* `refactor/` - Code restructuring without behavioral changes
* `chore/` - Maintenance tasks, dependencies, build configs

---

## 💻 Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your PostgreSQL database credentials and a secure `SECRET_KEY`.

5. Run database migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the development server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   The backend API will be available at `http://127.0.0.1:8000`. You can explore interactive Swagger docs at `http://127.0.0.1:8000/docs`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   Create a `.env` file if you need to point to a custom backend address:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 📐 Coding Conventions

* **Python**: Follow PEP 8 guidelines. Write clean, type-annotated code with Pydantic schemas for data validation.
* **TypeScript & React**: Use functional components, explicit interface definitions, and Tailwind CSS utility classes.
* **Linting**: Run `npm run lint` in the `frontend` directory to ensure no linting warnings or errors exist.
* **Commit Messages**: Use Conventional Commits formatting:
  * `feat: add user profile picture upload`
  * `fix: handle expired JWT tokens gracefully`
  * `docs: update API overview and installation guide`
  * `chore: update dependencies in backend`

---

## 📤 Submitting a Pull Request

1. Sync your local `main` branch with upstream:
   ```bash
   git checkout main
   git pull upstream main
   ```
2. Rebase your feature branch on `main`:
   ```bash
   git checkout <your-branch>
   git rebase main
   ```
3. Push your branch to your GitHub fork:
   ```bash
   git push origin <your-branch>
   ```
4. Open a Pull Request on GitHub against `JAY4IGNITE/IntelliRepo` on the `main` branch.
5. Provide a clear summary of your changes in the PR description and list any related issues.

---

## 💬 Community & Help

If you encounter issues or have questions, please feel free to open a GitHub Issue to discuss them before submitting large changes.
